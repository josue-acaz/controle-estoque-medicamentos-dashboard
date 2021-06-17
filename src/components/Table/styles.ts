import styled from "styled-components";
import {TableHeadCellProps} from "./types";
import {EnumAppColors} from "../../constants";

const TableView = styled.table`
    width: 100%;
    display: table;
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: auto;
    overflow-wrap: break-word;
    position: relative;
    background-color: #ffffff;
    z-index: 50;
`;

const TableBody = styled.tbody`
    width: 100%;
    display: table-row-group;
`;

const TableHead = styled.thead`
    width: 100%;
    z-index: 400;
    margin: 0;
    padding: 0;
    display: table-header-group;
`;

const TableHeadCell = styled.th<TableHeadCellProps>`
    padding: 10px;
    text-align: left;
    background-color: ${props => props.color ? props.color : EnumAppColors.PRIMARY};
    color: #ffffff;
    font-weight: 600;
    z-index: 100;
    border: 1px solid #ffffff;
    font-size: 14px;
    ${props => props.fixedHeader ? "position: sticky; top: 0px" : ""};
`;

const TableCell = styled.td`
    display: table-cell;
    border: 1px solid #ffffff;
    padding: 1rem;
    vertical-align: middle;
    position: relative;
    font-size: 14px;
`;

const TableRow = styled.tr`
    display: table-row;
    vertical-align: middle;
    &:nth-child(even){background-color: #f2f2f2;}
    &:hover {background-color: #f2f2f2;}
    position: relative;
`;

const SelectedRow = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(76, 175, 80, .3);
`;

export {
    TableView,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableHeadCell,
    SelectedRow,
};