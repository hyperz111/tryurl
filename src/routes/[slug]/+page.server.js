import { error, redirect } from "@sveltejs/kit";
import { visit } from "$lib/database.js";

export const load = async ({ params }) => {
	const result = await visit(params.slug);

	if (!result.ok) {
		throw error(result.status);
	}

	throw redirect(302, result.url);
};
