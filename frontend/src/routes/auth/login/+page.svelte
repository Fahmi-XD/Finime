<script lang="ts">
  import { FetchApi } from "$utils/Fetch";
  import Link from "svelte-link";
  import Cookies from "js-cookie";
  import { Eye, EyeClosed } from "@lucide/svelte";
  import { page } from "$app/state";
  import { fromBase64 } from "$lib/base64";

  type IPayload = {
    username: string;
    password: string;
  }

  const dataa: IPayload = JSON.parse(fromBase64(page.url.searchParams.get("payload") || "") || "{}");

  let formData = {
    username: dataa.username || "",
    password: dataa.password || "",
  };

  let errorMessages: string[] = [];
  let message: string = "";
  let isSubmitting = false;
  let hiddenPassword = true;

  const handlePassword = () => {
    hiddenPassword = !hiddenPassword;
  }

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    isSubmitting = true;
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get("from") || "/";

    try {
      const response = await FetchApi.post("/auth/login", formData);
      const token = response.data.token;

      setTimeout(() => {
        message = "Login success, welcome back";
      }, 1000);

      Cookies.set("accessToken", token, { expires: 7 });
      errorMessages = [];
      window.location.href = redirectTo;
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.data.errors) {
        errorMessages = error.response.data.errors.map(
          (err: { message: string }) => err.message,
        );
        message = "";
      } else if (error.response.data.message) {
        errorMessages = [error.response.data.message];
      } else {
        errorMessages = ["An unexpected error occurred."];
      }
    } finally {
      isSubmitting = false;
    }
  };
</script>

<div
  class="relative flex items-center justify-center min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
>
  <div
    class="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] opacity-30 blur-lg"
    aria-hidden="true"
  ></div>

  <form
    class="relative w-full max-w-md bg-[hsl(var(--card))] p-6 rounded-lg shadow-lg border border-[hsl(var(--border))] z-10"
    on:submit={handleSubmit}
    aria-labelledby="login-heading"
  >
    <h2 id="login-heading" class="text-2xl font-bold text-[hsl(var(--primary))] mb-4">
      Login
    </h2>

    {#if message}
      <div role="status" class="text-green-500 text-sm mb-4">
        <p>{message}</p>
      </div>
    {/if}
    {#if errorMessages.length > 0}
      <div role="alert" class="text-red-500 text-sm mb-4">
        {#each errorMessages as error}
          <p>{error}</p>
        {/each}
      </div>
    {/if}

    <div class="space-y-4">
      <div>
        <label
          for="username-input"
          class="block text-sm font-medium text-[hsl(var(--muted-foreground))]"
        >
          Username
        </label>
        <input
          id="username-input"
          type="text"
          bind:value={formData.username}
          class="w-full mt-1 px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
          required
          aria-required="true"
          aria-describedby="username-help"
        />
        <p id="username-help" class="sr-only">Enter your username</p>
      </div>

      <div>
        <label
          for="password-input"
          class="block text-sm font-medium text-[hsl(var(--muted-foreground))]"
        >
          Password
        </label>
        <div class="relative mt-1">
          <input
            id="password-input"
            type={hiddenPassword ? "password" : "text"}
            bind:value={formData.password}
            class="w-full px-3 py-2 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] rounded-md focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
            required
            aria-required="true"
            aria-describedby="password-help"
          />
          <button type="button" on:click={handlePassword} class="absolute top-0 right-3 bottom-0 my-auto opacity-70 cursor-pointer hover:opacity-50">
            {#if hiddenPassword}
              <Eye />
            {:else}
              <EyeClosed />
            {/if}
          </button>
        </div>
        <p id="password-help" class="sr-only">Enter your password</p>
      </div>
    </div>

    <button
      type="submit"
      class="w-full mt-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-4 py-2 rounded-md hover:bg-opacity-90 transition flex items-center justify-center"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      aria-live="polite"
    >
      {#if isSubmitting}
        <span aria-hidden="true">Processing...</span>
        <span class="sr-only">Processing your login request</span>
      {:else}
        Login
      {/if}
    </button>

    <p class="mt-4 text-center text-sm">
      Don't have an account? Create your account
      <Link
        href="/auth/register"
        class="text-[hsl(var(--primary))] hover:underline"
        aria-label="Navigate to registration page"
      >
        Register here
      </Link>
    </p>
  </form>
</div>
