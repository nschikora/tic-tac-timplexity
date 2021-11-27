// GET requests to /filename would return "Hello, world!"
export const onRequestGet = () => {
  const res = { error: null, text: "Hello, world!" };
  return new Response(JSON.stringify(res), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// POST requests to /filename with a JSON-encoded body would return "Hello, <name>!"
export const onRequestPost = async ({ request }) => {
  const { name } = await request.json();
  return new Response(`Hello, ${name}!`);
};
