import Aircraft from "../../../../../models/Aircraft";

interface AircraftRowProps {
    aircraft: Aircraft;
    onEdit(id: string): void;
};

export type {AircraftRowProps};