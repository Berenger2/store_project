import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../partials/Product";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div class="grid">
        <div>2</div>
          <div>
            <div className="product-container ext-center">
              <h1>Nos Produits</h1>
              <div className="product-list">
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
