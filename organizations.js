import {
  OrganizationsClient,
  CreateAccountCommand,
} from "@aws-sdk/client-organizations";

async function createAccount(email, accountName, roleName, client = null) {
  try {
    if (client === null) {
      console.log("Creating new client");
      client = new OrganizationsClient({});
    } else {
      console.log("Using existing client");
    }
    const command = new CreateAccountCommand({
      Email: email,
      AccountName: accountName,
      RoleName: roleName,
    });
    console.log("Sending command", command);
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error in createAccount", error);
    throw error;
  }
}

export { createAccount };
