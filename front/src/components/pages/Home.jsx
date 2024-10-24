import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../partials/Product";
import "./Home.css";
import ProductForm from "../partials/ProductForm";

export default function Home() {
  const [products, setProducts] = useState([]);

  const deleteProduct = (id) => {
    const updatedList = products.filter((product) => product.id !== id);
    setProducts(updatedList); 
  };

  const editProduct = (id, updatedData) => {
    const updatedList = products.map((product) =>
      product.id === id ? { ...product, ...updatedData } : product
    );
    setProducts(updatedList);
  };
 

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
        <article>
            <p>
                Bienvenue sur notre site de vente en ligne. Vous trouverez ici
                tous les produits dont vous avez besoin.
            </p>
        </article>
    
        <div class="grid">
      
        <div>
          <ProductForm />
        </div>
          <div>
            <div className="product-container ext-center">
              <h1>Nos Produits</h1>
              <div className="product-list">
              {products.map((product) => (
                <Product key={product.id} product={product}  deleteProduct={deleteProduct}
                editProduct={editProduct} />
              ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
