<script setup lang="ts">

  defineOptions({ inheritAttrs: false });
  defineProps<{ label?: string; error?: string, modelValue: String }>();
  defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <label v-if="label" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"
    />
    <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
  </div>
</template>
