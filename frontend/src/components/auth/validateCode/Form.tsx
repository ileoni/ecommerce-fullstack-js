import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Text from "../../ui/Text";
import SuccessStyle from "../../ui/SuccessStyle";
import ExtraSmallButton from "../../ui/HOC/ExtraSmallButton";
import { useNavigate } from "react-router";
import { useError } from "../../ui/Error";

const schema = z.object({
    validateCode: z.string().max(6).nonempty()
});

type Schema = z.infer<typeof schema>;

function Form() {
    const navigate = useNavigate();
    const { handleError } = useError();

    const SuccessButton = SuccessStyle(ExtraSmallButton);

    const { formState: { errors, isDirty, isValid }, handleSubmit, register  } = useForm<Schema>({ defaultValues: { validateCode: "" }, resolver: zodResolver(schema), mode: "onChange" })

    const onSubmit = (data: Schema) => {
        fetch("http://localhost:3000/validate-code", {
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            method: "POST"
        }).then(async res => {
            const data = await res.json();

            if(res.statusText.includes("OK")) {
                navigate("/administrador/redefinir-senha");
            } else if(res.statusText.includes("Bad Request")) {
                handleError(data.message);
            }

            return res.json();
        })
    }

    return (
        <>
            <Text {...register("validateCode")} label="Código de validação" message={errors.validateCode?.message}/>
            <div className="grid justify-end">
                <SuccessButton disabled={!isValid || !isDirty} onClick={handleSubmit(onSubmit)}>
                    Avançar
                </SuccessButton>
            </div>
        </>
    )
}

export default Form;