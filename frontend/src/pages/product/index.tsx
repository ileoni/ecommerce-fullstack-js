import { Outlet } from "react-router";
import Card from "../../components/ui/Card";

function Product() {
    return (
        <Card>
            <Outlet/>
        </Card>
    )
}

export default Product;