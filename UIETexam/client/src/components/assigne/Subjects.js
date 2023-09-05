import React, { useState, useEffect } from "react";
import Assigne from "./Assigne";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../loader";
import { useAuth } from "../../Context/AuthContext";
import { Toast, toast } from "react-hot-toast";
const Subjects = () => {
  const { globalResponseData, setGlobalResponseData } = useAuth();
  const location = useLocation();
  const [examObj, setExamObj] = useState();
  const [selectedExaminers, setSelectedExaminers] = useState([]);
  const { id, Subject } = location.state;
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState();
  const [session, setSession] = useState();

  useEffect(() => {
    fetchExaminers();
  }, []);

  const fetchExaminers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/r3/allexaminers/${id}`
      );

      if (response.data && response.data[0]) {
        setLoading(false);
        setExamObj(response.data[0]);
      } else {
        alert("Not able to fetch");
      }
    } catch (error) {
      console.error("Error: ", error);
      alert("Some error is coming");
    }
  };

  useEffect(() => {
    console.log("Exmainers Slected ");
    console.log(selectedExaminers);
  }, [selectedExaminers]);

  const handleCheckboxChange = (examinerId) => {
    setSelectedExaminers((prevItems) => {
      if (prevItems.includes(examinerId)) {
        return prevItems.filter((item) => item !== examinerId);
      } else {
        return [...prevItems, examinerId];
      }
    });
  };

  const sendExaminersList = () => {
    const loadingToast = toast.loading("creating assignment...");

    if (selectedExaminers.length === 0) {
      toast.error("select atleast one examiner", { id: loadingToast });
      return;
    }
    axios
      .post("http://localhost:5000/api/r3/addassignment", {
        DOE: new Date(),
        ExamCode: "1234",
        Branch: "Cse",
        SemesterNo: 1,
        Examiners: selectedExaminers,
        Subject: id,
      })
      .then((response) => {
        toast.success("success", { id: loadingToast });
        console.log("Response from the API:", response.data);
      })
      .catch((error) => {
        toast.error("error", { id: loadingToast });
        console.error("Error:", error);
        alert("Error");
      });
  };

  if (loading)
    return (
      <Assigne>
        <Loader />
      </Assigne>
    );

  return (
    <Assigne>
      <div className="text-center text-3xl mb-3 font-bold">{Subject} </div>
      <div className="bg-white rounded mt-2 p-3 flex flex-col">
        <h1 className=" text-xl">Choose examiners to assign :- </h1>
        <div className="w-full max-w-4xl   my-3  bg-white rounded-sm  ">
          <div className=" p-3 border-[1px]  overflow-y-auto w-full max-w-lg ">
            {examObj &&
              examObj.Examiners.map((items, i) => (
                <div
                  key={items.id}
                  className="flex  my-2  bg-neutral-100 px-2  items-center   gap-5"
                >
                  <div className=" text-xl">{i + 1}.</div>
                  <div className="flex-grow py-[0.2669rem] rounded-md">
                    <p className=" text-xl  ">{items.name}</p>
                  </div>
                  <div className="ml-10 mr-4">
                    <input
                      type="checkbox"
                      // onChange={() => handleCheckboxChange(items.id)}
                      onChange={() => handleCheckboxChange(items._id)}
                      className="  scale-150"
                    />
                  </div>
                </div>
              ))}
          </div>

          <h1 className="text-xl my-3">Choose option and session :- </h1>

          <div className=" p-3 border-[1px] flex flex-col gap-2  overflow-y-auto w-full max-w-lg ">
            <select
              id="option"
              name="option"
              className="w-full  p-2 border rounded-md shadow-sm focus:ring focus:white bg-white"
              //   value={option}
              //   onChange={(e) => setOption(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Choose option
              </option>
              <option value="regular">Regular</option>
              <option value="reappear">Reappear</option>
              <option value="golden-chance">Golden Chance</option>
            </select>
            <select
              id="session"
              name="session"
              className="w-full  p-2 border rounded-md shadow-sm focus:ring focus:white bg-white"
            >
              <option value="" selected disabled hidden>
                Choose session
              </option>
              <option value="july">July</option>
              <option value="january">January</option>
            </select>
          </div>

          <button
            className="uppercase mt-3 bg-sky-500 text-white rounded-full px-4 py-2 font-bold 
                        "
            onClick={sendExaminersList}
          >
            Assign Exmainers
          </button>
        </div>
      </div>
    </Assigne>
  );
};

export default Subjects;
