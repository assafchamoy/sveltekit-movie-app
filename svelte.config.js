import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter(),
        alias: {
            $IMovies: "src/interfaces/Movies",
            $IApi: "src/interfaces/api",
            $Stores: "src/stores",
            $Components: "src/components",
        }
    }
};

export default config;