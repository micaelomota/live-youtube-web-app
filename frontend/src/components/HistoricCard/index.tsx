import { Flex, List } from "antd";
import { convertDate } from "../../utils/convertDate";

interface HistoricCardProps {
  date: string;
  notes?: string;
  unit: string;
  value: number;
}
const HistoricCard = ({ date, value, unit, notes }: HistoricCardProps) => {
  const dateFormated = convertDate(date.toString());
  return (
    <List.Item>
      <Flex vertical gap={0}>
        <p className="text-xl">{dateFormated}</p>
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-blue-600">
            {value} {unit}
          </span>
          {notes && <span className="text-sm text-green-600">{notes}</span>}
        </div>
      </Flex>
    </List.Item>
  );
};

export default HistoricCard;
