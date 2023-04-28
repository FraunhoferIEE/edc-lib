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
import { CancelablePromise, OpenAPIConfig } from '../../index.js';
import type { HealthStatus } from '../../models/management/HealthStatus.js';
import { request as __request } from '../../core/request.js';

export class ApplicationObservabilityService {
    private OpenAPI: OpenAPIConfig;
    constructor(endpointConfig: OpenAPIConfig) {
      this.OpenAPI = endpointConfig;
    }
    
    /**
     * Performs a liveness probe to determine whether the runtime is working properly.
     * @returns HealthStatus
     * @throws ApiError
     */
    public checkHealth(): CancelablePromise<Array<HealthStatus>> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/check/health',
        });
    }

    /**
     * Performs a liveness probe to determine whether the runtime is working properly.
     * @returns HealthStatus
     * @throws ApiError
     */
    public getLiveness(): CancelablePromise<Array<HealthStatus>> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/check/liveness',
        });
    }

    /**
     * Performs a readiness probe to determine whether the runtime is able to accept requests.
     * @returns HealthStatus
     * @throws ApiError
     */
    public getReadiness(): CancelablePromise<Array<HealthStatus>> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/check/readiness',
        });
    }

    /**
     * Performs a startup probe to determine whether the runtime has completed startup.
     * @returns HealthStatus
     * @throws ApiError
     */
    public getStartup(): CancelablePromise<Array<HealthStatus>> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/check/startup',
        });
    }

}
