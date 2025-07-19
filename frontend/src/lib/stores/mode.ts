import { writable } from 'svelte/store';
import { toast } from 'svelte-french-toast';
import { toastOption } from '$lib/config/app';

export const mode = writable<'colorful' | 'flat'>('colorful');

mode.subscribe((value) => {
  if (value === 'colorful') {
    toast.success('Desktop mode', {
      ...toastOption,
      duration: 1_000
    });
  } else {
    toast.success('Mobile mode', {
      ...toastOption,
      duration: 1_000
    });
  }
});