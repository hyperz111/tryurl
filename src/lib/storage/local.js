/**
 * Shim module for `@netlify/blobs`, used in development.
 */

const stores = new Map();

export const getStore = (name) => {
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
