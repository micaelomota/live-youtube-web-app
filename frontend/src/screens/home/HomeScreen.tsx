import React from "react";
import { Button, Flex, List, Progress, Space } from "antd";
import { Link } from "react-router-dom";
import { useTargets } from "../../context/TargetContext";
import DeleteButton from "../../components/buttons/deleteButton/DeleteButton";
import { EditOutlined } from "@ant-design/icons";

export const HomeScreen: React.FC = () => {
  const { targets, removeTarget } = useTargets();

  return (
    <Flex vertical gap={30} className="w-full">
      <Space direction="vertical" align="end" className="w-full">
        <Link
          to="/new-target"
          className="py-2 px-3 rounded bg-blue-600 text-white"
        >
          Nova Meta
        </Link>
      </Space>

      <List
        className="w-full"
        size="large"
        bordered
        dataSource={targets}
        renderItem={(item) => (
          <List.Item>
            <Link
              to={`/target/${item.id}`}
              className="w-full hover:opacity-80 transition-all duration-200"
            >
              {item.name}
            </Link>
            <div style={{ float: "right", marginLeft: "10px" }}>
              <Link to="/edit-target" state={item}>
                <Button type="primary" icon={<EditOutlined />} size="small" />
              </Link>
            </div>
            <div style={{ float: "right" }}>
              <DeleteButton onDelete={() => removeTarget(item.id)} />
            </div>
            <Progress
              percent={Math.round((item.currentValue / item.target) * 100)}
              size="small"
            />
            {item.currentValue} / {item.target}
          </List.Item>
        )}
      />
    </Flex>
  );
};
