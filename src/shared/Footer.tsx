export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-black md:text-[1.3rem] text-[1rem] text-center md:py-8 py-5 px-3 text-white"
    >
        (c) Copyright All rights reserved by Retirehow? Inc{" "}
        {new Date().getFullYear()}
    </footer>
  );
}
