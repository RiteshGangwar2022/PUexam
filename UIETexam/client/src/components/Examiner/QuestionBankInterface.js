import React from 'react'
import Examiner from "./Examiner";
const QuestionBankInterface = () => {
  return (
   <Examiner>
    <div className="flex flex-col gap-10">
        <div className="flex justify-center ">
                     <div className="text-3xl font-bold ">
                        Question Banks
                     </div>
                     <div className="w-2/12 flex items-center justify-end">
            <button className="flex items-center bg-slate-100 shadow-md text-blue-700 text-2xl font-semibold py-1 px-5 p-5 rounded-2xl">
              <span className="mr-2">Export</span>
            
            </button>
          </div>
        </div>
        <div className='font-bold text-3xl flex justify-center'>Subject Name</div>
    </div>
   </Examiner>
  )
}

export default QuestionBankInterface
