const bcrypt = require("bcryptjs");

function readHidden(promptText) {
  return new Promise((resolve) => {
    process.stdout.write(promptText);
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let input = "";

    const onData = (char) => {
      const code = char.charCodeAt(0);
      if (code === 13 || code === 10) {
        // Enter
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener("data", onData);
        process.stdout.write("\n");
        resolve(input);
      } else if (code === 3) {
        // Ctrl+C
        process.exit(1);
      } else if (code === 8 || code === 127) {
        // Backspace
        input = input.slice(0, -1);
      } else {
        input += char;
      }
    };
    stdin.on("data", onData);
  });
}

(async () => {
  const email = await readHidden("Admin email: ");
  const password = await readHidden("Admin password: ");
  const hash = await bcrypt.hash(password, 10);
  console.log("\n--- Run this in the Supabase SQL editor ---\n");
  console.log(
    `insert into public.admin_credentials (email, password_hash) values ('${email.trim().toLowerCase()}', '${hash}');`
  );
})();
