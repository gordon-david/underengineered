---
title: "Authentication"
excerpt: "schemes, protocols, and designs"
date: "2021-11-1"
tags: [programming]
---

## Token-Based Authentication

**Resources:**
- [OKTA.com: Token-Based Authentication](https://www.okta.com/identity-101/what-is-token-based-authentication/)

In token-based authentication schemes, a client verifies their identity and receives a token in return. This token is then used to access resources privileged to the particular client (depending on their authorization). One advantage of this system is that a user can supply their credentials for one on going session then send a short-lived token for the remainder of the session.

@startuml
skinparam backgroundcolor transparent
client --> service : {username, password}
service --> service : verify credentials
service --> client : {token}
client --> service : {resource request, token}
service --> service : verify token
service --> client : {resource}
@enduml

Notes:

- The token may have a limited life span
- The token will either be sent with every request (often in an `httponly` cookie in an http api).
  - A variation of this makes use of open sessions, where a client is verified by other identifying markers or associated with an ongoing connection. In this case, a token might not be sent with every request.
- The token often has a set of encrypted user/client claims, such as subject, audience, expiration time, or any other information deemed relevant to the session's authentication or authorization scheme.

