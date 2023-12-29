export default function (request, response, next) {
  console.log(`${request.method} url:: ${request.url}`);
  next();
}
