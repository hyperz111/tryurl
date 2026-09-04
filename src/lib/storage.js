import { getStore } from "@netlify/blobs";

const getStorage = (name) => {
	/** @type {ReturnType<getStore>} */
	let store = null;
	const initialize = () => {
		store ??= getStore({ name });
	};

	return {
		get: (key) => {
			initialize();
			store.get(key, { type: "json" });
		},
		set: (key, value) => {
			initialize();
			store.setJSON(key, value);
		},
		delete: (key) => {
			initialize();
			store.delete(key);
		},
	};
};

export default getStorage;
