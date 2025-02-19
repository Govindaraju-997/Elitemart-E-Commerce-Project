
import { useState, useEffect } from "react";
import { FaUser, FaSearch, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("users"));
    setUser(user);
  }, []);

  // // Logout function
  const logout = () => {
    localStorage.removeItem("users");
    setUser(null);
    navigate("/login");
  };


  const cartItems = useSelector((state) => state.cart);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/allproduct?search=${encodeURIComponent(searchTerm)}`);
    }
  };


  return (
    <nav className="bg-white shadow-md p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section */}
        <div className="flex gap-2">
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(true)}>
            ☰
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-900">
            EliteMart
          </Link>
        </div>

        {/* Navigation Menu for Laptops */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-semibold">
          <li className="cursor-pointer hover:text-rose-900"><Link to="/">Home</Link></li>
          <li className="cursor-pointer hover:text-rose-900"><Link to="/about">About</Link></li>
          <li className="cursor-pointer hover:text-rose-900"><Link to="/contact">Contact</Link></li>
          <li className="cursor-pointer hover:text-rose-900"><Link to="/allproduct">All Products</Link></li>
        </ul>



        {/* Search Bar (Hidden on Mobile) */}

        <form onSubmit={handleSearch} className="md:flex items-center border rounded-lg px-4 py-1 w-1/3">
          <span className="hidden md:inline">
            <FaSearch className="text-gray-500 mr-2" />
          </span>
          <input
            type="text"
            placeholder="Search for Products, Brands and More..."
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        {/* Icons */}
        <div className="flex items-center space-x-4">


          {/* Cart Icons */}

          <Link to="/cart" className="relative">
            <TiShoppingCart className="text-gray-700 cursor-pointer hover:text-slate-600" size={30} />
            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-[10px] p-1 rounded-full font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Profile Section */}
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <span className="hidden md:inline">{user?.name}</span>
                <FaUser className="text-gray-700 hover:text-slate-600" size={20} />
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-800">
                Login/Signup
              </Link>
            )}

            {/* Dropdown Menu */}
            {isOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                {user?.role === "user" && (
                  <>
                    <Link to="/user-dashboard" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                    <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100">Wishlist</Link>
                  </>
                )}
                {user?.role === "admin" && (
                  <Link to="/admin-dashboard" className="block px-4 py-2 hover:bg-gray-100">Admin Dashboard</Link>
                )}
                <Link to="/edit-profile" className="block px-4 py-2 hover:bg-gray-100">Edit Profile</Link>
                <span onClick={logout} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <TbLogout2 /> Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-blue-900">EliteMart</h2>
          <button onClick={() => setMenuOpen(false)}>
            <IoMdClose size={24} className="text-gray-700" />
          </button>
        </div>

        <ul className="flex flex-col space-y-4 px-4 text-gray-700 font-semibold">
          <li className="cursor-pointer hover:text-rose-900"><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li className="cursor-pointer hover:text-rose-900"><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li className="cursor-pointer hover:text-rose-900"><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          <li className="cursor-pointer hover:text-rose-900"><Link to="/allproduct" onClick={() => setMenuOpen(false)}>All Products</Link></li>
        </ul>
      </div>

      {/* Overlay for Sidebar (Mobile Only) */}
      {
        menuOpen && (
          <div className="md:hidden fixed inset-0 bg-black opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>
        )
      }
    </nav >
  );
};

export default NavigationBar;


