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
import Input from "../../../components/form/Input";
import Alert from "../../../components/Alert";

// services
import minimumStockService from "../../../services/minimum-stock.service";

// models
import MinimumStock from "../../../models/MinimumStock";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
} from "../../../design/grid";
import {View, Button, InputLabel} from "../../../design";
import {CategoryForm} from "./styles";

export default function EditMinimumStock(props: RouteChildrenProps) {
    const {history} = props;
    const [id, setId] = useState(useParams<RouteParamsProps>().id);
    const edit = id !== "0";

    const historyActions: Array<ToolbarRouteProps> = [
        {
            label: "Estoque mínimo",
            path: "/minimum-stocks"
        },
        {
            label: edit ? id : "Novo estoque mínimo",
            path: `/minimum-stocks/${id}/edit`,
        },
    ];

    const feedback = useFeedback();
    const [loading, setLoading] = useState(edit);
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState<MinimumStock>(new MinimumStock());

    function handleChange(e: any) {
        let {name, value} = e.target;

        if(name === "base_id" || name === "product_id") {
            value = value.id;
        }

        if(name === "quantity") {
            value = onlyNumbers(value);
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleGoBack() {
        history.goBack();
    }

    async function save() {
        try {
            const minimum_stock = edit ? 
            await minimumStockService.update(id, inputs) : 
            await minimumStockService.create(inputs);
            feedback.open({severity: "success"});
            handleGoBack();
        } catch (error) {
            setProcessing(false);

            console.log(error.response)

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

    async function show() {
        try {
            const minimum_stock = await minimumStockService.getById(id);
            setInputs(minimum_stock);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(true);

        if(inputs.base_id && inputs.product_id) {
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
                {loading ? <Loading /> : (
                    processing ? <Processing title="Processando..." msg="Por favor, aguarde!" /> : (
                        <View padding="15">
                            <CategoryForm onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm="4">
                                        <InputLabel>Base</InputLabel>
                                        <Autocomplete 
                                            fieldName="name" 
                                            name="base_id" 
                                            endpoint="/bases/autocomplete"
                                            renderOption={(option: any) => (
                                                <div>{option.name}</div>
                                            )} 
                                            inputText={inputs.base?.name}
                                            onOptionSelected={handleChange}
                                            error={submitted && !inputs.base_id}
                                        />
                                    </Col>
                                    <Col sm="4">
                                        <InputLabel>Item</InputLabel>
                                        <Autocomplete 
                                            fieldName="name" 
                                            name="product_id" 
                                            endpoint="/products/autocomplete"
                                            renderOption={(option: any) => (
                                                <div>{option.name}</div>
                                            )} 
                                            inputText={inputs.product?.name}
                                            onOptionSelected={handleChange}
                                            error={submitted && !inputs.product_id}
                                        />
                                    </Col>
                                    <Col sm="4">
                                        <InputLabel>Quantidade</InputLabel>
                                        <Input 
                                            name="quantity" 
                                            type="number"
                                            value={inputs.quantity} 
                                            onChange={handleChange} 
                                            placeholder="Quantidade mínima"
                                            error={submitted && !inputs.quantity}
                                        />
                                    </Col>
                                </Row>
                                <Button type="submit">Salvar</Button>
                            </CategoryForm>
                        </View>  
                    )
                )}
            </GridContent>
        </GridContainer>
    );
}
