import React, {useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import {maskDate, maskCurrency, currency, currencyToNumber} from "../../../utils";
import {stringDateToSql, formatDatetime} from "../../../tools/dates";
import {EnumDateFormatTypes} from "../../../constants";

// contexts
import {useFeedback} from "../../../contexts/feedback/feedback.context";

// services
import inputService from "../../../services/input.service";

// types
import {InputFormProps} from "./types";

// models
import InputModel from "../../../models/Input";

// components
import Input from "../../../components/form/Input";
import Circular from "../../../components/spinners/Circular";
import EditProductInput from "./EditProductInput";

// styles
import {
    InputFormView, 
    Form, 
    EditProductContainer,
} from "./styles";
import {
    Button, 
    ButtonText, 
    InputLabel,
} from "../../../design";

export default function EditInput(props: InputFormProps) {
    const {input, onSaved, onProductInputSaved} = props;
    const edit = input.id !== "";

    const feedback = useFeedback();
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [inputs, setInputs] = useState<InputModel>(input);

    function handleChange(e: any) {
        let {name, value} = e.target;

        if(name === "request_date" || name === "entry_date") {
            value = maskDate(value);
        }

        if(name === "freight") {
            value = maskCurrency(value);
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    async function save() {
        let data: InputModel = {
            id: inputs.id,
            freight: currencyToNumber(inputs.freight.toString()),
            invoice_number: inputs.invoice_number,
            entry_date: stringDateToSql(inputs.entry_date),
            request_date: stringDateToSql(inputs.entry_date), //repetir entry_date para a data da solicitação
        };

        setProcessing(true);
        try {
            const input = edit ?
            await inputService.update(data.id, data) :
            await inputService.create(data);

            setProcessing(false);
            setSubmitted(false);
            onSaved(input);
            clearForm();
            feedback.open({severity: "success"});
        } catch (error) {
            setProcessing(false);
            setSubmitted(false);
            if(error.response) {
                feedback.open({
                    msg: error.response.data.msg,
                    severity: "error"
                });
            } else {
                feedback.open({severity: "error"});
            }
        }
    }

    async function handleSubmit() {
        setSubmitted(true);
        if(inputs.entry_date && inputs.invoice_number) {
            setProcessing(true);
            await save();
        }
    }

    useEffect(createForm, [input]);

    function createForm() {
        Object.keys(input).forEach(key => {
            let value = input[key];

            if(key === "request_date" || key === "entry_date") {
                value = formatDatetime(value, EnumDateFormatTypes.READABLE_V5);
            }

            if(key === "freight" && value !== "0,00") {
                value = currency(value, true);
            }

            setInputs(inputs => ({...inputs, [key]: value}));
        });
    }

    function clearForm() {
        setInputs(new InputModel());
    }

    return(
        <InputFormView>
            <Form>
                <Row>
                    {/**<Col sm="3">
                        <InputLabel>Data da solicitação</InputLabel>
                        <Input 
                            name="request_date"
                            placeholder="DD/MM/AAAA" 
                            value={inputs.request_date}
                            onChange={handleChange}
                            error={submitted && !inputs.request_date}
                        />
                    </Col> */}
                    <Col sm="4">
                        <InputLabel>Data da entrada</InputLabel>
                        <Input 
                            name="entry_date"
                            placeholder="DD/MM/AAAA" 
                            value={inputs.entry_date}
                            onChange={handleChange}
                            error={submitted && !inputs.entry_date}
                        />
                    </Col>
                    <Col sm="4">
                        <InputLabel>Número da Fatura</InputLabel>
                        <Input 
                            name="invoice_number"
                            placeholder="Informe o número da fatura" 
                            value={inputs.invoice_number}
                            onChange={handleChange}
                            error={submitted && !inputs.invoice_number}
                        />
                    </Col>
                    <Col sm="4">
                        <InputLabel>Frete (opcional)</InputLabel>
                        <Input 
                            name="freight"
                            placeholder="Informe o valor do frete" 
                            value={inputs.freight}
                            onChange={handleChange}
                            adorment={<p>R$</p>}
                            adormentPosition="start"
                        />
                    </Col>
                </Row>
                <Button onClick={handleSubmit} disabled={processing}>
                    {processing ? <Circular size={30} /> : <ButtonText>Salvar</ButtonText>}
                </Button>
            </Form>

            <EditProductContainer>
                {inputs.id && <EditProductInput input={inputs} onSaved={onProductInputSaved} />}
            </EditProductContainer>
        </InputFormView>
    );
}