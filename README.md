# Hub88 Frontend Test Task

A solution for Hub88's frontend developer challenge that displays and filters country data from GraphQL API. Because
sometimes you just need to know if it's FI or FL (spoiler: Finland is FI 🇫🇮).

## Task Requirements

- ✅ Consume GraphQL data from https://countries.trevorblades.com/
- ✅ Create a filter + table interface
- ✅ Filter by country code
- ✅ Display country name and code
- ✅ TypeScript implementation
- ✅ Test coverage

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test
```

## Implementation Details

Built with:

- React + TypeScript
- Vite
- Material UI
- React Testing Library
- Vitest

The solution implements error handling, loading states, and cleanup on unmount. Tests cover API responses, error cases,
and component behavior.
