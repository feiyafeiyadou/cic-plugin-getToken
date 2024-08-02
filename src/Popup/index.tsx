import { useEffect, useMemo, useState } from "react";
import { useRequest } from "ahooks";

import { Space, Button, Select } from "antd";

import Menu from "./components/Menu";

import { type LabelInValue, PersonOption, setLocalStorage } from "./utils";

import { getToken } from "@/services";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<LabelInValue>();

  const { value: userId, label: userName } = useMemo(() => {
    return JSON.parse(localStorage.getItem("userInfo") ?? "{}");
  }, []);

  useEffect(() => {
    setCurrentUser({
      label: userName ?? "余利飞 - 3397210042",
      value: userId ?? "3397210042",
    });
  }, [userId, userName]);

  const { loading: getTokenLoading, run } = useRequest(
    async () => await getToken({ userId: currentUser?.value! }),
    {
      manual: true,
      onSuccess: (data) => {
        const token = JSON.stringify({
          key: "cic-htoken",
          value: data.data,
          expires: 86400000,
        });
        console.log("data", data);
        localStorage.setItem("token", token);

        setLocalStorage(token);
      },
    }
  );

  return (
    <Space
      size="large"
      style={{ width: "100%", marginTop: "1rem" }}
      align="center"
      direction="vertical"
    >
      {currentUser ? (
        <Space style={{ fontSize: 16 }}>
          <span style={{ fontSize: "14px" }}>切换账户</span>

          <Select
            style={{ width: "190px" }}
            value={currentUser}
            options={PersonOption}
            onChange={(value) => {
              localStorage.setItem("userInfo", JSON.stringify(value));

              setCurrentUser(value);
            }}
            labelInValue
          />

          <Button
            type="link"
            onClick={run}
            loading={getTokenLoading}
            disabled={!currentUser?.value}
            danger
          >
            重新获取
          </Button>
        </Space>
      ) : null}

      <Menu />
    </Space>
  );
};

export default App;
