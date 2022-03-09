import { tryCatch } from "@thalesrc/js-utils";
import http from "./http";
import { GET_CATEGORIES_URL, GET_PRODUCTS_URL, HOME_PRODUCT_URL, PRODUCT_URL } from "../utils/url";

export async function getHomeProducts() {
  const [error, result] = await tryCatch(http.post(HOME_PRODUCT_URL));
  if (error) throw error;

  return result.data;
}

export async function productDetail(id) {
  const [error, result] = await tryCatch(http.get(`${PRODUCT_URL}/${id}`));
  if (error) throw error;

  return result.data;
}

export async function getProducts(payload) {
  const [error, result] = await tryCatch(http.post(GET_PRODUCTS_URL, payload));
  if (error) throw error;

  return result.data;
}


export async function getAllCategories(payload) {
  const [error, result] = await tryCatch(http.post(GET_CATEGORIES_URL, payload));
  if (error) throw error;

  return result.data;
}