import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Events from "./components/Events";
import Members from "./components/Members";
import Life from "./components/Life";
import Footer from "./components/Footer";
import EventDetails from "./components/Eventdetails";

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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
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
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
