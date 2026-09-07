import { error, redirect } from "@sveltejs/kit";
import { access, update, remove } from "$lib/database.js";
import { checkUrls } from "$lib/utils.js";

export const load = async ({ params }) => {
	const result = await access(params.token);

	if (!result.slug) {
		throw error(404);
	}

	return result;
};

export const actions = {
	main: async ({ params, request }) => {
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

		const { slug } = await access(params.token);
		if (slug === null) {
			throw error(404);
		}

		await update(slug, urls);

		return {
			success: true,
		};
	},
	delete: async ({ params }) => {
		await remove(params.token);

		throw redirect(302, "/edit");
	},
};
