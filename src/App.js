import React, { useState, useRef } from "react";
import "./index.css";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    costGuess: "",
    spidrPin: "",
  });

  const videoRef = useRef();

  const handleStart = () => {
    videoRef.current.pause();
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "spidrPin") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      const formatted = digits.replace(/(.{4})/g, "$1-").slice(0, 19);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:");
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    console.table(formData); // ✅ Developer-readable output
    setSubmitted(true);

    const audio = new Audio(`${process.env.PUBLIC_URL}/airfryer.mp3`);
    audio.volume = 1.0;
    audio.play();
    audio.onended = () => {
      setShowSuccess(true);
    };
  };

  return (
    <div className="relative min-h-screen w-full font-spidr overflow-hidden">
      {!showForm && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 hover:brightness-110 hover:shadow-lg transition duration-300"
        >
          <source
            src={`${process.env.PUBLIC_URL}/Videos.mp4`}
            type="video/mp4"
          />
        </video>
      )}

      {showForm && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0 bg-black">
          <img
            src={`${process.env.PUBLIC_URL}/top.png`}
            alt="Air Fryer"
            className="absolute top-0 -translate-x-1/2 w-[1000px] md:w-[1000px] animate-zoom-in z-0"
          />
        </div>
      )}

      {!showForm && (
        <div className="z-10 relative flex items-center justify-center min-h-screen bg-black/40">
          <button
            onClick={handleStart}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:from-yellow-400 hover:to-red-500 hover:scale-105"
          >
            Claim Your Fryer
          </button>
        </div>
      )}

      {showForm && !submitted && (
        <div className="relative z-10 flex items-center justify-center min-h-screen bg-black/60 p-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-gray-300 backdrop-blur-xl shadow-2xl ring-1 ring-white/20 rounded-2xl p-8 space-y-6"
          >
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Spidr Air Fryer Interest Form
            </h1>

            {[
              "firstName",
              "lastName",
              "phone",
              "email",
              "costGuess",
              "spidrPin",
            ].map((field, i) => (
              <input
                key={i}
                type={
                  field === "email"
                    ? "email"
                    : field === "costGuess"
                    ? "number"
                    : "text"
                }
                name={field}
                placeholder={
                  field === "costGuess"
                    ? "Guess the Air Fryer’s Cost ($)"
                    : field === "spidrPin"
                    ? "Spidr PIN (####-####-####-####)"
                    : field.charAt(0).toUpperCase() +
                      field.slice(1).replace(/([A-Z])/g, " $1")
                }
                value={formData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 placeholder-gray-500"
                required
              />
            ))}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:brightness-110 transition-all duration-300 shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {submitted && showSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-2xl font-bold z-20 text-center px-6">
          Form submitted! Let the flavor games begin.
        </div>
      )}
    </div>
  );
}
