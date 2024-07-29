import { request } from "./request";

import type { Response, ResponseBody } from "@cic/common-request";

export interface UploadDocImageResponseDTO<T = any> {
  serialnumber: string;
  fileId: string;
  filename: string;
  fileName: string;
  ocrSuccess: string;
  fileThumbnailUrl: string;
  fileUrl?: string;
  url: string;
  object: T;
  size?: number;
}

export interface BasicTypeDTO {
  type: string;
  typeName: string;
  list: BasicCodeDTO[];
}

export interface BasicCodeDTO {
  typeCode: string;
  basicCode: string;
  basicValue: string;
  parentCode: string;
  isValid: number;
}

export type QueryCodesByTypesParams = {
  typeCodes: string[];
  status?: 0 | 1;
};

export const getUploadedImage = async (
  params: any
): Promise<Response<UploadDocImageResponseDTO[]>> => {
  return request(
    "http://pqxgodgkpk8kpgic.apigateway.ant-test.res.cloud.cic.inter/platform/api/agrexe/aicic/rest/fileSupportService/v1/getByFileId",
    {
      data: params,
      method: "POST",
    }
  );
};

export const getToken = async (params: { userId: string }) => {
  return request<Response<string>>(
    "http://10.207.137.197:8780/platform/api/wecom/getLoginToken",
    {
      params,
      method: "GET",
    }
  );
};
// http://192.168.137.109:8000

export const getJySubBrandInfoByCode = async (params: any) => {
  return request<
    Response<{ subBrand: string; subBrandId: string; source: string }>
  >(
    "http://pqxgodgkpk8kpgic.apigateway.ant-test.res.cloud.cic.inter/vm/getJySubBrandInfoByCode",
    {
      data: params,
      method: "POST",
    }
  );
};

// 模糊查询车辆品牌
export async function getJySubBrandInfoByFuzzyQuery(data: {
  subBrand: string;
}) {
  return request<
    Response<{ subBrand: string; subBrandId: string; source: string }[]>
  >(
    "http://pqxgodgkpk8kpgic.apigateway.ant-test.res.cloud.cic.inter/vm/getJySubBrandInfoByFuzzyQuery",
    { method: "POST", data }
  );
}

export async function getBasicCode(data: QueryCodesByTypesParams) {
  return request<ResponseBody<Record<string, BasicCodeDTO[]>>>(
    "http://pqxgodgkpk8kpgic.apigateway.ant-test.res.cloud.cic.inter/platform/api/aboss/basic-code/front/query-codes-by-types",
    {
      method: "POST",
      data,
    }
  );
}
