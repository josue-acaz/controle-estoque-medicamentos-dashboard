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
import ListProductInputs from "./ListProductInputs";

// styles
import {
    Form, 
    FormActions,
    EditInputView, 
    EditProductInputContainer,
    ListProductInputContainer,
} from "./styles";
import {
    Button, 
    ButtonText, 
    InputLabel,
} from "../../../design";
import ProductInput from "../../../models/ProductInput";

export default function EditInput(props: InputFormProps) {
    const {input, onSaved, onProductInputSaved, onProductInputDeleted} = props;
    const edit = input.id !== "";

    const feedback = useFeedback();
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [inputs, setInputs] = useState<InputModel>(input);
    const [productInput, setProductInput] = useState<ProductInput>(new ProductInput);

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
            invoice_number: inputs.invoice_number,
            entry_date:  stringDateToSql(inputs.entry_date),
            request_date: stringDateToSql(inputs.entry_date), //repetir entry_date para a data da solicitação
            freight: currencyToNumber(inputs.freight.toString()),
        };

        setProcessing(true);
        try {
            const input = edit ?
            await inputService.update(data.id, data) :
            await inputService.create(data);

            setProcessing(false);
            setSubmitted(false);
            onSaved(input);
            if(!edit) {
                clearForm();
            }
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
        if(inputs.invoice_number) {
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

    function handleEditProductInput(product_input: ProductInput) {
        setProductInput(product_input);
    }

    function handleSavedProductInput() {
        setEditProduct(false);
        onProductInputSaved();
        setProductInput(new ProductInput());
    }

    function handleCancelProductInput() {
        setEditProduct(false);
        setProductInput(new ProductInput());
    }

    return(
        <EditInputView>
            <Form>
                <Row>
                    <Col sm="4">
                        <InputLabel>Data da entrada</InputLabel>
                        <Input 
                            name="entry_date"
                            placeholder="DD/MM/AAAA" 
                            value={inputs.entry_date}
                            onChange={handleChange}
                        />
                        {!input.id && (<span className="helper-text">*Se não for fornecida, será considerada a data atual</span>)}
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
                <FormActions>
                    <Button onClick={handleSubmit} disabled={processing}>
                        {processing ? <Circular size={30} /> : <ButtonText>Salvar</ButtonText>}
                    </Button>
                    {!editProduct && !productInput.id && inputs.id && (
                        <Button onClick={() => setEditProduct(true)} disabled={processing}>
                            <ButtonText>Novo item de compra</ButtonText>
                        </Button>
                    )}
                </FormActions>
            </Form>

            <EditProductInputContainer>
                {(editProduct || productInput.id) && (
                    <EditProductInput 
                        input={inputs} 
                        productInput={productInput}
                        onSaved={handleSavedProductInput} 
                        onCancel={handleCancelProductInput}
                    />
                )}
            </EditProductInputContainer>
            <ListProductInputContainer>
                {input.id && !productInput.id && !editProduct && (
                    <ListProductInputs input_id={input.id} onEdit={handleEditProductInput} onDeleted={onProductInputDeleted} />
                )}
            </ListProductInputContainer>
        </EditInputView>
    );
}