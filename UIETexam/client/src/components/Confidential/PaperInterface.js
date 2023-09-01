import React, { useState, useEffect } from "react";
import Assigne from "../assigne/Assigne";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Confidential from "./Confidential";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const PaperInterface = () => {
  const [document, setDocument] = useState();
  const [numPages, setNumPages] = useState(1);
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <Confidential>
        <div className=" flex   justify-center items-center flex-col">

      <h1 className=" text-xl  text-red-600 my-3 ">Paper view</h1>
      <Document
        file={document}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        loading="Loading PDF…"
        >
        {Array.from(new Array(numPages), (el, index) => (
            <Page width={800} key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
      </Document>
            </div>
    </Confidential>
  );
};

export default PaperInterface;
