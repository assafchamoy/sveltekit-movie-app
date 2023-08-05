import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

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
