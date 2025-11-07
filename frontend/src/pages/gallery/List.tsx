import { NavLink } from "react-router";
import RegisterNavLinkStyle from "../../components/ui/HOC/RegisterNavLinkStyle";
import { useConfigs } from "../../hooks/useConfigs";

function List() {
    const RegisterNavLink = RegisterNavLinkStyle(NavLink);
    
    const { register } = useConfigs("menus.admin.authenticate.gallery.children.hidden");

    return (
        <div className="grid gap-5">
            <div className="flex justify-end">
                <RegisterNavLink
                    to={register.slug}
                >
                    cadastrar
                </RegisterNavLink>
            </div>
        </div>
    )
}

export default List;