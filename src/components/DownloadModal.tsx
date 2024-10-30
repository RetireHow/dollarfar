import { FormEvent, useState } from "react";
import { Modal } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { generatePDF } from "./generatePdf";
import { generatePDFWithoutDetails } from "./generatePDFWithoutDetails";

const DownloadModal = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!checked) {
      return setShowError(true);
    }
    generatePDF(name, email, id);
    setIsModalOpen(false);
  };

  const handleDownload = (e: FormEvent) => {
    e.preventDefault();
    if (!checked) {
      return setShowError(true);
    }
    generatePDFWithoutDetails(id);
    setIsModalOpen(false);
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
            {showError && !checked && (
              <p className="text-red-500 text-[12px] mt-1">
                Please check Terms and Conditions & Privacy Policy
              </p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-black text-white w-full rounded-[10px] py-[0.8rem]"
            type="button"
          >
            Submit
          </button>
          <button
            onClick={handleDownload}
            className="bg-black text-white w-full rounded-[10px] py-[0.8rem]"
            type="button"
          >
            Download
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DownloadModal;
