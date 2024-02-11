import { Flex, Form } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InputForm from '../../components/InputForm'
import ButtonForm from '../../components/ButtonForm'
import { useTargets } from '../../context/TargetContext'
import InputFormNumber from '../../components/InputFormNumber'

interface EntryProps {
  value: number
  date: string
  notes?: string
}

export const NewEntry = () => {
  const { id } = useParams()
  const navigate = useNavigate();
  const {incrementEntry} = useTargets()
  const [form] = Form.useForm<EntryProps>()


  const handleAddEntry = (values: EntryProps) => {
    incrementEntry(Number(id), values)

    navigate(`/target/${id}`)
  }

  return (
    <Flex vertical>
      <Form onFinish={handleAddEntry} layout='vertical' form={form}>
        <InputFormNumber
          label="Quantidade"
          name="value"
          placeholder="Quantidade"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        />
        <InputForm
          label="Selecione a data"
          name="date"
          placeholder="Selecione a data"
          type="date"
          rules={[{ required: true, message: "Campo obrigatório." }]}
        />
        <InputForm
          label="Notas"
          name="notes"
          placeholder="Notas"
        />
        <ButtonForm text="Adicionar" type="primary" htmlType="submit" />
      </Form>
    </Flex>
  )
}
