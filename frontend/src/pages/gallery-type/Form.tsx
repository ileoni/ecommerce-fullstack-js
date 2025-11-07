import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import Text from "../../components/ui/Text";
import DangerStyle from "../../components/ui/HOC/DangerStyle";
import ExtraSmallButton from "../../components/ui/ExtraSmallButton";

const schema = z.object({
    key: z.string().min(1),
    search: z.string().min(1),
    width: z.number().min(1),
    height: z.number().min(1)
});

type Schema = z.infer<typeof schema>;

function Form() {
    const { control } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            key: "",
            search: "",
            width: 0,
            height: 0
        }
    });

    const RegisterButton = DangerStyle(ExtraSmallButton);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(3,1fr)_auto] items-center gap-5">
            <Text
                control={control}
                name="key"
                label="chave"
            />
            <Text
                control={control}
                name="width"
                label="largura"
            />
            <Text
                control={control}
                name="height"
                label="altura"
            />
            <div className="grid justify-end">
                <RegisterButton>
                    Cadastrar
                </RegisterButton>
            </div>
        </div>
    )
}

export default Form;