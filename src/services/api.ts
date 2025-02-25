import { Category, HIVCenter } from '../interfaces/types';

export async function fetchCategories(apiBaseUrl: string): Promise<Category[]> {
	const response = await fetch(`${apiBaseUrl}/api/categories`);
	const text = await response.text();
	if (!response.ok) throw new Error('Failed to fetch categories');
	return JSON.parse(text);
}

export async function fetchHIVCenters(apiBaseUrl: string): Promise<HIVCenter[]> {
	const response = await fetch(`${apiBaseUrl}/api/free-hiv-test-centers`);
	if (!response.ok) throw new Error('Failed to fetch HIV centers');
	return response.json();
}
