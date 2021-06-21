import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import ToolbarAction from "../../../components/ToolbarActions";
import {EnumActions} from "../../../constants";
import {maskCnpj} from "../../../utils";

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
import Alert from "../../../components/Alert";

// services
import providerService from "../../../services/provider.service";

// models
import Provider from "../../../models/Provider";
import City from "../../../models/City";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
} from "../../../design/grid";
import {View, Button, InputLabel} from "../../../design";
import {ProviderForm} from "./styles";

export default function EditProvider(props: RouteChildrenProps) {
    const {history} = props;
    const [id, setId] = useState(useParams<RouteParamsProps>().id);
    const edit = id !== "0";

    const historyActions: Array<ToolbarRouteProps> = [
        {
            label: "Fornecedores",
            path: "/providers"
        },
        {
            label: edit ? id : "Novo fornecedor",
            path: `/providers/${id}/edit`,
        },
    ];

    const feedback = useFeedback();
    const [loading, setLoading] = useState(edit);
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState<Provider>(new Provider());

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let {name, value} = e.target;

        if(name === "cnpj") {
            value = maskCnpj(value);
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleGoBack() {
        history.goBack();
    }

    async function show() {
        try {
            const provider = await providerService.getById(id);
            setInputs(provider);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function save() {
        try {
            const provider = edit ? 
            await providerService.update(id, inputs) : 
            await providerService.create(inputs);
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

        if(inputs.name && inputs.cnpj && inputs.city_id) {
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
                    title="Novo fornecedor"
                    action={EnumActions.ADD}  
                    onGoBack={handleGoBack}
                    routes={historyActions}
                />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    processing ? <Processing title="Processando..." msg="Por favor, aguarde!" /> : (
                        <View padding="15">
                            <ProviderForm onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm="6">
                                        <InputLabel>Nome do fornecedor</InputLabel>
                                        <Input 
                                            name="name" 
                                            value={inputs.name} 
                                            onChange={handleChange} 
                                            placeholder="Nome do fornecedor"
                                            error={submitted && !inputs.name}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        <InputLabel>CNPJ</InputLabel>
                                        <Input 
                                            name="cnpj" 
                                            value={inputs.cnpj} 
                                            onChange={handleChange} 
                                            placeholder="CNPJ"
                                            error={submitted && !inputs.cnpj}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 10}}>
                                    <Col sm="6">
                                        <InputLabel>Cidade</InputLabel>
                                        <Autocomplete 
                                            name="city_id" 
                                            fieldName="full_name" 
                                            endpoint="/cities/autocomplete" 
                                            renderOption={(option) => <div>{option.full_name}</div>}
                                            error={submitted && !inputs.city_id}
                                            onOptionSelected={(e) => {
                                                const {name, value} = e.target;
                                                setInputs(inputs => ({...inputs, [name]: value.id}));
                                            }}
                                            inputText={inputs.city?.full_name}
                                            placeholder="Selecione uma cidade..."
                                        />
                                    </Col>
                                </Row>
                                <Button type="submit">Salvar</Button>
                            </ProviderForm>
                        </View>  
                    )
                )}
            </GridContent>
        </GridContainer>
    );
}
