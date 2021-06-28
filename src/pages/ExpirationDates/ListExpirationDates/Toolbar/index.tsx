import React, {useState, useEffect} from "react";

// models
import Base from "../../../../models/Base";

// services
import baseService from "../../../../services/base.service";

// types
import {ToolbarProps} from "./types";
import {OptionProps} from "../../../../components/form/Select/types";
import {PaginationProps} from "../../../../components/Task/Pagination/types";

// components
import Select from "../../../../components/form/Select";

// styles
import {ToolbarView, Header, Title, Subtitle, ToolbarCol} from "./styles";

export default function Toolbar(props: ToolbarProps) {
    const {title, subtitle, onChange} = props;

    const [loading, setLoading] = useState(true);
    const [bases, setBases] = useState<Array<Base>>([]);
    const [options, setOptions] = useState<Array<OptionProps>>([]);
    const [pagination, setPagination] = useState<PaginationProps>({
        limit: 10, 
        offset: 0, 
        page: 0,
        count: 0,
        text: "",
        order: "DESC", 
        filter: "name", 
        orderBy: "name",
    });
    
    async function index() {
        try {
            const bases = await baseService.pagination(pagination);
            const {rows, count} = bases;

            setOptions(rows.map(base => ({
                value: base.id,
                label: base.name,
            })));

            setBases(rows);
            onChange(rows[0]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {index()}, []);

    function handleChange(option: OptionProps) {
        const {value} = option;
        const base = bases.find(base => base.id === value);
        if(base) {
            onChange(base);
        }
    }

    return(
        <ToolbarView>
            <ToolbarCol>
                <Header>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                </Header>
            </ToolbarCol>
            <ToolbarCol>
                <Select name="base_id" options={options} onChange={handleChange} initializing={loading} />
            </ToolbarCol>
        </ToolbarView>
    );
}