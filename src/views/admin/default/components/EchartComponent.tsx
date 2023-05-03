// Chakra imports
import { Box, Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { echartOptions } from "variables/charts";
import ECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import _ from "lodash";
import { atom, useAtom } from "jotai";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getMeasurementInformation } from "api/ArpltnInforInqireSvc";

export const optionsAtom = atom(echartOptions);
export const countAtom = atom(0);
const queryClient = new QueryClient();

export default function EchartComponent(props: { [x: string]: any }) {
  const { ...rest } = props;

  // react
  // const [options, setOptions] = useState(echartOptions);
  // const [count, setCount] = useState(0);

  // jotai
  const [options, setOptions] = useAtom(optionsAtom);
  const [count, setCount] = useAtom(countAtom);

  // Chakra Color Mode
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue({ bg: "secondaryGray.400" }, { bg: "whiteAlpha.50" });
  const bgFocus = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" });
  const chartFontColor = useColorModeValue("secondaryGray.600", "white");

  function onClickMinusCountButton(): void {
    let tempOptions = _.cloneDeep(options);
    tempOptions.series[0].data[3] -= 10;
    setOptions(tempOptions);
    setCount(count - 10);
    console.log("count", options.series[0].data[3]);
  }

  function onClickPlusCountButton(): void {
    let tempOptions = _.cloneDeep(options);
    tempOptions.series[0].data[3] += 10;
    setOptions(tempOptions);
    setCount(count + 10);
    console.log("count", options.series[0].data[3]);
  }

  const fetchMeasurementInformation = async () => {
    const testInformation = await getMeasurementInformation("종로구", "month", 1, 100);
    console.log(testInformation)
  };

  useEffect(() => {
    let tempOptions = _.cloneDeep(options);
    tempOptions.series[0].markArea.label.color = chartFontColor;
    tempOptions.title.subtextStyle.color = chartFontColor;
    tempOptions.xAxis.axisLabel.color = chartFontColor;
    tempOptions.yAxis.axisLabel.color = chartFontColor;
    setOptions(tempOptions);
  }, [chartFontColor]);

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
            onClickMinusCountButton();
          }}
          fontSize="sm"
          fontWeight="500"
          color={textColorSecondary}
          borderRadius="7px"
        >
          Count -
        </Button>
        <Button bg={boxBg} ms="auto" fontSize="sm" fontWeight="500" color={textColorSecondary} borderRadius="7px">
          Count : {count}
        </Button>
        <Button
          bg={boxBg}
          ms="auto"
          onClick={() => {
            onClickPlusCountButton();
          }}
          fontSize="sm"
          fontWeight="500"
          color={textColorSecondary}
          borderRadius="7px"
        >
          Count +
        </Button>
        <Button
          bg={boxBg}
          ms="auto"
          onClick={() => {
            fetchMeasurementInformation();
          }}
          fontSize="sm"
          fontWeight="500"
          color={textColorSecondary}
          borderRadius="7px"
        >
          Get measurement information
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
