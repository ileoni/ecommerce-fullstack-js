import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { getPage } from "../../services/admin/getPage";
import { useParams } from "react-router";
import Row from "../../components/ui/Row";
import Text from "../../components/ui/Text";
import TextArea from "../../components/ui/TextArea";
import SuccessStyle from "../../components/ui/HOC/SuccessStyle";
import ExtraSmallButton from "../../components/ui/ExtraSmallButton";

const schema = z.object({
    key: z.string(),
    title: z.string().min(1),
    slug: z.string(),
    description: z.string(),
    seoTitle: z.string(),
    seoKeywords: z.string(),
    seoDescription: z.string(),
})

type Schema = z.infer<typeof schema>

type Page = {
    description: string
    id: number
    key: string
    seoDescription: string
    seoKeywords: string[]
    seotitle: string
    slug: string
    title: string
}

function Form() {
    const [page, setPage] = useState<Page | null>(null);

    const params = useParams();

    const { control, handleSubmit, setValue } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            key: "",
            title: "",
            slug: "",
            description: "",
            seoTitle: "",
            seoKeywords: "",
            seoDescription: ""
        }
    });

    const SuccessButton = SuccessStyle(ExtraSmallButton);

    useEffect(() => {
        if(params.id) {
            getPage(params.id)
                .then(async res => {
                    const { data } = await res.json();
                    setPage(data.page);
                    return data;
                })
        }
    }, [])
    
    useEffect(() => {
        if(page) {
            setValue("key", page.key);
            setValue("title", page.title);
            setValue("slug", page.slug);
            setValue("description", page.description);
            setValue("seoTitle", page.seotitle);
            setValue("seoKeywords", "page.seoKeywords");
            setValue("seoDescription", page.description);
        }
    }, [page])

    return (
        <>
            <div className="grid gap-5">
                <div className="w-full grid justify-end">
                    <SuccessButton>Salvar</SuccessButton>
                </div>
                {
                    page && (
                        <Row
                            title="Chave"
                            subtitle="chave para identificar a página"
                        >
                            <Text
                                control={control}
                                name="key"
                                label="chave"
                            />
                        </Row>
                    )
                }
                <Row
                    title="título"
                    subtitle="título da página"
                >
                    <Text
                        control={control}
                        name="title"
                        label="título"
                    />
                </Row>
                {
                    page && (
                        <Row
                            title="SLUG"
                            subtitle="url da página"
                        >
                            <Text
                                control={control}
                                name="slug"
                                label="slug"
                            />
                        </Row>
                    )
                }
                <Row
                    title="descrição"
                    subtitle="descrição da página"
                >
                    <TextArea
                        control={control}
                        name="description"
                        label="descrição"
                    />
                </Row>
                <Row
                    title="title"
                    subtitle="SEO title"
                >
                    <Text
                        control={control}
                        name="seoTitle"
                        label="title"
                    />
                </Row>
                <Row
                    title="keywords"
                    subtitle="SEO keywords"
                >
                    <Text
                        control={control}
                        name="seoKeywords"
                        label="keywords"
                    />
                </Row>
                <Row
                    title="description"
                    subtitle="SEO description"
                >
                    <TextArea
                        control={control}
                        name="seoDescription"
                        label="description"
                    />
                </Row>
            </div>
        </>
    )
}

export default Form;