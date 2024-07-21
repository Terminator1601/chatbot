import {constructUrl, handleErrors, getCsrfToken} from './FetchHelpers'

export async function fetchPostJson(hostUrl, urlPath, requestBody, callbackOnSuccess, callbackOnError) {
    const url = constructUrl(hostUrl, urlPath);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken()
            },
            body: JSON.stringify(requestBody)
        });
        const responseData = await handleErrors(response);
        if(callbackOnSuccess){
            callbackOnSuccess(responseData);
        }
        else{
            return responseData
        }
    } catch (error) {
        console.error(`Error in fetching data: ${error}`);
        if (callbackOnError) {
            callbackOnError({
                error: 'Fetch failed',
                success: 0,
                url: url,
                message: error.message
            });
        }
    }
}

export async function fetchGetJson(hostUrl, urlPath, callbackOnSuccess, callbackOnError) {
    const url = constructUrl(hostUrl, urlPath);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-CSRFToken': getCsrfToken()
            }
        });
        const responseData = await handleErrors(response);
        callbackOnSuccess(responseData);
    } catch (error) {
        console.error(`Error in fetchGetJson: ${error}`);
        if (callbackOnError) {
            callbackOnError({
                error: 'Fetch failed',
                success: 0,
                url: url,
                message: error.message
            });
        }
    }
}

export async function fetchPostJsonFileSubmit(hostUrl, urlPath, formData, callbackOnSuccess, callbackOnError) {
    const url = constructUrl(hostUrl, urlPath);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCsrfToken()
            },
            body: formData
        });
        const responseData = await handleErrors(response);
        callbackOnSuccess(responseData);
    } catch (error) {
        console.error(`Error in fetchPostJsonFileSubmit: ${error}`);
        if (callbackOnError) {
            callbackOnError({
                error: 'Fetch failed',
                url: url,
                message: error.message
            });
        }
    }
}