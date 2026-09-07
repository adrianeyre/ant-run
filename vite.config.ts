import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * The site is published to https://adrianeyre.github.io/ant-run/, which is a
 * project page rather than a user page — every asset URL therefore has to carry
 * the repository name. `./` would work for the deployed site but breaks the dev
 * server's client-side paths, so the prefix is written out.
 */
export default defineConfig({
	base: '/ant-run/',
	plugins: [react()],
	resolve: {
		// `classes/...` and `components/...` were absolute imports under Create
		// React App's `baseUrl: src`. Vite has no such notion, so the two roots
		// that were actually used are declared here.
		alias: {
			classes: fileURLToPath(new URL('./src/classes', import.meta.url)),
			components: fileURLToPath(new URL('./src/components', import.meta.url)),
		},
	},
	server: {
		host: true,
		port: 3000,
		open: false,
	},
	preview: {
		host: true,
		port: 4173,
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
		sourcemap: true,
		target: 'es2022',
	},
});
