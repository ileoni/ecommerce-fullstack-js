import { useConfigs } from "../hooks/useConfigs";
import Card from "../components/ui/Card";
import H3 from "../components/ui/H3";
import H1 from "../components/ui/H1";
import Form from "../components/auth/validateCode/Form";

function ValidateCode() {
    const { validateCode } = useConfigs("menus.admin.deauthenticate");
    
    return (
        <Card>
            <div className="h-full grid sm:grid-flow-col place-content-center sm:place-content-around">
                <div className="grid place-content-center text-center">
                    <H3>{validateCode.title}</H3>
                    <H1>{validateCode.subtitle}</H1>
                </div>
                <div className="grid sm:place-content-center">
                    <Form />
                </div>
            </div>
        </Card>
    )
}

export default ValidateCode;