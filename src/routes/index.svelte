<script type="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import MovieList from '../components/movies/MovieList.svelte';
	import type IPopularMoviesResponse from '../interfaces/Movies/popularMovies.response';
	import { moviesList, resetScrollTopPosition } from '../stores/moviesList.store';

	export let popularMovies: IPopularMoviesResponse;
	let shouldFetchMore = false;

	onMount(() => {
		if(!$moviesList?.movies?.length){
			moviesList.set({
			   page: popularMovies.page,
			   movies: popularMovies.results,
			   isLoading: false,
			   total: popularMovies.total_results
		   });
		}
	});

	$: nextPage = $moviesList.page + 1;

	$: {
		if (shouldFetchMore) {
			shouldFetchMore = false;
			fetch(`/__data.json?page=${nextPage}`)
				.then((data) => data.json())
				.then((res: {popularMovies: IPopularMoviesResponse}) => {
					moviesList.update((currList) => ({
						isLoading: false,
						movies: [...currList.movies, ...res?.popularMovies?.results],
						page: res.popularMovies.page,
						total: res.popularMovies.total_results
					}));
				});
		}
	}

	onMount(() => {
		resetScrollTopPosition({ pathName: $page.url.pathname, except: true });
	});
</script>

<h1 class="title">Popular Movies</h1>
	<MovieList
		on:fetchNextPage={() => {
			$moviesList.isLoading = true;
			console.log('here?')
			shouldFetchMore = true;
		}}
	/>

<style>
	.title {
		margin: 20px 0px;
	}
</style>
