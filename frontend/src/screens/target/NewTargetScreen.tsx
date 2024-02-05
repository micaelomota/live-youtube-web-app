import { Button, Form, Input } from "antd";
import { useTargets } from "../../context/TargetContext";
import { useNavigate } from "react-router-dom";

export const NewTargetScreen: React.FC = () => {
  const { addTarget } = useTargets();
  const navigate = useNavigate();

  const onFinishForm = (values: any) => {
    console.log(values);
    addTarget({
      ...values,
      currentValue: Number(values.currentValue),
      // TODO: remove isso aqui pq eu já tenho no backend
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    navigate("/");
  };

  // TODO: validar o formulário antes de salvar

  return (
    <div>
      <Form onFinish={onFinishForm}>
        <Form.Item label="Nome da meta" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Quantidade" name="target">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Unidade" name="unity">
          <Input />
        </Form.Item>

        <Form.Item label="Prazo" name="deadline">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Valor inicial" name="currentValue">
          <Input type="number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
