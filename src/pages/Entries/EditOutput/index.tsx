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
import ListProductOutputs from "./ListProductOutputs";

// styles
import {
    EditOutputView, 
    Form, 
    FormActions,
    EditProductOutputContainer,
    ListProductInputContainer,
} from "./styles";
import {
    Button, 
    ButtonText, 
    InputLabel,
} from "../../../design";
import ProductOutput from "../../../models/ProductOutput";

export default function EditOutput(props: EditOutputProps) {
    const {output, onSaved, onProductOutputSaved, onProductOutputDeleted} = props;
    const edit = output.id !== "";

    const feedback = useFeedback();
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [autocompleteClear, setAutocompleteClear] = useState(false);
    const [productOutput, setProductOutput] = useState<ProductOutput>(new ProductOutput());
    const [inputs, setInputs] = useState<Output>(output);

    function toggleAutocompleteClear() {
        setAutocompleteClear(!autocompleteClear);
    }

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
            if(!edit) {
                clearForm();
                toggleAutocompleteClear();
            }
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
        if(inputs.aircraft_id && inputs.doctor_id) {
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

    function handleEditProductOutput(product_output: ProductOutput) {
        setProductOutput(product_output);
    }

    function handleSavedProductOutput() {
        setEditProduct(false);
        onProductOutputSaved();
        setProductOutput(new ProductOutput());
    }

    function handleCancelProductOutput() {
        setEditProduct(false);
        setProductOutput(new ProductOutput());
    }

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
                        />
                        {!output.id && (<span className="helper-text">*Se não for fornecida, será considerada a data atual</span>)}
                    </Col>
                    <Col sm="4">
                        <InputLabel>Aeronave</InputLabel>
                        <Autocomplete
                            fieldName="prefix"
                            name="aircraft_id"
                            endpoint="/aircrafts/autocomplete"
                            renderOption={(option) => (
                                <div>{option.prefix}</div>
                            )}
                            inputText={inputs.aircraft?.prefix}
                            onOptionSelected={handleChange}
                            placeholder="Selecione a aeronave"
                            clear={autocompleteClear}
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
                            clear={autocompleteClear}
                            error={submitted && !inputs.doctor_id}
                        />
                    </Col>
                </Row>
                
                <FormActions>
                    <Button onClick={handleSubmit} disabled={processing}>
                        {processing ? <Circular size={30} /> : <ButtonText>Salvar</ButtonText>}
                    </Button>
                    {!editProduct && !productOutput.id && inputs.id && (
                        <Button onClick={() => setEditProduct(true)}>
                            <ButtonText>Novo item de saída</ButtonText>
                        </Button>
                    )}
                </FormActions>
            </Form>

            <EditProductOutputContainer>
                {(editProduct || productOutput.id) && (
                    <EditProductOutput 
                        output={output} 
                        productOutput={productOutput}
                        onSaved={handleSavedProductOutput} 
                        onCancel={handleCancelProductOutput} 
                    />
                )}
            </EditProductOutputContainer>

            <ListProductInputContainer>
                {output.id && !productOutput.id && !editProduct && (
                    <ListProductOutputs 
                        output_id={output.id} 
                        onEdit={handleEditProductOutput} 
                        onDeleted={onProductOutputDeleted} 
                    />
                )}
            </ListProductInputContainer>
        </EditOutputView>
    );
}