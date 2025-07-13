/**
 * Mengembalikan Response Error
 */

import { ResponseModel } from "@models/responseModel.js";

export default class HttpException {

  // Json Response
  static standarException<T>(status: number, body: T): ResponseModel<T> {
    return {
      status,
      result: null,
      error: body
    } as ResponseModel<T>
  }

}