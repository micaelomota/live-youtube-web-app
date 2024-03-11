import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useTargets } from "../../context/TargetContext";
import { Flex, List, Progress } from "antd";
import HistoricCard from "../../components/HistoricCard";
import { Target, useTargetEntryQuery } from "../../hooks/useTargets";
import { useAuth } from "../../context/AuthContext";

const TargetDetailScreen = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getTargetById } = useTargets();

  const { isLoading, entries } = useTargetEntryQuery(user!.uid!, id!);

  const target = useMemo(() => {
    return getTargetById(id!);
  }, [id, getTargetById]);

  console.log(target);

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
            dataSource={entries}
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
