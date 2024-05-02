// This file was auto-generated by Fern from our API Definition.

package client

import (
	http "net/http"
	builds "sdk/cloud/games/docker/builds"
	core "sdk/core"
)

type Client struct {
	baseURL string
	caller  *core.Caller
	header  http.Header

	Builds *builds.Client
}

func NewClient(opts ...core.ClientOption) *Client {
	options := core.NewClientOptions()
	for _, opt := range opts {
		opt(options)
	}
	return &Client{
		baseURL: options.BaseURL,
		caller:  core.NewCaller(options.HTTPClient),
		header:  options.ToHeader(),
		Builds:  builds.NewClient(opts...),
	}
}
