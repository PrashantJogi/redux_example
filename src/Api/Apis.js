import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://gorest.co.in/public/v2/",

  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer bf48a2155a23c66e8570badd02a145f845e158e884ccdc777fa82ab13a425ca5",
  },
});