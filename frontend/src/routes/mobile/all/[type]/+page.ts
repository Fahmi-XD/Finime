import type { PageLoad } from "./$types"

export const load: PageLoad = ({ params }): ITypeParams => {
  return {
    type: params.type
  }
}

export interface ITypeParams {
  type: string
}