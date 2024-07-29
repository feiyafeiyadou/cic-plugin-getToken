import React, { useState } from "react";

import { Button, Input, Space } from "antd";

import { setLocalStorage } from "@/Popup/utils";

const Token: React.FC = () => {
  const [text, setText] = useState<string>();

  return (
    <Space direction="vertical" align="center">
      <Input.TextArea
        placeholder="请输入token"
        style={{ width: "350px", height: "100px" }}
        onChange={(e) => {
          const val = e.target.value;
          setText(val);
        }}
      />
      <Button onClick={() => text && setLocalStorage(text.replaceAll(" ", ""))}>
        设置token
      </Button>
    </Space>
  );
};

export default Token;
