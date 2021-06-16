import React from "react";
import clsx from "clsx";
import {lighten, makeStyles} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";

// types
import {MinimumStockRowProps} from "./types";
import {TableHeadProps} from "../../../../components/Table/types";

// components
import Table from "../../../../components/Table";

// styles
import {
    ToolbarView, 
    ToolbarItem, 
    ToolbarText,
} from "./styles";
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";
import {View} from "../../../../design";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: 5,
        paddingRight: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
      fontSize: 16,
      color: '#444444',
      marginLeft: 1
    },
}));

export default function MinimumStockView(props: MinimumStockRowProps) {
    const {base, numSelected, selected} = props;
    const classes = useToolbarStyles();

    const headLabels: Array<TableHeadProps> = [
        {
            key: "name",
            value: "Item",
        },
        {
            key: "quantity",
            value: "Quantidade",
        },
    ];

    return(
        <View style={{marginBottom: 15, padding: 0}}>
            <Toolbar className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0 && selected,
                })}>
                <ToolbarView>
                    <ToolbarItem>
                        <ToolbarText>{base.name}</ToolbarText>
                    </ToolbarItem>
                </ToolbarView>
            </Toolbar>
            <Table headLabels={headLabels}>
                {base.minimum_stocks?.map(minimum_stock => (
                    <TableRow>
                        <TableCell>{minimum_stock.product?.name}</TableCell>
                        <TableCell>{minimum_stock.quantity}</TableCell>
                    </TableRow>
                ))}
            </Table>
        </View>
    );
}