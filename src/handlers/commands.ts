import { Context, InlineKeyboard } from 'grammy';
import { fetchCategories } from '../services/api';
import { formatCategoryIntro, formatResource } from '../utils/formatters';
import { Env } from '../interfaces/types';

export async function handleStart(ctx: Context) {
	await ctx.reply(
		'به ربات here to help خوش آمدید! 🌟\n\n' +
			'این ربات اطلاعاتی درباره خدمات رایگان در دسترس برای افرادی که به کمک نیاز دارند ارائه می‌دهد.\n\n' +
			'از دستورات زیر برای دریافت اطلاعات استفاده کنید:\n' +
			'/suicide - خودکشی و خودآزاری\n' +
			'/violence - خشونت خانگی و آزار فیزیکی\n' +
			'/illness - بیماری‌های سخت درمان\n' +
			'/addiction - اعتیاد و سوء مصرف مواد\n' +
			'/general - عمومی\n' +
			'/website - وب‌سایت\n' +
			'/help - کمک'
	);
}

export async function handleHelp(ctx: Context) {
	await ctx.reply(
		'راهنمای استفاده از ربات:\n\n' +
			'برای دریافت اطلاعات در هر دسته، روی دستور مربوطه کلیک کنید یا آن را تایپ کنید.\n\n' +
			'مثال: /suicide برای دریافت اطلاعات مربوط به پیشگیری از خودکشی\n\n' +
			'همه اطلاعات محرمانه است و هیچ اطلاعات شخصی از شما ذخیره نمی‌شود.'
	);
}

export async function handleWebsite(ctx: Context) {
	await ctx.reply('برای مشاهده وب‌سایت ما به آدرس زیر مراجعه کنید:\n\nhttps://heretohelp.ir');
}

export async function handleCategory(ctx: Context, command: string, env: Env) {
	try {
		const categories = await fetchCategories(env.API_BASE_URL);
		const category = categories.find((c) => c.slug === command);

		if (category) {
			try {
				// Send category intro
				const introMessage = formatCategoryIntro(category);
				await ctx.reply(introMessage);

				// Add a small delay between messages
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// Send each resource separately
				for (const resource of category.resources) {
					try {
						const { text, buttons } = formatResource(resource, env);
						const keyboard = new InlineKeyboard();

						// Add buttons in pairs
						for (let i = 0; i < buttons.length; i += 2) {
							if (i + 1 < buttons.length) {
								keyboard.add({ text: buttons[i][0], url: buttons[i][1] }).add({ text: buttons[i + 1][0], url: buttons[i + 1][1] });
								keyboard.row();
							} else {
								keyboard.add({ text: buttons[i][0], url: buttons[i][1] });
							}
						}

						await ctx.reply(text, buttons.length > 0 ? { reply_markup: keyboard } : undefined);
						// Add a small delay between resources
						await new Promise((resolve) => setTimeout(resolve, 500));
					} catch (resourceError) {
						console.error('Error sending resource:', resource.title, resourceError);
						// Continue with next resource instead of failing completely
						continue;
					}
				}
			} catch (categoryError) {
				console.error('Error in category handling:', categoryError);
				await ctx.reply('متأسفانه در ارسال اطلاعات مشکلی پیش آمده. لطفاً کمی بعد دوباره تلاش کنید.');
			}
		} else {
			await ctx.reply('متأسفانه اطلاعات این دسته در حال حاضر در دسترس نیست.');
		}
	} catch (error) {
		console.error(`Error fetching category ${command}:`, error);
		await ctx.reply('متأسفانه در دریافت اطلاعات مشکلی پیش آمده. لطفاً کمی بعد دوباره تلاش کنید.');
	}
}

export async function handleUnknownMessage(ctx: Context) {
	// Skip if it's a command
	if (ctx.message?.text?.startsWith('/')) return;

	await ctx.reply('متوجه درخواست شما نشدم. لطفاً از دستورات زیر استفاده کنید:\n' + '/start - شروع\n' + '/help - راهنما');
}
