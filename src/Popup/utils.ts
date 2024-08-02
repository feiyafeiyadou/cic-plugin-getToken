import { message } from "antd";

interface Tab {
  active: boolean;
  audible: boolean;
  autoDiscardable: true;
  discarded: boolean;
  favIconUrl: string;
  groupId: number;
  height: number;
  highlighted: boolean;
  id: number;
  incognito: boolean;
  index: number;
  lastAccessed: number;
  mutedInfo: { muted: boolean };
  pinned: boolean;
  selected: boolean;
  status: string;
  title: string;
  url: string;
  width: number;
  windowId: number;
}
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
    function (tabs: Tab[]) {
      const [currentTab] = tabs ?? [];
      const { id } = currentTab ?? {};

      window.chrome.tabs.sendMessage(
        id,
        {
          type: "set-mobile-localStroage",
          data: { token },
          response: true,
        },
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

export function setPCCookie() {
  window.chrome.tabs.query({}, function (tabs: Tab[]) {
    console.log(tabs);
    const findCutrentEnvPage = tabs?.find((item) =>
      /^(http|https):\/\/10\.207\.137\.204.*/.test(item.url)
    );

    if (findCutrentEnvPage) {
      const { url } = findCutrentEnvPage ?? {};

      // https://18055975947.github.io/extension/api/cookies.html
      window.chrome.cookies.get(
        { url, name: "cic-ctoken" },
        (cookies: { domin: string; value: string }) => {
          console.log("cookies", cookies);
          if (cookies) {
            window.chrome.tabs.query(
              { active: true, currentWindow: true },
              function (tabs: Tab[]) {
                const [currentTab] = tabs ?? [];
                const { url } = currentTab ?? {};

                window.chrome.cookies.set(
                  { url, name: "cic-ctoken", value: cookies.value },
                  () => {
                    message.success(`toke粘贴成功!`);
                  }
                );
              }
            );
          } else {
            message.error(`toke粘贴失败，请确认pt环境cookie有效`);
          }
        }
      );
    }
  });
}
