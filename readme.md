# DerivWS Mock Server

## Connecting to the Mock Server

Each JSON request sent to the mock server must contain a `mock_id` which help identify which session that the client is currently on.

```json
{
  "mock_id": 1
}
```

Each session in the mock server has the following scoped to the id:

- WebSocket connection to DerivWS
- DerivWS Authorization
- Account bound-data

<br /><br/>

## Pushing Mock Data

To push your custom data to the mock server, you will need to add the `generate_mock` property to the call.

```json
{
  "generate_mock": "1"
}
```

Adding this will allow the mock server to accept mock data directly through this call without too much check. Of course, schema validation is still in place.

List of generator endpoints:

- Accounts
