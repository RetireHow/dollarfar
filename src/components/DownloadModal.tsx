import { useState } from "react";
import { Modal } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useAppSelector } from "../redux/hooks";
import { CIRCPdf } from "../pages/CIRC/CIRCPdf";

const DownloadModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

  const {
    rate,
    time,
    principal,
    frequencyName,
    compoundInterest,
    chartBase64,
  } = useAppSelector((state) => state.compoundInterest);

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
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
              className="p-[0.8rem] border-[1px] border-[#838383] rounded-[8px] outline-none w-full"
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="name">
              Email Address
            </label>
            <input
              className="p-[0.8rem] border-[1px] border-[#838383] rounded-[8px] outline-none w-full"
              type="email"
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
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
            {!checked && (
              <p className="text-red-500 text-[12px] mt-1">
                Please check Terms and Conditions & Privacy Policy
              </p>
            )}
          </div>
          <div className="my-5">
            <PDFDownloadLink
              document={
                <CIRCPdf
                  data={{
                    rate,
                    time,
                    principal,
                    frequencyName,
                    compoundInterest,
                    chartBase64,
                    name,
                    email,
                  }}
                />
              }
              fileName="dynamic_document.pdf"
            >
              <button
                className="bg-black text-white w-full rounded-[10px] py-[0.8rem]"
                type="button"
              >
                Submit
              </button>
            </PDFDownloadLink>
          </div>

          <div>
            <PDFDownloadLink
              document={
                <CIRCPdf
                  data={{
                    rate,
                    time,
                    principal,
                    frequencyName,
                    compoundInterest,
                    chartBase64,
                  }}
                />
              }
              fileName="dynamic_document.pdf"
            >
              <button
                className={`text-white w-full rounded-[10px] py-[0.8rem] ${checked ? 'bg-black' : 'bg-gray-300'}`}
                type="button"
                disabled={checked ? false : true}
              >
                Download
              </button>
            </PDFDownloadLink>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DownloadModal;
