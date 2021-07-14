import { isLinked } from "./DatasetUtil";
import { sustain_querier } from "../library/grpc_querier.js";

const querier = sustain_querier();

export default async function Download(currentDataset: any, GISJOIN: string, includeLinked: boolean) {
    let pipeline: any[] = [];
    //first, check if the dataset is a county or tract dataset, this will be the easiest to download
    if (currentDataset?.level === 'county') {
        pipeline.push({ $match: { GISJOIN } });
    }
    else if (currentDataset?.level === 'tract') {
        pipeline.push({ $match: { GISJOIN: { $regex: `${GISJOIN}.*` } } });
    }

    const d = await mongoQuery(currentDataset.collection, pipeline)
    console.log(d)
}

const mongoQuery = async (collection: string, pipeline: any[]) => {
    return new Promise<any[]>((resolve) => {
        const stream: any = querier.getStreamForQuery(collection, JSON.stringify(pipeline));
        let returnData: any[] = [];
        stream.on('data', (res: any) => {
            const data = JSON.parse(res.getData());
            returnData.push(data)
        });
        stream.on('end', () => {
            resolve(returnData);
        });
    });
}