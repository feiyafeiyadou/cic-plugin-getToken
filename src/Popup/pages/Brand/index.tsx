import {
  getJySubBrandInfoByCode,
  getJySubBrandInfoByFuzzyQuery,
} from "../../../services";
import { useRequest } from "ahooks";
import { Button, Input, Radio, RadioChangeEvent, Space } from "antd";
import React, { useState } from "react";

const Brand: React.FC = () => {
  const [brandCode, setBrandCode] = useState<string>("");
  const [value, setValue] = useState<string>("1");

  // const [fileStatus, setFileStatus] = useState<{
  //   visible: boolean;
  //   fileUrl: string;
  // }>({
  //   visible: false,
  //   fileUrl: "",
  // });

  const {
    data: brandInfo,
    runAsync: getBrandInfo,
    loading,
  } = useRequest(
    async () => {
      const { data } = await getJySubBrandInfoByCode({ subBrandId: brandCode });
      return data;
    },
    { manual: true }
  );

  const {
    data: subBrandInfo,
    runAsync: getSubBrandInfo,
    loading: queryLoading,
  } = useRequest(
    async () => {
      const { data } = await getJySubBrandInfoByFuzzyQuery({
        subBrand: brandCode,
      });
      return data;
    },
    { manual: true }
  );

  return (
    <Space
      direction="vertical"
      align="center"
      style={{ width: "100%", justifyContent: "center" }}
    >
      <Space direction="vertical" align="center" size="large">
        <Space direction="vertical">
          <Radio.Group
            value={value}
            onChange={({ target: { value } }: RadioChangeEvent) => {
              setValue(value);
            }}
            options={[
              { label: "根据品牌名称查询", value: "1" },
              { label: "根据品牌code查询", value: "2" },
            ]}
          />
          <Space align="center" size="large">
            <Input
              type="text"
              size="large"
              onChange={(event) => setBrandCode(event.target.value)}
              style={{ background: "#fff", width: 300 }}
            />
            <Button
              size="large"
              color="primary"
              onClick={value === "2" ? getBrandInfo : getSubBrandInfo}
              loading={loading || queryLoading}
            >
              获取品牌
            </Button>
          </Space>
        </Space>

        {value === "2" ? (
          <span>品牌：{brandInfo?.subBrand ?? "-"}</span>
        ) : (
          <Space direction="vertical" align="center">
            {subBrandInfo?.map((item) => {
              return (
                <Space align="center">
                  <span>品牌：{item.subBrand}</span>
                  <span>品牌code：{item.subBrandId ?? "-"}</span>
                </Space>
              );
            })}
          </Space>
        )}
      </Space>
    </Space>
  );
};

export default Brand;
