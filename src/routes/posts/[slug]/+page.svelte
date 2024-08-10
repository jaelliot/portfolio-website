<script lang="ts">
  import "./prism-night-owl.css";
  import type { PageData } from "./$types";
  import CopyCodeInjector from "$lib/components/CopyCodeInjector.svelte";
  import PostHeader from "$lib/components/PostHeader.svelte";
  import "prismjs/plugins/line-numbers/prism-line-numbers.js";
  import { page } from "$app/stores";
  import Giscus from "@giscus/svelte";

  export let data: PageData;

  const { metadata, post: Post } = data;

  // Example of repository data (replace with actual fetched data)
  const repoData = {
    id: 840459620,
    name: "portfolio-website",
    full_name: "jaelliot/portfolio-website",
    description: "A portfolio website built with Svelte.",
    stargazers_count: 0,
    forks_count: 0,
    html_url: "https://github.com/jaelliot/portfolio-website",
    imgUrl: "path/to/image.jpg", // Replace with actual image URL
  };
</script>

<svelte:head>
  <title>{metadata.title}</title>
  <meta name="description" content={metadata.summary} />
  <meta property="og:title" content={metadata.title} />
  <meta property="og:type" content="article" />
  <meta property="og:description" content={metadata.summary} />
  <meta property="og:image" content={repoData.imgUrl} />
  <meta property="og:url" content={$page.url.href} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
<article>
  <PostHeader {metadata} />

  <div class="prose max-w-none px-4 py-4 dark:prose-invert md:prose-lg">
    <CopyCodeInjector>
      <Post />
    </CopyCodeInjector>
  </div>
</article>

<div class="px-4 py-4">
  <Giscus
    id="comments"
    repo={repoData.full_name}
    repoId={repoData.id.toString()}
    category="General"
    categoryId="DIC_kwDOKBNW884CZ5C-"
    mapping="specific"
    term={$page.url.pathname}
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="bottom"
    theme="dark_tritanopia"
    lang="en"
    loading="lazy"
  />
</div>
