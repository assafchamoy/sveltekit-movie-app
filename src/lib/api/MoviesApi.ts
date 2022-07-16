import type { JSONValue } from '@sveltejs/kit/types/private';
import type { IMovieQueryParams } from '../../interfaces/Movies/movie.queryparams';
import type { ISearchResult } from '../../interfaces/Movies/searchResult.response';

type SearchMovieRes = {
	results: JSONValue | null;
	error: { title: string; error: string } | null;
};
export default class MoviesApi {
	/**
	 * A util class to integrate with https://developers.themoviedb.org/ API.
	 */
	private BASE_URL: string;
	private API_KEY: string;

	constructor() {
		this.BASE_URL = import.meta.env.VITE_API_BASE_URL;
		this.API_KEY = import.meta.env.VITE_API_KEY;
	}

	public async searchMovie(
		query: string,
		page: number,
		language: 'he' | 'en-US' = 'en-US'
	): Promise<SearchMovieRes> {
		try {
			const searchResults = await (
				await fetch(
					`${this.BASE_URL}search/movie?${new URLSearchParams({
						api_key: this.API_KEY,
						language,
						page: page.toString(),
						query
					})}`
				)
			).json();

			return {
				results: searchResults as JSONValue,
				error: null
			};
		} catch (e) {
			return {
				results: null,
				error: {
					title: "Couldn't find movies by that query.",
					error: e as string
				}
			};
		}
	}
}
