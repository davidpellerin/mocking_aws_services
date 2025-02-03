# mocking_aws_services

[![codecov](https://codecov.io/github/davidpellerin/mocking_aws_services/graph/badge.svg?token=LLE6U44YPO)](https://codecov.io/github/davidpellerin/mocking_aws_services)

This repository demonstrates how to use `aws-sdk-client-mock` to mock calls to AWS Services.

The `createAccount` method in `organizations.js` has an optional `client` parameter which takes in your mock client. If you leave it blank it will use the _real_ client. So for unit testing purposes we would call it like this:

```
const { createAccount } = await import("./organizations.js");

const results = await createAccount(
    "test@example.com",
    "My Account Name",
    "OrganizationAccountAccessRole",
    orgMockClient
);
```

## Usage

1. Clone the repo
2. Run `npm run test` or view the passing tests in GitHub Actions.
