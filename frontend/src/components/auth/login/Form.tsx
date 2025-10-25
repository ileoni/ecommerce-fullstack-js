import { NavLink, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"

import { login } from "../../../services/admin/login";
import { useAlert } from "../../../contexts/Alert";
import { useConfigs } from "../../../hooks/useConfigs";
import { BAD_REQUEST, OK } from "../../../constants";
import Text from "../../ui/Text";
import Password from "../../ui/Password";
import SuccessStyle from "../../ui/SuccessStyle";
import ExtraSmallButton from "../../ui/ExtraSmallButton";

const schema = z.object({
    email: z.email("endereço de e-mail inválido").nonempty(),
    password: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>

function Form() {
    const { preSend } = useConfigs("menus.admin.deauthenticate");
    const { handleShowAlert } = useAlert();
    const navigate = useNavigate();

    const SuccessButton = SuccessStyle(ExtraSmallButton);

    const { control, handleSubmit, formState: { isDirty, isValid, errors } } = useForm<Schema>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: { email: "", password: "" }
    });

    const onSubmit = (data: any) => {
        login(data)
        .then(async res => {
            const data = await res.json();
            if(res.statusText.includes(OK)) {
                navigate("painel");
            } else if(res.statusText.includes(BAD_REQUEST)) {
                handleShowAlert(data.message, "warning");
            }
        })
    }

    return (
        <>
        <Controller
            name="email"
            control={control}
            render={({ field }) => <Text label="Email" message={errors.email?.message} {...field}/>}
        />
        <Controller
            name="password"
            control={control}
            render={({ field }) => <Password label="Senha" message={errors.password?.message} {...field}/>}
        />
        <div className="grid grid-flow-col justify-between items-center">
            <NavLink to={preSend.slug}>
                Esqueceu sua senha?
            </NavLink>
            <SuccessButton onClick={handleSubmit(onSubmit)} disabled={!isDirty || !isValid}>
                Entrar
            </SuccessButton>
        </div>
        </>
    )
}

export default Form;