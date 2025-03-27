<script setup lang="ts">
import Button from '../components/Button.vue';
import { useRouter } from 'vue-router';
import { useListStore } from '../store';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { extractId } from '../utils/extractId.util';
import type { FlavorType } from '../interfaces';

const router = useRouter();
const listStore = useListStore();
const { loading, perPage, totalPages, currentPage, paginatedLists, detailData } = storeToRefs(listStore);
const { fetchListData, setPerPage, changePage, toggleSort, deleteItem, detail} = listStore;

const showModal = ref(false);
const showModalDetail = ref(false);
const itemToDelete = ref<string | null>(null);

onMounted(() => {
  fetchListData();
});

const sortedLists = computed(() => paginatedLists.value);

const goToAddForm = () => {
  router.push("/add-form");
};

const onEditData = (index: number) => {
  router.push(`/edit-form/${index}`);
};

const confirmDelete = (index: string) => {
  itemToDelete.value = index;
  showModal.value = true;
};

const handleDelete = () => {
  if (itemToDelete.value !== null) {
    deleteItem(itemToDelete.value);
    showModal.value = false;
  }
};

const onDetail = async (id: number) => {
  detail(id);
  showModalDetail.value = true;
}

const getFlavorColor = (flavorName: FlavorType) => {
  const colors = {
    spicy: "bg-red-100 text-red-600",
    dry: "bg-yellow-100 text-yellow-600",
    sweet: "bg-pink-100 text-pink-600",
    bitter: "bg-green-100 text-green-600",
    sour: "bg-blue-100 text-blue-600",
  };
  return colors[flavorName] || "bg-gray-100 text-gray-600";
}
</script>

<template>
  <section class="bg-white w-full rounded-md p-4">
    <h1 class="text-xl font-bold">List Data</h1>

    <div class="mt-4 flex items-center justify-between">
      <span class="text-sm text-gray-700 font-semibold">
        {{ $t("show") }} 
        <select v-model="perPage" @change="setPerPage(perPage)" class="border p-0.5 rounded-md border-slate-300">
          <option :value="10">10</option>
          <option :value="30">30</option>
          <option :value="50">50</option>
        </select>
        {{ $t("of") }} <span class="font-semibold text-gray-900">100</span>
      </span>
      <div>
        <Button :title="$t('add')" @click="goToAddForm" />
      </div>
    </div>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">{{ $t("table.no") }}</th>
            <th scope="col" class="px-6 py-3 cursor-pointer" @click="toggleSort">
              {{ $t("table.name") }}
            </th>
            <th scope="col" class="px-6 py-3">{{ $t("table.action") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading" v-for="i in 5" :key="i" class="animate-pulse bg-white border-b border-gray-200">
            <td class="px-6 py-4"><div class="h-4 bg-gray-300 rounded w-6"></div></td>
            <td class="px-6 py-4"><div class="h-4 bg-gray-300 rounded w-32"></div></td>
            <td class="px-6 py-4"><div class="h-4 bg-gray-300 rounded w-20"></div></td>
          </tr>
          <tr v-else v-for="(item, index) in sortedLists" :key="item.url" class="bg-white border-b border-gray-200">
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-medium text-gray-900">{{ item.name }}</td>
            <td class="px-6 py-4 inline-flex gap-4">
              <span @click="onDetail(extractId(item.url)!)" class="text-yellow-600 hover:underline cursor-pointer">Detail</span>
              <span @click="onEditData(index + 1)" class="text-green-600 hover:underline cursor-pointer">{{ $t("table.edit") }}</span>
              <span @click="confirmDelete(item.name)" class="text-red-600 hover:underline cursor-pointer">{{ $t("table.delete") }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex flex-col items-center mt-4">
      <div class="flex items-center mt-2 xs:mt-0">
        <button 
          class="px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50"
          :disabled="currentPage === 1 || loading" 
          @click="changePage(currentPage - 1)">
          {{ $t("pagination.prev") }}
        </button>
        <div class="px-4">{{ currentPage }} of {{ totalPages }}</div>
        <button 
          class="px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-e hover:bg-gray-900 disabled:opacity-50" 
          :disabled="currentPage === totalPages || loading" 
          @click="changePage(currentPage + 1)">
          {{ $t("pagination.next") }}
        </button>
      </div>
    </div>
  </section>

  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center drop-over z-50">
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-lg font-bold mb-4">{{ $t("delete.title") }}</h2>
      <p>{{ $t("delete.description") }}</p>
      <div class="flex justify-end mt-6 gap-2">
        <button @click="showModal = false" class="cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded">{{$t("delete.cancel")}}</button>
        <button @click="handleDelete" class="cursor-pointer px-4 py-2 bg-red-600 text-white rounded">{{$t("table.delete")}}</button>
      </div>
    </div>
  </div>

  <div v-if="showModalDetail" class="fixed inset-0 flex items-center justify-center drop-over z-50">
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-2xl font-bold text-gray-800">🍓 {{ detailData?.name }}</h2>
      <p class="text-sm text-gray-500">
        Firmness: <span class="font-medium text-gray-700">{{ detailData?.firmness.name }}</span>
      </p>

      <div class="mt-4">
        <h3 class="text-lg font-semibold text-gray-700">🌱 Growth Information</h3>
        <p class="text-sm text-gray-600">Growth Time: <span class="font-medium">{{ detailData?.growth_time }} days</span></p>
        <p class="text-sm text-gray-600">Max Harvest: <span class="font-medium">{{ detailData?.max_harvest }}</span></p>
      </div>

      <div class="mt-4">
        <h3 class="text-lg font-semibold text-gray-700">🍽️ Flavors</h3>
        <div class="flex gap-2 mt-2">
          <span 
            v-for="flavor in detailData?.flavors" 
            :key="flavor.flavor.name"
            :class="getFlavorColor(flavor.flavor.name)"
            class="px-3 py-1 text-xs font-semibold rounded-lg"
          >
            {{ flavor.flavor.name }} ({{ flavor.potency }})
          </span>
        </div>
      </div>

      <div class="mt-4">
        <h3 class="text-lg font-semibold text-gray-700">🎁 Natural Gift</h3>
        <p class="text-sm text-gray-600">Power: <span class="font-medium">{{ detailData?.natural_gift_power }}</span></p>
        <p class="text-sm text-gray-600">
          Type: <span class="font-medium text-green-600">{{ detailData?.natural_gift_type.name }}</span>
        </p>
      </div>

      <div class="mt-4">
        <h3 class="text-lg font-semibold text-gray-700">📜 Additional Info</h3>
        <p class="text-sm text-gray-600">Smoothness: <span class="font-medium">{{ detailData?.smoothness }}</span></p>
        <p class="text-sm text-gray-600">Soil Dryness: <span class="font-medium">{{ detailData?.soil_dryness }}</span></p>
      </div>

      <div class="mt-4">
        <h3 class="text-lg font-semibold text-gray-700">🔗 Related Item</h3>
        <a :href="detailData?.item.url" class="text-blue-500 hover:underline">{{ detailData?.item.name }}</a>
      </div>
      <div class="flex justify-end mt-6 gap-2">
        <button @click="showModalDetail = false" class="cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded">{{$t("close")}}</button>
      </div>
    </div>
  </div>
</template>
