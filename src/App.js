import { Routes, Route } from "react-router-dom";

//* Route Component
import Layout from "./helpers/Layout";
import RequireAuth from "./components/RequireAuth";

//* Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage";
import Unauthorized from "./pages/Unauthorized";

//*Components
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import ForgotForm from "./components/Auth/ForgotForm";
import ForgotModifyForm from "./components/Auth/ForgotModifyForm";
import Account from "./components/Account/Account";
import Profil from "./components/Account/Profil";



function App() {
  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>

        {/* Public routes */}
        <Route path='/auth' element={ <AuthPage /> }>
          <Route path='login' element={<LoginForm />} />
          <Route path='signup' element={<SignupForm />} />
          <Route path='forgot' element={<ForgotForm />} />
          <Route path='modify' element={<ForgotModifyForm />} />
          <Route path='unauthorized' element={ <Unauthorized /> } />
        </Route>

        {/* Protected routes */}
        <Route element={<RequireAuth allowedRoles={ ['user', 'moderator'] }/> } >
          <Route path='/' element={ <HomePage /> }/>
            <Route path='profil' element={ <ProfilPage /> }>
              <Route path='account' element={ <Account /> } />
              <Route path='edit' element={ <Profil /> } />
            </Route>
        </Route>


      </Route>
    </Routes>
  );
}
export default App;
