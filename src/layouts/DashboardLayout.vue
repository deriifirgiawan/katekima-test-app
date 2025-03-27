<script setup lang="ts">
import Toggle from '../components/Toggle.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { useLangStore } from '../store';

const langStore = useLangStore();

const isSidebarOpen = ref(false);
const isMobile = ref(window.innerWidth < 768);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  if (isMobile.value) {
    isSidebarOpen.value = false;
  }
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  isSidebarOpen.value = !isMobile.value;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <div 
      v-if="isMobile && isSidebarOpen" 
      @click.self="closeSidebar"
      class="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
    ></div>

    <!-- Sidebar -->
    <div 
      :class="[
        'bg-white w-64 fixed md:relative h-full z-50 transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-64', 
        'md:translate-x-0'
      ]"
    >
      <h1 class="text-2xl font-bold mb-5 p-5">App Assesment</h1>
      <nav>
        <router-link 
          to="/" 
          exact-active-class="text-blue-500 font-bold"
          class="py-2 px-4 rounded hover:bg-slate-100 flex items-center gap-4 text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span>Dashboard</span>
        </router-link>

        <router-link 
          to="/products" 
          exact-active-class="text-blue-500 font-bold"
          class="py-2 px-4 rounded hover:bg-slate-100 flex items-center gap-4 text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
          </svg>
          <span>Products</span>
        </router-link>
      </nav>
    </div>

    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow p-4 flex items-center justify-between">
        <button @click="toggleSidebar" class="text-gray-600 md:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <h2 class="text-xl font-semibold">Dashboard</h2>

        <div class="flex items-center gap-4">
          <p class="font-bold">{{ langStore.currentLang === "en" ? "EN" : "ID" }}</p>
          <Toggle @click="langStore.toggleLang()" :checked="langStore.lang === 'en'" />
        </div>
      </header>

      <main class="p-6 overflow-auto flex-1">
        <router-view />
      </main> 
    </div>
  </div>
</template>
