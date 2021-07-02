import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import ToolbarAction from "../../../components/ToolbarActions";
import {EnumActions} from "../../../constants";
import {onlyNumbers} from "../../../utils";

// types
import {RouteChildrenProps} from "react-router-dom";
import {RouteParamsProps} from "./types";
import {ToolbarRouteProps} from "../../../components/ToolbarActions/types";

// contexts
import {useFeedback} from "../../../contexts/feedback/feedback.context";

// components
import Loading from "../../../components/spinners/Loading";
import Processing from "../../../components/spinners/Processing";
import Autocomplete from "../../../components/form/Autocomplete";
import TextArea from "../../../components/form/TextArea";
import Alert from "../../../components/Alert";

// services
import transferService from "../../../services/transfer.service";

// models
import Lot from "../../../models/Lot";
import Transfer from "../../../models/Transfer";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
} from "../../../design/grid";
import {View, Button, InputLabel} from "../../../design";
import {
    TransferForm, 
    LotOptionView, 
    LotProductName, 
    LotSerialNumber,
    SelectedLot,
    LotOptionData,
    LotBaseData,
    LotBaseText,
    LotTransferredView,
    LotTransferredSerialNumber,
    LotTransferredData,
    LotTransferredProductText,
} from "./styles";

export default function EditTransfer(props: RouteChildrenProps) {
    const {history} = props;
    const id = useParams<RouteParamsProps>().id;
    const edit = id !== "0";

    const historyActions: Array<ToolbarRouteProps> = [
        {
            label: "Transferências",
            path: "/transfers"
        },
        {
            label: edit ? id : "Nova transferência",
            path: `/transfers/${id}/edit`,
        },
    ];

    const feedback = useFeedback();
    const [loading, setLoading] = useState(edit);
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [lot, setLot] = useState<Lot>(new Lot());
    const [inputs, setInputs] = useState<Transfer>(new Transfer());

    function handleChange(e: any) {
        let {name, value} = e.target;

        if(name === "product_input_id") {
            setLot(value);
            value = value.product_input?.id;
        }

        if(name === "destination_base_id") {
            value = value.id;
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleGoBack() {
        history.goBack();
    }

    async function show() {
        try {
            const transfer = await transferService.getById(id);

            // Adicionar lote
            if(transfer.product_input) {
                if(transfer.product_input.lot) {
                    setLot(transfer.product_input.lot);
                }
            }

            setInputs(transfer);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function save() {
        try {
            const transfer = edit ? 
            await transferService.update(id, inputs) : 
            await transferService.create(inputs);
            feedback.open({severity: "success"});
            handleGoBack();
        } catch (error) {
            setProcessing(false);
            if(error.response) {
                feedback.open({
                    severity: "error",
                    msg: error.response.data.msg,
                });
            } else {
                feedback.open({severity: "error"});
            }
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(true);

        if(inputs.product_input_id && inputs.destination_base_id) {
            setOpen(true);
        }
    }

    async function handleSave() {
        setProcessing(true);
        setOpen(false);
        await save();
    }

    function handleCancel() {
        setOpen(false);
    }
    
    useEffect(() => {
        if(edit) {
            show();
        }
    }, []);

    return(
        <GridContainer>
            <Alert 
                open={open} 
                theme="primary" 
                title="Confirmar operação?" 
                msg=""
                onCancel={handleCancel} 
                onClose={handleCancel}
                onConfirm={handleSave}
            />
            <GridToolbar>
                <ToolbarAction 
                    title="Nova categoria"
                    action={EnumActions.ADD}  
                    onGoBack={handleGoBack}
                    routes={historyActions}
                />
            </GridToolbar>
            <GridContent>
                {processing ? <Processing title="Processando..." msg="Por favor, aguarde!" /> : (
                    loading ? <Loading /> : (
                        <View padding="15">
                            <TransferForm onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm="6">
                                        {!edit ? (
                                            <React.Fragment>
                                                    <InputLabel>Selecione o lote</InputLabel>
                                                    <Autocomplete
                                                        name="product_input_id"
                                                        fieldName="serial_number"
                                                        endpoint="/lots/autocomplete"
                                                        placeholder="Seleção do lote"
                                                        inputText={inputs.product_input?.lot?.serial_number}
                                                        onOptionSelected={handleChange}
                                                        renderOption={(option: Lot) => (
                                                            <LotOptionView>
                                                                <LotOptionData>
                                                                    <LotSerialNumber><strong>{option.serial_number.toUpperCase()}</strong>, possui {option.product_outputs?.length} saidas.</LotSerialNumber>
                                                                    <LotProductName>{option.product_input?.product?.name}</LotProductName>
                                                                </LotOptionData>
                                                                <LotBaseData>
                                                                    <LotBaseText>{option.product_input?.base?.name}</LotBaseText>
                                                                </LotBaseData>
                                                            </LotOptionView>
                                                        )}
                                                        error={submitted && !inputs.product_input_id}
                                                    />
                                                    {lot.id && (
                                                        <React.Fragment>
                                                            <SelectedLot><strong>*{lot.product_input?.product?.name}</strong>, {lot.product_input?.base?.name}</SelectedLot>
                                                        </React.Fragment>
                                                    )}
                                            </React.Fragment>
                                        ) : (
                                            <LotTransferredView>
                                                <LotTransferredData>
                                                    <LotTransferredSerialNumber>#{lot.serial_number.toUpperCase()}</LotTransferredSerialNumber>
                                                </LotTransferredData>
                                                <LotBaseData>
                                                    <LotTransferredProductText>
                                                        <strong>{inputs.product_input?.product?.name}</strong>, {inputs.origin_base?.name}
                                                    </LotTransferredProductText>
                                                </LotBaseData>
                                            </LotTransferredView>
                                        )}
                                        
                                    </Col>
                                    <Col sm="6">
                                        <InputLabel>Base de destino</InputLabel>
                                        <Autocomplete
                                            fieldName="name"
                                            name="destination_base_id"
                                            endpoint="/bases/autocomplete"
                                            renderOption={(option) => (
                                                <div>{option.name}</div>
                                            )}
                                            onOptionSelected={handleChange}
                                            inputText={inputs.destination_base?.name}
                                            placeholder="Selecione o destino"
                                            error={submitted && !inputs.destination_base_id}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12">
                                        <InputLabel>Motivo</InputLabel>
                                        <TextArea 
                                            name="description" 
                                            value={inputs.description} 
                                            onChange={handleChange} 
                                            placeholder="Motivo da transferência" 
                                        />
                                    </Col>
                                </Row>

                                <Button type="submit">Salvar</Button>
                            </TransferForm>
                        </View> 
                    )
                )}
            </GridContent>
        </GridContainer>
    );
}
