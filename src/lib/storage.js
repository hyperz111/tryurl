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
			return store.get(key, { type: "json" });
		},
		set: (key, value) => {
			initialize();
			return store.setJSON(key, value);
		},
		delete: (key) => {
			initialize();
			return store.delete(key);
		},
	};
};

export default getStorage;
