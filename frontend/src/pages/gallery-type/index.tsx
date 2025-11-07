import Card from "../../components/ui/Card";
import Form from "./Form";
import List from "./List";
import SearchForm from "./SearchForm";

function GalleryType() {
    return (
        <Card className="grid gap-5">
            <Form />
            <SearchForm />
            <List />
        </Card>
    )
}

export default GalleryType;