export const getApiKey = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('api_key');
}

interface downloadCheckType {
    canDownload: boolean,
    timeLeft?: number
}

export const checkIfCanDownload = async (apiKey: string) => {
    return new Promise<downloadCheckType>((resolve) => {
        fetch(`https://urban-sustain.org/api/download?apiKey=${apiKey}`).then(async function (response) {
            console.log(response)
            const body = await response.text();
            console.log({ body })
            if (response.status === 200) {
                resolve({ canDownload: true })
            }
            const cooldown = JSON.parse(body.length ? body : `{"cooldown": 99999}`)?.cooldown;
            resolve({ canDownload: false, timeLeft: cooldown })
        });
    })
}