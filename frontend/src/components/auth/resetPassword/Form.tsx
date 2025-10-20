import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useError } from "../../ui/Error";
import SuccessStyle from "../../ui/SuccessStyle";
import ExtraSmallButton from "../../ui/HOC/ExtraSmallButton";
import Password from "../../ui/Password";

const schema = z.object({
    password: z.string().min(8).nonempty(),
    confirmPassword: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

function Form() {
    const navigate = useNavigate();
    const { handleError } = useError();

    const SuccessButton = SuccessStyle(ExtraSmallButton);

    const { formState: { errors, isDirty, isValid }, handleSubmit, register  } = useForm<Schema>({ defaultValues: { password: "", confirmPassword: "" }, resolver: zodResolver(schema), mode: "onChange" })

    const onSubmit = (data: Schema) => {
        fetch("http://localhost:3000/reset-password", {
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
        }).then(async res => {
            const data = await res.json();
            if(res.statusText.includes("OK")) {
                navigate("/administrador");
            } else if(res.statusText.includes("Bad Request")) {
                handleError(data.message);
            }
        })
    }

    return (
        <>
            <Password {...register("password")} label="nova senha" />
            <Password {...register("confirmPassword")} label="confirmar senha" />
            <div className="grid justify-end">
                <SuccessButton  onClick={handleSubmit(onSubmit)} disabled={!isValid || !isDirty}>
                    Avançar
                </SuccessButton>
            </div>
        </>
    )
}

export default Form;