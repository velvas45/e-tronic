export const product_by_category = (products) => {
  return products.reduce((acc, eachProduct) => {
    const categoryIndex = acc.findIndex(
      (item) => item.name == eachProduct.category.name
    );
    let product_new_data = {};
    for (const [key, value] of Object.entries(eachProduct)) {
      if (key !== "category") {
        product_new_data[key] = value;
      }
    }
    if (categoryIndex > -1) {
      acc[categoryIndex].products.push(eachProduct);
    } else {
      acc.push({
        name: eachProduct.category.name,
        products: [product_new_data],
      });
    }
    return acc;
  }, []);
};
