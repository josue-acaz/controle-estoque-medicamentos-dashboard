import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import ToolbarAction from "../../../components/ToolbarActions";
import {maskPhoneNumber} from "../../../utils";
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
import doctorService from "../../../services/doctor.service";

// models
import Doctor from "../../../models/Doctor";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
} from "../../../design/grid";
import {View, Button, InputLabel} from "../../../design";
import {DoctorForm} from "./styles";

export default function EditDoctor(props: RouteChildrenProps) {
    const {history} = props;
    const [id, setId] = useState(useParams<RouteParamsProps>().id);
    const edit = id !== "0";

    const historyActions: Array<ToolbarRouteProps> = [
        {
            label: "Médicos",
            path: "/doctors"
        },
        {
            label: edit ? id : "Novo Médico",
            path: `/doctors/${id}/edit`,
        },
    ];

    const feedback = useFeedback();
    const [loading, setLoading] = useState(edit);
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState<Doctor>(new Doctor());

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let {name, value} = e.target;

        if(name === "phone_number") {
            value = maskPhoneNumber(value);
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleGoBack() {
        history.goBack();
    }

    async function show() {
        try {
            const doctor = await doctorService.getById(id);
            setInputs(doctor);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    async function save() {
        try {
            const doctor = edit ? 
            await doctorService.update(id, inputs) : 
            await doctorService.create(inputs);
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

        if(inputs.name && inputs.email && inputs.phone_number) {
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
                            <DoctorForm onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm="6">
                                        <InputLabel>Nome do médico</InputLabel>
                                        <Input 
                                            name="name" 
                                            value={inputs.name} 
                                            onChange={handleChange} 
                                            placeholder="Nome do médico"
                                            error={submitted && !inputs.name}
                                        />
                                    </Col>
                                    <Col sm="6">
                                        <InputLabel>Email</InputLabel>
                                        <Input 
                                            name="email" 
                                            value={inputs.email} 
                                            onChange={handleChange} 
                                            placeholder="Endereço de email"
                                            error={submitted && !inputs.email}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 10}}>
                                    <Col sm="6">
                                        <InputLabel>Número de telefone</InputLabel>
                                        <Input 
                                            name="phone_number" 
                                            value={inputs.phone_number} 
                                            onChange={handleChange} 
                                            placeholder="Número de telefone"
                                            error={submitted && !inputs.phone_number}
                                        />
                                    </Col>
                                </Row>
                                <Button type="submit">Salvar</Button>
                            </DoctorForm>
                        </View>  
                    )
                )}
            </GridContent>
        </GridContainer>
    );
}
