import { Center, Spinner, Modal, ModalOverlay } from "@chakra-ui/react";
import React from "react";

export const Loader = ({ showLoader }) => {
  if (!showLoader) {
    return <></>;
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={showLoader}
      onClose={() => {}}
      isCentered
    >
      <ModalOverlay />
      <Center>
        <Spinner color="teal" size="xl" />
      </Center>
    </Modal>
  );
};
