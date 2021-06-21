import React from "react";

// components
import Search from "./Search";
import Tooltip from "@material-ui/core/Tooltip";

// types
import {ToolbarProps} from "./types";

// styles
import {
    ToolbarView,
    ToolbarLeft,
    ToolbarRight,
    Title,
    NumSelectedText,
    NumSelectedActions,
    AddButton,
    DeleteButton,
} from "./styles";

// icons
import DeleteIcon from '@material-ui/icons/Delete';

export default function Toolbar(props: ToolbarProps) {
    const {numSelected, onAdd} = props;

    return(
        <ToolbarView {...props}>
            <ToolbarLeft>
                {numSelected > 0 ? (
                    <React.Fragment>
                        <NumSelectedText>{numSelected} selecionado(s)</NumSelectedText>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Title>Fornecedores</Title>
                        <Search />
                    </React.Fragment>
                )}
            </ToolbarLeft>
            <ToolbarRight>
                <NumSelectedActions>
                    {numSelected > 0 ? (
                        <Tooltip title="Excluir selecionado(s)">
                            <DeleteButton>
                                <DeleteIcon className="icon" />
                            </DeleteButton>
                        </Tooltip>
                    ) : (
                        <AddButton onClick={onAdd}>Adicionar</AddButton>
                    )}
                </NumSelectedActions>
            </ToolbarRight>
        </ToolbarView>
    );
}
