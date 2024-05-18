import React, { useEffect, useState } from "react";
import { ImBin2 } from "react-icons/im";

function ListProduct() {
  const [allproducts, setAllproducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchInfo = async () => {
    await fetch("http://192.168.0.57:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllproducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://192.168.0.57:4000/removeproduct", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }), // Send the ID in the request body
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {
            fetchInfo(); // Refresh the list after deletion
        } else {
            console.error("Failed to delete product");
        }
    });
};


  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (productToDelete) {
      remove_product(productToDelete.id);
      setShowModal(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="p-2 box-border bg-white mb-0 rounded-sm w-full mt-5 lg:ml-5">
      <h4 className="bold-22 p-5 uppercase">Product List</h4>
      <div className="max-h-[77vh] overflow-auto px-4 text-center">
        <table className="w-full mx-auto">
          <thead>
            <tr className="bg-primary bold-14 sm:regular-22 text-start py-12">
              <th className="p-2">Product</th>
              <th className="p-2">Title</th>
              <th className="p-2">Old Price</th>
              <th className="p-2">New Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {allproducts.map((product, i) => (
              <tr
                key={i}
                className="border-b border-slate-900/20 text-gray-20 p-6 medium-14"
              >
                <td className="flexCenter my-2">
                  <img
                    src={product.image}
                    alt="P.Img"
                    height={55}
                    width={55}
                    className="rounded-lg ring-1 ring-slate-900/5"
                  />
                </td>
                <td>
                  <div className="line-clamp-3">{product.name}</div>
                </td>
                <td>
                  <div>${product.old_price}.00</div>
                </td>
                <td>
                  <div>${product.new_price}.00</div>
                </td>
                <td>
                  <div>{product.category}</div>
                </td>
                <td>
                  <div className="bold-22 text-black   pl-6 sm:pl-16">
                    <ImBin2 onClick={() => confirmDelete(product)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete {productToDelete.name}?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListProduct;
