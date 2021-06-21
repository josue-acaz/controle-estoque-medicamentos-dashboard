import styled from "styled-components";
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
    overflow-y: scroll;
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
`;

const Overview = styled.div`
    grid-area: overview;
    background-color: #ffffff;
    position: relative;
`;

const Stock = styled.div`
    grid-area: stock;
    background-color: #ffffff;
    position: relative;
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
`;

const Configs = styled.div``;

const SelectAction = styled.div`
    display: flex;
    align-items: center;
`;

const ActionTitle = styled.p`
    font-size: 18px;
    color: #444444;
    font-weight: bold;
`;

const ActionSubtitle = styled.p`
    font-size: 14px;
    color: #888888;
`;

const ButtonNew = styled.button`
    width: auto;
    width: 200px;
    border: none;
    background-color: transparent;
    color: ${EnumAppColors.PRIMARY};
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    height: 45px;
    padding-left: 1rem;
    padding-right: 1rem;
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
};