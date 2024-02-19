import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useState } from "react";

interface IDeleteButton {
  onDelete: () => void;
}

const DeleteButton = ({ onDelete }: IDeleteButton) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const onConfirmDialogOpenChange = () => {
    setIsConfirmingDelete(!isConfirmingDelete);
  }

  const deleteStyle = isConfirmingDelete
    ? { color: "red", cursor: "pointer" }
    : { cursor: "pointer" };
  return (
    <Popconfirm 
      title="Deletar a meta"
      onConfirm={onDelete}
      onOpenChange={onConfirmDialogOpenChange}
      okText="Deletar"
      cancelText="Cancelar"
      icon={<ExclamationCircleOutlined style={{color: "red"}}/>}
    >
      <DeleteOutlined style={deleteStyle} />;
    </Popconfirm>
  )
};

export default DeleteButton;
