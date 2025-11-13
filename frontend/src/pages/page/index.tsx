import { Outlet } from "react-router";
import Card from "../../components/ui/Card";

function Pages() {
    return (
        <Card>
            <Outlet />
        </Card>  
    );
}

export default Pages;