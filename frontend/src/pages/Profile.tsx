import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAuth } from "../contexts/Authenticate";
import Card from "../components/ui/Card";
import Text from "../components/ui/Text";
import Avatar from "../components/ui/Avatar";
import TextArea from "../components/ui/TextArea";
import ExtraSmallButton from "../components/ui/ExtraSmallButton";
import SuccessStyle from "../components/ui/SuccessStyle";
import ExtraLargeSizeAvatar from "../components/ui/HOC/ExtraLargeSizeAvatar";
import { useEffect, useState } from "react";
import { getUser } from "../services/admin/user";

const schema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    bio: z.string()
});

type Schema = z.infer<typeof schema>;

type Image = { path: string }
type Customer = { id: number, userId: number, firstname: string, lastname: string, bio: string, phone: string }
type User = { id: number, email: string, password: string, role: string, customer: Customer, image: Image }

function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const { auth } = useAuth();

    const { control, handleSubmit, setValue } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstname: "",
            lastname: "",
            bio: ""
        }
    });

    const ExtraLargeAvatar = ExtraLargeSizeAvatar(Avatar);
    const SuccessButton = SuccessStyle(ExtraSmallButton);

    const onSubmit = (data: any) => {
        console.log("aqui", data);
    }

    useEffect(() => {
        if(user) {
            setValue("firstname", user.customer.firstname)
            setValue("lastname", user.customer.lastname)
            setValue("bio", user.customer.bio)
        }
    }, [user])

    useEffect(() => {
        getUser(auth.id)
        .then(async res => {
            const { data } = await res.json();
            setUser(data.user);
        })
    }, [auth])

    return (
        <Card>
            <div className="grid gap-5">
                <div className="justify-self-end">
                    <SuccessButton onClick={handleSubmit(onSubmit)}>salvar</SuccessButton>
                </div>
                <div className="grid grid-flow-col justify-between">
                    <div className="flex flex-col">
                        <span className="first-letter:capitalize font-bold">avatar</span>
                    </div>
                    {user && <ExtraLargeAvatar src={user.image.path}/>}
                </div>
                <div className="grid grid-cols-2">
                    <div className="flex flex-col">
                        <span className="first-letter:capitalize font-bold">nome completo</span>
                        <span className="first-letter:capitalize text-xs">nós diga seu nome.</span>
                    </div>
                    <div className="grid grid-flow-col gap-5">
                        <Controller
                            name="firstname"
                            control={control}
                            render={({ field }) => <Text label="nome" {...field}/>}
                        />
                        <Controller
                            name="lastname"
                            control={control}
                            render={({ field }) => <Text label="sobrenome" {...field}/>}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className="flex flex-col">
                        <span className="first-letter:capitalize font-bold">bio</span>
                        <span className="first-letter:capitalize text-xs">conte-nos mais sobre você.</span>
                    </div>
                    <div className="grid grid-flow-col gap-5">
                        <Controller
                            name="bio"
                            control={control}
                            render={({ field }) => <TextArea label="bio" {...field}/>}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Profile;