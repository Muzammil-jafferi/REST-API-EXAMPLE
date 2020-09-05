import { fetchMongoConnectionDB } from "../db/connectionWrapper";

export async function addCategoryService(queryParam) {
  const client = await fetchMongoConnectionDB();
  const db = client.db("Category_Product");
  const collection = db.collection("Category");
  const categoryNameExist = await isCategoryOrProductNameExist(
    collection,
    queryParam.name
  );
  if (!categoryNameExist) {
    return await collection.insertOne(queryParam);
  } else {
    throw new Error("Category name already exist");
  }
}

export async function addProductService(queryParam) {
  const client = await fetchMongoConnectionDB();
  const db = client.db("Category_Product");
  const collection = db.collection("Products");
  const categoryCollection = db.collection("Category");
  const productNameExist = await isCategoryOrProductNameExist(
    collection,
    queryParam.name
  );
  let category = await categoryCollection.find({}).toArray();
  if (
    checkCategoryExist(queryParam.category_name, category) &&
    !productNameExist
  ) {
    return await collection.insertOne(queryParam);
  } else {
    throw new Error("Category does not exist or Product name already exist");
  }
}

function checkCategoryExist(targetArr, arr) {
  return targetArr.every((i) =>
    arr
      .map((val) => {
        return val.name;
      })
      .includes(i)
  );
}

async function isCategoryOrProductNameExist(collection, name) {
  const categoryOrProductNameList = await collection
    .find({
      name: name,
    })
    .toArray();

  if (categoryOrProductNameList.length !== 0) {
    return true;
  } else {
    return false;
  }
}

export async function fetchCategoriesService() {
  const client = await fetchMongoConnectionDB();
  const db = client.db("Category_Product");
  const collection = db.collection("Category");

  return await collection.find({}).toArray();
}

export async function productByCategoryService(queryParam) {
  const client = await fetchMongoConnectionDB();
  const db = client.db("Category_Product");
  const collection = db.collection("Products");
  let result = await collection
    .find({ category_name: queryParam.category })
    .toArray();

  if (result.length > 0) {
    return result;
  } else {
    return `No Product found for category ${queryParam.category}`;
  }
}

export async function updateProductService(queryParam) {
  const client = await fetchMongoConnectionDB();
  const db = client.db("Category_Product");
  const collection = db.collection("Products");
  const categoryCollection = db.collection("Category");

  let category = await categoryCollection.find({}).toArray();
  const productNameExist = await isCategoryOrProductNameExist(
    collection,
    queryParam.name
  );

  if (
    checkCategoryExist(queryParam.category_name, category) &&
    productNameExist
  ) {
    return await collection.updateOne(
      { name: queryParam.name },
      { $set: queryParam }
    );
  } else {
    throw new Error("Category does not exist or product name not found");
  }
}
