
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";
import { auth, fireDB } from "../../firebase/Firebase";
import Loader from "../../components/loader/Loader";
import { collection, getDocs, query, where, setDoc, doc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { loading, setLoading } = useContext(myContext);
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    // Email/Password Login Function
    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            const q = query(collection(fireDB, "user"), where("uid", "==", users?.user?.uid));
            const querySnapshot = await getDocs(q);

            let user = null;
            querySnapshot.forEach((doc) => (user = doc.data()));

            if (user) {
                localStorage.setItem("users", JSON.stringify(user));
                toast.success("Login Successfully");
                navigate(user.role === "admin" ? "/admin-dashboard" : "/");
            } else {
                toast.error("User data not found!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Login Failed");
        } finally {
            setLoading(false);
        }
    };

    // Google Login Function
    const handleGoogleLogin = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user exists in Firestore
            const q = query(collection(fireDB, "user"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);

            let existingUser = null;
            querySnapshot.forEach((doc) => (existingUser = doc.data()));

            if (!existingUser) {
                const newUser = {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: "user"
                };
                await setDoc(doc(fireDB, "user", user.uid), newUser);
                localStorage.setItem("users", JSON.stringify(newUser));
            } else {
                localStorage.setItem("users", JSON.stringify(existingUser));
            }

            toast.success("Login Successful");
            navigate("/");
        } catch (error) {
            console.error(error);
            toast.error("Google Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}

            <div className="login_Form bg-neutral-100 px-8 py-6 border border-slate-200 rounded-xl shadow-md">
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-blue-950 '>LOGIN</h2>
                </div>

                {/* Email Input */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userLogin.email}
                        onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-96 rounded-md  placeholder-slate-400'
                    />
                </div>

                {/* Password Input */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userLogin.password}
                        onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                        className='bg-gray-100 border border-gray-300 px-2 py-2 w-96 rounded-md  placeholder-slate-400'
                    />
                </div>

                {/* Login Button */}
                <div className="mb-3">
                    <button
                        onClick={userLoginFunction}
                        className='bg-slate-800 hover:bg-slate-700 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                {/* Google Login Button */}
                <div className="mb-5 flex justify-center">
                    <button
                        onClick={handleGoogleLogin}
                        className='flex items-center justify-center gap-2 border border-slate-300 hover:bg-stone-300 w-full text-black text-center py-2 font-bold rounded-md'
                    >
                        <FcGoogle className="text-xl" /> Login with Google
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>
                        Don't Have an account?{" "}
                        <Link className='text-pink-500 font-bold' to={'/signup'}>Signup</Link>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Login;
