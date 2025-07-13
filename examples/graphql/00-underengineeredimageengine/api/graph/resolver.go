package graph

import (
	"context"

	"github.com/redis/go-redis/v9"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	jobQueueClient *JobQueueClient
}

func New() Config {
	return Config{
		Resolvers: &Resolver{
			jobQueueClient: NewJobQueueClient(),
		},
	}
}

type JobQueueClient struct {
	redisClient *redis.Client
	redisCtx    *context.Context
}

func NewJobQueueClient() *JobQueueClient {
	ctx := context.Background()
	return &JobQueueClient{
		redisCtx:    &ctx,
		redisClient: redis.NewClient(&redis.Options{Addr: "localhost:6379"}),
	}
}
