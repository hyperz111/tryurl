import { dev } from "$app/environment";
import * as local from "./local.js";

let implementation = local.getStore;

if (!dev) {
	const netlify = await import("@netlify/blobs");
	implementation = netlify.getStore;
}

export const getStore = implementation;
