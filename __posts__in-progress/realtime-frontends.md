---
title: Working with Realtime Frontends
---

**Resources:**
- [Stackoverflow: Is there a server cost to using WebSockets?](https://stackoverflow.com/questions/23314964/is-there-a-server-cost-to-using-websockets)
- [WebSockets: Guided Introduction](https://blog.teamtreehouse.com/an-introduction-to-websockets)
- [WebSockets: Wikipedia](https://en.wikipedia.org/wiki/WebSocket)
- [IETF WebSocket Protocol](https://datatracker.ietf.org/doc/html/rfc6455)

## Guiding Notes

The typical response to realtime, browser and web based frontends is to use websockets. They provide a flexible tcp-over-http style of communication that is relatively easy to grasp.

### Polling

Polling refers to the frontend making http requests for any updated information provided by a backend api. Often categorized as long or short, for the time period between requests. Polling has the advantage of using and http api (in the case of web frontends). The design and maintenance of http apis is well known and understood, their stateless nature makes it relatively easy to diagnose. Further, they are easy to horizontally scale given the orthogonal nature of sequential http requests.

### SSE

### WebSockets
