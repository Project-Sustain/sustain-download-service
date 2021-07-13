export default function Download(currentDataset: any, GISJOIN: string, includeLinked: boolean) {
    let pipeline: any[] = [];
    if (currentDataset?.level === 'county') {
        pipeline.push({ $match: { GISJOIN } });
    }
    else if(currentDataset?.level === 'tract') {
        pipeline.push({ $match: { GISJOIN: { $regex: `${GISJOIN}.*` } } });
    }
    
    
}