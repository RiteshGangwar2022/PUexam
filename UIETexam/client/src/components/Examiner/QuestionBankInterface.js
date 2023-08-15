import React from 'react'
import Examiner from "./Examiner";
const QuestionBankInterface = () => {
  return (
   <Examiner>
    <div className="flex flex-col gap-10">
        <div className="flex flex-row-reverse gap-[27rem]  ">
                    
        <button className=" bg-slate-100 shadow-md text-blue-700 text-2xl font-semibold py-1 px-5 p-5  rounded-2xl">
              <span className="mr-2">Export</span>
            </button>
                     <div className="text-3xl font-bold ">
                        Question Banks
                     </div>
        </div>
        <div className="flex flex-col justify-center items-center">
        <div className='font-bold text-3xl flex justify-center'>Subject Name</div>
        <div className='p-2 my-3 rounded-xl bg-white  h-auto w-[40rem] '>
        <div className="flex flex-col justify-center items-center">
          <div className="text-2xl font-bold ">
             Add Question
          </div>
          <div className="flex gap-3 flex-col">
          <div className='flex gap-3'>
             <div className="text-xl font-bold mt-2">
              Question Statement:
             </div>
             
  <input type="text" class="w-72 h-14 bg-gray-300 px-4 py-2 rounded-sm" />
</div>
<div className='flex gap-[4rem]'>
             <div className="text-xl font-bold mt-2">
              Sub Question:
             </div>
             
  <input type="text" class="w-72 h-7 bg-gray-300 px-4 py-2 rounded-sm mt-2" />
</div>
<div className='flex gap-[4rem]'>
             <div className="text-xl font-bold mt-2">
              Sub Question:
             </div>
             
  <input type="text" class="w-72 h-7 bg-gray-300 px-4 py-2 rounded-sm mt-2" />
</div>
<div className='flex justify-center items-center '>
<button className=" bg-sky-600  text-white text-sm font-semibold  shadow-lg px-8 ml-[12.9rem] rounded-2xl">
              <span className="mr-2">Add SubQuestion</span>
            </button>
</div>
<div className='flex gap-[11.5rem]'>
             <div className="text-xl font-bold mt-2">
                Add Image:
             </div>
             <div>
             <button className=" bg-sky-600 shadow-md text-white text-sm font-semibold py-0.5 px-6 rounded-2xl mt-2">
              <span className="">Browse</span>
            </button>
             </div>
</div>
<div className="flex justify-center items-center gap-[7rem] mt-2">
<div>
<button className=" bg-sky-600 shadow-md text-white text-xl font-semibold py-1 px-5 p-5  rounded-2xl">
              <span className="mr-2">Add</span>
            </button>
</div>
<div>
<button className=" bg-slate-100 shadow-md text-blue-700 text-xl font-semibold py-1 px-5 p-5  rounded-2xl">
              <span className="mr-2">Import</span>
            </button>
</div>
</div>



          </div>
        </div>

        </div>
        
        <div className=" p-2 my-3 rounded-xl bg-white w-[79rem] mx-4 text-center">Questions</div>
        <div className=" p-2 my-3 rounded-xl bg-white w-[79rem] mx-4 text-center">Questions</div>
        <div className=" p-2 my-3 rounded-xl bg-white w-[79rem] mx-4 text-center">Questions</div>
        <div className=" p-2 my-3 rounded-xl bg-white w-[79rem] mx-4 text-center">Questions</div>
        <div className=" p-2 my-3 rounded-xl bg-white w-[79rem] mx-4 text-center">Questions</div>
        <div className=" p-2 my-3 rounded-xl bg-white w-[79rem] mx-4 text-center">Questions</div>
        
       
        </div>
       
    </div>
   </Examiner>
  )
}

export default QuestionBankInterface
