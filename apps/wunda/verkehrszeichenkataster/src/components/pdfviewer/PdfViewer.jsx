import { useEffect } from "react";
import { pdfBase64Example } from "./pdfbase64example";

const PdfViewer = ({
  filePdf = pdfBase64Example,
  width = "100%",
  height = "750px",
}) => {
  const convertBase64ToUrlLink = (pdfdecoded) => {
    if (filePdf) {
      const removeBase64DataType = pdfdecoded.split(",")[1];
      const byteCharacters = atob(removeBase64DataType);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const file = new Blob([byteArray], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      return fileURL;
    } else {
      return "";
    }
  };

  const urlLink = convertBase64ToUrlLink(filePdf);

  useEffect(() => {
    if (urlLink !== "") {
      URL.revokeObjectURL(urlLink);
    }
  }, []);

  return <iframe title="PDF Viewer" src={urlLink} style={{ width, height }} />;
};

export default PdfViewer;
