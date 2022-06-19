import React, { useState, useEffect } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";

import { client, urlFor } from "../../lib/client";
import { numberWithCommas } from "../../utils/numeric";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products, slug }) => {
  const { decQty, incQty, qty, onAdd, setQty, setShowCart } = useStateContext();
  const { image, name, detail, price } = product;
  const [index, setIndex] = useState(0);

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  useEffect(() => {
    setQty(1);
  }, [slug]);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p style={{ textAlign: "justify" }}>{detail}</p>
          <p className="price">Rp. {numberWithCommas(price)}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((item, idx) => (
              <Product product={item} key={idx} isRandomImage={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]{ ..., category-> }';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  const indexSpliceArr = products.findIndex(
    (productItem) => product._id == productItem._id
  );

  products.splice(indexSpliceArr, 1);

  return {
    props: { products, product, slug },
  };
}

// export async function getStaticPaths() {
//   const productsQuery = `*[_type == "product"] {
//     slug {
//         current
//     }
//   }`;
//   const products = await client.fetch(productsQuery);
//   return {
//     paths: products?.map((product) => ({
//       params: { slug: product.slug.current },
//     })),
//     fallback: true,
//   };
// }

export default ProductDetails;
