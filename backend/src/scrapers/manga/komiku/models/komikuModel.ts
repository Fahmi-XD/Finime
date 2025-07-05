export interface IDetailKomikuModel {
  title: string
  type: string
  author: string
  status: string
  manga_endpoint: string
  thumb: string
  genre_list: any[]
  synopsis: string
  chapter: any[]
  card_info: {
    judul_komik: string
    judul_indonesia: string
    jenis_komik: string
    Konsep_cerita: string
    author: string
    status: string
    umur_pembaca: string
    cara_baca: string
  }
}