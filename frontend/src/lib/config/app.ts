import type { Toast } from "svelte-french-toast";

export const title: string = "Finime";
export const toastOption: Partial<Pick<Toast, "style" | "icon" | "id" | "duration" | "ariaProps" | "className" | "position" | "iconTheme">> = {
  className: "z-[100] bg-black text-white",
  position: "top-right",
  style: "background: hsl(var(--background)); color: hsl(var(--foreground)); border: 1px solid rgba(255, 255, 255, 0.3);",
  duration: 2_000
}

export const clearDisplay = ["/mobile/search", "/mobile/about", "/mobile/see-all", "/auth/login", "/auth/register", "/profile", "/settings", "/mobile/anime.*", "/user/.*", "/mobile/dashboard", "fragment=Other"];
export const exClearDisplayHeader = ["/auth/login", "/auth/register", "/auth/logout"];
export const exClearDisplayBottom = ["fragment=Other"];
export const publicRoute = ["/auth/login", "/auth/register", "/auth/logout", "/profile", "/settings", "/user/"];

export const MAX_RUNTIME_CACHE = 45;
export const MAX_RUNTIME_CACHE_MOBILE = 35;

export const ONLINE_DELAY = 4 * 60 * 1000; // 4 Menit sekali
// Buat jadi offline jika user tidak aktif selama: 5 menit
export const OFFLINE_MINUTE = 5; // Menit