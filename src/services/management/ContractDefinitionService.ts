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

import {
  OpenAPIConfig,
  CancelablePromise,
  ContractDefinitionResponseDto,
  ContractDefinitionRequestDto,
  IdResponseDto,
  QuerySpecDto,
} from '../../index.js';
import {request as __request} from '../../core/request.js';

export class ContractDefinitionService {
  private OpenAPI: OpenAPIConfig;
  constructor(endpointConfig: OpenAPIConfig) {
    this.OpenAPI = endpointConfig;
  }

  /**
   * @deprecated
   * Returns all contract definitions according to a query
   * @param offset
   * @param limit
   * @param filter
   * @param sort
   * @param sortField
   * @returns ContractDefinitionResponseDto
   * @throws ApiError
   */
  public getAllContractDefinitions(
    offset?: number,
    limit?: number,
    filter?: string,
    sort?: 'ASC' | 'DESC',
    sortField?: string
  ): CancelablePromise<Array<ContractDefinitionResponseDto>> {
    return __request(this.OpenAPI, {
      method: 'GET',
      url: '/contractdefinitions',
      query: {
        offset: offset,
        limit: limit,
        filter: filter,
        sort: sort,
        sortField: sortField,
      },
      errors: {
        400: `Request was malformed`,
      },
    });
  }

  /**
   * Creates a new contract definition
   * @param requestBody
   * @returns IdResponseDto contract definition was created successfully. Returns the Contract Definition Id and created timestamp
   * @throws ApiError
   */
  public createContractDefinition(
    requestBody?: ContractDefinitionRequestDto
  ): CancelablePromise<IdResponseDto> {
    return __request(this.OpenAPI, {
      method: 'POST',
      url: '/contractdefinitions',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Request body was malformed`,
        409: `Could not create contract definition, because a contract definition with that ID already exists`,
      },
    });
  }

  /**
   * Returns all contract definitions according to a query
   * @param requestBody
   * @returns ContractDefinitionResponseDto
   * @throws ApiError
   */
  public queryAllContractDefinitions(
    requestBody?: QuerySpecDto
  ): CancelablePromise<Array<ContractDefinitionResponseDto>> {
    return __request(this.OpenAPI, {
      method: 'POST',
      url: '/contractdefinitions/request',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Request was malformed`,
      },
    });
  }

  /**
   * Gets an contract definition with the given ID
   * @param id
   * @returns ContractDefinitionResponseDto The contract definition
   * @throws ApiError
   */
  public getContractDefinition(
    id: string
  ): CancelablePromise<ContractDefinitionResponseDto> {
    return __request(this.OpenAPI, {
      method: 'GET',
      url: '/contractdefinitions/{id}',
      path: {
        id: id,
      },
      errors: {
        400: `Request was malformed, e.g. id was null`,
        404: `An contract agreement with the given ID does not exist`,
      },
    });
  }

  /**
   * Removes a contract definition with the given ID if possible. DANGER ZONE: Note that deleting contract definitions can have unexpected results, especially for contract offers that have been sent out or ongoing or contract negotiations.
   * @param id
   * @returns any Contract definition was deleted successfully
   * @throws ApiError
   */
  public deleteContractDefinition(id: string): CancelablePromise<any> {
    return __request(this.OpenAPI, {
      method: 'DELETE',
      url: '/contractdefinitions/{id}',
      path: {
        id: id,
      },
      errors: {
        400: `Request was malformed, e.g. id was null`,
        404: `A contract definition with the given ID does not exist`,
      },
    });
  }
}
