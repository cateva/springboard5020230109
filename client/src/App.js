import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import EditProfile from "./pages/editProfile/EditProfile";
import Booking from "./pages/booking/Booking";
import EditBooking from "./pages/booking/editBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/:id" element={<EditBooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
