import React from 'react'

export default function Product({product}) {
  return (
    <>
    <article className="d-flex justify-content-center align-items-center">
      <header>{product.product} </header>
      {product.description}
      <footer>{product.category.category}</footer>
    </article>
  </>
  )
}
