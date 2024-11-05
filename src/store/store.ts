import { defineStore } from "pinia";
import axios, { HttpStatusCode } from "axios";
axios.defaults.withCredentials = true;

interface Props {
  data: [];
  user: [];
  success: boolean;
}

interface user {
  user: string;
  pass: string;
};

// 
export const useGlobalStore = defineStore("store", {
  state: (): Props => ({ data: [], user: [], success: false }),
  actions: {
    getUser(user: any) {
      this.user = user;
    },

    /**
    * Login function
    */
    async Login(user: string, pass: string) {
      try {
        await axios
          .post(import.meta.env.VITE_VUE_APP_BASE_URL + "login", 
          {
            user: user,
            pass: pass
          },
          {
            withCredentials: false
          }
          )
          .then((response) => {
            if (response.status === <HttpStatusCode>200 && response.data.success === <boolean>true) {
              console.log(response.data);
              localStorage.setItem("user",JSON.parse(response.data.data));
              this.success = true;
            } else {
              this.success = false;
            }
          });
      } catch (er) {
        console.log(er);
      }
    },

    /** 
    * Register User
    */
    async createUser(props:any) {
      try {
        await axios
          .post(import.meta.env.VITE_VUE_APP_BASE_URL + "login", {
            user: props.user,
            pass: props.pass
          })
          .then((response) => {
            if (response) {
              this.success = true;
            } else {
              this.success = false;
            }
          });
      } catch (er) {
        console.log(er);
      }
    },
    async updateUser(user: string, pass: string, id: string) {
      try {
        await axios
          .put(import.meta.env.VITE_VUE_APP_BASE_URL + `login/${id}`, {
            user: user,
            pass: pass
          })
          .then((response) => {
            if (response) {
              this.success = true;
            } else {
              this.success = false;
            }
          });
      } catch (er) {
        console.log(er);
      }
    },
    async deleteProducts(id: string) {
      try {
        await axios
          .delete(import.meta.env.VITE_VUE_APP_BASE_URL + `login/${id}`)
          .then((response) => {
            if (response.data) {
              this.success = true;
            } else {
              this.success = false;
            }
          });
      } catch (er) {
        console.log(er);
      }
    }
  }
});
