import { Bot, webhookCallback } from 'grammy';
import { Env } from './interfaces/types';
import { handleStart, handleHelp, handleWebsite, handleCategory, handleUnknownMessage } from './handlers/commands';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const bot = new Bot(env.BOT_TOKEN, { botInfo: JSON.parse(env.BOT_INFO) });

		// Register command handlers
		bot.command('start', handleStart);
		bot.command('help', handleHelp);
		bot.command('website', handleWebsite);

		// Register category commands
		const categoryCommands = ['suicide', 'violence', 'illness', 'addiction', 'general'];
		for (const command of categoryCommands) {
			bot.command(command, (ctx) => handleCategory(ctx, command, env));
		}

		// Handle unknown commands
		bot.on('message', handleUnknownMessage);

		return webhookCallback(bot, 'cloudflare-mod')(request);
	},
};
