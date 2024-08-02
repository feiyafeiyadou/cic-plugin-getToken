import React, { useState } from "react";

import { Button, Input, Radio, Space } from "antd";

import { setLocalStorage, setPCCookie } from "@/Popup/utils";

const Token: React.FC = () => {
  const [text, setText] = useState<string>();
  const [origin, setOrigin] = useState<string>("1");

  return (
    <Space direction="vertical" align="start" style={{ width: "350px" }}>
      <Radio.Group
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        options={[
          { label: "移动端", value: "1" },
          { label: "pc端", value: "2" },
        ]}
      />
      {origin === "1" ? (
        <Space direction="vertical" align="center">
          <Input.TextArea
            placeholder="可手动设置token"
            style={{ width: "350px", height: "100px" }}
            onChange={(e) => {
              const val = e.target.value;
              setText(val);
            }}
          />
          <Button
            type="primary"
            onClick={() => text && setLocalStorage(text.replaceAll(" ", ""))}
          >
            设置token
          </Button>
        </Space>
      ) : (
        <Space direction="vertical">
          <Button onClick={setPCCookie} type="primary">
            一键粘贴token
          </Button>
          <a style={{ fontSize: "12px", color: "#ff4d4f" }}>
            * 不根据插件已选择账户设置token
          </a>
        </Space>
      )}
    </Space>
  );
};

export default Token;
