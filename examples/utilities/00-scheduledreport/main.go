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

	client := newGithubClient()

	summary := Summary{
		OpenIssues: client.getOpenIssues(),
	}

	issuesText := parseSummary(summary)
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

func parseSummary(summary Summary) string {
	tmpl, _ := template.New("summary").Parse(`
# Summary

> ## Open Issues ({{len .OpenIssues}}){{range .OpenIssues}}
> - [{{.GetNumber}}]({{.GetHTMLURL}}) {{.GetTitle}} (by @{{.GetUser.GetLogin}}){{end}}

`)
	var buffer bytes.Buffer
	tmpl.Execute(&buffer, summary)
	return buffer.String()
}

type Summary struct {
	OpenIssues []*github.Issue
}

type GithubClient struct {
	owner  string
	repo   string
	ctx    context.Context
	client *github.Client
}

func newGithubClient() *GithubClient {
	return &GithubClient{
		owner:  "gordon-david",
		repo:   "underengineered",
		ctx:    context.Background(),
		client: github.NewClient(nil).WithAuthToken(os.Getenv("GITHUB_TOKEN")),
	}
}

func (c *GithubClient) getOpenIssues() []*github.Issue {
	opts := &github.IssueListByRepoOptions{
		State: "open",
	}

	issues, _, _ := c.client.Issues.ListByRepo(c.ctx, c.owner, c.repo, opts)
	return issues
}
