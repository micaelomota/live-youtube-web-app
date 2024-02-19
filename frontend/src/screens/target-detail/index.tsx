import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { TargetProps, useTargets } from "../../context/TargetContext";
import { Flex, List, Progress } from "antd";
import HistoricCard from "../../components/HistoricCard";

const TargetDetailScreen = () => {
  const { id } = useParams();
  const [target, setTarget] = React.useState<TargetProps>();
  const { getTargetById } = useTargets();

  useEffect(() => {
    const target = getTargetById(Number(id));

    setTarget(target);
  }, [id, getTargetById]);

  return (
    <Flex vertical>
      <h1>{target?.name}</h1>
      {target && (
        <Progress
          percent={Math.round((target.currentValue / target.target) * 100)}
          size="small"
        />
      )}
      {target && (
        <Flex vertical>
          <Flex align="center" justify="space-between">
            <h2 className="text-xl font-semibold">Historicos</h2>
            <Link to={`/target/${target.id}/new-entry`}>
              Adicionar Historico
            </Link>
          </Flex>
          <List
            size="small"
            dataSource={target?.entries}
            renderItem={(item) => (
              <HistoricCard {...item} unit={target.unity} />
            )}
          ></List>
        </Flex>
      )}
    </Flex>
  );
};

export default TargetDetailScreen;
