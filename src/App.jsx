import { ThemeProvider } from "./ThemeContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Events from "./components/Events";
import MembersPage from "./components/Members";
import Life from "./components/Life";
import Footer from "./components/Footer";
import EventDetails from "./components/Eventdetails";

// 🔹 Layout to conditionally show Navbar/Footer
function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
      {isHomePage && <Navbar />}
      <div className="w-full overflow-x-hidden">
        {children}
      </div>
      {isHomePage && <Footer />}
    </div>
  );
}

// 🔹 Main App Component
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Events />
                  <Life />
                </>
              }
            />

            {/* Event Details Page */}
            <Route path="/event/:id" element={<EventDetails />} />

            {/* Separate Members Page */}
            <Route path="/members" element={<MembersPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
