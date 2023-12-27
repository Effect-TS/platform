# ⚠️ @effect/platform has moved

This repository has been deprecated following the consolidation of its codebase into the [`effect` monorepo](https://github.com/Effect-TS/effect).

You can find all `@effect/platform-*` packages here: https://github.com/effect-ts/effect/tree/main/packages

---

# API Reference

For comprehensive information about the `@effect/platform` packages API, please consult our [API Reference](https://effect-ts.github.io/platform).

# Working with HTTP

Effect simplifies making HTTP requests by providing easy-to-use abstractions. In this section, we'll explore two common operations: getting a resource and creating a resource.

## Getting a Resource

To fetch data from an HTTP endpoint, we can use the `Http.request.get` function.

In the example below, we retrieve a resource and log the response:

```ts
import { Effect } from "effect";
import * as Http from "@effect/platform/HttpClient";

// $ExectType Http.request.ClientRequest
const req = Http.request.get("https://jsonplaceholder.typicode.com/posts/1");

// $ExectType Effect<never, Http.error.HttpClientError, unknown>
const program = req.pipe(
  Http.client.fetch(),
  Effect.flatMap((res) => res.json)
);

// Execute the program and handle the result
Effect.runPromise(program).then(console.log, console.error);
```

The output will display the fetched data, which might look something like this:

```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

### Add query parameters

In this section, we'll explore how to add query parameters to an HTTP request. Query parameters are essential when you need to customize the data you retrieve from an API endpoint.

```ts
import { Effect } from "effect";
import * as Http from "@effect/platform/HttpClient";

// Create an HTTP GET request and append the "userId" query parameter
const req = Http.request
  .get("https://jsonplaceholder.typicode.com/posts")
  .pipe(Http.request.appendUrlParam("userId", "1"));

const program = req.pipe(
  Http.client.fetch(),
  Effect.flatMap((res) => res.json)
);

Effect.runPromise(program).then(console.log, console.error);
```

The output will contain an array of objects, each representing a resource with the specified "userId" query parameter. Here's a simplified example of what the output might look like:

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }
  // ...
]
```

### Validating the Payload with `@effect/schema`

When working with data from external sources, such as APIs, it's essential to ensure that the data you receive matches your expected structure. Effect simplifies this process by allowing you to validate the payload using the `@effect/schema` library. This helps you avoid unexpected issues caused by mismatched data.

In the example below, we fetch data from an HTTP endpoint and validate it against a predefined schema before processing it:

```ts
import { Effect } from "effect";
import * as Http from "@effect/platform/HttpClient";
import * as Schema from "@effect/schema/Schema";

// Define the HTTP GET request
const req = Http.request.get("https://jsonplaceholder.typicode.com/posts/1");

// Define the schema to validate the response data
const Post = Schema.struct({
  userId: Schema.number,
  id: Schema.number,
  title: Schema.string,
  body: Schema.string,
});

// Create an effect program to fetch and validate the response
const program = req.pipe(
  Http.client.fetch(),
  Effect.flatMap(Http.response.schemaBodyJson(Post))
);

// Execute the program and handle the result
Effect.runPromise(program).then(console.log).catch(console.error);
```

The `Post` schema defines the expected structure of the response data, including the data types of each field. By validating the response against this schema, you can be confident that the data meets your requirements.

The output will display the validated data, ensuring that it conforms to the specified schema. This helps prevent unexpected errors when working with external data sources.

## Creating a Resource

To send data and create a resource via HTTP, we use the `Http.request.post` function.

In this example, we send a POST request to create a new resource with a JSON body:

```ts
import { Effect } from "effect";
import * as Http from "@effect/platform/HttpClient";

// $ExectType Effect<never, Http.body.BodyError, Http.request.ClientRequest>
const req = Http.request
  .post("https://jsonplaceholder.typicode.com/posts")
  .pipe(
    Http.request.setHeader("Content-type", "application/json; charset=UTF-8"),
    Http.request.jsonBody({
      title: "foo",
      body: "bar",
      userId: 1,
    })
  );

// $ExectType Effect<never, Http.body.BodyError | Http.error.HttpClientError, unknown>
const program = req.pipe(
  Effect.flatMap(Http.client.fetch()),
  Effect.flatMap((res) => res.json)
);

// Execute the program and handle the result
Effect.runPromise(program).then(console.log, console.error);
```

The output will display the newly created resource, which might look something like this:

```json
{
  "title": "foo",
  "body": "bar",
  "userId": 1,
  "id": 101
}
```
