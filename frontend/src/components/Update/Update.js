import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./update.css";

const Update = ({ onUpdateSuccess }) => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    paragraph: "",
    rating: "",
    price: "",
    discountPrice: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        // Check if the response is OK (status 200)
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const product = await response.json();
        console.log("Editing product:", product);

        // Set form data based on fetched product
        setFormData({
          image: product.image || "",
          name: product.name || "",
          paragraph: product.paragraph || "",
          rating: product.rating || "",
          price: product.price || "",
          discountPrice: product.discountPrice || "",
          description: product.description || "",
        });
      } catch (error) {
        alert("Error fetching product: " + error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData); // Log form data

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      // Check if the response is OK (status 200)
      if (response.ok) {
        alert("Product updated successfully!"); // Alert on successful update
        onUpdateSuccess(); // Call the success handler

        // Redirect to home page after successful update
        navigate("/"); // Redirect to home page

        // Reset form
        setFormData({
          image: "",
          name: "",
          paragraph: "",
          rating: "",
          price: "",
          discountPrice: "",
          description: "",
        });
      } else {
        alert("Failed to update product: " + response.statusText); // Alert on failure
      }
    } catch (error) {
      alert("Error updating product: " + error.message); // Alert on error
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Paragraph:</label>
          <input
            type="text"
            name="paragraph"
            value={formData.paragraph}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Discount Price:</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default Update;
