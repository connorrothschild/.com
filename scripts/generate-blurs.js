import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Replicate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, "../public/images/mobile-screens");
// const outputDir = path.join(__dirname, '../public/images/placeholders/feed/mobile-screens');
const outputFile = path.join(__dirname, "../src/data/blur-data.json"); // Output JSON file

// // Create the output directory if it doesn't exist
// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir, { recursive: true });
// }

const blurData = {};

fs.readdir(inputDir, async (err, files) => {
  // Make the callback async
  if (err) {
    console.error("Error reading input directory:", err);
    return;
  }

  const processingPromises = files
    .filter((file) => path.extname(file).toLowerCase() === ".webp")
    .map(async (file) => {
      // Make the map callback async
      const inputFile = path.join(inputDir, file);
      // const outputFile = path.join(outputDir, file);
      const imageName = path.basename(file, ".webp"); // Get filename without extension

      try {
        const buffer = await sharp(inputFile)
          .resize(20) // Resize to a small width
          .blur(5) // Apply a blur effect
          .webp({ quality: 50 }) // Output as WebP
          .toBuffer(); // Get the image data as a buffer

        const base64 = buffer.toString("base64");
        const dataUrl = `data:image/webp;base64,${base64}`;
        blurData[imageName] = dataUrl; // Store data URL with image name as key
        console.log(`Generated base64 placeholder for ${file}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    });

  // Wait for all images to be processed
  await Promise.all(processingPromises);

  // Write the collected data URLs to the JSON file
  fs.writeFile(outputFile, JSON.stringify(blurData, null, 2), (err) => {
    if (err) {
      console.error("Error writing blur data JSON file:", err);
    } else {
      console.log(`Successfully wrote blur data to ${outputFile}`);
    }
  });
});
