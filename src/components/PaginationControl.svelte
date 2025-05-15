<script lang="ts">
  import { Button } from "flowbite-svelte";
  import type { Writable } from "svelte/store";
  import type { PaginationFields } from "../types";
  import { ArrowLeftOutline, ArrowRightOutline } from "flowbite-svelte-icons";

  export let filters: Writable<PaginationFields>;
  export let totalRecords: number;

  $: currentFilters = $filters;
  $: start = (currentFilters.pageNumber - 1) * currentFilters.pageSize + 1;
  $: end = Math.min(
    currentFilters.pageNumber * currentFilters.pageSize,
    totalRecords
  );

  $: disabledPrev = start <= 1;
  $: disabledNext = end >= totalRecords;

  const next = () => {
    if (!disabledNext) {
      filters.set({
        ...currentFilters,
        pageNumber: currentFilters.pageNumber + 1,
      });
    }
  };

  const previous = () => {
    if (!disabledPrev) {
      filters.set({
        ...currentFilters,
        pageNumber: currentFilters.pageNumber - 1,
      });
    }
  };
</script>

<div class="flex flex-col items-center justify-center gap-2 mb-2">
  <div class="text-sm text-gray-700 dark:text-gray-400">
    Showing
    <span class="font-semibold text-gray-900 dark:text-white">{start}</span>
    to
    <span class="font-semibold text-gray-900 dark:text-white">{end}</span>
    of
    <span class="font-semibold text-gray-900 dark:text-white"
      >{totalRecords}</span
    >
    entries
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
