import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import $ from "jquery";
import requireAuth from "../../components/utils/requireAuth";

export default function Settings({ user }) {
  const toast = useToast();
  const renameInput = useRef();
  const projectID = "621f800a3be54c21de916f1e";

  const handleSubmit = (e) => {
    e.preventDefault();
    $.ajax({
      url: "http://localhost:8001/project/update",
      type: "POST",
      data: {
        id: projectID,
        name: renameInput.current.value,
      },
      success: function (resp) {
        toast({
          title: "Project renamed",
          description: "Name : " + renameInput.current.value,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        console.log(resp);
      },
      error: function () {
        toast({
          title: "Error",
          description: "Name : " + renameInput.current.value + "invalid",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log("failure");
      },
    });
  };

  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box
        mx={"auto"}
        maxW={"lg"}
        w={"100%"}
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <Heading fontSize={"4xl"} align={"center"} mb={4}>
            Settings
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="rename">Rename</FormLabel>
              <Input id="name" type="text" ref={renameInput} />
            </FormControl>
            <Center>
              <Button
                mt={6}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type={"submit"}
              >
                Save
              </Button>
            </Center>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
}

export const getServerSideProps = requireAuth;
