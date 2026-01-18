// components/layout/Footer.tsx
const Footer = () => {
  return (
    <footer className="border-t py-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} QuantumPay. All rights reserved.
    </footer>
  );
};

export default Footer;
