"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Envelope from "@/components/Envelope";
import { Result } from "@/app/actions/Result";
import { Candidate } from "@/app/actions/Result";
import { animate, easeInOut, motion } from "framer-motion";
import Image from "next/image";

const RadioFormCard: React.FC = () => {
  const [showCard, setShowCard] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [formData, setFormData] = useState({ firstname: "", lastname: "" });
  const [matchResult, setMatchResult] = useState<Candidate | null>(null);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setFormData({ firstname: "", lastname: "" });
    setChecked(false);
    setMatchResult(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    if (!formData.firstname && !formData.lastname && !selectedOption) {
      toast.error("กรุณาเลือกสาขาและกรอกชื่อ-นามสกุลให้ครบถ้วน");
      return;
    }
    if (!selectedOption) {
      toast.error("กรุณาเลือกสาขา");
      return;
    }
    if (!formData.firstname && !formData.lastname) {
      toast.error("กรุณากรอกชื่อ-นามสกุลให้ครบถ้วน");
      return;
    }

    if (!formData.firstname) {
      toast.error("กรุณากรอกชื่อให้ครบถ้วน");
      return;
    }

    if (!formData.lastname) {
      toast.error("กรุณากรอกนามสกุลให้ครบถ้วน");
      return;
    }

    // toast.info("กำลังตรวจสอบข้อมูล...");

    setIsLoading(true);
    const res: Candidate | null = await Result(
      formData.firstname,
      formData.lastname,
      selectedOption
    );
    setIsLoading(false);
    setShowCard(false);
    setChecked(true);

    if (res) {
      setMatchResult(res);
    } else {
      setMatchResult(null);
    }
  };
  const majorDisplayMap: Record<string, string> = {
    web_programming: "Web Programming",
    web_design: "Web Design",
    web_marketing: "Web Marketing",
    web_content: "Web Content",
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(to right, #80CBC4 1px, transparent 1px), linear-gradient(to bottom, #B4EBE6 1px, transparent 1px )",
        backgroundSize: "20px 20px",
        backgroundColor: "#FBF8EF",
      }}
    >
      <ToastContainer position="top-center" autoClose={3000} />

      {!showCard && !checked && (
        <div className="flex flex-col gap-y-2">
          <Envelope setShowCard={() => setShowCard(true)} />
        </div>
      )}

      {showCard && !checked && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl p-6 bg-white/80 backdrop-blur-md border-3 border-[#f9a6a9] shadow-xl rounded-xl"
        >
          <h2 className="text-lg font-semibold mb-3 text-[#594100]">
            เลือกสาขาที่คุณสมัคร
          </h2>
          <div className="flex flex-col gap-4 px-2 font-bold text-[#594100]">
            {[
              "Web Design",
              "Web Programming",
              "Web Marketing",
              "Web Content",
            ].map((label, index) => {
              const id = `option-${index}`;
              return (
                <div key={id} className="flex items-center">
                  <input
                    id={id}
                    type="radio"
                    name="option"
                    value={label}
                    checked={selectedOption === label}
                    onChange={() => handleOptionChange(label)}
                  />
                  <label
                    htmlFor={id}
                    className="ms-2 text-sm font-medium text-gray-800"
                  >
                    {label}
                  </label>
                </div>
              );
            })}
          </div>

          {selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 p-4 w-full max-w-3xl bg-amber-100/60 backdrop-blur-sm rounded-lg border-3 border-[#fdced0]"
            >
              <h3 className=" mb-2 text-center text-lg font-black text-[#594100]">
                กรุณากรอกข้อมูลเพื่อตรวจสอบผลการคัดเลือก
              </h3>
              <div className="space-y-2">
                <span className="flex flex-col text-[#594100]">
                  ชื่อ
                  <input
                    type="text"
                    name="firstname"
                    placeholder=""
                    value={formData.firstname}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md bg-white border-[#f9a6a9]"
                  />
                </span>
                <span className="flex flex-col text-[#594100]">
                  นามสกุล
                  <input
                    type="text"
                    name="lastname"
                    placeholder=""
                    value={formData.lastname}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md bg-white border-[#f9a6a9]"
                  />
                </span>
              </div>

              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: easeInOut,
                }}
                className="flex justify-center mt-4"
              >
                <button
                  onClick={handleConfirm}
                  className="text-white bg-gradient-to-r from-pink-300 to-[#f5898d] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-100 shadow-lg font-medium rounded-lg text-md px-5 py-2.5 text-center hover:transform-content"
                >
                  ดูผลการคัดเลือก
                </button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
      {isLoading && !showCard && (
        <motion.div
          className="flex flex-col items-center justify-center text-[#594100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-12 h-12 border-4 border-[#f9a6a9] border-t-transparent rounded-full"
          />
          <p className="mt-4 text-md font-semibold">loading</p>
        </motion.div>
      )}

      {checked && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl p-6 mt-4 flex flex-col justify-center items-center bg-white/90 backdrop-blur-md border-2 border-[#f5898d] shadow-xl rounded-2xl text-center"
        >
          {matchResult ? (
            <>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                🎉 ขอแสดงความยินดี !
              </h2>
              <Image
                src="/yay.gif"
                alt="yay"
                width={200}
                height={150}
                className="flex justify-center items-center"
              />
              <p className="text-lg font-bold text-gray-700">
                คุณ{matchResult.firstName} {matchResult.lastName}
              </p>
              <p className="text-lg font-bold text-green-600">
                ผ่านการคัดเลือกเข้าสู่รอบสัมภาษณ์ Young Webmaster Camp 20
              </p>
              <p className="text-md text-[#594100]">
                สาขา: {majorDisplayMap[matchResult.major] || matchResult.major}
              </p>
              <p className="text-md text-[#594100] mb-4">
                เลขประจำตัวผู้เข้าสัมภาษณ์: {matchResult.interviewRefNo}
              </p>
              <p className="text-sm text-gray-500">
                โปรดตรวจสอบรายละเอียดการสัมภาษณ์ได้ที่
              </p>
              <p className="text-sm text-gray-500">รายละเอียดการสัมภาษณ์</p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-500 mb-2">
                😢 ขอแสดงความเสียใจ
              </h2>
              <Image
                src="/cuddling-hug.gif"
                alt="hug"
                width={200}
                height={150}
                className="flex justify-center items-center"
              />
              <p className="mt-4 text-lg font-medium text-gray-700">
                คุณ{formData.firstname} {formData.lastname}
              </p>
              <p className="text-lg  text-red-500 mb-4">
                ไม่ได้รับคัดเลือกเข้าสู่รอบสัมภาษณ์
              </p>
              <p className="text-sm text-gray-500">
                ผู้ที่ไม่ผ่านการคัดเลือกในครั้งนี้ ไม่ใช่ว่าน้องไม่เก่งนะคะ
                แต่ทุกคนมีจังหวะและโอกาสที่ต่างกัน
              </p>
              <p className="text-sm text-gray-500">
                พี่ ๆ ขอเป็นกำลังใจให้น้องมีความตั้งใจแบบนี้ต่อไป
              </p>
              <p className="text-sm text-gray-500">
                และพบกันใหม่ในการรับสมัครของค่าย Young Webmaster Camp
                ในปีถัดไปนะคะ✌️
              </p>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default RadioFormCard;
