export function constructUrl(base, path) {
    const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
    return `${trimmedBase}${window.projectRootURLPath}${path}`;
}

export function getCsrfToken() {
    return window.dashboardConfig?.csrfToken ?? '';
}

export function handleErrors(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}