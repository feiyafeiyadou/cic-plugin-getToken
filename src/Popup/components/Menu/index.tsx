import React, { useState } from "react";

import { Menu } from "antd";

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

const App: React.FC<{ onChange: (key: string) => void }> = (props) => {
  const { onChange } = props;
  const [current, setCurrent] = useState("token");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    onChange(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default App;
