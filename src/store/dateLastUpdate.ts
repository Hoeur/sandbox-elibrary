import { defineStore } from "pinia";
import axios from "axios";
import { API } from "@/types/api";
interface Props {
    success: boolean;
    loading: boolean;
    error: boolean;
    last_update_date: any;
}

// 
export const useLastUpdate = defineStore("lastUpdate", {

    // initialize state
    state: (): Props => ({
        success: false,
        loading: false,
        error: false,
        last_update_date:'',
    }),
    actions: {
        async getLastUpdateDate() {
            try {
                await axios.get(API + "last_update",
                    {
                        withCredentials: false
                    }
                )
                    .then(response => {
                        this.last_update_date = response.data?.data.last_update
                    })
            } catch (error) {
                this.success = false;
                this.error = true;
                console.log(error);
            }
        },

    }
});
