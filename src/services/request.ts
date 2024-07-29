import { createSimple } from "@cic/common-request";
import { message } from "antd";
import { getToken } from ".";
import { setLocalStorage } from "@/Popup/utils";

const safeJsonParse = (token?: string | null) => {
  try {
    const nt = JSON.parse(token ?? "{}");
    return nt;
  } catch (error) {
    return {};
  }
};

const setToen = async () => {
  const { userId } = safeJsonParse(localStorage.getItem("userInfo"));

  const { data } = await getToken({ userId: userId ?? "3397210042" });

  const token = JSON.stringify({
    key: "cic-htoken",
    value: data,
    expires: 86400000,
  });

  setLocalStorage(token);
};

const request = createSimple({
  errorHandler(error) {
    if (error?.cause?.response?.status === 401) {
      error.message === "token过期，正在重新获取中，请重试";
      setToen();
      return;
    }

    if (error?.cause?.response?.config?.skipErrorHandler) return;
    message.info(error.message);
    error.message === "未知错误" && console.log(error);
  },
});

request.raw.interceptors.request.use(
  (config) => {
    const json = localStorage.getItem("token") ?? "{}";
    const token = safeJsonParse(json);
    const headers = {
      ...config.headers,
      "Access-Control-Allow-Headers": "*",
      "Cic-Auth-Method": "header",
      "Cic-Htoken": token?.value,
      env: "innerprojecttest",
    };
    return { ...config, headers };
  },
  (error) => {
    console.log(error);
  }
);

export { request };
