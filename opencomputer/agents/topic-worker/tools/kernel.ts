import { bearer, defineConnection, defineMcpServer, useSecret } from "@opencomputer/agent";

// A real Chrome for pages the worker's curl habit cannot handle: JS-rendered
// sites, logins, anything behind bot detection. Kernel's MCP server is
// stateless HTTP with bearer auth, so no session handling is needed here;
// the Accept header is required or Kernel returns 406.
const auth = defineConnection({
  id: "kernel-mcp-auth",
  origin: "https://mcp.onkernel.com",
  headers: {
    Authorization: bearer(useSecret("KERNEL_API_KEY")),
    Accept: "application/json, text/event-stream",
  },
});

export const kernel = defineMcpServer({ id: "kernel", url: "https://mcp.onkernel.com/mcp", connection: auth });
