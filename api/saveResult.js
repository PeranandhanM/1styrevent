import fs from "fs";
import path from "path";

export default function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  const data = req.body;

  const filePath = path.join(process.cwd(), "results.csv");

  let csvLine =
    `"${data.name}","${data.roll}","${data.email}","${data.login}","${data.submit}","${data.marks}"\n`;

  try {

    // If file doesn't exist → add header
    if (!fs.existsSync(filePath)) {

      fs.writeFileSync(
        filePath,
        "Name,Roll,Email,Login,Submit,Marks\n"
      );

    }

    // Append student result
    fs.appendFileSync(filePath, csvLine);

    res.status(200).json({
      message: "Saved"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error saving result"
    });

  }

}
