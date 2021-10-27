//@ts-check
const api = require("./api");
const { transformRequest, transformResponse } = require("hapi-lambda");

// cache the server for better peformance
let server;

/**
 * A Hapi webserver handing off a lambda
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 *
 */
 exports.lambdaHandler = async (event, context) => {
   console.log("event", event);
  if (!server) {
    server = await api.init();
  }

  const request = transformRequest(event);

  //   // handle cors here if needed
  //   request.headers['Access-Control-Allow-Origin'] = '*';
  //   request.headers['Access-Control-Allow-Credentials'] = true;

  const response = await server.inject(request);

  return transformResponse(response);

}