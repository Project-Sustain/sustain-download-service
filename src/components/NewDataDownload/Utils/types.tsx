export interface countyObjType {
    GISJOIN: string,
    name: string
}

export interface stateType {
    [name: string]: {
        name: string,
        GISJOIN: string,
        collections_supported: string[],
        counties: countyObjType[]
    }
}

export interface individualStateType {
    name: string,
    GISJOIN: string,
    collections_supported: string[],
    counties: countyObjType[]
}