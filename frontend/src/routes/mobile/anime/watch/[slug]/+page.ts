import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }): ISlug => {
  return {
    slug: params.slug
  }
}

export interface ISlug {
  slug: string
}