<!-- Allow this file to not have a first line heading -->
<!-- markdownlint-disable-file MD041 no-emphasis-as-heading -->

<!-- inline html -->
<!-- markdownlint-disable-file MD033 -->

<div align="center">

<img src="https://github.com/10ai/next-quick/assets/42549561/3f83b293-6a82-4581-b8c6-64fb5a7b17fb" width=200>

# `next-quick` 

**⚡️ NextJS quickstart project builder CLI**

[![10x](https://img.shields.io/badge/10xAI-open%20source-blueviolet.svg)](https://10ai.dev)
[![10x](https://img.shields.io/badge/discord-10xAI-%237289da.svg?logo=discord)](https://discord.gg/FJZ4nyhBW7)

</div>

https://github.com/10ai/next-quick/assets/42549561/41c15e84-76e5-4c28-aa9b-85154956ab11

## Features
### 🐣 `init`
- 🏃‍♂️ Runs [`create-next-app@latest`](https://nextjs.org/docs/pages/api-reference/create-next-app) with
    - [Next.js App Router](https://nextjs.org/docs/app)
    - [npm](https://docs.npmjs.com/about-npm)
    - [TypeScript](https://www.typescriptlang.org/)
    - [Tailwind CSS](https://tailwindcss.com/)
- 🪄 [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/) w/ config files
- 🐶 Sets up [Husky](https://typicode.github.io/husky/) pre-commit hook w/ [lint-staged](https://github.com/lint-staged/lint-staged)
    - Runs Prettier and ESLint on all staged files
- 🧪 Installs [Jest](https://jestjs.io/)

### 🗃️ `database`
- 🦆 [MongoDB](https://www.mongodb.com/) w/ [Mongoose](https://www.mongodb.com/services/support/mongoose-odm-support)
    - Step-by-step setup guide
    - Updates `.env.local`
    - Creates example User schema
    - Sets up database connection file and API endpoint
    - Generates frontend page to test DB connection

### 🚀 `deploy`
- ⚫ [Vercel](https://vercel.com/)
- 🅰️ [AWS Amplify](https://aws.amazon.com/amplify)

### 🔐 `auth`
- 🦋 [Kinde Auth](https://kinde.com/)
   - Step-by-step setup guide
   - < 5 min setup time!
   - OAuth - Google, FaceBook, GitHub, LinkedIn, etc.
   - MFA - email, phone number, authenticator app
   - Magic links & passwordless login
    


## Install
```
npm i -g next-quick
```

## Usage
```
next-quick <command>
```

### Available commands:

- <a href="#-init">`init`</a> - Sets up a new Next.js project with create-next-app, with flag presets and additional config (husky, prettier, jest)
- <a href="#-database">`database`</a> - Set up database & files (MongoDB)
- <a href="#-deploy">`deploy`</a> - Directs user to deployment service (Vercel / AWS)
- <a href="#-auth">`auth`</a> - Set up auth (Kinde Auth)


## Contributing

[![Contributor Covenant](https://img.shields.io/badge/contributor%20covenant-v1.0-ff69b4.svg)](CODE_OF_CONDUCT.md)

We welcome community contributions to this project.

Please read our [Contributor Guide](CONTRIBUTING.md) for more information on how to get started.
Please also read our [Contributor Terms](CONTRIBUTING.md#contributor-terms) before you make any contributions.

Any contribution intentionally submitted for inclusion in a 10x AI project, shall comply with the MIT license and therefore licensed as described below, without any additional terms or conditions:

### License

This contribution is dual licensed under MIT license ([LICENSE-MIT](LICENSE-MIT) or <http://opensource.org/licenses/MIT>) at your option.

For clarity, "your" refers to 10x AI or any other licensee/user of the contribution.
