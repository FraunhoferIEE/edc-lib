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
import { OpenAPIConfig, CancelablePromise, TransferProcessDto, TransferRequestDto, IdResponseDto, QuerySpecDto, TransferState } from '../../index.js';

export class TransferProcessService {
    private OpenAPI: OpenAPIConfig;
    constructor(endpointConfig: OpenAPIConfig) {
      this.OpenAPI = endpointConfig;
    }

    /**
     * @deprecated
     * Returns all transfer process according to a query
     * @param offset
     * @param limit
     * @param filter
     * @param sort
     * @param sortField
     * @returns TransferProcessDto
     * @throws ApiError
     */
    public  getAllTransferProcesses(
        offset?: number,
        limit?: number,
        filter?: string,
        sort?: 'ASC' | 'DESC',
        sortField?: string,
    ): CancelablePromise<Array<TransferProcessDto>> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/transferprocess',
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
     * Initiates a data transfer with the given parameters. Please note that successfully invoking this endpoint only means that the transfer was initiated. Clients must poll the /{id}/state endpoint to track the state
     * @param requestBody
     * @returns IdResponseDto The transfer was successfully initiated. Returns the transfer process ID and created timestamp
     * @throws ApiError
     */
    public  initiateTransfer(
        requestBody?: TransferRequestDto,
    ): CancelablePromise<IdResponseDto> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/transferprocess',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Request body was malformed`,
            },
        });
    }

    /**
     * Returns all transfer process according to a query
     * @param requestBody
     * @returns TransferProcessDto
     * @throws ApiError
     */
    public  queryAllTransferProcesses(
        requestBody?: QuerySpecDto,
    ): CancelablePromise<Array<TransferProcessDto>> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/transferprocess/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Request was malformed`,
            },
        });
    }

    /**
     * Gets an transfer process with the given ID
     * @param id
     * @returns TransferProcessDto The transfer process
     * @throws ApiError
     */
    public  getTransferProcess(
        id: string,
    ): CancelablePromise<TransferProcessDto> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/transferprocess/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `A transfer process with the given ID does not exist`,
            },
        });
    }

    /**
     * Requests aborting the transfer process. Due to the asynchronous nature of transfers, a successful response only indicates that the request was successfully received. Clients must poll the /{id}/state endpoint to track the state.
     * @param id
     * @returns any Request to cancel the transfer process was successfully received
     * @throws ApiError
     */
    public  cancelTransferProcess(
        id: string,
    ): CancelablePromise<any> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/transferprocess/{id}/cancel',
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
     * Requests the deprovisioning of resources associated with a transfer process. Due to the asynchronous nature of transfers, a successful response only indicates that the request was successfully received. This may take a long time, so clients must poll the /{id}/state endpoint to track the state.
     * @param id
     * @returns any Request to deprovision the transfer process was successfully received
     * @throws ApiError
     */
    public  deprovisionTransferProcess(
        id: string,
    ): CancelablePromise<any> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/transferprocess/{id}/deprovision',
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
     * Gets the state of a transfer process with the given ID
     * @param id
     * @returns TransferState The  transfer process's state
     * @throws ApiError
     */
    public  getTransferProcessState(
        id: string,
    ): CancelablePromise<TransferState> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/transferprocess/{id}/state',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `An  transfer process with the given ID does not exist`,
            },
        });
    }

}
