export default interface DownloadResult {
    data: any[],
    geometry?: any[],
    meta: downloadMeta
}

export interface downloadMeta {
    collectionName: string,
    label?: string,
    joinField?: string,
    fieldLabels?: labelMap[],
    countyName: string
}

interface labelMap {   
    name: string,
    label: string
}