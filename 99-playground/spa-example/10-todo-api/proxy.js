import {createProxyMiddleware} from 'http-proxy-middleware';

export default function setupProxy(expressApp){

  expressApp.use(
    "/swapi",
    proxyDelay,
    createProxyMiddleware({
      target: "https://swapi.dev/",
      changeOrigin: true,
      logLevel: "debug",
      pathRewrite: {
        '^/swapi': '/api'
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log("onProxyReq", req.url);
      },
    })
  );

  function proxyDelay(req, res, next) {
    if (req.originalUrl === "/swapi/people/1/") {
      console.log("delaying request");
      setTimeout(next, 0);  // Delay request

      // Delay response completion
      const endOriginal = res.end;
      res.end = function (...args) {
        setTimeout(function () {
          endOriginal.apply(res, args);
        }, 0);
      };
    } else {
      next();
    }
  }
}
