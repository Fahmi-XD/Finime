# <img src="https://media.tenor.com/7hiQYhUQY2QAAAAM/dis.gif" alt="ComicHive Logo" width="30"/> Finime



> **Finime** — Aplikasi web streaming Anime & Manga gratis, tanpa iklan, dan bebas gangguan, dikembangkan untuk developer dan open‑source.  

---

## 📋 Daftar Isi

1. [Tentang Finime](#tentang-finime)  
2. [Fitur Utama](#fitur-utama)  
3. [Stack & Library](#stack--library)  
4. [Struktur Proyek](#struktur-proyek)  
5. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Setup & Instalasi](#setup--instalasi)  
   - [Menjalankan Server](#menjalankan-server)  
6. [Environment Variables](#environment-variables)  
7. [Arsitektur & Alur Kerja](#arsitektur--alur-kerja)  
8. [Guidelines Kontribusi](#guidelines-kontribusi)  
9. [License](#license)  

---

## 🔍 Tentang Finime

Finime adalah proyek open‑source yang bertujuan menyediakan platform **streaming Anime & Manga** secara gratis, tanpa iklan, dan tanpa gangguan lainnya.  
Dirancang sebagai full‑stack web application dengan **frontend** Svelte dan **backend** ElysiaJS + TypeScript, Finime mendorong kolaborasi antar developer untuk menambah fitur, memperbaiki bug, atau mengintegrasikan layanan baru.

---

## 🚀 Fitur Utama

- **Profile Badge**  
- **User Authentication** (Login & Register)  
- **Dashboard Admin** (Manajemen konten & user)  
- **Search** Anime & Manga  
- **No Ads**  
- **Database**: MongoDB  
- **Open Source** & Mudah Dikembangkan  

---

## 🛠 Stack & Library

### Frontend  
- **[Svelte](https://svelte.dev/)**  
- **@lucide/svelte** (Icon pack)  
- **js-cookie** (Manage cookies auth)  
- **Tailwind CSS** (Utility‑first styling)  
- **Axios** (HTTP client)  

### Backend  
- **[Elysia JS](https://elysiajs.dev/)** (Web framework)  
- **Prisma** (Type‑safe ORM)  
- **bcrypt** (Hashing password)  
- **NodeMailer** (Email & notifikasi)  
- **Zod** (Schema validation)  

### Database  
- **MongoDB**  

---

## 📂 Struktur Proyek

```
Finime
├ backend                
├─ prisma/
├─ src/
│  ├─ @types/
│  ├─ controllers/
│  ├─ databases/
│  ├─ lib/
│  ├─ middleware/
│  ├─ routes/
│  ├─ scrapers/
│  ├─ services/
│  ├─ validations/
│  ├─ env.ts/                  
│  └─ index.ts/                
├─ bun.lock                   
├─ package.json               
├─ README.md                  
├─ tsconfig.json              
├─ vercel.json
├
├ frontend                               
├─ src                                 
│  ├─ components/                     
│  │  ├─ elements/        
│  │  ├─ fragments/         
│  │  ├─ layouts/           
│  ├─ data/             
│  ├─ hooks/            
│  ├─ lib/
│  ├─ routes/      
│  │  ├─ 500/     
│  │  ├─ about/  
│  │  ├─ anime/
│  │  │  ├─ watch/ 
│  │  │  │  └─ [episode_id]/
│  │  │  ├─ [anime_slug]/      
│  │  ├─ auth/            
│  │  │  ├─ login/
│  │  │  ├─ logout/  
│  │  │  └─ register/
│  │  ├─ chapter/            
│  │  │  └─ [chapter_slug]/          
│  │  ├─ community/     
│  │  ├─ dashboard/      
│  │  ├─ genres/             
│  │  │  └─ [genres_slug]/       
│  │  ├─ manga/              
│  │  │  ├─ [manga_slug]/          
│  │  │  └─ +page.svelte               
│  │  ├─ map.xml/      
│  │  ├─ profile/      
│  │  ├─ robots.txt/            
│  │  ├─ sitemap.xml/           
│  │  ├─ u/                
│  │  │  └─ [username]/      
│  ├─ stores/           
│  ├─ types/             
│  ├─ utils/           
│  ├─ app.css                          
│  ├─ app.d.ts                         
│  ├─ app.html                         
│  └─ env.ts                           
├─ static/             
├─ bun.lock                            
├─ docker-compose.yml                  
├─ Dockerfile                          
├─ package-lock.json                   
├─ package.json                        
├─ README.md                           
├─ svelte.config.js                    
├─ tsconfig.json                       
├─ vite.config.ts                      
│
├── tmp/                     # ⚠️ Unused, aman untuk dihapus
└── README.md
````

> **Catatan:** Folder `tmp/` tidak digunakan dalam workflow. Bisa dihapus atau di‑ignore.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+ & npm/yarn/bun
- MongoDB instance (lokal atau Atlas)  
- CLI Prisma (`npm install -g prisma`)

### Setup & Instalasi

1. **Clone repo**  
   ```bash
   git clone https://github.com/.../finime.git
   cd finime
   ```

2. **Setup Backend**

   ```bash
   cd backend
   bun install
   cp .env.example .env
   # Edit .env sesuai konfigurasi Anda
   bunx prisma generate
   bunx prisma migrate dev
   ```

3. **Setup Frontend**

   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   # Atur PUBLIC_API sesuai url backend
   ```

### Menjalankan Server

* **Backend**

  ```bash
  cd backend
  bun run dev
  ```

* **Frontend**

  ```bash
  cd frontend
  bun run dev
  ```

---

## 🔑 Environment Variables

Buat file `.env` di masing‑masing folder dengan variabel berikut:

### Backend `.env`

```env
DATABASE_URL=mongodb://localhost:27017/finime
```

### Frontend `.env`

```env
PUBLIC_API=http://localhost:3000
```

---

## 🏗 Arsitektur & Alur Kerja

1. **Client (Svelte)** berkomunikasi via **Axios** ke endpoint **ElysiaJS**
2. Semua request masuk divalidasi dengan **Zod**, lalu diteruskan ke **Prisma** untuk operasi DB
3. Autentikasi & session-cookie (menggunakan `js-cookie`)
<!-- 4. Bagian Admin pada frontend melindungi route dengan guard dan role check
5. Notifikasi email mendaftar & reset password via **NodeMailer** -->

---

## 🤝 Guidelines Kontribusi

1. **Fork** repositori ini.
2. **Buat branch** baru untuk fitur/bugfix:

   ```bash
   git checkout -b feature/nama-fitur
   ```
3. **Commit** dengan pesan jelas.
4. **Push** ke fork Anda dan ajukan **Pull Request** ke `main`.
5. Kami akan review dan merge setelah lulus CI & code review.

---

## 📄 License

Distributed under the MIT License. Silakan lihat [LICENSE](./LICENSE) untuk detail.

---

**Selamat ngoding!**
Ingin fitur baru atau menemukan bug? Jangan ragu untuk membuka issue atau langsung submit PR.

![app icon](./.github/readme-images/logo.gif)