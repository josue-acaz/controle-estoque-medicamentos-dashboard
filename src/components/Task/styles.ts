import styled from "styled-components";
import {TableHeadCellProps, TableCellProps, TableRowViewProps} from "./types";

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

    @media screen and (max-width: 1200px) {
        border-left: 1px solid #eeeeee;
    }
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
    z-index: 100;
    padding: 15px;
    font-size: 14px;
    color: ${props => props.textColor ? props.textColor : "#444444"};
    font-weight: 600;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    @media screen and (max-width: 1200px) {
        font-size: 10px;
        border-top: 1px solid #eeeeee;
    }
    text-align: ${props => props.align ? props.align : "left"};
    background-color: ${props => props.color ? props.color : "#ffffff"};
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
    color: ${props => props.color ? props.color : "#333333"};
    text-align: ${props => props.align ? props.align : "left"};
    ${props => props.padding === "checkbox" ? "width: 55px; padding: 0 0 0 5px" : ""};

    @media screen and (max-width: 1200px) {
        font-size: 10px;
    }
`;

const TableRow = styled.tr<TableRowViewProps>`
    display: table-row;
    vertical-align: middle;
    position: relative;
    //transform: scale(1);
    background-color: ${props => props.selected ? "rgb(255, 226, 236)" : "#ffffff"};
    &:nth-child(even){
        background-color: ${props => props.selected ? "rgb(255, 226, 236)" : "#f2f2f2"};
    }
    &:hover {
        background-color: ${props => props.selected ? "rgb(255, 226, 236);" : "#f2f2f2"};
        ${props => props.enableHover ? `
            cursor: pointer;
            background-color: rgba(76, 175, 80, .5)
        ` : ``};
    }
    ${props => props.hoverSelected ? `background-color: rgba(76, 175, 80, .3)` : ``};
    ${props => props.hoverSelected ? `
        &:nth-child(even){
            background-color: rgba(76, 175, 80, .3)
        }
    ` : ``};
`;

const SelectedRow = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(76, 175, 80, .3);
`;

const ActionsView = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const ActionButton = styled.button`
    padding: 5px;
    border: 1px solid #cccccc;
    margin-right: 10px;

    &:hover {
        cursor: pointer;
        background-color: #cccccc;
    }
`;

export {
    TableView,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableHeadCell,
    SelectedRow,
    ActionsView,
    ActionButton,
};