/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import MyContext from './myContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/Firebase';

function MyState({ children }) {
    // Loading State 
    const [loading, setLoading] = useState(false);

    // User State
    const [getAllProduct, setGetAllProduct] = useState([]);

   
    //  GET All Product Function
    
    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Order State 
    const [getAllOrder, setGetAllOrder] = useState([]);


        // GET All Order Function
     
    // const getAllOrderFunction = async () => {
    //     setLoading(true);
    //     try {
    //         const q = query(collection(fireDB, "order"), orderBy("time"));
    //         const data = onSnapshot(q, (QuerySnapshot) => {
    //             let orderArray = [];
    //             QuerySnapshot.forEach((doc) => {
    //                 orderArray.push({ ...doc.data(), id: doc.id });
    //             });
    
    //             console.log("Fetched Orders:", orderArray); // ✅ Debugging log
    //             setGetAllOrder(orderArray);
    //             setLoading(false);
    //         });
    //         return () => data;
    //     } catch (error) {
    //         console.log("Error fetching orders:", error);
    //         setLoading(false);
    //     }
    // };
    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(collection(fireDB, "order"), orderBy("time"));
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
    
                console.log("✅ Orders fetched from Firestore:", orderArray); // Debugging
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log("❌ Error fetching orders:", error);
            setLoading(false);
        }
    };
    

    // User State 
const [getAllUser, setGetAllUser] = useState([]);

// GET All Users Function
const getAllUserFunction = async () => {
    setLoading(true);
    try {
        const q = query(collection(fireDB, "users"), orderBy("time"));
        const data = onSnapshot(q, (QuerySnapshot) => {
            let userArray = [];
            QuerySnapshot.forEach((doc) => {
                userArray.push({ ...doc.data(), id: doc.id });
            });

            console.log("Fetched Users:", userArray); // ✅ Debugging log
            setGetAllUser(userArray);
            setLoading(false);
        });
        return () => data;
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
    return (
        <MyContext.Provider value={{
            loading,
            setLoading,
            getAllProduct,
            getAllProductFunction,
            getAllOrderFunction ,
            getAllOrder,
            getAllUser,
            getAllUserFunction
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState










