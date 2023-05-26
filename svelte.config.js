import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		typescript: true,
		scss: {
			prependData: `@import './src/lib/style/main.scss'; @import './src/lib/style/resets.css';`
		}
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components',
			$assets: 'src/assets/'
		}
	},

	onwarn: (warning, handler) => {
		const { code } = warning;
		if (code === 'css-unused-selector') return;

		handler(warning);
	}
};

export default config;
