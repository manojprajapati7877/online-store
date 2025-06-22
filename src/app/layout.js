import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Online Store",
  description: "Your e-commerce shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
