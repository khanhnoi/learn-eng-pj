<p align="center">
<img src="logo.png" alt="logo"/>
<h3 align="center">XaGoE NextJS PWA</h3></p>
</p>

## Contents

- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Deploy to Now](#deploy-to-now)
- [Deploy to Netlify](#deploy-to-netlify)
- [Deploy to Gitpod](#deploy-to-gitpod)

### Installation

Install the dependencies:

```sh
yarn install
```

### Development Workflow

Start a live-reload development server:

```sh
yarn dev
```

Generate a production build:

```sh
yarn build
```

### Deploy to Now

```sh
now dev
```

For production, update alias in the now.json ie `"alias": "nextss-yourname.now.sh",`

```sh
now
```

### Deploy to Heroku

Just follow <a href="https://github.com/mars/heroku-nextjs">Mars's Guide</a> and you're good to go :clap:

### Deploy to Netlify

- On netlify, Click on new site from git.
- Select Cloned Repository.
- Choose VCS.
- Add build command `npm run export`.
- Add publish directory `out`.

### Deploy to Gitpod

<a href="https://gitpod.io/#https://github.com/ooade/NextSimpleStarter">Click here</a> to deploy on Gitpod

### License

MIT
