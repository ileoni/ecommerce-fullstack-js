import {} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Row from "../../components/ui/Row";
import Text from "../../components/ui/Text";
import TextArea from "../../components/ui/TextArea";
import Number from "../../components/ui/Number";
import TogglePill from "../../components/ui/TogglePill";

const schema = z.object({
    key: z.string(),
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    active: z.boolean(),
    seoTitle: z.string(),
    seoKeywords: z.string(),
    seoDescription: z.string(),
});

type Schema = z.infer<typeof schema>

function Form() {

    const { control } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            key: "",
            slug: "",
            name: "",
            description: "",
            price: 0,
            active: false,
            seoTitle: "",
            seoKeywords: "",
            seoDescription: ""
        }
    });
    
    return (
        <>
        <div className="grid gap-5">
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
            <Row
                title="ativo"
                subtitle="você pode desativar a página"
            >
                <TogglePill />
            </Row>
            <Row
                title="nome"
                subtitle="nome do produto"
            >
                <Text
                    control={control}
                    name="name"
                    label="nome"
                />
            </Row>
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
                title="price"
                subtitle="preço do produto"
            >
                <Number
                    control={control}
                    name="price"
                    label="Preço"
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