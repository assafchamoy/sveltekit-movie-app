import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (async ({ params: { query }, url: { searchParams }, fetch }) => {
	const page = searchParams.get('page') ?? '1';
	const searchRes = await fetch(`/search/${query}?page=${page}`).then(res => res.json());

	return searchRes;
});


