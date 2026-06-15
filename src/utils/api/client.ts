export function getApiBaseUrl(): string {
    return window.location.hostname === 'localhost'
        ? 'http://localhost:8787'
        : 'https://api.sammyandjack.com'
}

type ApiRequestOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: unknown
}

export async function apiRequest(
    path: string,
    options: ApiRequestOptions = {}
): Promise<Response> {
    const { method = 'GET', body } = options

    const response = await fetch(`${getApiBaseUrl()}${path}`, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
    }

    return response
}
