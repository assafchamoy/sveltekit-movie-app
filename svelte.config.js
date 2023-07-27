import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter({
            // Documentation: https://kit.svelte.dev/docs/adapter-cloudflare
            routes: {
                include: ['/*'],
                exclude: ['<all>']
            }
        }),
        alias: {
            $IMovies: "src/interfaces/Movies",
            $IApi: "src/interfaces/api",
            $Stores: "src/stores",
            $Components: "src/components",
        }
    }
};

export default config;