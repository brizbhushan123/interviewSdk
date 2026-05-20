import { environment } from '../config/environment';
/* Author : Jitendra Bhardwaj */

export interface APIManagerOptions {
  baseURL: string;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface Files {
  name: string;
  File: Blob;
}

// create class for APIManager
/**
 *
 */
export class APIManager {
  baseURL: string;
  headers: Record<string, string>;
  timeout: number;

  token: string;
  /**
   *
   * @param options
   */
  constructor(options: APIManagerOptions) {
    this.baseURL = options.baseURL.replace(/\/+$/, '');
    this.headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    this.timeout = options.timeout ?? 20000;
    this.token = '';
  }

  /**
   *
   * @param path
   * @param params
   * @param tkn
   */
  setToken(tkn: string) {
    this.token = tkn;
    this.headers = { ...this.headers, ...{ Authorization: `Bearer ${this.token}` } };
  }

  getToken(): string {
    return this.token;
  }
  /**
   *
   * @param path
   * @param params
   */
  private buildURL(path: string, params?: Record<string, any>): string {
    const url = new URL(this.baseURL + path);
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        // Only include parameters that are not undefined or null
        if (val !== undefined && val !== null) {
          url.searchParams.append(key, String(val)); // Convert the value to string before appending
        }
      });
    }
    // Return the fully constructed URL as a string
    return url.toString();
  }

  /**
   *
   * @param method
   * @param path
   * @param body
   * @param params
   * @param extraHeaders
   */
  private async request<T = any>(
    method: string,
    path: string,
    body?: any,
    params?: Record<string, any>,
    extraHeaders?: Record<string, string>
  ): Promise<T> {
    const url = this.buildURL(path, params);

    // Create an AbortController to support request timeout
    const controller = new AbortController();

    // Set up a timeout to automatically abort the request if it takes too long
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    const isFormData = body instanceof FormData;
    const combinedHeaders = { ...this.headers, ...extraHeaders };
    if (isFormData) {
      delete combinedHeaders['Content-Type'];
    }

    const res = await fetch(url, {
      method,
      headers: combinedHeaders,
      signal: controller.signal,
      body: body != null ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

    // Clear the timeout once the request completes
    clearTimeout(timeoutId);

    // Throw an error if the response status indicates failure
    if (res && !res.ok) {
      const errorText = await res.text();
      throw new Error(`API error ${res.status}: ${errorText}`);
    }

    // Return the parsed JSON response
    return res.json() as Promise<T>;
  }

  /**
   *
   * @param path
   * @param params
   * @param headers
   */
  public get<T = any>(
    path: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ) {
    // Delegate the GET request to the generic request method
    return this.request<T>('GET', path, undefined, params, headers);
  }

  /**
   *
   * @param path
   * @param data
   * @param params
   * @param headers
   */
  public post<T = any, U = any>(
    path: string,
    data: U,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ) {
    // Delegate the POST request to the generic request method
    return this.request<T>('POST', path, data, params, headers);
  }

  /**
   *
   * @param path
   * @param data
   * @param params
   * @param headers
   */
  public put<T = any, U = any>(
    path: string,
    data: U,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ) {
    // Delegate the PUT request to the generic request method
    return this.request<T>('PUT', path, data, params, headers);
  }

  /**
   *
   * @param path
   * @param data
   * @param params
   * @param headers
   */
  public patch<T = any, U = any>(
    path: string,
    data: U,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ) {
    // Delegate the PATCH request to the generic request method
    return this.request<T>('PATCH', path, data, params, headers);
  }

  /**
   *
   * @param path
   * @param params
   * @param headers
   */
  public delete<T = any>(
    path: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ) {
    // Delegate the DELETE request to the generic request method
    return this.request<T>('DELETE', path, undefined, params, headers);
  }

  /**
   *
   * @param token
   * @param scheme
   */
  public setAuthToken(token: string, scheme: string = 'Bearer') {
    // Set the Authorization header in the default headers object
    this.headers['Authorization'] = `${scheme} ${token}`;
  }

  /**
   *
   */
  public clearAuthToken() {
    // Delete the Authorization header from the default headers object
    delete this.headers['Authorization'];
  }

  /**
   *
   * @param path
   * @param data
   * @param files
   * @param params
   * @param headers
   */
  public file<T = any, U = any>(
    path: string,
    data: U,
    files: Files[],
    params?: Record<string, any>,
    headers?: Record<string, string>
  ) {
    const formData = new FormData();

    // Append fields like 'environment'
    for (const i in data) {
      const val = data[i];
      const key: string = i;
      formData.append(key, val as string | Blob);
    }

    // Append files with name AND filename
    for (const i in files) {
      const val = files[i].File;
      const key: string = files[i].name;

      // Optional: try to detect file type and extension
      let filename = `uploaded_file${i}.jpg`; // default name
      if (val instanceof Blob && val.type) {
        const ext = val.type.split('/')[1] || 'jpg';
        filename = `uploaded_file${i}.${ext}`;
      }

      formData.append(key, val, filename); // ⬅️ important: add filename
    }

    return this.request<T>('POST', path, formData, params, headers);
  }
}

// configure it once:
const api = new APIManager({
  baseURL: environment.API_URL,
  headers: {
    'X-App-Version': environment.SDK_VERSION,
  },
  timeout: environment.API_TIMEOUT,
});

// everywhere that imports `api` gets the same object:
export default api;
