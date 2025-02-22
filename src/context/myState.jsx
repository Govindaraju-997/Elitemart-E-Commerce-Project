
// import { useEffect, useState } from 'react';
// import myContext from './myContext';
// import { collection, deleteDoc, getDocs, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
// import { fireDB } from '../firebase/Firebase';

// function MyState({ children }) {
//     // Loading State 
//     const [loading, setLoading] = useState(false);


//     // User State
//     const [getAllProduct, setGetAllProduct] = useState([]);


//     //  GET All Product Function

//     const getAllProductFunction = async () => {
//         setLoading(true);
//         try {
//             const q = query(
//                 collection(fireDB, "products"),
//                 orderBy('time')
//             );
//             const data = onSnapshot(q, (QuerySnapshot) => {
//                 let productArray = [];
//                 QuerySnapshot.forEach((doc) => {
//                     productArray.push({ ...doc.data(), id: doc.id });
//                 });
//                 setGetAllProduct(productArray);
//                 setLoading(false);
//             });
//             return () => data;
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     }

//     // Order State 
//     const [getAllOrder, setGetAllOrder] = useState([]);

//     // GET All Order Function

//     const getAllOrderFunction = async () => {
//         setLoading(true)
//         try {
//             const result = await getDocs(collection(fireDB, "order"));

//             const ordersArray = [];
//             result.forEach((doc) => {
//                 ordersArray.push(doc.data());
//                 setLoading(false)
//             });
//             setGetAllOrder(ordersArray);
//             console.log(ordersArray)
//             setLoading(false);
//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//         }
//     }


//     // User State 
//     const [getAllUser, setGetAllUser] = useState([]);

//     // GET All Users Function
//     const getAllUserFunction = async () => {
//         setLoading(true);
//         try {
//             const q = query(collection(fireDB, "user"), orderBy("time"));
//             const data = onSnapshot(q, (QuerySnapshot) => {
//                 let userArray = [];
//                 QuerySnapshot.forEach((doc) => {
//                     userArray.push({ ...doc.data(), id: doc.id });
//                 })

//                 console.log("Fetched Users:", userArray);
//                 setGetAllUser(userArray);
//                 console.log(getAllUser)
//                 setLoading(false);
//             });
//             return () => data;
//         } catch (error) {
//             console.log("Error fetching users:", error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getAllProductFunction();
//         getAllOrderFunction();
//         getAllUserFunction();
//     }, []);

//     // Delete oder Function
//     const deleteProduct = async (id) => {
//         setLoading(true)
//         try {
//             await deleteDoc(doc(fireDB, 'order', id))
//             toast.success('Order Deleted successfully')
//             getAllOrderFunction();
//             setLoading(false)
//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//         }
//     }

//     // const deleteProduct = async (item) => {
//     //     setLoading(true)
//     //     try {
//     //         await deleteDoc(doc(fireDB, 'products', item.id))
//     //         toast.success('Product Deleted successfully')
//     //         getAllOrderFunction();
//     //         setLoading(false)
//     //     } catch (error) {
//     //         console.log(error)
//     //         setLoading(false)
//     //     }
//     // }


//     return (
//         <myContext.Provider value={{
//             loading,
//             setLoading,
//             getAllProduct,
//             getAllProductFunction,
//             getAllOrderFunction,
//             getAllOrder,
//             getAllUser,
//             getAllUserFunction,
//             deleteProduct
//         }}>
//             {children}
//         </myContext.Provider>
//     )
// }

// export default MyState



import { useEffect, useState } from 'react';
import myContext from './myContext';
import { collection, deleteDoc, getDocs, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/Firebase';
import toast from "react-hot-toast";

function MyState({ children }) {
    const [loading, setLoading] = useState(false);
    const [getAllProduct, setGetAllProduct] = useState([]);
    const [getAllOrder, setGetAllOrder] = useState([]);
    const [getAllUser, setGetAllUser] = useState([]);

    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "products"), orderBy('time'));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const result = await getDocs(collection(fireDB, "order"));
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllOrder(ordersArray);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getAllUserFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "user"), orderBy("time"));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => data();
        } catch (error) {
            console.log("Error fetching users:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
        getAllUserFunction();
    }, []);

    const deleteOrder = async (orderId) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'order', orderId));
            toast.success('Order Deleted successfully');
            getAllOrderFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // const [order, setOrder] = useState([]);
    // // ✅ Fetch Order Data
    // const getOrderData = async () => {
    //     setLoading(true)
    //     try {
    //         const result = await getDocs(collection(fireDB, "order"));

    //         const ordersArray = [];
    //         result.forEach((doc) => {
    //             ordersArray.push(doc.data());
    //             setLoading(false)
    //         });
    //         setOrder(ordersArray);
    //         // console.log(ordersArray)
    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }
    // }


    // useEffect(() => {
    //     getOrderData()

    // }, []);

    return (
        <myContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            getAllOrderFunction,
            getAllOrder,
            getAllUser,
            getAllUserFunction,
            deleteOrder,
        }}>
            {children}
        </myContext.Provider>
    )
}

export default MyState;
