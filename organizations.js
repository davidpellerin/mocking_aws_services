import {
  OrganizationsClient,
  CreateAccountCommand,
} from "@aws-sdk/client-organizations";

async function createAccount(email, accountName, roleName, client = null) {
  try {
    if (client === null) {
      client = new OrganizationsClient({});
    } else {
    }
    const command = new CreateAccountCommand({
      Email: email,
      AccountName: accountName,
      RoleName: roleName,
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    throw error;
  }
}

export { createAccount };
