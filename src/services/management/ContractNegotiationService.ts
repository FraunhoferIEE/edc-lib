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
import { request as __request } from '../../core/request.js';
import { CancelablePromise, ContractNegotiationDto, NegotiationInitiateRequestDto, IdResponseDto, QuerySpecDto, ContractAgreementDto, NegotiationState } from '../../index.js';

export class ContractNegotiationService {
    private OpenAPI: OpenAPIConfig;
    constructor(endpointConfig: OpenAPIConfig) {
      this.OpenAPI = endpointConfig;
    }

    /**
     * @deprecated
     * Returns all contract negotiations according to a query
     * @param offset
     * @param limit
     * @param filter
     * @param sort
     * @param sortField
     * @returns ContractNegotiationDto
     * @throws ApiError
     */
    public  getNegotiations(
        offset?: number,
        limit?: number,
        filter?: string,
        sort?: 'ASC' | 'DESC',
        sortField?: string,
    ): CancelablePromise<Array<ContractNegotiationDto>> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/contractnegotiations',
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
     * Initiates a contract negotiation for a given offer and with the given counter part. Please note that successfully invoking this endpoint only means that the negotiation was initiated. Clients must poll the /{id}/state endpoint to track the state
     * @param requestBody
     * @returns IdResponseDto The negotiation was successfully initiated. Returns the contract negotiation ID and created timestamp
     * @throws ApiError
     */
    public  initiateContractNegotiation(
        requestBody?: NegotiationInitiateRequestDto,
    ): CancelablePromise<IdResponseDto> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/contractnegotiations',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Request body was malformed`,
            },
        });
    }

    /**
     * Returns all contract negotiations according to a query
     * @param requestBody
     * @returns ContractNegotiationDto
     * @throws ApiError
     */
    public  queryNegotiations(
        requestBody?: QuerySpecDto,
    ): CancelablePromise<Array<ContractNegotiationDto>> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/contractnegotiations/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Request was malformed`,
            },
        });
    }

    /**
     * Gets an contract negotiation with the given ID
     * @param id
     * @returns ContractNegotiationDto The contract negotiation
     * @throws ApiError
     */
    public  getNegotiation(
        id: string,
    ): CancelablePromise<ContractNegotiationDto> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/contractnegotiations/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `An contract negotiation with the given ID does not exist`,
            },
        });
    }

    /**
     * Gets a contract agreement for a contract negotiation with the given ID
     * @param id
     * @returns ContractAgreementDto The contract agreement that is attached to the negotiation, or null
     * @throws ApiError
     */
    public  getAgreementForNegotiation(
        id: string,
    ): CancelablePromise<ContractAgreementDto> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/contractnegotiations/{id}/agreement',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `An contract negotiation with the given ID does not exist`,
            },
        });
    }

    /**
     * Requests aborting the contract negotiation. Due to the asynchronous nature of contract negotiations, a successful response only indicates that the request was successfully received. Clients must poll the /{id}/state endpoint to track the state.
     * @param id
     * @returns any Request to cancel the Contract negotiation was successfully received
     * @throws ApiError
     */
    public  cancelNegotiation(
        id: string,
    ): CancelablePromise<any> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/contractnegotiations/{id}/cancel',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `A contract negotiation with the given ID does not exist`,
            },
        });
    }

    /**
     * Requests cancelling the contract negotiation. Due to the asynchronous nature of contract negotiations, a successful response only indicates that the request was successfully received. Clients must poll the /{id}/state endpoint to track the state.
     * @param id
     * @returns any Request to decline the Contract negotiation was successfully received
     * @throws ApiError
     */
    public  declineNegotiation(
        id: string,
    ): CancelablePromise<any> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/contractnegotiations/{id}/decline',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `A contract negotiation with the given ID does not exist`,
            },
        });
    }

    /**
     * Gets the state of a contract negotiation with the given ID
     * @param id
     * @returns NegotiationState The contract negotiation's state
     * @throws ApiError
     */
    public  getNegotiationState(
        id: string,
    ): CancelablePromise<NegotiationState> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/contractnegotiations/{id}/state',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `An contract negotiation with the given ID does not exist`,
            },
        });
    }

}
