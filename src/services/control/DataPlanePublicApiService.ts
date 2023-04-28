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
import { request as __request } from '../../core/request.js';
import { OpenAPIConfig, CancelablePromise } from '../../index.js';

export class DataPlanePublicApiService {
    private OpenAPI: OpenAPIConfig;
    constructor(endpointConfig: OpenAPIConfig) {
      this.OpenAPI = endpointConfig;
    }

    /**
     * Send `GET` data query to the Data Plane.
     * @returns void
     * @throws ApiError
     */
    public get(): CancelablePromise<void> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/{any}',
            errors: {
                400: `Missing access token`,
                403: `Access token is expired or invalid`,
                500: `Failed to transfer data`,
            },
        });
    }

    /**
     * Send `PUT` data query to the Data Plane.
     * @returns void
     * @throws ApiError
     */
    public put(): CancelablePromise<void> {
        return __request(this.OpenAPI, {
            method: 'PUT',
            url: '/{any}',
            errors: {
                400: `Missing access token`,
                403: `Access token is expired or invalid`,
                500: `Failed to transfer data`,
            },
        });
    }

    /**
     * Send `POST` data query to the Data Plane.
     * @returns void
     * @throws ApiError
     */
    public post(): CancelablePromise<void> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/{any}',
            errors: {
                400: `Missing access token`,
                403: `Access token is expired or invalid`,
                500: `Failed to transfer data`,
            },
        });
    }

    /**
     * Send `DELETE` data query to the Data Plane.
     * @returns void
     * @throws ApiError
     */
    public delete(): CancelablePromise<void> {
        return __request(this.OpenAPI, {
            method: 'DELETE',
            url: '/{any}',
            errors: {
                400: `Missing access token`,
                403: `Access token is expired or invalid`,
                500: `Failed to transfer data`,
            },
        });
    }

    /**
     * Send `PATCH` data query to the Data Plane.
     * @returns void
     * @throws ApiError
     */
    public patch(): CancelablePromise<void> {
        return __request(this.OpenAPI, {
            method: 'PATCH',
            url: '/{any}',
            errors: {
                400: `Missing access token`,
                403: `Access token is expired or invalid`,
                500: `Failed to transfer data`,
            },
        });
    }

}
