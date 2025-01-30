import {
  OrganizationsClient,
  CreateAccountCommand,
} from "@aws-sdk/client-organizations";

async function createAccount(email, accountName, roleName, client = null) {
  try {
    if (client === null) {
      console.log("Client was null so creating a new Organizations client");
      client = new OrganizationsClient({ region: "us-east-1" });
    }
    const command = new CreateAccountCommand({
      Email: email,
      AccountName: accountName,
      RoleName: roleName,
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error in createAccount", error);
  }
}

export { createAccount };

createAccount("test@test.com", "test", "test");
