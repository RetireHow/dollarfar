/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PDFDownloadLink } from "@react-pdf/renderer";
import html2canvas from "html2canvas";

interface DownloadModalProps {
  calculatorData: any;
  PdfComponent: React.FC<any>;
  fileName: string;
  id: string;
}

const DownloadModal = ({
  calculatorData,
  PdfComponent,
  fileName,
  id,
}: DownloadModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [base64, setBase64] = useState("");

  const pdfData = {
    ...calculatorData,
    base64,
    name,
    email,
  };

  console.log("I am from modal ========> ", pdfData)

  useEffect(() => {
    const captureChart = async () => {
      const chartId = document.getElementById(id);
      if (chartId) {
        try {
          const canvas = await html2canvas(chartId as HTMLElement);
          const imgData = canvas.toDataURL("image/png");
          setBase64(imgData);
        } catch (error) {
          console.error("Error capturing chart: ", error);
        }
      }
    };
    captureChart();
  }, [isModalOpen, id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowError(false);
    setChecked(false);
    setIsLoading(false);
    setEmail("");
    setName("");
  };

  const handleDownloadPdf = async () => {
    setIsLoading(true);
    if (!checked) {
      return setShowError(true);
    }

    setTimeout(() => {
      console.log("Close the modal");
      setIsModalOpen(false);
      setIsLoading(false);
      setShowError(false);
      setChecked(false);
      setEmail("");
      setName("");
    }, 300);
  };

  const handleValidateCheck = () => {
    if (!checked) {
      return setShowError(true);
    }
  };

  return (
    <>
      <div
        onClick={showModal}
        className="flex items-center gap-2 border-[1px] border-[#0000001A] md:px-[1.25rem] px-[0.5rem] md:py-[10px] py-[8px] rounded-[10px] font-medium md:w-[140px] w-[110px] cursor-pointer"
        data-html2canvas-ignore
      >
        <p>Download</p>
        <Icon className="text-[1.5rem]" icon="material-symbols:download" />
      </div>
      <Modal
        open={isModalOpen}
        closeIcon={false}
        footer={false}
        className="geist"
      >
        <div className="space-y-[1rem]">
          <div className="flex items-center justify-between">
            <h3 className="text-[1.5rem] font-bold">
              Enter your details to reflect on pdf
            </h3>
            <Icon
              onClick={handleCancel}
              className="text-red-500 text-[1.8rem] cursor-pointer"
              icon="material-symbols:close"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className={`p-[0.8rem] border-[1px] border-[#838383] rounded-[8px] outline-none w-full ${checked && 'bg-gray-100 disabled:cursor-not-allowed'}`}
              autoFocus
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              disabled={checked}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="name">
              Email Address
            </label>
            <input
              className={`p-[0.8rem] border-[1px] border-[#838383] rounded-[8px] outline-none w-full ${checked && 'bg-gray-100 disabled:cursor-not-allowed'}`}
              type="email"
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
              disabled={checked}
            />
          </div>
          <div>
            <div
              onClick={() => setChecked(!checked)}
              className="text-[12px] flex items-center gap-1 cursor-pointer select-none"
            >
              {checked ? (
                <Icon className="text-[1.2rem]" icon="mingcute:checkbox-fill" />
              ) : (
                <Icon
                  className="text-[1.2rem]"
                  icon="mdi:checkbox-blank-outline"
                />
              )}
              <span className="text-[#838383]">
                By proceeding, you are agreeing to our
              </span>
              <span>Terms and Conditions & Privacy Policy.</span>
            </div>
            {showError && !checked && (
              <p className="text-red-500 text-[12px] mt-1">
                Please check Terms and Conditions & Privacy Policy
              </p>
            )}
          </div>

          <div>
            {base64 && checked && (
              <PDFDownloadLink
                document={<PdfComponent data={pdfData} />}
                fileName={fileName}
              >
                <button
                  className="text-white w-full rounded-[10px] py-[0.8rem] flex justify-center items-center h-[50px] bg-black"
                  type="button"
                  id="download-pdf"
                  disabled={!checked || isLoading ? true : false}
                  onClick={handleDownloadPdf}
                >
                  {isLoading ? (
                    <Icon
                      className="text-white text-[2rem]"
                      icon="line-md:loading-loop"
                    />
                  ) : (
                    "Download"
                  )}
                </button>
              </PDFDownloadLink>
            )}

            {!checked && (
              <button
                onClick={() => {
                  handleValidateCheck();
                }}
                className="text-white w-full rounded-[10px] py-[0.8rem] flex justify-center items-center h-[50px] bg-black"
              >
                Download
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DownloadModal;
