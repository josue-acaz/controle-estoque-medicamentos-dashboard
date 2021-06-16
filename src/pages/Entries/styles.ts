import styled from "styled-components";

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
    padding: 15px 15px;
    overflow-y: scroll;
`;

const List = styled.div`
    position: relative;
    grid-area: list;
    background-color: #ffffff;
    border-top: outset;
    border-width: 3px;
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
    grid-template-rows: .5fr 6fr;
    grid-template-areas: "stock-header overview-header"
                         "stock overview";
    padding: 15px 15px;
`;

const Overview = styled.div`
    grid-area: overview;
    background-color: #ffffff;
    position: relative;
`;

const StockHeader = styled.div`
    grid-area: stock-header;
`;

const Stock = styled.div`
    grid-area: stock;
    background-color: #ffffff;
    position: relative;
`;

const OverviewHeader = styled.div`
    grid-area: overview-header;
    margin-left: 5px;
`;

const Logo = styled.img`
    height: 160px;
    width: 300px;
    object-fit: cover;
`;

const Title = styled.p`
    font-size: 18px;
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

const SelectAction = styled.div``;

export {
    EntryView,
    Toolbar,
    Form,
    List,
    Title,
    ListView,
    Logo,
    Stock,
    StockHeader,
    Header,
    Configs,
    SelectAction,
    Overview,
    OverviewHeader,
};