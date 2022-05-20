import { Routes, Route } from "react-router-dom";

//* Route Component
import Layout from "./routes/Layout";
import RequireAuth from "./routes/RequireAuth";
import PersistLogin from './routes/PersistLogin';

//* Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilPage from "./pages/ProfilPage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Unauthorized from "./pages/Unauthorized";

//*Components
import LoginForm from "./components/Form/Auth/LoginForm";
import SignupForm from "./components/Form/Auth/SignupForm";
import ForgotForm from "./components/Form/Auth/ForgotForm";
import ForgotModifyForm from "./components/Form/Auth/ForgotModifyForm";
import Account from "./components/Form/Account/Account";
import Profil from "./components/Form/Account/Profil";



function App() {
  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>

        {/* Public routes */}

        <Route  element={ <AuthPage /> }>
          <Route path='login' element={ <LoginForm /> }/>
          <Route path='signup' element={ <SignupForm /> }/>
          <Route path='forgot' element={ <ForgotForm /> }/>
          <Route path='modify' element={ <ForgotModifyForm /> }/>
          <Route path='unauthorized' element={ <Unauthorized /> }/>
        </Route>

        
        <Route element={ <PersistLogin /> }>
          
          {/* Protected routes */}
          <Route element={ <RequireAuth allowedRoles={ ['user', 'moderator'] }/> }>
            <Route path='/' element={ <HomePage /> }/>
            <Route path='/'element={ <ProfilPage /> }>
                <Route path='account' element={ <Account /> }/>
                <Route path='profil' element={ <Profil /> }/>
            </Route>
            <Route path='post/:postid' element={ <PostPage /> }/>
            <Route path='user/:userid' element={ <UserPage /> }/>
          </Route>

        </Route>


      </Route>
    </Routes>
  );
}
export default App;
