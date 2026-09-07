import '@testing-library/jest-dom/vitest';

// jsdom implements no media queries at all, and the layout code reads one on
// mount. A stub that always reports "no match" is what the browser would say
// for the queries this game asks.
window.matchMedia =
	window.matchMedia ||
	((query: string) =>
		({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}) as unknown as MediaQueryList);
