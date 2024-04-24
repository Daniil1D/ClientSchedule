import React from "react";
import { Control, useController } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void; // Добавляем проп onChange
};

const Selectt: React.FC<Props> = ({ name, label, control, options, value, onChange }) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control
  });

  return (
    <Select
      label={label}
      value={value}
      name={field.name}
      isInvalid={invalid}
      onChange={(e) => {
        onChange(e.target.value); // Вызываем обработчик изменения
        field.onChange(e); // Вызываем onChange поля формы
      }}
      onBlur={field.onBlur}
    >
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Selectt;
