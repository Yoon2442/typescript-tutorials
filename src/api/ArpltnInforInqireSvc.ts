import api, { serviceKey } from "./apiConfig";

export const getUsers = async (): Promise<any> => {
  const response = await api.get("/users");
  return response.data;
};

export const getMeasurementInformation = async (
  stationName: string,
  dataTerm: string,
  pageNo: number,
  numOfRows: number
): Promise<any> => {
  const response = await api.get(
    `/getMsrstnAcctoRltmMesureDnsty?stationName=${stationName}&dataTerm=${dataTerm}&pageNo=${pageNo}&numOfRows=${numOfRows}&returnType=json&serviceKey=${serviceKey}`
  );
  return response.data;
};

export const getInformationnByCity = async (
  sidoName: string,
  pageNo: number,
  numOfRows: number
): Promise<any> => {
  const response = await api.get(
    `/getCtprvnRltmMesureDnsty?sidoName=${sidoName}&pageNo=${pageNo}&numOfRows=${numOfRows}&returnType=json&serviceKey=${serviceKey}`
  );
  return response.data;
};
