import { useConfigs } from "../hooks/useConfigs";
import H1 from "../components/ui/H1";
import H3 from "../components/ui/H3";
import Card from "../components/ui/Card";
import Form from "../components/auth/login/Form";

function Login() {
    const { login } = useConfigs("menus.admin.deauthenticate");

    return (
        <Card>
            <div className="h-full grid grid-cols-1 sm:grid-cols-2 place-content-center sm:place-content-around gap-5 sm:gap-0">
                <div className="grid place-content-center text-center">
                    <H3>{login.title}</H3>
                    <H1>{login.subtitle}</H1>
                </div>
                <Form />
            </div>
        </Card>
    )
}

export default Login;