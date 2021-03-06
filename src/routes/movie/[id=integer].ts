import { get as getStoreVal } from 'svelte/store';
import type { ServiceError } from '../../interfaces/API/ServiceError.type';
import { API } from '$lib/api/apiInstance.store';
import type { RequestHandler } from './__types/[id=integer].js';
import type { IMovieDetails } from '../../interfaces/Movies/movieDetails.entity';

const APIInstance = getStoreVal(API);

type getResponseBody = {
	movieDetails: ServiceError | IMovieDetails;
};

export const get: RequestHandler<getResponseBody> = async ({ params: { id } }) => {
	const movieDetailsRes = await APIInstance.fetchMovieDetails({ id });

	return {
		headers: {
			'cache-control': 'public, max-age=3600'
		},
		status: 200,
		body: { movieDetails: movieDetailsRes }
	};
};
