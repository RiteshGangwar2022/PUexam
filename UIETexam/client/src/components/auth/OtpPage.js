import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const OtpPage = ({email}) => {
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();
  const handleVerifyOTP = async () => {
    try {
      // Make an API call to your backend server or directly to the OTP service API
      // with the OTP entered by the user and the user's email/phone for verification
      const response = await axios.post('http://localhost:3000/api/r1/verify-otp', {
        email: email, // Replace 'userEmail' with the user's email
        otp: otp, // Replace 'otp' with the OTP entered by the user
      });
  
      if (response.data === 'success') {
        // OTP verification successful, handle success accordingly
        navigate('/');
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
    <div>
       <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center  bg-gray-600">
      <div className="bg-gray-200 p-6 rounded-lg shadow-md">
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
    
  )
}

export default OtpPage
