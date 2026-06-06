import { redirect } from "@sveltejs/kit";

export const load = ({ url }) => {
	const token = url.searchParams.get("token");

	if (token) {
		throw redirect(302, `/edit/${token}`);
	}
};
