import { BrowserRouter as Router, Route } from "react-router-dom";
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

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    return (
      <Router>
        <DemoHeader />
        <main>
          <Route exact path="/" component={LandingScreen} />
          <Route exact path="/about-us" component={AboutUsScreen} />
          <Route exact path="/blog" component={BlogScreen} />
          <Route exact path="/company" component={CompanyScreen} />
          <Route exact path="/contact" component={ContactScreen} />
          <Route exact path="/services" component={ServicesScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
        </main>
        <DemoFooter />
      </Router>
    );
  }

  return (
    <Router>
      <Header />
      <main className="bg-dark">
        <Route exact path="/bug/:id" component={BugDetailsScreen} />
        <Route path="/bug/:id/edit" component={BugEditScreen} />
        <Route
          path="/profile/settings"
          component={ProfileSettingsScreen}
        />
        <Route exact path="/profile" component={ProfileScreen} />
        <Route
          exact
          path="/search/:keyword/page/:pageNumber"
          component={ProfileScreen}
        />
        <Route exact path="/page/:pageNumber" component={ProfileScreen} />
        <Route exact path="/search/:keyword" component={ProfileScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
