import { NavLink } from "react-router";

import RegisterNavLinkStyle from "../../components/ui/HOC/RegisterNavLinkStyle";
import Table from "../../components/ui/Table";
import { getProducts } from "../../services/admin/getProducts";
import { useEffect, useState } from "react";
import { Pen, Trash } from "lucide-react";
import Paginate from "../../components/ui/Paginate";
import { useConfigs } from "../../hooks/useConfigs";

function List() {
    const [data, setData] = useState(null);

    const ResgiterNavLink = RegisterNavLinkStyle(NavLink);
    
    const { edit, register } = useConfigs("menus.admin.authenticate.product.children.hidden");

    useEffect(() => {
        update();
    }, [])

    const update = (query: string = "") => {
        getProducts(query)
            .then(async res => {
                const { data } = await res.json()
                setData(data);
            })
    }

    return (
        <div className="grid gap-5">
            <div className="flex justify-end">
                <ResgiterNavLink
                    to={register.slug}
                >
                    <span className="first-letter:capitalize">
                        cadastrar
                    </span>
                </ResgiterNavLink>
            </div>
            <div>
                <Table>
                    <Table.Thead>
                        <Table.Trow>
                            <Table.Theader>
                                Nome
                            </Table.Theader>
                            <Table.Theader>
                                Marca
                            </Table.Theader>
                            <Table.Theader>
                                Preço
                            </Table.Theader>
                            <Table.Theader>
                                Quantidade
                            </Table.Theader>
                            <Table.Theader className="w-32"></Table.Theader>
                        </Table.Trow>
                    </Table.Thead>
                    <Table.Tbody>
                        {data && data.records.map((record, index) => (
                            <Table.Trow key={index}>
                                <Table.Tdata>
                                    { record.name }
                                </Table.Tdata>
                                <Table.Tdata>
                                    { record.brand }
                                </Table.Tdata>
                                <Table.Tdata>
                                    { record.price }
                                </Table.Tdata>
                                <Table.Tdata>
                                    { record.quantity }
                                </Table.Tdata>
                                <Table.Tdata className="w-32">
                                    <div className="flex gap-5">
                                        <NavLink to={`${edit.slug}/${record.id}`}>
                                            <Pen />
                                        </NavLink>
                                        <button onClick={() => {}}>
                                            <Trash />
                                        </button>
                                    </div>
                                </Table.Tdata>
                            </Table.Trow>
                        ))}
                    </Table.Tbody>
                </Table>
                {
                    data && (
                        <Paginate
                            data={data}
                            onFirstPage={(query) => update(query)}
                            onPrevious={(query) => update(query)}
                            onNext={(query) => update(query)}
                            onLastPage={(query) => update(query)}
                            onPageTo={(query) => update(query)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default List;