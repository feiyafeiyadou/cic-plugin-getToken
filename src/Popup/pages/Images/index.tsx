import { getUploadedImage } from "@/services";
import { useRequest } from "ahooks";
import { Button, Input, Space, Image } from "antd";
import React, { useState } from "react";

const Images: React.FC = () => {
  const [fileId, setField] = useState<string>("");

  const {
    data: fileInfo,
    runAsync: getFileInfo,
    loading,
  } = useRequest(
    async () => {
      const { data } = await getUploadedImage([
        fileId.replaceAll(/[' '|\.]/gi, ""),
      ]);
      const [imageInfo] = data ?? [];
      return {
        fileUrl: imageInfo?.fileUrl ?? "",
        fileThumbnailUrl: imageInfo?.fileThumbnailUrl,
      };
    },
    { manual: true }
  );
  return (
    <Space direction="vertical" align="center">
      <Input
        type="text"
        placeholder="请输入fileId"
        onChange={(event) => setField(event.target.value)}
        style={{ background: "#fff", width: 300 }}
      />

      <Button
        size="large"
        type="primary"
        onClick={getFileInfo}
        loading={loading}
        block
      >
        获取图片
      </Button>

      {!!fileId && !!fileInfo?.fileThumbnailUrl ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <span>缩略图⬇️</span>
          <Image width={300} src={fileInfo.fileThumbnailUrl} />
        </Space>
      ) : null}

      {!!fileId && !!fileInfo?.fileUrl ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <span>正常图片⬇️</span>
          <Image width={300} src={fileInfo.fileUrl} />
        </Space>
      ) : null}
    </Space>
  );
};

export default Images;
