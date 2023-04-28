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

import {request as __request} from '../../core/request.js';
import {
  CancelablePromise,
  ContractAgreementDto,
  OpenAPIConfig,
  QuerySpecDto,
} from '../../index.js';

export class ContractAgreementService {
  private OpenAPI: OpenAPIConfig;
  constructor(endpointConfig: OpenAPIConfig) {
    this.OpenAPI = endpointConfig;
  }

  /**
   * @deprecated
   * Gets all contract agreements according to a particular query
   * @param offset
   * @param limit
   * @param filter
   * @param sort
   * @param sortField
   * @returns ContractAgreementDto
   * @throws ApiError
   */
  public getAllAgreements(
    offset?: number,
    limit?: number,
    filter?: string,
    sort?: 'ASC' | 'DESC',
    sortField?: string
  ): CancelablePromise<Array<ContractAgreementDto>> {
    return __request(this.OpenAPI, {
      method: 'GET',
      url: '/contractagreements',
      query: {
        offset: offset,
        limit: limit,
        filter: filter,
        sort: sort,
        sortField: sortField,
      },
      errors: {
        400: `Request body was malformed`,
      },
    });
  }

  /**
   * Gets all contract agreements according to a particular query
   * @param requestBody
   * @returns ContractAgreementDto
   * @throws ApiError
   */
  public queryAllAgreements(
    requestBody?: QuerySpecDto
  ): CancelablePromise<Array<ContractAgreementDto>> {
    return __request(this.OpenAPI, {
      method: 'POST',
      url: '/contractagreements/request',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        400: `Request body was malformed`,
      },
    });
  }

  /**
   * Gets an contract agreement with the given ID
   * @param id
   * @returns ContractAgreementDto The contract agreement
   * @throws ApiError
   */
  public getContractAgreement(
    id: string
  ): CancelablePromise<ContractAgreementDto> {
    return __request(this.OpenAPI, {
      method: 'GET',
      url: '/contractagreements/{id}',
      path: {
        id: id,
      },
      errors: {
        400: `Request was malformed, e.g. id was null`,
        404: `An contract agreement with the given ID does not exist`,
      },
    });
  }
}
