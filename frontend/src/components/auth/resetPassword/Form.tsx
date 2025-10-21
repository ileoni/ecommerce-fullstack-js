import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAlert } from "../../../contexts/Alert";
import { resetPassword } from "../../../services/admin/resetPassword";
import Password from "../../ui/Password";
import SuccessStyle from "../../ui/SuccessStyle";
import ExtraSmallButton from "../../ui/HOC/ExtraSmallButton";

const schema = z.object({
    password: z.string().min(8).nonempty(),
    confirmPassword: z.string().nonempty(),
});

type Schema = z.infer<typeof schema>;

function Form() {
    const navigate = useNavigate();
    const { handleShowAlert } = useAlert();

    const SuccessButton = SuccessStyle(ExtraSmallButton);

    const { formState: { errors, isDirty, isValid }, handleSubmit, register  } = useForm<Schema>({ defaultValues: { password: "", confirmPassword: "" }, resolver: zodResolver(schema), mode: "onChange" })

    const onSubmit = (data: Schema) => {
        resetPassword(data)
        .then(async res => {
            const data = await res.json();
            if(res.statusText.includes("OK")) {
                navigate("/administrador");
            } else if(res.statusText.includes("Bad Request")) {
                handleShowAlert(data.message, "warning");
            }
        })
    }

    return (
        <>
            <Password {...register("password")} label="nova senha" message={errors.password?.message}/>
            <Password {...register("confirmPassword")} label="confirmar senha" message={errors.confirmPassword?.message}/>
            <div className="grid justify-end">
                <SuccessButton  onClick={handleSubmit(onSubmit)} disabled={!isValid || !isDirty}>
                    Avançar
                </SuccessButton>
            </div>
        </>
    )
}

export default Form;