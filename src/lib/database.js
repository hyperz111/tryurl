import { getStore } from "$lib/storage/index.js";
import { nanoid } from "nanoid";

const slugs = getStore("slug");
const tokens = getStore("token");
const caches = getStore("cache");

/**
 * @param {string} slug
 * @param {Array<string>} urls
 * @return {Promise<string>}
 */
export const create = async (slug, urls) => {
	if ((await slugs.get(slug, { type: "json" })) !== undefined) {
		return;
	}

	const token = nanoid();

	await slugs.setJSON(slug, urls);
	await tokens.setJSON(token, slug);

	return token;
};

/**
 * @param {string} slug
 * @param {Array<string>} urls
 * @return {Promise<void>}
 */
export const update = async (slug, urls) => {
	await slugs.setJSON(slug, urls);
	await caches.delete(slug);
};

/**
 * @param {string} token
 * @return {Promise<{ slug: string | null, urls?: Array<string> }>}
 */
export const access = async (token) => {
	const slug = await tokens.get(token, { type: "json" });
	if (!slug) {
		return {
			slug: null,
		};
	}

	const urls = await slugs.get(slug, { type: "json" });

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
	const cached = await caches.get(slug, { type: "json" });
	if (cached && cached.expiredAt > Date.now()) {
		return {
			ok: true,
			url: cached.url,
		};
	}

	const urls = await slugs.get(slug, { type: "json" });

	if (!Array.isArray(urls) || urls.length === 0) {
		return {
			ok: false,
			status: 404,
		};
	}

	for (const url of urls) {
		try {
			const response = await fetch(url, {
				method: "HEAD",
			});

			if (response.status < 400) {
				await caches.setJSON(slug, {
					url,
					// 30 minutes
					expiredAt: Date.now() + 1000 * 60 * 30,
				});

				return {
					ok: true,
					url,
				};
			}
		} catch {}
	}

	return {
		ok: false,
		status: 503,
	};
};
