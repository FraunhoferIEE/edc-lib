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

import { OpenAPIConfig } from '../../core/OpenAPI.js';
import { CancelablePromise, TransferProcessFailStateDto } from '../../index.js';
import { request as __request } from '../../core/request.js';

export class TransferProcessControlApiService {
    private OpenAPI: OpenAPIConfig;
    constructor(endpointConfig: OpenAPIConfig) {
      this.OpenAPI = endpointConfig;
    }

    /**
     * Requests completion of the transfer process. Due to the asynchronous nature of transfers, a successful response only indicates that the request was successfully received
     * @param processId
     * @returns void
     * @throws ApiError
     */
    public complete(
        processId: string,
    ): CancelablePromise<void> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/transferprocess/{processId}/complete',
            path: {
                'processId': processId,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
            },
        });
    }

    /**
     * Requests completion of the transfer process. Due to the asynchronous nature of transfers, a successful response only indicates that the request was successfully received
     * @param processId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public fail(
        processId: string,
        requestBody: TransferProcessFailStateDto,
    ): CancelablePromise<void> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/transferprocess/{processId}/fail',
            path: {
                'processId': processId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Request was malformed, e.g. id was null`,
            },
        });
    }

}
