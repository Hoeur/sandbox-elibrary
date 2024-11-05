import { defineStore } from "pinia";
import axios from "axios";
import type { Categories } from "@/types/ApiData";
import { API } from "@/types/api";
interface Props {
    total: number;
    success: boolean;
    loading: boolean;
    error: boolean;
    update_legal: any[];
    page: number;
    limit: number;
    load_more:boolean;
}

export const useUpdateLegal = defineStore("update_legal", {

    // initialize state
    state: (): Props => ({
        total: 0,
        page: 0,
        limit: 50,
        update_legal:[],
        success: false,
        loading: false,
        error: false,
        load_more:false,
    }),
    actions: {
        /**
         * 
         * @param category 
         */
        async getAllUpdateLaw() {
            try {
                let qry: any = "";
                this.page++;
                qry = `&page=${this.page}&limit=${this.limit}`
                this.loading = true;
                await axios
                    .get(API + "legal-letter?"+qry,
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response) {
                            this.success = true;
                            this.loading = false;
                            this.update_legal = response?.data.data.legal_letters
                            this.total = response?.data.data.metadata.total
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
        async loadMore() {
            try {
                this.load_more = true
                let qry: any = "";
                this.page++;
                qry = `&page=${this.page}&limit=${this.limit}`
                await axios
                    .get(API + "legal-letter?" + qry,
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response) {
                            this.success = true;
                            setTimeout(() => {
                                this.load_more = false
                            },800);
                            this.update_legal = [...this.update_legal,...response?.data.data.legal_letters]
                        } else {
                            this.success = false;
                            this.error = true;
                        }
                    });
            } catch (er) {
                console.log(er);
                this.loading = false;
                this.success = false;
                this.load_more = false
                this.error = true;
            }
        },
    }
});
