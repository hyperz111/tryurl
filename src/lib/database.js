import { nanoid } from "nanoid";
import getStorage from "$lib/storage.js";
import { CACHE_TTL } from "$lib/constants.js";
import { isOk } from "$lib/utils.js";

const slugs = getStorage("slug");
const tokens = getStorage("token");
const caches = getStorage("cache");

/**
 * @param {string} slug
 * @param {Array<string>} urls
 * @return {Promise<string>}
 */
export const create = async (slug, urls) => {
	if ((await slugs.get(slug)) !== null) {
		return;
	}

	const token = nanoid();

	await slugs.set(slug, urls);
	await tokens.set(token, slug);

	return token;
};

/**
 * @param {string} slug
 * @param {Array<string>} urls
 * @return {Promise<void>}
 */
export const update = async (slug, urls) => {
	await slugs.set(slug, urls);
	await caches.delete(slug);
};

/**
 * @param {string} token
 * @return {Promise<{ slug: string | null, urls?: Array<string> }>}
 */
export const access = async (token) => {
	const slug = await tokens.get(token);
	if (!slug) {
		return {
			slug: null,
		};
	}

	const urls = await slugs.get(slug);

	return {
		slug,
		urls,
	};
};

/**
 * @param {string} slug
 * @return {Promise<{ ok: boolean, url?: string, status?: number }>}
 */
export const visit = async (slug) => {
	const cached = await caches.get(slug);
	if (cached && cached.expiredAt > Date.now()) {
		if (await isOk(cached.url)) {
			return {
				ok: true,
				url: cached.url,
			};
		}
		await caches.delete(slug);
	}

	const allUrls = await slugs.get(slug);
	const urls = Array.isArray(allUrls) && cached ? allUrls.filter((url) => url !== cached.url) : allUrls;

	if (!Array.isArray(urls) || urls.length === 0) {
		return {
			ok: false,
			status: 404,
		};
	}

	try {
		const url = await Promise.any(
			urls.map(async (url) => {
				if (await isOk(url)) {
					return url;
				} else {
					throw null; // Intentionally
				}
			}),
		);

		await caches.set(slug, {
			url,
			// 30 minutes
			expiredAt: Date.now() + CACHE_TTL,
		});

		return {
			ok: true,
			url,
		};
	} catch {}

	return {
		ok: false,
		status: 503,
	};
};

/**
 * @param {string} token
 * @return {Promise<boolean>}
 */
export const remove = async (token) => {
	const slug = await tokens.get(token);
	if (slug) {
		await caches.delete(slug);
		await slugs.delete(slug);
		await tokens.delete(token);
		return true;
	}

	return false;
};
