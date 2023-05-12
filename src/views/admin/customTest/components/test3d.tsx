import React, { useRef } from "react";
import Card from "components/card/Card";
import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

export default function Test3d() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const Box3D = () => {
    const ref = useRef<THREE.Mesh>();
    useFrame((state) => {
      if (ref.current) {
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;
      }
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
          <div style={{ width: "100%", height: "100%" }}>
            <Canvas style={{ background: "black" }}>
              <Box3D />
            </Canvas>
          </div>
        </Box>
      </Flex>
    </Card>
  );
}
