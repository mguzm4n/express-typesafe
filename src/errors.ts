export class ResourceNotFoundError extends Error {
  constructor(resourceDetails: string) {
    super(`Resource not found: ${resourceDetails}`);
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }
}
