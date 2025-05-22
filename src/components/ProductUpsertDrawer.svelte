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
  import toast from "svelte-french-toast";
  import { createProduct, updateProduct } from "$lib";

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
    specialTagId: null,
    inStock: true,
    brand: { id: 0, name: "" },
    category: { id: 0, name: "" },
    specialTag: null,
  };

  export let selectedProduct: Product = { ...initialProductState };
  export let hidden: boolean = true;
  export let mode: "create" | "update";
  export let onProductUpsert: () => void = () => {};

  let loading = false;

  $: specialTagName = selectedProduct.specialTag
    ? selectedProduct.specialTag.name
    : "";

  $: selectedProduct.finalPrice =
    Math.round(
      (selectedProduct.initialPrice || 0) *
        (1 - (selectedProduct.discountPercentage || 0) / 100) *
        100
    ) / 100;

  const handlePriceChange = () => {
    if (selectedProduct!.initialPrice < 0) {
      selectedProduct!.initialPrice = 0.1;
    }
  };

  const handleDiscountChange = (event: any) => {
    const target = event.target;
    if (target) {
      let value = Math.floor(Number(target.value));
      if (value < 0) value = 0;
      if (value > 100) value = 100;
      selectedProduct!.discountPercentage = value;
    }
  };

  const handleSubmit = async (event: Event) => {
    loading = true;
    event.preventDefault();
    validateProduct();

    if (mode === "create") {
      try {
        const productCreateDto = convertToDto();
        await createProduct(productCreateDto);
        toast.success("A new product has been created successfully!");
        onProductUpsert();
      } catch (err) {
        toast.error((err as Error).message);
      }
    } else if (mode === "update") {
      try {
        const productUpdateDto = convertToDto(true);
        await updateProduct(productUpdateDto);
        toast.success("The product has been updated successfully!");
        onProductUpsert();
      } catch (err) {
        toast.error((err as Error).message);
      }
    }

    hidden = true;
    loading = false;
  };

  const validateProduct = () => {
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
      toast.error("Please fill all required fields.");
      return;
    }
  };

  const convertToDto = (includeId: boolean = false) => {
    const dto: any = {
      brandId: selectedProduct.brandId,
      name: selectedProduct.name,
      description: selectedProduct.description,
      inStock: selectedProduct.inStock,
      specialTagId: selectedProduct.specialTagId ?? null,
      categoryId: selectedProduct.categoryId,
      initialPrice: selectedProduct.initialPrice,
      imageUrl: selectedProduct.imageUrl,
      discountPercentage: selectedProduct.discountPercentage,
    };

    if (includeId) {
      dto.productId = selectedProduct.id;
    }

    return dto;
  };

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
  activateClickOutside={false}
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
    <Button
      type="submit"
      class="w-full"
      disabled={loading}
      on:click={handleSubmit}
    >
      {#if loading}
        Loading...
      {:else}
        Submit
      {/if}
    </Button>
  </form>
</Drawer>
