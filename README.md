# nextjs-cli
A project builder CLI for Next.js applications

## Usage:
```
nextjs-cli <command>
```

### Available commands:

- `init` - Sets up a new Next.js project with create-next-app, with flag presets and additional config (husky, prettier, jest)
- `database` - Set up database & files (MongoDB)
- `deploy` - Directs user to deployment service (Vercel / AWS)
- `auth` - Set up auth (Kinde Auth)


## To start running the npm package locally:
```
npm run build
```
```
npm link
```
In another terminal:
```
cd demo
```
```
npm link nextjs-cli
```
```
nextjs-cli <command>
```

### While developing, to see local changes you need to update the build. Go to root directory:
```
npm run build
```
