import { useOverlay } from "../../contexts/Overlay";
import ExtraSmallButton from "./ExtraSmallButton";
import DangerStyle from "./HOC/DangerStyle";
import DefaultStyle from "./HOC/DefaultStyle";
import Modal from "./Modal";

type Props = { onDelete: (id: number) => void }

function ConfirmationModal(props: Props) {
    const { onDelete } = props;
    const { closeModal, state } = useOverlay();

    const DefatulButton = DefaultStyle(ExtraSmallButton);
    const DangerButton = DangerStyle(ExtraSmallButton);

    return (
        <Modal>
            <Modal.Header>
                <div>
                    Tem certeza de que deseja excluir <span className="font-bold text-red-400">{ state.title }</span>?
                </div>
            </Modal.Header>
            <Modal.Footer>
                <DefatulButton onClick={closeModal}>cancelar</DefatulButton>
                <DangerButton onClick={() => onDelete(state.id)}>confirmar</DangerButton>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal;