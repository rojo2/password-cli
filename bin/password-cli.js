#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var password = _interopDefault(require('@rojo2/password'));
var commander = _interopDefault(require('commander'));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

commander.option("-e, --separator [separator]", "Separator (by default ':')").version("1.0.0");

commander.command("hash <password>").description("Hashes a password").option("-d, --digest [digest]", "Digest (by default 'sha512')").option("-i, --iterations [iterations]", "Iterations (by default 100000)").option("-l, --key-length [key-length]", "Key length (by default 4096)").option("-s, --salt [salt]", "Salt").action(function (secret, options) {
  var defaultOptions = {
    digest: "sha512",
    keyLength: 4096,
    iterations: 100000,
    separator: ":",
    salt: undefined
  };

  var opts = _extends({}, defaultOptions, options);

  password.hash(secret, opts.salt, parseInt(opts.iterations, 10), parseInt(opts.keyLength, 10), opts.digest, opts.separator).then(function (hashedPassword) {
    console.log(hashedPassword);
    process.exit(0);
  }).catch(function (err) {
    console.error("\x1B[0;31m" + err + "\x1B[0m");
  });
});

commander.command("verify <password> <hashedpassword>").description("Verifies a hashed password").action(function (secret, hashedPassword, options) {
  var defaultOptions = {
    separator: ":"
  };

  var opts = _extends({}, defaultOptions, options);

  password.verify(secret, hashedPassword, opts.separator).then(function (verified) {
    console.log(verified ? "Is \x1B[0;32mok\x1B[0m" : "Is \x1B[0:31mwrong\x1B[0m");
    process.exit(verified ? 0 : 1);
  }).catch(function (err) {
    console.error("\x1B[0;31m" + err + "\x1B[0m");
  });
});

commander.parse(process.argv);

if (!process.argv.slice(2).length) {
  commander.outputHelp();
}
