import Form from "./Form";
import List from "./List";
import SearchForm from "./SearchForm";

function GalleryType() {
    return (
        <div className="grid gap-5">
            <Form />
            <SearchForm />
            <List />
        </div>
    )
}

export default GalleryType;