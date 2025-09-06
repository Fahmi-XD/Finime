import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export let ssr = false;
export let csr = true;

export const load: PageLoad = async ({ params }) => {
  const { char_name } = params;
  
  // Validasi karakter yang tersedia
  const availableCharacters = ['assistant', 'anime', 'coding', 'creative'];
  
  if (!availableCharacters.includes(char_name)) {
    throw error(404, {
      message: `Karakter AI '${char_name}' tidak ditemukan`
    });
  }
  
  return {
    character: char_name
  };
};