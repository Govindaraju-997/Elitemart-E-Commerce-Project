
import { useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    // Fetch user details from localStorage
    const user = JSON.parse(localStorage.getItem("users"));

    // Get context values
    // const { loading, getAllOrder, getAllOrderFunction, orders } = useContext(myContext);
    const { loading, getAllOrder, getAllOrderFunction } = useContext(myContext);

    // Fetch orders on component mount
    useEffect(() => {
        getAllOrderFunction();
    }, []);


    // Check if orders contain the correct user ID
    const userOrders = getAllOrder?.filter(order => order.userid === user?.uid) || [];
    console.log("✅ Filtered Orders for User:", userOrders);

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8 mt-20">
                {/* User Info Card */}
                <div className="bg-indigo-100 py-5 rounded-xl border border-slate-100 text-center">
                    <div className="flex justify-center">
                        <img src="https://img.icons8.com/?size=100&id=fJ7hcfUGpKG7&format=png&color=000000" alt="User Avatar" />
                    </div>
                    <h1 className="text-lg font-bold">Name: <span className="font-medium">{user?.name || "N/A"}</span></h1>
                    <h1 className="text-lg font-bold">Email: <span className="font-medium">{user?.email || "N/A"}</span></h1>
                    <h1 className="text-lg font-bold">Role: <span className="font-medium">{user?.role || "N/A"}</span></h1>
                </div>

                {/* Order Details Section */}
                <div className="mx-auto my-6 max-w-6xl px-2">
                    <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>

                    {/* Show Loader while fetching orders */}
                    {loading && (
                        <div className="flex justify-center mt-10">
                            <Loader />
                        </div>
                    )}

                    {/* If no orders found */}
                    {!loading && userOrders.length === 0 && (
                        <p className="text-center text-gray-500 mt-6">No orders found</p>
                    )}

                    {/* Display Orders */}
                    {!loading && userOrders.length > 0 && userOrders.map((order) => (
                        <div key={order.id} className="mt-5 border border-slate-200 rounded-xl overflow-hidden">
                            {/* Order Summary */}
                            <div className="p-5 bg-indigo-100 border-b border-pink-100">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold">Order ID</p>
                                        <p className="text-sm font-medium text-gray-900">#{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Date</p>
                                        <p className="text-sm font-medium text-gray-900">{order.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Total Amount</p>
                                        <p className="text-sm font-medium text-gray-900">₹ {order.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">Order Status</p>
                                        <span className={`text-sm font-medium px-2 py-1 rounded-lg
                                            ${order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : ''}
                                            ${order.status === 'delivered' ? 'bg-green-200 text-green-800' : ''}
                                            ${order.status === 'cancelled' ? 'bg-red-200 text-red-800' : ''}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-5">
                                {order.cartItems.map((item, i) => (
                                    <div key={i} className="flex flex-col md:flex-row border-b last:border-0 py-5">
                                        {/* Product Image */}
                                        <img className="h-40 w-40 rounded-lg border object-contain" src={item.productImageUrl} alt={item.title} />

                                        {/* Product Details */}
                                        <div className="ml-5 flex flex-col justify-between flex-1">
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                                                <p className="mt-1 text-sm font-medium text-gray-500">{item.category}</p>
                                            </div>
                                            <p className="mt-2 text-sm font-medium text-gray-500">x {item.quantity}</p>
                                        </div>

                                        {/* Price */}
                                        <div className="ml-auto flex flex-col items-end justify-between">
                                            <p className="text-right text-sm font-bold text-gray-900">₹ {item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;

