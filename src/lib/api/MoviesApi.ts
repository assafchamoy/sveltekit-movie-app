import requestHandler from '../../axios';
import type { ServiceError } from '$IApi/ServiceError.type';
import type { IMovieDetails } from '$IMovies/movieDetails.entity';
import type IPopularMoviesResponse from '$IMovies/popularMovies.response';
import type { ISearchResult } from '$IMovies/searchResult.response';

interface BaseMoviesParams {
	language?: 'he' | 'en-US';
	page: number;
}

type PopularMoviesParams = BaseMoviesParams;

interface SearchMoviesParams extends BaseMoviesParams {
	query: string;
}

interface MovieDetailsParams extends Omit<BaseMoviesParams, 'page'> {
	id: string;
}

export default class MoviesApi {
	/**
	 * A util class to integrate with https://developers.themoviedb.org/ API.
	 */

	public async fetchMovieDetails({
		language = 'en-US',
		...rest
	}: MovieDetailsParams): Promise<IMovieDetails | ServiceError> {
		try {
			const movieDetailsRes = await requestHandler
				.get<IMovieDetails>(`movie/${rest.id}`, { params: { language } })
				.then((res) => res.data);

			return movieDetailsRes;
		} catch (e) {
			return { title: 'There was an error fetching the movie data', error: e as string };
		}
	}

	public async fetchPopularMovieList({
		language = 'en-US',
		...rest
	}: PopularMoviesParams): Promise<IPopularMoviesResponse | ServiceError> {
		try {
			const popularMoviesRes = await requestHandler
				.get<IPopularMoviesResponse>('movie/popular', { params: { language, ...rest } })
				.then((res) => res.data);

			return popularMoviesRes;
		} catch (e) {
			return { title: 'There was an error fetching the movies..', error: e as string };
		}
	}

	public async searchMovie({
		language = 'en-US',
		...rest
	}: SearchMoviesParams): Promise<ISearchResult | ServiceError> {
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
