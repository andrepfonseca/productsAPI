import * as api from "./api.js";

const productKeys = [
  "id",
  "title",
  "price",
  "description",
  "category",
  "image",
  "rating",
].sort();

describe("fetchAPI", () => {
  it("Should return an array objects", async () => {
    const result = await api.fetchAPI(api.url);
    expect(typeof result).toBe("object");
  });

  it("Should throw if it can not reach API", async () => {
    try {
      await api.fetchAPI("https://fakestoreapi.com/producs/");
    } catch (error) {
      expect(error.message).toBe("Erro na consulta da API");
    }
  });
});

describe("getAllProducts", () => {
  it("should return an array with objects containing the same keys as productKeys", async () => {
    const result = await api.getAllProducts();
    result.forEach((product) => {
      expect(Object.keys(product).sort()).toEqual(productKeys);
    });
  });

  it("Should not return a single product ", async () => {
    const result = await api.getAllProducts();
    expect(result.length).toBeGreaterThan(1);
  });
});

describe("printAllProducts", () => {
  it("Should print an array with all products", async () => {
    const logSpy = jest.spyOn(global.console, "log");
    await api.printAllProducts();

    expect(logSpy).toHaveBeenCalled();
    logSpy.mockRestore();
  });
});

describe("getProductById", () => {
  it("Should return an object", async () => {
    const result = await api.getProductById(1);
    expect(typeof result).toBe("object");
  });

  it("Should throw if it can not find product with given id", async () => {
    try {
      await api.getProductById(999);
    } catch (error) {
      expect(error.message).toBe("Erro na consulta da API");
    }
  });

  it("Should return an object matching productExample", async () => {
    const result = await api.getProductById(2);
    expect(Object.keys(result).sort()).toEqual(productKeys);
  });
});

describe("getAllCategories", () => {
  it("Should not return an empty array ", async () => {
    const result = await api.getAllCategories();
    expect(result.length).toBeGreaterThan(0);
  });

  it("Should contain eletronics category", async () => {
    const result = await api.getAllCategories();
    expect(result).toContain("electronics");
  });
});

// ----------------------------------------------------------------------------------
describe("getAllProductsInCategory", () => {
  it("Should return all products from the given category", async () => {
    const categoryToFind = "electronics";
    const result = await api.getAllProductsInCategory(categoryToFind);
    result.forEach((product) => {
      expect(product.category).toBe(categoryToFind);
    });
  });

  it("Should throw if category name does not exist", async () => {
    const categoryToFind = "xxxxxxxxxxxx";
    const result = await api.getAllProductsInCategory(categoryToFind);
    expect(result).toEqual([]);
  });
});

describe("getAllProductsWithRateAboveFour", () => {
  it("Should return an array with products with rate above four", async () => {
    const result = await api.getAllProductsWithRateAboveFour();
    result.forEach((product) => {
      expect(product.rating.rate).toBeGreaterThan(4);
    });
  });
});

describe("getProductWithMostVotes", () => {
  it("Should return one single product, with the highest amount of votes between all products", async () => {
    const result = await api.getProductWithMostVotes();
    const allProducts = await api.getAllProducts();
    allProducts.forEach((product) => {
      expect(product.rating.count).toBeLessThanOrEqual(result.rating.count);
    });
  });
});

describe("getProductAveragePrice", () => {
  it("Should return the average price of all products (should return a number)", async () => {
    const result = await api.getProductAveragePrice();
    expect(result).toBeTruthy();
    expect(typeof result).toBe("number");
  });
});

describe("getHighestPriceProduct", () => {
  it("Should return the product that has the highest price", async () => {
    const result = await api.getHighestPriceProduct();
    const allProducts = await api.getAllProducts();
    allProducts.forEach((product) => {
      expect(product.price).toBeLessThanOrEqual(result.price);
    });
  });
});

describe("getLowestPriceProduct", () => {
  it("Should return the product that has the lowest price", async () => {
    const result = await api.getLowestPriceProduct();
    const allProducts = await api.getAllProducts();
    allProducts.forEach((product) => {
      expect(product.price).toBeGreaterThanOrEqual(result.price);
    });
  });
});
