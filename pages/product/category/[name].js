import React from "react";

import { client } from "../../../lib/client";
import { Product } from "../../../components";

import { product_by_category } from "../../../utils/generate_product_by_id";

const CategoryDetail = ({ categoryProduct }) => {
  return (
    // <div className="category-preview">
    //   <h2></h2>
    //   <div className="preview-wrapper"></div>
    // </div>
    <div className="product-shop-container">
      {categoryProduct.length &&
        categoryProduct.map((each, idx) => (
          <div key={idx}>
            <div className="product-by-category">
              <div className="product-title">
                <h3 style={{ marginBottom: "1rem" }}>{each.name}</h3>
              </div>
              <div className="product-wrapper-items" style={{ rowGap: "16px" }}>
                {each.products?.length &&
                  each.products.map((product) => (
                    <Product
                      product={product}
                      key={product._id}
                      isRandomImage={false}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export async function getServerSideProps({ params: { name } }) {
  const productsQuery = `*[_type == "product"]{ ..., category->}`;
  const products = await client.fetch(productsQuery);

  const category_product = product_by_category(products).filter(
    (item) => item.name === name
  );

  return {
    props: { categoryProduct: category_product },
  };
}

export default CategoryDetail;
