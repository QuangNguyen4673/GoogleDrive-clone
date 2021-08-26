import SignUp from "./components/SignUp";
import About from "./components/About";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LogIn from "./components/LogIn";
import DashBoard from "./components/DashBoard";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateInfo from "./components/UpdateInfo";
function App() {
  return (
    <div>
      <Router>
        <ul>
          <li>
            <Link to="/">Dash Board</Link>
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
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/about" component={About} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/updateinfo" component={UpdateInfo} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
