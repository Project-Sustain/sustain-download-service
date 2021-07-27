export const getApiKey = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('api_key');
}

export const checkIfCanDownload = async (apiKey: string) => {
    return new Promise<boolean>(() => {
        fetch(`https://urban-sustain.org/api/download?apiKey=${apiKey}`).then(async function(response) {
            console.log(`status: ${response}`)
            console.log(response)
            const body = await response.text();
            console.log({body})
        });
    })
}