import React from "react";
import {
  Breadcrumb,
  Button,
  Layout,
  List,
  Menu,
  Progress,
  Space,
  theme,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTargets } from "../../context/TargetContext";

const { Header, Content, Footer } = Layout;

// const items = new Array(15).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));

export const HomeScreen: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const { targets } = useTargets();

  const onClickNewTarget = () => {
    navigate("/new-target");
  };

  return (
    <Space align="end" direction="vertical">
      <Button onClick={onClickNewTarget} icon={<PlusOutlined />} type="primary">
        Nova Meta
      </Button>

      <List
        size="small"
        // header={<div>Metas</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={targets}
        renderItem={(item) => (
          <List.Item>
            {item.name}
            <Progress
              percent={Math.round((item.currentValue / item.target) * 100)}
              size="small"
            />
            {item.currentValue} / {item.target}
          </List.Item>
        )}
      />
    </Space>
  );
};
