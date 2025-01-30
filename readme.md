# mocking_aws_services

This repository demonstrates how to use `aws-sdk-client-mock` and `aws-sdk-client-mock-jest` to mock calls to AWS Services.

The `createAccount` method in `organizations.js` has a `client` parameter which takes in your mock client. So we use it like this:

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