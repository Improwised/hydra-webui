export function request(axios, type, url, data) {
  let request;

  switch (type) {
    case "get":
      request = axios.$get(url);
      break;
    case "post":
      request = axios.$post(url, data);
      break;
    case "put":
      request = axios.$put(url, data);
      break;
    case "delete":
      request = axios.$delete(url);
      break;
  }

  return request;
}
