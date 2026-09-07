import { ALLOWED_PROTOCOLS } from "$lib/constants.js";

/**
 * @param {Array<string>} urls
 * @returns {boolean}
 */
export const checkUrls = (urls) => {
	for (const url of urls) {
		try {
			const parsed = new URL(url);
			if (ALLOWED_PROTOCOLS.has(parsed.protocol)) {
				continue;
			}
		} catch {}

		return false;
	}

	return true;
};

/**
 * @param {string} url
 * @returns {boolean}
 */
export const isOk = async (url) => {
	try {
		const response = await fetch(url, { method: "HEAD" });
		return response.ok;
	} catch {
		return false;
	}
};
