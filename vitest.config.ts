import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			classes: fileURLToPath(new URL('./src/classes', import.meta.url)),
			components: fileURLToPath(new URL('./src/components', import.meta.url)),
		},
	},
	test: {
		// The components render real DOM nodes; enzyme's shallow renderer, which
		// these tests used to rely on, has no React 19 adapter and never will.
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/setupTests.ts'],
		include: ['src/**/*.{test,spec}.{ts,tsx}'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov'],
			include: ['src/**/*.{ts,tsx}'],
			exclude: ['src/**/interfaces/**', 'src/**/tests/**', 'src/main.tsx'],
		},
	},
});
