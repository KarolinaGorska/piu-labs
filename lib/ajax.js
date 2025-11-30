export class Ajax {
    constructor(options = {}) {
        this.baseURL = options.baseURL || '';
        this.timeout = options.timeout || 5000;
        this.headers = {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        };
    }

    _mergeOptions(localOptions = {}) {
        return {
            headers: { ...this.headers, ...(localOptions.headers || {}) },
            timeout: localOptions.timeout || this.timeout,
            baseURL: localOptions.baseURL || this.baseURL,
        };
    }

    async _request(method, url, data = null, localOptions = {}) {
        const opts = this._mergeOptions(localOptions);

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), opts.timeout);

        const fullUrl = opts.baseURL + url;

        let fetchOptions = {
            method,
            headers: opts.headers,
            signal: controller.signal,
        };

        if (data !== null) {
            fetchOptions.body = JSON.stringify(data);
        }

        let response;

        try {
            response = await fetch(fullUrl, fetchOptions);
        } catch (err) {
            clearTimeout(id);

            if (err.name === 'AbortError') {
                throw new Error(`Request timeout after ${opts.timeout}ms`);
            }
            throw new Error('Network error: ' + err.message);
        }

        clearTimeout(id);

        let json;
        try {
            json = await response.json();
        } catch {
            throw new Error(`Invalid JSON response from ${fullUrl}`);
        }

        if (!response.ok) {
            throw new Error(
                `HTTP Error ${response.status}: ${response.statusText}\n` +
                    `Response: ${JSON.stringify(json)}`
            );
        }

        return json;
    }

    async get(url, options) {
        return this._request('GET', url, null, options);
    }

    async post(url, data, options) {
        return this._request('POST', url, data, options);
    }

    async put(url, data, options) {
        return this._request('PUT', url, data, options);
    }

    async delete(url, options) {
        return this._request('DELETE', url, null, options);
    }
}
