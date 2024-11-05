import { defineStore } from "pinia";
import axios from "axios";
import download from "js-file-download";
import type { Document, SourceItem } from "@/types/ApiData";
import { API } from "@/types/api";
interface Props {
    all_documents: Document[];
    filters: any;
    total: number;
    document: Document;
    suggestions: any[],
    search_documents: any[],
    success: boolean;
    loading: boolean;
    error: boolean;
    page: number;
    limit: number;
    load_more: boolean;
    pdf: any;
    docx: any;
}

// 
export const useGlobalDocument = defineStore("document", {

    // initialize state
    state: (): Props => ({
        total: 0,
        all_documents: [],
        suggestions: [],
        search_documents: [],
        filters: [],
        page: 0,
        limit: 25,
        pdf: '',
        docx: '',
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
            docx_size: 0,
            date: 0,
            views: 0,
            downloads: 0,
            content: null,
            categories: [],
            heading: [],
            css: null,
            text: '',
            words: '',
            attributes: []
        },
        success: false,
        loading: false,
        load_more: false,
        error: false
    }),
    actions: {

        /**
         * Get all documents
         */
        async getAllDocuments(query: any) {
            try {
                let qry: any = "";
                
                this.page++;
                if (query.query && !query.date) {
                    qry = `?query=${query.query}&page=${this.page}&limit=${this.limit}`
                }else if(query.date){
                    qry = `?date=${query.date}&page=${this.page}&limit=${this.limit}`
                } else {
                    qry = `?page=${this.page}&limit=${this.limit}`
                }
                this.loading = true;
                await axios.get(API + "documents" + qry,
                    {
                        withCredentials: false
                    }
                )
                    .then(response => {
                        this.total = response.data.total;
                        this.all_documents = [...this.all_documents, ...response.data.data];
                        this.loading = false;
                    })
            } catch (error) {
                this.loading = false;
                this.success = false;
                this.error = true;
                console.log(error);

            }
        },
        async loadMore(query: any) {
            try {
                let qry: any = "";
                this.page++;
                if (query.query && !query.date) {
                    qry = `?query=${query.query}&page=${this.page}&limit=${this.limit}`
                }else if(query.date){
                    qry = `?date=${query.date}&page=${this.page}&limit=${this.limit}`
                } else {
                    qry = `?page=${this.page}&limit=${this.limit}`
                }
                this.load_more = true
                await axios.get(API + "documents" + qry,
                    {
                        withCredentials: false
                    }
                )
                    .then(response => {
                        setTimeout(() => {
                            this.load_more = false
                            this.total = response.data.total;
                            this.all_documents = [...this.all_documents, ...response.data.data];
                        }, 1000)
                    })
            } catch (error) {
                this.success = false;
                this.load_more = false
                this.error = true;
                console.log(error);

            }
        },
        /**
        * Get Document by id
        */
        async getDocument(id: any) {
            this.loading = true;
            try {
                await axios
                    .get(API + "document/" + id,
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response.data.code === 200 && response.data.data) {
                            console.log(response);
                            this.success = true;
                            this.document = response.data.data
                            this.document.heading = JSON.parse(response.data.data?.heading)
                            this.loading = false;
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
                    .get(API + "document/" + id + "/content",
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
      * Download Document
      */
        async DownloadDocument(title: string, id: any, type: number = 1) {
            try {
                await axios
                    .get(API + "view/" + id,
                        {
                            // responseType: 'blob', // Treat response as a binary blob
                            withCredentials: false,
                            // headers: { 'Content-Type': 'application/pdf' }
                        }
                    )
                    .then((response) => {
                        if (response) {
                            console.log(response);
                            this.document.size = response.data.size
                                this.pdf = response.data;
                            if (type == 1) {
                                download(response.data, `${title}.pdf`, `${title}`, `${title}`);
                            }
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
      * Download Document
      */
         async DownloadDocumentPDF(title: string, id: any, type: number = 1) {
            try {
                await axios
                    .get(API + "download/" + id,
                        {
                            // responseType: 'blob', // Treat response as a binary blob
                            withCredentials: false,
                            // headers: { 'Content-Type': 'application/pdf' }
                        }
                    )
                    .then((response) => {
                        if (response) {
                            alert('gg2')
                            console.log(response);
                            // this.document.size = response.data.size
                                this.pdf = response.data;
                            if (type == 1) {
                                download(response.data, `${title}.pdf`, `${title}`, `${title}`);
                            }
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
     * Download Document
     */
        async DownloadDocumentDocx(title: string, id: any, type: number = 1) {
            try {
                await axios
                    .get(API + "download/docx/" + id,
                        {
                            responseType: 'blob', // Treat response as a binary blob
                            withCredentials: false,
                            headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
                        }
                    )
                    .then((response) => {
                        if (response) {
                            console.log(response);
                            this.document.docx_size = response.data.size
                            this.docx = response.data;
                            if (type == 1) {
                                download(response.data, `${title}.docx`, `${title}`, `${title}`);
                            }
                        }
                    });
            } catch (er) {
                console.log(er);
                this.loading = false;
                this.success = false;
                this.error = true;
            }
        },
        async SearchLoadMore(keyword: any) {
            try {

                this.load_more = true
                let qry: any = "";
                this.page++;
                qry = `&page=${this.page}&limit=${this.limit}`
                await axios
                    .get(import.meta.env.VITE_VUE_APP_BASE_URL + "search?q=" + keyword.search + "&type=" + keyword.type + "&categories=" + keyword.categories + qry,
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response.status === 200) {
                            this.success = true;
                            this.load_more = false
                            this.search_documents = [...this.search_documents, ...response.data.data]
                            this.total = response.data.total;
                        } else {
                            this.success = false;
                            this.load_more = false
                            this.error = true;
                        }
                    });
            } catch (er) {
                console.log(er);
                this.load_more = false
                this.success = false;
                this.error = true;
            }
        },
        /**
         * search documents by keyword
         * @query keywords ,search,all
         */
        async SearchDocumentContent(keyword: any) {
            try {

                this.loading = true;
                let qry: any = "";
                this.page++;
                qry = `&page=${this.page}&limit=${this.limit}`
                await axios
                    .get(import.meta.env.VITE_VUE_APP_BASE_URL + "search?q=" + keyword.search + "&type=" + keyword.type + "&categories=" + keyword.categories + qry,
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response.status === 200) {
                            this.success = true;
                            this.loading = false;
                            this.search_documents = [...this.search_documents, ...response.data.data]
                            this.total = response.data.total;
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
        async SearchSuggestions(keyword: any) {
            try {
                await axios
                    .get(import.meta.env.VITE_VUE_APP_BASE_URL + "search?q=" + keyword.search + "&type=" + keyword.type + "&categories=" + keyword.categories,
                        {
                            withCredentials: false
                        })
                    .then((response) => {
                        if (response.status === 200) {
                            this.success = true;
                            this.suggestions = response.data.data
                        } else {
                            this.success = false;
                            this.error = true;
                        }
                    });
            } catch (er) {
                console.log(er);
                this.success = false;
                this.error = true;
            }
        },
    }
});
