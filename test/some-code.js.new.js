const CAPTURES = {
  foo: 123,
  bucket: require("/home/runner/work/polycons/polycons/src/pocix-cdktf/bucket-client.ts")(process.env["__CAPTURE_SYM_bucket}"]),
};

module.exports['handler'] = function(originalEvent) {
    return require('/home/runner/work/polycons/polycons/test/some-code.js')['handler'](originalEvent, CAPTURES);
};