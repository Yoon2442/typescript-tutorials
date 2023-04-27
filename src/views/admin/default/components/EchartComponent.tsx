// Chakra imports
import { Box, Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { echartOptions } from "variables/charts";
import ECharts from "echarts-for-react";
import { useState } from "react";
import _ from "lodash";

export default function EchartComponent(props: { [x: string]: any }) {
  const { ...rest } = props;
  const [options, setOptions] = useState(echartOptions);
  const [count,setCount]=useState(0)
  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue({ bg: "secondaryGray.400" }, { bg: "whiteAlpha.50" });
  const bgFocus = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" });

  function onClickCountButton(): void {
    let tempOptions = _.cloneDeep(options);
    tempOptions.series[0].data[3] += 10;
    setOptions(tempOptions);
    setCount(count+10)
    console.log("count", options.series[0].data[3]);
  }

  return (
    <Card justifyContent="center" alignItems="center" flexDirection="column" w="100%" mb="0px" {...rest}>
      <Flex align="center" justify="space-between" w="100%" pe="20px" pt="5px">
        <Button bg={boxBg} fontSize="sm" fontWeight="500" color={textColorSecondary} borderRadius="7px">
          <Icon as={MdOutlineCalendarToday} color={textColorSecondary} me="4px" />
          This month
        </Button>
        <Button
          bg={boxBg}
          ms="auto"
          onClick={() => {
            onClickCountButton();
          }}
          fontSize="sm"
          fontWeight="500"
          color={textColorSecondary}
          borderRadius="7px"
        >
          Count : {count}
        </Button>
        <Button
          ms="auto"
          alignItems="center"
          justifyContent="center"
          bg={bgButton}
          _hover={bgHover}
          _focus={bgFocus}
          _active={bgFocus}
          w="37px"
          h="37px"
          lineHeight="100%"
          borderRadius="10px"
          {...rest}
        >
          <Icon as={MdBarChart} color={iconColor} w="24px" h="24px" />
        </Button>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Box minH="260px" minW="100%" mt="auto">
          <ECharts option={options} opts={{ renderer: "svg", width: "auto", height: "auto" }} />
        </Box>
      </Flex>
    </Card>
  );
}
