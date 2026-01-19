import * as openpgp from "openpgp";
import { SERVER_PRIVATE_KEY, SERVER_PUBLIC_KEY } from "./config";

export async function signPayload(text: string): Promise<string> {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: SERVER_PRIVATE_KEY });
  const signed = await openpgp.sign({
    message: await openpgp.createMessage({ text }),
    signingKeys: privateKey,
    detached: true
  });
  return signed;
}

export async function verifySignature(text: string, signature: string): Promise<boolean> {
  const publicKey = await openpgp.readKey({ armoredKey: SERVER_PUBLIC_KEY });
  const sig = await openpgp.readSignature({ armoredSignature: signature });

  const verification = await openpgp.verify({
    message: await openpgp.createMessage({ text }),
    signature: sig,
    verificationKeys: publicKey
  });

  try {
    await verification.signatures[0].verified;
    return true;
  } catch {
    return false;
  }
}
