import {
  addCategoryService,
  addProductService,
  fetchCategoriesService,
  productByCategoryService,
  updateProductService,
} from "../services/service";

let successResponseObject = {
  _code: 200,
  _message: "Success",
};

let failureResponseObject = {
  _code: 500,
  _message: "Error Occured",
};

export async function addCategory(req, res) {
  try {
    let param = req.body;
    if (
      !Array.isArray(param) &&
      Array.isArray(param.child_category) &&
      param.name
    ) {
      await addCategoryService(param);
    } else {
      console.log("in else");
      throw new Error(
        "Either parameter should be an object or child category must be an array or catgory name parameter is missing"
      );
    }
    res.send(successResponseObject);
  } catch (err) {
    failureResponseObject._error = err.message;
    res.send(failureResponseObject);
  }
}

export async function addProduct(req, res) {
  try {
    let param = req.body;
    if (
      !Array.isArray(param) &&
      Array.isArray(param.category_name) &&
      param.name
    ) {
      await addProductService(param);
    } else {
      console.log("in else");
      throw new Error(
        "Either parameter should be an object or category must be an array or product name is missing"
      );
    }
    res.send(successResponseObject);
  } catch (err) {
    failureResponseObject._error = err.message;
    res.send(failureResponseObject);
  }
}

export async function fetchCategories(req, res) {
  try {
    let categories = await fetchCategoriesService();
    successResponseObject._result = categories;
    res.send(successResponseObject);
  } catch (err) {
    failureResponseObject._error = err.message;
    res.send(failureResponseObject);
  }
}

export async function productByCategory(req, res) {
  try {
    let param = req.body;
    if (param && param.category) {
      let finalResult = await productByCategoryService(param);
      successResponseObject._result = finalResult;
    } else {
      console.log("in else");
      throw new Error("Please specify the category");
    }
    res.send(successResponseObject);
  } catch (err) {
    failureResponseObject._error = err.message;
    res.send(failureResponseObject);
  }
}

export async function updateProduct(req, res) {
  try {
    let param = req.body;
    if (param && param.name && Array.isArray(param.category_name)) {
      await updateProductService(param);
    } else {
      console.log("in else");
      throw new Error(
        "Product name parameter is missing or category name must be an array"
      );
    }
    res.send(successResponseObject);
  } catch (err) {
    failureResponseObject._error = err.message;
    res.send(failureResponseObject);
  }
}
