
import { API } from "$lib/api/apiInstance.store";
import { json, } from "@sveltejs/kit";
import { get as getStoreVal } from "svelte/store";
import type { RequestHandler } from "./$types";

const APIInstance = getStoreVal(API);

export const GET: RequestHandler = (async ({ url: { searchParams } }) => {
    const page = searchParams.get("page") ?? 1;
    const popularMovies = await APIInstance.fetchPopularMovieList({ page: +page });
    return json({ popularMovies: popularMovies});
});