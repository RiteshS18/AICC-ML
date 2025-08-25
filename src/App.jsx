import { ThemeProvider } from "./ThemeContext";
import { PopupProvider, usePopup } from "./PopupContext";
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
import MembersPage from "./components/Members";
import Life from "./components/Life";
import Footer from "./components/Footer";
import EventDetails from "./components/Eventdetails";
import Popup from "./components/Popup";
import { eventsData } from "./data/events";

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

// 🔹 Popup Handler (Hackvotrix popup logic)
function PopupHandler() {
  const [showPopup, setShowPopup] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsPopupOpen } = usePopup();

  // Find Hackvotrix event
  const hackvotrixEvent = eventsData.find((event) =>
    event.title.toLowerCase().includes("hackvotrix")
  );

  const goToHackvotrix = () => {
    if (hackvotrixEvent) {
      setShowPopup(false);
      setIsPopupOpen(false);
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
      image="/poster/HACKVOTRIX-poster.webp"
    />
  );
}

// 🔹 Main App Component
function App() {
  return (
    <ThemeProvider>
      <PopupProvider>
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
      </PopupProvider>
    </ThemeProvider>
  );
}

export default App;
