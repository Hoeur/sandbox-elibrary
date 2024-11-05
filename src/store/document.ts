import { defineStore } from "pinia";
import axios from "axios";

interface Props {
    all_documents: Document[];
    search_documents: any[];
    filters: any;
    total: number;
    document: Document;
    success: boolean;
    loading: boolean;
    error: boolean;
    all_categories: any[];
}

interface Document {
    id: number;
    type: string;
    name: string;
    comment: string;
    keywords: string;
    ownerid: number;
    islocked: boolean;
    expires: string;
    version: number;
    size: number;
    date: any;
    content: any | null;
    categories: any;
    views: number | null,
    downloads: number | null,
    heading:any;
    css:any
};

// 
export const useGlobalDocument = defineStore("document", {

    // initialize state
    state: (): Props => ({
        total: 0,
        all_documents: [],
        filters: [],
        document: {
            id: 0,
            type: "",
            name: "",
            comment: "",
            keywords: "",
            ownerid: 0,
            islocked: false,
            expires: "",
            version: 0,
            size: 0,
            date: 0,
            views:0,
            downloads:0,
            content: null,
            categories: [],
            heading:[],
            css:null
        },
        search_documents: [],
        all_categories: [],
        success: false,
        loading: false,
        error: false
    }),
    actions: {

        /**
         * Get all documents
         */
        async getAllDocuments() {
            try {
                this.loading = true;
                await axios.get(import.meta.env.VITE_VUE_APP_BASE_URL + "documents",
                    {
                        withCredentials: false
                    }
                )
                    .then(response => {
                        setTimeout(() => {
                            this.loading = false;
                        }, 1200)
                        this.total = response.data.data.length;
                        this.all_documents = response.data.data
                    })
            } catch (error) {
                this.loading = false;
                this.success = false;
                this.error = true;
                console.log(error);

            }
        },

        /**
        * Get Document by id
        */
        async getDocument(id: any) {
            try {
                this.loading = true;
                await axios
                    .get(import.meta.env.VITE_VUE_APP_BASE_URL + "document/" + id,
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response) {
                            this.success = true;
                            setTimeout(() => {
                                this.loading = false;
                            }, 1200)
                            this.document = response.data.data
                            this.document.heading = JSON.parse(response.data.data?.heading)
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

        /**
       * View Document Content by id
       */
        async ViewDocumentContent(id: any) {
            try {
                this.loading = true;
                await axios
                    .get(import.meta.env.VITE_VUE_APP_BASE_URL + "document/" + id + "/content",
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response) {
                            this.success = true;
                            this.loading = false;
                            // this.document = response.data
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

        /**
         * search documents by keyword
         * @query keywords ,search,all
         */

        async SearchDocumentContent(keyword: any) {
            console.log(keyword.category.split(','));

            try {

                this.loading = true;
                await axios
                    .get(import.meta.env.VITE_VUE_APP_BASE_URL + "search?q=" + keyword.search + "&all=" + keyword.all + "&category=" + keyword.category,
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response.status === 200) {
                            this.success = true;
                            this.loading = false;
                            this.search_documents = response.data.data
                            this.total = response.data.data?.length;
                        } else {
                            this.success = false;
                            this.loading = false;
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
        /**
         * 
         * @param category 
         */
        async getAllCategories() {
            try {
                this.loading = true;
                await axios
                    .get(import.meta.env.VITE_VUE_APP_BASE_URL + "categories",
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response) {
                            this.success = true;
                            this.loading = false;
                            this.all_categories = response.data.data
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

        /** 
        * Register User
        */
        //     async createUser(user: string, pass: string) {
        //         try {
        //             await axios
        //                 .post(import.meta.env.VITE_VUE_APP_BASE_URL + "login", {
        //                     user: user,
        //                     pass: pass
        //                 })
        //                 .then((response) => {
        //                     if (response) {
        //                         this.success = true;
        //                     } else {
        //                         this.success = false;
        //                     }
        //                 });
        //         } catch (er) {
        //             console.log(er);
        //         }
        //     },
        //     async updateUser(user: string, pass: string, id: string) {
        //         try {
        //             await axios
        //                 .put(import.meta.env.VITE_VUE_APP_BASE_URL + `login/${id}`, {
        //                     user: user,
        //                     pass: pass
        //                 })
        //                 .then((response) => {
        //                     if (response) {
        //                         this.success = true;
        //                     } else {
        //                         this.success = false;
        //                     }
        //                 });
        //         } catch (er) {
        //             console.log(er);
        //         }
        //     },
        //     async deleteProducts(id: string) {
        //         try {
        //             await axios
        //                 .delete(import.meta.env.VITE_VUE_APP_BASE_URL + `products/${id}`)
        //                 .then((response) => {
        //                     if (response.data) {
        //                         this.success = true;
        //                     } else {
        //                         this.success = false;
        //                     }
        //                 });
        //         } catch (er) {
        //             console.log(er);
        //         }
        //     }
    }
});
