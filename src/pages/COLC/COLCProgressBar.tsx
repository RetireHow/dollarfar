import { Progress } from "antd";

export default function COLCProgressBar({value}:{value:number}) {
  return (
    <Progress
      percent={Number(value?.toFixed(2))}
      showInfo={false}
      strokeColor="#4682b4"
      strokeLinecap="butt"
      size={{ height: 20 }}
      className="min-w-[50px]"
    />
  );
}
