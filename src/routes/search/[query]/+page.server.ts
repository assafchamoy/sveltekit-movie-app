import { get as getStoreVal } from "svelte/store";
import { API } from "$lib/api/apiInstance.store";
import type { PageServerLoad } from "./$types";

const APIInstance = getStoreVal(API);

export const load = (async ({ params: { query }, url: { searchParams } }) => {
	const page = searchParams.get('page') ?? '1';
	const searchRes = await APIInstance.searchMovie({ page: +page, query });

	return {searchResults: searchRes};
}) as PageServerLoad;


