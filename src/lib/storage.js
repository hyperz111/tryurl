const stores = new Map();

let getStorage = (name) => {
	if (!stores.has(name)) {
		const store = new Map();
		const object = {
			get: async (key) => store.get(key),
			set: async (key, value) => store.set(key, value),
			delete: async (key) => store.delete(key),
		};

		stores.set(name, object);
	}

	return stores.get(name);
};

if (process.env.NETLIFY === "true") {
	const { getStore } = await import("@netlify/blobs");
	getStorage = (name) => {
		const store = getStore({
			name,
			siteID: process.env.NETLIFY_SITE_ID,
			token: process.env.NETLIFY_TOKEN,
		});

		return {
			get: (key) => store.get(key, { type: "json" }),
			set: (key, value) => store.setJSON(key, value),
			delete: (key) => store.delete(key),
		};
	};
}

export default getStorage;
