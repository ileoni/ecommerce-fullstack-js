import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"

import { useConfigs } from "../../../hooks/useConfigs";
import Text from "../../ui/Text";
import Password from "../../ui/Password";
import SuccessStyle from "../../ui/SuccessStyle";
import ExtraSmallButton from "../../ui/HOC/ExtraSmallButton";
import { useError } from "../../ui/Error";

const schema = z.object({
    email: z.email("endereço de e-mail inválido").nonempty(),
    password: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>

function Form() {
    const { preSend } = useConfigs("menus.admin.deauthenticate");
    const { handleError } = useError();
    const navigate = useNavigate();

    const SuccessButton = SuccessStyle(ExtraSmallButton);

    const { register, handleSubmit, formState: { isDirty, isValid, errors } } = useForm<Schema>({
        mode: "onChange",
        resolver: zodResolver(schema),
        defaultValues: { email: "", password: "" }
    });

    const onSubmit = (data: any) => {
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async res => {
            const data = await res.json();

            if(res.statusText.includes("OK")) {
                navigate("dashboard")
            } else if(res.statusText.includes("Bad Request")) {
                handleError(data.message);
            }
        })
    }

    return (
        <>
        <Text {...register("email")} label="Email" message={errors.email?.message}/>
        <Password {...register("password")} label="Senha"/>
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