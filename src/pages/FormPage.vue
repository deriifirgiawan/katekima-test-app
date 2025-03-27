<script setup lang="ts">
  import { storeToRefs } from "pinia";
  import { onMounted, watch } from 'vue';
  import TextInput from '../components/TextInput.vue';
  import Button from '../components/Button.vue';
  import * as yup from "yup";
  import {useForm } from 'vee-validate';
  import { useProductStore } from '../store/product.store';
  import { useRoute } from "vue-router";
  import type { IProduct } from '../interfaces/IProduct.interface';

  const props = defineProps<{ id?: string }>();
  const route = useRoute();
  const isEdit = route.path.includes("/edit-form");

  const productStore = useProductStore();
  const { success, selectedProduct } = storeToRefs(productStore);
  const $schema = yup.object({
    title: yup.string().required("Title is required"),
    price: yup.number().required("Price is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
  });

  onMounted(() => {
    if (props.id) {
      productStore.getProductById(Number(props.id));
    }
  })

  const {handleSubmit, defineField, errors, setValues} = useForm({
    validationSchema: $schema,
    initialValues: {
      title: selectedProduct.value?.title ?? "",
      price: selectedProduct.value?.price ?? "",
      description: selectedProduct.value?.description ?? "",
      category: selectedProduct.value?.category ?? ""
    }
  });

  watch(selectedProduct, (product) => {
    if (product && Object.keys(product).length > 0) {
      setValues({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "",
      });

      title.value = product.title || "";
      price.value = product.price || "";
      description.value = product.description || "";
      category.value = product.category || "";
    }
  });

  
  const [title, titleAttrs] = defineField("title");
  const [price, priceAttrs] = defineField("price");
  const [description, descriptionAttrs] = defineField("description");
  const [category, categoryAttrs] = defineField("category");


  const submitForm = handleSubmit((values) => {
    if (isEdit) {
      productStore.updateProduct(values as IProduct, Number(props.id));
    } else {
      productStore.addProduct(values as IProduct);
    }
  });

  watch(success, (value) => {
    if (value) {
      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  })
</script>

<template>
  <div v-if="success" class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
    <span class="font-medium">Success!!! </span> {{isEdit ? "Update" : "Add"}} Product.
  </div>
  <form @submit="submitForm">
    <section class="bg-white w-full rounded-md p-4">
      <h1 class="text-xl font-bold">{{ $t("formPage.title") }}</h1>

      <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
        <TextInput :model-value="title" :v-model="title" 
        @update:model-value="title = $event" v-bind="titleAttrs" label="Title" placeholder="Title" :error="errors.title" />

        <TextInput :model-value="String(price)" :v-model="price" v-bind="priceAttrs" label="Price" placeholder="Price" :error="errors.price" />

        <TextInput :model-value="description" :v-model="description" v-bind="descriptionAttrs" label="Description" placeholder="Description" :error="errors.description" />

        <TextInput :model-value="category" :v-model="category" v-bind="categoryAttrs" label="Category" placeholder="Category" :error="errors.category" />
      </div>

      <div class="mt-8 w-full">
        <Button :title="$t('add')" />
      </div>
    </section>
  </form>
</template>
