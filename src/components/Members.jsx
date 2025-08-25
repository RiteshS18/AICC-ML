import { motion } from "framer-motion";
import { useContext, useRef, useState, useEffect } from "react";
import { ThemeContext } from "../ThemeContext";
import Navbar from "./Navbar";

// Members Data
const membersData = [
  { name: "Sanjai R", position: "Secretary", image: "/members/sanjai_r.jpg" },
  { name: "Rashmika K R", position: "Secretary", image: "/members/rashmika.jpg" },
  { name: "Sowbharanika Janani J S", position: "Additional Secretary", image: "/members/sowbharanika.jpg" },
  { name: "JayaSurya M", position: "Additional Secretary", image: "/members/jayasuriya.jpg" },
  { name: "Hairunisha A", position: "Joint Secretary", image: "/members/hairunisha.jpg" },
  { name: "Jenesha Malar S", position: "Joint Secretary", image: "/members/jenesha.jpg" },
  { name: "Hariharan J", position: "Joint Secretary", image: "/members/hariharan.jpg" },
  { name: "Sudhan N", position: "Joint Secretary", image: "/members/sudhan.jpg" },
  { name: "Sreenithy S", position: "Joint Secretary", image: "/members/sreenithy.jpg" },
  { name: "Haryni A S", position: "Joint Secretary", image: "/members/haryini.jpg" },
  { name: "Jaisanth K", position: "Treasurer", image: "/members/jaisanth.jpg" },
  { name: "Nagumeena Udayappan", position: "Treasurer", image: "/members/nagumeena.jpg" },
  { name: "DivyaDharshini J", position: "Treasurer", image: "/members/Divyadharshini.jpg" },
  { name: "SriAnish Rameshwaran", position: "Treasurer", image: "/members/anish.jpg" },
  { name: "Dinesh K", position: "Technical Head", image: "/members/dinesh.jpg" },
  { name: "Rahul K", position: "Technical Head", image: "/members/rahul.jpg" },
  { name: "Poornima R K", position: "Technical Head", image: "/members/poornima.jpg" },
  { name: "Madan Prasant N V", position: "Technical Head", image: "/members/madan.jpg" },
  { name: "Tawfeeq B", position: "Technical Head", image: "/members/tawfeeq.jpg" },
  { name: "Sanjay Ramesh I", position: "Multimedia Team", image: "/members/sanjay_ramesh.jpg" },
  { name: "Dharun Kumar S", position: "Multimedia Team", image: "/members/dharun.jpg" },
  { name: "Ragul R", position: "Multimedia Team", image: "/members/ragul.jpg" },
  { name: "Sevesh S S", position: "Multimedia Team", image: "/members/sevesh.jpg" },
  { name: "Dhanush V", position: "Executive Member", image: "/members/dhanush.jpg" },
  { name: "Aadhithya R", position: "Executive Member", image: "/members/aadhithya.jpg" },
  { name: "Nikilesh Karthik J S", position: "Executive Member", image: "/members/nikilesh.jpg" },
  { name: "Karthick M", position: "Executive Member", image: "/members/karthick.jpg" },
  { name: "Kavin P", position: "Executive Member", image: "/members/kavin.jpg" },
  { name: "Mithra T", position: "Executive Member", image: "/members/mithra.jpg" },
  { name: "Iniyasri S V", position: "Executive Member", image: "/members/iniyasri.jpg" },
  { name: "Deepika S D", position: "Executive Member", image: "/members/deepika.jpg" },
  { name: "Yamuna K", position: "Executive Member", image: "/members/yamuna.jpg" },
  { name: "Yoga Sree S", position: "Executive Member", image: "/members/yoga_sree.jpg" },
];

// Group members by position
const groupedMembers = membersData.reduce((acc, member) => {
  if (!acc[member.position]) acc[member.position] = [];
  acc[member.position].push(member);
  return acc;
}, {});

// Auto-scroll container
function AutoScrollContainer({ children }) {
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId;
    const scrollStep = () => {
      if (!paused) {
        container.scrollLeft += 0.5;
        if (container.scrollLeft >= container.scrollWidth / 2) container.scrollLeft = 0;
      }
      frameId = requestAnimationFrame(scrollStep);
    };
    frameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(frameId);
  }, [paused]);

  return (
    <div
      ref={containerRef}
      className="flex gap-6 py-4 px-2 overflow-x-auto scrollbar-hide scroll-smooth"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {children}
    </div>
  );
}

// Single member card
function MemberCard({ member, cardBg, idx }) {
  return (
    <motion.div
      className={`${cardBg} w-[250px] min-w-[250px] rounded-lg shadow-md flex-shrink-0 flex flex-col cursor-pointer overflow-hidden border border-transparent hover:border-cyan-400 transition-all duration-300`}
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6,182,212,0.5)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      viewport={{ once: true }}
    >
      <img src={member.image} alt={member.name} className="h-56 w-full object-cover rounded-t-lg" />
      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="font-semibold text-lg">{member.name}</h3>
        <p className="text-sm text-gray-500">{member.position}</p>
      </div>
    </motion.div>
  );
}

// Members Page
export default function MembersPage() {
  const { theme } = useContext(ThemeContext);

  const containerBg = theme === "dark"
    ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
    : "bg-gradient-to-r from-white via-blue-50 to-white";
  const cardBg = theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Navbar />
      <section className={`pt-24 pb-16 relative ${containerBg} transition-colors duration-500 select-none`}>
        <div className="max-w-7xl mx-auto px-6">

        {/* Page Title */}
        <div className="flex justify-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center font-bold text-[clamp(2rem,6vw,4rem)]"
            style={{
              color: theme === "dark" ? "#fff" : "#3B82F6",
              textShadow: theme === "dark"
                ? "0 0 8px rgba(255,255,255,0.3)"
                : "0 0 8px rgba(59,130,246,0.3)"
            }}
          >
            Members
          </motion.h2>
        </div>

        {/* Render grouped members */}
        {Object.entries(groupedMembers).map(([position, members]) => {
          const isScrolling = ["Joint Secretary", "Technical Head", "Executive Member"].includes(position);
          return (
            <motion.div key={position} className="mb-12">
              <motion.h3
                className="text-3xl font-extrabold mb-4 text-center tracking-wide"
                style={{ color: "#06B6D4", textShadow: "0 0 10px rgba(6,182,212,0.6)" }}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                viewport={{ once: true }}
              >
                {position}
              </motion.h3>

              {isScrolling ? (
                <AutoScrollContainer>
                  {members.map((m, i) => <MemberCard key={i} member={m} cardBg={cardBg} idx={i} />)}
                </AutoScrollContainer>
              ) : (
                <div className="flex flex-wrap justify-center gap-6 py-4 px-2">
                  {members.map((m, i) => <MemberCard key={i} member={m} cardBg={cardBg} idx={i} />)}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
    </div>
  );
}
