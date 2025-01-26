export const BASE_URL = 'http://localhost:8080';

// auth
export const LOGIN_URL = `${BASE_URL}/users/v1/do_login`;
export const REGISTER_URL = `${BASE_URL}/users/v1/do_register`;
export const ALL_USER_URL = `${BASE_URL}/users/v1/all_user`;
export const PROFILE_URL = `${BASE_URL}/users/v1/profile`;
export const UPDATE_PROFILE_URL = `${BASE_URL}/users/v1/update/profile`;
export const UPDATE_ROLE_URL = `${BASE_URL}/users/v1/update/role/:id`;
export const REMOVE_PROFILE_URL = `${BASE_URL}/users/v1/remove/profile`;
export const REMOVE_USER_URL = `${BASE_URL}/users/v1/remove/user/:id`;

// product
export const GET_CATEGORY_URL = `${BASE_URL}/products/v1/categories/all`;
export const CREATE_CATEGORY_URL = `${BASE_URL}/products/v1/categories`;
export const GET_CATEGORY_DETAIL_URL = `${BASE_URL}/products/v1/categories/:id`;
export const UPDATE_CATEGORY_URL = `${BASE_URL}/products/v1/categories/:id`;
export const REMOVE_CATEGORY_URL = `${BASE_URL}/products/v1/categories/:id`;

export const GET_PRODUCT_URL = `${BASE_URL}/products/v1/`;
export const CREATE_PRODUCT_URL = `${BASE_URL}/products/v1/`;
export const GET_DETAIL_PRODUCT_URL = `${BASE_URL}/products/v1/:id`;
export const UPDATE_PRODUCT_URL = `${BASE_URL}/products/v1/:id`;
export const REMOVE_PRODUCT_URL = `${BASE_URL}/products/v1/:id`;
export const SEARCH_PRODUCT_URL = `${BASE_URL}/products/v1/search`;
export const FILTER_PRODUCT_URL = `${BASE_URL}/products/v1/filter`;