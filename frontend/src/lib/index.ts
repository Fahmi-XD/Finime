// place files you want to import through the `$lib` alias in this folder.
import { mode as modeStore } from '$lib/stores/mode';
import { publicRoute, OFFLINE_MINUTE } from './config/app';
import { goto } from '$app/navigation';
import { crossfade as svelteCrossfade } from 'svelte/transition';

export const crossfade = svelteCrossfade({ duration: 2000 });

function truncate(text: string, maxLength: number) {
	return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

const handleResize = (path: string) => {
	if (window.innerWidth < 768) {
		modeStore.set("flat")
		if (!publicRoute.some((route) => path.includes(route))) goto("/mobile", { replaceState: true });
	} else {
		modeStore.set("colorful")
	}
};

function getInitials(name: string | undefined) {
	return name ? name.charAt(0).toUpperCase() : '?';
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

class BrowserData {
  static get(key: string) {
    return window.localStorage.getItem(key)
  }

  static set(key: string, value: any) {
    window.localStorage.setItem(key, value);
    return true
  }
}

function isBlobUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "blob:";
  } catch (e) {
    return false;
  }
}

function isPublicUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch (e) {
    return false;
  }
}

function checkOnline(lastSeen: Date) {
  return (new Date().getTime() - new Date(lastSeen).getTime()) < OFFLINE_MINUTE * 60 * 1000;
}

function timeAgo(date: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + " tahun yang lalu";

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + " bulan yang lalu";

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + " hari yang lalu";

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + " jam yang lalu";

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + " menit yang lalu";

  return "baru saja";
}

export { truncate, handleResize, getInitials, urlBase64ToUint8Array, BrowserData, isBlobUrl, isPublicUrl, checkOnline, timeAgo }