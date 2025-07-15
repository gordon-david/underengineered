package main

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"text/template"

	"github.com/google/go-github/v73/github"
)

var (
	DiscordToken = os.Getenv("DISCORD_WEBHOOK")
	GithubToken  = os.Getenv("GITHUB_TOKEN")
)

func main() {
	if len(DiscordToken) == 0 {
		log.Fatal("DISCORD_WEBHOOK is null")
	}

	if len(GithubToken) == 0 {
		log.Fatal("GITHUB_TOKEN is null")
	}

	client := github.NewClient(nil).WithAuthToken(GithubToken)

	issues, _, err := client.Issues.ListByRepo(context.Background(), "gordon-david", "underengineered", nil)
	if err != nil {
		panic(err)
	}

	tmpl, _ := template.New("Issues").Parse(`
# Issues
{{range .}}- [{{.GetTitle}}]({{.GetHTMLURL}})
{{end}}
`)
	var buffer bytes.Buffer
	tmpl.Execute(&buffer, issues)
	issuesText := buffer.String()
	println(issuesText)

	pushNotification(issuesText)
}

type Payload struct {
	Content string `json:"content"`
	Flags   int    `json:"flags"` // "4" avoids embeds
}

func pushNotification(content string) *http.Response {
	body, err := json.Marshal(Payload{Content: content, Flags: 4})

	if err != nil {
		panic(err)
	}

	res, err := http.Post(DiscordToken, "application/json", bytes.NewReader(body))

	if err != nil || res.StatusCode < 200 || res.StatusCode >= 300 {
		log.Fatal("Error pushing notification to Discord: ", res.Status, err)
	}

	return res
}
