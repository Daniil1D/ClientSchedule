import { Input } from "../../components/input";
import  Selectt  from "../../components/Select";
import { useForm } from "react-hook-form";
import { Button, Link, Select } from "@nextui-org/react";
import { useRegisterMutation } from "../../app/services/userApi";
import { ErrorMessage } from "../../components/error-message";
import { hasErrorField } from "../../utils/has-error-field";
import { useState } from "react";
import { roles } from "../../data/roles"; // Подставьте правильный путь к вашему файлу с ролями

type Register = {
    email: string;
    name: string;
    password: string;
    roleName: string; // Заменяем role на roleName
    class?: string; // Добавляем поле для выбора класса
  };

type Props = {
  setSelected: (value: string) => void;
};

export const Register = ({ setSelected }: Props) => {
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      roleName: "", // Устанавливаем начальное значение для поля выбора роли
    },
  });

  const [register] = useRegisterMutation();
  const [error, setError] = useState("");

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap();
      setSelected("login");
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        required="Обязательное поле"
        label="Имя"
        name="name"
      />
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
     <Selectt
        label="Роль"
        name="roleName" // Заменяем name на roleName
        control={control}
        options={roles}
        value={selectedRole}
        onChange={setSelectedRole}
        />
       {selectedRole === "Ученик" && (
        <Input
          control={control}
          name="class"
          label="Класс"
          type="text"
          required="Обязательное поле"
        />
      )}
      <ErrorMessage error={error} />

      <p className="text-center text-small">
        Уже есть аккаунт?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Войдите
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Зарегистрироваться
        </Button>
      </div>
    </form>
  );
};
