export interface countyType {
    GISJOIN: string,
    name: string
}

export interface dataEntryType {
    [name: string]: stateType
}

export interface collection {
    collection: string,
    color: any,
    fieldMetadata: any[],
    label: string,
    level: string
}

export interface stateType {
    name: string,
    GISJOIN: string,
    collections_supported: collection[],
    datasets: string[],
    counties: countyType[]
}