export type Attributes = {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    description: string | null;
};

export type AttributesResponse = Attributes[];

export type Error = {
    error?: string;
};
