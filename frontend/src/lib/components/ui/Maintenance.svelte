<script>
  // Ganti path gif sesuai struktur proyekmu. Untuk SvelteKit, letakkan file di `static/images/`
  // contoh: static/images/anime-maintenance.gif -> '/images/anime-maintenance.gif'
  const gifPath = '/images/mt-2.jpg';

  function goHome() {
    // navigasi sederhana; jika pakai `@sveltejs/kit` navigation, bisa ganti dengan `goto('/')`
    location.href = '/';
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&family=Kanit:wght@600&display=swap" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="maintenance-root">
  <div class="card">
    <div class="left">
      <div class="gif-wrap" aria-hidden="true">
        <img src={gifPath} alt="Anime maintenance GIF" loading="lazy" />
        <!-- dekorasi petal sederhana (ditutup aria-hidden karena murni dekoratif) -->
        <!-- <div class="petals" aria-hidden="true">
          <span class="petal p1"></span>
          <span class="petal p2"></span>
          <span class="petal p3"></span>
        </div> -->
      </div>
    </div>

    <div class="right">
      <h1 class="title">Ups! Situs Sedang Perbaikan</h1>
      <p class="desc">Maaf ya, kami sedang melakukan maintenance supaya pengalamanmu makin lancar. Silakan kembali sebentar lagi — ada kejutan anime lucu menantimu! ✨</p>

      <p class="meta">Estimasi singkat: beberapa menit — 1 hari kalau lebih lama, kami akan update. Terima kasih atas kesabaranmu 💖</p>

      <footer class="small">© {new Date().getFullYear()} Finime</footer>
    </div>
  </div>
</div>

<style>
  :root{
    --bg1: black; /* soft pink */
    --bg2: black; /* soft blue */
    --card-bg: rgba(255,255,255,0.7);
    --glass: rgba(255,255,255,0.55);
    --accent: #FF63CC;
    --muted:#6B7280;
  }

  /* reset kecil */
  .maintenance-root{
    min-height:100vh;
    display:flex;
    align-items:center;
    margin-top: 10px;
    justify-content:center;
    color: white;
    padding:24px;
    background: radial-gradient(1200px 600px at 10% 10%, rgba(255,99,204,0.08), transparent 10%),
                radial-gradient(1000px 500px at 90% 90%, rgba(99,181,255,0.06), transparent 10%),
                linear-gradient(135deg,var(--bg1),var(--bg2));
    font-family: 'Nunito', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  }

  .card{
    width:100%;
    max-width:1100px;
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap:28px;
    align-items:center;
    padding:28px;
    border-radius:18px;
    background: linear-gradient(180deg, black, black);
    box-shadow: 0 12px 40px rgba(16,24,40,0.12);
    backdrop-filter: blur(8px) saturate(120%);
  }

  .left{
    display:flex;
    align-items:center;
    justify-content:center;
    min-height:300px;
  }

  .gif-wrap{
    position:relative;
    width:100%;
    max-width:420px;
    border-radius:14px;
    overflow:hidden;
    box-shadow: 0 10px 30px rgba(99,123,255,0.08);
    border: 1px solid rgba(255,255,255,0.6);
    background: linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.15));
  }

  .gif-wrap img{
    display:block;
    width:100%;
    height:auto;
    -o-object-fit:cover;
    object-fit:cover;
  }

  /* pohon/petal dekoratif */
  .petals{
    position:absolute;
    inset:0;
    pointer-events:none;
  }

  .petal{
    position:absolute;
    width:18px;
    height:18px;
    background: radial-gradient(circle at 60% 30%, #fff7, transparent 40%), linear-gradient(135deg,#FFD6E8,#FF9FD6);
    border-radius:50% 40% 60% 50% / 50% 40% 60% 50%;
    opacity:0.95;
    transform:translateY(-10px) rotate(10deg);
    animation: floatPetal 6s linear infinite;
  }
  .petal.p1{ left:10%; top:10%; animation-delay:0s; }
  .petal.p2{ left:70%; top:5%; width:12px; height:12px; animation-delay:1.2s; }
  .petal.p3{ left:40%; top:0%; width:16px; height:16px; animation-delay:2.4s; }

  @keyframes floatPetal{
    0%{ transform: translateY(0) rotate(0) scale(1); opacity:0.95 }
    50%{ transform: translateY(-14px) rotate(8deg) scale(1.05); opacity:1 }
    100%{ transform: translateY(0) rotate(-6deg) scale(1); opacity:0.9 }
  }

  .right{
    padding:8px 6px;
  }

  .title{
    font-family: 'Kanit', 'Nunito', sans-serif;
    font-size:28px;
    margin:0 0 8px 0;
    color: white;
    letter-spacing:0.2px;
  }

  .desc{
    margin:0 0 18px 0;
    color:var(--muted);
    line-height:1.5;
    font-size:16px;
  }

  .controls{
    display:flex;
    gap:12px;
    align-items:center;
    margin-bottom:12px;
    flex-wrap:wrap;
  }

  .btn{
    border:0;
    padding:10px 16px;
    border-radius:12px;
    font-weight:700;
    cursor:pointer;
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-height:44px;
  }

  .btn.primary{
    background: linear-gradient(90deg, var(--accent), #6EB7FF);
    color:white;
    box-shadow: 0 6px 18px rgba(99,123,255,0.12);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .btn.ghost{
    background:transparent;
    color: #0F172A;
    border: 1px solid rgba(15,23,42,0.06);
    font-weight:700;
  }

  .meta{
    color:var(--muted);
    font-size:13px;
    margin-top:6px;
  }

  .small{
    margin-top:18px;
    display:block;
    font-size:12px;
    color:var(--muted);
  }

  /* responsive: buat mobile menjadi satu kolom */
  @media (max-width: 820px){
    .card{
      grid-template-columns: 1fr;
      padding:18px;
      gap:14px;
    }

    .left{
      min-height:220px;
    }

    .title{ font-size:22px }
    .desc{ font-size:15px }
  }

  @media (max-width:420px){
    .gif-wrap{ max-width:320px }
    .title{ font-size:20px }
    .btn{ min-height:40px; padding:10px 12px }
  }
</style>
