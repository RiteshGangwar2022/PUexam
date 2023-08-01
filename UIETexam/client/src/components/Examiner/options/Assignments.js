import React, { useState } from "react";
import Examiner from "../Examiner";
import { clsx } from "clsx";

const steps = ["setup", "questions", "preview", "publish"];

const Assignments = () => {
  const [active, setActive] = useState(0);
  const Tabs = () => {
    switch (active) {
      case 0:
        return (
          <div className=" relative border-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            setup
            <button
              onClick={() => setActive((active + 1) % 4)}
              className=" absolute  bottom-2  left-1/2 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Next
            </button>
          </div>
        );
      case 1:
        return (
          <div className=" relative border-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            questions
            <button
              onClick={() => setActive((active + 1) % 4)}
              className=" absolute  bottom-2  left-1/2 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className=" relative border-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            preview
            <button
              onClick={() => setActive((active + 1) % 4)}
              className=" absolute  bottom-2  left-1/2 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div className=" relative border-2 border-black min-h-[calc(100vh-10rem)] w-full max-w-6xl mx-auto rounded my-3 bg-white ">
            publish
            <button
              onClick={() => setActive((active + 1) % 4)}
              className=" absolute  bottom-2  left-1/2 bg-sky-400 px-5 py-2   rounded-full text-white font-bold text-xl "
            >
              Next
            </button>
          </div>
        );
      default:
        return <h1>error </h1>;
    }
  };

  return (
    <Examiner>
      <div>
        <div className=" grid   grid-cols-4">
          {steps.map((x, index) => (
            <div className="   flex  items-center">
              <h1
                onClick={() => setActive(index)}
                className={clsx(
                  "  cursor-pointer border-sky-400 border-2 bg-white px-4 py-1 text-xl rounded-full ",
                  { " font-bold  bg-blue-400 text-white ": index === active }
                )}
                key={index}
              >
                {x}
              </h1>
              {index < 3 && <div className="w-full h-[3px]  bg-sky-400"></div>}
            </div>
          ))}
        </div>
        {Tabs()}
      </div>
    </Examiner>
  );
};

export default Assignments;
