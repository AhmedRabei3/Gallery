
import {
  Navigate,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ImageComp,
  Header,
  Add,
  ImageDetails,
  NotFound
} from "./component";
import { useSelector } from "react-redux";

function App() {
  const {user} = useSelector(state =>state.auth)
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!user ? <LoginPage />: <Navigate to="/"/>} />
          <Route path="/register" element={!user ? <RegisterPage />: <Navigate to="/"/>} />
          <Route path="/profile/:id" element={user ? <ProfilePage />: <Navigate to="/login"/>} />
          <Route path="/image/add" element={user ?  <Add />: <Navigate to="/login"/>} />
          <Route path="/image/details/:id" element={<ImageDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
