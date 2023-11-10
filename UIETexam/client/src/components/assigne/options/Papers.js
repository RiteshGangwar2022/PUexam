import React ,{useState,useEffect} from 'react'
import Assigne from "../Assigne";
import Loader from '../../loader';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Papers = () => {
  const [list,setList]=useState([]);
  
  const FetchList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/r3/getexamList"
      );

      if (response.data) {
        setList(response.data);
        
      } else {
        alert("Not able to fetch");
      }
    } catch (error) {
      alert("Some error is coming");
    }
  };

  useEffect(() => {
    FetchList();
  }, []);

useEffect(()=>{
  console.log(list);
},[list])


  return (
    <Assigne>
        <h1 className="text-center text-3xl font-bold">Papers List</h1>

<div className=" px-6 py-3 font-semibold text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
<h1 className="  ">Assigned</h1>
<h1 className="  ">Subject</h1>
  <h1 className=" "> Branch </h1>
  <h1 className="  ">Session</h1>
  <h1 className="  ">Semester </h1>
  <h1 className="  ">Paper</h1>
  <h1 className="  ">Status</h1>
</div>

{list.map((data) => (
  <div key={data.id}>
    {data.Examiners.map((examiner, index) => (

      <div className="px-7 py-3 text-2xl items-center flex justify-between my-3 rounded-xl bg-white">
              <div className="flex items-center">
                
                <h1>{examiner?.Name}</h1>
                
              </div>
              <h1 className=" ">{data?.Subject?.Name}</h1>
              
              <h1 className=" ">{data?.Branch}</h1>
              <h1 className="">{data?.session}</h1>
              <h1>{data?.SemesterNo}</h1>
              <h1 className=" ">{data?.option}</h1>
              
              {examiner.IsSelected === 0 ? (
                <div className="display flex justify-center gap-3 cursor-pointer">
                  <div
                    className="text-red-950 text-lg "
                  >
                    Pending
                  </div>
                </div>
              ) : examiner?.IsSelected === 1 ? (
                <div className="text-green-500 text-lg">Accepted</div>
              ) : examiner?.IsSelected === -1 ? (
                <div className="text-red-500 text-lg">Declined</div>
              ) : (
                <p>Something wrong here</p>
              )}
            </div>

    ))}
  </div>
))}





    </Assigne>
  );
};

export default Papers;
