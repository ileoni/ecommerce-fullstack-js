import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { preSend } from "../../../services/admin/preSend";
import { useAlert } from "../../../contexts/Alert";
import Text from "../../ui/Text";
import SuccessStyle from "../../ui/HOC/SuccessStyle";
import ExtraSmallButton from "../../ui/ExtraSmallButton";

const schema = z.object({
    email: z.email("endereço de e-mail inválido").nonempty()
});

type Schema = z.infer<typeof schema>;


function Form() {
    const navigate = useNavigate();
    const { handleShowAlert } = useAlert();

    const { control, handleSubmit, formState: { isDirty, isValid } } = useForm<Schema>({ 
        defaultValues: { email: "" },
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
        <div className="w-full grid gap-5">
            <Text
                control={control}
                name="email"
                label="email"
            />
            <div className="w-full grid justify-end">
                <SuccessButton onClick={handleSubmit(onSubmit)} disabled={!isDirty || !isValid}>
                    Avançar
                </SuccessButton>
            </div>
        </div>
    )
}

export default Form;