<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { popularMovies } from '../../stores/popularMovies.store';

	console.log($popularMovies.length);

	let baseImgUrl = import.meta.env.VITE_MOVIE_IMAGES_BASE_URL;

</script>

<div class="movie_list">
	{#each $popularMovies as movie}
		<div class="movie">
			<h4>{movie.title}</h4>
			<h4>Rate: {movie.vote_average}</h4>
			<img
				class="movie_img"
				src={baseImgUrl + movie.backdrop_path}
				alt={`${movie.original_title}_poster`}
			/>
		</div>
	{/each}
</div>

<style>
	.movie_img {
		height: 150px;
		width: 100%;
		object-fit: cover;
	}
	.movie {
		display: flex;
		flex-direction: column;
		border: 1px solid rgba(0, 0, 0, 0.119);
		border-radius: 0.2rem;
		width: 300px;
		padding: 30px;
		gap: 10px;
		text-align: center;
		justify-content: space-evenly;
	}
	.movie_list {
		width: 100%;
		height: 100%;
		gap: 20px;
		justify-content: center;
		overflow-y: auto;
	}
</style>
