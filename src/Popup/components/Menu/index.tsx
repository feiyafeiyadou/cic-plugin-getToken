import React, { useState } from "react";

import { Menu, Space } from "antd";

import Brand from "../../pages/Brand";
import Token from "../../pages/Token";
import Images from "../../pages/Images";
import BasicCode from "../../pages/BasicCode";

import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    label: "手动设置token",
    key: "token",
  },
  {
    label: "获取图片",
    key: "image",
  },
  {
    label: "车辆品牌",
    key: "brand",
  },
  {
    label: "码表查询",
    key: "basicCode",
  },
];

const App: React.FC = () => {
  const [current, setCurrent] = useState("token");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Space direction="vertical">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      {current === "token" ? <Token /> : null}
      {current === "image" ? <Images /> : null}
      {current === "brand" ? <Brand /> : null}
      {current === "basicCode" ? <BasicCode /> : null}
    </Space>
  );
};

export default App;
