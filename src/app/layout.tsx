import { Metadata } from "next";
import "@/styles/index.css";
import { quicksand } from "@/fonts";
import { Toaster } from "react-hot-toast";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import AuthModal from "@/components/modals/AuthModal";
import AuthProvider from "@/providers/AuthProvider";
import AddToCartModal from "@/components/modals/AddToCartModal";
import OrderSuccessModal from "@/components/modals/OrderSuccessModal";
import ConfirmLogoutModal from "@/components/modals/ConfirmLogoutModal";

export const metadata: Metadata = {
  title: {
    template: "%s | Smart Fashion",
    default: "Smart Fashion",
  },
  description: "A custom dress making website",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${quicksand.className} bg-light antialiased`}>
        <AuthProvider>
          {children}

          <AuthModal />
          <AddToCartModal />
          <OrderSuccessModal />
          <ConfirmDeleteModal />
          <ConfirmLogoutModal />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
