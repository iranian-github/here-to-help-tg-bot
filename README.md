# Here To Help Telegram Bot Worker

A Cloudflare Worker-based Telegram bot that provides information about free support services and resources for people in need. A subproject of the [Here to Help](https://github.com/iranian-github/here-to-help).

## Features

- `/start` - Welcome message and list of available commands
- `/help` - Usage instructions
- `/suicide` - Information about suicide prevention and self-harm
- `/violence` - Information about domestic violence and physical abuse
- `/illness` - Information about chronic illnesses
- `/addiction` - Information about addiction and substance abuse
- `/general` - General support resources
- `/website` - Get the website URL

## Development Setup

1. Clone the repository

```bash
git clone https://github.com/iranian-github/here-to-help-tg-bot
cd here-to-help-tg-bot-worker
```

2. Install dependencies

```bash
npm install
```

3. Copy the sample environment variables file and fill in your values

```bash
cp .dev.vars.sample .dev.vars
```

4. Delete the webhook (if set) to test locally

```bash
curl -X POST https://api.telegram.org/bot<YOUR_BOT_TOKEN>/deleteWebhook
```

5. Start the development server

```bash
npm run dev
```

## Local Testing with cURL

Once your development server is running, you can test the bot using cURL commands. Here are some examples:

### Test Regular Messages

```bash
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "text": "Hello",
      "chat": {"id": YOUR_CHAT_ID},
      "from": {"id": YOUR_CHAT_ID}
    }
  }'
```

### Test Commands

```bash
# Test /start command
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "text": "/start",
      "chat": {"id": YOUR_CHAT_ID},
      "from": {"id": YOUR_CHAT_ID},
      "entities": [{"type": "bot_command", "offset": 0, "length": 6}]
    }
  }'

# Test /help command
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "text": "/help",
      "chat": {"id": YOUR_CHAT_ID},
      "from": {"id": YOUR_CHAT_ID},
      "entities": [{"type": "bot_command", "offset": 0, "length": 5}]
    }
  }'
```

Note: Replace `YOUR_CHAT_ID` with your actual Telegram chat ID.

## Deployment

To deploy to Cloudflare Workers:

```bash
npm run deploy
```

After deployment, set up your webhook URL:

```bash
curl -X POST https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-worker-url.workers.dev"}'
```

## License

This software is licensed under the MIT License. for more information, please see the [LICENSE](LICENSE) file.
