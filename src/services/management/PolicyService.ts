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
import { OpenAPIConfig, CancelablePromise, PolicyDefinitionResponseDto, PolicyDefinitionRequestDto, IdResponseDto, QuerySpecDto } from '../../index.js';

export class PolicyService {
    private OpenAPI: OpenAPIConfig;
    constructor(endpointConfig: OpenAPIConfig) {
      this.OpenAPI = endpointConfig;
    }

    /**
     * @deprecated
     * Returns all policy definitions according to a query
     * @param offset
     * @param limit
     * @param filter
     * @param sort
     * @param sortField
     * @returns PolicyDefinitionResponseDto
     * @throws ApiError
     */
    public  getAllPolicies(
        offset?: number,
        limit?: number,
        filter?: string,
        sort?: 'ASC' | 'DESC',
        sortField?: string,
    ): CancelablePromise<Array<PolicyDefinitionResponseDto>> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/policydefinitions',
            query: {
                'offset': offset,
                'limit': limit,
                'filter': filter,
                'sort': sort,
                'sortField': sortField,
            },
            errors: {
                400: `Request was malformed`,
            },
        });
    }

    /**
     * Creates a new policy definition
     * @param requestBody
     * @returns IdResponseDto policy definition was created successfully. Returns the Policy Definition Id and created timestamp
     * @throws ApiError
     */
    public  createPolicy(
        requestBody?: PolicyDefinitionRequestDto,
    ): CancelablePromise<IdResponseDto> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/policydefinitions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Request body was malformed`,
                409: `Could not create policy definition, because a contract definition with that ID already exists`,
            },
        });
    }

    /**
     * Returns all policy definitions according to a query
     * @param requestBody
     * @returns PolicyDefinitionResponseDto
     * @throws ApiError
     */
    public  queryAllPolicies(
        requestBody?: QuerySpecDto,
    ): CancelablePromise<Array<PolicyDefinitionResponseDto>> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/policydefinitions/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Request was malformed`,
            },
        });
    }

    /**
     * Gets a policy definition with the given ID
     * @param id
     * @returns PolicyDefinitionResponseDto The  policy definition
     * @throws ApiError
     */
    public  getPolicy(
        id: string,
    ): CancelablePromise<PolicyDefinitionResponseDto> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/policydefinitions/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `An  policy definition with the given ID does not exist`,
            },
        });
    }

    /**
     * Removes a policy definition with the given ID if possible. Deleting a policy definition is only possible if that policy definition is not yet referenced by a contract definition, in which case an error is returned. DANGER ZONE: Note that deleting policy definitions can have unexpected results, do this at your own risk!
     * @param id
     * @returns any Policy definition was deleted successfully
     * @throws ApiError
     */
    public  deletePolicy(
        id: string,
    ): CancelablePromise<any> {
        return __request(this.OpenAPI, {
            method: 'DELETE',
            url: '/policydefinitions/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `An policy definition with the given ID does not exist`,
                409: `The policy definition cannot be deleted, because it is referenced by a contract definition`,
            },
        });
    }

}
