import type { Toast } from "svelte-french-toast";

export const title: string = "Finime";
export const toastOption: Partial<Pick<Toast, "style" | "icon" | "id" | "duration" | "ariaProps" | "className" | "position" | "iconTheme">> = {
  className: "z-[100] bg-black text-white",
  position: "top-right",
  style: "background: hsl(var(--background)); color: hsl(var(--foreground)); border: 1px solid rgba(255, 255, 255, 0.3);",
  duration: 2_000
}