import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "antd";
import { useState } from "react";

export default function BCTooltip({ title }: { title: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Icon
        className="text-[#838383] hover:text-black hover:font-extrabold md:min-w-[1.5rem] min-w-[1.2rem] md:min-h-[1.5rem] min-h-[1.2rem] inline-block ml-2 cursor-pointer"
        icon="material-symbols:info-outline"
        onClick={() => showModal()}
      />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={
          <Icon
            className="text-red-500 border-[1px] border-red-500 rounded-sm p-[1px]"
            icon="gridicons:cross"
            width="24"
            height="24"
          />
        }
      >
        <p className="md:text-[1.4rem] text-[1.2rem] text-gray-500 p-3">
          {title}
        </p>
      </Modal>
    </>
  );
}
