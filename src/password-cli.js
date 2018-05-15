import password from "@rojo2/password";
import commander from "commander";

commander
  .option("-e, --separator [separator]", "Separator (by default ':')")
  .version("1.0.0")

commander
  .command("hash <password>")
  .description("Hashes a password")
  .option("-d, --digest [digest]", "Digest (by default 'sha512')")
  .option("-i, --iterations [iterations]", "Iterations (by default 100000)")
  .option("-l, --key-length [key-length]", "Key length (by default 4096)")
  .option("-s, --salt [salt]", "Salt")
  .action(function(secret, options) {
    const defaultOptions = {
      digest: "sha512",
      keyLength: 4096,
      iterations: 100000,
      separator: ":",
      salt: undefined
    };

    const opts = {
      ...defaultOptions,
      ...options
    };

    password.hash(secret, opts.salt, parseInt(opts.iterations, 10), parseInt(opts.keyLength, 10), opts.digest, opts.separator).then((hashedPassword) => {
      console.log(hashedPassword);
      process.exit(0);
    }).catch((err) => {
      console.error(`\x1B[0;31m${err}\x1B[0m`);
    });
  });

commander
  .command("verify <password> <hashedpassword>")
  .description("Verifies a hashed password")
  .action(function(secret, hashedPassword, options) {
    const defaultOptions = {
      separator: ":"
    };

    const opts = {
      ...defaultOptions,
      ...options
    };

    password.verify(secret, hashedPassword, opts.separator).then((verified) => {
      console.log(verified ? "Is \x1B[0;32mok\x1B[0m" : "Is \x1B[0:31mwrong\x1B[0m");
      process.exit(verified ? 0 : 1);
    }).catch((err) => {
      console.error(`\x1B[0;31m${err}\x1B[0m`);
    });
  });

commander
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  commander.outputHelp();
}
