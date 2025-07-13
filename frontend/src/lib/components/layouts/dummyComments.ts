export interface DummyComment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  parent?: boolean;
  createdAt: string;
  replies?: DummyComment[];
}

export const dummyComments: DummyComment[] = [
  {
    id: '1',
    user: 'Fahmi XD',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Anime ini keren banget! Ceritanya seru dan animasinya mantap.',
    createdAt: '2 jam lalu',
    parent: true,
    replies: [
      {
        id: '1-1',
        user: 'Otaku123',
        avatar: 'https://i.pravatar.cc/150?img=2',
        content: 'Setuju! Soundtrack-nya juga enak didengar.',
        createdAt: '1 jam lalu',
      },
      {
        id: '1-2',
        user: 'MangaLover',
        avatar: 'https://i.pravatar.cc/150?img=3',
        content: 'Lebih suka versi manganya sih, tapi animenya juga oke.',
        createdAt: '30 menit lalu',
      },
    ],
  },
  {
    id: '2',
    user: 'AnimeFan',
    avatar: 'https://i.pravatar.cc/150?img=4',
    content: 'Ada rekomendasi anime lain yang mirip ini? Mau binge-watching nih!',
    createdAt: '1 jam lalu',
    parent: true,
    replies: [],
  },
  {
    id: '3',
    user: 'Sakura',
    avatar: 'https://i.pravatar.cc/150?img=5',
    content: 'Episode terbaru bikin penasaran banget ending-nya!',
    createdAt: '10 menit lalu',
    parent: true,
    replies: [],
  },
];

export const dummyEpisode = {
  id: "ep1",
  title: "Episode 1: Awal Petualangan",
  description: "Petualangan dimulai di dunia anime yang penuh warna.",
  videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  thumbnail: "https://i.imgur.com/your-thumbnail.jpg",
  defaultStreamingUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  qualities: [
    { label: "360p", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { label: "480p", url: "https://www.w3schools.com/html/movie.mp4" },
    { label: "720p", url: "https://www.w3schools.com/html/mov_bbb.mp4" }
  ],
  episodeList: [
    { id: "ep1", title: "Episode 1" },
    { id: "ep2", title: "Episode 2" },
    { id: "ep3", title: "Episode 3" }
  ],
  synopsis: {
    paragraphs: [
      "Di episode perdana ini, karakter utama memulai petualangan barunya di dunia yang penuh misteri dan tantangan.",
      "Pertemuan dengan teman-teman baru dan musuh yang kuat menjadi awal dari kisah epik yang seru."
    ]
  },
  info: {
    genreList: [
      { title: "Action" },
      { title: "Adventure" },
      { title: "Fantasy" }
    ]
  }
};