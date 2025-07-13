# The UnderengeeredImageEngine

![alt text](/docs/graphql/00-underengineeredimageengine/architecture.png)

Components
- redis queue: a queue that sits between the worker and the api. All this does is decouple whatever long running process the worker component needs to take care of from the rest of our application. This allows for long running processes (such as image manipulation) to not incur additional latency to api requests. Additionally, many, many image manipulation requests can be queued without causing any issues with the api.
- worker: a background worker that "pops" jobs off the redis queue using long-polling (BRPOP or Blocking Right POP).
- api: The GraphQL api. The api has multiple jobs, but essentially acts as our 'interactor' in this example; responding to any processing or update requests from any clients.


tests
- playwright + playwright-graphql
- https://playwright.dev/docs/api-testing
- [github.com/DanteUkraine/playwright-graphql](https://github.com/DanteUkraine/playwright-graphql) (https://www.npmjs.com/package/playwright-graphql): By default, using graphql with playwright requires sending graphql queries in untyped strings, losing any benefits of a typed API surface that graphql should offer. This nifty library generates code based on a provided graphql schema that integrates nicely with playwright.
- placed graphql schema in central location
- ran `npx playwright-graphql --schema ../schema.gql`, for codegen
- tests runnable via `npm run test`

api
- gqlgen
	- added tools.go
	- `go run github.com/99designs/gqlgen init` --> initializes default config
	- `go run github.com/99designs/gqlgen generate` --> compares schema files with models, and will bind  to the modals