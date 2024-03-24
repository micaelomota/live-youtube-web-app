import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Form } from "antd";
import { useTargets } from "../../context/TargetContext";
import { Target } from "../../hooks/useTargets";
import InputForm from "../../components/InputForm";
import SelectForm from "../../components/SelectForm";
import ButtonForm from "../../components/ButtonForm";
import InputFormNumber from "../../components/InputFormNumber";
import DatePickerForm from "../../components/DatePickerForm";

export const EditTargetScreen = () => {
  const [form] = Form.useForm<Target>();
  const { updateTarget } = useTargets();
  const navigate = useNavigate();
  const location = useLocation();
  const target = location.state;

  const onFinishForm = (values: Target) => {
    updateTarget({
      id: target.id,
      name: values.name,
      unity: values.unity,
      currentValue: values.currentValue,
      target: values.target,
      // deadline is not in the target returned by firebase
      // deadline: values.deadline,
    });

    navigate(`/`);
  };

  useEffect(() => {
    if (!location.state) navigate("/");

    form.setFieldsValue(target);
  });

  return (
    <div>
      <Form onFinish={onFinishForm} layout="vertical" form={form}>
        <InputForm
          label="Nome da meta"
          name="name"
          placeholder="Nome da meta"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        />
        <InputFormNumber
          label="Quantidade"
          name="target"
          placeholder="Quantidade"
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
            { value: "unidade", label: "Unidades" },
          ]}
        />
        <DatePickerForm
          label="Prazo"
          name="deadline"
          placeholder="Selecione o prazo"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        />
        <InputFormNumber
          label="Valor inicial"
          name="currentValue"
          placeholder="Valor inicial"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        />
        <ButtonForm text="Editar" type="primary" htmlType="submit" />
      </Form>
    </div>
  );
};
