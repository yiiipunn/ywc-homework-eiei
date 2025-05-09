import { useState } from "react";
import { motion } from "framer-motion";

export default function Envelope() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div
        className="relative top-12 cursor-pointer animate-up"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Envelope Back */}
        <div className="relative w-[300px] h-[200px] bg-[#83641d] before:content-[''] before:absolute before:w-[212px] before:h-[212px] before:rotate-45 before:top-[-105px] before:left-[44px] before:rounded-tl-[30px] before:bg-[#f08080]"></div>

        {/* Card */}
        <motion.div
          className="absolute bg-[#ffffff] border-dashed border-gray-300 border-1 w-[270px] h-[170px] top-[5px] left-[15px] shadow-[rgba(0,0,0,0.4)_-5px_-5px_100px]"
          animate={{ top: isHovered ? -90 : 5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute border-2 rounded-md border-[#003049] w-[240px] h-[140px] left-[12px] top-[12px]"></div>
          <div className="absolute justify-center items-center font-[cursive] text-[28px] text-center leading-[25px] top-[50px] left-[30px] whitespace-pre text-[#003049]">
            ประกาศผล<br/>ผู้มีสิทธิ์สัมภาษณ์ !
          </div>
         
        </motion.div>

        {/* Envelope Front */}
        <div className="absolute border-r-[180px] border-t-[95px] border-b-[100px] border-transparent border-r-[#f4cb8e] left-[120px] top-[5px] z-10 w-0 h-0 before:content-[''] before:absolute before:border-l-[300px] before:border-t-[195px] before:border-transparent before:border-l-[#f8ad9d] before:left-[-120px] before:top-[-95px]"></div>

        {/* Floating Hearts */}
        <div className="absolute top-[60px] left-[60px]">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <motion.div
              key={i}
              className={`heart-shape absolute left-[${i * 20}px]`}
              animate={{
                y: [-0, -150],
                scale: [0.3, 1.3],
                opacity: [1, 0.5],
              }}
              transition={{
                duration: 1 + (i % 3) * 0.7,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute top-[265px] left-[-15px] w-[330px] h-[25px] bg-black/30 rounded-full z-[-1] animate-scaleX"></div>
    </div>
  );
}
