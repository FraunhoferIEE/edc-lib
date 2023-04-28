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
export type ApiRequestOptions = {
  readonly method:
    | 'GET'
    | 'PUT'
    | 'POST'
    | 'DELETE'
    | 'OPTIONS'
    | 'HEAD'
    | 'PATCH';
  readonly url: string;
  readonly path?: Record<string, unknown>;
  readonly cookies?: Record<string, unknown>;
  readonly headers?: Record<string, unknown>;
  readonly query?: Record<string, unknown>;
  readonly formData?: Record<string, unknown>;
  readonly body?: unknown;
  readonly mediaType?: string;
  readonly responseHeader?: string;
  readonly errors?: Record<number, string>;
};
