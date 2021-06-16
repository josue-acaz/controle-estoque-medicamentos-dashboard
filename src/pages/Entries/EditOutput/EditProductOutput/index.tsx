import React, {useState, useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import {onlyNumbers} from "../../../../utils";

// contexts
import {useFeedback} from "../../../../contexts/feedback/feedback.context";

// models
import Lot from "../../../../models/Lot";
import ProductOutput from "../../../../models/ProductOutput";

// services
import productOutputService from "../../../../services/product-output.service";

// types
import {EditProductOutputProps} from "./types";

// components
import Autocomplete from "../../../../components/form/Autocomplete";
import Input from "../../../../components/form/Input";
import Circular from "../../../../components/spinners/Circular";

// styles
import {
    EditProductOutputView,
    Form,
    Title,
    LotOptionView,
    LotSerialNumber,
    LotProductName,
    SelectedLot,
} from "./styles";
import {InputLabel, Button, ButtonText} from "../../../../design";

export default function EditProductOutput(props: EditProductOutputProps) {
    const {output, onSaved} = props;
    const feedback = useFeedback();
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [lot, setLot] = useState<Lot | null>(null);
    const [inputs, setInputs] = useState<ProductOutput>({
        id: "",
        lot_id: "",
        quantity: 1,
        product_id: "",
        output_id: output.id,
    });

    const maximum_quantity = lot ? lot.product_input?.current_quantity : 1;

    function handleChange(e: any) {
        let {name, value} = e.target;

        if(name === "lot_id") {
            value = value.id;
        }

        if(name === "quantity") {
            value = onlyNumbers(value);
            if(maximum_quantity) {
                if(!(Number(value) <= maximum_quantity) || Number(value) < 1) return;
            }
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    async function handleSubmit() {
        setSubmitted(true);
        if(inputs.lot_id && inputs.quantity) {
            await save();
        }
    }

    async function save() {
        setProcessing(true);

        try {
            const product_output = await productOutputService.create(inputs);
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

    useEffect(() => {
        setInputs(inputs => ({...inputs, quantity: 1}));
    }, [maximum_quantity]);

    return(
        <EditProductOutputView>
            <Title>Seleção do lote</Title>
            <Form>
                <Row>
                    <Col sm="4">
                        <InputLabel>Lote</InputLabel>
                        <Autocomplete
                            name="lot_id"
                            fieldName="serial_number"
                            endpoint="/lots/autocomplete"
                            placeholder="Selecione o lote"
                            onOptionSelected={(event: any) => {
                                handleChange(event);
                                setLot(event.target.value);
                            }}
                            inputText={inputs.lot?.serial_number}
                            renderOption={(option: Lot) => (
                                <LotOptionView>
                                    <LotSerialNumber>{option.serial_number}</LotSerialNumber>
                                    <LotProductName>{option.product_input?.product?.name}</LotProductName>
                                </LotOptionView>
                            )}
                            error={submitted && !inputs.lot_id}
                        />
                        {lot && (<SelectedLot>*{lot.product_input?.product?.name}</SelectedLot>)}
                    </Col>
                    {lot && (
                        <Col sm="4">
                            <InputLabel>{`Quantidade (máximo de ${maximum_quantity})`}</InputLabel>
                            <Input 
                                name="quantity" 
                                value={inputs.quantity} 
                                onChange={handleChange}
                                placeholder="Quantidade"
                                type="number"
                                error={submitted && !inputs.quantity}
                            />
                        </Col>
                    )}
                </Row>

                <Button onClick={handleSubmit}>
                    {processing ? <Circular size={30} /> : <ButtonText>SALVAR</ButtonText>}
                </Button>
            </Form>
        </EditProductOutputView>
    );
}