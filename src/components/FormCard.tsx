"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Envelope from "@/components/Envelope";

const RadioFormCard: React.FC = () => {
  const [showCard, setShowCard] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", surname: "" });

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setFormData({ name: "", surname: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (!formData.name || !formData.surname) {
      toast.error("กรุณากรอกชื่อ-นามสกุลให้ครบถ้วน");
      return;
    }

    toast.success(`กรุณารอสักครู่`);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 "
      style={{
        backgroundImage:
          "linear-gradient(to right, #80CBC4 1px, transparent 1px), linear-gradient(to bottom, #B4EBE6 1px, transparent 1px )",
        backgroundSize: "20px 20px",
        backgroundColor: "#FBF8EF",
      }}
    >
      
        
        {!showCard && (
           <div className="flex flex-col gap-y-2">
          <Envelope />
          <button
            onClick={() => setShowCard(true)}
            className="items-center font-sans text-white bg-gradient-to-r  from-pink-300 to-[#f5898d] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-100 dark:focus:ring-amber-800 shadow-lg shadow-pink-300/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center mb-2 ease-in-out duration-500 transition-all"
          >
            ดูผลการคัดเลือกเข้ารอบสัมภาษณ์
          </button>
           </div>
        )}
     
      {showCard && (
        <div className="w-full max-w-lg p-6 bg-white/80 backdrop-blur-md  border-3 border-[#f9a6a9] shadow-xl rounded-xl">
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
                <div key={id} className="flex items-center me-4">
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
            <div className="mt-6 p-4 bg-amber-100/60 backdrop-blur-sm rounded-lg border-3 border-[#fdced0]">
              <h3 className="font-medium mb-2 text-center text-[#594100]">
                กรุณากรอกข้อมูลเพื่อตรวจสอบผลการคัดเลือก
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder="ชื่อ"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md bg-white border-[#f9a6a9]"
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="นามสกุล"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md bg-white border-[#f9a6a9]"
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleConfirm}
                  className="items-center text-white bg-gradient-to-r from-pink-300 to-[#f5898d] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-100 dark:focus:ring-amber-800 shadow-lg shadow-pink-300/50 font-medium rounded-lg text-md px-5 py-2.5 text-center"
                >
                  ดูผลการคัดเลือก
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default RadioFormCard;
