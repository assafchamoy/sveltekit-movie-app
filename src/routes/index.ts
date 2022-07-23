import type { ServiceError } from '../interfaces/API/ServiceError.type';
import type IPopularMoviesResponse from '../interfaces/Movies/popularMovies.response';
import { API } from '$lib/api/apiInstance.store';
import type { RequestHandler } from './__types/index';
import { get as getStoreVal } from 'svelte/store';

export type GetResponseBody = {
	popularMovies: IPopularMoviesResponse | ServiceError;
};

const APIInstance = getStoreVal(API);

export const get: RequestHandler<GetResponseBody> = async ({url: {searchParams}}) => {
	const page = searchParams.get('page') ?? 1;
	const popularMovies = await APIInstance.fetchPopularMovieList({ page: +page });

	return {
		body: { popularMovies: popularMovies }
	};
};