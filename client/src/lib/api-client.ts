/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: never
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  // Get auth token if available
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add Authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Merge with provided headers
  if (options?.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      if (typeof value === "string") {
        headers[key] = value;
      }
    });
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Get response text first (can only read body once)
  const responseText = await response.text();

  if (!response.ok) {
    let errorMessage = "An error occurred";
    let errorData: any = {};

    try {
      errorData = JSON.parse(responseText);
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = responseText || errorMessage;
    }

    throw new ApiError(response.status, errorMessage, errorData);
  }

  // Try to parse response as JSON
  try {
    const data = JSON.parse(responseText);

    // If response is a string, wrap it in an object with message property
    if (typeof data === "string") {
      return { message: data } as T;
    }

    return data;
  } catch {
    // If JSON parsing fails, treat as plain text
    return { message: responseText } as T;
  }
}
