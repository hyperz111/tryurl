import { getStore } from "@netlify/blobs";

const getStorage = (name) => {
	const store = getStore({ name });

	return {
		get: (key) => store.get(key, { type: "json" }),
		set: (key, value) => store.setJSON(key, value),
		delete: (key) => store.delete(key),
	};
};

export default getStorage;
