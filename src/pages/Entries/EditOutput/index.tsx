import React, {useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import {maskDate} from "../../../utils";
import {stringDateToSql, formatDatetime} from "../../../tools/dates";
import {EnumDateFormatTypes} from "../../../constants";

// contexts
import {useFeedback} from "../../../contexts/feedback/feedback.context";

// services
import outputService from "../../../services/output.service";

// types
import {EditOutputProps} from "./types";

// models
import Output from "../../../models/Output";

// components
import Input from "../../../components/form/Input";
import Circular from "../../../components/spinners/Circular";
import Autocomplete from "../../../components/form/Autocomplete";
import EditProductOutput from "./EditProductOutput";

// styles
import {
    EditOutputView, 
    Form, 
} from "./styles";
import {
    Button, 
    ButtonText, 
    InputLabel,
} from "../../../design";

export default function EditOutput(props: EditOutputProps) {
    const {output, onSaved, onProductOutputSaved} = props;
    const edit = output.id !== "";

    const feedback = useFeedback();
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [inputs, setInputs] = useState<Output>(output);

    function handleChange(e: any) {
        let {name, value} = e.target;

        if(name === "date") {
            value = maskDate(value);
        }

        if(name === "aircraft_id" || name === "doctor_id") {
            value = value.id;
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    async function save() {
        const data: Output = {
            id: inputs.id,
            date: stringDateToSql(inputs.date),
            aircraft_id: inputs.aircraft_id,
            doctor_id: inputs.doctor_id,
        };

        setProcessing(true);
        try {
            const output = edit ? 
            await outputService.update(data.id, data) : 
            await outputService.create(data);

            setProcessing(false);
            setSubmitted(false);
            onSaved(output);
            clearForm();
            feedback.open({severity: "success"});
        } catch (error) {
            setProcessing(false);
            setSubmitted(false);
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

    async function handleSubmit() {
        setSubmitted(true);
        if(inputs.date && inputs.aircraft_id && inputs.doctor_id) {
            await save();
        }
    }

    function clearForm() {
        setInputs(new Output());
    }

    // Preencher formulário
    useEffect(() => {
        Object.keys(output).forEach(key => {
            let value = output[key];

            if(key === "date") {
                value = formatDatetime(value, EnumDateFormatTypes.READABLE_V5);
            }

            setInputs(inputs => ({...inputs, [key]: value}));
        });
    }, [output.id]);

    return(
        <EditOutputView>
            <Form>
                <Row>
                    <Col sm="4">
                        <InputLabel>Data da saída</InputLabel>
                        <Input 
                            name="date"
                            placeholder="DD/MM/AAAA" 
                            value={inputs.date}
                            onChange={handleChange}
                            error={submitted && !inputs.date}
                        />
                    </Col>
                    <Col sm="4">
                        <InputLabel>Aeronave</InputLabel>
                        <Autocomplete
                            fieldName="prefix"
                            name="aircraft_id"
                            endpoint="/aircrafts/autocomplete"
                            renderOption={(option) => (
                                <div>{option.name}</div>
                            )}
                            inputText={inputs.aircraft?.prefix}
                            onOptionSelected={handleChange}
                            placeholder="Selecione a aeronave"
                            error={submitted && !inputs.aircraft_id}
                        />
                    </Col>
                    <Col sm="4">
                        <InputLabel>Médico</InputLabel>
                        <Autocomplete
                            fieldName="name"
                            name="doctor_id"
                            endpoint="/doctors/autocomplete"
                            renderOption={(option) => (
                                <div>{option.name}</div>
                            )}
                            inputText={inputs.doctor?.name}
                            onOptionSelected={handleChange}
                            placeholder="Selecione o médico"
                            error={submitted && !inputs.doctor_id}
                        />
                    </Col>
                </Row>
                <Button onClick={handleSubmit} disabled={processing}>
                    {processing ? <Circular size={30} /> : <ButtonText>Salvar</ButtonText>}
                </Button>
            </Form>

            {inputs.id && <EditProductOutput output={output} onSaved={onProductOutputSaved} />}
        </EditOutputView>
    );
}