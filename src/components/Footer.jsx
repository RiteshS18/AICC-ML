import { FaLinkedin, FaInstagram, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { useNavigate } from "react-router-dom";

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/kec-ai-coding-club/',
    icon: <FaLinkedin size={32} />,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/kec_aicc',
    icon: <FaInstagram size={32} />,
  },
  {
    name: 'Email',
    url: 'mailto:kecaicodingclub@gmail.com',
    icon: <FaEnvelope size={30} />,
  }
];

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  // Navigate to Members page
  const goToMembersPage = () => {
    navigate("/members");
  };

  return (
    <footer
      className={`w-full py-12 px-6 md:px-16 relative overflow-hidden transition-colors duration-300
        ${isDark
          ? "bg-gradient-to-b from-gray-900 to-gray-900 text-white"
          : "bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900"}`}
    >
      {/* Top Accent Line */}
      <div className={`absolute top-0 left-0 w-full h-1 
        ${isDark
          ? "bg-gradient-to-r from-blue-400 to-purple-500"
          : "bg-gradient-to-r from-blue-500 to-purple-600"}`}
      ></div>

      {/* Decorative Circles */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full 
        ${isDark ? "bg-blue-400 opacity-10" : "bg-blue-300 opacity-20"}`}
      ></div>
      <div className={`absolute -bottom-10 -left-10 w-40 h-40 rounded-full 
        ${isDark ? "bg-purple-500 opacity-10" : "bg-purple-400 opacity-20"}`}
      ></div>

      {/* Grid Content */}
      <div className="grid md:grid-cols-[350px_450px_400px] gap-8 max-w-[1200px] mx-auto relative z-10">
        {/* Logo & Info */}
        <div>
          <div className="flex items-center mb-3">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-1 rounded-xl shadow-lg">
              <img src="/aicc-logo.webp" alt="AICC Logo" className="h-10 w-10 rounded-lg" />
            </div>
            <h3
              className={`text-2xl lg:text-3xl font-bold font-serif ml-3
                ${isDark
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300"
                  : "text-gray-900"}`}
            >
              AI Coding Club
            </h3>
          </div>

          <div className={`mt-2 flex items-start gap-2 leading-relaxed font-light text-lg 
            ${isDark ? "text-blue-100" : "text-gray-700"}`}>
            <FaMapMarkerAlt className="text-blue-400 mt-1" size={28} />
            <span>
              Department of AI,<br />
              Kongu Engineering College,<br />
              Perundurai, Erode - 638060
            </span>
          </div>

          {/* Social Icons */}
          <div className="p-4">
            <h3 className={`mb-2 font-semibold text-xl ${isDark ? "text-white" : "text-gray-800"}`}>
              Connect with us
            </h3>
            <div className="flex gap-4 mt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl
                    ${isDark
                      ? "bg-gradient-to-br from-blue-400 to-purple-500 text-white"
                      : "bg-gradient-to-br from-blue-500 to-purple-600 text-white"}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className={`text-lg font-semibold mb-1.5 flex items-center ${isDark ? "text-white" : "text-gray-900"}`}>
            <span className="mr-2">📱</span> Contact
          </h4>
          <ul className={`${isDark ? "text-blue-100" : "text-gray-700"} space-y-2`}>
            <li><b>Faculty Coordinators:</b></li>
            <li className="ml-6">Dr.K Logeswaran : +91 96985 13850</li>
            <li className="ml-6">Ms Balasanthi  : +91 93448 60238</li>

            <li className="mt-3"><b>Secretaries:</b></li>
            <li className="ml-6">Sanjai R      : +91 99422 35410</li>
            <li className="ml-6">Rashmika K R  : +91 76676 90991</li>
          </ul>
          
            {/* View Members Button */}
            <button
              onClick={goToMembersPage}
              className={`mt-4 px-4 py-2 rounded-lg font-semibold
                ${isDark
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              View Members
            </button>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={`text-lg font-semibold mb-2 flex items-center ${isDark ? "text-white" : "text-gray-900"}`}>
            <span className="mr-2">🔗</span> Quick Links
          </h4>
          <ul className="space-y-2">
            {[
              { name: "Home", href: "#home" },
              { name: "About", href: "#about" },
              { name: "Events", href: "#events" },
              { name: "Life@AICC", href: "#life" },
              { name: "Contact", href: "#contact" }
            ].map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className={`group relative block pl-2 transition-colors
                    ${isDark ? "text-blue-100 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div
        className={`mt-10 border-t pt-6 text-center text-sm relative 
          ${isDark ? "border-blue-700 text-blue-200" : "border-gray-400 text-gray-600"}`}>
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 -top-2.5 px-4
            ${isDark
              ? "bg-gradient-to-br from-gray-900 to-gray-900"
              : "bg-gradient-to-br from-gray-200 to-gray-300"}`}>
          <span className="text-blue-400">✦</span>
        </div>
        <span className="font-mono">&copy; {new Date().getFullYear()} AI Coding Club.</span> All rights reserved.
      </div>
    </footer>
  );
}
