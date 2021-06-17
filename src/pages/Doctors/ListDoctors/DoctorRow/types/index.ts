import Doctor from "../../../../../models/Doctor";

interface DoctorRowProps {
    doctor: Doctor;
    onEdit(id: string): void;
};

export type {DoctorRowProps};