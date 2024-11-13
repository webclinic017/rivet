// This file was auto-generated by Fern from our API Definition.

package actor

import (
	json "encoding/json"
	fmt "fmt"
	uuid "github.com/google/uuid"
	core "sdk/core"
)

type ListDatacentersRequestQuery struct {
	GameId        *uuid.UUID `json:"-"`
	EnvironmentId *uuid.UUID `json:"-"`
}

type ListDatacentersResponse struct {
	Datacenters []*Datacenter `json:"datacenters,omitempty"`

	_rawJSON json.RawMessage
}

func (l *ListDatacentersResponse) UnmarshalJSON(data []byte) error {
	type unmarshaler ListDatacentersResponse
	var value unmarshaler
	if err := json.Unmarshal(data, &value); err != nil {
		return err
	}
	*l = ListDatacentersResponse(value)
	l._rawJSON = json.RawMessage(data)
	return nil
}

func (l *ListDatacentersResponse) String() string {
	if len(l._rawJSON) > 0 {
		if value, err := core.StringifyJSON(l._rawJSON); err == nil {
			return value
		}
	}
	if value, err := core.StringifyJSON(l); err == nil {
		return value
	}
	return fmt.Sprintf("%#v", l)
}
