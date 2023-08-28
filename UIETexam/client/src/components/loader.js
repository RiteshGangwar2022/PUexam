import React from "react";
import PuffLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className=" h-full w-full flex justify-center items-center  ">
    <PuffLoader 
    size={80}
       aria-label="Loading Spinner"
       />
    </div>
  );
};

export default Loader;
