# line-crypto

## Setup

### 1. Rename environments file

Setup a development. Copy [.env.example](./.env.example) and rename to `.env`

```bash
cp .env.example .env
```

### 2. Install Dependencies

Install the dependencies for the application:

```bash
npm install
# or

# Options for upgrading to yarn v3 
yarn set version berry

# If already or unser yarn v3 
yarn install

# VSCode Extension
yarn dlx @yarnpkg/sdks vscode
```

### 3. Start Line-crypto Server

Run Nest Server in Development mode:

```bash
npm start
# or
yarn start

# watch mode
npm run dev
# or
yarn run start
```
