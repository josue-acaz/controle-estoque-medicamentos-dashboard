import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import HoverMaskButton from "../HoverMaskButton";

// types
import {
    TableProps, 
    TableRowComponentProps,
    TableHeadComponentProps,
} from "./types";

// styles
import {
    TableView, 
    TableHead, 
    TableRow, 
    TableHeadCell,
    TableBody,
    TableCell,
    ActionsView,
    ActionButton,
    SelectedRow,
} from "./styles";

// icons
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

function TableHeadComponent(props: TableHeadComponentProps) {
    const {color, rowCount, selectable, numSelected, headLabels, fixedHeader, widthActions, onSelectAllClick} = props;

    return(
        <TableHead>
            <TableRow>
                {selectable && (
                    <TableHeadCell padding="checkbox" fixedHeader={fixedHeader}>
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableHeadCell>
                )}
                {headLabels.map(head_label => (
                    <TableHeadCell 
                        key={head_label.key} 
                        color={color}
                        textColor={head_label.textColor}
                        fixedHeader={fixedHeader}
                    >
                        {head_label.value}
                    </TableHeadCell>
                ))}
                {widthActions && <TableHeadCell align="right">Ações</TableHeadCell>}
            </TableRow>
        </TableHead>
    );
}

function TableRowComponent(props: TableRowComponentProps) {
    const {row, selected, selectable, widthActions, hoverTitle, hoverSelected, disable_select, actions, onClick, onEdit, onHoverClick} = props;
    const hoverEnabled = !!hoverTitle || !!onHoverClick;

    return(
        <TableRow selected={selected} enableHover={hoverEnabled} hoverSelected={hoverSelected && !selected} onClick={() => {
            if(hoverEnabled && onHoverClick) {
                onHoverClick();
            }
        }}>
            {selectable && (
                <TableCell padding="checkbox">
                    <Checkbox checked={selected} onClick={(event) => {
                        if(!disable_select) {
                            onClick(event, row.id);
                        }
                    }} />
                </TableCell>
            )}
            {row.cells.map(cell => <TableCell color={cell.color}>{cell.value}</TableCell>)}
            {widthActions && (
                <TableCell align="right">
                    <ActionsView>
                        {onEdit && (
                            <Tooltip title="Editar">
                                <ActionButton onClick={() => onEdit(row.id)}>
                                    <EditOutlinedIcon className="icon" />
                                </ActionButton>
                            </Tooltip>
                        )}
                        {actions && actions.map(action => (
                            <Tooltip title={action.label}>
                                <ActionButton onClick={() => action.onClick(row.id)}>
                                    {action.icon}
                                </ActionButton>
                            </Tooltip>
                        ))}
                    </ActionsView>
                </TableCell>
            )}
        </TableRow>
    );
}

export default function Task(props: TableProps) {
    const {color, rows, selectable=true, headLabels, fixedHeader, selecteds, widthActions=true, onEditRow, onChangeSelecteds} = props;

    const handleClick = (event: any, id: string) => {
        const selectedIndex = selecteds.indexOf(id);
        let newSelected: Array<string> = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selecteds, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selecteds.slice(1));
        } else if (selectedIndex === selecteds.length - 1) {
          newSelected = newSelected.concat(selecteds.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selecteds.slice(0, selectedIndex),
            selecteds.slice(selectedIndex + 1),
          );
        }
    
        onChangeSelecteds(newSelected);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
          const newSelecteds = rows.filter(row => !row.disable_select).map((n) => n.id);
          onChangeSelecteds(newSelecteds);
          return;
        }

        onChangeSelecteds([]);
    };

    const isSelected = (id: string) => selecteds.indexOf(id) !== -1;

    return(
        <TableView>
            <TableHeadComponent 
                color={color}
                rowCount={rows.length} 
                headLabels={headLabels}
                selectable={selectable}
                fixedHeader={fixedHeader}
                widthActions={widthActions}
                numSelected={selecteds.length}
                onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
                {rows.map(row => (
                    <TableRowComponent 
                        row={row}
                        onEdit={onEditRow}
                        onClick={handleClick} 
                        actions={row.actions}
                        selectable={selectable}
                        selected={isSelected(row.id)}
                        widthActions={widthActions}
                        hoverTitle={row.hoverTitle}
                        disable_select={row.disable_select}
                        hoverSelected={row.hoverSelected}
                        onHoverClick={row.onHoverClick}
                    />
                ))}
            </TableBody>
        </TableView>
    );
}