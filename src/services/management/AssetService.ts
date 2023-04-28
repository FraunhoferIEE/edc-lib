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

import { OpenAPIConfig, CancelablePromise, AssetResponseDto, AssetEntryDto, IdResponseDto, QuerySpecDto, DataAddressDto } from '../../index.js';
import { request as __request } from '../../core/request.js';

export class AssetService {
    private OpenAPI: OpenAPIConfig;
    constructor(endpointConfig: OpenAPIConfig) {
      this.OpenAPI = endpointConfig;
    }
    
    /**
     * @deprecated
     * Gets all assets according to a particular query
     * @param offset
     * @param limit
     * @param filter
     * @param sort
     * @param sortField
     * @returns AssetResponseDto
     * @throws ApiError
     */
    public getAllAssets(
        offset?: number,
        limit?: number,
        filter?: string,
        sort?: 'ASC' | 'DESC',
        sortField?: string,
    ): CancelablePromise<Array<AssetResponseDto>> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/assets',
            query: {
                'offset': offset,
                'limit': limit,
                'filter': filter,
                'sort': sort,
                'sortField': sortField,
            },
            errors: {
                400: `Request body was malformed`,
            },
        });
    }

    /**
     * Creates a new asset together with a data address
     * @param requestBody
     * @returns IdResponseDto Asset was created successfully. Returns the asset Id and created timestamp
     * @throws ApiError
     */
    public createAsset(
        requestBody?: AssetEntryDto,
    ): CancelablePromise<IdResponseDto> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/assets',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Request body was malformed`,
                409: `Could not create asset, because an asset with that ID already exists`,
            },
        });
    }

    /**
     *  all assets according to a particular query
     * @param requestBody
     * @returns AssetResponseDto
     * @throws ApiError
     */
    public requestAssets(
        requestBody?: QuerySpecDto,
    ): CancelablePromise<Array<AssetResponseDto>> {
        return __request(this.OpenAPI, {
            method: 'POST',
            url: '/assets/request',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Request body was malformed`,
            },
        });
    }

    /**
     * Gets an asset with the given ID
     * @param id
     * @returns AssetResponseDto The asset
     * @throws ApiError
     */
    public getAsset(
        id: string,
    ): CancelablePromise<AssetResponseDto> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/assets/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `An asset with the given ID does not exist`,
            },
        });
    }

    /**
     * Removes an asset with the given ID if possible. Deleting an asset is only possible if that asset is not yet referenced by a contract agreement, in which case an error is returned. DANGER ZONE: Note that deleting assets can have unexpected results, especially for contract offers that have been sent out or ongoing or contract negotiations.
     * @param id
     * @returns any Asset was deleted successfully
     * @throws ApiError
     */
    public removeAsset(
        id: string,
    ): CancelablePromise<any> {
        return __request(this.OpenAPI, {
            method: 'DELETE',
            url: '/assets/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `An asset with the given ID does not exist`,
                409: `The asset cannot be deleted, because it is referenced by a contract agreement`,
            },
        });
    }

    /**
     * Gets a data address of an asset with the given ID
     * @param id
     * @returns DataAddressDto The data address
     * @throws ApiError
     */
    public getAssetDataAddress(
        id: string,
    ): CancelablePromise<DataAddressDto> {
        return __request(this.OpenAPI, {
            method: 'GET',
            url: '/assets/{id}/address',
            path: {
                'id': id,
            },
            errors: {
                400: `Request was malformed, e.g. id was null`,
                404: `An asset with the given ID does not exist`,
            },
        });
    }

}
