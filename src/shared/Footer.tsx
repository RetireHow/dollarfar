export default function Footer() {
  return (
    <footer id="footer" className="flex justify-between items-center text-gray-800 px-[1.5rem] py-[12px] bg-gray-100 max-w-[1300px]">
      <div>Dollarfar.com</div>
      <div>Copyright © {new Date().getFullYear()} - Dollarfar</div>
    </footer>
  );
}
