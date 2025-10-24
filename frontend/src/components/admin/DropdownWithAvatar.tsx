import { NavLink } from "react-router";

import { useAuth } from "../../contexts/Authenticate";
import { useConfigs } from "../../hooks/useConfigs";
import Avatar from "../ui/Avatar";
import Dropdown from "../ui/Dropdown";
import SmallSizeAvatar from "../ui/HOC/SmallSizeAvatar";

function DropdownWithAvatar() {
    const { profile, logout } = useConfigs("menus.admin.authenticate");
    const { auth } = useAuth();

    const SmallAvatar = SmallSizeAvatar(Avatar);

    return (
        <Dropdown>
            <Dropdown.Toggle>
                <SmallAvatar src={auth.images.path}/>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-56! absolute right-0 rounded">
                <ul>
                    <li className="capitalize">
                        <NavLink to={profile.slug} className="px-4 py-2 size-full block">
                            {profile.title}
                        </NavLink>
                    </li>
                </ul>
                <ul className="bg-zinc-300 dark:bg-zinc-600">
                    <li className="capitalize">
                        <NavLink to={logout.slug} className="px-4 py-2 size-full block">
                            {logout.title}
                        </NavLink>
                    </li>
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownWithAvatar;