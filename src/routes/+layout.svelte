<script>
  import "../app.css";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import { Toaster } from "svelte-french-toast";

  let { children } = $props();
</script>

<Toaster position="top-center" />

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>
