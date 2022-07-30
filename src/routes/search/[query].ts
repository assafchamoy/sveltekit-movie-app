import { get as getStoreVal } from 'svelte/store';
import type { ISearchResult } from '$IMovies';
import type { ServiceError } from '$IApi/ServiceError.type';
import { API } from '$lib/api/apiInstance.store';
import type { RequestHandler } from './__types/[query].js';

const APIInstance = getStoreVal(API);

type getResponseBody = {
	searchResults: ISearchResult | ServiceError;
}

export const get: RequestHandler<getResponseBody> = async ({ params: { query }, url: { searchParams } }) => {
	const page = searchParams.get('page') ?? '1';
	const searchRes = await APIInstance.searchMovie({ page: +page, query });

	return {
		status: 200,
		body: {searchResults: searchRes}
	};
};
