// __tests__/APIManager.test.ts
import api,{APIManagerOptions,APIManager} from "../../src/core/APIManager"; // Adjust path if needed

describe('APIManager', () => {
  const BASE_URL = 'https://api.example.com';
  const DEFAULT_OPTIONS: APIManagerOptions = {
    baseURL: BASE_URL,
    headers: { 'X-Custom-Header': 'CustomValue' },
    timeout: 10000,
  };

  let apiManager: APIManager;

  // Use beforeEach to re-initialize APIManager for each test
  // This ensures each test has a fresh, isolated instance
  beforeEach(() => {
    apiManager = api;
    // mockFetch is already cleared by global beforeEach
    // jest.clearAllTimers() is also called by global beforeEach
  });

  // --- Constructor Tests ---
  describe('Constructor', () => {
    test('should initialize with provided baseURL and normalize it', () => {
      const manager1 = new APIManager({ baseURL: 'http://test.com/' });
      // @ts-ignore - Accessing private property for testing purposes
      expect(manager1.baseURL).toBe('http://test.com');

      const manager2 = new APIManager({ baseURL: 'http://test.com' });
      // @ts-ignore
      expect(manager2.baseURL).toBe('http://test.com');
    });

    test('should initialize with default headers and merge custom headers', () => {
      const manager1 = new APIManager(DEFAULT_OPTIONS);
      expect(manager1.headers).toHaveProperty('Content-Type', 'application/json');
      expect(manager1.headers).toHaveProperty('X-Custom-Header', 'CustomValue');
    });

    test('should initialize with default timeout if not provided', () => {
      const manager = new APIManager({ baseURL: 'http://test.com' });
      // @ts-ignore
      expect(manager.timeout).toBe(30000); // Default value from APIManager class
    });

    test('should initialize with provided timeout', () => {
     const manager1 = new APIManager(DEFAULT_OPTIONS);

      expect(manager1.timeout).toBe(10000);
    });

    test('should initialize with an empty token', () => {
      // @ts-ignore
      const manager1 = new APIManager(DEFAULT_OPTIONS);
      expect(manager1.token).toBe("");
    });

    
  });

  // --- Token Management Tests ---
  describe('Token Management', () => {

    test('should update token after sdk initialize', () => {
      // @ts-ignore 
      expect(apiManager.token).toBe(global.sessionToken.sessionToken);
    });
    test('setToken should set the token and add Authorization header', () => {
        const manager = new APIManager({ baseURL: 'http://test.com' });
      const testToken = 'myTestToken123';
      manager.setToken(testToken);
      // @ts-ignore
      expect(manager.token).toBe(testToken);
      // @ts-ignore
      expect(manager.headers['Authorization']).toBe(`Bearer ${testToken}`);
    });

    test('setAuthToken should set Authorization header with default scheme', () => {
      const manager = new APIManager({ baseURL: 'http://test.com' });
      const testToken = 'anotherToken456';
      manager.setAuthToken(testToken);
      // @ts-ignore
      expect(manager.headers['Authorization']).toBe(`Bearer ${testToken}`);
    });

    test('setAuthToken should set Authorization header with custom scheme', () => {
      const manager = new APIManager({ baseURL: 'http://test.com' });  
      const testToken = 'customSchemeToken';
      manager.setAuthToken(testToken, 'Basic');
      // @ts-ignore
      expect(manager.headers['Authorization']).toBe(`Basic ${testToken}`);
    });

    test('clearAuthToken should remove Authorization header', () => {
      const manager = new APIManager({ baseURL: 'http://test.com' });    
      manager.setAuthToken('someToken'); // First set it
      // @ts-ignore
      expect(manager.headers['Authorization']).toBeDefined(); // Ensure it's there
      manager.clearAuthToken(); // Then clear it
      // @ts-ignore
      expect(manager.headers['Authorization']).toBeUndefined();
    });
  });

//   // --- buildURL Method (Indirectly Tested) ---
//   // The private buildURL method is implicitly tested via the public get/post/etc methods,
//   // by asserting the URL that `fetch` is called with.

//   // --- HTTP Methods Tests (GET, POST, PUT, PATCH, DELETE) ---
  describe('HTTP Methods', () => {
    // Helper function to mock a successful JSON response
    const mockJsonResponse = (data: any, status = 200) =>
      Promise.resolve({
        ok: true,
        status: status,
        json: () => Promise.resolve(data),
        text: () => Promise.resolve(JSON.stringify(data)), // For robustness
      } as Response);

    // Helper function to mock a successful Text response (for HTML/plain text)
    const mockTextResponse = (text: string, status = 200) =>
      Promise.resolve({
        ok: true,
        status: status,
        json: () => Promise.resolve({}), // For robustness
        text: () => Promise.resolve(text),
      } as Response);

    // Helper function to mock an error response
    const mockErrorResponse = (status: number, errorText: string) =>
      Promise.resolve({
        ok: false,
        status: status,
        json: () => Promise.resolve({ message: errorText }), // For robustness
        text: () => Promise.resolve(errorText),
      } as Response);
    const manager1 = new APIManager(DEFAULT_OPTIONS);

    test('GET should make a GET request with correct URL and headers', async () => {
      const expectedData = { message: 'Success' };
      global.mockFetch.mockImplementationOnce(() => mockJsonResponse(expectedData));

      const path = '/data';
      const params = { id: 123, type: 'xyz' };
      const extraHeaders = { 'X-Request-ID': 'abc' };

      const result = await manager1.get(path, params, extraHeaders);

      expect(global.mockFetch).toHaveBeenCalledTimes(1);
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/data?id=123&type=xyz`,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Custom-Header': 'CustomValue',
            'X-Request-ID': 'abc',
          },
        })
      );
      expect(result).toEqual(expectedData);
    });

    test('POST should make a POST request with correct URL, headers, and body', async () => {
      const expectedData = { status: 'created' };
      const requestBody = { name: 'New Item', value: 100 };
      global.mockFetch.mockImplementationOnce(() => mockJsonResponse(expectedData));

      const path = '/items';
      const params = { version: 2 };
      const extraHeaders = { 'X-Client-Info': 'web' };

      const result = await manager1.post(path, requestBody, params, extraHeaders);

      expect(global.mockFetch).toHaveBeenCalledTimes(1);
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/items?version=2`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Custom-Header': 'CustomValue',
            'X-Client-Info': 'web',
          },
          body: JSON.stringify(requestBody), // Assert body is stringified JSON
        })
      );
      expect(result).toEqual(expectedData);
    });

    test('PUT should make a PUT request with correct URL, headers, and body', async () => {
      const expectedData = { status: 'updated' };
      const requestBody = { id: 1, changes: { name: 'Updated Name' } };
      global.mockFetch.mockImplementationOnce(() => mockJsonResponse(expectedData));

      const path = '/users/1';
      const result = await manager1.put(path, requestBody);

      expect(global.mockFetch).toHaveBeenCalledTimes(1);
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/users/1`,
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(requestBody),
        })
      );
      expect(result).toEqual(expectedData);
    });

    test('PATCH should make a PATCH request with correct URL, headers, and body', async () => {
      const expectedData = { status: 'patched' };
      const requestBody = { email: 'new@example.com' };
      global.mockFetch.mockImplementationOnce(() => mockJsonResponse(expectedData));

      const path = '/profile';
      const result = await manager1.patch(path, requestBody);

      expect(global.mockFetch).toHaveBeenCalledTimes(1);
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/profile`,
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(requestBody),
        })
      );
      expect(result).toEqual(expectedData);
    });

    test('DELETE should make a DELETE request with correct URL and headers', async () => {
      const expectedData = { status: 'deleted' };
      global.mockFetch.mockImplementationOnce(() => mockJsonResponse(expectedData));

      const path = '/resource/5';
      const result = await manager1.delete(path);

      expect(global.mockFetch).toHaveBeenCalledTimes(1);
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/resource/5`,
        expect.objectContaining({
          method: 'DELETE',
          body: undefined, // DELETE requests usually don't have a body
        })
      );
      expect(result).toEqual(expectedData);
    });

    test('should include Authorization header if token is set via setToken', async () => {
      const testToken = 'bearerAccessToken';
      manager1.setToken(testToken);
      global.mockFetch.mockImplementationOnce(() => mockJsonResponse({ success: true }));

      await manager1.get('/protected');

      expect(global.mockFetch).toHaveBeenCalledTimes(1);
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/protected`,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${testToken}`,
          }),
        })
      );
    });

    test('should include Authorization header if token is set via setAuthToken', async () => {
      const testToken = 'basicAuthToken';
      manager1.setAuthToken(testToken, 'Basic');
      global.mockFetch.mockImplementationOnce(() => mockJsonResponse({ success: true }));

      await manager1.get('/another-protected');

      expect(global.mockFetch).toHaveBeenCalledTimes(1);
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/another-protected`,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Basic ${testToken}`,
          }),
        })
      );
    });

    test('should remove Authorization header after clearAuthToken', async () => {
      manager1.setAuthToken('someToken');
      manager1.clearAuthToken();
      global.mockFetch.mockImplementationOnce(() => mockJsonResponse({ success: true }));

      await manager1.get('/public-resource');

      expect(global.mockFetch).toHaveBeenCalledTimes(1);
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/public-resource`,
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.any(String), // Assert no Authorization header exists
          }),
        })
      );
    });

    test('should handle API error responses', async () => {
      const errorStatus = 401;
      const errorText = 'Unauthorized';
      global.mockFetch.mockImplementationOnce(() => mockErrorResponse(errorStatus, errorText));

      const path = '/secure-data';
      await expect(manager1.get(path)).rejects.toThrow(`API error ${errorStatus}: ${errorText}`);

      expect(global.mockFetch).toHaveBeenCalledTimes(1);
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/secure-data`,
        expect.any(Object) // Simple check for options object
      );
    });

    test('should handle network errors (fetch rejection)', async () => {
      const networkError = new TypeError('Network connection lost');
      global.mockFetch.mockImplementationOnce(() => Promise.reject(networkError));

      const path = '/unreachable';
      await expect(manager1.get(path)).rejects.toThrow(networkError);

      expect(global.mockFetch).toHaveBeenCalledTimes(1);
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/unreachable`,
        expect.any(Object)
      );
    });

    // --- Timeout Tests ---
    describe('Timeout Handling', () => { 

      test('should abort request if timeout is reached', async () => { 
        jest.useFakeTimers();

        console.log('isFakeTimers:', jest.isMockFunction(setTimeout));

        // Mock fetch to never resolve, simulating a hung request
        global.mockFetch.mockImplementationOnce((url, options) => {
          return new Promise((_, reject) => {
            options.signal.addEventListener('abort', () => {
              reject(new DOMException('Aborted', 'AbortError'));
            });
          });
        });

        const path = '/slow-endpoint';
        const timeout = 100; // API Manager's timeout is 10000 in this instance, but if it was 5000
        const customAPIManager = new APIManager({ baseURL: BASE_URL, timeout: timeout });

        // Call the request, it should reject due to timeout
        const promise = customAPIManager.get(path);
  

        // Advance timers by just enough to trigger the timeout
        jest.advanceTimersByTime(timeout + 1); 

        await Promise.resolve();

        // Expect the promise to reject with an AbortError or a specific error message
        await expect(promise).rejects.toThrow(
          expect.objectContaining({
            name: 'AbortError', // Standard AbortController error name
          })
        );

        expect(global.mockFetch).toHaveBeenCalledTimes(1);
        expect(global.mockFetch).toHaveBeenCalledWith(
          `${BASE_URL}/slow-endpoint`,
          expect.objectContaining({
            signal: expect.any(AbortSignal), // Verify abort signal was attached
          })
        );
      });

      test('should clear timeout if request completes before timeout', async () => {
        // Spy on clearTimeout to ensure it's called
        const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
        global.mockFetch.mockImplementationOnce(() => mockJsonResponse({ done: true }));

        const path = '/fast-endpoint';
        await manager1.get(path); // This will resolve immediately

        // Advance timers by a small amount, not enough to trigger timeout,
        // but enough to allow any async operations to complete if needed.
        jest.advanceTimersByTime(100);

        // Expect clearTimeout to have been called
        expect(clearTimeoutSpy).toHaveBeenCalledTimes(1); // Once for fetch
        expect(global.mockFetch).toHaveBeenCalledTimes(1);

        clearTimeoutSpy.mockRestore(); // Clean up the spy
      });
    });

    // --- buildURL specific test (including null/undefined params) ---
    test('should build URL correctly with various params including null/undefined', async () => {
      const testUrl = `${BASE_URL}/search`;
      const params = {
        query: 'test',
        page: 1,
        limit: undefined, // Should be ignored
        category: null,   // Should be ignored
        active: true,
        nested: { key: 'value' }, // Object values will be stringified as "[object Object]" by URLSearchParams
      };

      global.mockFetch.mockImplementationOnce(() => mockJsonResponse({}));

      await manager1.get('/search', params);

      // Verify the URL constructed and passed to fetch
      expect(global.mockFetch).toHaveBeenCalledWith(
        `${testUrl}?query=test&page=1&active=true&nested=%5Bobject+Object%5D`,
        expect.any(Object)
      );
    });

    test('should build URL correctly with empty path and params', async () => {
      global.mockFetch.mockImplementationOnce(() => mockJsonResponse({}));
      await manager1.get(''); // No path

      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/`, // Expect trailing slash for base URL
        expect.any(Object)
      );

      global.mockFetch.mockClear(); // Clear for next sub-test
      global.mockFetch.mockImplementationOnce(() => mockJsonResponse({}));
      await manager1.get('/posts', {}); // Empty params object

      expect(global.mockFetch).toHaveBeenCalledWith(
        `${BASE_URL}/posts`,
        expect.any(Object)
      );
    });
  });
});