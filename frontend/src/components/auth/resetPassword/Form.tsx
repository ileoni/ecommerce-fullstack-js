import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAlert } from "../../../contexts/Alert";
import { resetPassword } from "../../../services/admin/resetPassword";
import Password from "../../ui/Password";
import SuccessStyle from "../../ui/HOC/SuccessStyle";
import ExtraSmallButton from "../../ui/ExtraSmallButton";

const schema = z.object({
    password: z.string().min(8).nonempty(),
    confirmPassword: z.string().nonempty(),
}).refine(data => data.password === data.confirmPassword, { error: "senhas não coincidem" });

type Schema = z.infer<typeof schema>;

function Form() {
    const navigate = useNavigate();
    const { handleShowAlert } = useAlert();

    const SuccessButton = SuccessStyle(ExtraSmallButton);

    const { control, formState: { isDirty, isValid }, handleSubmit  } = useForm<Schema>({
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
        resolver: zodResolver(schema)
    })

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
        <div className="w-full grid gap-5">
            <Password
                control={control}
                name="password"
                label="nova senha"
            />
            <Password
                control={control}
                name="confirmPassword"
                label="confirmar senha"
            />
            <div className="grid justify-end">
                <SuccessButton  onClick={handleSubmit(onSubmit)} disabled={!isValid || !isDirty}>
                    Avançar
                </SuccessButton>
            </div>
        </div>
    )
}

export default Form;