import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import $ from "jquery";

export default function ProjectCreateModal({ isOpen, setIsOpen, user }) {
  const toast = useToast();
  const nameInput = useRef();

  const handleSave = () => {
    console.log(user);
    $.ajax({
      url: "http://localhost:8001/project/create",
      type: "POST",
      data: {
        name: nameInput.current.value,
        user_id: user.id,
      },
      success: function (resp) {
        toast({
          title: "Project created",
          description: "Name : " + nameInput.current.value,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        handleClose();
      },
      error: function (error) {
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(error);
      },
    });
  };

  function handleClose() {
    nameInput.current.value = "";
    setIsOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new project</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl isRequired>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" type="text" ref={nameInput} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
