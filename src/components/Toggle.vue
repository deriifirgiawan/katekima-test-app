<script setup lang="ts">
  defineProps({
    checked: Boolean,
  });
</script>
<template>
  <div class="relative inline-block w-11 h-5">
    <input
      id="switch-component-1"
      type="checkbox"
      class="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
      :checked="checked"
      @click="$emit('click')"
    />
    <label
      for="switch-component-1"
      class="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
    ></label>
  </div>
</template>
