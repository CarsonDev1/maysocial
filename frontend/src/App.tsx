import { BrowserRouter, Routes, Route } from 'react-router';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import { Toaster } from 'sonner';
function App() {
	return (
		<>
			<Toaster />
			<BrowserRouter>
				<Routes>
					{/* public routes */}
					<Route path='/signup' element={<SignUpPage />} />
					<Route path='/login' element={<SignInPage />} />

					{/* protected routes */}
					<Route path='/' element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
