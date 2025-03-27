import { defineStore } from "pinia";
import axios from "axios";
import type { IPoke, ResponseApi } from "../interfaces";
import { AppConfig } from "../configs/App.config";
import type { IProduct } from "../interfaces/IProduct.interface";

export const useProductStore = defineStore('product_store', {
  state: () => ({
    lists: [] as IPoke[],
    loading: false,
    error: null as string | null,
    sortAscending: true,
    perPage: 10,
    currentPage: 1,
    searchQuery: "",
    selectedData: null as IPoke | null,
    success: false as boolean,
    failed: false as boolean,
    selectedProduct: null as IProduct | null,
  }),

  getters: {
    totalPages: (state) => Math.ceil(state.lists.length / state.perPage),

    paginatedLists: (state) => {

      const start = (state.currentPage - 1) * state.perPage;
      const end = start + state.perPage;

      return [...state.lists]
        .sort((a, b) => state.sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
        .slice(start, end);
    },

    filteredLists: (state) => {
      if (!state.searchQuery) return state.lists;
      return state.lists.filter((poke) =>
        poke.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },

  },

  actions: {

    async getProductById(id: number) {
      this.error = null;
      this.failed = false;
      try {
        const response = await axios.get<IProduct>(`${AppConfig.API_ADD_URL}/${id}`);
        this.selectedProduct = response.data;
      } catch (error: any) {
        this.failed = true;
        this.error = error.message || "Failed to fetch list data";
      }
    },
    async addProduct(payload: IProduct) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post(AppConfig.API_ADD_URL, {...payload});
        if (response.status === 201 || response.status === 200) {
          this.success = true;
        }
      } catch (error: any) {
        this.error = error.message || "Failed to fetch list data";
        this.success = false;
      }
    },

    async updateProduct(payload: IProduct, id: number) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.put(`${AppConfig.API_ADD_URL}/${id}`, {...payload});
        if (response.status === 201 || response.status === 200) {
          this.success = true;
        }
      } catch (error: any) {
        this.error = error.message || "Failed to fetch list data";
        this.success = false;
      }
    },
    async fetchListData() {
      this.loading = true;
      this.error = null;

      try {

        const cachedData = localStorage.getItem("listData");
        if (cachedData) {
          this.lists = JSON.parse(cachedData);
          return;
        }
        const response = await axios.get<ResponseApi<IPoke[]>>(`${AppConfig.API_POKE_URL}?offset=20&limit=10000`);
        this.lists = response.data.results;
        localStorage.setItem("listData", JSON.stringify(this.lists));
      } catch (error: any) {
        this.error = error.message || "Failed to fetch list data";
      } finally {
        this.loading = false;
      }
    },

    toggleSort() {
      this.sortAscending = !this.sortAscending;
    },

    changePage(page: number) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        localStorage.setItem("currentPage", String(page))
      }
    },

    setPerPage(count: number) {
      this.perPage = count;
      this.currentPage = 1
      localStorage.setItem("perPage", String(count));
    },

    findDataByName(name: string) {
      this.loading = true;
      this.error = null;
      this.selectedData = null;

      const data = this.lists.find(item => item.name.toLowerCase() === name.toLowerCase());

      if (data) {
        this.selectedData = data;
      } else {
        this.error = "Data tidak ditemukan";
      }

      this.loading = false;
    },

    setSearchQuery(query: string) {
      this.searchQuery = query;
      localStorage.setItem("searchQuery", query);
    },
  }
});
