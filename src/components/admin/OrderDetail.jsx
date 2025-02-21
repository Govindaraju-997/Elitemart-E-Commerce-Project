
import { useContext } from "react";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";

const OrderDetail = () => {
    const context = useContext(myContext);
    const {loading, getAllOrder, deleteOrder } = context;

    return (
        <div>
            <div className="py-5">
                <h1 className="text-xl text-blue-800 font-bold">All Orders</h1>
            </div>
             {/* Loading  */}
             <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <tbody>
                        <tr>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">S.No.</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Order Id</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Image</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Title</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Category</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Price</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Quantity</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Total Price</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Status</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Name</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Address</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Pincode</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Phone Number</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Email</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Date</th>
                            <th className="h-12 px-6 text-md border-l border-pink-100 text-slate-700 bg-slate-100 font-bold">Action</th>
                        </tr>

                        {getAllOrder.map((order, orderIndex) => (
                            order.cartItems.map((item, itemIndex) => (
                                <tr key={`${order.id}-${itemIndex}`} className="text-pink-300">
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{itemIndex + 1}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{order.id}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">
                                        <img src={item.productImageUrl} alt="Product" className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{item.title}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{item.category}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">₹{item.price}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{item.quantity}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">₹{item.price * item.quantity}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-green-600">{order.status}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{order.addressInfo.name}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{order.addressInfo.address}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{order.addressInfo.pincode}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{order.addressInfo.mobileNumber}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{order.email}</td>
                                    <td className="h-12 px-6 border-t border-l border-pink-100 text-slate-500">{order.date}</td>
                                    <td onClick={() => deleteOrder(order.id)} className="h-12 px-6 border-t border-l border-pink-100 text-red-500 cursor-pointer">Delete</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDetail;
