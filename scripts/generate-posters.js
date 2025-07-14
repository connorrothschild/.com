import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const videoDir = "public/feed";
const placeholderDir = "public/placeholders/feed";
const videoExtensions = [".mp4", ".mov", ".webm"]; // Add other extensions if needed

async function generatePosters() {
  console.log("Starting WebP poster generation...");

  try {
    // Ensure placeholder directory exists
    await fs.mkdir(placeholderDir, { recursive: true });
    console.log(`Ensured directory exists: ${placeholderDir}`);

    // Read video directory
    const files = await fs.readdir(videoDir);
    console.log(`Found ${files.length} files/dirs in ${videoDir}`);

    const videoFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return videoExtensions.includes(ext);
    });

    console.log(`Found ${videoFiles.length} video files to process.`);

    if (videoFiles.length === 0) {
      console.log("No video files found. Exiting.");
      return;
    }

    // Process each video file
    for (const videoFile of videoFiles) {
      const videoPath = path.join(videoDir, videoFile);
      const baseName = path.basename(videoFile, path.extname(videoFile));
      const posterFileName = `${baseName}.webp`; // Save as WebP
      const posterPath = path.join(placeholderDir, posterFileName);

      // Check if poster already exists
      try {
        await fs.access(posterPath);
        console.log(`Poster already exists for ${videoFile}, skipping.`);
        continue; // Skip if poster exists
      } catch (error) {
        // Poster doesn't exist, proceed
      }

      console.log(`Generating WebP poster for ${videoFile}...`);

      // ffmpeg command to extract the first frame as WebP
      // -i: input file
      // -vframes 1: extract only one frame
      // -c:v libwebp: specify the WebP codec
      // -lossless 0: Use lossy compression (adjust quality with -q:v)
      // -q:v 75: Set WebP quality (0-100, higher is better quality/larger size)
      // -y: overwrite output file without asking
      const command = `ffmpeg -i "${videoPath}" -vframes 1 -c:v libwebp -lossless 0 -q:v 75 -y "${posterPath}"`;

      try {
        const { stdout, stderr } = await execAsync(command);
        if (
          stderr &&
          !stderr.includes("frame=") &&
          !stderr.includes("Output #0")
        ) {
          // Log stderr only if it seems like a real error, ffmpeg often prints info to stderr
          console.error(`ffmpeg stderr for ${videoFile}: ${stderr}`);
        }
        console.log(`Successfully generated poster: ${posterFileName}`);
      } catch (error) {
        console.error(`Error generating poster for ${videoFile}:`, error);
      }
    }

    console.log("WebP poster generation complete.");
  } catch (error) {
    console.error("An error occurred during poster generation:", error);
    process.exit(1); // Exit with error code
  }
}

generatePosters();
