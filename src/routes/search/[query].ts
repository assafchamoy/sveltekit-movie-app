import MoviesApi, { type ServiceError } from '$lib/api/MoviesApi';
import type { ISearchResult } from '../../interfaces/Movies/searchResult.response';
import type { RequestHandler } from './__types/[query].js';

const moviesApi = new MoviesApi();

type getResponseBody = {
	searchResults: ISearchResult | ServiceError;
}

export const get: RequestHandler<getResponseBody> = async ({ params: { query } }) => {
	const searchRes = await moviesApi.searchMovie({ page: 1, query });

	return {
		status: 200,
		body: {searchResults: searchRes}
	};
};
