import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import RetirementNextStepForm from "./RetirementNextStepForm";

const RetirementNextStepModal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {/* Call-to-Action Section */}
      <div className="max-w-7xl mx-auto mt-8 mb-12 px-4">
        <div className="bg-gradient-to-r from-emerald-500 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex items-center justify-between p-4 md:p-10">
            {/* Text Content */}
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <div className="flex md:flex-row flex-col items-center gap-3 mb-4">
                <Icon
                  icon="mdi:rocket-launch"
                  className="text-white text-2xl"
                />
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Ready to Take the Next Step?
                </h3>
              </div>

              <p className="text-emerald-100 text-lg mb-4 leading-relaxed">
                Your retirement simulation is just the beginning. Let us help
                you turn these projections into a personalized action plan.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-emerald-100">
                  <Icon icon="mdi:check-circle" className="text-lg" />
                  <span>Get personalized retirement strategy</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-100">
                  <Icon icon="mdi:check-circle" className="text-lg" />
                  <span>Explore part-time abroad opportunities</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-100">
                  <Icon icon="mdi:check-circle" className="text-lg" />
                  <span>Optimize your savings and investments</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="md:w-1/3 text-center md:text-right">
              <button
                onClick={showModal}
                className="bg-white text-emerald-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg w-full md:w-auto"
              >
                <div className="flex md:flex-row flex-col items-center justify-center gap-2">
                  <Icon icon="mdi:chart-line" className="text-xl" />
                  Get Personalized Plan
                </div>
                <div className="text-sm text-gray-600 mt-1 font-normal">
                  Free consultation • No obligation
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-center">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <Icon
              icon="mdi:shield-check"
              className="text-green-500 text-2xl mx-auto mb-2"
            />
            <div className="text-sm text-gray-600">Data Protected & Secure</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <Icon
              icon="mdi:clock-outline"
              className="text-blue-500 text-2xl mx-auto mb-2"
            />
            <div className="text-sm text-gray-600">Takes 5-10 Minutes</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <Icon
              icon="mdi:email-fast"
              className="text-purple-500 text-2xl mx-auto mb-2"
            />
            <div className="text-sm text-gray-600">
              Personalized Response in 24h
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title={null}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={null}
        width="90%"
        style={{ maxWidth: "1200px" }}
        bodyStyle={{ padding: 0 }}
        className="retirement-next-step-modal"
        destroyOnClose
        closeIcon={false}
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-[-35px] right-[-35px] z-50 w-8 h-8 bg-red-500 rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            <Icon icon="mdi:close" className="text-white text-lg" />
          </button>

          {/* Form Content */}
          <RetirementNextStepForm setIsModalVisible={setIsModalVisible} />
        </div>
      </Modal>
    </>
  );
};

export default RetirementNextStepModal;
