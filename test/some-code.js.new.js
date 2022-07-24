const CAPTURES = {
  foo: 123,
  bucket: require("/Users/chrisr/dev/polycons/src/pocix-cdktf/bucket-client.ts")(process.env["__CAPTURE_SYM_bucket}"]),
};

module.exports['handler'] = function(originalEvent) {
    return require('/Users/chrisr/dev/polycons/test/some-code.js')['handler'](originalEvent, CAPTURES);
};