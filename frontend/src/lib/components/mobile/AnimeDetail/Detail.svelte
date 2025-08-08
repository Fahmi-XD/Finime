<script lang="ts">
  import type { IAnimeDetail } from '$lib/api/types/mobile/detailType';

  export let data: Record<string, any>;

  const animeDetail: IAnimeDetail = data.animeDetail;
</script>

<div class="anime-detail-table-container text-white block pointer-events-auto overflow-x-auto w-full">
  <table class="anime-detail-table bg-black/30">
    <tbody>
      <tr><th>ID</th><td>{animeDetail.id}</td></tr>
      <tr><th>Judul Alternatif</th><td>{animeDetail.altTitles?.join(', ')}</td></tr>
      <tr><th>Deskripsi</th><td>{animeDetail.description}</td></tr>
      <tr><th>Skor</th><td>{animeDetail.score ?? '-'}</td></tr>
      <tr><th>Status</th><td>{animeDetail.status ?? '-'}</td></tr>
      <tr><th>Hari Tayang</th><td>{animeDetail.scheduleDay ?? '-'}</td></tr>
      <tr><th>Jam Tayang</th><td>{animeDetail.scheduleTime ?? '-'}</td></tr>
      <tr><th>Tipe</th><td>{animeDetail.type ?? '-'}</td></tr>
      <tr><th>Episode</th><td>{animeDetail.episodes ?? '-'}</td></tr>
      <tr><th>Musim</th><td>{animeDetail.season ?? '-'}</td></tr>
      <tr><th>Durasi</th><td>{animeDetail.duration ?? '-'}</td></tr>
      <tr><th>Kualitas</th><td>{animeDetail.quality ?? '-'}</td></tr>
      <tr><th>Negara</th><td>{animeDetail.country ?? '-'}</td></tr>
      <tr><th>Sumber</th><td>{animeDetail.source ?? '-'}</td></tr>
      <tr><th>Explicit</th><td>{animeDetail.explicit ?? '-'}</td></tr>
      <tr><th>Demografi</th><td>{animeDetail.demographic ?? '-'}</td></tr>
      <tr><th>Studio</th><td>{animeDetail.studio ?? '-'}</td></tr>
      <tr><th>Anggota</th><td>{animeDetail.members ?? '-'}</td></tr>
      <tr><th>Rating</th><td>{animeDetail.rating ?? '-'}</td></tr>
      <tr><th>Kredit</th><td>{animeDetail.credit ?? '-'}</td></tr>
      <tr><th>Genre</th><td>{animeDetail.genres?.join(', ')}</td></tr>
      <tr><th>Tag</th><td>{animeDetail.tags?.join(', ')}</td></tr>
      <tr><th>Related Tags</th><td>{animeDetail.relatedTags?.join(', ')}</td></tr>
      <tr><th>Followers</th><td>{animeDetail.followers ?? '-'}</td></tr>
      <tr><th>HD/BD</th><td>{animeDetail.hdBd ?? '-'}</td></tr>
      <tr><th>View Count</th><td>{animeDetail.viewCount ?? '-'}</td></tr>
      <tr><th>Comment Count</th><td>{animeDetail.commentCount ?? '-'}</td></tr>
      <tr><th>Copyright</th><td>{animeDetail.copyright ?? '-'}</td></tr>
      <tr>
        <th>Share Link</th>
        <td>
          {#if animeDetail.shareLink}
            <a href={animeDetail.shareLink} target="_blank">{animeDetail.shareLink}</a>
          {:else}
            -
          {/if}
        </td>
      </tr>
      <tr><th>Episode List</th><td>{animeDetail.episodeList?.length ? animeDetail.episodeList.map((e: any) => `${e.ep}`).join(', ') : '-'}</td></tr>
      <tr><th>Themes</th><td>{animeDetail.themes?.join(', ')}</td></tr>
      <tr><th>Social Media</th><td>{animeDetail.socialMedia?.length ? animeDetail.socialMedia.map((s: any) => `${s.name}`).join(', ') : '-'}</td></tr>
      <tr><th>Navigation</th><td>{animeDetail.navigation?.length ? animeDetail.navigation.map((n: any) => `${n.name}`).join(', ') : '-'}</td></tr>
    </tbody>
  </table>
  <h3>Meta</h3>
  <table class="anime-detail-table">
    <tbody>
      {#each Object.entries(animeDetail.meta) as [key, value]}
        <tr><th>{key}</th><td>{Array.isArray(value) ? value.join(', ') : value}</td></tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .anime-detail-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  .anime-detail-table th, .anime-detail-table td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
  }
  .anime-detail-table th {
    width: 30%;
  }
</style>
