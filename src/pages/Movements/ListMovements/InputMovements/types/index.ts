import Input from "../../../../../models/Input";

interface InputMovementsProps {
    loading: boolean;
    inputMovements: Array<Input>;
    limit: number;
    offset: number;
    page: number;
    getInputMovements(): void;
};

export type {InputMovementsProps};