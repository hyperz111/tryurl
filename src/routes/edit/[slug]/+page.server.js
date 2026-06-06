import { error } from "@sveltejs/kit";
import { access, update } from "$lib/database.js";

export const load = async ({ params }) => {
	const result = await access(params.slug);

	if (result.slug === null) {
		throw error(404);
	}

	return result;
};

export const actions = {
	default: async ({ params, request }) => {
		const form = await request.formData();

		const urls = form
			.get("urls")
			.split("\n")
			.map((url) => url.trim())
			.filter(Boolean);

		const { slug } = await access(params.slug);
		if (slug === null) {
			return {
				success: false,
			};
		}

		await update(slug, urls);

		return {
			success: true,
		};
	},
};
