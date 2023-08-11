import React from 'react'
import Examiner from '../Examiner'
import { Link } from "react-router-dom";
import {
  FaEye
} from "react-icons/fa";
const QuestionBanks = () => {

  const data = [
    { subject: 'Physics',questions: 50,},
    { subject: 'Chemistry',questions: 50,},
    { subject: 'Maths',questions: 50,},
    { subject: 'Physics',questions: 50,},
  ];



  return (
    <Examiner>
        <div className="flex flex-col">
        <div className='flex flex-col justify-center items-center text-2xl font-bold'>Question Banks</div>
        <div className=' flex flex-col justify-center items-center '>
        {data.map((data,i) => (
            
              
                <div className='p-2 my-3 rounded-xl bg-white  h-auto w-[40rem]'>
                    <div className="flex flex-col gap-7">
                      <div className="flex  gap-[16rem]">
                        <div className='flex flex-col justify-start items-start '>{i+1}</div>
                        <div className='flex flex-col justify-between items-end font-bold text-xl'>
                          {data.subject}
                        </div>
                      </div>
                       <div className="flex flex-col gap-9">
                        <div className='flex flex-col justify-center items-center text-xl font-bold'>Number of Questions: {data.questions}</div>
                        <div className="flex gap-16 ml-24">
                        <Link to={`/Examiner/QuestionBanks/${i+1}`}  className="w-2/12 flex items-center justify-center">
                        
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-2xl">
              <span className="mr-2">View</span>
              <FaEye className="text-lg" />
            </button>
          
              </Link>
                        
          <div className="w-2/12 flex items-center justify-center">
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-2xl">
              <span className="mr-2">Import</span>
              
            </button>
          </div>
          <div className="w-2/12 flex items-center justify-center ">
            <button className="flex items-center bg-slate-100 shadow-md text-blue-400 font-semibold py-1 px-5 p-5 rounded-2xl">
              <span className="mr-2">Export</span>
            
            </button>
          </div>
                        </div>
                       </div>

                    </div>
               
               </div>
                
             
          ))}

        </div>

        </div>


    </Examiner>
  )
}

export default QuestionBanks;
