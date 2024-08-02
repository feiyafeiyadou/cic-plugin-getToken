import { getBasicCode } from "@/services";
import { useRequest } from "ahooks";
import { Button, Input, Space, Form } from "antd";
import React from "react";

const BasicCode: React.FC = () => {
  const [form] = Form.useForm();

  const {
    data: basicCodeInfo,
    runAsync: getCode,
    loading,
  } = useRequest(
    async () => {
      const { basicCode, label, value } = form.getFieldsValue(true);
      const { data } = await getBasicCode({
        typeCodes: [basicCode],
        status: 1,
      });

      const dict = Object.values(data || {});

      if ((label || value) && dict?.length) {
        return dict[0]?.filter(
          (item) =>
            item?.basicCode === value ||
            item?.basicCode?.includes(value) ||
            item?.basicValue === label ||
            item?.basicValue?.includes(label)
        );
      }

      return dict[0];
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
        <Space size="large">
          <Form form={form}>
            <Form.Item label="码表" name="basicCode" required>
              <Input
                type="text"
                size="large"
                style={{ background: "#fff", width: 300 }}
              />
            </Form.Item>

            <Form.Item label="码值code" name="value">
              <Input
                type="text"
                size="large"
                style={{ background: "#fff", width: 300 }}
              />
            </Form.Item>

            <Form.Item label="码值name" name="label">
              <Input
                type="text"
                size="large"
                style={{ background: "#fff", width: 300 }}
              />
            </Form.Item>
          </Form>
        </Space>

        <Button size="large" type="primary" onClick={getCode} loading={loading}>
          获取码值信息
        </Button>
      </Space>

      {basicCodeInfo?.length === 1 ? (
        <span>
          value:{basicCodeInfo?.[0]?.basicValue ?? "-"}; code:{" "}
          {basicCodeInfo?.[0]?.basicCode ?? "-"}
        </span>
      ) : (
        <Space direction="vertical">
          {basicCodeInfo?.map((item) => (
            <Space direction="vertical">
              <span>value:{item?.basicValue ?? "-"}</span>
              <span>code: {item?.basicCode ?? "-"}</span>
            </Space>
          ))}
        </Space>
      )}
    </Space>
  );
};

export default BasicCode;
