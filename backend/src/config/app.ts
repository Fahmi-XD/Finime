export const EXCEPT_AUTH_ROUTE = [
  ["/comment", "GET"],
  ["/user/username", "GET"],
  ["/users", "GET"],
  ["/live", "GET"],
  ["/user/history", "GET"],
]

// Status server: "maintenance" | "active"
export const SERVER_STATUS: "maintenance" | "active" = "maintenance";