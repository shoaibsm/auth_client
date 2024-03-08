import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css';
// import Home from './pages/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import RequireUser from './components/RequireUser';
import User from './pages/user/User';
import AllUser from './pages/allUser/AllUser';

function App() {
	return (
		<div className="App">

			<Routes>

				{/* Show Signup page initially */}
				<Route path="/" element={<Signup />} />

				{/* Routes for Login and Signup */}
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />

				<Route element={<RequireUser />}>

					<Route path='/user/:userId' element={<User />} />
					<Route path='/allUser' element={<AllUser />} />

				</Route>

				{/* Fallback route for unknown paths */}
				<Route path="/*" element={<Navigate to="/signup" replace />} />

			</Routes>
		</div>
	);
}

export default App;