// Run: node scripts/set-password.mjs
// Updates PORTFOLIO_PASSWORD_HASH in .env.local with a fresh scrypt hash.
import { scryptSync, randomBytes } from "crypto";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("Nouveau mot de passe : ", (password) => {
  rl.close();

  if (!password.trim()) {
    console.error("Erreur : le mot de passe ne peut pas être vide.");
    process.exit(1);
  }

  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  const value = `${salt}:${hash}`;

  const envPath = resolve(process.cwd(), ".env.local");
  let content = existsSync(envPath) ? readFileSync(envPath, "utf-8") : "";

  if (/^PORTFOLIO_PASSWORD_HASH=.*/m.test(content)) {
    content = content.replace(/^PORTFOLIO_PASSWORD_HASH=.*/m, `PORTFOLIO_PASSWORD_HASH=${value}`);
  } else {
    content = content.trimEnd() + `\nPORTFOLIO_PASSWORD_HASH=${value}\n`;
  }

  writeFileSync(envPath, content, "utf-8");
  console.log("✓ Mot de passe mis à jour dans .env.local");
});
