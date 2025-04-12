
// import './App.css';
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route, Redirect, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminDashboard from "./pages/admin/adminDashboard";
import Login from "./pages/login";
import UserSearchTrain from './pages/user/userSearchTrain';
import Register from "./pages/register";
import SearchTrain from "./pages/searchtrain";
import ShowAllTrains from "./pages/admin/showallTrains";
import ShowBookings from "./pages/admin/showBookings";
import ShowStations from "./pages/admin/showStations";
import ShowSeatCount from "./pages/admin/showSeatCount";
import ShowUserDetails from "./pages/admin/showUserDetails";
import MyBookings from './pages/user/myBookings';
import MyProfile from './pages/user/myProfile';
import MyWallet from './pages/user/myWallet';
import ResetPassword from './pages/user/checkTrainDetails';
import ContactUs from './pages/contactUs';
import Error404 from "./pages/error404";
import AdminProfile from './pages/admin/adminProfile'
import AddTrain from "./pages/admin/addTrain";
import AddTrainType from "./pages/admin/addTrainType";
import AddStation from "./pages/admin/addStation";
import AddCoach from "./pages/admin/addCoach";
import AddRoute from "./pages/admin/addRoute";
import AddSeatCount from "./pages/admin/addSeatCount";
import AddSchedule from "./pages/admin/addSchedule";
import UpdateTrain from "./pages/admin/updateTrain";
import UpdateSeatCount from "./pages/admin/updateSeatCount";
import UpdateFarePerKm from "./pages/admin/updateFarePerKm";
import UpdateCoachFare from "./pages/admin/updateCoachFare";
import UpdateSpecialCharges from "./pages/admin/updateSpecialCharges";
import UpdateTrainTypeCharges from "./pages/admin/updateTrainTypeCharges";
import DeleteSeatCount from "./pages/admin/deleteSeatCount";
import DeleteRoute from "./pages/admin/deleteRoute";
import DeleteTrainRoute from "./pages/admin/deleteTrainRoute";
import TrainFound from './pages/user/trainFound';
import PassengerForm from './pages/user/passengerForm';
import ConfirmBookingDetails from './pages/user/confirmBookingDetails';
import ShowTrains from "./pages/showTrains";
import SearchTrainByNo from "./pages/searchTrainByNo";
import SearchedTrainDetails from "./pages/searchTrainDetails";
import Contactus from "./pages/admin/contactUs";
import ForgotPassword from "./pages/forgotPassword";
import OtpConfirm from "./pages/otpConfirm";
import ChangePassword from "./pages/changePassword";
import MyTicket from './pages/user/myTicket';
import Error403 from "./pages/error403";
import React from 'react'
import CheckTrainDetails from './pages/user/checkTrainDetails';
import DeleteSchedule from "./pages/admin/deleteSchedule";
import AboutUs from "./pages/aboutUs";
import Contact from "./pages/contact"
import Faq from "./pages/faq";


function App() {


	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />}></Route>
				<Route path='/' element={<SearchTrain />}></Route>
				<Route path='/show-trains' element={<ShowTrains />}></Route>
				<Route path='/search-train-details' element={<SearchTrainByNo />}></Route>
				<Route path='/train-search-results' element={<SearchedTrainDetails />}></Route>
				<Route path='/forgot-password' element={<ForgotPassword />}></Route>
				<Route path='/otp-confirm' element={<OtpConfirm />}></Route>
				<Route path='/change-password' element={<ChangePassword />}></Route>
				<Route path='/admin-dashboard' element={<AdminDashboard />}></Route>
				<Route path='/admin/contact-us' element={<Contactus />}></Route>
				<Route path='/admin/show-all-trains' element={<ShowAllTrains />}></Route>
				<Route path="/admin/showbookings" element={<ShowBookings />}></Route>
				<Route path='/admin/all-stations' element={<ShowStations />}></Route>
				<Route path='/admin/seat-count' element={<ShowSeatCount />}></Route>
				<Route path='/admin/userdetails' element={<ShowUserDetails />}></Route>
				<Route path='/admin/my-profile' element={<AdminProfile />}></Route>
				<Route path='/admin/add-train' element={<AddTrain />}></Route>
				<Route path='/admin/add-train-type' element={<AddTrainType />}></Route>
				<Route path='/admin/add-station' element={<AddStation />}></Route>
				<Route path='/admin/add-coach' element={<AddCoach />}></Route>
				<Route path='/admin/add-route' element={<AddRoute />}></Route>
				<Route path='/admin/add-seatcount' element={<AddSeatCount />}></Route>
				<Route path='/admin/add-schedule' element={<AddSchedule />}></Route>
				<Route path='/admin/update-train' element={<UpdateTrain />}></Route>
				<Route path='/admin/update-seat-count' element={<UpdateSeatCount />}></Route>
				<Route path='/admin/update-fare-per-km' element={<UpdateFarePerKm />}></Route>
				<Route path='/admin/update-coach-fare' element={<UpdateCoachFare />}></Route>
				<Route path='/admin/update-special-charges' element={<UpdateSpecialCharges />}></Route>
				<Route path='/admin/update-traintype-charges' element={<UpdateTrainTypeCharges />}></Route>
				<Route path='/admin/delete-seatcount' element={<DeleteSeatCount />}></Route>
				<Route path='/admin/delete-route' element={<DeleteRoute />}></Route>
				<Route path='/admin/delete-train-route' element={<DeleteTrainRoute />}></Route>
				<Route path='/error403' element={<Error403 />}></Route>
				<Route path='/admin/delete-schedule' element={<DeleteSchedule />}></Route>
				<Route path='/about-us' element={<AboutUs />}></Route>
				<Route path='/contact' element={<Contact />}></Route>
				<Route path='/faq' element={<Faq />}></Route>

				<Route path='/user' element={<Navigate to="/user/search-train" />} />
				<Route path='/user'>
					<Route path='search-train' element={<UserSearchTrain />} />
					<Route path='my-booking' element={<MyBookings />} />
					<Route path='my-profile' element={<MyProfile />} />
					<Route path='my-wallet' element={<MyWallet />} />
					<Route path='contact-us' element={<ContactUs />} />
					<Route path='reset-password' element={<ResetPassword />} />
					<Route path='train-found' element={<TrainFound />} />
					<Route path='passenger-form' element={<PassengerForm />} />
					<Route path="confirm-booking-details" element={<ConfirmBookingDetails />} />
					<Route path="ticket" element={<MyTicket />} />
					<Route path="train-details" element={<CheckTrainDetails />} />
				</Route>



				<Route path="*" element={<Error404 />} />
			</Routes>

			{/* this container is used to show toast messages */}
			<ToastContainer position='top-center' autoClose={1200} theme="dark" />
		</BrowserRouter>
	);
}

export default App;
