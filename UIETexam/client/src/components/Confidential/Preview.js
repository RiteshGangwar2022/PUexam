import React, { useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import Confidential from "./Confidential";

const Preview = () => {
  const [url, setUrl] = useState("");
  const onChange = (e) => {
    const files = e?.target?.files;
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
      };
  return (
    <Confidential>
        {/* <input
                type="file"
                className=" border-2   opacity-0  h-60 cursor-pointer"
                accept=".pdf"
                onChange={onChange}
              /> */}
      <div className="   items-center flex justify-center ">
        {url && (
          <div className=" max-h-[700px]  border  mb-20 border-neutral-600 overflow-y-auto  w-3/4">
            <Viewer fileUrl={url} />
          </div>
        )}
      </div>
    </Confidential>
  );
};

export default Preview;
