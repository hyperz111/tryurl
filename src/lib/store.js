const stores = new Map();

let store = (name) => {
	if (!stores.has(name)) {
		const object = {
			store: new Map(),
			get: async (key) => Promise.resolve(object.store.get(key)),
			setJSON: async (key, value) => Promise.resolve(object.store.set(key, value)),
			delete: async (key) => Promise.resolve(object.store.delete(key)),
		};

		stores.set(name, object);
	}

	return stores.get(name);
};

if (import.meta.env.PROD) {
	const { getStore } = await import("@netlify/blobs");
	store = (name) => getStore({ name });
}

export default store;
