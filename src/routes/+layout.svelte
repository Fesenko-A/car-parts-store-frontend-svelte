<script>
  import "../app.css";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";

  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>
