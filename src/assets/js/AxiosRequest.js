import axios from "axios";

export class AxiosRequest {

    post(url, data = {}) {
        return  axios({
            method: "post",
            baseURL: url,
            data: data
        });
    }

    get(url, params = {}) {
        return  axios({
            method: "get",
            baseURL: url,
            params: params
        });
    }
}