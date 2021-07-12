import React, {useState} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {onlyNumbers} from "../../utils";

// models
import Discard from "../../models/Discard";

// components
import Alert from "../Alert";
import Input from "../form/Input";
import TextArea from "../form/TextArea";

// types
import {DiscardAlertProps} from "./types";

// styles
import {
    DiscardAlertView, 
    DiscardForm, 
    ObservationText,
    Observation,
    ObservationIcon,
} from "./styles";
import {InputLabel, InputGroup} from "../../design";

// icons
import WarningIcon from '@material-ui/icons/Warning';

export default function DiscardAlert(props: DiscardAlertProps) {
    const {open, productInput, onConfirm, onCancel, onClose} = props;
    const [individual, setIndividual] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [inputs, setInputs] = useState<Discard>(new Discard());

    const {current_quantity, quantity, output_quantity} = productInput;
    const maximum_quantity = current_quantity ? current_quantity : quantity;

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean) {
        let {name, value} = event.target;

        if(name === "individual") {
            setIndividual(!checked);
        }

        if(name === "quantity") {
            value = onlyNumbers(value);
            if(maximum_quantity && value) {
                if(!(Number(value) <= maximum_quantity) || Number(value) < 1) return;
            }
        }

        setInputs(inputs => ({...inputs, [name]: value}));
    }

    function handleSubmit() {
        setSubmitted(true);

        let discard = inputs;
        discard.lot_id = productInput.lot_id;

        if(!individual) {
            discard.quantity = maximum_quantity;
        }

        if(discard.quantity) {
            onConfirm(discard);
        }
    }

    return(
        <Alert theme="danger" title={`#${productInput.lot?.serial_number}`} msg="Informe como deseja realizar o descarte" open={open} labelConfirm="Confirmar" labelCancel="Cancelar" onConfirm={handleSubmit} onCancel={onCancel} onClose={onClose}>
            <DiscardAlertView>
                <DiscardForm>
                    <InputGroup>
                        <Checkbox style={{backgroundColor: "#eeeeee", marginRight: 5}} name="individual" checked={!individual} onChange={handleChange} />
                        <InputLabel>{current_quantity ? `Descarte tudo (${current_quantity} itens)` : "Descarte o lote todo"}</InputLabel>
                    </InputGroup>
                    {individual && (
                        <InputGroup>
                            <InputLabel>Quantidade (Máximo de {maximum_quantity})</InputLabel>
                            <Input 
                                type="number" 
                                name="quantity" 
                                value={inputs.quantity} 
                                onChange={handleChange} 
                                error={submitted && !inputs.quantity}
                            />
                        </InputGroup>
                    )}
                    <InputGroup>
                        <InputLabel>Motivo</InputLabel>
                        <TextArea 
                            name="description" 
                            value={inputs.description} 
                            onChange={handleChange}
                            placeholder="Descreva o motivo do descarte..." 
                        />
                    </InputGroup>
                    {output_quantity && (
                        output_quantity > 0 && (
                            <Observation>
                                <ObservationIcon>
                                    <WarningIcon className="icon" />
                                </ObservationIcon>
                                <ObservationText>Atenção, este lote já possui saídas, será considerado apenas o quantitativo restante.</ObservationText>
                            </Observation>
                        )
                    )}
                </DiscardForm>
            </DiscardAlertView>
        </Alert>
    );
}