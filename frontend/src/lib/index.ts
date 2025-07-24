// place files you want to import through the `$lib` alias in this folder.
import { mode as modeStore } from '$lib/stores/mode';
import { publicRoute } from './config/app';
import { goto } from '$app/navigation';

function truncate(text: string, maxLength: number) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

const handleResize = (path: string) => {
		if (window.innerWidth < 768) {
			modeStore.set("flat")
			if (!publicRoute.some((route) => path == route)) goto("/mobile", { replaceState: true });
		} else {
			modeStore.set("colorful")
		}
	};

export { truncate, handleResize };