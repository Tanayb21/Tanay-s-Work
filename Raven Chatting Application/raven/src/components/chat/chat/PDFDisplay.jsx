import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import axios from "axios";

function PDFDisplay({ url }) {
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    axios
      .get(url, { responseType: "arraybuffer" })
      .then((response) => {
        setPdfData(new Uint8Array(response.data));
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  }, [url]);

  return (
    <div>
      {pdfData ? (
        <Document file={{ data: pdfData }}>
          <Page pageNumber={1} width={200} />
        </Document>
      ) : (
        <div>Loading PDF...</div>
      )}
    </div>
  );
}

export default PDFDisplay;
