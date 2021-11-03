import {gisJoinStateNames} from "../Datasets/gisInfo";

export function getStateName(GISJOIN: String) {
    for(const gis of gisJoinStateNames) {
        if(gis.GISJOIN === GISJOIN) {
            return gis.name;
        }
    }
    return "";
}

export function formatDatasetName(datasets: string[]) {
    let newDatasets: string[] = [];
    datasets.forEach((dataset) =>  {
        let newDataset = dataset.replace(/_/g, " ");
        newDataset = capitalizeFirstLetter(newDataset);
        newDatasets.push(newDataset);
    });
    return newDatasets;
}

export function capitalizeFirstLetter(str: any) {
    if (str == null || str.length == 0) {
        return "";
    }
    str = str.split(" ");
    for (let i = 0, x = str.length; i < x; i++) {
        if (str[i] == null || str[i].length <= 2) {
            continue;
        }
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
}