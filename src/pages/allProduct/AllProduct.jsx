
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";

const AllProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState(getAllProduct);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search");

  useEffect(() => {
    if (searchTerm) {
      const filtered = getAllProduct.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(getAllProduct);
    }
  }, [searchTerm, getAllProduct]);

  // Pagination Logic
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>

      {/* Loading  */}
      <div className="flex justify-center relative top-20">
        {loading && <Loader />}
      </div>

      <div className="py-8 mt-15">
        {/* <h1 className="text-center mb-5 text-2xl font-semibold">All Products</h1> */}
        <section className="text-gray-600 body-font">
          <div className="container lg:px-0 mx-auto">
            <div className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
                {currentItems.map((item, index) => {
                  const { id, title, price, productImageUrl } = item;
                  return (
                    <div key={index} className="p-2">
                      <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                        <img
                          onClick={() => navigate(`/productinfo/${id}`)}
                          className="lg:h-60 h-40 w-full pt-2 object-contain"
                          src={productImageUrl}
                          alt="product"
                        />
                        <div className="p-4">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                            EliteMart
                          </h2>
                          <h1 className="title-font md:text-sm lg:text-lg font-medium text-gray-900 mb-3">
                            {title.length > 50 ? title.substring(0, 50) + "..." : title}
                          </h1>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            ₹{price}
                          </h1>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination Component */}
            <div className="flex justify-center mt-8">
              <ReactPaginate
                previousLabel={"< PREVIOUS"}
                nextLabel={"NEXT >"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"flex space-x-3 items-center"}
                pageClassName={"px-4 py-2 rounded-full cursor-pointer"}
                activeClassName={"bg-blue-500 text-white font-bold"}
                previousClassName={"text-blue-500 cursor-pointer"}
                nextClassName={"text-blue-500 cursor-pointer"}
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;
