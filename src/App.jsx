import { ThemeProvider } from "./ThemeContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Events from "./components/Events";
import Members from "./components/Members";
import Life from "./components/Life";
import Footer from "./components/Footer";
import EventDetails from "./components/Eventdetails";
import Popup from "./components/Popup";
import { eventsData } from "./data/events";

// 🔹 Layout to show Navbar/Footer only on Home
function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {isHomePage && <Navbar />}
      {children}
      {isHomePage && <Footer />}
    </>
  );
}

// 🔹 Popup Handler (Hackvotrix popup logic)
function PopupHandler() {
  const [showPopup, setShowPopup] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Find Hackvotrix event
  const hackvotrixEvent = eventsData.find((event) =>
    event.title.toLowerCase().includes("hackvotrix")
  );

  const goToHackvotrix = () => {
    if (hackvotrixEvent) {
      setShowPopup(false);
      navigate(`/event/${hackvotrixEvent.id}`, {
        state: { event: hackvotrixEvent },
      });
    }
  };

  // Show popup ONLY on home page
  if (location.pathname !== "/") return null;

  return (
    <Popup
      isOpen={showPopup}
      onClose={() => setShowPopup(false)}
      onClick={goToHackvotrix}
      image="/poster/HACKVOTRIX-poster.png" // ✅ Make sure 'Poster' folder is capitalized
    />
  );
}

// 🔹 Main App Component
function App() {
  return (
    <ThemeProvider>
      <Router>
        <PopupHandler />
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
                  <Members /> {/* ✅ Added Members here */}
                  <Life />
                </>
              }
            />

            {/* Event Details Page */}
            <Route path="/event/:id" element={<EventDetails />} />

            {/* Optional: Separate Members Route */}
            <Route path="/members" element={<Members />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
