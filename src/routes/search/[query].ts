import MoviesApi from '$lib/api/MoviesApi';
import type { RequestHandler } from './__types/[query]';

const moviesApi = new MoviesApi();

export const GET: RequestHandler = async ({ params: { query } }) => {
	const searchRes = await moviesApi.searchMovie(query, 1);
	console.log('here2?', searchRes);

	if (searchRes.results) {
		return {
			status: 200,
			body: { searchResults: searchRes.results }
		};
	}

	return {
		status: 404,
		body: { error: searchRes.error }
	};
};
