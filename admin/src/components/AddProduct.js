import React, { useState } from "react";
import upload_area from "../assets/upload_area.svg";
import { MdAdd } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "clothing",
    new_price: "",
    old_price: "",
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imagehandler = (e) => {
    setImage(e.target.files[0]);
  };

  const Add_Product = async () => {
    let responseData;
    let product = { ...productDetails };

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://192.168.0.57:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;

      await fetch("http://192.168.0.57:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.success) {
            toast.success("Product added successfully!", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // Clear form after successful addition
            setProductDetails({
              name: "",
              image: "",
              category: "clothing",
              new_price: "",
              old_price: "",
            });
          } else {
            toast.error("Failed to add product!", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    } else {
      toast.error("Failed to upload image!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="mb-3 box-border bg-white w-full rounded-sm mt-5 lg:ml-5 p-6 shadow-lg">
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Product title:</h4>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here..."
          className="bg-gray-100 outline-none w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Price:</h4>
        <input
          value={productDetails.old_price}
          onChange={changeHandler}
          type="text"
          name="old_price"
          placeholder="Type here..."
          className="bg-gray-100 outline-none w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Offer Price:</h4>
        <input
          value={productDetails.new_price}
          onChange={changeHandler}
          type="text"
          name="new_price"
          placeholder="Type here..."
          className="bg-gray-100 outline-none w-full py-3 px-4 rounded-md"
        />
      </div>
      <div className="mb-3 flex items-center gap-x-4">
        <h4>Product Category:</h4>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="bg-gray-100 ring-1 ring-slate-900/20 rounded-sm outline-none p-2"
        >
          <option value="clothing">Clothing</option>
          <option value="cosmetics">Cosmetics</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="file-input" className="cursor-pointer">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="w-20 h-20 object-cover rounded-sm border border-gray-200"
          />
        </label>
        <input
          onChange={imagehandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={Add_Product}
        className="btn-dark rounded-lg mt-4 flex items-center gap-x-1 h-9 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
      >
        <MdAdd className="text-xl" />
        Add Product
      </button>
      {/* ToastContainer for pop-up notifications */}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default AddProduct;
