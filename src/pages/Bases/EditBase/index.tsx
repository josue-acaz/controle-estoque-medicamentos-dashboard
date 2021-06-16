import React, {useState} from "react";
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
import Alert from "../../../components/Alert";
import Autocomplete from "../../../components/form/Autocomplete";

// services
import baseService from "../../../services/base.service";

// models
import Base from "../../../models/Base";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
} from "../../../design/grid";
import {View, Button, InputLabel} from "../../../design";
import {CategoryForm} from "./styles";

export default function EditCategory(props: RouteChildrenProps) {
    const {history} = props;
    const [id, setId] = useState(useParams<RouteParamsProps>().id);
    const edit = id !== "0";

    const historyActions: Array<ToolbarRouteProps> = [
        {
            label: "Bases",
            path: "/bases"
        },
        {
            label: edit ? id : "Nova base",
            path: `/bases/${id}/edit`,
        },
    ];

    const feedback = useFeedback();
    const [loading, setLoading] = useState(edit);
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState<Base>(new Base());

    function handleChange(e: any) {
        let {name, value} = e.target;

        if(name == "city_id") {
            value = value.id;
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleGoBack() {
        history.goBack();
    }

    async function save() {
        try {
            const provider = edit ? 
            await baseService.update(id, inputs) : 
            await baseService.create(inputs);
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

        if(inputs.name) {
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
                                    <Col sm="6">
                                        <InputLabel>Nome da base</InputLabel>
                                        <Input 
                                            name="name" 
                                            value={inputs.name} 
                                            onChange={handleChange} 
                                            placeholder="Nome da base"
                                            error={submitted && !inputs.name}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        <InputLabel>Cidade</InputLabel>
                                        <Autocomplete 
                                            fieldName="full_name" 
                                            name="city_id"
                                            endpoint="/cities/autocomplete"
                                            renderOption={(option: any) => (
                                                <div>{option.name}</div>
                                            )}
                                            onOptionSelected={handleChange}
                                            error={submitted && !inputs.city_id}
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
