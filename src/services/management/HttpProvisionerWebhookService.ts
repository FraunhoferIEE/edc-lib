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
import { OpenAPIConfig, DeprovisionedResource, CancelablePromise, ProvisionerWebhookRequest } from '../../index.js';

export class HttpProvisionerWebhookService {
    private OpenAPI: OpenAPIConfig;
    constructor(endpointConfig: OpenAPIConfig) {
      this.OpenAPI = endpointConfig;
    }

    /**
     * @param processId
     * @param requestBody
     * @returns any default response
     * @throws ApiError
     */
    public  callDeprovisionWebhook(
        processId: string,
        requestBody?: DeprovisionedResource,
    ): CancelablePromise<any> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/callback/{processId}/deprovision',
            path: {
                'processId': processId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param processId
     * @param requestBody
     * @returns any default response
     * @throws ApiError
     */
    public  callProvisionWebhook(
        processId: string,
        requestBody?: ProvisionerWebhookRequest,
    ): CancelablePromise<any> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/callback/{processId}/provision',
            path: {
                'processId': processId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
