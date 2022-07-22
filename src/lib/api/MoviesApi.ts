import type { JSONValue } from '@sveltejs/kit/types/private';
import requestHandler from '../../axios';
import type IPopularMoviesResponse from '../../interfaces/Movies/popularMovies.response';
import type { ISearchResult } from '../../interfaces/Movies/searchResult.response';

export type ServiceError = { title: string; error: string } | null;

interface BaseMoviesParams {
	language?: 'he' | 'en-US';
	page: number;
}

interface SearchMoviesParams {
	query: string;
}
export default class MoviesApi {
	/**
	 * A util class to integrate with https://developers.themoviedb.org/ API.
	 */

	public fetchPopularMovieList = async ({
		language = 'en-US',
		...rest
	}: BaseMoviesParams): Promise<IPopularMoviesResponse | ServiceError> => {
		try {
			const popularMoviesRes = await requestHandler
				.get<IPopularMoviesResponse>('movie/popular', { params: { language, ...rest } })
				.then((res) => res.data);

			return popularMoviesRes;
		} catch (e) {
			return { title: 'There was an error fetching the movies..', error: e as string };
		}
	};

	public async searchMovie({
		language = 'en-US',
		...rest
	}: BaseMoviesParams & SearchMoviesParams): Promise<ISearchResult | ServiceError> {
		try {
			const searchResults = await requestHandler
				.get<ISearchResult>('search/movie', { params: { language, ...rest } })
				.then((res) => res.data);

			if (searchResults.results.length) {
				return searchResults;
			}

			return {
				title: "Couldn't find movies by that query.",
				error: "Couldn't find movies by that query."
			};
		} catch (e) {
			return {
				title: "Couldn't find movies by that query.",
				error: e as string
			};
		}
	}
}
