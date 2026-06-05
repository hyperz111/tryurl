import { nanoid } from "nanoid";
import { create } from "$lib/database.js";

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const urls = form
			.get("urls")
			.split("\n")
			.map((url) => url.trim())
			.filter(Boolean);

		const slug = nanoid(12);
		const token = await create(slug, urls);

		return {
			success: true,
			slug,
			token,
		};
	},
};
