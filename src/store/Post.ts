
import { defineStore } from "pinia";
import axios from "axios";
import { API } from "@/types/api";
import type { MetaData, Post } from "@/types/ApiData";
interface Props {
    success: boolean;
    loading: boolean;
    error: boolean;
    metadata:MetaData
    source_items: Post[];
    all_categories_posts: Post[];
}

// 
export const usePost = defineStore("post", {

    // initialize state
    state: (): Props => ({
        success: false,
        loading: false,
        error: false,
        metadata:{
            limit:0,
            page:0,
            total:0,
        },
        source_items:[],
        all_categories_posts:[]
    }),
    actions: {

        /**
                * Get all posts
                */
        async getAllCategoriesPost() {
            try {
                this.loading = true;
                await axios.get(import.meta.env.VITE_VUE_APP_BASE_URL + "post",
                    {
                        withCredentials: false
                    }
                )
                    .then(response => {
                        this.loading = false;
                        this.all_categories_posts = response.data?.data?.posts
                        this.metadata = response.data.data?.metadata
                    })
            } catch (error) {
                this.loading = false;
                this.success = false;
                this.error = true;
                console.log(error);

            }
        },
        /**
                * Get post for homepage
                */
        async getSourceItemPost() {
            try {
                this.loading = true;
                await axios.get(import.meta.env.VITE_VUE_APP_BASE_URL + "post?isFeatured=1",
                    {
                        withCredentials: false
                    }
                )
                    .then(response => {
                        this.loading = false;
                        this.source_items = response.data?.data?.posts
                        this.metadata = response.data.data?.metadata
                    })
            } catch (error) {
                this.loading = false;
                this.success = false;
                this.error = true;
                console.log(error);

            }
        },

    }
});