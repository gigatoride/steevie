# Steevie Bot

![MIT](https://img.shields.io/github/license/gigatoride/steevie.svg)
A personal assistant for Steem blockchain.

## Features

- Steem Account Profile Viewer
- Steem Account Wallet Viewer
- Steem Account Posts
- Crypto Prices
- Notifications Manager
  - Replies
  - Mentions
  - Transfers
- Trending Posts

More features is under development.

## Usage

![](./assets/gif/usage.gif)

1. Start chatting with the bot https://telegram.me/SteevieBot
2. Hit /start
3. Setup your Steem Account /setup
4. Enjoy All commands /help

## Host your own bot

### Setup

```
git clone https://github.com/gigatoride/steevie
```

```
cd steevie
```

```
npm install
```

### Configuration

Message @botfather to create a new bot

Then create .env file:

```
NODE_ENV=development
BOT_TOKEN=your_api_token
MONGODB_URI=your_mongo_db_uri
```

### Set commands

Use /setcommands in @botfather chat

then send the following commands in [commands.txt](https://github.com/gigatoride/steevie/blob/master/commands.txt)

### Running

To start the bot please use the following command:

```
npm start
```

## Licence

MIT
