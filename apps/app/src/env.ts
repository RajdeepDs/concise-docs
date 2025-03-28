import { createEnv } from "@t3-oss/env-nextjs";
import { keys as auth } from "@v0/auth/keys";
import { keys as database } from "@v0/database/keys";

export const env = createEnv({
  extends: [database(), auth()],
  server: {},
  client: {},
  runtimeEnv: {},
});
