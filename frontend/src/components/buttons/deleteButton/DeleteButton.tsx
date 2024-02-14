import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

interface IDeleteButton {
  onDelete: () => void;
}

const DeleteButton = ({ onDelete }: IDeleteButton) => {
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

  const onDeleteClick = () => {
    if (isDeleteConfirmed) onDelete();
    setIsDeleteConfirmed(!isDeleteConfirmed);
  };

  const deleteStyle = isDeleteConfirmed
    ? { color: "red", cursor: "pointer" }
    : { cursor: "pointer" };
  return <DeleteOutlined onClick={onDeleteClick} style={deleteStyle} />;
};

export default DeleteButton;
