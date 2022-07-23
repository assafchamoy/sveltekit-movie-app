import type { ServiceError } from '../interfaces/API/ServiceError.type';
import type IPopularMoviesResponse from '../interfaces/Movies/popularMovies.response';
import { API } from '$lib/api/apiInstance.store';
import type { RequestHandler } from './__types/index';
import { get as getStoreVal } from 'svelte/store';

type GetResponseBody = {
	popularMovies: IPopularMoviesResponse | ServiceError;
};

const APIInstance = getStoreVal(API);

export const get: RequestHandler<GetResponseBody> = async () => {
	const popularMovies = await APIInstance.fetchPopularMovieList({ page: 1 });

	return {
		body: { popularMovies: popularMovies }
	};
};
