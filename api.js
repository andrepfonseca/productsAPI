export const url = "https://fakestoreapi.com/products/";

export const fetchAPI = async (url) => {
  try {
    const result = await fetch(url).then((response) => response.json());
    return result;
  } catch (error) {
    throw new Error("Erro na consulta da API");
  }
};

export const getAllProducts = async () => {
  const result = await fetchAPI(url);
  return result;
};

export const printAllProducts = async () => {
  const result = await getAllProducts();
  console.log(result);
};

export const getProductById = async (id) => {
  const result = await fetchAPI(url + id);
  console.log(result);
  return result;
};

export const getAllCategories = async () => {
  const result = await fetchAPI(url + "categories");
  console.log(result);
  return result;
};

//[ 'electronics', 'jewelery', "men's clothing", "women's clothing" ]
export const getAllProductsInCategory = async (category) => {
  const result = await fetchAPI(url + "category/" + category);
  console.log(result);
  return result;
};

export const getAllProductsWithRateAboveFour = async () => {
  const result = await getAllProducts();
  const filterdResults = result.filter((el) => el.rating.rate > 4);
  console.log(filterdResults);
  return filterdResults;
};

//What should we return if we have two products with the same amount of votes tied with most votes?
export const getProductWithMostVotes = async () => {
  const result = await getAllProducts();
  const productWithMostVotes = result.reduce((acc, cur) => {
    if (cur.rating.count > acc.rating.count) acc = cur;
    return acc;
  });
  console.log(productWithMostVotes);
  return productWithMostVotes;
};

export const getProductAveragePrice = async () => {
  const result = await getAllProducts();
  const totalProductPrice = result.reduce((acc, cur) => (acc += cur.price), 0);
  const averageProductPrice = totalProductPrice / result.length;
  console.log(averageProductPrice);
  return averageProductPrice;
};

export const getHighestPriceProduct = async () => {
  const result = await getAllProducts();
  const highestPriceProduct = result.reduce((acc, cur) => {
    if (cur.price > acc.price) acc = cur;
    return acc;
  });
  console.log(highestPriceProduct);
  return highestPriceProduct;
};

export const getLowestPriceProduct = async () => {
  const result = await getAllProducts();
  const lowestPriceProduct = result.reduce((acc, cur) => {
    if (cur.price < acc.price) acc = cur;
    return acc;
  });
  console.log(lowestPriceProduct);
  return lowestPriceProduct;
};

// getAllProducts();
getProductById(1);
// getAllCategories();
// getAllProductsInCategory("electronics");
// getAllProductsWithRateAboveFour();
// getProductWithMostVotes();
// getProductAveragePrice();
// getHighestPriceProduct();
// getLowestPriceProduct();
