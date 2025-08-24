import { motion } from "framer-motion";
import { useContext, useRef, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext";

// Members Data
const membersData = [
  { name: "Sanjay R", position: "Secretary", image: "/members/sanjay_r.jpg" },
  { name: "Rashmika K R", position: "Secretary", image: "/members/rashmika.jpg" },
  { name: "Jayasurya M", position: "Additional Secretary", image: "/members/jayasuriya.jpg" },
  { name: "Sowbharanika Janani J S", position: "Additional Secretary", image: "/members/sowbharanika.jpg" },
  { name: "Hairunisha A", position: "Joint Secretary", image: "/members/hairunisha.jpg" },
  { name: "Jenesha Malar S", position: "Joint Secretary", image: "/members/jenesha.jpg" },
  { name: "Hariharan J", position: "Joint Secretary", image: "/members/hariharan.jpg" },
  { name: "Sudhan N", position: "Joint Secretary", image: "/members/sudhan.jpg" },
  { name: "Sreenithy S", position: "Joint Secretary", image: "/members/sreenithy.jpg" },
  { name: "Haryni A S", position: "Joint Secretary", image: "/members/haryini.jpg" },
  { name: "Divyadharshini J", position: "Treasurer", image: "/members/divyadharshini.jpg" },
  { name: "Srianish Rameshwaran", position: "Treasurer", image: "/members/anish.jpg" },
  { name: "Jaisanth K", position: "Treasurer", image: "/members/jaisanth.jpg" },
  { name: "Nagumeena Udayappan", position: "Treasurer", image: "/members/nagumeena.jpg" },
  { name: "Dinesh K", position: "Technical Head", image: "/members/dinesh.jpg" },
  { name: "Poornima R K", position: "Technical Head", image: "/members/poornima.jpg" },
  { name: "Rahul K", position: "Technical Head", image: "/members/rahul.jpg" },
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
  { name: "Deepika S B", position: "Executive Member", image: "/members/deepika.jpg" },
  { name: "Yamuna K", position: "Executive Member", image: "/members/yamuna.jpg" },
  { name: "Yoga Sree S", position: "Executive Member", image: "/members/yoga_sree.jpg" },
];

export default function Members() {
  const { theme } = useContext(ThemeContext);
  const sliderRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const pauseTimeout = useRef(null);

  const loopedMembers = [...membersData, ...membersData];

  const triggerPause = () => {
    setPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setPaused(false), 4000);
  };

  useEffect(() => {
    if (paused) return;
    const container = sliderRef.current;
    if (!container) return;

    const scrollSpeed = 1;
    let animationFrame;

    const step = () => {
      container.scrollLeft += scrollSpeed;
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [paused]);

  const containerBg =
    theme === "dark"
      ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      : "bg-gradient-to-r from-white via-blue-50 to-white";
  const cardBg =
    theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900";
  const titleColor = theme === "dark" ? "#FFFFFF" : "#3B82F6";
  const titleShadow =
    theme === "dark"
      ? "0 0 8px rgba(255,255,255,0.3)"
      : "0 0 8px rgba(59,130,246,0.3)";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  return (
    <section
      id="members"
      className={`py-16 relative ${containerBg} transition-colors duration-500 select-none`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-12">
          <motion.h2
            className="flex flex-wrap justify-center font-bold text-[clamp(2rem,6vw,4rem)] relative cursor-pointer"
            style={{ color: titleColor, textShadow: titleShadow }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {"Members".split("").map((letter, idx) => (
              <motion.span key={idx} variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2 cursor-grab active:cursor-grabbing"
          onMouseEnter={triggerPause}
          onTouchStart={triggerPause}
        >
          {loopedMembers.map((member, idx) => (
            <motion.div
              key={idx}
              className={`${cardBg} w-[250px] min-w-[250px] rounded-lg shadow-md flex-shrink-0 flex flex-col cursor-pointer overflow-hidden border border-transparent hover:border-blue-500 transition-all duration-300`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-56 w-full object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col items-center text-center">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
