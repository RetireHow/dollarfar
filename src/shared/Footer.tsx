export default function Footer() {
  return (
    <footer id="footer" className="flex justify-between items-center text-gray-500">
      <div>Copyright © {new Date().getFullYear()} - Dollarfar</div>
      <div>Terms & Services | Privacy Policy</div>
    </footer>
  );
}
