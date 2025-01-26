import React, { useState, useEffect } from "react";
import * as productService from '../services/api/productService.js';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", unitPay: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);  // State để điều khiển popup

  useEffect(() => {
    const fetchData = async () => {
      const data = await productService.getProduct();
      setProducts(data);
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const addedProduct = await productService.addProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      setNewProduct({ name: "", unitPay: "" });
      setShowPopup(false);  // Đóng popup sau khi thêm sản phẩm
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}  // Hiển thị popup khi nhấn nút
        className="px-4 py-2 bg-blue-500 text-white"
      >
        Add Product
      </button>

      {/* Popup Create Product */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Create New Product</h2>
            <form onSubmit={handleAddProduct}>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="border px-4 py-2 w-full mb-4"
                required
              />
              <input
                type="number"
                name="unitPay"
                value={newProduct.unitPay}
                onChange={handleInputChange}
                placeholder="Enter unit pay"
                className="border px-4 py-2 w-full mb-4"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-500 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}  // Đóng popup khi nhấn Cancel
                  className="ml-2 px-4 py-2 bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="table-auto w-full border-collapse border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Tên</th>
            <th className="border border-gray-300 px-4 py-2">Công</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 px-4 py-2">{product.id}</td>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.unitPay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;