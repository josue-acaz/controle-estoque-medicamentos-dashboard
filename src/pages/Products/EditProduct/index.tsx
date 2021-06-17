import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import ToolbarAction from "../../../components/ToolbarActions";
import {EnumActions} from "../../../constants";

// types
import {RouteChildrenProps} from "react-router-dom";
import {RouteParamsProps} from "./types";
import {ToolbarRouteProps} from "../../../components/ToolbarActions/types";

// contexts
import {useFeedback} from "../../../contexts/feedback/feedback.context";

// components
import Loading from "../../../components/spinners/Loading";
import Processing from "../../../components/spinners/Processing";
import Input from "../../../components/form/Input";
import Autocomplete from "../../../components/form/Autocomplete";
import TextArea from "../../../components/form/TextArea";
import Alert from "../../../components/Alert";

// services
import productService from "../../../services/product.service";

// models
import Product from "../../../models/Product";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
} from "../../../design/grid";
import {View, Button, InputLabel} from "../../../design";
import {CategoryForm} from "./styles";

export default function EditProduct(props: RouteChildrenProps) {
    const {history} = props;
    const [id, setId] = useState(useParams<RouteParamsProps>().id);
    const edit = id !== "0";

    const historyActions: Array<ToolbarRouteProps> = [
        {
            label: "Medicamentos/Materiais",
            path: "/products"
        },
        {
            label: edit ? id : "Novo Medicamento/Material",
            path: `/products/${id}/edit`,
        },
    ];

    const feedback = useFeedback();
    const [loading, setLoading] = useState(edit);
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState<Product>(new Product());

    function handleChange(e: any) {
        let {name, value} = e.target;

        if(name === "category_id" || name === "provider_id") {
            value = value.id;
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleGoBack() {
        history.goBack();
    }

    async function show() {
        try {
            const product = await productService.getById(id);
            setInputs(product);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function save() {
        try {
            const product = edit ? 
            await productService.update(id, inputs) : 
            await productService.create(inputs);
            feedback.open({severity: "success"});
            handleGoBack();
        } catch (error) {
            setProcessing(false);
            feedback.open({severity: "error"});
            console.error(error);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(true);

        if(inputs.name && inputs.category_id) {
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
                handleCancel={handleCancel} 
                handleClose={handleCancel}
                handleConfirm={handleSave}
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
                                        <InputLabel>Nome</InputLabel>
                                        <Input 
                                            name="name" 
                                            value={inputs.name} 
                                            onChange={handleChange} 
                                            placeholder="Forneça o nome"
                                            error={submitted && !inputs.name}
                                        />
                                    </Col>
                                    <Col sm="4">
                                        <InputLabel>Peso</InputLabel>
                                        <Input 
                                            name="weight" 
                                            type="number"
                                            value={inputs.weight} 
                                            onChange={handleChange} 
                                            placeholder="Peso do item"
                                            adorment={<p>Kg</p>}
                                            adormentPosition="end"
                                            error={submitted && !inputs.weight}
                                        />
                                    </Col>
                                    <Col sm="4">
                                        <InputLabel>Categoria</InputLabel>
                                        <Autocomplete 
                                            fieldName="name" 
                                            name="category_id" 
                                            endpoint="/categories/autocomplete"
                                            renderOption={(option: any) => (
                                                <div>{option.name}</div>
                                            )} 
                                            inputText={inputs.category?.name}
                                            onOptionSelected={handleChange}
                                            error={submitted && !inputs.category_id}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12">
                                        <InputLabel>Descrição</InputLabel>
                                        <TextArea 
                                            name="description" 
                                            value={inputs.description} 
                                            onChange={handleChange} 
                                            placeholder="Descrição"
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
