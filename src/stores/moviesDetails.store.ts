import { get, writable } from 'svelte/store';
import requestHandler from '../axios';
import type { IMovieDetails } from '../interfaces/Movies/movieDetails.entity';

interface IMovieDetailsData {
	isLoading: boolean;
	details: Map<string, IMovieDetails>;
}

export const moviesDetails = writable<IMovieDetailsData>({
	isLoading: true,
	details: new Map<string, IMovieDetails>()
});

interface MovieDetailsParams {
	language?: 'he' | 'en-US';
	id: string;
}

export const fetchMovieDetails = async ({ language = 'en-US', ...rest }: MovieDetailsParams) => {
	if (!get(moviesDetails).details.has(rest.id)) {
		const movieDetailsRes = await requestHandler
			.get<IMovieDetails>(`movie/${rest.id}`, { params: { language } })
			.then((res) => res.data);

		moviesDetails.update(({ details: prevDetails }) => ({
			isLoading: false,
			details: prevDetails.set(rest.id.toString(), movieDetailsRes)
		}));
	}
};
