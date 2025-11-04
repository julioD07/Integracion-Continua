import { useForm } from "../common/hooks";
import { FormComponent } from "../components";
import { httpAdapter, urlBase } from "../common/adapters/httpAdapter";
import { ResponseRegisterHttp } from "../interfaces/Responses";
import { FormField } from "../components/auth/FormField";
import Swal from "sweetalert2";
// import { v4 as uuid } from "uuid";
import { FieldsFormAuth } from "../components/auth/FieldsFormAuth";
import { setUser, useAppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleInputChange } = useForm({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = values;

    if (values.password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    const resp = await httpAdapter.post<ResponseRegisterHttp>(
      `${urlBase}/api/auth/register/user`,
      {
        ...rest,
      }
    );

    console.log(resp);

    if (resp.ok) {
      const user = {
        token: resp.token,
        email: resp.user.email,
        fullName: resp.user.fullName,
      };

      dispatch(setUser(user));

      await Swal.fire({
        icon: "success",
        title: "Usuario registrado",
        text: resp.message,
      });
      return navigate("/dashboard");
    }

    Swal.fire({
      icon: "error",
      title: "Error",
      text: resp.message,
    });

    // reset();
  };

  return (
    <>
      <FormComponent
        correspondingRoute="/login"
        correspondingRouteText="¿Ya tienes una cuenta?"
        textLink="Inicia Sesión"
        titulo="Registro"
        handleForm={handleRegister}
      >
        {FieldsFormAuth.map((field) => (
          <FormField
            key={field.id}
            field={field}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value={values[field.id]}
            handleInputChange={handleInputChange}
          />
        ))}
      </FormComponent>
    </>
  );
};
