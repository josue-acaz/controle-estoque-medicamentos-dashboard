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
    Subtitle,
    Header,
} from "./styles";

// icons
import DeleteIcon from '@material-ui/icons/Delete';

export default function Toolbar(props: ToolbarProps) {
    const {title, subtitle, search=true, padding, numSelected, onAdd, onDelete} = props;
    const activeSelection = numSelected > 0;

    return(
        <ToolbarView activeSelection={activeSelection} padding={padding}>
            <ToolbarLeft>
                {activeSelection ? (
                    <React.Fragment>
                        <NumSelectedText>{numSelected} selecionado(s)</NumSelectedText>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Header>
                            <Title>{title}</Title>
                            {subtitle && (<Subtitle>{subtitle}</Subtitle>)}
                        </Header>
                        {search && <Search />}
                    </React.Fragment>
                )}
            </ToolbarLeft>
            <ToolbarRight>
                <NumSelectedActions>
                    {activeSelection ? (
                        <React.Fragment>
                            {onDelete && (
                                <Tooltip title="Excluir selecionado(s)">
                                    <DeleteButton onClick={() => onDelete()}>
                                        <DeleteIcon className="icon" />
                                    </DeleteButton>
                                </Tooltip>
                            )}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {onAdd && <AddButton onClick={onAdd}>Adicionar</AddButton>}
                        </React.Fragment>
                    )}
                </NumSelectedActions>
            </ToolbarRight>
        </ToolbarView>
    );
}
