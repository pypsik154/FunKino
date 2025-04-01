export default {
  server: {
    middlewareMode: true,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const blockedUrls = [
          "doubleclick.net",
          "adservice.google.com",
          "adserver.xyz",
          "popads.net",
          "bannerads.com"
        ];
        if (blockedUrls.some(url => req.url.includes(url))) {
          res.statusCode = 403;
          res.end("Blocked");
        } else {
          next();
        }
      });
    }
  }
};
