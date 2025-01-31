export default function MandatoryUserHints() {
  return (
    <p className="text-gray-700 text-[14px] border-b-[1px] pb-1 border-gray-300">
      Answers to fields and questions with an asterisk ({" "}
      <span className="text-red-500 font-bold text-[1.2rem]">*</span> ) are
      mandatory.
    </p>
  );
}
