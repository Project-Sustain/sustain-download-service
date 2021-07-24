export const getApiKey = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('api_key');
}

export const checkIfCanDownload = async (apiKey: string) => {
    return new Promise<boolean>(() => {
        fetch(`http://urban-sustain.org/api/download?apiKey=${apiKey}`, { mode: 'no-cors' }).then(function(response) {
            console.log(`status: ${response.status}`)
        });
    })
}