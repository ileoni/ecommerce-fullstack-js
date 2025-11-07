import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import Search from "../../components/ui/Search";

const schema = z.object({
    key: z.string().min(1),
    search: z.string().min(1),
    width: z.number().min(1),
    height: z.number().min(1)
});

type Schema = z.infer<typeof schema>;

function SearchForm() {
    
    const { control } = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            search: ""
        }
    });
    
    return (
        <Search
            control={control}
            name="search"
            label="Pesquisar"
        />
    )
}
export default SearchForm;