<script context="module">
  import type { Preload } from "@sapper/common";
  export const preload = () => {};
</script>

<script>
  import { stores } from "@sapper/app";

  let mini = true;
  function mouseenter() {
    mini = false;
  }
  function mouseleave() {
    mini = true;
  }

  let theme: "light" | "dark" = "dark";

  function toggleTheme() {
    if (theme === "light") theme = "dark";
    else theme = "light";
  }

  // You may not want to use `segment`, but it is passed for the time being and will
  // create a warning if not expected: https://github.com/sveltejs/sapper-template/issues/210
  // https://github.com/sveltejs/sapper/issues/824
  export let segment: string = "";
  // Silence unused export property warning
  if (segment) {
  }

  const { page } = stores();

  let path: string;
  $: path = $page.path.slice(1);
</script>

<svelte:head>
  <title>{path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Index'}</title>
</svelte:head>

<div class="flex flex-row h-screen">
  <div
    class="h-full bg-red-200 d-inline-block"
    on:mouseenter="{mouseenter}"
    on:mouseleave="{mouseleave}"
  >
    <pre>
      MENU
    </pre>
  </div>
  <div class="flex flex-col w-full">
    <slot />
  </div>
</div>
