import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app: any) {
  app.use(
    createProxyMiddleware("/platform/api", {
      target: "http://10.207.137.197:8780", // 请求转发地址
      changeOrigin: true,
      pathRewrite: {
        "": "",
      },
    })
  );
}
