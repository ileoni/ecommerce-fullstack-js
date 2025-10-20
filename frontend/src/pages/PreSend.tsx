import { useConfigs } from "../hooks/useConfigs";
import H1 from "../components/ui/H1";
import H3 from "../components/ui/H3";
import Card from "../components/ui/Card";
import Form from "../components/auth/preSend/Form";

function PreSend() {
    const { preSend } = useConfigs("menus.admin.deauthenticate");
    
    return (
        <Card>
            <div className="h-full grid sm:grid-flow-col place-content-center sm:place-content-around">
                <div className="grid place-content-center text-center">
                    <H3>{preSend.title}</H3>
                    <H1>{preSend.subtitle}</H1>
                </div>
                <div className="grid sm:place-content-center">
                    <Form />
                </div>
            </div>
        </Card>
    );
}

export default PreSend;