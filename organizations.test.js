import { describe, test, expect, beforeEach } from "@jest/globals";
import { mockClient } from "aws-sdk-client-mock";
import {
  OrganizationsClient,
  CreateAccountCommand,
} from "@aws-sdk/client-organizations";

const orgClient = mockClient(OrganizationsClient);

describe("createAccount", () => {
  let createAccount;

  beforeEach(async () => {
    const module = await import("./organizations.js");
    createAccount = module.createAccount;
  });

  test("should create an account", async () => {
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

    orgClient.on(CreateAccountCommand).resolves(mockResponse);

    const results = await createAccount(
      "test@test.com",
      "My Account Name",
      "OrganizationAccountAccessRole",
      orgClient
    );

    expect(results).toEqual({
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
    });
  });

  test("should handle AWS errors", async () => {
    orgClient.on(CreateAccountCommand).rejects(new Error("AWS Error"));
    await expect(createAccount("", "", "", orgClient)).rejects.toThrow(
      "AWS Error"
    );
  });
});
