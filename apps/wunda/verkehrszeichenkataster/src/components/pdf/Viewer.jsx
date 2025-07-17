import { PDFViewer, usePDF } from "@react-pdf/renderer";
import Document from "./Document";
import ExternalTemplate from "./ExternalTemplate";

const Viewer = () => {
  const [instance, updateInstance] = usePDF({
    document: <ExternalTemplate />,
  });

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <PDFViewer className="h-full w-full">
        <ExternalTemplate />
      </PDFViewer>
      <a href={instance.url} download="test.pdf">
        Download
      </a>
    </div>
  );
};

export default Viewer;
