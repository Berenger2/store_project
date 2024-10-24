import React, { useState } from 'react';
import axios from 'axios';
import { FaRegEye, FaRegTrashAlt, FaEdit } from 'react-icons/fa';

export default function Product({ product, deleteProduct, editProduct }) {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); 

  const [editedProduct, setEditedProduct] = useState({
    product: product.product,
    description: product.description,
    category: product.category.category,
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    if (window.confirm("Es-tu sûr de vouloir supprimer ce produit ?")) {
      try {
        await axios.delete(`http://localhost:8080/product/${product._id}`);
        deleteProduct(product._id); 
      } catch (error) {
        console.error("Erreur lors de la suppression du produit", error);
      }
    }
  };


  
  const handleEdit = () => {
    setIsEditMode(true); 
    setShowModal(true); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(product);
        
      const response = await axios.put(`http://localhost:8080/product/${product._id}`, {
        product: editedProduct.product,
        description: editedProduct.description,
        category: editedProduct.category,
      });

      editProduct(product._id, response.data);

      setIsEditMode(false);
      setShowModal(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du produit", error);
    }
  };

  return (
    <>
      <article className="d-flex justify-content-center align-items-center">
        <header className="pico-background-pink-600">
        {product.product} || Rayon : {product.category.category}
        {product.stock === 0 && <span className="text-danger">Produits en rupture de stock</span>}
        </header>
        {product.description}
        <footer>
          <div className="d-flex justify-content-end">
            <button className="outline secondary btn-xs" onClick={handleOpenModal}>
              <FaRegEye />
            </button>
            &ensp;&ensp;
            <button className="outline contrast btn-xs" onClick={handleDelete}>
              <FaRegTrashAlt />
            </button>
            &ensp;&ensp;
            <button className="outline primary btn-xs" onClick={handleEdit}>
              <FaEdit />
            </button>
          </div>
        </footer>
      </article>

   
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            {!isEditMode ? (
           
              <div>
                <h2>Détails du produit</h2>
                <p>Nom : {product.product}</p>
                <p>Description : {product.description}</p>
                <p>Prix : {product.price} €</p>
                <p>Stock : {product.stock}</p>
                <br />
                <p>Catégorie : {product.category.category}</p>
                <p>
                    Respossable du rayon : {product.category.responsable}
                </p>
              </div>
            ) : (
              // Formulaire d'édition
              <div>
                <h2>Modifier le produit</h2>
                <form onSubmit={handleSubmit}>
                  <label>
                    Nom :
                    <input
                      type="text"
                      name="product"
                      value={editedProduct.product}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Description :
                    <textarea
                      name="description"
                      value={editedProduct.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </label>
                  <label>
                    Catégorie :
                    <input
                      type="text"
                      name="category"
                      value={editedProduct.category._id}
                      onChange={handleInputChange}
                    />
                  </label>
                  <button type="submit">Enregistrer</button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
