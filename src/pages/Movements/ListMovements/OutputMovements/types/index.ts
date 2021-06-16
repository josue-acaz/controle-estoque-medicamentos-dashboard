import Output from "../../../../../models/Output";

interface OutputMovementsProps {
    loading: boolean;
    outputMovements: Array<Output>;
    limit: number;
    offset: number;
    page: number;
    getOutputMovements(): void;
};

export type {OutputMovementsProps};