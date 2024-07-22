import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Settings from "./pages/Settings";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import UpdateListing from "./pages/UpdateListing";
import OnlyAdminPrivateRoute from "./components/OnlyAdminRoute";
import Dashboard  from "./pages/Dashboard";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path='/search' element={<Search/>} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/create-listing" element={<CreateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
