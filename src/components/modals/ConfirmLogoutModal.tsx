"use client";

import useModalById from "@/hooks/useModalById";
import Button from "../ui/Button";
import Modal from "./Modal";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "next-auth/react";

const ConfirmLogoutModal = () => {
  const { closeModal } = useModalById("confirmLogoutModal");

  const handleLogout = () => {
    closeModal();
    signOut({ callbackUrl: "/" });
  };

  return (
    <Modal
      modalId="confirmLogoutModal"
      containerClasses="!max-w-sm py-6 px-4 sm:p-8"
    >
      <LuLogOut className="mb-4 mx-auto text-4xl" />

      <p className="text-center text-dark-light">
        Are you sure you want to log out?
      </p>

      <div className="mt-5 flex flex-row gap-3">
        <Button
          onClick={closeModal}
          variant="dark-outline"
          className="w-full text-sm sm:text-base"
        >
          Cancel
        </Button>

        <Button
          onClick={handleLogout}
          variant="primary"
          className="w-full text-sm sm:text-base"
        >
          Logout
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmLogoutModal;
