<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ movieClick: void }>();
	import type IMovie from '$IMovies/movie.entity';
	import MovieImage from './MovieImage.svelte';
	export let movie: IMovie;
</script>

<div
	class="movie"
	on:click={() => {
		goto(`/movie/${movie.id}`);
		dispatch('movieClick');
	}}
>
	<h4 class="title">{movie.title}</h4>
	<a sveltekit:prefetch href={`/movie/${movie.id}`}>
		<MovieImage {movie} />
	</a>
	<h4 class="rating">Rate: {movie.vote_average}</h4>
</div>

<style>
	.movie {
		display: flex;
		flex-direction: column;
		border-radius: 0.2rem;
		width: 300px;
		padding: 30px;
		gap: 10px;
		text-align: center;
		justify-content: space-evenly;
	}
	.title {
		font-size: 0.9rem;
	}
</style>
