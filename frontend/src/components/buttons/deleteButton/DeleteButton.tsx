import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useState } from "react";

interface IDeleteButton {
  onDelete: () => void;
}

const DeleteButton = ({ onDelete }: IDeleteButton) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const onConfirmDialogOpenChange = () => {
    setIsConfirmingDelete(!isConfirmingDelete);
  };

  return (
    <Popconfirm
      title="Deletar a meta"
      onConfirm={onDelete}
      onOpenChange={onConfirmDialogOpenChange}
      okText="Deletar"
      cancelText="Cancelar"
      icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
    >
      <Button type="primary" danger icon={<DeleteOutlined />} size="small" />
    </Popconfirm>
  );
};

export default DeleteButton;
