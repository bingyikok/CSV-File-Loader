import type { PageServerLoad } from './$types';
import axios from 'axios';

export const load: PageServerLoad = async () => {
	const limit = 10; // Items per page
	const skip = 0; // Offset (for pagination)

	try {
		const response = await axios.post(`http://localhost:3000/data?limit=${limit}&skip=${skip}`, {
			headers: { 'Content-Type': 'application/json' }
		});

		return {
			data: response.data
		};
	} catch (error: any) {
		console.error('Error fetching data:', error);
		return {
			error: error.response?.data?.message || 'Failed to fetch data'
		};
	}
};
