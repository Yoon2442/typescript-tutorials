import React, { useRef } from "react";
import Card from "components/card/Card";
import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";
import * as THREE from "three";
import { Canvas, useFrame, extend, useThree, ReactThreeFiber } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

export default function Test3d() {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const Box3D = (props: any) => {
    const ref = useRef<THREE.Mesh>();
    useFrame((state) => {
      if (ref.current) {
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;
      }
    });
    return (
      <mesh ref={ref} {...props} castShadow receiveShadow>
        <boxBufferGeometry />
        <meshPhysicalMaterial color="blue" />
      </mesh>
    );
  };

  const Orbit = () => {
    const { camera, gl } = useThree();
    return <orbitControls args={[camera, gl.domElement]} />;
  };
  const Floor = (props: any) => {
    const ref = useRef<THREE.Mesh>();
    useFrame((state) => {
      if (ref.current) {
        ref.current.rotation.x = Math.PI * -0.5;
      }
    });
    return (
      <mesh {...props} receiveShadow>
        <planeGeometry args={[0.3]} />
        <meshPhongMaterial emissive="gray" />
      </mesh>
    );
  };
  const Sun = (props: any) => {
    return (
      <mesh {...props}>
        <pointLight castShadow />
        <sphereBufferGeometry args={[0.3]} />
        <meshPhongMaterial emissive="yellow" />
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
            <Canvas shadows style={{ background: "black" }} camera={{ position: [3, 3, 3] }}>
              <Sun position={[0, 3, 0]} />
              <Floor  />
              <pointLight />
              <ambientLight intensity={0.2} />
              <Box3D />
              <axesHelper args={[5]} />
              <Orbit />
            </Canvas>
          </div>
        </Box>
      </Flex>
    </Card>
  );
}
