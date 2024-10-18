import siteLogo from "../assets/Dollar-logo.svg";
export default function Header() {
  return (
    <div
      style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)" }}
      className="md:px-[5rem] px-[1rem] py-[0.3rem]"
    >
      <img src={siteLogo} alt="" />
    </div>
  );
}
