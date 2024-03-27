/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "my-ts-app",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.ApiGatewayV2("MyApi")
        .route("GET /", "services/service1/index.handler")
        .route("GET /service2", "services/service2/index.handler")
  },
});
