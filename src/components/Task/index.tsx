import React from "react";
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
    EditButton,
    SelectedRow,
} from "./styles";

// icons
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

function TableHeadComponent(props: TableHeadComponentProps) {
    const {color, rowCount, numSelected, headLabels, fixedHeader, widthActions, onSelectAllClick} = props;

    return(
        <TableHead>
            <TableRow>
                <TableHeadCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableHeadCell>
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
    const {row, selected, widthActions, hoverTitle, hoverSelected, onClick, onEdit, onHoverClick} = props;

    return(
        <TableRow selected={selected}>
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onClick={(event) => onClick(event, row.id)} />
            </TableCell>
            {row.cells.map(cell => <TableCell color={cell.color}>{cell.value}</TableCell>)}
            {widthActions && (
                <TableCell align="right">
                    <ActionsView>
                        {onEdit && (
                            <EditButton onClick={() => onEdit(row.id)}>
                                <EditOutlinedIcon className="icon" />
                            </EditButton>
                        )}
                    </ActionsView>
                </TableCell>
            )}
            {onHoverClick && !selected && <HoverMaskButton title={hoverTitle} onClick={onHoverClick} />}
            {hoverSelected && !selected && <SelectedRow />}
        </TableRow>
    );
}

export default function Task(props: TableProps) {
    const {color, rows, headLabels, fixedHeader, selecteds, widthActions=true, onEditRow, onChangeSelecteds} = props;

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
          const newSelecteds = rows.map((n) => n.id);
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
                        selected={isSelected(row.id)}
                        widthActions={widthActions}
                        hoverTitle={row.hoverTitle}
                        hoverSelected={row.hoverSelected}
                        onHoverClick={row.onHoverClick}
                    />
                ))}
            </TableBody>
        </TableView>
    );
}