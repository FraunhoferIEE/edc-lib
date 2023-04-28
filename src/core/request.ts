/*
 * Copyright 2023 Fraunhofer IEE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Contributors:
 *       Michel Otto - initial implementation
 *
 */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import {ApiError} from './ApiError.js';
import type {ApiRequestOptions} from './ApiRequestOptions.js';
import type {ApiResult} from './ApiResult.js';
import {CancelablePromise} from './CancelablePromise.js';
import type {OnCancel} from './CancelablePromise.js';
import type {OpenAPIConfig} from './OpenAPI.js';
import fetch, {Response, RequestInit, Headers, Blob} from 'node-fetch';
import * as https from 'https';

const isDefined = <T>(
  value: T | null | undefined
): value is Exclude<T, null | undefined> => {
  return value !== undefined && value !== null;
};

const isString = (value: any): value is string => {
  return typeof value === 'string';
};

const isStringWithValue = (value: any): value is string => {
  return isString(value) && value !== '';
};

const isBlob = (value: any): value is Blob => {
  return (
    typeof value === 'object' &&
    typeof value.type === 'string' &&
    typeof value.stream === 'function' &&
    typeof value.arrayBuffer === 'function' &&
    typeof value.constructor === 'function' &&
    typeof value.constructor.name === 'string' &&
    /^(Blob|File)$/.test(value.constructor.name) &&
    /^(Blob|File)$/.test(value[Symbol.toStringTag])
  );
};

const b64encode = (str: string): string => Buffer.from(str).toString('base64');

const getQueryString = (params: Record<string, any>): string => {
  const qs: string[] = [];

  const append = (key: string, value: any) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };

  const process = (key: string, value: any) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        value.forEach(v => {
          process(key, v);
        });
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([k, v]) => {
          process(`${key}[${k}]`, v);
        });
      } else {
        append(key, value);
      }
    }
  };

  Object.entries(params).forEach(([key, value]) => {
    process(key, value);
  });

  if (qs.length > 0) {
    return `?${qs.join('&')}`;
  }

  return '';
};

const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
  const encoder = config.ENCODE_PATH || encodeURI;

  const path = options.url
    .replace('{api-version}', config.VERSION)
    .replace(/{(.*?)}/g, (substring: string, group: string) => {
      if (options.path?.hasOwnProperty(group)) {
        return encoder(String(options.path[group]));
      }
      return substring;
    });

  const url = `${config.BASE}${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

const resolve = async <T>(
  options: ApiRequestOptions,
  resolver?: T | Resolver<T>
): Promise<T | undefined> => {
  if (typeof resolver === 'function') {
    return (resolver as Resolver<T>)(options);
  }
  return resolver;
};

const getHeaders = async (
  config: OpenAPIConfig,
  options: ApiRequestOptions
): Promise<Headers> => {
  const token = await resolve(options, config.TOKEN);
  const username = await resolve(options, config.USERNAME);
  const password = await resolve(options, config.PASSWORD);
  const additionalHeaders = await resolve(options, config.HEADERS);

  const headers = Object.entries({
    Accept: 'application/json',
    ...additionalHeaders,
    ...options.headers,
  })
    .filter(([_, value]) => isDefined(value))
    .reduce(
      (headers, [key, value]) => ({
        ...headers,
        [key]: String(value),
      }),
      {} as Record<string, string>
    );

  if (isStringWithValue(token)) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (isStringWithValue(username) && isStringWithValue(password)) {
    const credentials = b64encode(`${username}:${password}`);
    headers['Authorization'] = `Basic ${credentials}`;
  }

  if (options.body) {
    if (options.mediaType) {
      headers['Content-Type'] = options.mediaType;
    } else if (isBlob(options.body)) {
      headers['Content-Type'] = options.body.type || 'application/octet-stream';
    } else if (isString(options.body)) {
      headers['Content-Type'] = 'text/plain';
    }
  }

  return new Headers(headers);
};

const getRequestBody = (options: ApiRequestOptions): any => {
  if (options.body) {
    if (options.mediaType?.includes('/json')) {
      return JSON.stringify(options.body);
    } else if (isString(options.body) || isBlob(options.body)) {
      return options.body;
    } else {
      return options.body;
    }
  }
  return undefined;
};

export const sendRequest = async (
  config: OpenAPIConfig,
  options: ApiRequestOptions,
  url: string,
  body: any,
  headers: Headers,
  onCancel: OnCancel
): Promise<Response> => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const request: RequestInit = {
    headers,
    body: body,
    method: options.method,
    agent: httpsAgent,
  };

  if (config.WITH_CREDENTIALS) {
    // not relevant
    //request.credentials = config.CREDENTIALS;
  }

  console.log(`${options.method} ${url}`);

  return await fetch(url, request);
};

const getResponseHeader = (
  response: Response,
  responseHeader?: string
): string | undefined => {
  if (responseHeader) {
    const content = response.headers.get(responseHeader);
    if (isString(content)) {
      return content;
    }
  }
  return undefined;
};

const getResponseBody = async (response: Response): Promise<any> => {
  if (response.status !== 204) {
    try {
      const contentType = response.headers.get('Content-Type');
      if (contentType) {
        const isJSON = contentType.toLowerCase().startsWith('application/json');
        if (isJSON) {
          return await response.json();
        } else {
          return await response.text();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return undefined;
};

const catchErrorCodes = (
  options: ApiRequestOptions,
  result: ApiResult
): void => {
  const errors: Record<number, string> = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    ...options.errors,
  };

  const error = errors[result.status];
  if (error) {
    throw new ApiError(options, result, error);
  }

  if (!result.ok) {
    throw new ApiError(options, result, 'Generic Error');
  }
};

/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export const request = <T>(
  config: OpenAPIConfig,
  options: ApiRequestOptions
): CancelablePromise<T> => {
  return new CancelablePromise(async (resolve, reject, onCancel) => {
    try {
      const url = getUrl(config, options);
      const body = getRequestBody(options);
      const headers = await getHeaders(config, options);

      if (!onCancel.isCancelled) {
        const response = await sendRequest(
          config,
          options,
          url,
          body,
          headers,
          onCancel
        );
        const responseBody = await getResponseBody(response);
        const responseHeader = getResponseHeader(
          response,
          options.responseHeader
        );

        const result: ApiResult = {
          url,
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          body: responseHeader ?? responseBody,
        };

        try {
          catchErrorCodes(options, result);
        } catch (error) {
          console.error((error as ApiError).statusText);
          throw error;
        }

        resolve(result.body);
      }
    } catch (error) {
      reject(error);
    }
  });
};
