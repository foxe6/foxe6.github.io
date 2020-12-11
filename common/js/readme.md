# Nibbler.js

## http://www.tumuski.com/2010/04/nibbler/

### Usage

Nibbler itself isn’t the encoder object, but rather a constructor for easily creating encoders. Base32 carries five bits per byte, so to create a Base32 encoder object, set the codeBits option to 5.

```javascript
base32 = new Nibbler({
    dataBits: 8,
    codeBits: 5,
    keyString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
    pad: '='
});
```

The object has encode and decode methods:

```javascript
base32.encode("Hello, World");  // "JBSWY3DPFQQFO33SNRSCC====="
base32.decode("IFWG62DB");      // "Aloha"
```

Base64 carries 6 bits per byte:

```javascript
base64 = new Nibbler({
    dataBits: 8,
    codeBits: 6,
    keyString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    pad: '='
});
```

If the data you’re encoding only uses seven bits, you can create an object that excludes those unused bits from its encoded output, by setting the dataBits option to 7:

```javascript
base64_7bit = new Nibbler({
    dataBits: 7,
    codeBits: 6,
    keyString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    pad: '='
});
```
