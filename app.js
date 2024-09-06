import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

// Configure headers for HTML responses
const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

// Store the visit count
const data = {
  count: 0,
};

// Handle incoming requests
const handleRequest = async (request) => {
  const url = new URL(request.url);

  // Handle /visits path
  if (url.pathname === "/visits") {
    data.count++;
    return new Response(await renderFile("visits.eta", data), responseDetails);
  }

  // Handle /meaning path
  if (url.pathname === "/meaning") {
    return new Response("Seeking truths beyond meaning of life, you will find 43.", {
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
    });
  }

  // Handle all other paths
  return new Response("Nothing here yet.", {
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
  });
};

// Start the server on port 7777
serve(handleRequest, { port: 7777 });
