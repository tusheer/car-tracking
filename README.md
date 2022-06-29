# CarTracking app with Turborepo

I used [Turborepo](https://turborepo.org/) as a monorepo solution. Turborepo helps to share components, utilites, types, reusable configurations, and many more throughout the whole code base. reducing lots of code duplication.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server and frontend applications.

```sh
cd car-tracking
npm install
npm run dev
```

## Applications running on

| Application     | PORT |
| --------------- | ---- |
| Manager portal  | 3000 |
| Operator Portal | 3001 |
| Api Server      | 4000 |

```
car-tracking
├── apps  - Manage Frontend Applications
|   └──  manager-portal  - Next.js Application
|   └──  operator-portal  - Next.js Application
├── packages - Manage all shared packages (components, types, utils, hooks, configuration)
|   └──  ui - UI related packages
|        └── components
|        └── hooks
|        └── icons
|        └── components
|   └──  types - Typescript types
|   └── utils - Typescript utilites
|   └──  ts-config - Typescript configuration
|   └──  eslint-config-custom - Typescript configuration
|   └──  tailwind-config - Typescript configuration
├── servers
│   └── api
└──
README.md
```
