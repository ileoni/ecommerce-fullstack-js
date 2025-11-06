import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAlert } from "../../../contexts/Alert";
import { useNavigate } from "react-router";
import { validateCode } from "../../../services/admin/validateCode";
import Text from "../../ui/Text";
import SuccessStyle from "../../ui/HOC/SuccessStyle";
import ExtraSmallButton from "../../ui/ExtraSmallButton";

const schema = z.object({
    validateCode: z.string().max(6).nonempty()
});

type Schema = z.infer<typeof schema>;

function Form() {
    const navigate = useNavigate();
    const { handleShowAlert } = useAlert();

    const SuccessButton = SuccessStyle(ExtraSmallButton);

    const { control, formState: { isDirty, isValid }, handleSubmit  } = useForm<Schema>({ defaultValues: { validateCode: "" }, resolver: zodResolver(schema), mode: "onChange" })

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
        <div className="w-full grid gap-5">
            <Text
                control={control}
                name="validateCode"
                label="código de validação"
            />
            <div className="grid justify-end">
                <SuccessButton disabled={!isValid || !isDirty} onClick={handleSubmit(onSubmit)}>
                    Avançar
                </SuccessButton>
            </div>
        </div>
    )
}

export default Form;