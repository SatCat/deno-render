const port = 10000;

// global counter
let hourlyCounter = 0;

setInterval(() => {
  hourlyCounter++;
}, 3_600_000);

const handler = (request: Request): Response => {
  let body = "Hello from Deno 2+!\n\n";
  // Show versions
  body += `Deno version: ${Deno.version.deno}\n`;
  body += `TypeScript version: ${Deno.version.typescript}\n`;
  body += `V8 engine version: ${Deno.version.v8}\n\n`;
  body += `Counter: ${hourlyCounter}\n\n`;
  
  body += "Your user-agent is:\n\n";
  body += request.headers.get("user-agent") || "Unknown";

  return new Response(body, { 
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" } 
  });
};

Deno.serve({ port, hostname: "0.0.0.0" }, handler);
