<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { get, type Writable } from "svelte/store";
  import type { PaginationFields } from "../types";
  import { ArrowLeftOutline, ArrowRightOutline } from "flowbite-svelte-icons";

  export let filters: Writable<PaginationFields>;
  export let paginationHelper: {
    start: number;
    end: number;
    total: number;
  };

  let disabledPrev = paginationHelper.start == 0;
  let disabledNext = paginationHelper.end == paginationHelper.total;

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

  <div class="flex space-x-1 rtl:space-x-reverse">
    <Button class="h-9 p-3" on:click={previous} disabled={disabledPrev}>
      <ArrowLeftOutline />
      Prev
    </Button>
    <Button class="h-9 p-3" on:click={next} disabled={disabledNext}>
      Next
      <ArrowRightOutline />
    </Button>
  </div>
</div>
