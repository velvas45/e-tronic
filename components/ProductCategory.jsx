import React from "react";
import Link from "next/link";
import Product from "./Product";

const ProductCategory = ({ data }) => {
  const maxProduct = data.products?.slice(0, 4);
  return (
    <div className="product-by-category">
      <div className="product-title">
        <h3>{data.name}</h3>
        {data.products?.length > 4 && (
          <Link href={`/product/category/${data.name}`}>
            <p className="product-see-more" style={{ cursor: "pointer" }}>
              See more
            </p>
          </Link>
        )}
      </div>
      <div className="product-wrapper-items">
        {data.products?.length &&
          maxProduct.map((product) => (
            <Product
              product={product}
              key={product._id}
              isRandomImage={false}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductCategory;
