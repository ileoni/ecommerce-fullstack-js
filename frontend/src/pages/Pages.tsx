import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { ArrowDownWideNarrow, ArrowUpDown, ArrowUpNarrowWide, Pen, Trash } from "lucide-react";

import { pages, type Page } from "../services/admin/pages";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";
import Paginate from "../components/ui/Paginate";
import RegisterNavLinkStyle from "../components/ui/HOC/RegisterNavLinkStyle";
import { useOverlay } from "../contexts/Overlay";
import ConfirmationModal from "../components/ui/ConfirmationModal";

type SortConfigs = { key: null | string, orderType: number }
type ModalConfigs = { id: null | number, name: string };

function Pages() {
    const [data, setData] = useState<Page>();
    const [sortConfigs, setSortConfigs] = useState<SortConfigs>({ key: null, orderType: 0 });
    
    const RegisterNavLink = RegisterNavLinkStyle(NavLink);
    
    useEffect(() => {
        updateData();
    }, [])

    const updateData = (query: string = "") => {
        pages(query)
        .then(async res => {
            const { data } = await res.json();
            setData(data);
        })
    }

    const handleDelete = (id: number) => {
        console.log(id);
        updateData();
    }

    const { toggleModal, setState } = useOverlay({ Component: <ConfirmationModal onDelete={handleDelete} /> });
    
    const handleClick = (query: string) => {
        updateData(query);
    }

    const toSort = (column: string) => {
        let orderType = 1;
        
        if(sortConfigs.key === column) {
            orderType = (sortConfigs.orderType + 1) % 3;
        }
        
        setSortConfigs({ key: column, orderType });

        const query = `?orderType=${orderType}&column=${column}&page=${data?.currentPage}`;
        updateData(query);
    }

    const getIcon = (column: string) => {
        if(sortConfigs.key === column) {
            switch (sortConfigs.orderType) {
                case 0:
                    return <ArrowUpDown className="size-4"/>;
                case 1:
                    return <ArrowUpNarrowWide className="size-4"/>;
                case 2:
                    return <ArrowDownWideNarrow className="size-4"/>;
                default:
                    return <ArrowUpDown className="size-4"/>;
            } 
        }
        return <ArrowUpDown className="size-4"/>;
    }

    const handleSort = (column: string) => {
        toSort(column);
    }

    const handleToModal = (id: number, title: string) => {
        setState({ id, title });
        toggleModal();
    }

    return (
        <Card>
            <div className="grid gap-5">
                <div className="flex justify-end">
                    <RegisterNavLink to="cadastrar">
                        Cadastrar
                    </RegisterNavLink>
                </div>
                <div>
                    <Table>
                        <Table.Thead>
                            <Table.Trow>
                                <Table.Theader.WithSortData
                                    className="w-6/12" 
                                    onClick={() => handleSort("title")}
                                    icon={getIcon("title")}
                                    column="title"
                                >
                                    título
                                </Table.Theader.WithSortData>
                                <Table.Theader.WithSortData
                                    className="w-6/12"
                                    onClick={() => handleSort("slug")}
                                    icon={getIcon("slug")}
                                    column="slug"
                                >
                                    slug
                                </Table.Theader.WithSortData>
                                <Table.Theader className="w-32"></Table.Theader>
                            </Table.Trow>
                        </Table.Thead>
                        <Table.Tbody>
                            { data && data.records.map((record, index) => (
                                <Table.Trow key={index}>
                                    <Table.Tdata>
                                        { record.title }
                                    </Table.Tdata>
                                    <Table.Tdata>
                                        { record.slug }
                                    </Table.Tdata>
                                    <Table.Tdata className="w-32">
                                        <div className="grid grid-flow-col gap-5">
                                            <NavLink to={`editar/${record.id}`}>
                                                <Pen />
                                            </NavLink>
                                            <button onClick={() => handleToModal(record.id, record.title)}>
                                                <Trash />
                                            </button>
                                        </div>
                                    </Table.Tdata>
                                </Table.Trow>
                            )) }
                        </Table.Tbody>
                    </Table>
                    <Paginate
                        data={data}
                        onFirstPage={handleClick}
                        onPrevious={handleClick}
                        onNext={handleClick}
                        onLastPage={handleClick}
                        onPageTo={handleClick}
                    />
                </div>
            </div>
        </Card>
    )
}

export default Pages;