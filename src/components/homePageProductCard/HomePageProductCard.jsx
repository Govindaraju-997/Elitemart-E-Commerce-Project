
// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import myContext from "../../context/myContext";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/cartSlice";
// import toast from "react-hot-toast";

// const HomePageProductCard = () => {
//     const navigate = useNavigate();
//     const context = useContext(myContext);
//     const { getAllProduct } = context;
//     const cartItems = useSelector((state) => state.cart);
//     const dispatch = useDispatch();
    
//     const [visibleProducts, setVisibleProducts] = useState(8);

//     const addCart = (item) => {
//         const isItemInCart = cartItems.some(cartItem => cartItem.id === item.id);
//         if (isItemInCart) {
//             toast.error("Product is already in the cart");
//         } else {
//             dispatch(addToCart(item));
//             toast.success("Added to cart");
//         }
//     };

//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//     }, [cartItems]);

//     const loadMore = () => {
//         setVisibleProducts(prev => prev + 8);
//     };

//     return (
//         <div className="mt-10">
//             <div className="">
//                 <h1 className="text-center mb-5 text-2xl font-semibold">Bestselling Products</h1>
//             </div>
//             <section className="text-gray-600 body-font">
//                 <div className="container px-5 py-5 mx-auto">
//                     <div className="w-full">
//                         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                             {getAllProduct.slice(0, visibleProducts).map((item, index) => {
//                                 const { id, title, price, productImageUrl } = item;
//                                 return (
//                                     <div key={index} className="p-2">
//                                         <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
//                                             <img
//                                                 onClick={() => navigate(`/productinfo/${id}`)}
//                                                 className="lg:h-60 h-40 w-full pt-2 object-contain"
//                                                 src={productImageUrl}
//                                                 alt="product"
//                                             />
//                                             <div className="p-4">
//                                                 <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
//                                                     EliteMart
//                                                 </h2>
//                                                 <h1 className="title-font md:text-sm lg:text-lg font-medium text-gray-900 mb-3">
//                                                     {title.length > 50 ? title.substring(0, 50) + "..." : title}
//                                                 </h1>
//                                                 <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
//                                                     ₹{price}
//                                                 </h1>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                         {visibleProducts < getAllProduct.length && (
//                             <div className="flex justify-center mt-6">
//                                 <button onClick={loadMore} className="bg-blue-800 hover:bg-blue-950 text-white py-2 px-6 rounded-lg font-bold">
//                                     Load More
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default HomePageProductCard;





import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllProduct } = context;
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    const [visibleProducts, setVisibleProducts] = useState(8);

    const addCart = (item) => {
        const isItemInCart = cartItems.some(cartItem => cartItem.id === item.id);
        if (isItemInCart) {
            toast.error("Product is already in the cart");
        } else {
            dispatch(addToCart(item));
            toast.success("Added to cart");
        }
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const loadMore = () => {
        setVisibleProducts(prev => prev + 8);
    };

    return (
        <div className="mt-10">
            <div className="">
                <h1 className="text-center mb-5 text-2xl font-semibold">Bestselling Products</h1>
            </div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="w-full">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {getAllProduct.slice(0, visibleProducts).map((item, index) => {
                                const { id, title, price, productImageUrl } = item;
                                return (
                                    <div key={index} className="p-2">
                                        <div 
                                            className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
                                        >
                                            <img
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="lg:h-60 h-40 w-full pt-2 object-contain hover:opacity-90"
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
                                                <button 
                                                    onClick={() => addCart(item)}
                                                    className="bg-blue-600 hover:bg-blue-800 text-white py-1 px-4 rounded-lg transition duration-300"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {visibleProducts < getAllProduct.length && (
                            <div className="flex justify-center mt-6">
                                <button onClick={loadMore} className="bg-blue-800 hover:bg-blue-950 text-white py-2 px-6 rounded-lg font-bold transition duration-300">
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePageProductCard;
