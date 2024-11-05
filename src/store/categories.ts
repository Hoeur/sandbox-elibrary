import { defineStore } from "pinia";
import axios from "axios";
import type { Categories } from "@/types/ApiData";
import { API } from "@/types/api";
interface Props {
    total: number;
    success: boolean;
    loading: boolean;
    error: boolean;
    all_categories: Categories[];
    page: number;
    limit: number;
}
export const useCategories = defineStore("categories", {

    // initialize state
    state: (): Props => ({
        total: 0,
        page: 0,
        limit: 25,
        all_categories: [],
        success: false,
        loading: false,
        error: false
    }),
    actions: {
        /**
         * 
         * @param category 
         */
        async getAllCategories() {
            try {
                this.loading = true;
                await axios
                    .get(API + "categories",
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response) {
                            this.success = true;
                            this.loading = false;
                            this.all_categories = response.data?.data
                        } else {
                            this.success = false;
                            this.error = true;
                        }
                    });
            } catch (er) {
                console.log(er);
                this.loading = false;
                this.success = false;
                this.error = true;
            }
        },
    }
});
