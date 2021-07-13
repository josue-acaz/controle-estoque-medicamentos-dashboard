import styled from "styled-components";
import {StockProps} from "./types";
import {EnumAppColors} from "../../constants";

const EntryView = styled.div`
    overflow: hidden;
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-template-columns: 5fr;
    transition: 2s;
    grid-template-rows: 3fr 2.5fr;
    grid-template-areas: "form"
                         "list";

    @media screen and (max-width: 1200px) {
        grid-template-rows: 3fr 3fr;
    }
`;

const Toolbar = styled.div`
    grid-area: toolbar;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f2f2f2;
`;

const Form = styled.div`
    grid-area: form;
    background-color: #ffffff;
    padding: 10px 10px;
    overflow-y: auto;
`;

const List = styled.div`
    position: relative;
    grid-area: list;
    background-color: #ffffff;
    box-shadow: 0 1px 15px rgba(0,0,0,.08),0 1px 6px rgba(0,0,0,.08);
`;

const ListView = styled.div`
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-template-columns: 2fr 3fr;
    transition: 2s;
    grid-template-rows: 5fr;
    grid-template-areas: "stock overview";
    padding-left: 10px;
    padding-right: 10px;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 5fr;
        grid-template-areas: "overview";
        padding-left: 0px;
        padding-right: 0px;
    }
`;

const Overview = styled.div`
    grid-area: overview;
    background-color: #ffffff;
    position: relative;
`;

const Stock = styled.div<StockProps>`
    grid-area: stock;
    position: relative;
    background-color: #ffffff;

    @media screen and (max-width: 1200px) {
        position: fixed;
        top: 50px;
        left: 0;
        right: 0;
        bottom: 0;
        grid-area: unset;
        z-index: 600;
        display: ${props => props.show ? "block" : "none"};
    }
`;

const Logo = styled.img`
    height: 160px;
    width: 300px;
    object-fit: cover;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #666666;
`;

const Header = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 1200px) {
        display: block;
        height: auto;
    }
`;

const Configs = styled.div``;

const SelectAction = styled.div`
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 1200px) {
        justify-content: space-between;
        margin-top: 5px;
    }
`;

const ActionTitle = styled.p`
    font-size: 18px;
    color: #444444;
    font-weight: bold;

    @media screen and (max-width: 1200px) {
        font-size: 14px;
    }
`;

const ActionSubtitle = styled.p`
    font-size: 14px;
    color: #888888;

    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

const ButtonNew = styled.button`
    width: auto;
    border: none;
    background-color: transparent;
    color: ${EnumAppColors.PRIMARY};
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    height: 45px;
    border-radius: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;

    &:hover {
        filter: brightness(.9);
        cursor: pointer;
        text-decoration: underline;
    }
`;

const ShowStockButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    display: none;
    z-index: 500;
    height: 35px;
    padding-right: 10px;
    padding-left: 10px;
    min-width: 130px;
    border: none;
    background-color: ${EnumAppColors.PRIMARY};
    color: #ffffff;

    @media screen and (max-width: 1200px) {
        display: block;
    }
`;

export {
    EntryView,
    Toolbar,
    Form,
    List,
    Title,
    ListView,
    Logo,
    Stock,
    Header,
    Configs,
    SelectAction,
    Overview,
    ActionTitle,
    ActionSubtitle,
    ButtonNew,
    ShowStockButton,
};