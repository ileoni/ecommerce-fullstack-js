import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAlert } from "../../../contexts/Alert";
import { useNavigate } from "react-router";
import { validateCode } from "../../../services/admin/validateCode";
import Text from "../../ui/Text";
import SuccessStyle from "../../ui/SuccessStyle";
import ExtraSmallButton from "../../ui/HOC/ExtraSmallButton";

const schema = z.object({
    validateCode: z.string().max(6).nonempty()
});

type Schema = z.infer<typeof schema>;

function Form() {
    const navigate = useNavigate();
    const { handleShowAlert } = useAlert();

    const SuccessButton = SuccessStyle(ExtraSmallButton);

    const { formState: { errors, isDirty, isValid }, handleSubmit, register  } = useForm<Schema>({ defaultValues: { validateCode: "" }, resolver: zodResolver(schema), mode: "onChange" })

    const onSubmit = (data: Schema) => {
        validateCode(data)
        .then(async res => {
            const data = await res.json();

            if(res.statusText.includes("OK")) {
                navigate("/administrador/redefinir-senha");
            } else if(res.statusText.includes("Bad Request")) {
                handleShowAlert(data.message, "warning");
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