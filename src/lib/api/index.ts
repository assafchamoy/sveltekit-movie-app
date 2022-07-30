import axios from 'axios';

const requestHandler = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	params: {
		api_key: import.meta.env.VITE_API_KEY
	}
});

export default requestHandler;
