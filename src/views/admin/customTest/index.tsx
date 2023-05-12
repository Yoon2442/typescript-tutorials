import { Box, SimpleGrid } from "@chakra-ui/react";
import Test from "./components/test";
import Test3d from "./components/test3d";
export default function CustomTest() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px" mb="20px">
        <Test></Test>
        {/* <Test3d></Test3d> */}
      </SimpleGrid>
    </Box>
  );
}
