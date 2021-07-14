export const isLinked = (selectedDataset: any) => {
    return selectedDataset.level || selectedDataset.linked;
}