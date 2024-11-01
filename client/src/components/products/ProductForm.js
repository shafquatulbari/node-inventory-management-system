import React, { useState, useEffect } from "react";
import api from "../../services/api";

const ProductForm = ({ product = null, onSave }) => {
  const [name, setName] = useState(product ? product.name : "");
  const [category, setCategory] = useState(product ? product.category : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [quantity, setQuantity] = useState(product ? product.quantity : 0); // Add quantity state for new product
  const [quantityChange, setQuantityChange] = useState(0);
  const [quantityOperation, setQuantityOperation] = useState("Add");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get("categories/");
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const adjustedStockLevel = product
      ? quantityOperation === "Add"
        ? product.stock_level + quantityChange
        : product.stock_level - quantityChange
      : quantity;

    // Check for initial product addition and stock level adjustments
    if (!product && quantity < 1) {
      setError("Initial quantity must be at least 1.");
      return;
    } else if (product && adjustedStockLevel < 1) {
      setError("Stock level cannot be reduced below 1.");
      return;
    }

    const data = {
      name,
      category,
      price,
      stock_level: adjustedStockLevel,
      description,
    };

    try {
      let response;
      if (product) {
        response = await api.put(`products/${product._id}`, data);
      } else {
        response = await api.post("products/", data);
      }

      if (response.data.error) {
        console.log("Error response:", response.data.error); // Log error response
        setError(response.data.error);
      } else {
        onSave();
      }
    } catch (error) {
      console.error("An error occurred while saving the product:", error); // Log catch error
      setError("An error occurred while saving the product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {product ? "Edit" : "Add"} Product
      </h2>

      {/* Display error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <div className="mb-4 flex items-center">
        <span className="text-gray-600 mr-2">$</span>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Quantity Input for New Product */}
      {!product && (
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Initial Quantity</label>
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            className="w-full p-2 border rounded"
          />
        </div>
      )}

      {/* Quantity Adjustment for Existing Product */}
      {product && (
        <div className="flex items-center mb-4">
          <select
            value={quantityOperation}
            onChange={(e) => setQuantityOperation(e.target.value)}
            className="p-2 border rounded mr-2"
          >
            <option value="Add">Add Quantity</option>
            <option value="Subtract">Remove Quantity</option>
          </select>
          <input
            type="number"
            placeholder="Quantity Adjustment"
            value={quantityChange}
            onChange={(e) =>
              setQuantityChange(Math.max(0, parseInt(e.target.value) || 0))
            }
            className="w-1/3 p-2 border rounded text-center"
          />
        </div>
      )}

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        className="w-full bg-blue-500 text-white p-2 rounded"
        type="submit"
      >
        {product ? "Update" : "Add"} Product
      </button>
    </form>
  );
};

export default ProductForm;
