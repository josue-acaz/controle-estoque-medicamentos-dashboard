import React, {useState} from "react";
import Input from "../../../form/Input";

// styles
import {
    SearchView, 
    SearchButton,
    SearchCollapse,
    SearchContent,
    CloseView,
    CloseLink,
} from "./styles";
import {Button} from "../../../../design";

// icons
import SearchIcon from "@material-ui/icons/Search";

export default function Search() {
    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(!open);
    }

    return(
        <React.Fragment>
            <SearchView>
                <SearchButton onClick={toggleOpen}>
                    <SearchIcon className="icon" />
                </SearchButton>
            </SearchView>
            {open && (
                <SearchCollapse>
                    <SearchContent>
                        <Input placeholder="Pesquisar por..." />
                        <Button style={{width: "100%"}}>
                            <SearchIcon />
                        </Button>
                    </SearchContent>
                    <CloseView>
                        <CloseLink onClick={toggleOpen}>Fechar</CloseLink>
                    </CloseView>
                </SearchCollapse>
            )}
        </React.Fragment>
    );
}