export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, input } = req.body;

  try {
    const response = await fetch("https://judge0-ce.p.sulu.sh/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_code: code,
        language_id: 71,
        stdin: input
      })
    });

    const data = await response.json();

    res.status(200).json({
      output: data.stdout || data.stderr || "No output"
    });

  } catch (err) {
    res.status(500).json({ error: "Execution failed" });
  }
}
