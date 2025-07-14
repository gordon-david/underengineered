package main

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

func main() {

	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})

	var workers [5]*Worker
	for i := 0; i < 5; i++ {
		workers[i] = newWorker("jobqueue", i, rdb)
	}

	for i := 0; i < 5; i++ {
		go workers[i].start()
	}

	select {}
}

type Worker struct {
	queue       string
	id          int
	redisClient *redis.Client
}

func newWorker(queue string, id int, redisClient *redis.Client) *Worker {
	w := &Worker{queue, id, redisClient}
	return w
}

func (w *Worker) start() {

	fmt.Printf("Worker %d started\n", w.id)

	for {
		result, err := w.redisClient.BRPop(context.Background(), 0*time.Second, "jobqueue").Result()

		if err != nil {
			fmt.Println("Error BRPop: ", err)
			continue
		}

		// result[0] is the key, result[1] is the result
		fmt.Printf("Worker %d got job: %v\n", w.id, result[1])
	}
}
