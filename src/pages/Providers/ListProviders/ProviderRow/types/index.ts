import Provider from "../../../../../models/Provider";

interface ProviderRowProps {
    provider: Provider;
    onEdit(id: string): void;
};

export type {ProviderRowProps};