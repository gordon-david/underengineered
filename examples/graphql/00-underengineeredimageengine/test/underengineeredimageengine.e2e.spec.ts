import { test, expect, request } from '@playwright/test'
import { getClient, JobStatus } from "./gql/graphql"

async function setup() {
    return getClient(await request.newContext({baseURL: "http://localhost:4000"}), { gqlEndpoint: "/query"})
}

test('uploadImage, job is Queued -- using playwright-graphql codegen', async ({ playwright }) => {
    const api = await setup()
    const response = await api.uploadImage({ name: "test-name" }, { headers: { "content-type": "application/json", "Accept": "application/json" } })

    expect(response.uploadImage.status).toBe(JobStatus.Queued)
})

test('uploadImage, job is Queued -- manual', async ({ playwright }) => {
    const api = await request.newContext({ baseURL: 'http://localhost:4000/query' })

    const response = await api.post('', {
        data: {
            query: `mutation UploadImage {uploadImage(name: "test") { id, name, status, submittedAt, completedAt } }`
        },
        headers: {
            "Accept": "application/json, multipart/mixed",
            "content-type": "application/json"
        }
    })

    expect((await response.json())['data']['uploadImage']['status']).toBe('QUEUED')
})