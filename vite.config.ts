import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * The site is published to https://ant-run.adrianeyre.co.uk, a custom domain
 * served from the root of its own host, so assets sit at `/assets/...` with no
 * repository-name prefix. The old `/ant-run/` base was correct only for the
 * github.io project page and 404s every asset once the custom domain is in use.
 */
export default defineConfig({
	base: '/',
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
