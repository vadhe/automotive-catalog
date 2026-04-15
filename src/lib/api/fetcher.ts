const BASE_URL = "https://fakestoreapi.com";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      response.statusText,
      `Request failed [${response.status} ${response.statusText}]: ${url}`,
    );
  }

  return response.json() as Promise<T>;
}
