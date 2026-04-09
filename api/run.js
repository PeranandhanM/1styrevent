export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, input, language } = req.body;

  let language_id;

  if(language === "python") language_id = 71;
  else if(language === "c") language_id = 50;
  else if(language === "cpp") language_id = 54;
  else language_id = 71;

  try {
    const response = await fetch("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        source_code: code,
        language_id: language_id,
        stdin: input
      })
    });

    const data = await response.json();

    res.status(200).json({
      output: data.stdout || "",
      error: data.stderr || data.compile_output || ""
    });

  } catch (err) {
    res.status(500).json({ error: "Execution failed" });
  }
}
