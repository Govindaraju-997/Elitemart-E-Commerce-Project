import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;
    const navigate = useNavigate();
    
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Pagination State
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 8;

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Debugging logs
    useEffect(() => {
        console.log("All Products:", getAllProduct);
        console.log("Category from URL:", categoryname);
    }, [getAllProduct, categoryname]);

    // Filter products safely
    const filterProduct = getAllProduct && Array.isArray(getAllProduct)
        ? getAllProduct.filter((obj) => obj.category?.toLowerCase() === categoryname.toLowerCase())
        : [];

    // Paginate the products
    const pageCount = Math.ceil(filterProduct.length / productsPerPage);
    const offset = currentPage * productsPerPage;
    const currentProducts = filterProduct.slice(offset, offset + productsPerPage);

    // Handle page change
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    };

    return (
        <Layout>
            <div className="mt-25">
                <div className="text-center mb-5">
                    {/* <h1 className="text-2xl font-semibold capitalize">{categoryname}</h1> */}
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <section className="text-gray-600 body-font">
                        <div className="container mx-auto">
                            <div className="w-full">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {currentProducts.length > 0 ? (
                                        currentProducts.map((item, index) => {
                                            const { id, title, price, productImageUrl } = item;
                                            return (
                                                <div key={index} className="p-4 w-full">
                                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                                        <img
                                                            onClick={() => navigate(`/productinfo/${id}`)}
                                                            className="lg:h-60 h-40 w-full pt-2 object-contain"
                                                            src={productImageUrl}
                                                            alt={title}
                                                        />
                                                        <div className="p-6">
                                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                                EliteMart
                                                            </h2>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                {title.substring(0, 50)}
                                                            </h1>
                                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                ₹{new Intl.NumberFormat("en-IN").format(price || 0)}
                                                            </h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center mt-10">
                                            <img
                                                className="mx-auto w-24 h-24 mb-4"
                                                src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                                                alt="No products found"
                                            />
                                            <h1 className="text-black text-xl">No products found in "{categoryname}"</h1>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pagination */}
                            {filterProduct.length > productsPerPage && (
                                <div className="flex justify-center mt-8 mb-5">
                                    <ReactPaginate
                                        previousLabel={"< PREVIOUS"}
                                        nextLabel={"NEXT >"}
                                        breakLabel={"..."}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={handlePageClick}
                                        containerClassName={"flex space-x-3 items-center"}
                                        pageClassName={"px-4 py-2  rounded-full cursor-pointer"}
                                        activeClassName={"bg-blue-500 text-white font-bold"}
                                        previousClassName={"text-blue-500 cursor-pointer"}
                                        nextClassName={"text-blue-500 cursor-pointer"}
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
};

export default CategoryPage;
