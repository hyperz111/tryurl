import { error } from "@sveltejs/kit";
import { manage } from "$lib/database.js";

export const load = async ({ params }) => {
	const result = await manage(params.slug);

	if (result.slug === null) {
		throw error(401);
	}

	return result;
};
