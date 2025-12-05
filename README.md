# Game Library

A Next.js and TypeScript project that displays a game library with search and modal details.

---

## Features

- List games in a responsive grid layout.
- Search games with debounce.
- View game details in a modal, including screenshots and features.
- Loading indicator while fetching game details.

---

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Headless UI for modal
- Fetch API for backend calls

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/SoSorryTT/game-list.git
cd game-list
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project in your browser.

---

## Configuration

The API base URL is defined in `app/config.ts`:

```ts
export const BASE_URL = 'https://fe-test-api.midassoft.dev/';
```

We chose to use a `config.ts` file instead of `.env` because:

- The API base URL is static and unlikely to change per environment.
- No sensitive information (like API keys) is required.
- It keeps the project simpler for development in this case.

---

## Usage

- Type in the search box to find games.
- Click a game card to view details in a modal.

---

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build production
npm run start     # Run production build
npm run lint      # Run ESLint
```

---

## License

This project is open-sourced under the MIT License.
