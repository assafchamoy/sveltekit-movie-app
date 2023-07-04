<script lang="ts">
	import no_image from '$lib/assets/icons/no_image.svg';
	import type {IMovie, IMovieDetails} from '$IMovies';
	export let movie: IMovie | IMovieDetails;
	const baseImgUrl = import.meta.env.VITE_MOVIE_IMAGES_BASE_URL;
	$: imgUrl = movie.poster_path ? baseImgUrl + movie.poster_path : no_image;
</script>

<img class="movie_img" src={imgUrl} alt={`${movie.original_title}_poster`} />

<style>
	.movie_img {
		width: 300px;
		object-fit: cover;
		object-position: center;
		aspect-ratio: 1 / 1;
		border-radius: 10px;
		align-self: center;
	}
</style>
