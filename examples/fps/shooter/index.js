(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("vlilXU"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\..\\node_modules\\browserify\\node_modules\\base64-js\\lib\\b64.js","/..\\..\\..\\node_modules\\browserify\\node_modules\\base64-js\\lib")
},{"buffer":2,"vlilXU":3}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("vlilXU"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\..\\node_modules\\browserify\\node_modules\\buffer\\index.js","/..\\..\\..\\node_modules\\browserify\\node_modules\\buffer")
},{"base64-js":1,"buffer":2,"ieee754":4,"vlilXU":3}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("vlilXU"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\..\\node_modules\\browserify\\node_modules\\process\\browser.js","/..\\..\\..\\node_modules\\browserify\\node_modules\\process")
},{"buffer":2,"vlilXU":3}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require("vlilXU"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\..\\node_modules\\ieee754\\index.js","/..\\..\\..\\node_modules\\ieee754")
},{"buffer":2,"vlilXU":3}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
const defaultTerrainMap = new Image();
defaultTerrainMap.src = 'data:image/png;base64,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';

module.exports = defaultTerrainMap;

}).call(this,require("vlilXU"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\..\\assets\\terrain\\default_terrain.js","/..\\..\\assets\\terrain")
},{"buffer":2,"vlilXU":3}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var _default_terrain = require('../../assets/terrain/default_terrain');

var _default_terrain2 = _interopRequireDefault(_default_terrain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GAME = new WHS.World({
  stats: 'fps', // fps, ms, mb
  autoresize: true,

  gravity: {
    x: 0,
    y: -100,
    z: 0
  },

  camera: {
    far: 10000
  },

  shadowmap: {
    type: THREE.PCFShadowMap
  },

  rWidth: 1,
  rHeight: 1,

  background: 0x70DBFF
});

new WHS.Terrain({
  geometry: {
    map: _default_terrain2.default,
    depth: 100,
    width: 256,
    height: 256
  },

  material: {
    color: 0xff0000,
    side: THREE.DoubleSide,
    kind: 'basic'
  },

  pos: {
    x: 0,
    y: 0,
    z: 0
  }
}).addTo(GAME);

// NOTE: Default light.
new WHS.AmbientLight({
  light: {
    color: 0xffffff,
    intensity: 0.2
  },

  pos: {
    x: 160, // 100,
    y: 120, // 30,
    z: 160 // 100
  },

  target: {
    x: 0,
    y: 10,
    z: 0
  }
}).addTo(GAME);

// NOTE: Default light.
new WHS.SpotLight({
  light: {
    color: 0xffffff, // 0x00ff00,
    intensity: 0.3,
    distance: 500
  },

  shadowmap: {
    width: 2048,
    height: 2048,
    top: 0,
    fov: 90
  },

  pos: {
    x: 160, // 100,
    y: 120, // 30,
    z: 160 // 100
  },

  target: {
    x: 0,
    y: 10,
    z: 0
  }
}).addTo(GAME);

var parrot = new WHS.Morph({

  geometry: {
    width: 2,
    height: 2,
    depth: 2,
    path: 'assets/models/morph/parrot.js'
  },

  material: {
    useVertexColors: true,
    kind: 'lambert'
  },

  pos: {
    x: 70,
    y: 72,
    z: 70
  },

  scale: {
    x: 0.1,
    y: 0.1,
    z: 0.1
  },

  morph: {
    duration: 0.4,
    speed: 200
  }

});

var parrotPath = [new THREE.CubicBezierCurve3(new THREE.Vector3(-100, 100, 50), new THREE.Vector3(-200, 120, -50), new THREE.Vector3(200, 120, -50), new THREE.Vector3(100, 100, 50)), new THREE.CubicBezierCurve3(new THREE.Vector3(100, 100, 50), new THREE.Vector3(-200, 80, 150), new THREE.Vector3(200, 60, 150), new THREE.Vector3(-100, 100, 50))];

var parrotgoes = new THREE.CurvePath();

parrotgoes.add(parrotPath[0]);
parrotgoes.add(parrotPath[1]);

var flamingo = new WHS.Morph({
  geometry: {
    width: 2,
    height: 2,
    depth: 2,
    path: 'assets/models/morph/flamingo.js'
  },

  material: {
    useVertexColors: true,
    kind: 'lambert'
  },

  pos: {
    x: 70,
    y: 72,
    z: 70
  },

  scale: {
    x: 0.1,
    y: 0.1,
    z: 0.1
  },

  morph: {
    duration: 2,
    speed: 50
  }
});

var flamingoPath = [new THREE.CubicBezierCurve3(new THREE.Vector3(-100, 100, 50), new THREE.Vector3(-100, 160, 300), new THREE.Vector3(200, 180, 30), new THREE.Vector3(100, 140, 80)), new THREE.CubicBezierCurve3(new THREE.Vector3(100, 140, 80), new THREE.Vector3(200, 80, 150), new THREE.Vector3(-200, 60, -100), new THREE.Vector3(200, 100, 350)), new THREE.CubicBezierCurve3(new THREE.Vector3(200, 100, 350), new THREE.Vector3(200, 80, 150), new THREE.Vector3(-200, 60, -100), new THREE.Vector3(-100, 100, 50))];

var flamingogoes = new THREE.CurvePath();

flamingogoes.add(flamingoPath[0]);
flamingogoes.add(flamingoPath[1]);
flamingogoes.add(flamingoPath[2]);

flamingo.addTo(GAME, 'wait').then(function (obj) {
  obj.follow(parrotgoes, // flamingogoes
  26000, true);
});

parrot.addTo(GAME, 'wait').then(function (obj) {
  obj.follow(flamingogoes, 20000, true);
});

new WHS.Skybox({
  path: 'assets/textures/skybox/skymap',
  imgSuffix: '.png',
  skyType: 'sphere',
  radius: GAME.getCamera().__params.camera.far,
  rot: { y: Math.PI / 180 * -90 },
  pos: { y: -200 }
}).addTo(GAME);

var box = new WHS.Box({

  geometry: {
    width: 2,
    height: 2,
    depth: 2
  },

  mass: 1,
  onlyvis: false,

  material: {
    kind: 'lambert',
    map: WHS.API.texture('assets/textures/box.jpg')
  },

  pos: {
    x: 50,
    y: 70,
    z: 60
  }

});

GAME.add(box).then(function () {
  var checker1 = new WHS.Loop(function () {
    if (box.nposition.y < -200) {
      box.position.set(50, 70, 60);

      box.setAngularVelocity(new THREE.Vector3(0, 0, 0));
      box.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    }
  });

  checker1.start();
});

new WHS.Box({
  geometry: {
    width: 2,
    height: 2,
    depth: 2
  },

  mass: 1,

  material: {
    kind: 'lambert',
    map: WHS.API.texture('assets/textures/box.jpg')
  },

  pos: {
    x: 30,
    y: 50,
    z: 0
  }
}).addTo(GAME);

var person = new WHS.Sphere({
  geometry: {
    radius: 2
  },

  mass: 10,

  material: {
    color: 0xffffff,
    kind: 'lambert',
    rest: 0,
    fri: 1
  },

  pos: {
    x: 0,
    y: 100,
    z: 0
  }
});

GAME.add(person).then(function () {
  var checker2 = new WHS.Loop(function () {
    if (person.nposition.y < -200) {
      person.position.set(0, 100, 0);

      person.setAngularVelocity(new THREE.Vector3(0, 0, 0));
      person.setLinearVelocity(new THREE.Vector3(0, 0, 0));
    }
  });

  checker2.start();
});

// EFFECTS.
var effects = new WHS.Wagner(GAME);

// effects.add( "ZoomBlurPass", {} );
effects.add('VignettePass', {});

// var directionalblurEffect = GAME.addWagner( "motionBlurPass", {} ).apply();

GAME.setControls(WHS.firstPersonControls(person, { // *WHS* object, Pointer lock controls object, Jquery blocker div selector.
  block: document.getElementById('blocker'),
  speed: 5 // 5
}));

/* var grasscoords = [];

for (var x = 0; x < 20; x++) {
  for (var y = 0; y < 15; y++) {
  grasscoords.push({
    x: x,
    y: y
  });

  }
}*/
/*
var curve = new WHS.Curve(
{
  geometry: {
    curve: new THREE.CubicBezierCurve3(
      new THREE.Vector3( -100, 100, 50 ),
      new THREE.Vector3( -100, 160, 300 ),
      new THREE.Vector3( 200, 180, 30 ),
      new THREE.Vector3( 100, 140, 80 )
    )
  },

  material: {
    kind: "linebasic",
    color: 0xff0000
  }
});

var curve2 = new WHS.Curve(
{
  geometry: {
    curve: new THREE.CubicBezierCurve3(
      new THREE.Vector3( 100, 140, 80 ),
      new THREE.Vector3( 200, 80, 150 ),
      new THREE.Vector3( -200, 60, -100 ),
      new THREE.Vector3( 200, 100, 350 )
    )
  },

  material: {
    kind: "linebasic",
    color: 0x00ff00
  }
});

var curve3 = new WHS.Curve(
{
  geometry: {
    curve: new THREE.CubicBezierCurve3(
      new THREE.Vector3( 200, 100, 350 ),
      new THREE.Vector3( 200, 80, 150 ),
      new THREE.Vector3( -200, 60, -100 ),
      new THREE.Vector3( -100, 100, 50 )
    )
  },

  material: {
    kind: "linebasic",
    color: 0x0000ff
  }
});

curve.addTo( GAME );
curve2.addTo( GAME );
curve3.addTo( GAME );
*/
GAME.start();
}).call(this,require("vlilXU"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_1aa6bc5.js","/")
},{"../../assets/terrain/default_terrain":5,"buffer":2,"vlilXU":3}]},{},[6])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcVXNlclxcRG9jdW1lbnRzXFxHaXRIdWJcXHdoaXRlc3Rvcm0uanNcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6L1VzZXJzL1VzZXIvRG9jdW1lbnRzL0dpdEh1Yi93aGl0ZXN0b3JtLmpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIkM6L1VzZXJzL1VzZXIvRG9jdW1lbnRzL0dpdEh1Yi93aGl0ZXN0b3JtLmpzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJDOi9Vc2Vycy9Vc2VyL0RvY3VtZW50cy9HaXRIdWIvd2hpdGVzdG9ybS5qcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiQzovVXNlcnMvVXNlci9Eb2N1bWVudHMvR2l0SHViL3doaXRlc3Rvcm0uanMvbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJjOi9Vc2Vycy9Vc2VyL0RvY3VtZW50cy9HaXRIdWIvd2hpdGVzdG9ybS5qcy9leGFtcGxlc19zcmMvYXNzZXRzL3RlcnJhaW4vZGVmYXVsdF90ZXJyYWluLmpzIiwiYzovVXNlcnMvVXNlci9Eb2N1bWVudHMvR2l0SHViL3doaXRlc3Rvcm0uanMvZXhhbXBsZXNfc3JjL2Zwcy9zaG9vdGVyL2Zha2VfMWFhNmJjNS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbnZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG4gIHZhciBBcnIgPSAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKVxuICAgID8gVWludDhBcnJheVxuICAgIDogQXJyYXlcblxuXHR2YXIgUExVUyAgID0gJysnLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIICA9ICcvJy5jaGFyQ29kZUF0KDApXG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKVxuXHR2YXIgTE9XRVIgID0gJ2EnLmNoYXJDb2RlQXQoMClcblx0dmFyIFVQUEVSICA9ICdBJy5jaGFyQ29kZUF0KDApXG5cdHZhciBQTFVTX1VSTF9TQUZFID0gJy0nLmNoYXJDb2RlQXQoMClcblx0dmFyIFNMQVNIX1VSTF9TQUZFID0gJ18nLmNoYXJDb2RlQXQoMClcblxuXHRmdW5jdGlvbiBkZWNvZGUgKGVsdCkge1xuXHRcdHZhciBjb2RlID0gZWx0LmNoYXJDb2RlQXQoMClcblx0XHRpZiAoY29kZSA9PT0gUExVUyB8fFxuXHRcdCAgICBjb2RlID09PSBQTFVTX1VSTF9TQUZFKVxuXHRcdFx0cmV0dXJuIDYyIC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSCB8fFxuXHRcdCAgICBjb2RlID09PSBTTEFTSF9VUkxfU0FGRSlcblx0XHRcdHJldHVybiA2MyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUilcblx0XHRcdHJldHVybiAtMSAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMClcblx0XHRcdHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNlxuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gVVBQRVJcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIExPV0VSICsgMjZcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5IChiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jylcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGhcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDBcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoXG5cblx0XHR2YXIgTCA9IDBcblxuXHRcdGZ1bmN0aW9uIHB1c2ggKHYpIHtcblx0XHRcdGFycltMKytdID0gdlxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTgpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNikgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTApIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyKVxuXHRcdFx0cHVzaCgodG1wID4+IDgpICYgMHhGRilcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyXG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0ICh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdFx0ZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdFx0dGVtcCwgbGVuZ3RoXG5cblx0XHRmdW5jdGlvbiBlbmNvZGUgKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRilcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSdcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArICh1aW50OFt1aW50OC5sZW5ndGggLSAxXSlcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wID4+IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCAyKSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPSdcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cdH1cblxuXHRleHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXlcblx0ZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NFxufSh0eXBlb2YgZXhwb3J0cyA9PT0gJ3VuZGVmaW5lZCcgPyAodGhpcy5iYXNlNjRqcyA9IHt9KSA6IGV4cG9ydHMpKVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcInZsaWxYVVwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxicm93c2VyaWZ5XFxcXG5vZGVfbW9kdWxlc1xcXFxiYXNlNjQtanNcXFxcbGliXFxcXGI2NC5qc1wiLFwiLy4uXFxcXC4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxicm93c2VyaWZ5XFxcXG5vZGVfbW9kdWxlc1xcXFxiYXNlNjQtanNcXFxcbGliXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuQnVmZmVyLnBvb2xTaXplID0gODE5MlxuXG4vKipcbiAqIElmIGBCdWZmZXIuX3VzZVR5cGVkQXJyYXlzYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKGNvbXBhdGlibGUgZG93biB0byBJRTYpXG4gKi9cbkJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgPSAoZnVuY3Rpb24gKCkge1xuICAvLyBEZXRlY3QgaWYgYnJvd3NlciBzdXBwb3J0cyBUeXBlZCBBcnJheXMuIFN1cHBvcnRlZCBicm93c2VycyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLFxuICAvLyBDaHJvbWUgNyssIFNhZmFyaSA1LjErLCBPcGVyYSAxMS42KywgaU9TIDQuMisuIElmIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nXG4gIC8vIHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcywgdGhlbiB0aGF0J3MgdGhlIHNhbWUgYXMgbm8gYFVpbnQ4QXJyYXlgIHN1cHBvcnRcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gYWRkIGFsbCB0aGUgbm9kZSBCdWZmZXIgQVBJIG1ldGhvZHMuIFRoaXMgaXMgYW4gaXNzdWVcbiAgLy8gaW4gRmlyZWZveCA0LTI5LiBOb3cgZml4ZWQ6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOFxuICB0cnkge1xuICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMClcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICAgIGFyci5mb28gPSBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9XG4gICAgcmV0dXJuIDQyID09PSBhcnIuZm9vKCkgJiZcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAvLyBDaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59KSgpXG5cbi8qKlxuICogQ2xhc3M6IEJ1ZmZlclxuICogPT09PT09PT09PT09PVxuICpcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgYXJlIGF1Z21lbnRlZFxuICogd2l0aCBmdW5jdGlvbiBwcm9wZXJ0aWVzIGZvciBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgQVBJIGZ1bmN0aW9ucy4gV2UgdXNlXG4gKiBgVWludDhBcnJheWAgc28gdGhhdCBzcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdCByZXR1cm5zXG4gKiBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBCeSBhdWdtZW50aW5nIHRoZSBpbnN0YW5jZXMsIHdlIGNhbiBhdm9pZCBtb2RpZnlpbmcgdGhlIGBVaW50OEFycmF5YFxuICogcHJvdG90eXBlLlxuICovXG5mdW5jdGlvbiBCdWZmZXIgKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpXG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybylcblxuICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0XG5cbiAgLy8gV29ya2Fyb3VuZDogbm9kZSdzIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgc3RyaW5nc1xuICAvLyB3aGlsZSBiYXNlNjQtanMgZG9lcyBub3QuXG4gIGlmIChlbmNvZGluZyA9PT0gJ2Jhc2U2NCcgJiYgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBzdWJqZWN0ID0gc3RyaW5ndHJpbShzdWJqZWN0KVxuICAgIHdoaWxlIChzdWJqZWN0Lmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICAgIHN1YmplY3QgPSBzdWJqZWN0ICsgJz0nXG4gICAgfVxuICB9XG5cbiAgLy8gRmluZCB0aGUgbGVuZ3RoXG4gIHZhciBsZW5ndGhcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKVxuICAgIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0KVxuICBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJylcbiAgICBsZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChzdWJqZWN0LCBlbmNvZGluZylcbiAgZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpXG4gICAgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QubGVuZ3RoKSAvLyBhc3N1bWUgdGhhdCBvYmplY3QgaXMgYXJyYXktbGlrZVxuICBlbHNlXG4gICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLicpXG5cbiAgdmFyIGJ1ZlxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIC8vIFByZWZlcnJlZDogUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICBidWYgPSBCdWZmZXIuX2F1Z21lbnQobmV3IFVpbnQ4QXJyYXkobGVuZ3RoKSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIFRISVMgaW5zdGFuY2Ugb2YgQnVmZmVyIChjcmVhdGVkIGJ5IGBuZXdgKVxuICAgIGJ1ZiA9IHRoaXNcbiAgICBidWYubGVuZ3RoID0gbGVuZ3RoXG4gICAgYnVmLl9pc0J1ZmZlciA9IHRydWVcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmIHR5cGVvZiBzdWJqZWN0LmJ5dGVMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgLy8gU3BlZWQgb3B0aW1pemF0aW9uIC0tIHVzZSBzZXQgaWYgd2UncmUgY29weWluZyBmcm9tIGEgdHlwZWQgYXJyYXlcbiAgICBidWYuX3NldChzdWJqZWN0KVxuICB9IGVsc2UgaWYgKGlzQXJyYXlpc2goc3ViamVjdCkpIHtcbiAgICAvLyBUcmVhdCBhcnJheS1pc2ggb2JqZWN0cyBhcyBhIGJ5dGUgYXJyYXlcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkpXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3QucmVhZFVJbnQ4KGkpXG4gICAgICBlbHNlXG4gICAgICAgIGJ1ZltpXSA9IHN1YmplY3RbaV1cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBidWYud3JpdGUoc3ViamVjdCwgMCwgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgIW5vWmVybykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnVmW2ldID0gMFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuLy8gU1RBVElDIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICdyYXcnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiAoYikge1xuICByZXR1cm4gISEoYiAhPT0gbnVsbCAmJiBiICE9PSB1bmRlZmluZWQgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gKHN0ciwgZW5jb2RpbmcpIHtcbiAgdmFyIHJldFxuICBzdHIgPSBzdHIgKyAnJ1xuICBzd2l0Y2ggKGVuY29kaW5nIHx8ICd1dGY4Jykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoIC8gMlxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSB1dGY4VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdyYXcnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gYmFzZTY0VG9CeXRlcyhzdHIpLmxlbmd0aFxuICAgICAgYnJlYWtcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAqIDJcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gKGxpc3QsIHRvdGFsTGVuZ3RoKSB7XG4gIGFzc2VydChpc0FycmF5KGxpc3QpLCAnVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG4nICtcbiAgICAgICdsaXN0IHNob3VsZCBiZSBhbiBBcnJheS4nKVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKDApXG4gIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbGlzdFswXVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB0b3RhbExlbmd0aCAhPT0gJ251bWJlcicpIHtcbiAgICB0b3RhbExlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxMZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcih0b3RhbExlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICBpdGVtLmNvcHkoYnVmLCBwb3MpXG4gICAgcG9zICs9IGl0ZW0ubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG4vLyBCVUZGRVIgSU5TVEFOQ0UgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gX2hleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgYXNzZXJ0KHN0ckxlbiAlIDIgPT09IDAsICdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBhc3NlcnQoIWlzTmFOKGJ5dGUpLCAnSW52YWxpZCBoZXggc3RyaW5nJylcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlXG4gIH1cbiAgQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBpICogMlxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBfdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX2FzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuZnVuY3Rpb24gX2JpbmFyeVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIF9hc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID1cbiAgICBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG4gIHJldHVybiBjaGFyc1dyaXR0ZW5cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBTdXBwb3J0IGJvdGggKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKVxuICAvLyBhbmQgdGhlIGxlZ2FjeSAoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpXG4gIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgaWYgKCFpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2UgeyAgLy8gbGVnYWN5XG4gICAgdmFyIHN3YXAgPSBlbmNvZGluZ1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgb2Zmc2V0ID0gbGVuZ3RoXG4gICAgbGVuZ3RoID0gc3dhcFxuICB9XG5cbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgc2VsZiA9IHRoaXNcblxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKClcbiAgc3RhcnQgPSBOdW1iZXIoc3RhcnQpIHx8IDBcbiAgZW5kID0gKGVuZCAhPT0gdW5kZWZpbmVkKVxuICAgID8gTnVtYmVyKGVuZClcbiAgICA6IGVuZCA9IHNlbGYubGVuZ3RoXG5cbiAgLy8gRmFzdHBhdGggZW1wdHkgc3RyaW5nc1xuICBpZiAoZW5kID09PSBzdGFydClcbiAgICByZXR1cm4gJydcblxuICB2YXIgcmV0XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0X3N0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzXG5cbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKCF0YXJnZXRfc3RhcnQpIHRhcmdldF9zdGFydCA9IDBcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCBzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdzb3VyY2VFbmQgPCBzb3VyY2VTdGFydCcpXG4gIGFzc2VydCh0YXJnZXRfc3RhcnQgPj0gMCAmJiB0YXJnZXRfc3RhcnQgPCB0YXJnZXQubGVuZ3RoLFxuICAgICAgJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSBzb3VyY2UubGVuZ3RoLCAnc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aClcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCA8IGVuZCAtIHN0YXJ0KVxuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgKyBzdGFydFxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuXG4gIGlmIChsZW4gPCAxMDAgfHwgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRfc3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0Ll9zZXQodGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLCB0YXJnZXRfc3RhcnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBfdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJlcyA9ICcnXG4gIHZhciB0bXAgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBpZiAoYnVmW2ldIDw9IDB4N0YpIHtcbiAgICAgIHJlcyArPSBkZWNvZGVVdGY4Q2hhcih0bXApICsgU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gICAgICB0bXAgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0bXAgKz0gJyUnICsgYnVmW2ldLnRvU3RyaW5nKDE2KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXMgKyBkZWNvZGVVdGY4Q2hhcih0bXApXG59XG5cbmZ1bmN0aW9uIF9hc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKylcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIF9hc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZClcbn1cblxuZnVuY3Rpb24gX2hleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSsxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSBjbGFtcChzdGFydCwgbGVuLCAwKVxuICBlbmQgPSBjbGFtcChlbmQsIGxlbiwgbGVuKVxuXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5fYXVnbWVudCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpKVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgdmFyIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyBpKyspIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgICByZXR1cm4gbmV3QnVmXG4gIH1cbn1cblxuLy8gYGdldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMucmVhZFVJbnQ4KG9mZnNldClcbn1cblxuLy8gYHNldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHYsIG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMud3JpdGVVSW50OCh2LCBvZmZzZXQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkVUludDE2IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbFxuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgdmFsID0gYnVmW29mZnNldF1cbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgOFxuICB9IGVsc2Uge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV1cbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQzMiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDJdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgICB2YWwgfD0gYnVmW29mZnNldF1cbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0ICsgM10gPDwgMjQgPj4+IDApXG4gIH0gZWxzZSB7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgPSBidWZbb2Zmc2V0ICsgMV0gPDwgMTZcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMl0gPDwgOFxuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAzXVxuICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0XSA8PCAyNCA+Pj4gMClcbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsXG4gICAgICAgICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICB2YXIgbmVnID0gdGhpc1tvZmZzZXRdICYgMHg4MFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuZnVuY3Rpb24gX3JlYWRJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKVxuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmYgLSB2YWwgKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMDAwMDBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmZmZmZmZmYgLSB2YWwgKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRmxvYXQgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWREb3VibGUgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuXG5cbiAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbn1cblxuZnVuY3Rpb24gX3dyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZilcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCAyKTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9XG4gICAgICAgICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAgICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZmZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgNCk7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2YsIC0weDgwKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICB0aGlzLndyaXRlVUludDgodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICB0aGlzLndyaXRlVUludDgoMHhmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmLCAtMHg4MDAwKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgX3dyaXRlVUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbiAgZWxzZVxuICAgIF93cml0ZVVJbnQxNihidWYsIDB4ZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MzIoYnVmLCAweGZmZmZmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCxcbiAgICAgICAgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBmaWxsKHZhbHVlLCBzdGFydD0wLCBlbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXZhbHVlKSB2YWx1ZSA9IDBcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kKSBlbmQgPSB0aGlzLmxlbmd0aFxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5jaGFyQ29kZUF0KDApXG4gIH1cblxuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpLCAndmFsdWUgaXMgbm90IGEgbnVtYmVyJylcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ2VuZCA8IHN0YXJ0JylcblxuICAvLyBGaWxsIDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgdGhpcy5sZW5ndGgsICdzdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSB0aGlzLmxlbmd0aCwgJ2VuZCBvdXQgb2YgYm91bmRzJylcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHRoaXNbaV0gPSB2YWx1ZVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG91dCA9IFtdXG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgb3V0W2ldID0gdG9IZXgodGhpc1tpXSlcbiAgICBpZiAoaSA9PT0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUykge1xuICAgICAgb3V0W2kgKyAxXSA9ICcuLi4nXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIG91dC5qb2luKCcgJykgKyAnPidcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGBBcnJheUJ1ZmZlcmAgd2l0aCB0aGUgKmNvcGllZCogbWVtb3J5IG9mIHRoZSBidWZmZXIgaW5zdGFuY2UuXG4gKiBBZGRlZCBpbiBOb2RlIDAuMTIuIE9ubHkgYXZhaWxhYmxlIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBBcnJheUJ1ZmZlci5cbiAqL1xuQnVmZmVyLnByb3RvdHlwZS50b0FycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAgIHJldHVybiAobmV3IEJ1ZmZlcih0aGlzKSkuYnVmZmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aClcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBidWYubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpXG4gICAgICAgIGJ1ZltpXSA9IHRoaXNbaV1cbiAgICAgIHJldHVybiBidWYuYnVmZmVyXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKVxuICB9XG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxudmFyIEJQID0gQnVmZmVyLnByb3RvdHlwZVxuXG4vKipcbiAqIEF1Z21lbnQgYSBVaW50OEFycmF5ICppbnN0YW5jZSogKG5vdCB0aGUgVWludDhBcnJheSBjbGFzcyEpIHdpdGggQnVmZmVyIG1ldGhvZHNcbiAqL1xuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX2lzQnVmZmVyID0gdHJ1ZVxuXG4gIC8vIHNhdmUgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIFVpbnQ4QXJyYXkgZ2V0L3NldCBtZXRob2RzIGJlZm9yZSBvdmVyd3JpdGluZ1xuICBhcnIuX2dldCA9IGFyci5nZXRcbiAgYXJyLl9zZXQgPSBhcnIuc2V0XG5cbiAgLy8gZGVwcmVjYXRlZCwgd2lsbCBiZSByZW1vdmVkIGluIG5vZGUgMC4xMytcbiAgYXJyLmdldCA9IEJQLmdldFxuICBhcnIuc2V0ID0gQlAuc2V0XG5cbiAgYXJyLndyaXRlID0gQlAud3JpdGVcbiAgYXJyLnRvU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvTG9jYWxlU3RyaW5nID0gQlAudG9TdHJpbmdcbiAgYXJyLnRvSlNPTiA9IEJQLnRvSlNPTlxuICBhcnIuY29weSA9IEJQLmNvcHlcbiAgYXJyLnNsaWNlID0gQlAuc2xpY2VcbiAgYXJyLnJlYWRVSW50OCA9IEJQLnJlYWRVSW50OFxuICBhcnIucmVhZFVJbnQxNkxFID0gQlAucmVhZFVJbnQxNkxFXG4gIGFyci5yZWFkVUludDE2QkUgPSBCUC5yZWFkVUludDE2QkVcbiAgYXJyLnJlYWRVSW50MzJMRSA9IEJQLnJlYWRVSW50MzJMRVxuICBhcnIucmVhZFVJbnQzMkJFID0gQlAucmVhZFVJbnQzMkJFXG4gIGFyci5yZWFkSW50OCA9IEJQLnJlYWRJbnQ4XG4gIGFyci5yZWFkSW50MTZMRSA9IEJQLnJlYWRJbnQxNkxFXG4gIGFyci5yZWFkSW50MTZCRSA9IEJQLnJlYWRJbnQxNkJFXG4gIGFyci5yZWFkSW50MzJMRSA9IEJQLnJlYWRJbnQzMkxFXG4gIGFyci5yZWFkSW50MzJCRSA9IEJQLnJlYWRJbnQzMkJFXG4gIGFyci5yZWFkRmxvYXRMRSA9IEJQLnJlYWRGbG9hdExFXG4gIGFyci5yZWFkRmxvYXRCRSA9IEJQLnJlYWRGbG9hdEJFXG4gIGFyci5yZWFkRG91YmxlTEUgPSBCUC5yZWFkRG91YmxlTEVcbiAgYXJyLnJlYWREb3VibGVCRSA9IEJQLnJlYWREb3VibGVCRVxuICBhcnIud3JpdGVVSW50OCA9IEJQLndyaXRlVUludDhcbiAgYXJyLndyaXRlVUludDE2TEUgPSBCUC53cml0ZVVJbnQxNkxFXG4gIGFyci53cml0ZVVJbnQxNkJFID0gQlAud3JpdGVVSW50MTZCRVxuICBhcnIud3JpdGVVSW50MzJMRSA9IEJQLndyaXRlVUludDMyTEVcbiAgYXJyLndyaXRlVUludDMyQkUgPSBCUC53cml0ZVVJbnQzMkJFXG4gIGFyci53cml0ZUludDggPSBCUC53cml0ZUludDhcbiAgYXJyLndyaXRlSW50MTZMRSA9IEJQLndyaXRlSW50MTZMRVxuICBhcnIud3JpdGVJbnQxNkJFID0gQlAud3JpdGVJbnQxNkJFXG4gIGFyci53cml0ZUludDMyTEUgPSBCUC53cml0ZUludDMyTEVcbiAgYXJyLndyaXRlSW50MzJCRSA9IEJQLndyaXRlSW50MzJCRVxuICBhcnIud3JpdGVGbG9hdExFID0gQlAud3JpdGVGbG9hdExFXG4gIGFyci53cml0ZUZsb2F0QkUgPSBCUC53cml0ZUZsb2F0QkVcbiAgYXJyLndyaXRlRG91YmxlTEUgPSBCUC53cml0ZURvdWJsZUxFXG4gIGFyci53cml0ZURvdWJsZUJFID0gQlAud3JpdGVEb3VibGVCRVxuICBhcnIuZmlsbCA9IEJQLmZpbGxcbiAgYXJyLmluc3BlY3QgPSBCUC5pbnNwZWN0XG4gIGFyci50b0FycmF5QnVmZmVyID0gQlAudG9BcnJheUJ1ZmZlclxuXG4gIHJldHVybiBhcnJcbn1cblxuLy8gc2xpY2Uoc3RhcnQsIGVuZClcbmZ1bmN0aW9uIGNsYW1wIChpbmRleCwgbGVuLCBkZWZhdWx0VmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgaW5kZXggPSB+fmluZGV4OyAgLy8gQ29lcmNlIHRvIGludGVnZXIuXG4gIGlmIChpbmRleCA+PSBsZW4pIHJldHVybiBsZW5cbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleFxuICBpbmRleCArPSBsZW5cbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleFxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBjb2VyY2UgKGxlbmd0aCkge1xuICAvLyBDb2VyY2UgbGVuZ3RoIHRvIGEgbnVtYmVyIChwb3NzaWJseSBOYU4pLCByb3VuZCB1cFxuICAvLyBpbiBjYXNlIGl0J3MgZnJhY3Rpb25hbCAoZS5nLiAxMjMuNDU2KSB0aGVuIGRvIGFcbiAgLy8gZG91YmxlIG5lZ2F0ZSB0byBjb2VyY2UgYSBOYU4gdG8gMC4gRWFzeSwgcmlnaHQ/XG4gIGxlbmd0aCA9IH5+TWF0aC5jZWlsKCtsZW5ndGgpXG4gIHJldHVybiBsZW5ndGggPCAwID8gMCA6IGxlbmd0aFxufVxuXG5mdW5jdGlvbiBpc0FycmF5IChzdWJqZWN0KSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoc3ViamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSdcbiAgfSkoc3ViamVjdClcbn1cblxuZnVuY3Rpb24gaXNBcnJheWlzaCAoc3ViamVjdCkge1xuICByZXR1cm4gaXNBcnJheShzdWJqZWN0KSB8fCBCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkgfHxcbiAgICAgIHN1YmplY3QgJiYgdHlwZW9mIHN1YmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2Ygc3ViamVjdC5sZW5ndGggPT09ICdudW1iZXInXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYiA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaWYgKGIgPD0gMHg3RilcbiAgICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKVxuICAgIGVsc2Uge1xuICAgICAgdmFyIHN0YXJ0ID0gaVxuICAgICAgaWYgKGIgPj0gMHhEODAwICYmIGIgPD0gMHhERkZGKSBpKytcbiAgICAgIHZhciBoID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0ci5zbGljZShzdGFydCwgaSsxKSkuc3Vic3RyKDEpLnNwbGl0KCclJylcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaC5sZW5ndGg7IGorKylcbiAgICAgICAgYnl0ZUFycmF5LnB1c2gocGFyc2VJbnQoaFtqXSwgMTYpKVxuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShzdHIpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgcG9zXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpXG4gICAgICBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGRlY29kZVV0ZjhDaGFyIChzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cilcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSAvLyBVVEYgOCBpbnZhbGlkIGNoYXJcbiAgfVxufVxuXG4vKlxuICogV2UgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgdmFsdWUgaXMgYSB2YWxpZCBpbnRlZ2VyLiBUaGlzIG1lYW5zIHRoYXQgaXRcbiAqIGlzIG5vbi1uZWdhdGl2ZS4gSXQgaGFzIG5vIGZyYWN0aW9uYWwgY29tcG9uZW50IGFuZCB0aGF0IGl0IGRvZXMgbm90XG4gKiBleGNlZWQgdGhlIG1heGltdW0gYWxsb3dlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gdmVyaWZ1aW50ICh2YWx1ZSwgbWF4KSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA+PSAwLCAnc3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZScpXG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpXG59XG5cbmZ1bmN0aW9uIHZlcmlmc2ludCAodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpXG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpXG59XG5cbmZ1bmN0aW9uIHZlcmlmSUVFRTc1NCAodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpXG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpXG59XG5cbmZ1bmN0aW9uIGFzc2VydCAodGVzdCwgbWVzc2FnZSkge1xuICBpZiAoIXRlc3QpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8ICdGYWlsZWQgYXNzZXJ0aW9uJylcbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJ2bGlsWFVcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYnJvd3NlcmlmeVxcXFxub2RlX21vZHVsZXNcXFxcYnVmZmVyXFxcXGluZGV4LmpzXCIsXCIvLi5cXFxcLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJyb3dzZXJpZnlcXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcInZsaWxYVVwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxicm93c2VyaWZ5XFxcXG5vZGVfbW9kdWxlc1xcXFxwcm9jZXNzXFxcXGJyb3dzZXIuanNcIixcIi8uLlxcXFwuLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYnJvd3NlcmlmeVxcXFxub2RlX21vZHVsZXNcXFxccHJvY2Vzc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcInZsaWxYVVwiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxpZWVlNzU0XFxcXGluZGV4LmpzXCIsXCIvLi5cXFxcLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGllZWU3NTRcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5jb25zdCBkZWZhdWx0VGVycmFpbk1hcCA9IG5ldyBJbWFnZSgpO1xyXG5kZWZhdWx0VGVycmFpbk1hcC5zcmMgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFRQUFBQUVBQ0FZQUFBQmNjcWhtQUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFCM1JKVFVVSDN3c1pGUmNJWk1oQVlRQUFJQUJKUkVGVWVOcXRuZUZ5SE1leW8ybXIvY3IzNVE4cDc0L2QxaTFCK0FBVXp6SkNZVmtrWjNxNnE3SXlBU1R5ci8vNW4vLzU5NisvL3ZwNHYvNzk5OTlmZno0K1BqN2U3NTMvL3ZYMTlldmZ6cSsvL3ZycjQrKy8vLzc0K1BqNDlkL3pOYzcvZjMvMi9kN1BuejkvZTkvejUvUjN6L2Q2WCtQOSsvbHY1MnZSNTNMWG82Lzdmdi85ODc3RyszcnZ0Zi84K2ZQajU4K2ZINStmbngrZm41OGZYMTlmdi83dC9mNzViejkvL3Z6MS9qOSsvUGo0KysrLzdYLy8rZWVmaitkNVBwN24rZTI2L3Zubm40OS8vdm5uNDhlUEg3KysvenpQYi9kTnIrZjk3L3YzOTg5Ly92T2YzNjc1L1h6dmRYNTlmZjE2My9mYTNQM1h0YVRmTy8vL3g0OGZ2KzZuWHNQbjUrY2Y5K2Y5ODY2dDg5NmUxM3IrMjNzTit0N24xL2xzdnI2K2Zsc25idDJjOS90OE51N2YzMnQyYS9TOGx2TWF6dWZ5ZmhhNjN2Ty83NzE3ci9lOFgrOS9kUzAvZWpPV0w3ZTV6bjkzTjlndERQMWdibVBTNXFlZk93T1dibjc2MHV0TFgrNWgwRDF5UWNNRk5YMjk5c2ZkUy9lYTd1ZjFtdGZQL1owdlBUd29HTGZuNHo3VCtUbmM3Nit2cDcrdjl6WjlycHQ3b090QjE2ays0emY0TGErZC9vMzI2ZnYxdE1WSUovMzc5VVlvUFJsVHdIaC96MjBRZCtQU3hxS0ZUdy9RQlFoNmpYUmRhUUcyNjFzM3Y5NWpGd1NXMTI5QklBWFh2Ly8rKzllenVsbndidkhSTmJnZ2wrN05tYUc0WitDZTdmbit0Q25PdGRnQ2J3c0c2M280ci9rOHpWdEEvVTZ3Y2RmMnRJaDNzd0hlTk1lVkQvOC9UcEoxRStsRHZOMHNMU09nN01VdHB2T2VVRWxEd1RPbG92VEE2V1JMejFqdmoxNVB1bi9wMmRKOVNnSEFsWCs2TVZNbTRUWlAyM2h1bzdyQXBPdDVXVTl1TTdyZjA5SmxlVTMzNzdyL05BRHE1M2pvaHA1UjFyMlIxcjFuelhsZWpBc1liV0dzSjR1bTF1a2swUStmVG4wS0JEZlprZ3NDcnA1TEo1MWJOTzZFcGdYY1V2NzFzMUZxK1Q3M00wdFlTaUs5SmwzNDV6MXpwL05TbnRJR1NWa1oxZHJudFowYjdQL0hWOHBhYnZhRysyenVtZWw2ZWM2SXFRR0FJcDMrREoweVAzLysvSEFZZzZ0anYxT1g2d0o4LzV1eUYvZTY3dk01a0REZEMzZGZLQWlreFhBQ05lK0NVOENOVHNpMTdLQ0E0alpaSzdITzN6MkQvMW9LdVkydldkT2FmYVRuZXdhVVZ1dFRDZkNDMysrMVVkblIxb2NlV0sxc3VNMHdXcVozZmoxNktybU5UWXVlYnNDNThXOEFOa3JGOVRTZ0JlZ0FTQUlmdnh0bEZSMXZDUFJhbDd0TjR4RDJHMXhCTjgvN091L3pPVE85eG5Sb1lIZjNRN09TQmFkcHA3UmpxTmF5a29JY1pYd05oS1ZuMy82NFExRVBLcGNkcG1mdGdxUzdSdzIzK0MwQTZFVnJSS2ZhTW9GK0drVGFhVXViUllHbzh6MWZpdXJjM0RmcGJicnBGRjExMDZmTlR3OUI3NDJqYWVoelVJQ2g2MzhYeTBrOUtSRHJnc0M1Rmh5bFJxV1hsbjhKR0R6VDYvUHdJTHpwQnUxZjExc3FIeW5MKy9yNitpMDcwOE9UUUdJSHFyck0yejNQODE3cFFVbDdMajJENStUMFhTYVFxQVgzT3c1b1NEVm5TOGZYQjYzdmZXNG1EUW9wcWlwK29TZXdQbUFLQUV2SzdJTE1ldEtuKzZTZlF4ZVpTNjhKYjlERnFkaE9BdkphcXUyQ1lNSXhDR2RZTXE2VWRhWDAzWldkWjdBNkE4RjV1dE0xcFVDMk1BOHVNT3YxTGNEckx4QXdCWURsQmFnRysyODVWSG80Q1VqVWpYNENObnA2TFF1RVRtUmFuQzU2TDd5dHd3b1VDNkQ2M1QwUHVnL25hMnNhN3o1YlNtbFh6bHpYZzY0UjNaQkpsNktpbVhaOS93M3I5UDV4R05uNzcrZWZNd2hRRmtFNFJXTTNIRXVqMlJzeEx5bEQrUGZmZi8rM0JFZ1UwM2RvT25vUXV2QmF5a0xCcEFrbEtJcmVjdk9VVXJkbzNuUVJON1JqVzZUTHd0ZWFQNVVScm95ak5hS3BmZ3NvclRTam9OS29TcXA5TmRqY2xnekxHa3NsWUdLVFVuWndQcWVXQ1M1Wkl4MFVUMHNoazJxSk5uQTZtZE1KM1RiK29sTzRUUXZkUTZHYWRnVm9FcCt2cDh1NmdaTTRKZ1dmUlJOQTMzT2x6aG5FQ2JVbStwZjQ5SnZQVE9VSnFRTlRBRnJXU1dORkhIUG04SUtVNGF5QWNSTk9VZEJOOS9hNVFWTnZGeUVGZ1pOR2NmVnBLakhjeVpDQXh0c014dDNjTTJ0cGkvSTdRcDRsSUtWTjZkSmhyUWtkZGtGb2RYcFBBaGlWcXFTRm1FN3BGZlA1RHArZnNzbTBpUjJPbExKQTkyd2NHN01lSEV0UVR1dUtBdlV2RUxDbFFPbkYxbE1xYmJJbWpGaFVWemZpbGtVWjZEYisrU0FUeDM4S29sU3ltbXJWUmQ2c2FhR3JSVFVZdFVCeDRoYXRmblZhaGJiNVhRRFJUYlVvRmwwSmtManZoUzdVMzB0S3ZQYSs5TWNGZ0lWWm8reEpOLzVLTzlQbmVkSkdhbWg1cW1PcFhtejErVUp6L1RmNkFsTFV1VEpHY1FiWDJLTVppd1pKcWdzVDFiZ3NzaE54UGtHb2xDSVRoMzBHcklRaU82QnkwU2hRRUVnMS94SWdLWnRjY2FLR1hSRjIwSUJncDVJOUEyZkNOdHo3MHpOcVFHZ3FYMzRGZ0tValQ1RnhqZHczcVJoMWlGR0c4RjBRY3RsY3FkWnpOSXR1U05mMXFJRWdLU1pkYXBrWUFEcGR6Z1h4L3M2UEh6L3dSRXBVSmkya004TlpObjRDRUtrdklnbDluSkx2QkRZWHdkQ3QwSWFDZ0c3TVJSZVMwUDJFUFRqWmZYcUdyUUVMTVlDbW1xSzBxZFZWbEZxZnZHa0QwMjVydnFXRHNDSDVMZ2c0bWVwNS9hVE1JcFhYb3ZkdkFPejVIcWNneXBVZjduVFNBT1dvelBkenBiNzIxSWFkUENaU2dHdTRqdmIzcTFncHZTN1Y0azIzb01JblBTQlNhbjcrUENsV0tldFRMd25DZGFoRXBXem5hWnpyU3MyNUZ1RVVGSkpjMFlFd055aHgwb09UM0RWbEtXY0twN1crTGthU3lhWnV3RFZJcFUzenZ1OGJCUFNrU2ljVVpXUXF3M1lHSDB2ZDMyVGxxVnlpQXlKMVd6WW01RHhadjBNTHU4MnA2MSt6TXUwZm9IWjR5dGhlczVMVDhPT21iWm4yNG5QRHhTNVVYUU1MR3plK3lGdGJ6WGFMK2kvNFJxbzFtMjZpWFZmaTBZa2pkblRpKytkZEpPLzd1cjZGcFYrZGFLdHo4OStBV2l1S3J0ZjM0OGVQcTh5d0JZR2tNNkFES0IxVTlPOW5NRjVvOGZONTZjbi8vam5CNVpRMXJhWXpqME8yQ1V4cDlOdEszVFRaNXdyVTNQUmwzMzZsRW1iOWVWYzIzSERjaVFuUSswbktNS29kM1dzb1NLdDEveGtBVXZxY09pNkpCVmpZbUZUYlVzMnVhN00xME56UWppbGplemN1Qll6dktERFZTbTdkQy9SNS84Z0FTRHRPM0tnTEN1Y0NUU2VBQTVFb2d0MGFVZHdvb1ZxWnNyb09LVjZRa0Y1aUY5eEdJV0NTVG15WFVsSUFjSFcrMjNobjlwT1VrWG80bkFHRlB1K3EwS01TTGVrd3lEZkJsWGxMRUZnMy84Zkh4NjhzN0R4RW4rZXhwUXJKZWRWdmt2WWlCWFNTQVorLy94QWdRa0FSSWJMdTRzbUEwMm5zbDlTbHBmVXJJazBwWEFMYWtsR0kvZzY1MG56WEJLV3hFK25lSmVTZmFGcFZycVUrLzhhUVVIYllQQ0p2OVNiSkplY3NKZHBCUUd0MkFkZGN4dkw1K2ZrTFFEM0xwK1EzNGJBYjkvK3RhN1Y5enIvKytvdEJRSGQ2RUlKTmRYV3JBZHZtUDhFYUorSkozWFdwN2lGUXlKMEcxRHJic0lzbTdFanBYMHFybmJ6VXBaOE9oS1NlZGhmVXo5ZElUVlVMUU9lQzY0M3lyNG01RnRzMUN2QUpLMmc5RG5yYWt1aUhSRlROT0dYeEdXZ0FOMmtpM3A5NVVsUmVOTWZOWlNXMUJydWI1RW9RUXV5cHJYWDVESW15U3E1Q1RhblYwUHJ2WmplMGlkeUdkNEltOTFtMVhGbTZIaE40NWRhR2ExaEtMZU9OeDE5ZG1OdEJvR2EyYmUydW1wTDNudjc0OGVNUEt0YVZ2WlFOcHpWOFh2dENvNmV2WjFGdUtWMTA4d2JyQ2Rsa2trMm90RWhvRjhEcDl2TXR0TXR5d3JjR2prWnJKUXMzOHBaUEdja3lrK0VHR0x1eFhTZnh6UGtjeVNDbTRSUEtvcndIU2JwSE40SXlsNzJlMkkrNlBEV0EvTC9GdTlyUFBFdkVTWjcwcTZaOU1lRmNwY2RyYlU1cG1RcFhFaGQrOHdDY1JEVUpZbHJ0VHZpRUMyNXBJNnpEVm9pNVdGSk9PdjNkZFRXTDdrUjduclY4VWh1NmxKaFM0d1QycnF4QTgrTlhQWWtyTTJsTk8ycXlIVndMRS9CYkFHZzM5TVkxaFpEOHhTS3FkZDR0OU51cHVYWXAwczBOWEZTS0dseTBqWmphYXRmNmJ4RUJMU3E2WnJpUmFMVkU2YlhOMzBxdUZDUlA1ZHg1a3Q0NkVybDdjS2JSNm1PNWdxekw1dGVndW5ZSTZ0U3NOV05hTTY1Zk5PRHFScko2dkNlVVArRUMraEFTSCsvb0VuMS9OY0IwdE10L2E4dnNOb0d6amliZGZmTWNiTUgyRlpzUWdPazZGaDFDbjlTVHE0QnBsV3kzamIvWTAxRWJyc01hYUhNNWI0b2xPMG1IQVdVeExpaVNtU3FWZUZybWFaYVVNZ242RE0veVE2dVRydk9qYTVsQVMzRmIwRGxGRnpxZzVEUnJUSTYyeENuZkFuWG5lMU9tNGQ2YnhEc0xwWk1zeVZXdjc1QnZ4N0I4WjFNdm1FYWJxNmdaRWgxRVR1cE1ySTRyT1pKaVR0UDA1WEM0Y1NwdWVKdnFKNmp2bjl5NG00UmM5OTVESUJOUkN3djlvNmZoemFuU0FnRHhybWNRZUtQcE94engvUER1SmpWTHN2WTkvV3dhQ0FoRGFhN0x6WU9ROUJwbkFGYnUyd1ZFS21kU0lHaXA5MUp5VVhPU0t3T2NxSWRjZ1RUSXJVTkNGb3Z3VzIzQ1RUcCtkbmVtUFpDQ3dDMUFIUTFCRXJmYWVOa0ZUYjZsMXVpbXFWYjZGVjZjVTFLZFpKWk9CT0tXMTg5SUMwbHJ2NFd2ZGk2OGVucHFsNWdDa2UvRVlBSmZYZXR2TWlwTllpVDMzMFhxbTFxUzZiNDQwWXc3ME5Lb3JNV2tRM0diVk91M0lKQ0E2cVUzZ0RhOVcxdUp4YkVCd05YNXlyVlR5bnorRExXS2ZwZTJTT0lZN1pZaWl5UWRoa0Zwa2tQQVY3cW1tWnVvVkxwWlpxa2VYNXQ3YU96NCsvcXYra3p2djlOYUVKdWo0OEFiU3I5Nkxiam1uMlhZaG1JYnhIUXNvaDdTa0JENDlsMDZQSlZ4VHRDbVEzQlNGa0xsclN0RjNiTjVVcjNsT3FLV2RDZk5ZbCtvRXRMQkx5aTVwc1l1RGYvT0tESkN1T25VbzhoL2duSE5sODhCbzZUUjBKUHFmUC9USitBRzlEMmY0WnRGRVlqYlRENlNJOURpcWFqUGw4eFlWc3YzQkdMcXdhRW5iVXJIbDJ3M3JiK0VGU1VteUdXTlMzZmdRd0tJWlRySitYZmlqQmZnNUdZaWFodDhTVFBsV2hsRE13Qkl1YlVZb1ZLVGp3cGFTTjZiR2prb1ZVNFUzWktOVVJCWHhlZVpuZEJFNkVaTnVzRG1RT2Z2TWhFT2tIYWJPNjBSTFFPcEhHdDQyRklxdEt4aWJXSkxMY3gvNkFDV1NTS0U0cTRDb3JZd0Zsc3lWOE01SGZ1NUdMVVVXVTkzVld1NTEzRWp5Rk1qeWFrNE8vc0xUaFdhTXhSWjlSYm42Sy96L2M3MC9UekpOYzFWdnQyeE9LNjdMd1grZENDazU5RnN4K242WENCUHRiamEyOUZtSVhNY0RjSTNTc0VtaWt0NHhxMWFOUVdScC9XNEU4cnRLSWhVSjdzMFo3Ri9hcXE4VXgybWk0YTg2OGo0Z3F5dTlMOUxDcGptN0JGUFRleEJVdEtSa2t6VDkrZDVmckVpYmlNcmZ0TTYxcEtUTUtreTlmbzFHS1hUa09aS3VQOVB6NGsyV1ZyN1o5Ym4xdklac0c1OUw1cmFzNjMvQlZ4UCtNaXplT0t0UWNDbHNhbTJjOUh6ZEg5SkQ4dlZuT29jYzU2QWl4MlhucFp1UmlDMXNWS0hXcHNucitrMEtRb1RqcEZLbGZjenZRRWd5V09iaHIrQm5FVGJMZWc0QllDbGRaYW1LQk9Pc0xCUnVySGRNOVJuMWtEaHRVMDNYV3ViVGRHd0QvVWplRzc4MHlrSXVNMS96aHhzSFhwYXY5K3dBY3BydHhxKzliSlQvZXQ0OEFSYTNjeDNkK0FOV1ZyVDh6b05PL1hhejhCR1FocWFyTnp3SENkYVVWOEJ0Nm5UMmtvR05FdjJ0amdVMC9VNFhLdjl6RUszcmNLM3BvRloramhhQm5CK3BtZlZFTGZwUU1wYnBodEJtbmlYK2paQkVKMEdhWlpjd2hiY0NVNjFmMU4ycFpTV1RycGtMRUt2bVVvWHlvS1M3SGhoUk5KbklSeUQ3c041YjVVaFdaNlYrNXhwODY4ektWb1hLYTJGeFpackVma2tGK09GMFVnSHlCOFp3TEw1VXlSMGsxNlNmdHYxb3RNa25xVFl1MFc3RTJLZTZ2NVUwbEJKc0tUK2JaTlE0eENkZ0pybXAzNXpjcVJ0WThPWDdIQkJvbDNBMVlFbnBGS2tVc2M5K3pUeGlMby9hV3FSeXlCdVJHNkxRV3pENUZhV3BIa3VmSHo4djE2QTFRVTR0YzVTWk5SK2FIZFN1dTlUZ3d4OVAxRXpxL2xvT3ZtWEI1VEdZYVhOdnc2Z0pHN1lsU29OeDNFTXhmS2FkUEtrWjd0TW5sYmhrNDdhcGdDanVJM0xBRksvZjlLRkpBZXAyNmxEQ2Roc1pXN3IwMGlibjRhWi9BSUIwMUNIN3dnWjJvblk1SXpPUFlWK1hoMW5YUDJzaStFRUNzLzNPWHNIMVBaNm5iamFzcVNiMnMzTnFGY0F4OGwzVzlhVCtHcW5TSE5DSVByTWk3QXBwZkp1MGFjKy8vZFpPZkNXd0x6YkFPRFlybk5LOGdvc3JwNFdSUDNkbG1RTDBQanZ2Ly8rM3dDUTZ0SkVCN3FGcUNqdzRqSGd1cmNTbGRRMlNoS0hKR3V6eGF1d2JXYUhRcThnSzlGbXpwZXdnWVFFdWlaYWpiajJOUDFIU3hYSENKQUlLRzBXaDhEclBkR2dUUUZnb2E5VEFDRG1hUjNFc2ZoWTBzWnZ1b0VielloYkM0OUR0WjFOTi9IOFZFT21mdTJXcXI4cFlGcDQ1ODg1RVFtbDl1NzlpQ1pjb3JSN3FLMW1KaURNMlRtNzlMaE45YUZGMlZKSllqMklXbHQ2T0ZLUFFlUEdVOWViWXpnVUE5SFN5Y25lejh5bWRSZHF1VXBLeGlVWVVMc3hzV3kweGhlakVnM0c1MzE0MHJTZjh3TnFJNDAySExoNkxUV0F1SCtqa1ZicFpLUm9UOTF2MUN5eDJwZzFRRzgxSENFazJobWlhQ3Fib25wTEcybTBPZEdGbEVIUnpFUEt1aExZNnE3UmJSRGQwQ1RlT2t0SDExK2lHOGdGWDJwWW9sSXlQWU1rMDc3eEVsZ0huYnBnUkFOTG55VWxQZXU3ZHNMcHpUMzFBQW1OVkRWaEd0dTBSTWtGbkV1ejhLaitYd05DVTJMUlZHRFNtcnRnY2FiSmpzWnJRSkYyL0NrRzBtaWx4SGdrVGI1alcxSkprVURnODNVMGdORkdjRk9POUhkMEpEZGRpdzRFYlhxTlJNY3VYNFJucFBYdVprTCtBZ0ViT3EwY0pBMDFYS0xaT2s1YzAxK3lPbW9BeVRLcndBbUx2cVBqcGhUV2dWdWtBYUFSWFEyc09sVnBCTFRSaVg1dS9FU2xOWHJLWllRdWtEaWR3bUlaUjROTUtCTkl3VEFGSk0xdzNLd0UxeXF1N2VhSnVrN0E1N0xPRXFiUlJIZDZINSsyWUp3eUtzbEFFOHJmN0pnSVRIVDk1c3VBaFZYeGwrclR0WHVPU2hsSHNWSFEwZlI3eVZpVWJtMFlCL1g1dDgrOGdwanF4NmdxeHlTd29tQk5DOTNkTnhLVGtUc1ZOVWk1RWZacERvQm15Y29VZkJjZmNvZEVPZ2pXZnBzL1FNQm1jTkVzaVZOemlIdUk3U1pvWktVRjdScENhT1pnVW96ZHBQYzNFNGxWUVVpWnl5S3kwUlR5UEhGYzd3RFZ1ZWM5YUNkL1U2aWxrVmJVU3B1QVFEcjluYkdyQmkvdEJXbVM1eGI0Rk9oelFmUTBva200UXp0WVhHYTRpS1pvajVIQ1Y3R1ZSejNqWEpUUzB5WGRNUFYzYzlHSVJEeE9HRVBxTkxkbzZkK1RaTll0L0FZSUxrN0p6aEJGMjI2VGlVWURlTlRDdW5IdlNlaEVjdWQyQ3RQaVdtM0dWdFdjYzNKS3o0ZmtzenBUanhnT0tzVTA2SjVzMWV0SDZiQ3lOSGtwbFk4SnZIV1c4NGxkSXpIUWMzcm5rUW1JYzEraDNuVm5ZYndNYmREM1NYVTkxWHQwd3JjQWtMejVrekZxUThEUDYydjZjeWRhV1h6OUZ5c3QzYVRKL0NTZCtrbjlwdmRiTjhJaUptb21LODJqc2prOG4ydTlEZmxzY3hyZU5lNUd0THQvcHdNMitTbTBMTUQxaXB4cmdYUVh2d1VBVXM4NW93V1NwaWFuWGljTmRjTVozT21TSnRZUVgrMlFiRDJKTkV0WWF1Q21iMTg4OGxlK2xuQ0VsRlc0TENBWlZxUnM1U2F0ZEpnS3BkcHBZTWlpMFUvS1ZLZi9vTU5qYVh3alFaeUNycnJSWC91MTFBbnBmUCtVQVV2S1JjS2Uwb1Frc3JKN2RENWFrcWs2SVEyZEZHclQ3U3l4azF0T0VwQzRBSkRTZXFjZ1M4MCtxUXVOTkFYcjFOeUdwTHVIbjhvZXZkK09HV2kyVlhvZmlQWWlYWWFUVHJ0ME90R2NTVk53eThTNGhiNzBTWkJpYnduU3AvZmk2Y0hvU2doZEkxOWZYM2FVWEZNQkpxVWZQV1A5dDRjK3NEc0phRTY1NHhuMVZHcEF6Mm1lUVJ4OHlnQmFQZHNDeU0zb3B4UWsyMnNzR3U4MGxWWlRhWjJJUk1LcmRZWmorL3czL2VqYTV1dXlTaG9IbDl5a1ZtWW1nWTQzL3BWMFBlNTdieEIyUmk5dXpaMXNRNk8xU1lOQkJpejAyYysvUDh1NDdQUFUvdnI2K3ZqOC9Qek5pLy85azhDSU5sejByTjkxQVRWWEY2cm5TT25YQUwrME1ZbFNUUFRvV3ErUzJTcFJXTzQxYU9SM1NxdWIwaXc1M3FaSlJ5NG9PdHhvblVpOGFqN1NKRjlTSGk3SXU2NFBza2tueklMY3FaTGFOWFgwNlJvanJZN2IvTzkrZTF5NmQ2WmpldXFmRy80TUJFNW1TQ1dDZTU4WG9OSG9xUFNLUmozWEQwRE1RZ29XZEJxNGpVeWJmN0V0SndkY3VnWnFYSExaMXpKUWxEWmNvM0ZUMEV6NkN0Y2dwajlINjRhOEpOUG12UEdCcEVPdmVTR21tdDdoTFpTSkpJbzFUUVBXNStXeWo4YSsvTW9BUGo4L3JTU1hGcGM3K1hVZ2g3dHdmY2hLRlRxMTFVbTF1TExEbmZKdUkra05kM1FTemVNN3YwZm1tM1I2dTdyV3pYaHpyYlFxTHFIZ1JDVlhvc3BvRUNsMTN5VTZMMlVHSk85MTkyNUZ3SnM3Y2d2eVZETW5wb3BLdUtUelA3UFpwSVZ3Y3Z1YlpxdDNiN3c0QWpXOGtYRHErYzkvL29PTFNxZk9uR09vM09adjZhTDdnSXNScGhwRUtOaEZ5cWQxUkxWMk9yclU3bFoybklRZGJwTlRVQ1EwbXA2VlkxdmFwa2pqMHB5YTdzWWxLWjJ5YXhzcmJkWmJRUkcxOHlwdG1USWRYY3NFVktjc1RyR0lNOXR0b0NqZGwzZC9uRlFuWGR2NTMxOEJ3S0hLYnV6VWlUanJWTjRHanJtUnhna3pjRlRQdS9rVk9Fd0RNZ2kwSWQyM1d6emtWNUJhb0pmRlRaTjkzRDF6akVFS0FPOEpsTkxoQkNMZEFFb05RMnF5NXJaZUhCQ3QzTDQraHpRS1hRK0F4WVEwRFd4Um5VYXE2WjNRamhTTGl5aE14VkowRUxwZythc0VjTHl5U3kvVDkxWWRmbXU1VENmSkdRQVdhV3FpaVBSRVN2eSs2NmxlWEk2V29LRDNWZW1ybHlxaURNQ0pyMVJVbFF4T1dzTUtiUVk5VFpydkhnbUtuS0ZLb2s2cGE1UzYvNUxDVkEraXBQNU05NUVVa1VRWm5zSGtuR25oL0RLYjRJcUNHWlhDdncwSFBRT0FHOTNzQUQ0WERGTERSVUpkazBjQTNXalZ2N2VIbFU1aG1rSjdsaDJ1MWx1R05qYVVPYzM1YytuLzUrZW5IVzZxejBKUEV2YzVxQzYvNWQ4VEZwRHN3ZHhuWEVRNk4rV0cwcU11ZzF0VDdmUmVDVE1pN1VnckhST29yZDJJU2dVdkxlOFlBTFFXMWZTL2pmYWlHZTFreXBnRUdXdjlzenljbTAzWWZPamRxZDJHV3JaVGtTalQ4M3R2dXF1cVBaZUp2ZlVncGYwMFlzMVJicmZQZzlTSlMyZGowdlc3TkR4NVVqaUhhU2RYdm5GUVdySStwYkFUTU9vMjdqcmprdnB0RnFIVHJ4SkFoUXZuQzU5MWZscm95OHhBelJhY1c4cHFZKzE2eVZ1RzRZSk9pcFkwUU1JeEc0Umx0Q3hueVlKVUcwR2xrejRmb3VXb1VVVjdIQ2hncEdCTEJoUzN2b1Mwa05NNldWclB5ZnFMaEZRSmFHNEtTOVVCSkdBNWxad3BXMUQxb0F0MGpmNTlYRDExMjJCQ25IOVNFV3FrVEUwNktvaWhTVGRKdHBwQXA4V3RtRFpUTTExbzl5Tnh3YXQwV0ptYUZnRElqNitadlJCYjRGeHo5WG9XMnE0RmNZZXkzNlRRU3d0NEEvOG95THN2Q2xJdGNLU1NLZ1VOYll4ck14dCtTWUVUeU5XaWVOcjhLd0tzRHEvbkg1MzhxMy9VQkZJWGEydVBUU2UyczNwUzBNdUJOeWtBRU9KUG1JU21oQVNxNllsNzNqTWFlOTBVaWltd3FvUlZBMEFUOTdUU2dyQUpNbGVoZTZrYldMbnloaUVsajBjSDlEbTNJUkk4dVh2UWdOWDBHZ250ZDFUZ2J4a0FpWUNjeUtmVmh6ZjB6K0pVUXh0ZnUvNklPbkh2VFh3cE5UU2RwNSsrcCtJY3BIeFVSV1d6OW5hS1NEZWxsc0RhVngzMjlxc25BQzhaY0xvc2dPcDM1NkdYeW9nYlV4Wm5tTnJ3S05kS25TemJtcXRVVW5mcVFlV01aNXhsZnZLR3BLeVNTdFBGOVBiTUZCNDMwWVdvdm9SK0xwdWV4Q1d0WWVIRzlpdlJiRFNHekMyc1UremtlcjhUcDA2QjU4UldUdjBFbllvbmVuK0tuNVFLMHVzOGYrNXNVZFZNUXRXTmJkeVpHNGVkc0FsU1NEWXJjTVZBWENCSXlsVUtkT2RHYlJzL0FYZk5CVml6MnRZQWxoclZWUGF1V0kyamU1Yzk5VWNBb0ZyVzFYSUpxSEIwWVVMNWlTKzlVWVZSS3UrUWFRS0FuTSs3TmpyZDloTzRlNmtCZ0ZSa2JoYURUa3g2N3plQnRPL3ByeDUzcmFsbkRhZ3BMWGFaU3Z0S09GSHIzVS80ajhzUTZUVVQrTmsrVHpNbzFZYWQ5RHNhQUZRRVI3UWVHWjZlcGNWdmhpRG55WkpxUzdKWlNoU1FRNmJwZ3ZWM3lKV1dSQ1Z0SGlGWk5hbVk0alIyT0xNQTdWb2tVWWU3eG5PRHVzMnFOUi9aaURrTGNGZHpuNXYrREFJMDIyNXhZcUl5S2FuZnFMeG9nTjhpczNVZWdTNFFwRXhGRFV4VndIT3FDVW0vNFB3b0haQk51SVcyZUorbHJXWnlORDZOMnFpZENhdmUreG9BM0ViVEI2LzFuMXZzQ1p3NHBhdWZuNTl4Q284S1hVNXUzS1dJVHV2ZDV1NlJBdElObG5DVUdha21WVlBSQUtybUZrT3BxUFlXdU0ydkFON2kwK2d5dDlhK3V3eFNUYkpjVi9ZNDg4K0ZUU0NobWE1cjE0dVJ5dENVeHJ2Z21MSUdaL3JpTmo4NURpWEszQVg1eC9YeDAwSjJDSG82eGMvYTFDR2o1OWY3c3lxUkpCWFlHWlhQbjlNSFNhbmg2ZUpDYmNpVWxiZ01pQURFRTBTazA5OHBLRjJkMjlnV0RhaTA4VjBRT0JmemV6OFhVTXlseWpmQW5oTU9hUjJ2b3BpMXhabjgrUnRPNFFBelYydnJ1cU9CcFU1bmNONG5kV1krd1VNWFpCMzcwa3hmcUpUNkxRQVFEVVlUZDRsTDFrN0I4M2QvL1BpQmJiZG5aMkk2UFp5UmFmTDdYeTJ0Rk5GMzk4YTFJZXRDZHEzU3BObFBkR1RTSGpRT20wNVdGMGpjd0F0SEc3VzVBYW1WT2pFempucHU1cXNKRHpoVFp2SkYxRTJaWElGZGNIT2JuK3J1ODJCeVFjQU5PTlVNd0syVkJrcFN6OGI1ZTcrVkFLUm9JeEJ3Q1FCbi9YeWUzbTNldkVzVmsrMDFEUytsTW9CVWQvbzVTTFJETmU3NStVL0RGQm8zZFdZZHVxZ285WFluWkd2TGRmMFQxRGl6MkhyZmJFcWRINWtXYm5PbGFxQmlVeGJTU1hrR0grYzJuUnA2Q0FkSUNzenpOZDFZZWtjMXAzbUpMb055cklSK1BhbjJkeXErZE5wUytrOThKVDNReGN4QkhZUlNRNUxqNTkreVF6ZW0reXhPbzUxNGNnSVJDZWhxazIzUzgxSDhvQ25Ja3VLUk1wRmxndklTeUp1Q3NrbGxTY0haU2dGM2NxWWVFRDBVM0ZCYzhrWllYWWpPZTZ0MXY1WUF5YS96QlprVHBrVmowMzhMQUttZFVEY0JqUkpYeEp1VWc2NUZVM25yRThsT0VmOU05WndPMjUwOERyaWtiR1pwOUNHNXN3TVMwOG4yL3N5cS9TY2xXZHBrTGhNZ3lYUENZRnJqRExrYko4WW9hUkZTMi9MaTdLT1RkR2p6SjVVb05ZcVJLM0tUK3A2QmUzRzFKdHIwZENKMnNtNmxGZi9JQU5xTmRHa0ZQZEEyTFpZa3ArN1UxdlpXNWJMVlZUVkplMmtodW9lL2FMM3AxS0RBNmJJcXQ2RmEwdzJKYlp4Y1dVRk12VSt1Sm0zOUg3UlJhV1JhVzE4dXlEYS8rL1E5eHlLb015K1pjTDUvZDRGUDMxUHJhaHB5MmthRHR5bE5lajgwbzFBTDhrVlU5OGR3VUpKMWFrcVZSak01SU1aSkZ0MnBrUnhtS0RXampVanVORTNZNHVTaXFhT3NEYzlJOG1nOURSUTVibzByMURkL1poQm5adlF1a25kaDBSUmgxeDNacktmZG9aQ0d4WkRYaEhzdUtUQzFaaXkzUm5VTlVibVFzSlhVb3JzMEdxV0p5V2wyUWx0UDdqazZIRUUveTlPc3Q1UE0wUzIrNUE2VFRuK0hoQzRLTlZxa0tXZ3M0b3dGOEV5WXlMdXhTWHh6bGlwdVBEY3RnalNqejJVMzU2U2F0N1FpMVppS2U4aWxhSEV1Sm9iRVVhSXJWZWp1WTVLc0s3V1pzaGZTMGFjMGZoa3Y5bDI1TVFXOTVLcEZHRXl5WEgvSXVNREpjMm5RZzBQRjE4N0FaVmpIT2xtR0tLbjB3Rk8wVHYwS3FjUHQzRkRuOEZYbjJQb0dnT2Q1WXF0ejhneG9ScHZPVGRuaEpNcDQxY3MrQUFBZ0FFbEVRVlJLcUM2RHRQMExnUHZpUTY3dXB6SXhnV2VLaHlRL2hGL3A3dlBVc3ZCbUpMd0RBdHZQcCthZFJwTXVXU1haOEJGVi9OdDBZQWZxcFdhS05naWpVUmJVWjAvS3FqU1YyRWxVNmFSUEoxV3lOR3NqMUZXaTZocFdhQmpLR3dET3o2bHo2MXNLck5maCtHU2kraFE0VW8vNWxKRzBEczhFaUNic0k3bjl1QUNRZlAxVFM2K1dxYTc4Y25xUkpHeEx3Mk5iVmtBK2Z5MGdrVWlJbnNsZmYvMzFmMmNET3REaXZLSHZRblNBV1ZvRUNiMU9BcEsxU1lYa3I4dU12amFOaGdKRWlyQmFKbW1icUFOMFhHdXpHM25XQU02RWZ0OTBzam5kK2JuNFV5TldjL2doSVpSVFZ5NVRoZEpvZEllejBEV1JDckM1VWQwZzlzdm1kNHJGMWhUbjloemhlSzQzNFVuNmJXMmNhRTR5cVZaT2syL1hNVkdKSjE3NFlMY1I5WHBvMGhEVmhFNmozNlNrcWdKTDVjL1pHSkxZQUVjUDBvekZCSkM2UnFha0pXaWJsbkFBZDdMcjlib0YyNFo3SkEyQ2ppZFB1b2hiamorZC9NczhpWVRCdGZTZmNLOWtSLzdMRUdUeDgxK1I3VlJEcVpCRzZieGxZQ2RwQ2xxVVBadHN2aHRaRzBpVmdwRHl3NjFsTTlXWHpiL1FqZVdtZTduUWdFb3pwZ0RnQU9YV25FTXlYQmRNa3ZQeVVuODdiNzdrNnVPbVNOT0FVYkl5VHlQVmxjcE5KcVBMZW1zYUJPc0s3RGpsQktTMFU0U01DY21wNUMweDBzanVGQ1hKbThDbFYydFV2bGxValFyVEFaR3JtaXkxY0NhQlZlcStkTGJueWR6bFZwNmJ4RHpVcXB1VWlHa0lSK3RFWEZXTE5Eamp4RDFJM3B1dVo1a0NuYktZOU9YTWVlajEydERWaDdqMXhCKzJJTEFNbWpnWG45YkFhL3J2TWdEYWdNN1BnQUErbDRZcUVMYWl4RzV3NVg4VEFKS0tVR3ZzSkwybTA3aTU2eTRuVXV2L3A0Vkx2ZmZOZWJvTmdyMUI1dE1zUFNxQms4WFlqYVB5c3Q3Yjd6YmpYbHNDdE80eS9lVTB4WlVDUVJ0YXVkYitiVFBRNmQ4QXZKU1dMOTF3aE1pcXFPUTBPbldOR2hvVVNHOUJtZ2JYd2JoOEpacDJ3UXNXYkthZGtPbkFvSGtUdXNsMGt5WVBBL285Q3NJcFMxM3dsZHZTWlZHRHRySThQYysvL3ZycnoxNkFob3E3a3lkWmdxYzZLQ214Vmo1MkdXUzVlTkVuWTRlbE9ha0ZBdWNUcCsrajRCM3BIbWpzRjgwNldFVkVyVTV0aTgybHBndEdSRTVON2ZTajdNWUZnUVphcGt6TUJlMjIrVmZNcklHSVdsNlJBSXRLcERZMDl6bnBzMVMzTFZ5dGppbEtVWTl1ZHZMYlM0NDRxZ0Uvd1VheWt0WnlJSTFScHBTUElqa0ZsT1I0M081UEV0MG9GZXBBTzJyUWNoaU9XbTVSTnRCbUhEUTJwWTFVVzhIWlJaaVQvQlkwTU90emNLOTdlL0t2QjBmYTVLbGtYNWdTL1hwU0duMXVKbXJmZGZiRU4yVkZHMS90YnNhNXVHbE9vZHRzQkppNEVWcUxQSlBLSktjSklFdHphdU4xcVNZRk1QVVNwQTJmWEo1ZFI2WXprWFNiM3pudlVIQmNkQnF0UEtFaEowVDV0aE0zWlh1dC9sOU84WlM5dE1HMUZBeWFJckNCK0g4RWdJVXkrQTZJMFU3RWRtUEppTEdaa05Jd0VjMTAxRmZnTzFHYnhDOHV3SjJCeWMwMWNKa0o4ZmxOUnFvajNzZ1BjU25mM04vZHBPU0VRcTl0c2duZGJwb1B3cWFTb011dCtZVERVSWE4ME9lbjBDNTVKalQ4SzRIZ2FkLzl3UUxvZ3FWVW1FNWdGL25UQjZlVTMzMndOazJHekRmZnI3ZjU1Y2VQSDcvMVMrdmlUMXkyNjV4ekdZd0Q2OGlUTFlGSWJUeDF3akYwVWRJOEJ6MnBuTTkvT3RHZCtJZzY4OVpaamltZFhrclJsbW02OTF5eXo4UVV0WlBabGErMzRyVUdvTHBEelpXMHBGeDhXbmVUYm43ZGZJMGpUaDl3Y1hFOTYzbmR3RFMrN0h5LzE1ckxwYm82ZVpjRVMxcmV0SnVhQWdDMVBqZk54ZEtGNXFiZnVNQ3RwM2p5ZDZBMllOZUZSMTE3T3VCVXpTbkl1cHZTMlNUb1dsSDE5T3dTTTBYWlJjUEowdlJueWtCU0gwcDZQc3ZtL3kwQWtJQkZIMVF6aTFpcEp3TFdTRmhCRGtLMCtCcWYvZmJNbnpXNXRzSTZpMjYzYVoyTEs2V2xkQkl1UnB2cm4vZTF5UkUzV2FKclA0VTdjZFEvNzJ6dDFjempEQUJMWTB5cVp4MGJsVVJGYmpNNjZqVUZnTFgyWDlaOE1peHh6ekJwY1JaZnhwWEtmbHg5bVFRb3RObm9vYlVJMXdKTVNyczBDMWd5ajdORjkreUVQTTBnVTNOTmk3Q0preWErK2FacHFRbFdpSnJTSnAvVTI1LzhFNVlSNEE2UEllbnllZDlJbWt3aXNtVFZSWmtUOGZvSmtMNVJZeVlMdERZcnc4bU0wK2d2TXNoZHdNMWZBVUFiSkp4VTEwV3pGWHk0UVhqYkZHSzZxZFRhZXA1WWIxT0xzM3R5dFQvVnNZMUNVajQ2cFpjdEEyamlrOVkzb1BUcytlOW5yeisxeWpvamtMVFIzVkJWNTlDVHVpUVQ1a0xYUnZaajZZUmRnaXIxVWl4bU4wU2R1bkY3THl2azloOVIxTHBHbGhaZ2w4RSt6L01nYXRnRVBTdjQwa3drbXlrcHZYNXJVSEVUZWR1bW81dnBwZzI1aUV2aWtodlFpb0MvSkZsMWJBUHgvQzNUY0tjcnVScFRBTkFBZWxLTExtUFVlUXVKRlhDUzRkUU9yTzNYN2FSdkdjQXlhYWd4Uzg2OTZHU2xhRTFSQnRCS0FnS2VIem9SRTc5NVV3K3RPbWhhVEN2NjY4dzIzSWJWYWJ0NmlyVHgxNjRFYWFPcVhBcThOSzdjVUxFMG1PTU1hTW1wbVJTQURmdWhZYkRVcnF4eklpamczRHh2QXRnVzlXY3JweWlJTzFmbVJORzZMT3dNZXE2bGZtbEZkZ05IRjRiaER4Wmc0UjVUZlhiVGwwM0dCdzNSSjM5MEdoU3FtOVY1dkR2WnJ2czgxRWFhQnBxMm9MaHMvc2JMcHpGZDVNRzNlc2s1T2pRRmd5U1FTaHYzTkRCVjQ1R21DeUQ5d2MyaGxpYnB1aUdmeWlLMTdsZktDQjNJM0lKSnlncXB1ek9KNnA0Ylh6eWliUnd0dUhRajBjSklrNGpvK3BMbW5BQkVwUXNweURSM20vTjNUOTM0elNaclpaT2JFa3VnRjFsbTZiQVdtbmg3YzlJMkVRd3Q4RVkzcHZ1M1pJQUpRRjVFUDZta0lvZW5sTG5Sc003bTVlaVlzZVRlN1JTZVR1ZGhIWUdjR28zYU10MzAxblVtd0FJS05pVlRFc28wWG5XZFo1QkVJSnJXbnZVYktmZStLeUhWNFEvRWpTdUs3Z2FWS2pqWGdGYVhCVFRjd3BVUWpmbHB5amdhcGQ0OEMxb1FjRk9aU0tpV0FOYnZaQnlPR1ZKOVJpcGRtb1NmekhMUC8zOWFEN1VHZ0RPTmJxWEFJbFZOK3VXV1JUUmdpOEN4TktacUJlcmNQWGczb0FOeVVzQkwwNFlid09vR3BGQUFjRk40R3AvZTNHZldUdEEwcW9zbU14R1FtU2IycFBIa0NlbDNUV0hKVFBQVVc2eVVLcG5pcEhYcERHNWR6d2xsUk9kRUpIZDlEOTJZSnRKSm51NnR3VUhyUHVMcktYS20wejRORzBtcE01MmdsR1k2STlWMzg1K0dISzdSSjduZHRNRW1iWEFGZFVvcU5iZXlPaVRPV252aFV3bHdncklVbEoxdFBXV0l5MEd5b3Y2a25IT3pJWnNJeldVd1NlVGxEcFh2aUk5VTFPV3krU2RSQmZSbWJheFZTcVVUdDB6Z1Y1SW9FMmlXS0IrM2dNK0FSR1BHM0lUaDh4UTRad0dzTk9BaWlTVnJLVDBOOUxvZFFwK0NkaHNxU3NHWUdJbjBlWk1YMzQwaGpLTUlsVlpNb2k0cUw5cTZjUlJwZWxZa3IyOEgwekk2cmgwY1RncithekpRUXBHVEd3dng1U2xTM1l5VWJxQ04yd2hPcU5PRUVYcURsREdnK3RlZFhsclhmWDE5L1dwRVNxZDFFanFsY29tb1B5MVJLQUNRMTBKSzVWTXQ2MlRFNjJKTkphTGVKNlhQWENtMFVwZ0VXcVptSVJyMGtrUkFTZTZieWlpYVNyeFM2MDYzY3Y3L1EvV3RBd05YdEpkcUlQS3RvOU9GMFB6R0VKQ09PcVd1cDZYV2VhcTdCZTNxZXoyRjMwMnZYWWl0b3l5eElvc2hScUxjMGt5R3B1OUlxWFNpL056N05TLys3N2d2NmRweW1abUN0bFQzcTBVNURldDArSW0ybzVNcWNTMjU5SFZTZVp5dWpkYlhrd0NvRytTZWNBTDMvWVkrVTVmY1lyOUVteXdCTFdlMFZhUmRyOXMxeHB5dnE2VUU2YjRiZHRLbUN5L3A1UzAzVHB2Y3Bhd0pJRXNMMmdXbU5HWDNkbkp5T3ZYZHdKUFd3K0xXb0paK0tqSnpTc2lseEhFNGt4dmwzZ2JaSklCWDc5R3pwQk5KN0VPTFRCY3MzWFNxNFpQN3lSS2dGaFdWVXcrZUo4VEplcVNPc2ZQN0tRQTQyNiswQUp6Rmw5TklOTS83aFpvOVA0ZHVUQmNjbkt5VXB2c3M2OFVKYnBhTUxnSE1aNjFPei9SVWNhcHFyd1ZOMXlwL3JrK1NuaTlxUzRlNXBXQ2QzS05UQUg2Uy9ITkpWWmQwZitWR0NRaHpjdDRrMUxtcCsvVjEzUno0czFPUVZJM0sxV3NBYUNPMDBvbXZIWTlxKzYwZGRVM2pRRFBrbTNFbVVYcVVxVGxYNXFRYWRJcTdwSTl3YTVDQXVjVzJyTm1TazE2am1lVzJjclZKbWxOVzVmQ2dsdjFaREtCbEFWVDNwNU5HYTlja0hFbENoNlhsOTd1bnYvNWRwY0RVTis0VzZydjUzL3BmQThCaWowNExsMXFmblhTMmpaSnluWGdKeENVcXJqbElVeDFQMm9Qa0dMUm9FTTQwM0lHNGkweWQyc0dUTXJacEpScDJrN0tCSlFDY2EyNWhjZjRJQURmMWZvcGM3Z09jcDFXak5rN3ZmSDJnNXdkTVdRVzE1Q2FzWStrbVhCZ1NSYU5kQUxnOXpSeHdxZ0NxZ2w2M3ozSmxZMmpFV2RKckxQU3Z5NHFXeWJpcFZWM3ZCWFhWNmZxaWZva2JvOXFsZEtCbUlrZmQzWUNHS2FERURPQTdtdXVseGlCcXcyMG9yUVVKL1d6MVlQTGlhNHZKMFdTdFpsZnZBZFhmdTFRNzhlVXBrS1pBdXd3d2JYTWNIRlZKU2xHWFRkRThReEpFVVRuZ21yTVNHSmo4RHZRYTFJQkVnOENyNUNRM3BWUktyRjluYWVtOERkU2hLU2xTSGVheWd2WFBxaks2blYvV2hoWWtpc1NoeXFuR3BCdnNMTGNUVHBBeUlhcEpuYkxSQlFGS0w2bGVXeTNYWEJCdzlTSFJ0TzZrVEtkNkV2KzRBT0NzeDlZQXNHNHlDb2duOEtmVGs5ekptM3dOWExuVmhGdHRUMmtRYUhMbU5xbXBLVWZkNnp3MGg3MEpVeElJc2dTR1ZDYzFtV2M2bFoxQlIzTGJTWFdWaS9ndStKelpnNTc4aWdVMEZxV0JkemZCbWRSdWVtSW1JRENaanB5dnE3ejUrVE5uYjBSYVV5dmFudVpRMGdTZHBHVjU3NFU3K1ZNL3l0SkZtVVJVSjhqc3ZyZmdERzNRQzVuRC9KSUNKeCsxUmlra21vOXUwQ29SWFJ4TzlNTTFCNTIwdUZ3QVdJZEx1QjZKeFMwM2FmYWJWb0lvSjBMckU2cnZERTFkc0d4YUNqZm5zS0hXeXlKT09GVXJNU2w0cXlWYUUxNjV6WmtZRC9wTXBDclVnT3dDZzFNTzBseUdSRlArTmhvczBSTnJSR3MvMzhRUExTMGs5SFExMkd5YndFWDBGTlVwSzBqR0p1UWhjQzVhRnppSTkxMXdsOVRPMm1iYzArWjNBYUNKclRSRFNPQ2RZakdwN2RkOTM2MW5hZzEyc3Q0YlQ4cTBkNUxuZ2dzQUwvQjlhZ2NvNkRUQStEeEE2YjcvTmhpRStxYlh5THc4cUhiNlU1K3pNK1ZjVEJ6WFlOVW0xcVJPUFYwODVQL3UzSU5TQUdodXMrMDluTUl1elh0SUFYYzFIbldDbExib2RVT2Q5OEJkMzlLQ3J0YnZTdW1lcC8rNzJTam90cXlMY0tTVVRiaDdRcGtCemNkMG4xK25RdFB2L2VFSFFCdGhzWXNtSVFJSmlweWd3cDFVN3ZWYWVuL08zSE02aERaYmZ1RlFxWGU5ZFErZWk5bzE1aml2L2NXWko3MmYxcmR2alp1a3dvdi9BcG1yMEtKdTQ4RmFMNzN6YXFUeGNHVGg1b3hUenRmVG52a0c1SzJtdU81VXBudmE3T0VTVmF3ajRIUy9wS0Q5ck5wa3BieUl3NlM1N1VsWXRIRFIxQngwQWswdUEzRHF2cWJPY25MbTkvK3BpNHM2d3haZHVwdDBSRWorQ2hpNnRGNEZTZTYxYWRNbVh6cjYrM2xmRm1jYndwS1UwdE51djVZWnRhRFRCcHJlakZ0ZlVQa0VLSys0UjVOWE56L1BYd0ZnbllUYkJERjY0bWdxbWpUOFpKeEJ0Yi9MQnM0SlBTMDFhOWpBRFpDVFpLUnBabDZhZHJSb0syN01NTnNtSUlWaU1zZEl2bmNyaTZNeVhLZVYwTVhybktKZGVaRUdzajdQVTkyQTNENXczWlR1L2ljdHhVTDVyazFLeEZJNFphU0tvVkFIa0VDc2RHcWVmbmphSmJWRTQwVGhOWXZubHVZa1lLOEpLSktPWG1rbVN2ZVZYNmI2TE0wNVdBUllhMmFUN3JtT01kY3g2K3NZOVFYOFRSc285VTZrMCszTVBONlM4SG1lWDM5M0FlRDhIb0drSjh0Q3p5UGhDTVFZT2RkbTU3YVYxSHdKWTBtNm05OTBBSWxucFJIZGRNb3VxV3VUa0xvQVFDZC9ja3R0QzVNK2MwckpIY0xxM0hqY0g5SVcwUENOMjgyZjJxR1hPWkR1eE5UTnNaUnVTMG01NkVNSWtFeGFnZGVWNmNlUEh4Ly8vUFBQYi85OS8xQUFVTm00VXd4cWZhK1lUdG9IcWxSMGpzMkVBYlgxVENJdS9SeG5lZndrKytWMTA2WjVaYzFWNXp5OWt4Y2IxWnNrRVU2MFZ2TnpheHV1R1hza0lKQVdMK0VVR29SU045dmlqK2VvVlBwemJnd2RmdEpBVlZkK09OT09sTEc1ZFhiMmcraHpQNFU4Zi8vOTk4ZnpQTC85T2JNQitxeG5tdXlHMUdobTV6YnNxZ2c4VC81VCs3RTB2Ym1BbUtoV3hjVFFFWWdtNEt3MWVlSlVteWhDVTgvbEJFdmdqWUplVGE3c3FDUm42bkVLTlFpN2NHbWVVOTg1aE52Vnh5bkZYTUc1TkZBaXBmaU8zbk1CYVJGT09hYWlEY1c0Q2Y0cUEzZUJURGU3K3plbFp4MkRvMGFyaXhlaUJuVWEyTEthcWpxdy9FWlMvcXlkVnFreFpGWE1uWTY1MUp0T0k1dlR6SFRhT05UamZtTXg1Ullzalc5ZTZCcmQrSm9CSkdaRkZZTG55YmRzOU9WN3JoelE1K0htQlJMemtJYS82SVp0c3UvbDg1elBTTk42RndBVTQ5QkFSLzZCNStaM2JrM0xXamhQLzVaQk5DYkYzYStVMWY2aEEzQWI4cXh6eno3ck5JNmEwbnlIbEZNYW1vWXlMTTZ4YmxDSmJ0aWJzVlBMbkxWbGpqd05lM0JXVlNrWXBaa0RTeWxBcVRWdC9EWWc0M1oySTlscUU3N2plRzJTeUtybW9XVUF1dm5UZlQvZjc5ejhxZG5KZ2V0bnZVOUJ2YkU2Q1RkcHl0US9kQUNMenA1a29hMUYxaUhsaWVacjRNOHk4NHdtcXlRM1hrZU42VW52MHN0a1BlN3V4L202bWdFc1ppc0VNQzJiTWVFaTVCS2t6M25scjIveEpLcjFVeHU0ZTE1NjNZb0JFQkRZdkJxZDJ4QXBOeWtRL1B6NTgrUHo4OU1DZm92bGVjSklYTFpMZzBYK2tBSXZEOEpOTXRIRmNmWXZxNi9hNGp6YmdBNVNvQzM5Qnk0WU9HbXBObUs4NkxkdTRMVVB3YVZkNTBOUmV5L2FNSTRlU3Erckk3UlNLZWNDZndKak5XaWxkSitFVmFrRW9WNE5WK3UzYXovQnYrVzVOY05XTW1ocGt0djM1ODhBa0RMTXRTeFBtWjg3VEhRZlA4bGNRSTBpRTNCRTZhNmFUSklURExXYnBrNDA0a1JiRURrYk1CSTNUeE4rMG1DTUcvbnU2Uk9RVG5OSEQ5R1lNakpEdVEyMFNnVlMrZVN5T2pVeFRkbEpDNmdKYkU0MHN0TUEwQnJUZ0pMbVQyZ1FjR1BzU1ZINlBzYzNDS1JKdm90dFBBbWlISVZKUC8ra0dYeHR3U1NEaURUTHpEWFROQ1E2OWFQVDRNcUdINmlURHJrUXBVNnpKZTExd3FqRVVLVEp5MVJYMG9tNmpOUnlRWTMwR0U1em9RajV5WFV2VFViTExBZ0ZPbE9XUi9VK1dZOFQyT3hBNTVRSkpQV21Ob0pwNXBlR3ZTZ2JSQm9BeDR5ZERWRTJBTFFCbENrNk9kSEVNbFRFbVVFcS9iZFFVbTVxc2I2djArNFRCMzhUQUJhd3JwMWdkS28yWldaTC83U01TV091RWlDWVRtVzlQNmV0Rm5uNkVYZE5tWjBETVZzWitBWUFkL0tUTDJBN2FCeG82NTVQYTlCeW1nNmlXZlV6T3FxWWVqYmNQblA3MEFhQUZYeHpjdGcydVRjdFBCcm0yWHI3WGVOSm1oNUxWRW1xclJaWlpSbzJzdkRkcWVaejlXYWpQS21mZnVYWG0wREh2YTU2M0RrSFl5cWpxSWNqZ1pTdTNrMTAzMyt6OFpNWElwVUVhZU9uM2hoeVpscEJWUGRhRG9UL2pRWnNpTENyeXh2RnRTNmtGWmhKa2QvZE5KY0ZOSzM2TW5Zc3VSWWwzejZYRlRUcHB0dElaMG1obTA0Yloxb1BSQXYwMmt2Zm5tY2FGVTlwOW9KUHBPWWRGd3hmME85c0VGczZITnZtcHpYanhEemtETld5UjVwaTVFQmxva3JiWWYxYk0xQ2EvTG8yZ0t6aW9HWHNOLzAvTGJSMEtyMjY4S1pGYnd2UWdZM050NjIxbEZLVVR3L2R0ZnV1cHFFM3VvYW16Ny94Nmw5UHE1c2drRElZVjhKUUVIQWxFbDNqUW04dXoyQXBIMTE3dWY1SncwbFRqOENaQlR4TGw5eWltbXNhQWlkNGNUVWcxWHZyNXRlVGtSRFpSU0dZcGdrMTZuRnBzVTRVM1pyMkxlVkphKzVhRi9QU3labEtxTFNoeUZBbXBlcE5sTFhXL3JUK0VnM1kxczFhUmpyZGpHTlcwcERZWlgwNGJZVWREOTRlV3FJa1d1cVVzbzJHQWFSUjJoUzVxVHZMeVRjcGlpNFNUV0lJVm0xQXd4MGNDcnppSXd1NFNIaUpZZ3ZycVBjMlZOVEppUjBPMEdUZUtZTk1nT3NONXRTOE1Xbnp0L1hyN2grWjdUUUZaUm9BU3RxSjkxay81T0N6TEs3R1I1SkpnK09BblFLTkhzamlEK0Eyc1JQZmtJYTcwVG9VTUZhaEV2VjdyelRqQ3RTbUU5ZjVFenF4bERiRXRFV3FnSjk3L3FtV1BaV2pUcHR5NGdCSmlkbitUYWxCMTBpVE5qK1pyTGJaRTVSRkpIczkwcytRWERsaGJ1ZjlmV2dJeHcwQ3Y0QkxpL0FrSWNOTG9IR2E4WE4yV3BvTzdJSkNTdmR2U2libjBMS0ltWnFkbXQ3UE50aWtjZE42ZmVlR2NJc3JuVGlrUkd5VGRad3NPZ1U4NWZpVHpzRUZFZjNqOVAwcGN6c3BWN0xXYitVbTJiR2x6SzBKelpZOS9Kc1E2SWFlU3JXNFMrZG9xaXhaVHVzSUo2Y2RhS3lGTzJVSkQ2QzVidXRrbWh1SG5NVjFxR2tIV3ByYkZwSFRGK2hDWG0yeWwrRVh5OUJTR2thejF2bHFXRUtDSWcwQXFuYThHWEhmVkhnSjVFc1RvUm9ZdVc1K2g0R2RlK3V2di83eXBxQTM2R3dDbHVnRVdHeTlTWnFibEl0a0M1NkdpS2dQK3hKMTIrWnYwWis4QU50OVhyT05GWUJNNkROZEU5V1hUVkMydEtZdU13NGJkdFNrdFN2ZDE4WnRVOVp6WXhCS0hoUkpyTFVZaitpQUZwZGQvQW9BcVlHQndJMkdGVFN6eWlVQUpILy90UEZKVUtLTGlqemU5S0Uyb0c3VlBheW5NcVhZNjNzNDl1QTdzeG9XU3RNaDFLN3ViOHlKQ29rV04xdzM2bndCaVZkdGlyT1hUOVRzQWc3ZWFGQVMxa1daQjRHYUpNVDYrUGp3Y3dGYTExNXlabW1VU1VwbmFTTzdza0l6alROZ0xEM1ZwR0JzWlVNelpsZzNtS3NkVjNFTnlVY2QzVXB1UjZuN3NBR2Z5UUxyUm1PUkRvZVU2bEttUWxoSW0wYWszWjZwQkhNTUNqbjZOSzFFb3ZGV1I2ZEZXNUhZb1dkSk9jbjBjK2tMdi9HdGExTm5VcW5pRmk3TjUzT3kybE0xNkdheWtYQ3BaUVR0UWFYZzRVNTBKN01tL01ZcEFWY0JEZ1dPMHlHM2dXUExnWkFRZGJkUlR6Tk5HaVNUYk9iZDliam5uYXpaM0JSaUovTWxESUdDVmNPNGlFV2piR0lKeHMraVQwOHRwY3NDVGxGc0VjKzAweUdKSzBpTzZib0gxVEhWbFQ5SjdMUkltUnR6Y1d0aFJ1cEU1NjkvKzZXTDNHa29Fb2ZkaEV4dFVJdktvbldTajY1Um1vbVlVdTQwZzlFOWM3ZjV6M2J0eHJnc2hpb0xxMGJ0M3E0M0l4MHN6N0lwbStYMmdvQXZuVncza2F0TmFTRXR0c3NJbktHaVJ2d0ZvRnZvenlRN3BUSnE4ZFpQR0V3cjR4YXFTZnNQbXFmL2duZmNCcU16Qy9qNCtQaGo5cDhMUENrb3VkTTlOWnRwRU5EMjNoWUFGcG8waWV0b0RTVU5BdEdUNzg4OTZhUnlxUWFsOVpRbHRHRWZWRXNtVlJUUmVRb29VUUJvbzU5ZEQvL0NoaXlpSEZmcUtQQkZ4cW51ZWh5R3NIZ1Z0QlBmdFJYcmFVL1lndlBzU3hyNUpmdHo3c25uRElBVEp6cXB6TVMrNk91bSsramNtQ2dBSkxiRDRWYVV3U2Fnanc1VTBnSFEvWDBXcnpmeS9VOXBXK1A5Q1gxM0hXN3JYSGk2K2RTUmxmclBTWkRTU2hPNlYwdXoxSEo2cHl4c2FVSnA5K285WFU5UlRPdEtJeEZUZTg1dTNhV0FwTUdIQUd6aXhoc2xsNElvWlpLbnZWY0tBRzd6SjhlaGRhaExDcWpMNGY2b1FLQWhpNlRuWDA5QkNnQ3BzNDZVWVMwNE5EU2JncDR1L3FhbVdxUHRTdU90SUpCYk1Ob08zRHdTM0wrcGhYbGlWMUp6VEh1bUtTZ29rK0VNTTliZUVOcFVpeXczWVVxRVFSR21RTTh6OWY0M1A0TGs5MEQrQUw4RmdOUmIzVTY1TkNUMFpxNmYrMUNucVFLTm0zWW1JTjhSTXJVcE5HNVJMeE50a21pcWNjbUxTVWNLanE2UnA0MFZkODA2SkpJaEFReHQ2QVZuY00xSVo2M2YrRzdxQ1hENmxkYWk2elFaenRKcndZZWNOcVZsdEdrQ1ZLTmdVeU9TbHRaekFIQmZxUU9yb2VDYVlpK0lNU212U0ZGMXMvbkpadGsxRURsY3dxV01sQkhRakxsV1Z1a0NKbEdOQWt6dS9tcHFyL01mdEhlQ1RwOUVHN2FwVXU2RWJjQ3pNeTVOTnQ4SmJ5TERGYXJKblRzelRZcHVYcHR0YXBZYlMrOEVZdTN3YUh2ZytTNXEyMHdkS2NWZTV3a3FRcXVxcjJUTDVMejNDUzFPcVQxcDQxY3NvZ2t4WENQUytmMlVnZEI3RXhxZUZwaVdkeThPY1BMOVRkZXcySmluTGsraSt4eW8yQ2I5dUprVm1pa2xmVWg2eHNuVGo0dzZxRkdMVG5zSHFxYXlOZ0hiYlQ4L0xaMjltZVRiZVBFMCtaY2FHaHppdkpRcVNVMTJVd1kwc0NXVlFRU0dOZnlqK1FlUVNZa0RtNUtURUdVcFM0ZW5ZNGZPVGFWcHNzczJVcXV5L3F5alU1MTBYTTFsWFZhNDJIYlJzQTYzbHRKOVhzcEdwMHRvUFFZTjRHNWY3N04veUlRaGJYN1hSNzFhaGJsNnJia0dhOHIyWFRGTFVtV1JsWGxUT1o3cXdXWTVUWnQvcGU5dVhJSGM4QXBuSCs2WUZtY2UyZExxTnZNdWVmQ25iSXBPUk5mSjUwb0FKLzVheFR4TmdPVW9aTUkwbGhOWnI5VXBjSW1aY0FGc1dTZFBNbm1namV5aUw3WC9Fa0NZYWhWZG1BbndhekxQcEpUN2prMTNlaTluUWI0SWJScUg3M0NTVkFhbFV5N0piRjBOZS9Mc2FnNUs4eGxTQUtESlBrNmswemIvTXNxTXRCVzYrYisrdmo0K1B6K3ZUdEVrWHlaTVlSa3JuNFJXcmVRaTkyRUt0aGdBYU1GUi83NDdGVngyNFpnRXVybXBSenh0ZEFwYTdnU2t6M3l6TUttMmJsMldycjVMOVNOMTJMWDJXaGNBbXJWMk90VmNFR2dOTXUvdmFCL0JNdTFub1VXSklrMGI0NXpVbzlONmJwV2ZqaDFMM2JQdGRHOXJtNTQ5alN6REFQQTh6MFRWa0FySitiUzNra0FqOUdLdDdlYXJyMzM2cEFoYkpNWjBreDN3ZHVNVzFFdzAxVjkrclNFMVlHc0ErUHZ2dnorK3ZyN3NETDczYzdtdVROZU5wOFl0bXNLUzFwNTBKVXU1MkdoSDFUalFJRTRkMDZWVGV0dDZJVW95UFZPNkIzb1F0TUd1UzJ0eW1sdjRXd0Q0NTU5L1lyM1pldUFKSEV3TlJJc0Vjb2wwaXd0dXVyR3RqeUExRkxYVG9Va3luVU9ydzBCY2ovd2lkS0pKdHUvbXA1TG9EQUNrSTNBekdOdzFMTUlqa2hEVElhTCtoQ1JrZXQvL0xFZDBwUGViOWpzcDc1cWxPdDNFRFFwUHJOTjNHcmlhMXNOZGo4MEFuQ1hUQW93a3QxVktSYzdUWjFGU05mN1VhUVZvN3J0N0lIcHl1UUNRV0FmcU5pVGpVK0x5WFZPU1E3THA5M1hEbk55K2t5YzdOTnVaZkZLcHNvd3pUL1pWTjNVeWxUU3VYMERyL0hPejY3OFJ1TGVVS09sdy9FNXZCbzIrdThrQ0Z4QVpBMEE2b1JQM21ES0J4WTgvZFhDbCtXc3BDRGhSakdNVTNLWjMvOS9TZXQyc3pRbDUyU2dVTEtpY2NJMU5EbHhOeGlHTmRsM01LMG5pNi9yM2t4MFlCZU5HczU0QW4yWURxWmMvSFNEcGtFejI1bW56Snk5S3doWFc3Q0o5WFFVQWR6SzVCWFZTTkZvS3VKWkpvZ1BQT3BhbXNTNEJ3SUY1eVFLNnRSRzNtaTdORFhCVUZaM21tdTRtalVONlZob0EzSno0cHF3OG1RQTZJUk1kUlZPTXovVkJ2ZXVKdDllMXFtelV1L25QV2wremdEUjBOV0ZWcVpiL3pvd0dzcVZyV2VJS1NydWc5RWNBSUdTNENTVGNnejBGR1NSaDFKUXlEYUp3NE5LaS95ZWpENlc5NlBQZUFrVDBrQjFkNWRJOWx4Nm51blFGTGs5TXdkbWtMMjdPcWZ4SnpUSWs5OVhuYzJOTGRqSUtUbFIxSXZ3SzlwM1BsQ2J1a0VGb0FzWlQ1dlRkMmw0L285cVhrM3ZSUWtFK3lVbVZOTWFxMURzSFV5WTVadEpCbjRoM1VtR2w2MnI2QmRkUWxNUkZLY0l1OCtSSVdKV2FWUm9UczdBV2ptWnEybnlxV3hzRG9RR2djZFpuQUVnTVFMTE5WcUNUNm1kWC94TXJRQjJCU251MlRDR0oyWkxPSTVXL0NhZTY4WTV3ci9za1VVNnExOC9BNGNZME5TcFFUK1BUZGxGWnZHb0FBQ0FBU1VSQlZFbzE2R21CcGpxTEFvanpkNk1OUVF2VnpaOUxrbGxYVnBIQmhjTlptdHd6ZFRScUZwYU1TRk90bTdvSWt3NkNUdFFtNFc0cVIwWE5YZm1VMm5kWCt6VVNVTG1mYVFEYzBscE96QlVCMVc2dmFITVhsUzNWRmp3cDc1Sk8yMFU0dmREVDBrbmYrd3dDWjJyMS9nNmw1RXRXUUY0RDU3U1oxUFdYWmhrNENzdXhJV2RLVGljMVlSNE81RXc5NTJuTW10S0JTWFNUbEd1YTRiam1xVFQwd2gxRWJsYkEwbVY0WnFiTGNCZkt4Rnp6R0tYMXpZcTlEUkIxUXFLV2pkTDBJZ2QrMDRINk5HMHluVHBKbkpHR1JTUmFqbHBWYVZIVGVLV1dWcnZVaSthc0szaW1ZSjRUZ2JoNzQ4QXBHakZPakVjS1dpMVRTazFQS2Z0SlFhQTFFNUdId0pwMVVLQnhKWlc3TnluRnB4SXBNUzNFbkZDcmRacXkzTmdWZDFBbDYzSEtabHViK1VOMVR4TGRuRWdub2RuNkFSUnJjR2twSWNXVUlsRTlSb00zRTlWRDNIZ3JBNXc5T0oyOFNmcnBmUGNUdjc5dTFKVnpwb25NN2JVZHFPZnVRYU1YRzVLdHpUSDZtaTlMb1Y0TEJKSTVmSUp3RFBwOERqQjF3UEx5SEpaRE1hMWpwL2hMamtOL1lBQVVjZlVtT3JYWU9WZE5mNTcwMENxRStmajRRTC81OUNBbzYxRHh6TklscFRlTEp0eTZSWkNtRlNXbFhLTHZHdDFEVFRBcEhVMGVEVTY5MlVxSGsxWk16VG1PeS84T0FwNFVkMitwMENqTnBIdElKWklyY1p6YnpvcW5MUm5CSXJCYXlqWXE5WjlHK3luWFR3dHZ0YU4yRzRRNjFaTEFpRmdBeCtjbnFpeGQzdzNZNXNvako0SnFxZHZDK1pMZ3l0R3VxNFNaRnUwcU9GRVJ6Mm5Za2N4VXlDcmVyVXZLTm1pMlhob09zNjRGK3N3bjg2VmxFV1hWSy82d1RHbGFNOFBFS3Z3UkFGWS8rWmJtTmlxbk5lbWtQZ1FuVjAwTFdudjJsd1dkT2daWDJwRmswRXRwY3NzVnY4RGwrMGMzbVBMbHJUMTd5Y0lJUU5UUzhMd1B6dHFLN2h1SnF0endUQ2NrU29ZWmxCVXRjeERkaGlUOGJBSDhiaFY4TFpOdFEwZDBQVDVwcUlDaitaeWxNZFhxNjF3K3V0bE5LT0k0MEhQUjY4eS9Nd2pRV09aRjNFUGRhQ1Q4V1dpdUJoSTVvUWxSZmt0ZHZjeWJPeGZ5ZTZLM1JVZTlJTW1Ib1RXUE9kcVU4QlJsQzA3T241NzlZaGlhV0NaZDcxVGV1R2QyTW1FcHVGQkRHZzJmYVExd05nTndHNHFtN1M2dGoyNm9oTnZ3UzRjZGlTWGN6VkRMcS9jNlRwTUttZzZVb21jQ1MwbXR0YVIralI5K0tWTjN6UW1vb3pTMVpVRTBPT1BuejUrL0RlR2d6TkFaY2l5bDFPSVo2RGJUR2V5YklRcHRiTFZUcHlCUEhaL3B0S1lETDIxT1paOFNKcGZjb3R2N1BLbk9YRHovaytmYm1mTHA2ZVJRMHFXTEwwVmVHc2FoL2ZDdXV5OTk3cFQrdGJsM3R4eDBlMml1bWFiUmFRNk5iK1dQbTdTa0dJZkRkTlpSM2NrRGdBYXZ1dXNpeFdMejhTZmRDbTFnQWxGVE5rdGVGK3NjVFNwbktjTndHRUxMWmg4Q3lXNkdXNUs0NWowdFNBeWp0QmVkSm5SRDF3Q2dIV2YwWitGOHliTEpxY2VTbXE1aEs5VGhkMlkyU2VSRE9vWTJVSldRYjZmNlN4bEltLy9RU3F4bDRqUng3azA0azlpYTFtT3hZQ1JVOXplR1lCbnQzWENzeFRqbXZJWW51Y3EyR2VXMG9Va1VzMzVJaC9ZdjAzTVRZcXp6NU5XN3JyWEt2bjgvMDAzYU9FdnRSUXVDTEsxVDFDZUQxdFpVczh4UTBJRDYvdXhML2JyM1RjODgzYnNia0t5eEpNbkxnZlFLbWttb3ZYeVMvOUtnVHZkOGFhQUxyUnUzdnR4YVBjSHVzL3hPbyt3ZmQxTnVUQkhTSWs4Tk01VE9PV1BOZG9KUStuWGVERGMzNEt3ZlQ3TU1TcUhkQ1VUZzVTMmk3d0pBbTBYZ05BQkorMDltazBSNXRubzJNU0NMVXpTbDBZdWdxWlZMalRlbmcydVpjRVhCa2RxWmsxeTRaVWJMaENWZGQyZVFiaVhoc3d6S0lCdm9KWTJqYmtDNmtTNjlYK2E4cFd0STh3YjA1MXNwY0o0STJveENRMUsrTTJWWTZUUHkxZGVOcjFxQXM4dlMrZnVsU2N5dVZEdkx1aVdMVzdVSEtZMXVjdDZiOG1JZFU3YUNwZTRBVFljWTlYT3NucHczS1QvaENtZkcrS1FJZHp2TU1rWEpCa0RkTkUwa1ZxR3BxM1JUNjl5NVZWWDFiZ1JGdTVPc2xtcHJQZjJJbVRqVDFEZkNuMkliblpDam1aRExBTlJIcnozblJZemlTaGFuQkhWbFRBTmMzV3U1N3RKMjNZNmhPcTk5NWR2MTkxb0dxMnVUOEN1dCtkZk8xYVFPZFNYYTQvamFaRWhCNmM4YUxDZ05TeHA5WWh4U1oxWmpEczZOY2RhenArdFA4M2RibXFTYW9LUmxISFRkYi9CNm51Zlhwbi8vZm5ZenFzcFNRVi85dDVibExjTkdrK3RUVzd4TEtrOC80NHhpYWRxUG13M1kzck5OYm5KdXgwa0tmcGFkbEcwbi90OWxwN1Q1cVYzOWNjQ1JvK2ljQzQxRHZwT0YwcHFTTFhYUnpUaXpsTEtlT0VIeWMzTWM4eW1Pb1JLZ3FjV1VYbk5JdStPcjNXeTg4MC9xRmt4VGdkTU11MWFETjdEeXpMZ29xQzM4dXZ1aXprUTYwY2xvY3hILzNGeFhFOGk1Zm4zS1NLZzBKMzhLeDNMOEVRQmVTekJTTTZYNTU4azg0ZjArS2J4VzdYbWFIN2dvOVJLYXFuUmxHOU9sQVVCbHQzVENhWjFJVFRISmVVbGZNMjMrczhkQ1JTNnU4ekxoTFd2TjZaeUJGQ0J6M29aRVpTWjJLbWtENktCS1pVdEQ0eHV6czdRU1U4YTdTb1RwV2drSWRqTTdYUkJBU3pDbkRGeS8wbVNnbTRYVkltN3JmMDZHR3VraHR5aThvTEUwSVRscDBjOWhGaWRiUWFtZDF2N242YThablFZak55VklKYVROQm8xRVlRN1ZkeVZhMi94TGNGL1pDd3BjTGxnMWo0WEVBSzNack91Y1RYdUFNQkFLQklSQjZmVS96clYzN1FoYkxaNFc2VERwQ3R3Q2NrNG8rbnJOVVNkNURaRFNNZFhyN2tGUzFLWnJJbTczcEhSMHcyc3dJQnB3Y2RGTnN1M2x1VksyNUhvNmttZUFHNGFTTm5zNjFaY1pFeTdGUG9OdXF2MmRNL2JDZEowNmxKWjV1TTl6NjkxQTEvS2tzVmxOdWRZb29MU3hVMTk2MDFlblU5aE53eUhkUDdVMzN6alpLTENVZnRiTnFUdEJ4eE1EU1A1d0NnU2VRZUI1SGpzSElVbUx2K05VdThpa0c2VkZvaWQzRUJITFE5aFFTckViNVhkbXNOcGVuTmlRWklxajE2bkdwR3VadkZDdk44emRzNXpjU1VUaGpDRFMwTVQxZEVrQ2xJWUt1NDJ2dGJhQ1pIUjZPaHJPcGJpcjUzc2FNNllnYWhQWXBKTEFMWERYS1pnMjZWSXJFd2F5QXJycmdlUG9NZmQ1aU0xcXRES05PNmRONVJnSDk2emRtbkh6Q0FqWFdMRVpGd0NiTU8zZmYvLzkwdzhnK1pzVDVlWHFqalVkU1ZpQU8xa1RxdXZTdWdVd1hOSlptb2kwT3NzbXQ5OFRMM0ZCcWQxUG10Uk1EanFOM212Z0o0RmVpeWduYlJKQzZ0T1lyRFRmTVZIQnJkd2hDdFBoQjQyK3BNUEplUWFzUFFKMFgxM1FJZmZwajQ5ak1NajV3MjZFc3pQRjFCUzBjYjFOUkVMMVlBTDAwa2lsbTlPbkdabTQwY3VKOG1yWGtBQXpzdlZlRFVEYndrNVpTWnEzNEtoRG1yZEFPQTdaaWJ2clM5TncwK2xHS0R4MS9hWHg3emNxemthSFVnQTRkZnkzMUhoeVowNzMzMDRIcGtYNCtmbjVCNWh6VWxHbkwyQ2phNXpvNGdTSTNPYlduMThHWkM0SWNXTVc5T2JxTkJreVpsaXlnamJKS0tHNFM3ODhMZkFtNEdtcHAzWWlOaGZubGdVazBEbk5MMUJMOVZiM080V2VBM2ZYTmVYTWJaMHE4YnlIcWZ4VG9jNmllVW1DTXFLVjlkK2U1M25RWklLRVFPZm9MK1dlMCtMVWlKY2k2YzI4TThlbHR6clN1Y0FrTitIRUtpdzY3cHRKUml1Z3MzemVsQ29xQ0pYR2o5UHpKTHV2eFFrcERXcHQ3Rk1hNmQ2bTlyaXNoVXE3TkxJdGJWb1h3QklvN1FidTZHY2w1MkRDdDlyNi8vajQrSGhPRVl5YnRrb3ZTbDFvYmhHY0ZKUnJ5Q0c1cnJZMTN0U2dDMktmQkVLTC9yMXRrT2J4djZhVmF4Qm80RkJ5bGxsclRhZXljNDFLaTJOUm9zdUlsazdYNFFJQURTaFphbTgzYVVnemlpV1RKR3pLbWF5MHpNbU5JRk5ROGthcCtEakRqZk1rT0NmeEtOK3BYSFQ2RUE1Z1ZKb2xQWlNFeEs2QTA4M2tWVW9wRzhwSzc3dWFSdERHSVRhbExjQTJWSFZWb0xXTXppMVNFaGE1VHNyR0N0QlVJUmRnVStuUWJNSnB3K29NekpVT2Jka2t2Y2FKaGVsR3A0N1daZ2hxQThCSkdUa2UrdDIwcjVjZUljK3U0MGczdm5zQTFEMlZoRGZFSzk5dzFTa2pJSlhWQWtxdGl5MjVMUzJDbThXendRR1hkQzJwY2NVSm5Ham1BVkdsT2dvdDJZRzdhYzR1OVc3MmJNNGpNWldYV2twUXplN28xV1JiMWhxbVNMTkJCK0RxK3JOa2pZOXl4dTZOSExXUVVsUXlGWEhwbU1NRm1tZmNrdmJlcE15TEk2K0x3cTQwY2NOTkVoMUZWTk5pcDVXeWhUYmRhVG45M2QrL3ZyNStHK1crQUh3TFBleUNRc29Ba2psblUzVTJsSjdjaEtpK1hseVlISmp0Zm82YXJGcDNhcG9CR0FPQTR3eWRpYVlER3dqOXBvM3NUcndHQUwzWmhadHJUMVRiVFNjWk5hMDB4eHBOeFdnRVZlbzNXRS83bHVHaytycTU0R3BLVHB0ZnM2WGtmcE53SGZwekJoVjFWU2ExcExzM1JKbW0wOWdGZ01WTldMT2FORnZEMWVwcHRxVm1uRXNBV0F4VzlIMnRGRmpOTTVjcHRZNitJYmRnamRKMGd1Z0RiZkpIb2lESlB0d0ZHNlc1SEpYbWd0ZGlaSkl3aFhTQ0wxbEI4eTV3R1pyT1cxanEvdVJxcXh0NW5idDRBdEV2N25RMkxibE5SL2ZpVkVLbThWOXRVRWpDVFJ3RlNZR0d4RU11cUZKWmNkN2JSYm03RGgyMUFVRHhBQmNOWHp5Z3BaZko3RURUYlJwSmxoNzJZbzNkeWdWdDlsRi9BSmVTcmo1MnRDQWNGVWt0bzR1R29BMW9hZmZBMWR3SnkzQ2luck1GK2J5SEtTaWY5K0RjdEtvT2RNRkhONGxLb25YRDNRckxrdnF6c1JrVUtOTitVZTlLWitUcE1wL1VWcjFvVDU1VVU2azQ1K2ZQbngrZm41OS9zQUwwWmluTlBXMjFWcHRzT3UxWDU1cjBzTFNHcENCd0lzR0o2bHBweEFXa2RQY2xzUzdOTEpOMEYwbjY2Z1JZenFMOHZDL09wS05acEpGR2crVEI1M3VyS3BWYXcyOERnSlloRHJ4YjZWalhXcTdyUzEycUV1YVdOQWxMKy90REUxeUlFcUZNUWRNd2N0aTVOWjV3Qzk3TitXdGFjSmNHM1RRYUxUTVNYQWZmTGFmZkZIMDNhREJoQXE1OU5iMEhNUUw2T3pxaTI3RkNWSTVRUnVQYXY1ZVMwSW1FRk10YUFnQlppbWxwdWRwN3QrbEV5cEF0VElBRHplbHcwNTk1bWdtSHByN3VKbW4wY2JvQTR0K1YxMStDZ0JzNXZmUVpwSWZUZ2tNVGViUmc1cktwNzI3NHByZElRaFRseVZlcXlTblhISEx0ck5HSTNpWHFsNXlNSEZQVktMWWx5RHVjSWNuT0hhaTNCSUMwVGttQXR2YjhuL1RxemFIeTNDalNQajQrZmt2YjNlQU9aMGVVZXJDWDlEZ0ZnSmQyTzJtNFZsTGNwdVR1ZDlMWWJaS2lKZ2x6eXlob2dHWnFobHBhYTkzM1Q0MS8raDNYb1plR3JUWjdkMnF5U2xRV3pYMmdRNlVGL3JScDNIU29KbkduMzNFbGpmWldOSFpqQmY0U0svRGNBa3Z2eHRmQkZha2UxdWtxNjV4MmRlOVZzTWRwK2FsSkozSENMV1Z6QzNRWksrWmtzYW9UYUxQK1ZoeWtSZjJteDE5WWhiVysxWk5wS1ltU3ZYY3JjOXhHZE5oRjBucmN5S3BkZDZnR2dKUlZhdFpBQnJKckJ0QVlvUFJabmxRZkxCUlZvcXJTR1BIbU4rajRZV2VaNWVwRnNtbHlJRjFhOEU3Y28yUEYzQW1UNk1NbUIwNUJJSUdBNldRakVQYS9VWkl0WlpGbVhNM1F4SzJQR3pDNFpaZ05ESFhzVEtNSFhRQlk1MStjWllUTFlsSmdUZ1k4cXpEdTMzLy8vYjBFU0FoajZwTlhmamJ4L01TSlV1QTVBNENLZ2tqM2ZRWVhEVWkzNEZxYk4wZTFQcWtIOWVkUFg3aGxvRVF5ZjB5bzhUcS93UVVSQnpiUkVBdjMycW9BZlo0bjRobHA1QllKZmFqRWN1bDYwckVrbTdEVUhrN3JlbVY3MnBva3g2VTJqSWVVcmpZQXRNVzIxTzV0UWJvYU9nRkdWQXVUcDMyaVdaWUkyb3hCRW9ycjNKV1NWZFZORnJDd0pRc051SllOV2g0NXZ3WlNmU2FSaTA0c1NqUDE2THBUNDVMZTU2VjlPN1VCSjVxNWlZeVNMcVl4VXlTRGJqZ0txWE9wTEh6U2FhTmVjOHFobnQ5M2ZnSG53ejNCT28zTUtvWklkTnY3Zms1dFJnOHdOVnU0NE9NNkR0Zitham90VlQ5QUR5ck5ZMXhMbGliK1NUTVg2VFJNcnMxSjdaaDhFNXVZcHBWUDU3MTFmZjZ1ODY1dFprY2ZmaWNZdUZiM0Jvb1N1TmxBMjdiNTArOVVVOUF6MVZScjZrUzVVWE5Ia3NWcUVHaVlBQ0hqTGIybnplOWt5U21LTCtPZG5ZOEM2UmZvMnFqVE1xSGhqV0c1ZlM3Nm1SMEl1OUthNmFSZnBoUVI2RXduYXNyYW1oeVljSVBXZDNFellKUVVzZG8ydmJJQnk0Rm9sWUJwdm52VFhidTBzVzBtOGdOWWgzcWV0ZGlQSHo5K05RcWRtQVVaWnE2anJKdDhsaFNCVkVmcnlHYm50cVRYcG81TDUvM1ZScDRUUmI4MS9ranBJcVh4NU1KNy9wMCtRem84cUxSendyTlUvaXdla3JkR0xTMmdKWnJVQldHOVoyZUorOXJ4RVloNk93dmdEeHJRS2ZVSVFFcklPZFdJZEtxMGlFVm1FWVFKdk9Za3I4V1pLMlZvSW0yeS9LWUhyeWN1Z2FqYTRFRitDSzc1S2JrdG5mZnFiTkZWMnZJRXF0S2dqY1Zmb01sU2syclBUUzFxYVRXdGl5UmEwMHdsU1h4dmF2NldKUk9hbis0ZkJXU3lwdE9zdHdHN0xkRCtKZ1crMFRBN3RkZVNXamx4VEtPUzJpU1pkL08vK21sZGdMcUJTR2ZRZ0RFYTBrbW5rUVlCYlpEUllLTEFtTXRRbkg0Z3Bjdms5a3YzZkVrcmFjcHNLaC9hdU9wVXl5N2FkaXFma21YOGtwNm4rbnBaOTBtTGthNVhHUXhYOXRMQW1GWnEvUUVDT3FCaFZZNjVVZHN1V2k4ZFZUYzFwTjZRYytQcnlhdnBwME9NbXhkN1VsSzFBU2ZhR09NQ0FFWHpOajJucWRXbzg4eXhFYlJweit0MmJhazBRSWJxZEZkdU5lM0RqZHZ6WXFKQ0dkRUtycDNscTJhVnVzNVRjSGV2ZTJwT3pyWnpOZTRoSitBMmFsM3YzMFAwVmFLRlhDMmN5b2ViU2FocjdYMzJqVHM1TXFWTjZiUFFKdGMwZlJrZlRSeThMb1lYdDBnank1YTIzbFZldlhyWTZVSlgzS2VaYnFUVFR3ZFl0RTVCQ25wdFpxVUxzazdBUS9lbENiZW9CSEN2blFLZ3cyNWN0a3ltTlM0SU9IV2hXOE5Qb29hV1dXczNzc05GYTcyS0pEUzlQeGVscTZ2SmVJUlN0OGFsSjJ5RHdDbTlOdTE3YjJPM0tlZzRlV3JLRHByMWVycUdzNlluWDhEMGJDbndMQngvU3JYWDZ5Y0g0ZFc1eVpuY0pNTVNaM25XN3B2TFpoM1RRK3ZGZ2NJVVFKOEVUS1JUaHhZUUNWem9sRWhTekNVZGU5bUE4elRWS0x6UVQ2UmkrdzYzbXU3bkVpeWFJcEJNT1lqeXVuV3V2VUhBbFFVNnhWMHBEVStpSThLZWx1bEtyZitkRklFTkFFMWltaVdiVGRaZEtmUFJ3TEtVTzI3ejE5bUFpOExNUmQ4MDdhUmxBOG1PZTFtQWJ6UlVONWtVNGQxQ2M5TnVWaGxuQXM4YTczNkRQTGVVUHluZWlNMmhSYnJvSDVvRGpadDYwMlMyZEdBNDdwL0tqVFp0dC9IMVRoT3lqQWhMQTIxYlprY3V6VWx2NEtUM2JtMGtFUGl2di83NjM4RWdTeXFXb3FrTEFBMVVYQUxHS3ZKNThRRE5BQmJyN29aa3AxclcwYWd1L1NNdmZESkdKWFVmc1RQVWFVbHFOS3FSVitvci9mN3FsN0MyTGxOdzBYS0huSHRvM1RyYXJXazcxa090Z1kycUIwa0g3eUtlY2wvVXRmcWJJWWdhTWlhRTh1eTNwLzc0aFFac04yaWhNMXdtNE1RVUMrZXJTRGM1d09ocGtMb29GenNubDZLNWs4RVpaTGhNTEczK2RDSWxaTjgxT0ZHSEo2a2tiek1kQ2tpYUtiakFSeDRHalc5M2d6cWQzVlo3VGFJY0c2dmtxUFV6STFucGFYZklYZ1VBbHpMcUM2Ym9SMklHT3JVU2o1Njgvd2l3YTZZWWFYUFRkYnNIVG9xMEpzdFVNSXJ1S2FYQjZiNlQ1SlY2MUpPMlA0MGlUNDFlbExLdXJNT3F0S09oSnhRQWt0OEFHWnZvUmt4bGtoc2o1dVlKdUE1SFY0Wm9YMDBUQ3EzWmlhN0Y1NVRVcHJxUHhDYzNhR3h5RjA2K2NVMzRzUUJiTkVSUzAvalVCKzdtMmxNREZBbFMzSW0xY05JMFVudHhzWFZCakFaNXBpRFFMTjhjM2JhazlyZURUYlVsZDVtL3VBaVdGRVYzV1NSdE9ISUtlbm45WklMcWpFSG8yZEFrcTZXRjJWMy80OUxuUmFpeXFxYmM0bmNHalNlUHVyYTJ1cWpzUUNTYXhrb1RiTnpzZGhvaXFodzU2UTVVR0xVSWNWeksyUHJZeWF1QXNwaEZQdXFvTEZjT09BeElIWkRvczFFbkkzMCt3cC9jNEEyWGxUaXdVSnVkRm4yQkE5eSt2cjcrTUl4eHdiRVo4ZHljNW11bXJULzdmR2RTN1ExU25SYm9NbkUxTlZLMG9hSTZ3SUdBTW1jeDdkRFQ4eldTelpXcTl4b3lyU2Y3SXVNa0ZvQk1LbExObWxTT0xzdFpPekVYU3ZjbWpYV3A5Zmw1YWFFM3d4aGlhVzZFYkV2VzVXaTlwb3BjTm5vNkdGb241TE5Nd2wxcWllUVlsTkxvbE5iU1ltOG5DdFY4Uk1YcHRHS0tuR2V3ZURVSHFwclRnYWxwNktvcUZ4Zmh6K3B3MjV5V05OaWNRQ1A5dkg2MlZtN2RXSmNuck9SOGJkM3crditPYnFRQTBEajYxckJFcnNXdTFFb3pJeGJiOUhXMlJWc1ArdnVQUnN5bTEyL05JKzZVZFpGYjV3OHVvNVZhNzN3Q0UzWERVaS8zV2Y4NWxQbWs3WndXUEtuSGJwcGhtbUNHQURHaURzbG9KYjArS2RtYW1hWXUvRlppTnNZblpZOXBmaCt4T0d1NXRZakIxUGJOYVI4YzAwTGFCKzMvYnc1TTYwZ3p5aFFlNTAvZlVOdm1KVS9taVpxMmtVaWh6VDkzNzAydHZlZkplNTRXeVZkZU8valN0RnYxMkU5K0NnNU1JMHZwRmN4eDlYRGF4R3V0MmFZNk5aWWhOUWcxVzY2MjZjLzFjLzU5R2V6aTZPN0dPbERnVXllaVpLTkdtWVFMSnRSTFE4KzlXZGJIWG9CR0thaGc1V2JpamF0Tlg0RGtCRXJvUVpCOWxnT3pkQ3pVKzczM1BWNWpCVmUyME1seHBvdWFGZWlVWWdJc0UwNUF0Yjk3QnZRd3lmQ3lXWXluVENoMThORjljZ0VnYmVpYk1WcDZrSnhyeVpVQjZaUW5NTnNwUTgrTUt1RWRpVXFsY2l3SmVsS3dQV25HTnMrd2ljTVFCSFRBMjByNWFhVFZEZi8rK2Z6OC9QWGdsbWttSkVCeHBpQXUvV3FXMWFRTjBPYWRzMng1UDh1cWRGc1ZqeW55cjZtZWJ1ZzBxWW1vVlZleWFNZGFLd3ZkUk4yYjBvZXl5WFA5dUl3eW5leHB4cVRPRlhURFRtOWs0ZXVVS1VlMUp3Q1ZHQThDMmVubm55YTNUQ2RSRzZhb0Q4WlJPRTR0NWFLMSszOUZwdDF3U0JmMWw2YWZoQStvbTdFVE5LMDg5MUovdHBQVTlmNDdZRkZQY3FwRlhZQk5Ibmcwa0tPcElkM3pYZXBielNBcEFLUjJiSWR2dUM0OTNWeGtnYllxOUdpLzNNdzhTR1BRaUEyaWcrSlpLSnVXV2l5K2F4UXQxMjZzZFZDQ3MvNjZxWCtia1lKN1VHZFBmMnFwZHB1TDZLSTBiVWdYWWdLTDNPL1RZbTMzdDUyZUxaaXVBZmVHUXFZL2FSQkt3emFVVGo2QjZuVW9UakpNWFZ5WFV3Qkp3Ry9EUkRRb1BDMzFwZ2RBcDN2cnMxWlR6ek1DVXgyZndMUkdKeVUzbkJTTWFGSU0rZktwdFZmU0dKeEJpbG8vM2V3RDZsUk1xUGZhcFppRUxyUm8xUmkxT2RDU2pkemlzTnM2RkJ0TjdXcjA4OUJvZG1OT2lVbVVxMVBNTmtGUDY3NTFoeEVwUzNYWWpIdi85L3ZQRW5sZEVFanBWN0wvT252SXo0ZERwcEhONzR4cXRkWUttUkQzWkpsMUJnTFNkU2NSRGhsODZ1YlhWUGJjTUFwR0x1SVhPbDNJS0pWMDlmcjV0TlYzY2V0Wng1TzFlK2lVcHVrUUl3QzVQVFBLQnZVRVhneEVFZ2pZYk5CWFRLaXhMZWUxUGFtR2I3VzlTaDZwVEtDMDl3VHN5TGwzU1llYy9MVWhvV21oTGxvRVFyc0p2S0wwUDhsOVZWdEI5VFhWb01rT25jWncwVUFUOHZvN04xSDYyWFJ5ci95OFpsRlVuN2ROUkFySGRjSk9xdU1iWGQzRVhvME9UVUsyZFNMMGVRMDJBTGlXWDlJN3ErYTVXWUE3RThVRVVpM05FRFJXZWxFakx2TFRtem8yNFNXay9ITDFQODBZMU1WT0ZONmkzVzg0RFhrWUpOYUFVczhrMUtKQVNjSGp0SUJMQUdOanNCVDhvem1GUzE5TDAxUG9jSjFrYk9JbVp0RVkralllUGpFVlZnZmcyaXYxNGh5WDM2YmRuTHA0RnhCVzhLOWhGTjhOQU0ySnBnbVM5SGNkS2szWmtEdTVxWGtwcWVRYTZ0NENBT2tncUVGSW4xMHorSERCS2RXNDlKNTZuODR4ZGFvclNTckV0c2FTSHFOUnNLNUQ4cjMzei9QVSsrYllzcVcwU2RtS1d4TVB5UTVKVWVTVWZCU2ROSXEvTjBEcjNHVGJsVnh4MjdqeXBHeE05bFF1QTBoam9kN0ZlR1pPelNaTkp3VlJoMWpTS1RoQlVhSzZhRXJ5N2V5ODg3UlB3R1I2anByR0w3WmI1MzA1SjBIUmtBNG50YjFWSmJyc3E4bVAzZjEyd0dtejhhSU1rcTd6Um4veVd3QlkrVWFpWW00RVFqVEUwWEhBYTBPSlc4eUw5NTJxdmRyQ1QyVkpDa0xrQ3BPVVlwUStKODYrTVNMdVBxd3V5RXRmUnF2ZnowV3ZHNEN5bnVWNUp4SFNPZyt3cVRMUGpJaktYZ29BaXVlb0pUb1o2cVFBMEpnT3ltejE2emtOQ3hZampFUkJwTkZUTHZvazJ1Wm1WRlVTOWhCMzcycnF0ZVBLWlNEa2lYZzdnR0lKUUVzcTY0TFRLWEZ0dzA3YUNQTzI0UjNkUnFXSUErZmF3bTE2K0dVTm4zZ1dyVFV5SFcxWWtxT1FOVHQwRm5TcDFsOGI1UnFPY2g1S2p6cVdwTVdlbEg4TDdVQ0NFeko4SkFBeGRTT1Nic0R4N21UdVFWTFg5RG1keTlHTmJMcUpZUWprY2RaUlpPV1dSbW1samV4S3RGVk5xZDUyYmhxem01RkF4aGx1OHlhRktXMnM5M1hQelUrYS85WWpzb2lmOVBPNGRaS3M3QnZ6UUd0YXIwR25PaitmbjU4eHpWeHI3cFJLazgweCtRNDZtb21zbXM4aEZVa0JxSnoxMmYvdW1uMmFEb0xRMi8rbUpFb1J2UVdpSks1UmRrZkhsR21yc0Q0emQ5K2JuaUlCa0M1WW42aisrV3pPUDg0SHdMRlJTVzd1UEJBb1VMYlNzS1hZN2dBOVh6K2w5MG5ZdGlodVNldWg1ZWpqUmxQZDFGMnVDODE1dUM4blRxS04zSHc4TjNvNnZaYVRlQ3FvbFR3UEcvQjVOZ1l0NDdpYk1PYjBIMmhaU091Z2RBSGozSFNweEVyR0YvVGZkVmFDQW1WTzlPU2NsRy9FYUVrTXBsa2ZPUU8xc1hMTG5sRTM0d1pzdS9YUndHNEh2aFBEOVFjTm1HU2hyVVpOVkU1em1xVTBxYW5uTkFDa0IrU205U2FRam9SRzdwUlpYRnNhSGVhbS9UUkFsamEwZXdaNjJyblVmQkd4blBkTC85djhEMWF3TUdFL1RvZHlVL3M3bklrR3l5WmcwV0VtclFkRXFWV25JcnhaSDZsVXBDbEQraGtlVFlXcEdZVUVCUTBrV252VDNidzhQZG5TdjFOSFdRSkR6cE9HUm9PNXprWjNxcmdVTTZXSUpIVytCYm9jcmRqQUpBSUNrMENKREZEU0lNeTFiNE1VaGNtUmFyV2NJNjNIS3NOMW1nM05jTFg3TkIyWUtXVlBKYXdMQW5SUGxtR3k3L2VlVkhNUzJrMm84VEptTzQyVk9qZVRqZ0J2RGp0MDBxWXBLa3MzWWp0OVNlblhhdjVWOExSdWZ0ZnVtbm9oMGlaUHdoazNmUEptVnQ0NlBNVWRQRGZBOHlMNldvYVM2dWRkakRrWFFORDkzWGtPcElDNlRGSnFnV0FLQUE3dHZxR0VDQXpTazF0SGV6WHdpSkJTUmFzVFgzc3pxV2JwOEhJblNoTG5OUGFrZ1QrdHU0KzBEZzc0U3dHc0RmSzgvYm9KaEsyMGF5QnFhOTF0ekVZUzI5RGZsLzcrOCtlcE5UejFrVGlmeW5iUTZEcDVYSDNTWEVpV1lhQmF3N3oxcWVPRWs1S3BuZnB0QXEvN1hCcDFtMWI4cEUvVU5EUk5OU2FEaTZaZ1hEWlAwMXlzY2x5bmUxK0RVUW9jaTVWYncybmE5TjYyeUNrVCtLNVhBZEhJdE41U1c3czdXSjE3TkpVaVRrUzJDT2owR1QwcHZYSTM5TlQrTHltcGM1VkpCaFZhQWl6NHdVcmJ0SlpLS2xYY0JLR2s1dElUVjRWR3hIazdTdTltVlBVcVhHcUxmREd4WERiNXNqa1RsdVQ4QnhRVVRoNklhVzI3VkZ1RDRNcU9FUmhNNEI0eFlXdEtmMkpYS2pGZVc4S3ZBNEFieEVBSU0yMSs5d0RkTkJaMzgxTXRSUDRBQ1ZCTFZ1ZUV4THBVVVI5R0doRGhSb29sZHhqbmJyejBQSkN3WkdGNzFxbStxMFAwc2hBWFpQdk1KTCsrdmo3T21aWkVxWkZxOWV4SGFaUmRDd0p0REIwQmV1UUkxVFEwS1Z0T0RVa3V3L3BWQXJTVHd5bXZYRjNtR2o3VTVTZTFYcWJUYndrQXpwVW5aUUtwMWJpOW4xcDZMMnF0UmUzbkVIbHljVXFyYXdBQUJHNUpSRUZVNUtVMmJHcXZwVVhrdXRLU1ExSTdZWmJhYzhuYTNHdS9hOHAxUUpKYzE5RzIxSnRDWG9WckYxN0NTclFYd3FremFTTHppZDJrOVphZXR6c29ueVR6MVFqcW1pRGF5YTlDSFZvZzFGV1dnS0ViWlYwN3ZSb3JjR0lBV3FZMDNuaEp1K256dUhSdmtXUzNVNjJkeEM2NDNmUmphSmJWYW1FbnM2WG5rQnlPMTVtQmJneDRDdGFwQzIrUmFwOVMzRVgzc0J4Q1NZdmoydXdkdS9Nc0lGWVQvTFNCSGVzY3VVWVZKWkR0TzV1c2JYNmx2WmE2M0dVS1RUdnZxRFVIK0RYT3Q5V09xMXR0MG53UTA3TGN4NFZSb1VFeExmVjE4d09TVEoxR3RyV016ZjJkTE9UU0lGQ2E2a3RBT1EzTi9jNDZ0elFnL1pCenB5WCtOOGw4RitBcEtRZmI2eEdsczZha0xiQXQwM1FTU0ptdTV3d1M1OEoxM1dMVU5MSlFsTGVuR3dGazdYbFNzRWdaZzRLa2RBQTFpVyt5clhkZ016VlJrU1M0cldlWHlWQ0xNMkVGamdLL2FaVytzU1IvWEozaWpEWmQ5OVozVzF5WGJxdDFBemFXWVBVVHVHM09TWmxSNG5WVG9IUkFuM1lxMHYzUjBvUlMzcFk2dHN5T2VQTUZ5U1lHaURhOW51cEo4NTg0ZjBMSk5SQ2tOdUJVenBIOWQvcTNSVFY0QXp5MndFK1l4cE1paDA1RVNSK0trTTZXaXFiVVV3TlBBckNXd0hOemt4TTJzaml3bnRibmhPN3IvZm54NHdlZVlOVG43KzRCelExd1BnZ3B0VTRsMHRwQ25OeUowbk5NQTJVWFJ5cEhrUzJsVDhvS0dvT3laSVVwMjIwQTY4M21UOWw1bkF1UXdEbDNrNmh2ZjNIMGJjS1Z4cUd1L0d6ei8wc1BpcWk4UkoybWg1M0djK245UGhkM3lrb2NjdDFBUHVxUVhLWVRKYzM4TFp0QzJRVTFZbEhiNzJvZ294TG0xSlRqWElyU2ZYV01sR3I0VzNCWXg1UGZxbHFwMmV4WjY0ajNkSEtwVTBJMWFhTTFuelo5UFRkdW1rN3l4WmpCYlFhS3VFc0xadExtTzhEUGFSUUk2S1RtbGFTOGRFSEwzZHZGdjM4dG4yZ3pMNi9yT2c1ZCtwKzhLbHZidVFOWjNmTjhmUnJwTXlYR1E0VmpUVHFkOEpGV2pxNjZqWFFnUGswb2NpN0tjM0NIQm9Ja0trbWVaZTRpejlkVHRaZGJMR3Uyc2N5UFQvWGF6WkJQeWxqby9xVnVzN1VQUWpPdzAzMW1IZXZkVHFZRWRLYkZuY1F4U2NpVVR2MEVJcnNzelBWR2tDZmxEWE5FRW1ZU3lLVURzZ216MHZlWDhsYy84NVBVVGt0N0pEbjZKTHZxbHZhdHdLRDc4S3JaWHdDN05XSW0zN1VFRGpYbG9qc3BxQlp0SjdNR3pOVlZkbWxDYVNkK0MvSkpFNUU4OTl2bWJ4dEhOMzRyMzlMMXVVM3ZNc1kwOXI1bFZha0V2YzNHMnVIM3BEcG1yVm5jYWF3cGJldW9hdEZyYWJXOG9lcHVtWXZGcTQyUTh1VkUxZmR6L29jdGZhVG1veVVqV3REN1pkSGRwcVRPTEpPbTNyYm1wZ1hJZFlOblVvMitOcUFsNXFBMUE1SHljcW5ybDdMWEhRSy9Tb0JsczkvU0Y4b2NPS3hnUVoxdkFvVkx5NVloSDAwTWxFNEdjbHBKZGt6cnRXdTJ0VTdjV1U3N1ZITGRnTGRudlh4am1aVXNzRS9RczcxZUNxNXRBMzFuTnVHcUozSFc5MHV3dkdFWXlFY3dsVmR1YlZRUThHWXh1YWllT3JCdWV2SnZIOVQ2NzRRdnBQTG50dTRpNnVjbThLYlROYmtoTlJDVWdzcGlkbmt6eUdOWlR6ZmwyVnFlMEFhOWNlLzVUZ25VTWhVM3RPUzd0ZjFTRXRGci94OEh0R0JYalNZNXVBQUFBQUJKUlU1RXJrSmdnZz09JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdFRlcnJhaW5NYXA7XHJcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJ2bGlsWFVcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxhc3NldHNcXFxcdGVycmFpblxcXFxkZWZhdWx0X3RlcnJhaW4uanNcIixcIi8uLlxcXFwuLlxcXFxhc3NldHNcXFxcdGVycmFpblwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9kZWZhdWx0X3RlcnJhaW4gPSByZXF1aXJlKCcuLi8uLi9hc3NldHMvdGVycmFpbi9kZWZhdWx0X3RlcnJhaW4nKTtcblxudmFyIF9kZWZhdWx0X3RlcnJhaW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmYXVsdF90ZXJyYWluKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEdBTUUgPSBuZXcgV0hTLldvcmxkKHtcbiAgc3RhdHM6ICdmcHMnLCAvLyBmcHMsIG1zLCBtYlxuICBhdXRvcmVzaXplOiB0cnVlLFxuXG4gIGdyYXZpdHk6IHtcbiAgICB4OiAwLFxuICAgIHk6IC0xMDAsXG4gICAgejogMFxuICB9LFxuXG4gIGNhbWVyYToge1xuICAgIGZhcjogMTAwMDBcbiAgfSxcblxuICBzaGFkb3dtYXA6IHtcbiAgICB0eXBlOiBUSFJFRS5QQ0ZTaGFkb3dNYXBcbiAgfSxcblxuICByV2lkdGg6IDEsXG4gIHJIZWlnaHQ6IDEsXG5cbiAgYmFja2dyb3VuZDogMHg3MERCRkZcbn0pO1xuXG5uZXcgV0hTLlRlcnJhaW4oe1xuICBnZW9tZXRyeToge1xuICAgIG1hcDogX2RlZmF1bHRfdGVycmFpbjIuZGVmYXVsdCxcbiAgICBkZXB0aDogMTAwLFxuICAgIHdpZHRoOiAyNTYsXG4gICAgaGVpZ2h0OiAyNTZcbiAgfSxcblxuICBtYXRlcmlhbDoge1xuICAgIGNvbG9yOiAweGZmMDAwMCxcbiAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgIGtpbmQ6ICdiYXNpYydcbiAgfSxcblxuICBwb3M6IHtcbiAgICB4OiAwLFxuICAgIHk6IDAsXG4gICAgejogMFxuICB9XG59KS5hZGRUbyhHQU1FKTtcblxuLy8gTk9URTogRGVmYXVsdCBsaWdodC5cbm5ldyBXSFMuQW1iaWVudExpZ2h0KHtcbiAgbGlnaHQ6IHtcbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgaW50ZW5zaXR5OiAwLjJcbiAgfSxcblxuICBwb3M6IHtcbiAgICB4OiAxNjAsIC8vIDEwMCxcbiAgICB5OiAxMjAsIC8vIDMwLFxuICAgIHo6IDE2MCAvLyAxMDBcbiAgfSxcblxuICB0YXJnZXQ6IHtcbiAgICB4OiAwLFxuICAgIHk6IDEwLFxuICAgIHo6IDBcbiAgfVxufSkuYWRkVG8oR0FNRSk7XG5cbi8vIE5PVEU6IERlZmF1bHQgbGlnaHQuXG5uZXcgV0hTLlNwb3RMaWdodCh7XG4gIGxpZ2h0OiB7XG4gICAgY29sb3I6IDB4ZmZmZmZmLCAvLyAweDAwZmYwMCxcbiAgICBpbnRlbnNpdHk6IDAuMyxcbiAgICBkaXN0YW5jZTogNTAwXG4gIH0sXG5cbiAgc2hhZG93bWFwOiB7XG4gICAgd2lkdGg6IDIwNDgsXG4gICAgaGVpZ2h0OiAyMDQ4LFxuICAgIHRvcDogMCxcbiAgICBmb3Y6IDkwXG4gIH0sXG5cbiAgcG9zOiB7XG4gICAgeDogMTYwLCAvLyAxMDAsXG4gICAgeTogMTIwLCAvLyAzMCxcbiAgICB6OiAxNjAgLy8gMTAwXG4gIH0sXG5cbiAgdGFyZ2V0OiB7XG4gICAgeDogMCxcbiAgICB5OiAxMCxcbiAgICB6OiAwXG4gIH1cbn0pLmFkZFRvKEdBTUUpO1xuXG52YXIgcGFycm90ID0gbmV3IFdIUy5Nb3JwaCh7XG5cbiAgZ2VvbWV0cnk6IHtcbiAgICB3aWR0aDogMixcbiAgICBoZWlnaHQ6IDIsXG4gICAgZGVwdGg6IDIsXG4gICAgcGF0aDogJ2Fzc2V0cy9tb2RlbHMvbW9ycGgvcGFycm90LmpzJ1xuICB9LFxuXG4gIG1hdGVyaWFsOiB7XG4gICAgdXNlVmVydGV4Q29sb3JzOiB0cnVlLFxuICAgIGtpbmQ6ICdsYW1iZXJ0J1xuICB9LFxuXG4gIHBvczoge1xuICAgIHg6IDcwLFxuICAgIHk6IDcyLFxuICAgIHo6IDcwXG4gIH0sXG5cbiAgc2NhbGU6IHtcbiAgICB4OiAwLjEsXG4gICAgeTogMC4xLFxuICAgIHo6IDAuMVxuICB9LFxuXG4gIG1vcnBoOiB7XG4gICAgZHVyYXRpb246IDAuNCxcbiAgICBzcGVlZDogMjAwXG4gIH1cblxufSk7XG5cbnZhciBwYXJyb3RQYXRoID0gW25ldyBUSFJFRS5DdWJpY0JlemllckN1cnZlMyhuZXcgVEhSRUUuVmVjdG9yMygtMTAwLCAxMDAsIDUwKSwgbmV3IFRIUkVFLlZlY3RvcjMoLTIwMCwgMTIwLCAtNTApLCBuZXcgVEhSRUUuVmVjdG9yMygyMDAsIDEyMCwgLTUwKSwgbmV3IFRIUkVFLlZlY3RvcjMoMTAwLCAxMDAsIDUwKSksIG5ldyBUSFJFRS5DdWJpY0JlemllckN1cnZlMyhuZXcgVEhSRUUuVmVjdG9yMygxMDAsIDEwMCwgNTApLCBuZXcgVEhSRUUuVmVjdG9yMygtMjAwLCA4MCwgMTUwKSwgbmV3IFRIUkVFLlZlY3RvcjMoMjAwLCA2MCwgMTUwKSwgbmV3IFRIUkVFLlZlY3RvcjMoLTEwMCwgMTAwLCA1MCkpXTtcblxudmFyIHBhcnJvdGdvZXMgPSBuZXcgVEhSRUUuQ3VydmVQYXRoKCk7XG5cbnBhcnJvdGdvZXMuYWRkKHBhcnJvdFBhdGhbMF0pO1xucGFycm90Z29lcy5hZGQocGFycm90UGF0aFsxXSk7XG5cbnZhciBmbGFtaW5nbyA9IG5ldyBXSFMuTW9ycGgoe1xuICBnZW9tZXRyeToge1xuICAgIHdpZHRoOiAyLFxuICAgIGhlaWdodDogMixcbiAgICBkZXB0aDogMixcbiAgICBwYXRoOiAnYXNzZXRzL21vZGVscy9tb3JwaC9mbGFtaW5nby5qcydcbiAgfSxcblxuICBtYXRlcmlhbDoge1xuICAgIHVzZVZlcnRleENvbG9yczogdHJ1ZSxcbiAgICBraW5kOiAnbGFtYmVydCdcbiAgfSxcblxuICBwb3M6IHtcbiAgICB4OiA3MCxcbiAgICB5OiA3MixcbiAgICB6OiA3MFxuICB9LFxuXG4gIHNjYWxlOiB7XG4gICAgeDogMC4xLFxuICAgIHk6IDAuMSxcbiAgICB6OiAwLjFcbiAgfSxcblxuICBtb3JwaDoge1xuICAgIGR1cmF0aW9uOiAyLFxuICAgIHNwZWVkOiA1MFxuICB9XG59KTtcblxudmFyIGZsYW1pbmdvUGF0aCA9IFtuZXcgVEhSRUUuQ3ViaWNCZXppZXJDdXJ2ZTMobmV3IFRIUkVFLlZlY3RvcjMoLTEwMCwgMTAwLCA1MCksIG5ldyBUSFJFRS5WZWN0b3IzKC0xMDAsIDE2MCwgMzAwKSwgbmV3IFRIUkVFLlZlY3RvcjMoMjAwLCAxODAsIDMwKSwgbmV3IFRIUkVFLlZlY3RvcjMoMTAwLCAxNDAsIDgwKSksIG5ldyBUSFJFRS5DdWJpY0JlemllckN1cnZlMyhuZXcgVEhSRUUuVmVjdG9yMygxMDAsIDE0MCwgODApLCBuZXcgVEhSRUUuVmVjdG9yMygyMDAsIDgwLCAxNTApLCBuZXcgVEhSRUUuVmVjdG9yMygtMjAwLCA2MCwgLTEwMCksIG5ldyBUSFJFRS5WZWN0b3IzKDIwMCwgMTAwLCAzNTApKSwgbmV3IFRIUkVFLkN1YmljQmV6aWVyQ3VydmUzKG5ldyBUSFJFRS5WZWN0b3IzKDIwMCwgMTAwLCAzNTApLCBuZXcgVEhSRUUuVmVjdG9yMygyMDAsIDgwLCAxNTApLCBuZXcgVEhSRUUuVmVjdG9yMygtMjAwLCA2MCwgLTEwMCksIG5ldyBUSFJFRS5WZWN0b3IzKC0xMDAsIDEwMCwgNTApKV07XG5cbnZhciBmbGFtaW5nb2dvZXMgPSBuZXcgVEhSRUUuQ3VydmVQYXRoKCk7XG5cbmZsYW1pbmdvZ29lcy5hZGQoZmxhbWluZ29QYXRoWzBdKTtcbmZsYW1pbmdvZ29lcy5hZGQoZmxhbWluZ29QYXRoWzFdKTtcbmZsYW1pbmdvZ29lcy5hZGQoZmxhbWluZ29QYXRoWzJdKTtcblxuZmxhbWluZ28uYWRkVG8oR0FNRSwgJ3dhaXQnKS50aGVuKGZ1bmN0aW9uIChvYmopIHtcbiAgb2JqLmZvbGxvdyhwYXJyb3Rnb2VzLCAvLyBmbGFtaW5nb2dvZXNcbiAgMjYwMDAsIHRydWUpO1xufSk7XG5cbnBhcnJvdC5hZGRUbyhHQU1FLCAnd2FpdCcpLnRoZW4oZnVuY3Rpb24gKG9iaikge1xuICBvYmouZm9sbG93KGZsYW1pbmdvZ29lcywgMjAwMDAsIHRydWUpO1xufSk7XG5cbm5ldyBXSFMuU2t5Ym94KHtcbiAgcGF0aDogJ2Fzc2V0cy90ZXh0dXJlcy9za3lib3gvc2t5bWFwJyxcbiAgaW1nU3VmZml4OiAnLnBuZycsXG4gIHNreVR5cGU6ICdzcGhlcmUnLFxuICByYWRpdXM6IEdBTUUuZ2V0Q2FtZXJhKCkuX19wYXJhbXMuY2FtZXJhLmZhcixcbiAgcm90OiB7IHk6IE1hdGguUEkgLyAxODAgKiAtOTAgfSxcbiAgcG9zOiB7IHk6IC0yMDAgfVxufSkuYWRkVG8oR0FNRSk7XG5cbnZhciBib3ggPSBuZXcgV0hTLkJveCh7XG5cbiAgZ2VvbWV0cnk6IHtcbiAgICB3aWR0aDogMixcbiAgICBoZWlnaHQ6IDIsXG4gICAgZGVwdGg6IDJcbiAgfSxcblxuICBtYXNzOiAxLFxuICBvbmx5dmlzOiBmYWxzZSxcblxuICBtYXRlcmlhbDoge1xuICAgIGtpbmQ6ICdsYW1iZXJ0JyxcbiAgICBtYXA6IFdIUy5BUEkudGV4dHVyZSgnYXNzZXRzL3RleHR1cmVzL2JveC5qcGcnKVxuICB9LFxuXG4gIHBvczoge1xuICAgIHg6IDUwLFxuICAgIHk6IDcwLFxuICAgIHo6IDYwXG4gIH1cblxufSk7XG5cbkdBTUUuYWRkKGJveCkudGhlbihmdW5jdGlvbiAoKSB7XG4gIHZhciBjaGVja2VyMSA9IG5ldyBXSFMuTG9vcChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGJveC5ucG9zaXRpb24ueSA8IC0yMDApIHtcbiAgICAgIGJveC5wb3NpdGlvbi5zZXQoNTAsIDcwLCA2MCk7XG5cbiAgICAgIGJveC5zZXRBbmd1bGFyVmVsb2NpdHkobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuICAgICAgYm94LnNldExpbmVhclZlbG9jaXR5KG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDApKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNoZWNrZXIxLnN0YXJ0KCk7XG59KTtcblxubmV3IFdIUy5Cb3goe1xuICBnZW9tZXRyeToge1xuICAgIHdpZHRoOiAyLFxuICAgIGhlaWdodDogMixcbiAgICBkZXB0aDogMlxuICB9LFxuXG4gIG1hc3M6IDEsXG5cbiAgbWF0ZXJpYWw6IHtcbiAgICBraW5kOiAnbGFtYmVydCcsXG4gICAgbWFwOiBXSFMuQVBJLnRleHR1cmUoJ2Fzc2V0cy90ZXh0dXJlcy9ib3guanBnJylcbiAgfSxcblxuICBwb3M6IHtcbiAgICB4OiAzMCxcbiAgICB5OiA1MCxcbiAgICB6OiAwXG4gIH1cbn0pLmFkZFRvKEdBTUUpO1xuXG52YXIgcGVyc29uID0gbmV3IFdIUy5TcGhlcmUoe1xuICBnZW9tZXRyeToge1xuICAgIHJhZGl1czogMlxuICB9LFxuXG4gIG1hc3M6IDEwLFxuXG4gIG1hdGVyaWFsOiB7XG4gICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIGtpbmQ6ICdsYW1iZXJ0JyxcbiAgICByZXN0OiAwLFxuICAgIGZyaTogMVxuICB9LFxuXG4gIHBvczoge1xuICAgIHg6IDAsXG4gICAgeTogMTAwLFxuICAgIHo6IDBcbiAgfVxufSk7XG5cbkdBTUUuYWRkKHBlcnNvbikudGhlbihmdW5jdGlvbiAoKSB7XG4gIHZhciBjaGVja2VyMiA9IG5ldyBXSFMuTG9vcChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHBlcnNvbi5ucG9zaXRpb24ueSA8IC0yMDApIHtcbiAgICAgIHBlcnNvbi5wb3NpdGlvbi5zZXQoMCwgMTAwLCAwKTtcblxuICAgICAgcGVyc29uLnNldEFuZ3VsYXJWZWxvY2l0eShuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSk7XG4gICAgICBwZXJzb24uc2V0TGluZWFyVmVsb2NpdHkobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xuICAgIH1cbiAgfSk7XG5cbiAgY2hlY2tlcjIuc3RhcnQoKTtcbn0pO1xuXG4vLyBFRkZFQ1RTLlxudmFyIGVmZmVjdHMgPSBuZXcgV0hTLldhZ25lcihHQU1FKTtcblxuLy8gZWZmZWN0cy5hZGQoIFwiWm9vbUJsdXJQYXNzXCIsIHt9ICk7XG5lZmZlY3RzLmFkZCgnVmlnbmV0dGVQYXNzJywge30pO1xuXG4vLyB2YXIgZGlyZWN0aW9uYWxibHVyRWZmZWN0ID0gR0FNRS5hZGRXYWduZXIoIFwibW90aW9uQmx1clBhc3NcIiwge30gKS5hcHBseSgpO1xuXG5HQU1FLnNldENvbnRyb2xzKFdIUy5maXJzdFBlcnNvbkNvbnRyb2xzKHBlcnNvbiwgeyAvLyAqV0hTKiBvYmplY3QsIFBvaW50ZXIgbG9jayBjb250cm9scyBvYmplY3QsIEpxdWVyeSBibG9ja2VyIGRpdiBzZWxlY3Rvci5cbiAgYmxvY2s6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdibG9ja2VyJyksXG4gIHNwZWVkOiA1IC8vIDVcbn0pKTtcblxuLyogdmFyIGdyYXNzY29vcmRzID0gW107XG5cbmZvciAodmFyIHggPSAwOyB4IDwgMjA7IHgrKykge1xuICBmb3IgKHZhciB5ID0gMDsgeSA8IDE1OyB5KyspIHtcbiAgZ3Jhc3Njb29yZHMucHVzaCh7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH0pO1xuXG4gIH1cbn0qL1xuLypcbnZhciBjdXJ2ZSA9IG5ldyBXSFMuQ3VydmUoXG57XG4gIGdlb21ldHJ5OiB7XG4gICAgY3VydmU6IG5ldyBUSFJFRS5DdWJpY0JlemllckN1cnZlMyhcbiAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKCAtMTAwLCAxMDAsIDUwICksXG4gICAgICBuZXcgVEhSRUUuVmVjdG9yMyggLTEwMCwgMTYwLCAzMDAgKSxcbiAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKCAyMDAsIDE4MCwgMzAgKSxcbiAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKCAxMDAsIDE0MCwgODAgKVxuICAgIClcbiAgfSxcblxuICBtYXRlcmlhbDoge1xuICAgIGtpbmQ6IFwibGluZWJhc2ljXCIsXG4gICAgY29sb3I6IDB4ZmYwMDAwXG4gIH1cbn0pO1xuXG52YXIgY3VydmUyID0gbmV3IFdIUy5DdXJ2ZShcbntcbiAgZ2VvbWV0cnk6IHtcbiAgICBjdXJ2ZTogbmV3IFRIUkVFLkN1YmljQmV6aWVyQ3VydmUzKFxuICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoIDEwMCwgMTQwLCA4MCApLFxuICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoIDIwMCwgODAsIDE1MCApLFxuICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoIC0yMDAsIDYwLCAtMTAwICksXG4gICAgICBuZXcgVEhSRUUuVmVjdG9yMyggMjAwLCAxMDAsIDM1MCApXG4gICAgKVxuICB9LFxuXG4gIG1hdGVyaWFsOiB7XG4gICAga2luZDogXCJsaW5lYmFzaWNcIixcbiAgICBjb2xvcjogMHgwMGZmMDBcbiAgfVxufSk7XG5cbnZhciBjdXJ2ZTMgPSBuZXcgV0hTLkN1cnZlKFxue1xuICBnZW9tZXRyeToge1xuICAgIGN1cnZlOiBuZXcgVEhSRUUuQ3ViaWNCZXppZXJDdXJ2ZTMoXG4gICAgICBuZXcgVEhSRUUuVmVjdG9yMyggMjAwLCAxMDAsIDM1MCApLFxuICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoIDIwMCwgODAsIDE1MCApLFxuICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoIC0yMDAsIDYwLCAtMTAwICksXG4gICAgICBuZXcgVEhSRUUuVmVjdG9yMyggLTEwMCwgMTAwLCA1MCApXG4gICAgKVxuICB9LFxuXG4gIG1hdGVyaWFsOiB7XG4gICAga2luZDogXCJsaW5lYmFzaWNcIixcbiAgICBjb2xvcjogMHgwMDAwZmZcbiAgfVxufSk7XG5cbmN1cnZlLmFkZFRvKCBHQU1FICk7XG5jdXJ2ZTIuYWRkVG8oIEdBTUUgKTtcbmN1cnZlMy5hZGRUbyggR0FNRSApO1xuKi9cbkdBTUUuc3RhcnQoKTtcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwidmxpbFhVXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvZmFrZV8xYWE2YmM1LmpzXCIsXCIvXCIpIl19
