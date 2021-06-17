import React, {useState} from "react";
import {Row, Col} from "react-bootstrap";
import {stringDateToSql} from "../../../../tools/dates";
import {
    maskDate, 
    onlyNumbers, 
    maskCurrency, 
    currencyToNumber,
} from "../../../../utils";

// contexts
import {useFeedback} from "../../../../contexts/feedback/feedback.context";

// models
import ProductInput from "../../../../models/ProductInput";
import Category from "../../../../models/Category";
import Lot from "../../../../models/Lot";

// types
import {ProductInputFormProps} from "./types";

// services
import productInputService from "../../../../services/product-input.service";

// components
import Input from "../../../../components/form/Input";
import Circular from "../../../../components/spinners/Circular";
import Autocomplete from "../../../../components/form/Autocomplete";
import TextArea from "../../../../components/form/TextArea";

// styles
import {
    Form, 
    Title,
    FormActions,
    ProductInputFormView, 
} from "./styles";
import {
    Button, 
    InputLabel, 
    ButtonText,
    CancelButton,
} from "../../../../design";

export default function EditProductInput(props: ProductInputFormProps) {
    const {input, onSaved, onCancel} = props;

    const feedback = useFeedback();
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [category, setCategory] = useState<Category>(new Category());

    const [inputs, setInputs] = useState<Lot & ProductInput>({
        id: "",
        
        // Lot
        serial_number: "",
        expiration_date: "",
        description: "",

        // ProductInput
        current_quantity: 1,
        unit_price: "0,00",
        lot_id: "",
        product_id: "",
        input_id: input.id,
        base_id: "",
        provider_id: "",
    });

    function handleChange(e: any) {
        let {name, value} = e.target;

        // Lot
        if(name === "expiration_date") {
            value = maskDate(value);
        }

        // ProductInput
        if(name === "product_id" || name === "base_id" || name === "provider_id") {
            value = value.id;
        }

        if(name === "current_quantity") {
            value = onlyNumbers(value);
        }

        if(name === "unit_price") {
            value = maskCurrency(value);
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    async function save() {
        const data: Lot & ProductInput = {
            id: inputs.id,
        
            // Lot
            serial_number: inputs.serial_number.trim(),
            expiration_date: stringDateToSql(inputs.expiration_date),
            description: inputs.description?.trim(),
    
            // ProductInput
            current_quantity: inputs.current_quantity,
            unit_price: currencyToNumber(inputs.unit_price.toString()),
            lot_id: "",
            product_id: inputs.product_id,
            input_id: input.id,
            base_id: inputs.base_id,
            provider_id: inputs.provider_id,
        };

        setProcessing(true);
        try {
            const product_input = await productInputService.create(data);
            setProcessing(false);
            feedback.open({severity: "success"});
            onSaved();
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

    async function handleSubmit() {
        setSubmitted(true);
        if(inputs.current_quantity && 
           inputs.unit_price && 
           inputs.base_id && 
           inputs.product_id &&
           inputs.serial_number && 
           inputs.expiration_date) {
            await save();
        }
    }

    return(
        <ProductInputFormView>
            <Title>Novo Medicamento/Material Médico</Title>
            <Form>
                <Row>
                    <Col sm="3">
                        <InputLabel>Número do lote</InputLabel>
                        <Input 
                            name="serial_number" 
                            style={{textTransform: "uppercase"}}
                            value={inputs.serial_number} 
                            onChange={handleChange}
                            placeholder="Número serial"
                            error={submitted && !inputs.serial_number}
                        />
                    </Col>
                    <Col sm="3">
                        <InputLabel>Validate</InputLabel>
                        <Input 
                            name="expiration_date" 
                            value={inputs.expiration_date} 
                            onChange={handleChange}
                            placeholder="DD/MM/YYYY"
                            error={submitted && !inputs.expiration_date}
                        />
                    </Col>
                    <Col sm="3">
                        <InputLabel>Base de destino</InputLabel>
                        <Autocomplete
                            fieldName="name"
                            name="base_id"
                            endpoint="/bases/autocomplete"
                            renderOption={(option) => (
                                <div>{option.name}</div>
                            )}
                            onOptionSelected={handleChange}
                            placeholder="Informe a base/cidade"
                            error={submitted && !inputs.base_id}
                        />
                    </Col>
                    <Col sm="3">
                        <InputLabel>Fornecedor</InputLabel>
                        <Autocomplete 
                            fieldName="name" 
                            name="provider_id" 
                            endpoint="/providers/autocomplete"
                            renderOption={(option: any) => (
                                <div>{option.name}</div>
                            )} 
                            onOptionSelected={handleChange}
                            error={submitted && !inputs.provider_id}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm="3">
                        <InputLabel>Categoria</InputLabel>
                        <Autocomplete
                            fieldName="name"
                            name="category_id"
                            endpoint="/categories/autocomplete"
                            renderOption={(option) => (
                                <div>{option.name}</div>
                            )}
                            onOptionSelected={(e) => setCategory(e.target.value)}
                            placeholder="Informe a categoria"
                            error={submitted && !category.id}
                        />
                    </Col>
                    {category.id && (
                        <React.Fragment>
                            <Col sm="3">
                                <InputLabel>Item</InputLabel>
                                <Autocomplete
                                    fieldName="name"
                                    name="product_id"
                                    endpoint="/products/autocomplete"
                                    params={{category_id: category.id}}
                                    renderOption={(option) => (
                                        <div>{option.name}</div>
                                    )}
                                    onOptionSelected={handleChange}
                                    placeholder="Selecione um medicamento..."
                                    error={submitted && !inputs.product_id}
                                />
                            </Col>
                            <Col sm="3">
                                <InputLabel>Quantidade</InputLabel>
                                <Input 
                                    name="current_quantity" 
                                    type="number"
                                    value={inputs.current_quantity} 
                                    onChange={handleChange}
                                    placeholder="Quantidade"
                                    error={submitted && !inputs.current_quantity}
                                />
                            </Col>
                            <Col sm="3">
                                <InputLabel>Preço unitário</InputLabel>
                                <Input 
                                    name="unit_price" 
                                    value={inputs.unit_price} 
                                    onChange={handleChange}
                                    placeholder="Preço unitário"
                                    error={submitted && !inputs.unit_price}
                                />
                            </Col>
                        </React.Fragment>
                    )}
                </Row>
                <Row>
                    <Col sm="12">
                        <InputLabel>Descrição</InputLabel>
                        <TextArea name="description" value={inputs.description} onChange={handleChange} placeholder="Forneça uma descrição" />
                    </Col>
                </Row>

                <FormActions>
                    <Button onClick={handleSubmit}>
                        {processing ? <Circular size={30} /> : <ButtonText>Salvar</ButtonText>}
                    </Button>
                    <CancelButton onClick={onCancel}>Cancelar</CancelButton>
                </FormActions>
            </Form>
        </ProductInputFormView>
    );
}
