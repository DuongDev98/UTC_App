import axios from "axios";
import Contants from "./Contants";
class HttpClient{
    static async GetJson(cmdtype, json) {
        let data = undefined;
        try
        {
            //tham số
            let param = {};
            param.cmdtype = cmdtype;
            param.param = json;

            //set timeout
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            const timeout = setTimeout(() => {
                source.cancel();
                data = undefined;
            }, 8000);

            let resp = await axios.post(Contants.Uri, param, { cancelToken: source.token });
            clearTimeout(timeout);
            data = resp.data;
        }
        catch (e)
        {
            data = undefined;
        }

        if (data == undefined)
        {
            data = {};
            data.isSuccess = false;
            data.message = "Có lỗi trong quá trình tải dữ liệu";
        }

        return data;
    }
}
export default HttpClient;