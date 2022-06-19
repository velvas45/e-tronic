import React from "react";
import ProductCategory from "../../components/ProductCategory";

import { client } from "../../lib/client";

import { product_by_category } from "../../utils/generate_product_by_id";

const Product = ({ products_by_category }) => {
  return (
    <div className="product-shop-container">
      {products_by_category.length &&
        products_by_category.map((each) => (
          <ProductCategory data={each} key={each.name} />
        ))}
    </div>
  );
};

export async function getServerSideProps() {
  const productsQuery = '*[_type == "product"]{ ..., category-> }';
  const products = await client.fetch(productsQuery);

  const category_product = product_by_category(products);

  return {
    props: { products_by_category: category_product },
  };
}

export default Product;
