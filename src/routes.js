import {
  addCategory,
  addProduct,
  fetchCategories,
  productByCategory,
  updateProduct,
} from "./controllers/controller";

export default (app) => {
  app.post("/add-category", addCategory);
  app.post("/add-product", addProduct);
  app.get("/categories", fetchCategories);
  app.post("/product-by-category", productByCategory);
  app.post("/update-product", updateProduct);
};
