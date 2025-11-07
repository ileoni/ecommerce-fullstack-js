import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import { pages, type Page } from "../../services/admin/pages";
import { useConfigs } from "../../hooks/useConfigs";
import Table from "../../components/ui/Table";
import RegisterNavLinkStyle from "../../components/ui/HOC/RegisterNavLinkStyle";
import { Pen, Trash } from "lucide-react";
import Paginate from "../../components/ui/Paginate";
import { useOverlay } from "../../contexts/Overlay";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import { useTable } from "../../hooks/useTable";

function List() {
    const [records, setRecords] = useState<Page>();

    const ResgiterNavLink = RegisterNavLinkStyle(NavLink);

    const { register, edit } = useConfigs("menus.admin.authenticate.pages.children.hidden");
    const { toggleModal, setState } = useOverlay({ Component: <ConfirmationModal onDelete={() => {}} /> })
    
    useEffect(() => {
        update();
    }, [])
    
    const update = (query: string = "") => {
        pages(query)
        .then(async res => {
            const { data } = await res.json();
            setRecords(data);
            return data;
        });
    }

    const { getIcon, toSort } = useTable({ records });

    const handleToModal = (id: number, title: string) => {
        setState({ id, title });
        toggleModal();
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
                            <Table.Theader.WithSortData
                                onClick={() => toSort("title", update)}
                                icon={getIcon("title")}
                                column="title"
                                className="w-6/12"
                                >
                                título
                            </Table.Theader.WithSortData>
                            <Table.Theader.WithSortData
                                onClick={() => toSort("slug", update)}
                                icon={getIcon("slug")}
                                column="slug"
                                className="w-6/12"
                            >
                                slug
                            </Table.Theader.WithSortData>
                            <Table.Theader className="w-32"></Table.Theader>
                        </Table.Trow>
                    </Table.Thead>
                    <Table.Tbody>
                        {records && records.records.map((record, index) => (
                            <Table.Trow key={index}>
                                <Table.Tdata>
                                    { record.title }
                                </Table.Tdata>
                                <Table.Tdata>
                                    { record.slug }
                                </Table.Tdata>
                                <Table.Tdata className="w-32">
                                    <div className="flex gap-5">
                                        <NavLink to={`${edit.slug}/${record.id}`}>
                                            <Pen />
                                        </NavLink>
                                        <button onClick={() => handleToModal(record.id, record.title)}>
                                            <Trash />
                                        </button>
                                    </div>
                                </Table.Tdata>
                            </Table.Trow>
                        ))}
                    </Table.Tbody>
                </Table>
                <Paginate
                    data={records}
                    onFirstPage={(query) => update(query)}
                    onPrevious={(query) => update(query)}
                    onNext={(query) => update(query)}
                    onLastPage={(query) => update(query)}
                    onPageTo={(query) => update(query)}
                />
            </div>
        </div>
    )
}

export default List;