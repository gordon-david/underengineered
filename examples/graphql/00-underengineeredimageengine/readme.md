# The UnderengeeredImageEngine

Components
- redis queue: a queue that sits between the worker and the api. All this does is decouple whatever long running process the worker component needs to take care of from the rest of our application. This allows for long running processes (such as image manipulation) to not incur additional latency to api requests. Additionally, many, many image manipulation requests can be queued without causing any issues with the api.
- worker: a background worker that "pops" jobs off the redis queue using long-polling (BRPOP or Blocking Right POP).
- api: The GraphQL api. The api has multiple jobs, but essentially acts as our 'interactor' in this example; responding to any processing or update requests from any clients.
    - POST /push will push a job onto the redis queue
    - POST /complete?id=?