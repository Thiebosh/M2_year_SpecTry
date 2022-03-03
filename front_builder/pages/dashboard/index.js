import requireAuth from "../../middleware/requireAuth";
import {
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import $ from "jquery";
import dayjs from "dayjs";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    $.ajax({
      url: "http://localhost:8001/project/search_by_user",
      type: "POST",
      data: {
        id: user.id,
      },
      success: function (res) {
        setProjects(res.result);
      },
      error: function (error) {
        console.log(error);
      },
    });
  }, []);

  return (
    <Container
      maxW={"container.xls"}
      bg={useColorModeValue("gray.50", "gray.800")}
      py={4}
    >
      <Heading mb={6}>Dashboard</Heading>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem
          colSpan={3}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Heading size={"lg"} mb={2}>
            Projects
          </Heading>
          <Text mb={4}>Number of projects : {projects.length}</Text>
          <Link href={"/projects"}>
            <Button colorScheme={"blue"}>All projects &rarr;</Button>
          </Link>
        </GridItem>
        <GridItem
          colSpan={3}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Heading size={"lg"} mb={2}>
            Account
          </Heading>
          <Text mb={4}>
            Username : {projects.length && projects[0].users[0].name}
          </Text>
          <Link href={"/projects"}>
            <Button colorScheme={"blue"}>All accounts &rarr;</Button>
          </Link>
        </GridItem>
      </Grid>
    </Container>
  );
}

export const getServerSideProps = requireAuth;
