import http from "./BaseService";

const postProduct = (data) => {
  http.post("/productList", data);
};

const ProductService = {
  postProduct,
};

export default ProductService;
