<script lang="ts">
  import {
    Button,
    ButtonGroup,
    CloseButton,
    Drawer,
    Dropdown,
    DropdownItem,
    Input,
    Label,
    Textarea,
    Toggle,
  } from "flowbite-svelte";
  import { ChevronLeftOutline, InfoCircleSolid } from "flowbite-svelte-icons";
  import { get } from "svelte/store";
  import {
    brands,
    categories,
    specialTags,
  } from "../stores/productDetailsStore";
  import { sineIn } from "svelte/easing";
  import type { Product } from "../types";

  const initialProductState: Product = {
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
    initialPrice: 0,
    discountPercentage: 0,
    finalPrice: 0,
    brandId: 0,
    categoryId: 0,
    specialTagId: 0,
    inStock: true,
    brand: { id: 0, name: "" },
    category: { id: 0, name: "" },
    specialTag: { id: 0, name: "" },
  };

  export let selectedProduct: Product = { ...initialProductState };
  export let hidden: boolean = true;

  $: selectedProduct = selectedProduct || initialProductState;

  $: specialTagName = selectedProduct.specialTag
    ? selectedProduct.specialTag.name
    : "";

  $: selectedProduct.finalPrice =
    Math.round(
      (selectedProduct.initialPrice || 0) *
        (1 - (selectedProduct.discountPercentage || 0) / 100) *
        100
    ) / 100;

  function handlePriceChange() {
    if (selectedProduct!.initialPrice < 0) {
      selectedProduct!.initialPrice = 0.1;
    }
  }

  function handleDiscountChange(event: any) {
    const target = event.target;
    if (target) {
      let value = Math.floor(Number(target.value));
      if (value < 0) value = 0;
      if (value > 100) value = 100;
      selectedProduct!.discountPercentage = value;
    }
  }

  function handleSubmit(event: Event) {
    event.preventDefault();

    if (!selectedProduct) {
      alert("Product details are not available.");
      return;
    }

    const isValid =
      selectedProduct.name.trim() !== "" &&
      selectedProduct.description.trim() !== "" &&
      selectedProduct.imageUrl.trim() !== "" &&
      selectedProduct.brandId > 0 &&
      selectedProduct.categoryId > 0 &&
      selectedProduct.initialPrice > 0.1 &&
      selectedProduct.discountPercentage >= 0 &&
      selectedProduct.discountPercentage <= 100;

    if (!isValid) {
      alert("Please fill all required fields.");
      return;
    }
    console.log(selectedProduct);
    hidden = true;
    selectedProduct = { ...initialProductState };
  }

  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn,
  };
</script>

<Drawer
  transitionType="fly"
  {transitionParams}
  bind:hidden
  id="sidebar4"
  placement="right"
>
  <div class="flex items-center">
    <h5
      id="drawer-label"
      class="inline-flex items-center mb-6 text-base font-semibold uppercase text-gray-400"
    >
      <InfoCircleSolid class="w-5 h-5 me-2.5" />Product info
    </h5>
    <CloseButton
      on:click={() => (hidden = true)}
      class="mb-4 dark:text-white"
    />
  </div>
  <form action="#" class="mb-6">
    <div class="mb-3">
      <Label class="block mb-2">Name</Label>
      <Input
        bind:value={selectedProduct.name}
        id="name"
        name="name"
        required
        placeholder="Product name"
      />
    </div>
    <div class="mb-3">
      <Label class="mb-2">Description</Label>
      <Textarea
        id="description"
        bind:value={selectedProduct.description}
        required
        placeholder="Write product description..."
        rows={4}
        name="description"
      />
    </div>
    <div class="mb-3">
      <Label class="block mb-2">Image URL</Label>
      <Input
        id="imageUrl"
        name="imageUrl"
        bind:value={selectedProduct.imageUrl}
        required
        placeholder="Insert image URL"
      />
    </div>
    <div class="mb-3">
      <Label class="block mb-2">Select brand</Label>
      <ButtonGroup class="w-full">
        <Input
          placeholder="Product brand"
          disabled
          required
          bind:value={selectedProduct.brand.name}
        />
        <Button color="primary"><ChevronLeftOutline /></Button>
        <Dropdown placement="left">
          {#each get(brands) as brand}
            <DropdownItem
              on:click={() => {
                selectedProduct.brandId = brand.id;
                selectedProduct.brand.name = brand.name;
              }}
            >
              {brand.name}
            </DropdownItem>
          {/each}
        </Dropdown>
      </ButtonGroup>
    </div>
    <div class="mb-3">
      <Label class="block mb-2">Select category</Label>
      <ButtonGroup class="w-full">
        <Input
          placeholder="Product category"
          disabled
          required
          bind:value={selectedProduct.category.name}
        />
        <Button color="primary"><ChevronLeftOutline /></Button>
        <Dropdown placement="left">
          {#each get(categories) as category}
            <DropdownItem
              on:click={() => {
                selectedProduct.categoryId = category.id;
                selectedProduct.category.name = category.name;
              }}
            >
              {category.name}
            </DropdownItem>
          {/each}
        </Dropdown>
      </ButtonGroup>
    </div>
    <div class="mb-3">
      <Label class="block mb-2">Select special tag</Label>
      <ButtonGroup class="w-full">
        <Input
          placeholder="Product special tag"
          disabled
          bind:value={specialTagName}
        />
        <Button color="primary"><ChevronLeftOutline /></Button>
        <Dropdown placement="left">
          <DropdownItem
            on:click={() => {
              selectedProduct.specialTagId = null;
              selectedProduct.specialTag = null;
            }}
          >
            None
          </DropdownItem>

          {#each get(specialTags) as specialTag}
            <DropdownItem
              on:click={() => {
                selectedProduct.specialTagId = specialTag.id;
                selectedProduct.specialTag = {
                  id: specialTag.id,
                  name: specialTag.name,
                };
              }}
            >
              {specialTag.name}
            </DropdownItem>
          {/each}
        </Dropdown>
      </ButtonGroup>
    </div>
    <div class="mb-3">
      <Label class="block mb-2">Initial price ($)</Label>
      <Input
        id="initialPrice"
        name="initialPrice"
        type="number"
        required
        placeholder="Product initial price"
        min="0"
        step="any"
        bind:value={selectedProduct.initialPrice}
        on:input={handlePriceChange}
      />
    </div>
    <div class="mb-3">
      <Label class="block mb-2">Discount percentage</Label>
      <Input
        id="discount"
        name="discount"
        type="number"
        required
        placeholder="Product discount %"
        min="0"
        max="100"
        bind:value={selectedProduct.discountPercentage}
        on:input={handleDiscountChange}
      />
    </div>
    <div class="mb-3">
      <Label class="block mb-2">Final price ($)</Label>
      <Input
        disabled
        placeholder="Computed product final price"
        bind:value={selectedProduct.finalPrice}
      />
    </div>
    <div class="mb-3">
      <Toggle bind:checked={selectedProduct.inStock}>In stock</Toggle>
    </div>
    <Button type="submit" class="w-full" on:click={handleSubmit}>Submit</Button>
  </form>
</Drawer>
