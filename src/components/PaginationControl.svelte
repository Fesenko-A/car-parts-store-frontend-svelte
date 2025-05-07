<script lang="ts">
  import { Pagination } from "flowbite-svelte";
  import { get, type Writable } from "svelte/store";
  import type { PaginationFields } from "../types";

  export let filters: Writable<PaginationFields>;
  export let paginationHelper: {
    start: number;
    end: number;
    total: number;
  };

  const next = () => {
    const current = get(filters);
    if (paginationHelper.end < paginationHelper.total) {
      filters.set({ ...current, pageNumber: current.pageNumber + 1 });
    }
  };

  const previous = () => {
    const current = get(filters);
    if (current.pageNumber > 1) {
      filters.set({ ...current, pageNumber: current.pageNumber - 1 });
    }
  };
</script>

<div class="flex flex-col items-center justify-center gap-2 mb-2">
  <div class="text-sm text-gray-700 dark:text-gray-400">
    Showing <span class="font-semibold text-gray-900 dark:text-white"
      >{paginationHelper.start}</span
    >
    to
    <span class="font-semibold text-gray-900 dark:text-white"
      >{paginationHelper.end}</span
    >
    of
    <span class="font-semibold text-gray-900 dark:text-white"
      >{paginationHelper.total}</span
    >
    Entries
  </div>

  <Pagination table on:previous={previous} on:next={next} pages={[]}>
    <span slot="prev">Prev</span>
    <span slot="next">Next</span>
  </Pagination>
</div>
