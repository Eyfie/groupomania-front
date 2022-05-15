import { Routes, Route } from "react-router-dom";

//* Route Component
import Layout from "./helpers/Layout";
import RequireAuth from "./components/RequireAuth";

//* Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Unauthorized from "./pages/Unauthorized";

//*Components
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import ForgotForm from "./components/Auth/ForgotForm";
import ForgotModifyForm from "./components/Auth/ForgotModifyForm";



function App() {
  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>

        {/* Public routes */}
        <Route path='/' element={ <AuthPage /> }>
          <Route path='login' element={<LoginForm />} />
          <Route path='signup' element={<SignupForm />} />
          <Route path='forgot' element={<ForgotForm />} />
          <Route path='modify' element={<ForgotModifyForm />} />
          <Route path='unauthorized' element={ <Unauthorized /> } />
        </Route>

        {/* Protected routes */}
        <Route element={<RequireAuth allowedRoles={ ['user', 'moderator'] }/> } >
          <Route path='/home' element={ <HomePage /> }/>
        </Route>


      </Route>
    </Routes>
  );
}
export default App;
