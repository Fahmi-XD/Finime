<script lang="ts">
  import type { DummyComment } from "./dummyComments";
  import { createEventDispatcher } from "svelte";
  import CommentThread from "$lib/components/layouts/CommentThread.svelte";

  export let comments: DummyComment[] = [];
  export let depth: number = 0;

  const dispatch = createEventDispatcher();

  let replyTo: string | null = null;
  let replyContent: string = "";

  function handleReply(parentId: string) {
    replyTo = parentId;
    replyContent = "";
  }

  function submitReply(parentId: string) {
    if (replyContent.trim()) {
      dispatch("reply", { parentId, content: replyContent });
      replyTo = null;
      replyContent = "";
    }
  }
</script>

<div class="space-y-6">
  {#each comments as comment (comment.id)}
    <div class="flex gap-3 items-start" style="margin-left: {depth * 5}px">
      <img src={comment.avatar} alt={comment.user} class="w-10 h-10 rounded-full border-2 border-white/20 shadow" />
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="font-bold text-white">{comment.user}</span>
          <span class="text-xs text-gray-400">{comment.createdAt}</span>
        </div>
        <div class="bg-white/10 rounded-xl p-3 text-gray-200 text-sm mb-2 shadow">
          {comment.content}
        </div>
        {#if comment?.parent}
          <div class="flex gap-2 items-center mb-1">
            <button class="text-xs text-red-400 hover:underline font-semibold" on:click={() => handleReply(comment.id)}>Reply</button>
          </div>
        {/if}
        {#if replyTo === comment.id}
          <div class="mb-2">
            <textarea
              class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500 transition-all resize-none min-h-[40px] mb-2"
              placeholder="Tulis balasan..."
              bind:value={replyContent}
              rows="2"
            ></textarea>
            <div class="flex gap-2">
              <button class="px-4 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-bold shadow hover:from-red-600 hover:to-red-700 transition-all" on:click={() => submitReply(comment.id)}>Kirim</button>
              <button class="px-4 py-1 bg-gray-700 text-white rounded-lg font-bold shadow hover:bg-gray-600 transition-all" on:click={() => (replyTo = null)}>Batal</button>
            </div>
          </div>
        {/if}
        {#if comment.replies && comment.replies.length > 0}
          <CommentThread comments={comment.replies} depth={depth + 1} on:reply={(e) => dispatch('reply', e.detail)} />
        {/if}
      </div>
    </div>
  {/each}
</div> 