import Password from "../../ui/Password";
import Text from "../../ui/Text";
import SuccessStyle from "../../ui/SuccessStyle";
import ExtraSmallButton from "../../ui/HOC/ExtraSmallButton";

function Form() {
    const SuccessButton = SuccessStyle(ExtraSmallButton);

    return (
        <>
            <Text label="Email" />
            <Password label="Senha" />
            <SuccessButton>
                Entrar
            </SuccessButton>
        </>
    )
}

export default Form;