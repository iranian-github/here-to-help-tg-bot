import { Category, Resource, HIVCenter, Env } from '../interfaces/types';

export function formatCategoryIntro(category: Category): string {
	return `🔹 ${category.title}\n\n${category.description}`;
}

export function formatResource(resource: Resource, env: Env): { text: string; buttons: Array<[string, string]> } {
	let message = `📍 ${resource.title}`;
	if (resource.description) message += `\n${resource.description}`;

	const buttons: Array<[string, string]> = [];

	if (resource.phone) {
		message += `\n \n☎️ تماس: ${resource.phone}`;
	}

	if (resource.other) {
		for (const other of resource.other) {
			if (other.url.startsWith('http')) {
				buttons.push([`🔗 ${other.label}`, other.url]);
			}
			if (other.url.startsWith('/')) {
				// Telegram APIs will fail if we use localhost
				const base = env.API_BASE_URL.replace('http://localhost:3000', 'https://example.com');
				buttons.push([`🔗 ${other.label}`, `${base}${other.url}`]);
			}
		}
	}

	return { text: message, buttons };
}

export function formatHIVCenters(centers: HIVCenter[]): string[] {
	const messages: string[] = ['لیست مراکز آزمایش رایگان ایدز:\n'];
	let currentMessage = messages[0];

	for (const center of centers) {
		const centerText = `\n🏥 ${center.city}\n📍 ${center.address}\n☎️ ${center.phoneNumbers.join(', ')}\n`;

		if (currentMessage.length + centerText.length > 4000) {
			messages.push(centerText);
			currentMessage = centerText;
		} else {
			currentMessage += centerText;
			messages[messages.length - 1] = currentMessage;
		}
	}

	return messages;
}
