<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import MovieList from '$Components/movies/MovieList.svelte';
	import type { IPopularMoviesResponse } from '$IMovies';
	import { moviesList, MoviesType, resetScrollTopPosition } from '$Stores/moviesList.store';
	import { isServiceError } from '$IApi/ServiceError.type';

	export let data;
	$: ({ popularMovies } = data);

	let shouldFetchMore = false;
	const MovieListType = MoviesType.POPULAR;

	onMount(() => {
		if (popularMovies && !isServiceError(popularMovies) && $moviesList.listType !== MovieListType) {
			moviesList.set({
				page: popularMovies.page,
				movies: popularMovies.results,
				isLoading: false,
				total: popularMovies.total_results,
				listType: MovieListType
			});
		}

		resetScrollTopPosition({ pathName: $page.url.pathname, except: true });
	});

	$: nextPage = $moviesList.page + 1;

	$: {
		if (shouldFetchMore) {
			shouldFetchMore = false;
			fetch(`/popularMovies?page=${nextPage}`)
				.then((data) => data.json())
				.then((res: { popularMovies: IPopularMoviesResponse }) => {
					moviesList.update((currList) => ({
						...currList,
						isLoading: false,
						movies: [...currList.movies, ...res?.popularMovies?.results],
						page: res.popularMovies.page,
						total: res.popularMovies.total_results
					}));
				});
		}
	}
</script>

<h1 class="title">Popular Movies</h1>
<MovieList
	on:fetchNextPage={() => {
		$moviesList.isLoading = true;
		shouldFetchMore = true;
	}}
/>

<style>
	.title {
		margin: 20px 0px;
	}
</style>
