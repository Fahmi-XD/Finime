import type { LayoutServerLoad } from "./$types";
import { fullscreen } from "$lib/stores/mode";

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.serverStatus == "maintenance") fullscreen.set(true);

	return {
		user: locals.user,
		serverStatus: locals.serverStatus
	};
};