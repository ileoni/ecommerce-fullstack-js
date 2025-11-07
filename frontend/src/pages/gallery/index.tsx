import { Outlet } from "react-router";
import Card from "../../components/ui/Card";

function Gallery() {
    return (
        <Card>
            <Outlet />
        </Card>
    )
}

export default Gallery;