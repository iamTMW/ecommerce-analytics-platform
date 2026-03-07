# Frontend unit tests

Controller/service unit tests live under **`src/services/__tests__/`** so Create React App’s Jest (which only discovers tests under `src`) can run them without ejecting.

- **`src/services/__tests__/noteService.test.ts`** – noteService (API layer) tests  
- **`src/testUtils/api.ts`** – mocked fetch / API helpers (outside `__tests__` so Jest doesn’t run it as a test file)

---

## Developer: Running the unit tests

No backend or other services are required. Run from the **frontend** directory or from the project root as below.

**Locally (from project root):**

```bash
cd frontend
npm run test:ci
```

**Locally (watch mode, re-runs on file changes):**

```bash
cd frontend
npm test
```

**Inside the frontend Docker container** (e.g. after `docker compose -f compose.yaml up -d`):

```bash
docker compose -f compose.yaml exec frontend npm run test:ci
```

Success: the run ends with **Test Suites: 1 passed** and **Tests: 18 passed**. Coverage is printed and written to `frontend/coverage/` when using `test:ci`.

---

## Test doubles: implementation and technology choices

**How test doubles were implemented**

- The API layer (`noteService.ts`) uses the global **`fetch`** for HTTP. Tests replace `fetch` with a Jest mock so no real requests are made.
- **`src/testUtils/api.ts`** provides helpers:
  - **`mockJsonResponse(data, ok?, status?)`** and **`mockTextResponse(body, ok?, status?)`** – build Response-like objects (with `.ok`, `.json()`, `.text()`) for the mock to return.
  - **`installFetchMock(impl?)`** – sets `global.fetch` to a `jest.fn()`; each test can pass a custom implementation or override return values.
  - **`removeFetchMock()`** – clears the global mock in `afterEach`.
- Each test configures the mock (e.g. success with JSON, HTTP 404/500, or a rejected promise for network errors) and asserts that the service returns or throws as expected.

**Why these technologies were chosen**

- **Jest** – Already used by Create React App for tests; no extra test runner.
- **Stubbing global `fetch` with `jest.fn()`** – No additional libraries (e.g. MSW or fetch-mock) are required. The service is thin and only uses `fetch`, so replacing it is enough to test success and error paths in isolation.
- **Plain Response-like objects** – Keeps the setup simple and avoids bringing in a full `fetch` polyfill or mock server. Tests stay fast and deterministic and run entirely inside the frontend container without a real backend.

---

**Console output during tests:** You’ll see `console.log` and `console.error` in the output. That’s expected: the service logs when it runs, and many tests deliberately trigger error paths (HTTP errors, network failures) to assert the service handles them. As long as the summary shows **Test Suites: 1 passed** and **Tests: 18 passed**, everything is fine—no fixes needed.
