import type { ServiceError } from "$IApi/ServiceError.type";
import type { IPopularMoviesResponse } from "$IMovies";
import { API } from "$lib/api/apiInstance.store";
import type { PageServerLoad } from "./$types";
import { get as getStoreVal } from "svelte/store";

export type GetResponseBody = {
    popularMovies: IPopularMoviesResponse | ServiceError;
};

const APIInstance = getStoreVal(API);

export const load: PageServerLoad = (async ({ url: { searchParams } }) => {
    const page = searchParams.get("page") ?? 1;

    return { popularMovies: await APIInstance.fetchPopularMovieList({ page: +page }) };
}) as PageServerLoad;