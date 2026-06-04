import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Public folder/Navbar';
import Login from './Public folder/Login';
import Dashboard from './Pages/Dashboard';
import Categorys from './Component/Catagory/Catagories';
import Stock from './Pages/Stock';
import Product from './Component/Dashboard/Product/Product';
import Productitem from './Component/Prod/Productitem';
import Footer from './Public folder/Footer';
import ContactFAQ from './Component/Homescreen/FAQ';
import Mainauth from './Component/Auth/Mainauth';
import UserLogin from './Component/Auth/UserLogin';
import AdminOrders from './Component/Dashboard/Adminorderhandle/AdminOrders';
import UserOrders from './Component/Dashboard/Adminorderhandle/UserOrders';
import UserNavbar from './Component/Userdashboard/UserNavbar';
import Userrating from './Component/Dashboard/Ratingcontrol/Userrating';
import Expenserecord from './Component/Dashboard/Expense/Expenserecord';
import Catagories from './Component/Catagory/Catagories';
import Maincollection from './Pages/Maincollection';
import SavedProduct from './Component/Prod/Savedproduct';
import UserProfile from './Component/Dashboard/UserProfilee/UserProfile';
import TermsConditions from './Public folder/TermsConditions';
import Sale from './Pages/Sale';
import Clothsale from './Component/Sale/Subsale/Clothsale';
import Watchessale from './Component/Sale/Subsale/Watchessale';
import Slyper from './Component/Sale/Subsale/Slyper';
import Kitchen from './Component/Sale/Subsale/Kitchen';
import Makeup from './Component/Sale/Subsale/Makeup';
import Hoddies from './Component/Sale/Catagory/Hoddies';
import Screenprotector from './Component/Sale/Catagory/Screenprotector';
import Microphones from './Component/Sale/Catagory/Microphones';
import Productpage from './Component/Sale/AdminProductadd/Productpage';
import MobileCategory from './Component/Sale/Catagory/MobileCategory';
import Jewellery from './Component/Sale/Catagory/Jewellery';
import Allcategory from './Component/Sale/Catagory/Allcategory';
import Blog from './Component/Blogs/Blog';
import BlogDetail from './Component/Blogs/BlogDetail';
import Dash from './Pages/Dash';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboards" element={<Dashboard />} />
          <Route path="/Categorys" element={<Categorys />} />
          <Route path="/product" element={<Product />} />
          <Route path="/prod/:id" element={<Productitem />} />
          <Route path="/prod" element={<Stock />} />
          <Route path="/FAQ" element={<ContactFAQ />} />
          <Route path="/mainauth" element={<Mainauth />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/adminorder" element={<AdminOrders />} />
          <Route path="/userorders" element={<UserOrders />} />
          <Route path="/usernavbar" element={<UserNavbar />} />
          <Route path="/Userrating" element={<Userrating />} />
          <Route path="/expenserecord" element={<Expenserecord />} />
          <Route path="/catagory" element={<Catagories />} />
          <Route path="/collect" element={<Maincollection />} />
          <Route path="/save" element={<SavedProduct />} />
          <Route path="/userprof" element={<UserProfile />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/product/sale1" element={<Clothsale />} />
          <Route path="/product/sale2" element={<Watchessale />} />
          <Route path="/product/sale3" element={<Slyper />} />
          <Route path="/product/sale4" element={<Kitchen />} />
          <Route path="/product/sale5" element={<Makeup />} />
          <Route path="/hoddies" element={<Hoddies />} />
          <Route path="/screen" element={<Screenprotector />} />
          <Route path="/microphones" element={<Microphones />} />
          <Route path="/productpage" element={<Productpage />} />
          <Route path="/mob" element={<MobileCategory />} />
          <Route path="/jew" element={<Jewellery />} />
          <Route path="/allcat" element={<Allcategory />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/dash" element={<Dash />} />
        </Routes>
        <Footer />
      </div>

    </Router>
  );
}

export default App;