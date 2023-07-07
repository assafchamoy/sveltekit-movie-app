export type ServiceError = { title: string; error: string } | null;

export function isServiceError(object: any): object is ServiceError {
    return 'title' in object && 'error' in object;
}