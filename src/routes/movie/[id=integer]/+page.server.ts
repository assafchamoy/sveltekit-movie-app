import { get as getStoreVal } from "svelte/store";
import { API } from "$lib/api/apiInstance.store";
import type { PageServerLoad } from "./$types";

const APIInstance = getStoreVal(API);

export const load: PageServerLoad = (async ({ params: { id } }) => {
    return {
        movieDetails: await APIInstance.fetchMovieDetails({ id })
    };
}) as PageServerLoad;
