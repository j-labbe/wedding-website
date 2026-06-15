import { apiRequest } from './client'

export interface ContactSubmission {
    name: string
    email: string
    message: string
    turnstileToken: string
}

export async function submitContactForm(data: ContactSubmission): Promise<void> {
    await apiRequest('/contactSubmission', {
        method: 'POST',
        body: data,
    })
}
