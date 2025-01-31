import { describe, expect } from "@jest/globals";
import { mockClient } from "aws-sdk-client-mock";
import {
  OrganizationsClient,
  CreateAccountCommand,
} from "@aws-sdk/client-organizations";

const client = mockClient(OrganizationsClient);

describe("createAccount", () => {
  beforeEach(() => {
    client.reset();
  });

  it("should create an account", async () => {
    const mockResponse = {
      $metadata: {
        httpStatusCode: 200,
        requestId: "test-request-id",
      },
      CreateAccountStatus: {
        Id: "car-test-status-id",
        AccountName: "TestAccount",
        State: "IN_PROGRESS",
        RequestedTimestamp: "2025-01-30T19:36:45.395Z",
      },
    };
    client.on(CreateAccountCommand).resolves(mockResponse);
    const { createAccount } = await import("./organizations.js");
    const results = await createAccount(
      "test@test.com",
      "My Account Name",
      "OrganizationAccountAccessRole",
      client
    );
    expect(results).toBe(mockResponse);
  });
});
