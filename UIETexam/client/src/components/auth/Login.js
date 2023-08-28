import React, { useState } from "react"; // Import useState
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setSelectedRole] = useState(""); // New state for selected role
  const [id,Setid] = useState("");
  const [show,setShowotp]= useState(false);
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/r1/verifyOtp",
        {
          id: id,
          otp: otp,
        }
      );

      if (response.data.status === "success") {
        if(role==="Admin")
        navigate("/controller1/Home");
        else if(role==="Professor")
        navigate("/Examiner/Home");
       else if(role==="Assigny")
       navigate("/Assigne/Home");
      else if(role==="Secrecy")
      navigate("/Confidential/Home");

      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Error verifying OTP. Please try again later.");
    }
  };
  async function submit(e) {
    e.preventDefault();
    if(role==="Admin")
    {
      try {
        await axios
          .post("http://localhost:5000/api/r1/login", {
            email,
            role,
            password 
          })
          .then((res) => {
            if (res.data) {
              
                Setid(res.data._id);
                setShowotp(true);
             // navigate("/otpPage");
            } else if (res.data === "notexist") {
              alert("User Not Registered");
            }
          })
          .catch((e) => {
            alert("Wrong");
            console.log(e);
          });
      } catch (e) {
        console.log("error: " + e);
      }
    }
   else if(role==="Professor")
   {
    try {
      await axios
        .post("http://localhost:5000/api/r2/login", {
          email,
          role,
          password 
        })
        .then((res) => {
          if (res.data) {
            
              Setid(res.data._id);
              setShowotp(true);
           // navigate("/otpPage");
          } else if (res.data === "notexist") {
            alert("User Not Registered");
          }
        })
        .catch((e) => {
          alert("Wrong");
          console.log(e);
        });
    } catch (e) {
      console.log("error: " + e);
    }
   }
   else if(role==="Assigny")
   {
    try {
      await axios
        .post("http://localhost:5000/api/r3/login", {
          email,
          role,
          password 
        })
        .then((res) => {
          if (res.data) {
            
              Setid(res.data._id);
              setShowotp(true);
           // navigate("/otpPage");
          } else if (res.data === "notexist") {
            alert("User Not Registered");
          }
        })
        .catch((e) => {
          alert("Wrong");
          console.log(e);
        });
    } catch (e) {
      console.log("error: " + e);
    }
   }
   else if(role==="Secrecy")
   {
    console.log("Yes");
    try {
      await axios
        .post("http://localhost:5000/api/r4/login", {
          email,
          role,
          password 
        })
        .then((res) => {
          if (res.data) {
            
              Setid(res.data._id);
              setShowotp(true);
           // navigate("/otpPage");
          } else if (res.data === "notexist") {
            alert("User Not Registered");
          }
        })
        .catch((e) => {
          alert("Wrong");
          console.log(e);
        });
    } catch (e) {
      console.log("error: " + e);
    }
   }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full border-gray-300 rounded-md shadow-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setSelectedRole(e.target.value)} // Update selectedRole state
            >
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Professor">Professor</option>
              <option value="Assigny">Assigny</option>
              <option value="Secrecy">Secrecy</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold  mb-1 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border-gray-600 rounded-md shadow-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border-gray-300 rounded-md shadow-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={submit}
          >
            Log In
          </button>
        
        </form>
      </div>
      {show && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center  backdrop-blur">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-md px-3 py-2 mb-2"
              placeholder="Enter OTP"
            />
            <button
              onClick={handleVerifyOTP}
              className="bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
