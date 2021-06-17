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
import Alert from "../../../components/Alert";

// services
import aircraftService from "../../../services/aircraft.service";

// models
import Aircraft from "../../../models/Aircraft";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
} from "../../../design/grid";
import {View, Button, InputLabel} from "../../../design";
import {AircraftForm} from "./styles";

export default function EditAircraft(props: RouteChildrenProps) {
    const {history} = props;
    const [id, setId] = useState(useParams<RouteParamsProps>().id);
    const edit = id !== "0";

    const historyActions: Array<ToolbarRouteProps> = [
        {
            label: "Aeronaves",
            path: "/aircrafts"
        },
        {
            label: edit ? id : "Nova Aeronave",
            path: `/aircrafts/${id}/edit`,
        },
    ];

    const feedback = useFeedback();
    const [loading, setLoading] = useState(edit);
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState<Aircraft>(new Aircraft());

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleGoBack() {
        history.goBack();
    }

    async function show() {
        try {
            const aircraft = await aircraftService.getById(id);
            setInputs(aircraft);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function save() {
        try {
            const aircraft = edit ? 
            await aircraftService.update(id, inputs) : 
            await aircraftService.create(inputs);
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

        if(inputs.name && inputs.prefix) {
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
                    title="Nova aeronave"
                    action={EnumActions.ADD}  
                    onGoBack={handleGoBack}
                    routes={historyActions}
                />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    processing ? <Processing title="Processando..." msg="Por favor, aguarde!" /> : (
                        <View padding="15">
                            <AircraftForm onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm="6">
                                        <InputLabel>Nome</InputLabel>
                                        <Input 
                                            name="name" 
                                            value={inputs.name} 
                                            onChange={handleChange} 
                                            placeholder="Modelo da aeronave"
                                            error={submitted && !inputs.name}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        <InputLabel>Prefixo</InputLabel>
                                        <Input 
                                            name="prefix" 
                                            value={inputs.prefix} 
                                            onChange={handleChange} 
                                            style={{textTransform: "uppercase"}}
                                            placeholder="Prefixo da aeronave"
                                            error={submitted && !inputs.prefix}
                                        />
                                    </Col>
                                </Row>
                                <Button type="submit">Salvar</Button>
                            </AircraftForm>
                        </View>  
                    )
                )}
            </GridContent>
        </GridContainer>
    );
}
