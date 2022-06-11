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
import Login from "./components/Form/Auth/Login";
import Signup from "./components/Form/Auth/Signup";
import Forgot from "./components/Form/Auth/Forgot";
import Modify from "./components/Form/Auth/Modify";
import Account from "./components/Form/Account/Account";
import Profil from "./components/Form/Account/Profil";



function App() {

  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>

        {/* Public routes */}

        <Route  element={ <AuthPage /> }>
          <Route path='login' element={ <Login /> }/>
          <Route path='signup' element={ <Signup /> }/>
          <Route path='forgot' element={ <Forgot /> }/>
          <Route path='modify' element={ <Modify /> }/>
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
              <Route path='post'>
                <Route path=':postId' element={ <PostPage /> }/>
              </Route>
              <Route path='user'>
                <Route path=':userId' element={ <UserPage /> }/>
              </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
