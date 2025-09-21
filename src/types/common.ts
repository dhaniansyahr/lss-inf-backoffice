export interface IMenuItem {
    label: string;
    url?: string;
    type: "LINK" | "SEPERATOR" | "HEADER";
    icon?: string;
    subject?: string;
    items?: IMenuItem[];
}

export interface IPaginate {
    page: number;
    totalPage?: number | null;
    rows: number;
    totalData?: number | null;
}

export type Option = {
    label: string;
    value: string;
};
