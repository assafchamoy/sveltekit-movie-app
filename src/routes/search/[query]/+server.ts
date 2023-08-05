
import { API } from "$lib/api/apiInstance.store";
import { json, } from "@sveltejs/kit";
import { get as getStoreVal } from "svelte/store";
import type { RequestHandler } from "./$types";

const APIInstance = getStoreVal(API);

export const GET: RequestHandler = async ({ params: { query }, url: { searchParams } }) => {
	const page = searchParams.get('page') ?? '1';
	const searchRes = await APIInstance.searchMovie({ page: +page, query });

	return json({ searchResults: searchRes });
};