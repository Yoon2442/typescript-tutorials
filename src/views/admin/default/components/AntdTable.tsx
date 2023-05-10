import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { Table, ConfigProvider, theme } from "antd";
import { useState, useEffect } from "react";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { getInformationnByCity } from "api/ArpltnInforInqireSvc";
import "assets/css/AntdTable.css";
export default function AntdTable() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const backGroundColor = useColorModeValue("white", "#0b1437");
  const chartTheme = useColorModeValue(false, true);
  const columns = [
    {
      title: "Data Time",
      dataIndex: "dataTime",
      key: "dataTime",
    },
    {
      title: "City",
      dataIndex: "sidoName",
      key: "sidoName",
    },
    {
      title: "Station Name",
      dataIndex: "stationName",
      key: "stationName",
    },
    {
      // title: `미세먼지 농도 (단위 : ㎍/㎥)`,
      title: () => {
        return (
          <>
            미세먼지 농도 PM<sub>10</sub> (단위 : ㎍/㎥)
          </>
        );
      },
      dataIndex: "pm10Value",
      key: "pm10Value",
    },
  ];
  const [dataSource, setDataSource] = useState([]);

  const { defaultAlgorithm, darkAlgorithm } = theme;

  const fetchMeasurementInformation = async () => {
    const tempDataSource = await getInformationnByCity("서울", 1, 100);
    console.log(tempDataSource);
    setDataSource(tempDataSource.response.body.items);
  };

  useEffect(() => {
    fetchMeasurementInformation();
  }, []);

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <ConfigProvider
        theme={{
          algorithm: chartTheme ? darkAlgorithm : defaultAlgorithm,
          token: { colorPrimary: textColor, colorBgBase: backGroundColor },
        }}
      >
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
            미세먼지 현황
          </Text>
          <Menu />
        </Flex>
        <Box>
          <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
        </Box>
      </ConfigProvider>
    </Card>
  );
}
