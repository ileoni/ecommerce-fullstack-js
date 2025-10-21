import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { preSend } from "../../../services/admin/preSend";
import { useAlert } from "../../../contexts/Alert";
import Text from "../../ui/Text";
import SuccessStyle from "../../ui/SuccessStyle";
import ExtraSmallButton from "../../ui/HOC/ExtraSmallButton";

const schema = z.object({
    email: z.email("endereço de e-mail inválido").nonempty()
});

type Schema = z.infer<typeof schema>;


function Form() {
    const navigate = useNavigate();
    const { handleShowAlert } = useAlert();

    const { handleSubmit, register, formState: { isDirty, isValid, errors } } = useForm<Schema>({ 
        defaultValues: { email: "" },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const SuccessButton = SuccessStyle(ExtraSmallButton);
    
    const onSubmit = (data: Schema) => {
        preSend(data)
        .then(async res => {
            const data = await res.json();
            console.log(res.statusText)
            if(res.statusText.includes("OK")) {
                console.log("avançar")
                navigate("/administrador/validar-codigo");
            } else if(res.statusText.includes("Bad Request")) {
                handleShowAlert(data.message, "warning");
            } else if(res.statusText.includes("Internal Server Error")) {
                handleShowAlert(data.message, "danger");
            }
        })
    }

    return (
        <>
            <Text {...register("email")} label="email" message={errors.email?.message}/>
            <div className="w-full grid justify-end">
                <SuccessButton onClick={handleSubmit(onSubmit)} disabled={!isDirty || !isValid}>
                    Avançar
                </SuccessButton>
            </div>
        </>
    )
}

export default Form;