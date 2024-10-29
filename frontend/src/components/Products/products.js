import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        console.log("Fetched products:", res.data); // Log fetched products
        setProducts(res.data);
      } catch (err) {
        console.error(
          "Error fetching products:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  };

  const handleEditClick = (id) => {
    navigate(`/Update/${id}`);
  };

  // Delete product function
  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product._id !== id));
        console.log("Product deleted successfully");
      } catch (err) {
        console.error(
          "Error deleting product:",
          err.response ? err.response.data : err.message
        );
      }
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-list">
      <div className="search-cont">
        <input
          type="text"
          placeholder="Search Product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <i className="fa fa-solid fa-search"></i>
      </div>

      {filteredProducts.map((product) => (
        <div className="card" key={product._id}>
          <div className="image-container">
            <img
              src={`../images/${product.image}`}
              alt={product.name}
              className="card-img-top"
              style={{ objectFit: "cover", height: "200px", width: "100%" }}
            />
            <div className="button-container">
              <button className="btn btn-primary">View Product</button>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.paragraph}</p>
            <div className="rating">{renderStars(product.rating)}</div>
            <div className="price-cont">
              <p className="product-price ">$ {product.discountPrice}</p>
              <p className="text-success font-weight-bold">${product.price}</p>
            </div>

            <div className="action-buttons">
              <button className="btn btn-success">- Add to Cart +</button>
              <button className="btn btn-warning">Buy Now</button>
              <button
                className="btn btn-info"
                onClick={() => handleEditClick(product._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteClick(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
