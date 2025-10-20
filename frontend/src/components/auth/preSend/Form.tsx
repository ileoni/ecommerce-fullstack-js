import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import ExtraSmallButton from "../../ui/HOC/ExtraSmallButton";
import SuccessStyle from "../../ui/SuccessStyle";
import Text from "../../ui/Text";
import { useError } from "../../ui/Error";
import { useNavigate } from "react-router";

const schema = z.object({
    email: z.email("endereço de e-mail inválido").nonempty()
});

type Schema = z.infer<typeof schema>;


function Form() {
    const navigate = useNavigate();
    const { handleError } = useError();

    const { handleSubmit, register, formState: { isDirty, isValid, errors } } = useForm<Schema>({ 
        defaultValues: { email: "" },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const SuccessButton = SuccessStyle(ExtraSmallButton);
    
    const onSubmit = (data: Schema) => {
        fetch("http://localhost:3000/pre-send", {
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
        }).then(async res => {
            const data = await res.json();
            if(res.statusText.includes("OK")) {
                console.log("avançar")
                navigate("validar-codigo");
            } else if(res.statusText.includes("Bad Request")) {
                handleError(data.message);
            } else if(res.statusText.includes("Internal Server Error")) {
                handleError(data.message);
            }
        })
    }

    return (
        <>
            <Text {...register("email")} label="email" message={errors.email?.message}/>
            <div className="w-full grid justify-end">
                <SuccessButton onClick={handleSubmit(onSubmit)} disabled={!isDirty || !isValid}>
                    Enviar
                </SuccessButton>
            </div>
        </>
    )
}

export default Form;