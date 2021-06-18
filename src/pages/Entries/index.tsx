import React, {useState} from "react";

// components
import ListInputs from "./ListInputs";
import ListOutputs from "./ListOutputs";
import ListStocks from "./ListStocks";
import ListLots from "./ListLots";
import EditInput from "./EditInput";
import EditOutput from "./EditOutput";
import Select from "../../components/form/Select";
import Drawer from "../../components/Drawer";

// models
import Input from "../../models/Input";
import Output from "../../models/Output";
import ProductInput from "../../models/ProductInput";

// types
import {RefreshProps} from "./types";
import {OptionProps} from "../../components/form/Select/types";

// styles
import {
    EntryView, 
    Form, 
    List, 
    ListView, 
    Title,
    Stock,
    StockHeader,
    Overview,
    OverviewHeader,
    ButtonNew,
    Header,
    Configs,
    SelectAction,
    ActionTitle,
    ActionSubtitle,
} from "./styles";

export default function Entries() {
    const actions: Array<OptionProps> = [
        {
            label: "Compra",
            value: "input",
        },
        {
            label: "Saída",
            value: "output"
        },
    ];

    const [action, setAction] = useState<OptionProps>(actions[0]);
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleChangeAction(option: OptionProps) {
        setAction(option);
    }

    const [refresh, setRefresh] = useState<RefreshProps>({
        input_list: false,
        output_list: false,
        stock_list: false,
    });

    const [selectedInput, setSelectedInput] = useState<Input>(new Input());
    const [selectedOutput, setSelectedOutput] = useState<Output>(new Output());
    const [selectedStock, setSelectedStock] = useState<ProductInput>(new ProductInput());

    function toggleRefresh(key: string) {
        setRefresh(refresh => ({...refresh, [key]: !refresh[key]}));
    }

    function handleSavedInput(input: Input) {
        toggleRefresh("input_list");
    }
    
    function handleSavedProductInput() {
        toggleRefresh("stock_list");
    }

    function handleInputSelected(input: Input) {
        setSelectedInput(input);
    }

    function handleOutputSelected(output: Output) {
        setSelectedOutput(output);
    }

    function handleSavedOutput(output: Output) {
        toggleRefresh("output_list");
    }

    function handleSavedProductOutput() {
        toggleRefresh("stock_list");
    }

    function handleStockSelected(product_input: ProductInput) {
        handleOpen();
        setSelectedStock(product_input);
    }

    function handleNew() {
        if(action.value === "input") {
            setSelectedInput(new Input());
        } else {
            setSelectedOutput(new Output());
        }
    }

    return(
        <React.Fragment>
            <EntryView>
                <Form>
                    <Header>
                        <Configs>
                            <ActionTitle>{action.label}</ActionTitle>
                            <ActionSubtitle>#{action.value === "input" ? selectedInput.id : selectedOutput.id}</ActionSubtitle>
                        </Configs>
                        <SelectAction>
                            {(selectedInput.id || selectedOutput.id) && (<ButtonNew onClick={handleNew}>Nova {action.label}</ButtonNew>)}
                            <Select name="action" options={actions} onChange={handleChangeAction} />
                        </SelectAction>
                    </Header>
                    {action.value === "input" ? (
                        <EditInput 
                            input={selectedInput} 
                            onSaved={handleSavedInput} 
                            onProductInputSaved={handleSavedProductInput}
                        />
                    ) : (
                        <EditOutput 
                            output={selectedOutput} 
                            onSaved={handleSavedOutput}
                            onProductOutputSaved={handleSavedProductOutput}
                        />
                    )}
                </Form>
                <List>
                    <ListView>
                        <StockHeader>
                            <Title>Estoque</Title>
                        </StockHeader>
                        <Stock>
                            <ListStocks 
                                refresh={refresh.stock_list} 
                                onStockSelected={handleStockSelected} 
                            />
                        </Stock>

                        <OverviewHeader>
                            <Title>{action.label+"s"}</Title>
                        </OverviewHeader>
                        <Overview>
                            {action.value === "input" ? (
                                <ListInputs 
                                    refresh={refresh.input_list} 
                                    inputSelected={selectedInput}
                                    onInputSelected={handleInputSelected} 
                                />
                            ) : (
                                <ListOutputs    
                                    refresh={refresh.output_list} 
                                    outputSelected={selectedOutput}
                                    onOutputSelected={handleOutputSelected}
                                />
                            )}
                        </Overview>
                    </ListView>
                </List>
            </EntryView>
            <Drawer open={open} title={`Estoque em ${selectedStock.base?.name}`} subtitle={selectedStock.product?.name} onClose={handleClose}>
                <ListLots product_input={selectedStock} />
            </Drawer>
        </React.Fragment>
    );
}
