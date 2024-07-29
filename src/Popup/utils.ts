import { message } from "antd";

export interface LabelInValue {
  label: string;
  value: string;
}

export const PersonOption: LabelInValue[] = [
  {
    value: "3397210042",
    label: "余利飞 - 3397210042",
  },
  {
    value: "1010001079",
    label: "万爱云 - 1010001079",
  },
];

export function setLocalStorage(token: string) {
  window.chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs: any) {
      const [currentTab] = tabs ?? [];
      const { id } = currentTab ?? {};

      window.chrome.tabs.sendMessage(
        id,
        { token, tabId: id },
        function (response: boolean) {
          if (response) {
            message.success(`toke粘贴成功!`);
          } else {
            message.error(`粘贴token失败，请刷新页面重试!`);
          }

          console.log("response", response, currentTab);
        }
      );
    }
  );
}
