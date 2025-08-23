// src/components/Members.jsx
import { motion } from "framer-motion";

// Example members data
const members = [
  {
    id: 1,
    name: "Sudhan N",
    role: "President",
    image: "/member1.jpg",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  },
  {
    id: 2,
    name: "Aishwarya R",
    role: "Vice President",
    image: "/member2.jpg",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  },
  {
    id: 3,
    name: "Karthik S",
    role: "Technical Head",
    image: "/member3.jpg",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  },
];

export default function Members() {
  return (
    <section id="members" className="py-20 bg-gray-50 px-6 md:px-16">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Our Team
        </h2>
        <p className="mt-3 text-gray-600">
          Meet the passionate members who make AICC successful.
        </p>
      </div>

      {/* Members Grid */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-28 h-28 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-sm text-blue-600">{member.role}</p>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600"
              >
                LinkedIn
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
