var fs = require('fs')
var assert = require('assert')

var rework = require('rework')
var inherit = require('../')

function read(file) {
  return fs.readFileSync('test/fixtures/' + file + '.css', 'utf8')
}

function test(file, msg) {
  var out = rework(read(file)).use(inherit()).toString().trim()
  var expected = read(file + '.out').trim()
  msg += ': \n expected:\n' + expected + '\n got:\n' + out
  assert.equal(out, expected, msg)
}

test('media.reverse', 'Inherit from revese media query failed')
test('attribute', 'Attribute selector failed')
test('clearfix', 'Clearfix failed')
test('clearfix.zoom', 'Clearfix with zoom failed')
test('combined', 'Combined inherits failed')
test('media', 'Inherit through media failed')
test('media.disjoint', 'Inherit disjoint media failed')
test('substring', 'Inherit substring failed')
test('multiple', 'Inherit multiple selectors failed')
test('tag', 'Inherit a tag failed')
test('chain', 'Chained inheritance failed')
test('unordered', 'Out of order inheritance failed')
test('sequence', 'Sequence inheritance (e.g. .one.two%three) failed')
test('complex-sequence', 'Complex sequence inheritance (e.g. .one.two%three) failed')
//test('pseudo', 'Pseudo inheritance failed')

{
  var ext = rework(read('extend')).use(inherit({
    propertyRegExp: /^extends?$/
  })).toString()

  assert.equal(ext, read('chain.out'), 'Extends regexp failed:\n' + ext)
}

console.log('Tests pass!')
