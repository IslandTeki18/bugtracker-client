import { BrowserRouter as Router, Route } from "react-router-dom";
// Header and Footer Components
import Header from "./app/Header";
import Footer from "./app/Footer";

// import screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BugDetailsScreen from "./screens/BugDetailsScreen";
import BugEditScreen from "./screens/BugEditScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="bg-dark">
        <Route exact path="/" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route exact path="/bug/:id" component={BugDetailsScreen} />
        <Route path="/bug/:id/edit" component={BugEditScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
