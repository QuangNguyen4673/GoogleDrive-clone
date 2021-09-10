import SignUp from "./components/authentication/SignUp";
import About from "./components/authentication/About";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LogIn from "./components/authentication/LogIn";
import Profile from "./components/authentication/Profile";
import PrivateRoute from "./components/authentication/PrivateRoute";
import ForgotPassword from "./components/authentication/ForgotPassword";
import UpdateProfile from "./components/authentication/UpdateProfile";
import DashBoard from "./components/google-drive/DashBoard";
function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">DashBoard</Link>
        </li>
        <li>
          <Link to="/user">Profile</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={DashBoard} />
          <PrivateRoute exact path="/folder/:folderId" component={DashBoard} />

          {/* profile */}
          <PrivateRoute path="/user" component={Profile} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />

          {/* auth */}
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/about" component={About} />
          <Route path="/forgotpassword" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
