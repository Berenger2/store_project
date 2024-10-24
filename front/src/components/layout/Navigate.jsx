import React from "react";
import { Link } from "react-router-dom";

export default function Navigate() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <strong>IPSSI-STORE</strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/" className="contrast">
              Home
            </Link>
          </li>
          <li>
            <a href="/" className="contrast">
              Rayons
            </a>
          </li>
          <li>
            <a href="/" className="contrast">
              Produits
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
