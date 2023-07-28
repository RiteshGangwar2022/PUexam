import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const [otp, setOTP] = useState('');
    const navigate = useNavigate();
    async function submit(e){

        e.preventDefault();
      
            try{
               
              await axios.post("",{
                email,password
              })
              .then(res=>{
                if(res.data=='exist'){
                    setShowOTPVerification(true);
                }
                else if(res.data=="notexist") {
                  alert("User Not Registered");
                }
              })
              .catch(e=>{
                alert("Wrong");
                console.log(e);
              })
      
            }
            catch(e){
                 console.log("error: "+e);
            }
      
       }
       const handleVerifyOTP = async () => {
        try {
          // Make an API call to your backend server or directly to the OTP service API
          // with the OTP entered by the user and the user's email/phone for verification
          const response = await axios.post('/api/verify-otp', {
            email: email, // Replace 'userEmail' with the user's email
            otp: otp, // Replace 'otp' with the OTP entered by the user
          });
      
          if (response.data === 'success') {
            // OTP verification successful, handle success accordingly
            setShowOTPVerification(false);// Close the OTP verification window
            navigate('/controller1/Home');
          } else {
            // OTP verification failed, handle failure accordingly
            alert('Invalid OTP. Please try again.');
          }
        } catch (error) {
          console.error('Error verifying OTP:', error);
          alert('Error verifying OTP. Please try again later.');  
        }
      };
      
      

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold  mb-1 ">
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
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1">
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
      {showOTPVerification && ( 
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-80 bg-gray-600">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 mb-2"
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
