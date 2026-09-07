# Ant Run Game

#### Technologies: TypeScript, React, SCSS, Vite

## Index
* [Installation and Run](#Install)
* [Scripts](#Scripts)
* [Screen Shots](#Shots)
* [Play Ant Run](#Play)

## <a name="Install">Installation and Run</a>
Requires **Node 26** or newer.

* To clone the repo and run the game
```shell
$ git clone https://github.com/adrianeyre/ant-run
$ cd ant-run
$ npm install
$ npm start
```

The dev server runs on http://localhost:3000.

## <a name="Scripts">Scripts</a>
| Script | What it does |
| --- | --- |
| `npm start` | Vite dev server with hot reload |
| `npm run build` | Typecheck, then build the production site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint over the repo |
| `npm run format:check` | Prettier, check only (`npm run format` writes) |
| `npm test` | Vitest, single run (`npm run test:watch` to watch) |

Releases are cut by [semantic-release](https://github.com/semantic-release/semantic-release)
from conventional-commit messages on `master`, which also publishes the site to
GitHub Pages.

## <a name="Shots">Screen Shots</a>
[![Screenshot](https://raw.githubusercontent.com/adrianeyre/ant-run/master/src/images/screenshot1.png)](https://raw.githubusercontent.com/adrianeyre/ant-run/master/src/images/screenshot1.png "Game View")

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/ant-run/master/src/images/screenshot2.png)](https://raw.githubusercontent.com/adrianeyre/ant-run/master/src/images/screenshot2.png "Game View")

## <a name="Play">Ant Run</a>
* [Ant Run](https://adrianeyre.github.io/ant-run/)
