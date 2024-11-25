/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";

// import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";

export async function POST(req: Request) {
  // TODO: add webhook secret
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(SIGNING_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);

    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, image_url, username, first_name, last_name, email_addresses } =
      evt.data;
    // TODO: create a server action
    const mongoUser = await createUser({
      clerkId: id,
      name: `${first_name} ${last_name ? `${last_name}` : ""}`,
      username: username!,
      email: email_addresses[0].email_address,
      picture: image_url,
    });
    return NextResponse.json({ message: "ok", user: mongoUser });
  }
  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;
    // TODO: create a server action
    const mongoUser = await updateUser({
      clerkId: id,
      updateData: {
        name: `${first_name} ${last_name ? `${last_name}` : ""}`,
        username: username ?? email_addresses[0].email_address.split("@")[0],
        email: email_addresses[0].email_address,
        picture: image_url,
      },
      path: `/profile/${id}`,
    });
    return NextResponse.json({ message: "ok", user: mongoUser });
  }
  if (eventType === "user.deleted") {
    // TODO : delete user
    const { id } = evt.data;
    if (!id) return NextResponse.json({ message: "not found" });
    const deletedUser = await deleteUser({ clerkId: id });
    return NextResponse.json({ message: "deleted", user: deletedUser });
  }

  return new Response("", { status: 200 });
}
