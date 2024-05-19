import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css';
// import Login from './components/login/Login';
// import Signup from './components/signup/Signup';
import RequireUser from './components/RequireUser';
import User from './pages/user/User';
import AllUser from './pages/allUser/AllUser';
import IsUserLoggedIn from './components/IsUserLoggedIn';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
	return (
		<div className="App">

			<Routes>

				<Route element={<RequireUser />}>

					<Route path='/' element={<Home />}>
						<Route index element={<Navigate to="user" />} />
						<Route path='user' element={<User />} />
						<Route path='allUser' element={<AllUser />} />
					</Route>

				</Route>

				<Route element={<IsUserLoggedIn />}>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
				</Route>

			</Routes>
		</div>
	);
}

export default App;