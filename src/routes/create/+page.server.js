import { create } from "$lib/database.js";
import { RESERVED_SLUGS } from "$lib/constants.js";

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const urls = form
			.get("urls")
			.split("\n")
			.map((url) => url.trim())
			.filter(Boolean);

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
