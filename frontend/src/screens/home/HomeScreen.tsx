import React from "react";
import {
  Flex,
  List, Progress,
  Space
} from "antd";
import { Link } from "react-router-dom";
import { useTargets } from "../../context/TargetContext";
import DeleteButton from "../../components/buttons/deleteButton/DeleteButton";

export const HomeScreen: React.FC = () => {
  const { targets, removeTarget } = useTargets();


  return (
    <Flex vertical gap={30} className="w-full">
      <Space direction="vertical" align="end" className="w-full">
        <Link to="/new-target" className="py-2 px-3 rounded bg-blue-600 text-white">
          Nova Meta
        </Link>
      </Space>

      <List
      className="w-full"
        size="large"
        bordered
        dataSource={targets}
        renderItem={(item) => (
            <Link 
            to={`/target/${item.id}`} 
            className="w-full hover:opacity-80 transition-all duration-200">
          <List.Item>
            {item.name}
            <div style={{ float: "right" }}>
              <DeleteButton onDelete={() => removeTarget(item.id)} />
            </div>
            <Progress
              percent={Math.round((item.currentValue / item.target) * 100)}
              size="small"
            />
            {item.currentValue} / {item.target}
          </List.Item>
            </Link>
        )}
      />
    </Flex>
  );
};
