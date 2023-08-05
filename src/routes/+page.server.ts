import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ url: { searchParams }, fetch }) => {
    const page = searchParams.get("page") ?? 1;
    const popularMovies = await fetch(`/popularMovies?page=${page}`).then(res => res.json());
    
    return popularMovies;
});