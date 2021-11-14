import {
  get,
  post
}
from "../utils/request";
export function getList(params) {
  return get("/api/test-data", params)
}
