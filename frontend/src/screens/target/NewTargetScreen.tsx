import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import SelectForm from "../../components/SelectForm";
import ButtonForm from "../../components/ButtonForm";
import { TargetProps, useTargets } from "../../context/TargetContext";

export const NewTargetScreen: React.FC = () => {
  const [form] = Form.useForm<TargetProps>();
  const navigate = useNavigate();
  const { addTarget } = useTargets();

  const onFinishForm = (values: TargetProps) => {
    addTarget({
      name: values.name,
      unit: values.unit,
      currentValue: values.currentValue,
      target: values.target,
    });
    
    navigate("/");
  };

  return (
    <div>
      <Form onFinish={onFinishForm} layout="vertical" form={form}>
        <InputForm
          label="Nome da meta"
          name="name"
          placeholder="Nome da meta"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        />
        <InputForm
          label="Quantidade"
          name="target"
          placeholder="Quantidade"
          type="number"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        />
        <SelectForm
          label="Unidade"
          name="unity"
          placeholder="Selecione a unidade"
          rules={[{ required: true, message: "Campo obrigatório." }]}
          options={[
            { value: "km", label: "Km (Quilometro)" },
            { value: "kg", label: "Kg (Kilograma)" },
            { value: "horas", label: "Hrs (Horas)" },
            { value: "minutos", label: "Min (Minutos)" },
            { value: "vezes", label: "Vzs (Vezes)" },
          ]}
        />
        <InputForm
          label="Prazo"
          name="deadline"
          placeholder="Selecione o prazo"
          type="date"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        />
        <InputForm
          label="Valor inicial"
          name="currentValue"
          placeholder="Valor inicial"
          type="number"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        />
        <ButtonForm text="Salvar" type="primary" htmlType="submit" />
      </Form>
    </div>
  );
};
