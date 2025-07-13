/**
 * Mengembalikan Response
 */

import { ResponseModel } from "@models/responseModel.js";

export default class Response {

  // Json Response
  static standarResponse<T>(status: number, body: T): ResponseModel<T> {
    return {
      status,
      result: body,
      error: null
    } as ResponseModel<T>
  }

}