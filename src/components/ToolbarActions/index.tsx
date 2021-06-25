import React from "react";
import {Link} from "react-router-dom";

// constants
import {EnumActions} from "../../constants";

// types
import {ToolbarActionsProps} from "./types";

// styles
import {
    ToolbarActionsView, 
    AddButton, 
    Title, 
    RightActions,
    GoBackButton,
    LeftActions,
    History,
    HistorySpan,
    HistoryText,
} from "./styles";

// icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function ToolbarActions(props: ToolbarActionsProps) {
    const {title, onAdd, action, onGoBack, routes, Custom} = props;

    return(
        <ToolbarActionsView>
            {action === EnumActions.LIST && (
                <>
                    <Title>{title}</Title>
                    <RightActions>
                        {(Custom && action === EnumActions.LIST) && <Custom />}
                        {onAdd && <AddButton onClick={onAdd}>Adicionar</AddButton>}
                    </RightActions>
                </>
            )}
            {action === EnumActions.ADD && (
                <LeftActions>
                    <GoBackButton onClick={onGoBack}>
                        <ArrowBackIcon className="icon" />
                    </GoBackButton>
                    <History>
                        {routes?.map((route, index) => (
                            <HistorySpan>
                                {index !== routes.length - 1 ? (
                                    <>
                                        <Link className="link" to={route.path}>{route.label}</Link>
                                        <ArrowForwardIosIcon className="icon" />
                                    </>
                                ) : <HistoryText><p>{route.label}</p></HistoryText>}
                            </HistorySpan>
                        ))}
                    </History>
                </LeftActions>
            )}
        </ToolbarActionsView>
    );
}
