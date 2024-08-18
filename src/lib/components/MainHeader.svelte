<script>
  import DarkmodeButton from "./DarkmodeButton.svelte";
  import IconLink from "./IconLink.svelte";
  import GithubIcon from "./svg/GithubIcon.svelte";
  import Logo from "./svg/Logo.svelte";
  import YoutubeIcon from "./svg/YoutubeIcon.svelte";
  import LinkedinIcon from "./svg/LinkedinIcon.svelte"; // Import the LinkedIn icon
</script>

<header
  class="fixed inset-x-0 top-0 z-10 border-b bg-white dark:border-gray-800 dark:bg-dark-background"
>
  <nav
    class="mx-auto flex h-20 max-w-5xl items-center justify-between px-4"
  >
    <a href="/">
      <Logo class="h-12 w-20" />
    </a>

    <div class="flex items-center space-x-1">
      <DarkmodeButton />

      <IconLink
        href="https://www.youtube.com/@Jay-AlexanderElliot"
        target="_blank"
      >
        <YoutubeIcon class="h-8 w-8 fill-current" />
      </IconLink>
      <IconLink href="https://github.com/jaelliot" target="_blank">
        <GithubIcon class="h-8 w-8 fill-current" />
      </IconLink>
      <IconLink
        href="https://www.linkedin.com/in/jayalexanderelliot/"
        target="_blank"
      >
        <LinkedinIcon class="h-8 w-8 fill-current" />
      </IconLink>
    </div>
  </nav>
</header>

<style>
  header {
    position: fixed;
    inset: 0;
    z-index: 10;
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-bg);
  }
  nav {
    max-width: 80rem;
    margin: 0 auto;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }
  .dark\:border-gray-800 {
    border-color: #2d3748;
  }
  .dark\:bg-dark-background {
    background-color: #1a202c;
  }
</style>
