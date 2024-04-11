import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteTsconfigPaths(),
		svgr({
			include: '**/*.svg?react',
		}),
	],
	server: {
		open: true,
	}
});
