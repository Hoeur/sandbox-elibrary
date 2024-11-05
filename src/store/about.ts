import { defineStore } from "pinia";
import axios from "axios";
import type { Categories ,About} from "@/types/ApiData";
import { API } from "@/types/api";
interface Props {
    success: boolean;
    loading: boolean;
    error: boolean;
    data: About;
}
export const useAbout = defineStore("about", {

    // initialize state
    state: (): Props => ({
        data:{
            content:'',
            id:0,
            createdAt:new Date(),
            updatedAt:new Date()
        },
        success: false,
        loading: false,
        error: false
    }),
    actions: {
        /**
         * 
         * @param category 
         */
        async getAllAbout() {
            try {
                this.loading = true;
                await axios
                    .get(API + "about",
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response) {
                            this.success = true;
                            this.loading = false;
                            this.data = response.data?.data
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
