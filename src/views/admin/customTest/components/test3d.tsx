import Card from "components/card/Card";
import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Test3d() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const TestBox = () => {
    const ref = useRef<THREE.Mesh>();
    useFrame((state) => {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    });
    return (
      <mesh ref={ref}>
        <boxBufferGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
    );
  };

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          3D Test
        </Text>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Box>
          <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas style={{ background: "black" }}>
              <TestBox />
            </Canvas>
          </div>
        </Box>
      </Flex>
    </Card>
  );
}
