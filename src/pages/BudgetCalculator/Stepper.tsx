import React from "react";
import type { StepsProps } from "antd";
import { Steps, Typography } from "antd";

const customDot: StepsProps["progressDot"] = (dot, {index }) => (
  <Typography
  className="border-[1px] border-gray-500 rounded-full w-[30px] h-[30px] flex justify-center items-center font-medium text-[1.2rem]"
  >
    {index + 1}
  </Typography>
);

const Stepper: React.FC = () => (
  <Steps
    className="mb-[3rem]"
    current={1}
    percent={0}
    progressDot={customDot}
    items={[
      {
        title: "",
      },
      {
        title: "",
      },
      {
        title: "",
      },
      {
        title: "",
      },
    ]}
  />
);

export default Stepper;
