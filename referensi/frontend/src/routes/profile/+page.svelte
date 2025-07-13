<script lang="ts">
  import { onMount } from "svelte";
  import { user, fetchUser, fetchAllBadge } from "$stores/user";
  import { writable } from "svelte/store";
  import { fade } from "svelte/transition";
  import LoadingElements from "$/components/elements/LoadingElements.svelte";
  import { PUBLIC_API } from "$env/static/public";
  import {
    User,
    BookOpen,
    Film,
    Edit,
    Mail,
    Shield,
    BadgeCheckIcon,
    History,
    Star,
  } from "@lucide/svelte";
  import { FetchApi } from "$utils/Fetch";
  import Button from "$/components/elements/Button.svelte";
  import ProfileForm from "$/components/fragments/ProfileForm.svelte";
  import Role from "$/components/elements/Role.svelte";

  let isLoading = writable(true);
  let isModalOpen = writable(false);
  let badges: any = [];
  let formData = writable({
    username: "",
    name: "",
    avatar: "",
    email: "",
    first_name: "",
    last_name: "",
    bio: "",
    badge: [""],
    banner: "",
  });
  let error = writable("");
  let success = writable("");
  let avatarFile: File | null = null;
  let avatarPreview = writable<string | null>(null);

  function getInitials(name: string) {
    return name ? name.charAt(0).toUpperCase() : "?";
  }

  function openModal() {
    if ($user) {
      formData.set({
        username: $user.username || "",
        name: $user.name || "",
        avatar: $user.avatar || "",
        email: $user.contact?.email || "",
        first_name: $user.contact?.first_name || "",
        last_name: $user.contact?.last_name || "",
        bio: $user.bio || "",
        badge: $user.badge || [],
        banner: $user.banner || "",
      });
      avatarFile = null;
      avatarPreview.set(null);
    }
    isModalOpen.set(true);
    error.set("");
    success.set("");
  }

  async function handleSubmit() {
    try {
      isLoading.set(true);
      error.set("");
      success.set("");

      let payload;

      if (avatarFile) {
        const formDataObj = new FormData();
        formDataObj.append("avatar", avatarFile);
        formDataObj.append("username", $formData.username);
        formDataObj.append("name", $formData.name);
        formDataObj.append("email", $formData.email);
        formDataObj.append("first_name", $formData.first_name);
        formDataObj.append("last_name", $formData.last_name);
        formDataObj.append("bio", $formData.bio);
        formDataObj.append("banner", $formData.banner);

        const response = await FetchApi.patch("/user", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          success.set("Profile updated successfully!");
          await fetchUser();
          setTimeout(() => isModalOpen.set(false), 1500);
        } else {
          error.set("Failed to update profile");
        }
      } else {
        payload = Object.fromEntries(
          Object.entries($formData).filter(([_, value]) => value !== ""),
        );

        const response = await FetchApi.patch("/user", payload);

        if (response.status === 200) {
          success.set("Profile updated successfully!");
          await fetchUser();
          setTimeout(() => isModalOpen.set(false), 1500);
        } else {
          error.set("Failed to update profile");
        }
      }
    } catch (err: any) {
      error.set(err.response.data.message || "An error occurred");
    } finally {
      isLoading.set(false);
    }
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      avatarFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview.set(e.target?.result as string);
        $formData.avatar = "";
      };
      reader.readAsDataURL(avatarFile);
    }
  }

  function clearAvatar() {
    avatarFile = null;
    avatarPreview.set(null);
  }

  onMount(async () => {
    await fetchUser();
    badges = await fetchAllBadge();
    badges = (badges as Array<any>).filter((item) => $user?.badge?.includes(item?.id as string));

    if (!$user) {
      window.location.href = "/";
    }
    isLoading.set(false);
  });
</script>

<div
  class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(var(--primary)/5%)] to-[hsl(var(--secondary)/5%)] py-12 px-4 sm:px-6 lg:px-8 sm:mt-0 mt-10"
>
  <div class="w-full max-w-5xl mx-auto">
    {#if $isLoading && !$isModalOpen}
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <LoadingElements />
      </div>
    {/if}

    <div
      class="bg-[hsl(var(--card))] rounded-2xl md:mt-10 shadow-xl overflow-hidden border border-[hsl(var(--border))]"
    >
      <div class="flex flex-col md:flex-row">
        <div
          class="w-full md:w-1/2 p-8 bg-gradient-to-b from-[hsl(var(--primary)/10%)] to-transparent flex flex-col"
        >
          <div class="relative w-auto flex">
            {#if $user?.banner}
              <img class="h-[160px] w-full object-cover" src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={$user.banner}" alt="Banner Gif" />
            {/if}
            <div
              class="w-auto {$user?.banner ? "absolute left-0 -bottom-20" : ""} h-auto rounded-full overflow-hidden flex"
            >
              {#if $user}
                {#if $user.avatar}
                  <img
                    src="{PUBLIC_API}/api/v1/proxy-media?mediaUrl={$user.avatar}"
                    alt="Profile picture of {$user.name}"
                    class="w-32 h-32 border-4 border-[hsl(var(--primary)/30%)] bg-white/50 rounded-full object-cover transition-all duration-300 hover:scale-110"
                  />
                {:else}
                  <div
                    class="flex items-center border-4 border-[hsl(var(--primary)/30%)] bg-white/50 justify-center w-32 h-32 text-4xl font-bold text-white bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))]"
                  >
                    {getInitials($user.name)}
                  </div>
                {/if}
              {:else}
                <div
                  class="p-5 text-[hsl(var(--muted-foreground))] bg-[hsl(var(--secondary))] rounded-full"
                >
                  <User size={40} />
                </div>
              {/if}
            </div>
          </div>

          <div class="flex gap-3 {$user?.banner ? "mt-23" : "mt-3"} items-center">
            <h1 class="text-2xl font-bold tracking-tight">
              {$user?.name || "Guest User"}
            </h1>
            {#if $user?.role === "ADMIN" || $user?.isVerify}
              <BadgeCheckIcon fill="#1DA1F2" />
            {/if}
          </div>
          <p class="text-[hsl(var(--muted-foreground))] mt-1 text-sm">
            @{$user?.username || "unknown"}
          </p>

          {#if $user?.contact}
            <div class="mt-6 w-full space-y-3 text-left">
              {#if $user.contact.email}
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-0.5">
                    <div
                      class="w-5 h-5 rounded-full bg-[hsl(var(--primary)/10%)] flex items-center justify-center text-[hsl(var(--primary))]"
                    >
                      <Mail size={12} />
                    </div>
                  </div>
                  <p class="ml-2 text-sm break-all">{$user.contact.email}</p>
                </div>
              {/if}

              {#if $user.contact.first_name || $user.contact.last_name}
                <div class="flex items-start">
                  <div class="flex-shrink-0 mt-0.5">
                    <div
                      class="w-5 h-5 rounded-full bg-[hsl(var(--primary)/10%)] flex items-center justify-center text-[hsl(var(--primary))]"
                    >
                      <User size={12} />
                    </div>
                  </div>
                  <p class="ml-2 text-sm">
                    {$user.contact.first_name}
                    {$user.contact.last_name}
                  </p>
                </div>
              {/if}

              <div class="flex items-center gap-1">
                <div class="flex-shrink-0">
                  <div
                    class="w-5 h-5 rounded-full bg-[hsl(var(--primary)/10%)] flex items-center justify-center text-[hsl(var(--primary))]"
                  >
                    <Shield size={12} />
                  </div>
                </div>
                <div>
                  {#if $user.role === "ADMIN" || $user.role === "MODERATOR"}
                    <Role variant="admin">{$user.role}</Role>
                  {:else}
                    <Role variant="member">{$user.role}</Role>
                  {/if}
                </div>
              </div>

              <ul class="flex flex-wrap gap-2">
                {#each badges as badge}
                  <li class="flex gap-1">
                    <div class="flex-shrink-0">
                      <div
                        class="w-5 h-5 rounded-full bg-[hsl(var(--primary)/10%)] flex items-center justify-center {badge.iconColor}"
                      >
                        <badge.icon size={12} />
                      </div>
                    </div>
                    <div>
                      <Role variant="badge" color={badge.textColor}>{badge.name}</Role>
                    </div>
                  </li>
                {/each}
              </ul>
            </div>

            <div class="mt-8 w-full">
              <!-- <Button on:click={openModal} variant="primary" classes="w-full group">
                <span class="flex items-center justify-center">
                  <Edit size={16} class="mr-2" />
                  Settings
                </span>
              </Button> -->
              <a href="/settings" class="w-full bg-red-500 block py-1 rounded-2xl">
                <span class="flex items-center justify-center">
                  <Edit size={16} class="mr-2" />
                  Settings
                </span>
              </a>
            </div>
          {/if}
        </div>

        <div
          class="w-full md:w-2/3 p-8 bg-[hsl(var(--card))] border-t md:border-t-0 md:border-l border-[hsl(var(--border)/50%)]"
        >
          <div class="mb-8">
            <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-[hsl(var(--border))]">
              Your Statistics
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                class="bg-[hsl(var(--secondary)/20%)] p-4 rounded-xl border border-[hsl(var(--border)/30%)] hover:shadow-sm transition-all duration-200 hover:translate-y-[-2px]"
              >
                <div class="flex items-center">
                  <div
                    class="p-2 rounded-lg bg-[hsl(var(--primary)/10%)] text-[hsl(var(--primary))] mr-4"
                  >
                    <Film size={20} />
                  </div>
                  <div>
                    <p class="text-sm text-[hsl(var(--muted-foreground))] font-medium">
                      Anime Watched
                    </p>
                    <p class="text-2xl font-bold mt-1">{$user?.metadata?.AnimeRead.toString()}</p>
                  </div>
                </div>
              </div>
              <div
                class="bg-[hsl(var(--secondary)/20%)] p-4 rounded-xl border border-[hsl(var(--border)/30%)] hover:shadow-sm transition-all duration-200 hover:translate-y-[-2px]"
              >
                <div class="flex items-center">
                  <div
                    class="p-2 rounded-lg bg-[hsl(var(--primary)/10%)] text-[hsl(var(--primary))] mr-4"
                  >
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <p class="text-sm text-[hsl(var(--muted-foreground))] font-medium">
                      Manga Read
                    </p>
                    <p class="text-2xl font-bold mt-1">{$user?.metadata?.mangaRead.toString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t mb-2 border-[hsl(var(--border)/30%)]">
            <h2 class="text-xl font-semibold mb-3 pb-2 border-b border-[hsl(var(--border))]">
              Bio
            </h2>
            <div class="flex">
              <p class="opacity-70 text-[15px]">{$user?.bio ? $user.bio : "Not available"}</p>
            </div>
          </div>

          <div class="pt-6 border-t border-[hsl(var(--border)/30%)]">
            <h2 class="text-xl font-semibold mb-6 pb-2 border-b border-[hsl(var(--border))]">
              Quick Actions
            </h2>
            <!-- <div class="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                classes="w-full h-24 flex flex-col items-center justify-center"
              >
                <Film size={24} class="mb-2 text-[hsl(var(--primary))]" />
                <span>Add Anime</span>
              </Button>
              <Button
                variant="outline"
                classes="w-full h-24 flex flex-col items-center justify-center"
              >
                <BookOpen size={24} class="mb-2 text-[hsl(var(--primary))]" />
                <span>Add Manga</span>
              </Button>
            </div> -->
            <div class="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                classes="w-full h-24 flex flex-col items-center justify-center"
              >
                <History size={24} class="mb-2 text-[hsl(var(--primary))]" />
                <span>History</span>
              </Button>
              <Button
                variant="outline"
                classes="w-full h-24 flex flex-col items-center justify-center"
              >
                <Star size={24} class="mb-2 text-[hsl(var(--primary))]" />
                <span>Favorite</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{#if $isModalOpen}
  <div transition:fade>
    <ProfileForm
      bind:isModalOpen
      bind:formData
      bind:error
      bind:success
      bind:isLoading
      {handleSubmit}
      {handleFileChange}
      {clearAvatar}
      avatarPreview={$avatarPreview}
    />
  </div>
{/if}

{#if $isLoading && !$isModalOpen}
  <div class="fixed inset-0 flex items-center justify-center bg-black/50">
    <LoadingElements />
  </div>
{/if}
