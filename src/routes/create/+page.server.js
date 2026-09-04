import { create } from "$lib/database.js";
import { RESERVED_SLUGS } from "$lib/constants.js";
import { checkUrls } from "$lib/utils.js";

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const urls = form
			.get("urls")
			.split("\n")
			.map((url) => url.trim())
			.filter(Boolean);
		if (!checkUrls(urls)) {
			return {
				success: false,
				reason: "Has not allowed URL(s)",
			};
		}

		const slug = form.get("slug").trim();
		if (RESERVED_SLUGS.has(slug)) {
			return {
				success: false,
				reason: "Reserved slug name",
			};
		}

		const token = await create(slug, urls);

		if (!token) {
			return {
				success: false,
				reason: "Slug name is used",
			};
		}

		return {
			success: true,
			slug,
			token,
		};
	},
};
