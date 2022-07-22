<script type="ts">
	import { onMount } from 'svelte';

	import MovieList from '../components/movies/MovieList.svelte';
	import type IPopularMoviesResponse from '../interfaces/Movies/popularMovies.response';
	import { moviesList } from '../stores/moviesList.store';

	export let popularMovies: IPopularMoviesResponse;
	
		$: moviesList.set({
			page: popularMovies.page,
			movies: popularMovies.results,
			isLoading: false,
			total: popularMovies.total_results
		});
	// moviesList.update(({ movies: prevMovies = [] }) => ({
	// 	page: popularMovies.page,
	// 	movies: [...prevMovies, ...popularMovies.results],
	// 	isLoading: false,
	// 	total: popularMovies.total_results
	// }));

	const fetchNextPage = () => {
		$moviesList = { ...$moviesList, page: $moviesList.page + 1 };
	};
</script>

<h1 class="title">Popular Movies</h1>
{#if popularMovies}
	<MovieList />
{/if}

<style>
	.title {
		margin: 20px 0px;
	}
</style>
