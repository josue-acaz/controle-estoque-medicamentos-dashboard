import React, {useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import {stringDateToSql, formatDatetime} from "../../../../tools/dates";
import {
    maskDate, 
    currency,
    onlyNumbers, 
    maskCurrency, 
    currencyToNumber,
} from "../../../../utils";
import {EnumDateFormatTypes} from "../../../../constants";

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
    const {input, productInput, onSaved, onCancel} = props;
    const edit = productInput.id !== "";

    const feedback = useFeedback();
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [lot, setLot] = useState<Lot>(new Lot());
    const [category, setCategory] = useState<Category>(new Category());
    const [inputs, setInputs] = useState<ProductInput>(new ProductInput());

    function handleChangeLot(e: any) {
        let {name, value} = e.target;

        // Lot
        if(name === "expiration_date") {
            value = maskDate(value);
        }

        setLot(lot => ({...lot, [name]: value}));
    }

    function handleChangeInputs(e: any) {
        let {name, value} = e.target;

        if(name === "product_id" || name === "base_id" || name === "provider_id") {
            value = value.id;
        }

        if(name === "quantity") {
            value = onlyNumbers(value);
        }

        if(name === "unit_price") {
            value = maskCurrency(value);
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    async function save() {
        const lot_data: Lot = {
            id: lot.id,
            serial_number: lot.serial_number.trim(),
            expiration_date: stringDateToSql(lot.expiration_date),
            description: lot.description?.trim(),
        };

        const product_input_data: ProductInput = {
            id: inputs.id,
            quantity: inputs.quantity,
            unit_price: currencyToNumber(inputs.unit_price.toString()),
            product_id: inputs.product_id,
            input_id: input.id,
            base_id: inputs.base_id,
            provider_id: inputs.provider_id,
            lot_id: lot.id,
        };

        setProcessing(true);
        try {
            const product_input = edit ? 
            await productInputService.update(product_input_data.id, product_input_data, lot_data) :
            await productInputService.create(product_input_data, lot_data);

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
        if(inputs.quantity && 
           inputs.unit_price && 
           inputs.base_id && 
           inputs.product_id &&
           lot.serial_number && 
           lot.expiration_date) {
            await save();
        }
    }

    // Editar entrada de produto
    useEffect(() => {
        // Preencher formulário
        if(productInput.id) {
            // Configurar categoria selecionada
            const product = productInput.product;
            if(product) {
                if(product.category) {
                    setCategory(product.category);
                }
            }

            const lot = productInput.lot;
            if(lot) {
                setLot({
                    id: lot.id,
                    serial_number: lot.serial_number,
                    expiration_date: formatDatetime(lot.expiration_date, EnumDateFormatTypes.READABLE_V5),
                    description: lot.description,
                });

                setInputs({
                    id: productInput.id,
                    quantity: productInput.quantity,
                    unit_price: currency(Number(productInput.unit_price), true),
                    product_id: productInput.product_id,
                    input_id: productInput.id,
                    base_id: productInput.base_id,
                    provider_id: productInput.provider_id,
                    lot_id: lot.id,
                });
            }
        } else {
            setInputs(productInput);
        }
    }, [productInput.id]);

    function handleCancel() {
        setLot(new Lot());
        setCategory(new Category);
        onCancel();
    }

    return(
        <ProductInputFormView>
            <Title>{edit ? `#${productInput.id}` : "Novo Medicamento/Material Médico"}</Title>
            <Form>
                <Row>
                    <Col sm="3">
                        <InputLabel>Número do lote</InputLabel>
                        <Input 
                            name="serial_number" 
                            style={{textTransform: "uppercase"}}
                            value={lot.serial_number} 
                            onChange={handleChangeLot}
                            placeholder="Número serial"
                            error={submitted && !lot.serial_number}
                        />
                    </Col>
                    <Col sm="3">
                        <InputLabel>Validate</InputLabel>
                        <Input 
                            name="expiration_date" 
                            value={lot.expiration_date} 
                            onChange={handleChangeLot}
                            placeholder="DD/MM/YYYY"
                            error={submitted && !lot.expiration_date}
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
                            onOptionSelected={handleChangeInputs}
                            inputText={productInput.base?.name}
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
                            inputText={productInput.provider?.name}
                            onOptionSelected={handleChangeInputs}
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
                            inputText={productInput.product?.category?.name}
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
                                    onOptionSelected={handleChangeInputs}
                                    inputText={productInput.product?.name}
                                    placeholder="Selecione um medicamento..."
                                    error={submitted && !inputs.product_id}
                                />
                            </Col>
                            <Col sm="3">
                                <InputLabel>Quantidade</InputLabel>
                                <Input 
                                    name="quantity" 
                                    type="number"
                                    value={inputs.quantity} 
                                    onChange={handleChangeInputs}
                                    placeholder="Quantidade"
                                    error={submitted && !inputs.quantity}
                                />
                            </Col>
                            <Col sm="3">
                                <InputLabel>Preço unitário</InputLabel>
                                <Input 
                                    name="unit_price" 
                                    value={inputs.unit_price} 
                                    onChange={handleChangeInputs}
                                    placeholder="Preço unitário"
                                    error={submitted && !inputs.unit_price}
                                    adorment={<p>R$</p>}
                                    adormentPosition="start"
                                />
                            </Col>
                        </React.Fragment>
                    )}
                </Row>
                <Row>
                    <Col sm="12">
                        <InputLabel>Descrição</InputLabel>
                        <TextArea 
                            name="description" 
                            value={lot.description} 
                            onChange={handleChangeLot} 
                            placeholder="Forneça uma descrição" 
                        />
                    </Col>
                </Row>

                <FormActions>
                    <Button onClick={handleSubmit}>
                        {processing ? <Circular size={30} /> : <ButtonText>Salvar</ButtonText>}
                    </Button>
                    <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
                </FormActions>
            </Form>
        </ProductInputFormView>
    );
}
