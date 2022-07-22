import MoviesApi, { type ServiceError } from '$lib/api/MoviesApi';
import type IPopularMoviesResponse from '../interfaces/Movies/popularMovies.response';
import type { RequestHandler } from './__types/index';

const moviesApi = new MoviesApi();

type GetResponseBody = {
	popularMovies: IPopularMoviesResponse | ServiceError;
};

export const get: RequestHandler<GetResponseBody> = async () => {
	const popularMovies = await moviesApi.fetchPopularMovieList({ page: 1 });

	return {
		body: { popularMovies: popularMovies }
	};
};
