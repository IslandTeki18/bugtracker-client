import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// Header and Footer Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// import screens
import LoginScreen from "./screens/loginScreen/LoginScreen";
import RegisterScreen from "./screens/registerScreen/RegisterScreen";
import LandingScreen from "./screens/landingScreen/LandingScreen";
import ProfileScreen from "./screens/profileScreen/ProfileScreen";
import BugDetailsScreen from "./screens/bugDetailsScreen/BugDetailsScreen";
import BugEditScreen from "./screens/bugEditScreen/BugEditScreen";
import ProfileSettingsScreen from "./screens/profileSettingScreen/ProfileSettingsScreen";
import DemoFooter from "./components/demoFooter/DemoFooter";
import DemoHeader from "./components/demoHeader/DemoHeader";
import AboutUsScreen from "./screens/aboutUsScreen/AboutUsScreen";
import BlogScreen from "./screens/blogScreen/BlogScreen";
import CompanyScreen from "./screens/companyScreen/CompanyScreen";
import ContactScreen from "./screens/contactScreen/ContactScreen";
import ServicesScreen from "./screens/servicesScreen/ServicesScreen";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {}, [userInfo]);
  return (
    <Router>
      {userInfo ? <Header /> : <DemoHeader />}
      <main className={`bg-${userInfo ? "dark" : "light"}`}>
        <Switch>
          <ProtectedRoute exact path="/bug/:id">
            <BugDetailsScreen />
          </ProtectedRoute>
          <ProtectedRoute path="/bug/:id/edit">
            <BugEditScreen />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/settings">
            <ProfileSettingsScreen />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile">
            <ProfileScreen />
          </ProtectedRoute>
          <Route exact path="/" component={LandingScreen} />
          <Route exact path="/about-us" component={AboutUsScreen} />
          <Route exact path="/blog" component={BlogScreen} />
          <Route exact path="/company" component={CompanyScreen} />
          <Route exact path="/contact" component={ContactScreen} />
          <Route exact path="/services" component={ServicesScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
        </Switch>
      </main>
      {userInfo ? <Footer /> : <DemoFooter />}
    </Router>
  );
}

export default App;
