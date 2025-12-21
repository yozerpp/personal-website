import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
export default {
    kit:
        {
            adapter: adapter(),
            alias: {
                "@/*": "./src/lib/*",
                "$paraglide": "./src/paraglide"
            },
        }
};

