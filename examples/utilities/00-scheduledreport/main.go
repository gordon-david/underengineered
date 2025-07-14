package main

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"os"
)

var (
	api = os.Getenv("DISCORD_WEBHOOK")
)

func main() {
	if len(api) == 0 {
		panic("DISCORD_WEBHOOK is null")
	}

	res := pushNotification(`# this is a test
From your local *neighborhood* **Discord Bot**

:)`)

	println("Response:  \nStatus:", res.Status)

	resBody, err := io.ReadAll(res.Body)

	if err != nil {
		panic(err)
	}

	println("Body:", string(resBody))

}

type Payload struct {
	Content string `json:"content"`
}

func pushNotification(content string) *http.Response {
	__content, err := json.Marshal(Payload{Content: content})
	if err != nil {
		panic(err)
	}

	res, err := http.Post(api, "application/json", bytes.NewReader(__content))

	if err != nil {
		panic(err)
	}

	return res
}
