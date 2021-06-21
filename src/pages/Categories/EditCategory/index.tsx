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
import Alert from "../../../components/Alert";

// services
import categoryService from "../../../services/category.service";

// models
import Category from "../../../models/Category";

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
            label: "Categorias",
            path: "/categories"
        },
        {
            label: edit ? id : "Nova categoria",
            path: `/categories/${id}/edit`,
        },
    ];

    const feedback = useFeedback();
    const [loading, setLoading] = useState(edit);
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState<Category>(new Category());

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleGoBack() {
        history.goBack();
    }

    async function show() {
        try {
            const category = await categoryService.getById(id);
            setInputs(category);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function save() {
        try {
            const category = edit ? 
            await categoryService.update(id, inputs) : 
            await categoryService.create(inputs);
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
                                    <Col sm="12">
                                        <InputLabel>Nome da Categoria</InputLabel>
                                        <Input 
                                            name="name" 
                                            value={inputs.name} 
                                            onChange={handleChange} 
                                            placeholder="Nome da categoria"
                                            error={submitted && !inputs.name}
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
