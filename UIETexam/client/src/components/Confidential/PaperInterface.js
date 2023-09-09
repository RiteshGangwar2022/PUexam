import React, { useState, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Confidential from "./Confidential";
import { MdDone, MdQuestionMark } from "react-icons/md";

const PaperInterface = () => {
  return (
    <Confidential>
      <div className=" flex   justify-center items-center flex-col">
        <h1 className=" text-center text-3xl mb-3 font-bold ">
          Assignment Status
        </h1>
        <div className="bg-white w-full rounded mt-2 p-3 flex flex-col">
          <h1 className=" text-xl">
            Examiners who have been assigned this assignment :-
          </h1>

          <div className=" p-3 border-[1px]  my-3 overflow-y-auto w-full max-w-lg ">
            <div className="flex  my-2  bg-neutral-100 px-2  items-center   gap-5">
              <div className=" text-xl">1.</div>
              <div className="flex-grow py-[0.2669rem] rounded-md">
                <p className=" text-xl  ">name</p>
              </div>
              <div className="ml-10 mr-4">
                {1 === 0 ? (
                  <MdQuestionMark className="  fill-red-500 border text-3xl rounded-full bg-white p-1 " />
                ) : (
                  <MdDone className="fill-green-500 border text-3xl rounded-full bg-white p-1 " />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Confidential>
  );
};

export default PaperInterface;
