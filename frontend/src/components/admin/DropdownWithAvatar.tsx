import { NavLink } from "react-router";

import { useAuth } from "../../contexts/Authenticate";
import { useConfigs } from "../../hooks/useConfigs";
import Avatar from "../ui/Avatar";
import Dropdown from "../ui/Dropdown";
import SmallSizeAvatar from "../ui/HOC/SmallSizeAvatar";
import { useEffect, useState } from "react";
import { getUser } from "../../services/admin/user";

type Image = { path: string }
type Customer = { id: number, userId: number, firstname: string, lastname: string, bio: string, phone: string }
type User = { id: number, email: string, password: string, role: string, customer: Customer, image: Image }

function DropdownWithAvatar() {
    const [user, setUser] = useState<User | null>(null);
    const { auth } = useAuth();
    const { profile, logout } = useConfigs("menus.admin.authenticate");

    useEffect(() => {
        getUser(auth.id)
        .then(async res => {
            const { data } = await res.json();
            setUser(data.user);
        })
    }, [auth])

    const SmallAvatar = SmallSizeAvatar(Avatar);

    return (
        <Dropdown>
            <Dropdown.Toggle>
                {user && (<SmallAvatar src={user.image.path}/>)}
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