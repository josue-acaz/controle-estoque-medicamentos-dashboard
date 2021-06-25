import styled from "styled-components";
import {TableHeadCellProps, TableCellProps, TableRowProps} from "./types";

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
    padding: 15px;
    text-align: left;
    background-color: ${props => props.color ? props.color : "#ffffff"};
    color: #444444;
    font-weight: 600;
    z-index: 100;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    font-size: 14px;
    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
    ${props => props.fixedHeader ? "position: sticky; top: 0px" : ""};
    ${props => props.padding === "checkbox" ? "width: 55px; padding: 0 0 0 5px" : ""};
`;

const TableCell = styled.td<TableCellProps>`
    display: table-cell;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    padding: 1rem;
    vertical-align: middle;
    position: relative;
    font-size: 14px;
    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
    ${props => props.padding === "checkbox" ? "width: 55px; padding: 0 0 0 5px" : ""};
`;

const TableRow = styled.tr<TableRowProps>`
    display: table-row;
    vertical-align: middle;
    position: relative;
    ${props => props.selected ? `
        background-color: rgb(255, 226, 236);
        &:nth-child(even){background-color: rgb(255, 226, 236);}
        &:hover {background-color: rgb(255, 226, 236);}
    ` : `
        background-color: #ffffff;
        &:nth-child(even){background-color: #f2f2f2;}
        &:hover {background-color: #f2f2f2;}
    `}
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