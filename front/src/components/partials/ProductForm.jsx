import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function ProductForm() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("There was an error fetching the categories!", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      product: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      category: selectedCategory,
      stock: 10,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/product",
        product
      );
      console.log("Product posted successfully:", response.data);
    } catch (error) {
      console.error("There was an error posting the product!", error, product);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Nom du produit:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="selectedCategory">Rayon:</label>
          <select
            id="selectedCategory"
            name="selectedCategory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Selection</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="productPrice">Prix:</label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productDescription">Description:</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Enregister</button>
      </form>
    </>
  );
}
