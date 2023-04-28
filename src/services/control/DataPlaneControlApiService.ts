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
import { OpenAPIConfig, DataFlowRequest, CancelablePromise } from '../../index.js';

export class DataPlaneControlApiService {
    private OpenAPI: OpenAPIConfig;
    constructor(endpointConfig: OpenAPIConfig) {
      this.OpenAPI = endpointConfig;
    }

    /**
     * Initiates a data transfer for the given request. The transfer will be performed asynchronously.
     * @param requestBody
     * @returns any Data transfer initiated
     * @throws ApiError
     */
    public initiateTransfer(
        requestBody?: DataFlowRequest,
    ): CancelablePromise<any> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/transfer',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Failed to validate request`,
            },
        });
    }

    /**
     * Get the current state of a data transfer.
     * @param processId
     * @returns any Missing access token
     * @throws ApiError
     */
    public getTransferState(
        processId: string,
    ): CancelablePromise<any> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/transfer/{processId}',
            path: {
                'processId': processId,
            },
        });
    }

}
