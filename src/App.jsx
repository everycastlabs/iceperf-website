import { useEffect } from 'react';
import { Routes, useLocation, Route } from 'react-router-dom';
import 'preline/preline';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
// import { Coverpage } from './Pages/Coverpage';
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { Results } from './Pages/Results';
import { Provider } from './Pages/Provider';
import { Login } from './Pages/Login';
import { Settings } from './Pages/Settings';
import { Cookies } from './Pages/Cookies';
import { PrivacyPolicy } from './Pages/Privacy-Policy';
import { Terms } from './Pages/Terms';
import { Pricing } from './Pages/Pricing';
import { PaymentStatus } from './Pages/PaymentStatus';
// add a comment
function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cookies' element={<Cookies />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<Terms />} />

        <Route path='/results' element={<Results />} />
        <Route path='/login' element={<Login />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/payment-status' element={<PaymentStatus />} />
        <Route path='/providers/results' element={<Results select='provider' />} />
        <Route path='/providers/your-network' element={<ProtectedRoute> <Provider isPrivate /> </ProtectedRoute>} />
        <Route path='/providers/:name' element={<Provider />} />
        <Route path='/projects/results' element={<Results select='ossProject' />} />
        <Route path='/projects/:name' element={<Provider isOSSProject />} />
        <Route path='/settings' element={<ProtectedRoute> <Settings /> </ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
