/**
 * Mengembalikan Response Error
 */

export default class HttpException {

  // Json Response
  static standarException(status: number, body: Record<string, any>): Response {
    return new Response(JSON.stringify(body), {
      status, headers: {
        "content-type": "application/json"
      }
    })
  }

}