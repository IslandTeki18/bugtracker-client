import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// Header and Footer Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// import screens
import LoginScreen from "./screens/loginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LandingScreen from "./screens/landingScreen/LandingScreen";
import ProfileScreen from "./screens/profileScreen/ProfileScreen";
import BugDetailsScreen from "./screens/bugDetailsScreen/BugDetailsScreen";
import BugEditScreen from "./screens/bugEditScreen/BugEditScreen";
import ProfileSettingsScreen from "./screens/profileSettingScreen/ProfileSettingsScreen";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    return (
      <Router>
        <main className="bg-dark">
          <Route exact path="/" component={LandingScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
        </main>
      </Router>
    );
  }

  return (
    <Router>
      <Header />
      <main className="bg-dark">
        <Route path="/register" component={RegisterScreen} />
        <Route exact path="/bug/:id" component={BugDetailsScreen} />
        <Route path="/bug/:id/edit" component={BugEditScreen} />
        <Route exact path="/search/:keyword" component={ProfileScreen} />
        <Route
          exact
          path="/search/:keyword/page/:pageNumber"
          component={ProfileScreen}
        />
        <Route exact path="/page/:pageNumber" component={ProfileScreen} />
        <Route
          exact
          path="/profile/settings"
          component={ProfileSettingsScreen}
        />
        <Route exact path="/profile" component={ProfileScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
