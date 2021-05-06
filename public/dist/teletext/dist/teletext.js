// SPDX-FileCopyrightText: (c) 2021 Tech and Software Ltd.
// SPDX-FileCopyrightText: (c) 2017 dosaygo
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0
// LicenseRef-uk.ltd.TechAndSoftware-1.0 refers to https://techandsoftware.robdev.org.uk/LICENSES/LicenseRef-uk.ltd.TechAndSoftware-1.0.txt
const TYPED_ARRAYS = new Set([
    "Uint1Array",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "UInt32Array",
    "Float32Array",
    "Float64Array"
  ]);
  const INTERNAL_FORMAT = Uint8Array;
  const $ = Symbol("[[Uint1ArrayInternal]]");

  // Uint1Array internals : toArray, getBit, setBit

    class Uint1ArrayPrivates {
      constructor( publics, { length : length = null,
                  buffer : buffer = null,
                  byteOffset : byteOffset = 0,
                  byteLength : byteLength = null} = {} ) {

        let internal;

        if ( !! buffer ) {
          length = (byteLength || buffer.byteLength) * 8;
        } else if ( ! length ) {
          length = 0;
        }

        const wordBytes = INTERNAL_FORMAT.BYTES_PER_ELEMENT;
        const wordSize = wordBytes * 8;
        const wordSizeMask = wordSize - 1;
        const wordSizeShift = msb_index( wordSize );
        const wordCount = Math.max(
          1, ( length + wordSizeMask ) >> wordSizeShift);
        if ( !! buffer ) {
          internal = new INTERNAL_FORMAT( buffer, byteOffset, wordCount );
        } else  {
          buffer = new ArrayBuffer( wordBytes * wordCount );
          internal = new INTERNAL_FORMAT( buffer );
        }

        Object.assign( this, {
          buffer,
          byteOffset,
          length,
          wordSize,
          wordCount,
          wordSizeMask,
          wordSizeShift,
          internal
        });
      }
      toArray() {
        const array = new Uint8Array( this.length );
        for( let j = 0; j < this.wordCount; j++ ) {
          const word = this.internal[j];
          for( let i = j*this.wordSize; i < (j+1)*this.wordSize; i++ ) {
            array[i] = this.getBit( i, word );
          }
        }
        return array;
      }
      getBit( i, word ) {
        if ( i >= this.length ) {
          return;
        }
        const word_offset = i & this.wordSizeMask;
        if ( word == undefined ) {
          const word_number = i >> this.wordSizeShift;
          word = this.internal[word_number];
        }
        const bit = (word >> word_offset)&1;
        return bit;
      }
      setBit( i, bit ) {
        if ( i >= this.length ) {
          return;
        }
        const word_number = i >> this.wordSizeShift;
        const word_offset = i & this.wordSizeMask;
        const word = this.internal[word_number];
        let new_word = word;
        new_word |= ( bit << word_offset ); // make it 1 if 1, no change if 0
        new_word &= ~((~bit&1) << word_offset ); // make it 0 if 0, no change if 1
        if ( word !== new_word ) {
          this.internal[word_number] = new_word;
        }
        return bit;
      }
    }

    class Uint1Array {
      // Uint1Array constructor

        constructor( arg , byteOffset = 0, byteLength = null ) {
          const argType = resolveTypeName(arg);

          let length, privates, temp;

          switch( argType ) {
            case "Number":
              arg = ~~arg; // integer part only
              length = arg;
              privates = new Uint1ArrayPrivates( this, { length } );
              break;
            case "ArrayBuffer":
              const buffer = arg;
              privates = new Uint1ArrayPrivates( this, {
                buffer, byteOffset, byteLength } );
              break;
            case "Undefined":
            case "Null":
            case "RegExp":
            case "Infinity":
              length = 0;
              privates = new Uint1ArrayPrivates( this, { length } );
              break;
            case "Array":
            case "Int8Array":
            case "Uint8Array":
            case "Uint8ClampedArray":
            case "Int16Array":
            case "Uint16Array":
            case "Int32Array":
            case "UInt32Array":
            case "Float32Array":
            case "Float64Array":
            case "Uint1Array":
            case "Object":
            default:
              temp = create_from_iterable( arg );
              privates = new Uint1ArrayPrivates( this, { length : temp.length } );
              temp.forEach( (val, i) => privates.setBit( i, toBit( val ) ) );
              break;
          }

          // for private access to internal properties

          this[$] = privates;

          // proxy for array-like bracket-accessor via index

          const accessorProxy = new BracketAccessorProxy( this );

          return accessorProxy;
        }

      // Static property slots on the constructor

        static get BYTES_PER_ELEMENT() {
          return 0.125;
        }
        static get name() {
          return "Uint1Array";
        }
        static get length() {
          return 0;
        }
        static get [Symbol.species]() {
          return this;
        }

        static [Symbol.hasInstance](instance) {
          return instance.__proto__ = this;
        }

      // Static method slots on the constructor

        static from( iterable ) {
          const temp = create_from_iterable( iterable );
          return new Uint1Array( temp );
        }

        static of( ...items ) {
          return Uint1Array.from( items );
        }

      // Property slots on the instances

        get buffer() {
          return this[$].buffer;
        }

        get byteLength() {
          return ( this.length + 7 ) >> 3;
        }

        get byteOffset() {
          return this[$].byteOffset;
        }

        get length() {
          return this[$].length;
        }

        get [Symbol.toStringTag]() {
          return "Uint1Array";
        }

      // Method slots on the instance ( STANDARD as per the TypedArray Spec )

        copyWithin( targetStart, sourceStart = 0, sourceEnd = this.length ) {
          if ( ! Number.isInteger( targetStart ) ) {
            return this;
          }
          const temp = new Uint8Array( sourceEnd - sourceStart );
          for( let i = sourceStart; i < sourceEnd; i++ ) {
            temp[i-sourceStart] = this[i];
          }
          this.set( temp, targetStart );
          return this;
        }

        entries() {
          return this[$].toArray().entries();
        }

        every( ...args ) {
          return this[$].toArray().every( ...args );
        }

        fill( value, start = 0, end = this.length ) {
          for( let i = start; i < end; i++ ) {
            this[i] = value;
          }
          return this;
        }

        filter( ...args ) {
          return new Uint1Array( this[$].toArray().filter( ...args ) );
        }

        find( ...args ) {
          return this[$].toArray().find( ...args );
        }

        findIndex( ...args ) {
          return this[$].toArray().findIndex( ...args );
        }

        forEach( ...args ) {
          this[$].toArray().forEach( ...args );
        }

        includes( ...args ) {
          return this[$].toArray().includes( ...args );
        }

        indexOf( ...args ) {
          return this[$].toArray().indexOf( ...args );
        }

        join( ...args ) {
          return this[$].toArray().join( ...args );
        }

        keys( ...args ) {
          return this[$].toArray().keys( ...args );
        }

        lastIndexOf( ...args ) {
          return this[$].toArray().lastIndexOf( ...args );
        }

        map( ...args ) {
          return new Uint1Array( this[$].toArray().map( ...args ) );
        }

        reduce( ...args ) {
          return this[$].toArray().reduce( ...args );
        }

        reduceRight( ...args ) {
          return this[$].toArray().reduceRight( ...args );
        }

        reverse() {
          const temp = this[$].toArray().reverse();
          this.set( temp );
          return this;
        }

        set( arr, offset = 0 ) {
          if ( ! Number.isInteger( offset ) ) {
            return;
          }

          const typeName = resolveTypeName(arr);

          // returning without doing nothing if the argument is
          // neither an array nor a typedarray seems to be the
          // implemented behaviour in the browser for <TypedArray>.set
          // and we do not differ here
          if ( typeName !== "Array" && ! TYPED_ARRAYS.has( typeName ) ) {
            return;
          }
          const last = Math.min( arr.length + offset, this.length );
          arr = arr.map( v => toBit( v ) );
          for( let i = offset; i < last; i++ ) {
            this[i] = arr[i-offset];
          }
        }

        slice( ...args ) {
          return new Uint1Array( this[$].toArray().slice( ...args ) );
        }

        sort( ...args ) {
          const sorting = this[$].toArray().sort( ...args );
          this.set( sorting );
          return this;
        }

        subarray( ...args ) {
          return new Uint1Array( this[$].toArray().subarray( ...args ) );
        }

        values( ...args ) {
          return this[$].toArray().values( ...args );
        }

        toLocaleString( ...args ) {
          return Array.from(this).toLocaleString();
        }

        toString() {
          return Array.from(this).toString();
        }

        [Symbol.iterator]() {
          return this[$].toArray()[Symbol.iterator]();
        }

        valueOf() {
          return this;
        }

      // Method slots on the instances ( NON STANDARD )

        // This behaviour is chosen ( to return an Array for JSON stringification )
        // because I decided that the behaviour of TypedArrays to return an object
        // with numeric properties such as {0: 0, 1:0, 2:1} didn't work and was crap.

        toJSON() {
          return Array.from(this);
        }
    }

  // array bracket-accessor proxy

    function BracketAccessorProxy( typed_array_api ) {
      const privates = typed_array_api[$];
      const array_accessor_handler = {
        get( _, slot, surface ) {
          const i = typeof slot == "string" ? parseInt(slot) : slot;
          if ( Number.isInteger( i ) ) {
            return privates.getBit( i );
          } else {
            return Reflect.get( typed_array_api, slot );
          }
        },
        set( _, slot, value, surface ) {
          const i = typeof slot == "string" ? parseInt(slot) : slot;
          if ( Number.isInteger( i ) ) {
            privates.setBit( i, toBit( value ) );
            return true;
          } else {
            return Reflect.set( typed_array_api, slot, value );
          }
        }
      };
      return new Proxy( typed_array_api, array_accessor_handler );
    }

  // helpers

    const typeNameMatcher = /\[object (\w+)]/;

    function create_from_iterable( iterable ) {
      const temp = [];
      for( let item of iterable ) {
        const bit = toBit( item );
        temp.push( bit );
      }
      return temp;
    }

    function msb_index( number ) {
      let i = 0;
      while( number >>= 1 ) {
        i++;
      }
      return i;
    }

    function toBit( thing ) {
      if ( typeof thing == "number" && ! Number.isNaN(thing) ) {
        return thing % 2;
      } else {
        return new Boolean(thing).valueOf();
      }
    }

    function resolveTypeName( thing ) {
      const cname = thing && thing.constructor ? thing.constructor.name : null;
      const tname = typeNameMatcher.exec( Object.prototype.toString.call( thing ) )[1];
      if ( tname !== cname && !! cname ) return cname;
      return tname;
    }

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.

// Arabic chars in initial, medial or final form are cursive
const CURSIVE_CHARS = "ﻰﺋﺊﭼﭽﭘﭙﮔﻎﻼﻬﻪﻊﺔﺒﺘﺎﺑﺗﺛﺟﺣﺧﺳﺷﺻﺿﻃﻇﻋﻏﺜﺠﺤﺨـﻓﻗﻛﻟﻣﻧﻫﻰﻳﻴﻌﻐﻔﻘﻠﻤﻨ";

class Utils {

    // "base64url" encoding defined here https://tools.ietf.org/html/rfc4648
    // the packed data format is from https://github.com/rawles/edit.tf
    // returns a Uint1Array
    static decodeBase64URLEncoded_(input, atob) {
        // adjust the input before passing to atob
        input = input.replace(/-/g, '+').replace(/_/g, '/');
        const pad = input.length % 4;
        if (pad) {
            if (pad === 1) throw new Error('Utils.decodeBase64URLEncoded E16: Input base64url string is the wrong length to determine padding');
            input += new Array(5-pad).join('=');
        }
        const packed = atob(input);

        // FUDGE as Unit8Array.set stores LSB first but we want MSB first in the bit array, getMsbCode reverses the bits
        const msbCodes = [...packed].map(c => getMsbCode(c));
        
        const buffer = new ArrayBuffer(msbCodes.length);
        const bytes = new Uint8Array(buffer);
        bytes.set(msbCodes);
        const bits = new Uint1Array(buffer);

        return getUnpackedData(bits);
    }

    // Output Line format from .tti file format https://zxnet.co.uk/teletext/documents/ttiformat.pdf
    static decodeOutputLine_(line) {
        const decoded = [];
        let decodeNextChar = false;
        for (const c of [...line]) {
            const code = c.charCodeAt(0);
            if (code == 27) { // ESC
                decodeNextChar = true;
            } else if (code >= 0x80) {
                const char = String.fromCharCode(code - 0x80);
                decoded.push(char);
            } else if (decodeNextChar) {
                const char = String.fromCharCode(code - 0x40);
                decoded.push(char);
                decodeNextChar = false;
            } else {
                decoded.push(c);
            }
        }
        return decoded;
    }


    static getRowsFromOutputLines_(lines) {
        const rows = [];
        const regEx = /^OL,(\d{1,2}),(.+)/;
        for (const line of [...lines]) {
            const matches = line.match(regEx);
            if (matches != null) {
                rows[matches[1]] = Utils.decodeOutputLine_(matches[2]);
            } else {
                console.warn('E66 getRowsFromOutputLines_: bad line', line);
            }
        }
        return rows;
    }

    static isCursive_(char) {
        return CURSIVE_CHARS.indexOf(char) != -1;
    }
}

const msbCodes = {};

// get charCode for a char with the bit significance reversed
function getMsbCode(char) {
    if (char in msbCodes) return msbCodes[char];
    
    const msbBits = [...char.charCodeAt(0).toString(2).padStart(8, '0')].reverse();
    msbCodes[char] = Number.parseInt(msbBits.join(''), 2); 
    return msbCodes[char];
}

// or is this better?
// function getMsbCode(char) {
//     if (char in msbCodes) return msbCodes[char];

//     const code = char.charCodeAt(0);
//     msbCodes[char] =
//               ((code & 0b10000000) >> 7)
//             + ((code & 0b01000000) >> 5)
//             + ((code & 0b00100000) >> 3)
//             + ((code & 0b00010000) >> 1)
//             + ((code & 0b00001000) << 1)
//             + ((code & 0b00000100) << 3)
//             + ((code & 0b00000010) << 5)
//             + ((code & 0b00000001) << 7);
//     return msbCodes[char];
// }


function getUnpackedData(bitArray) {
    // const firstBitIndex = (280 * row) + (7 * col);
    const page = [];

    for (let r = 0; r < 25; r++) {
        const rowChars = [];
        for (let c = 0; c < 40; c++) {
            let bitSignificance = 6;
            let charCode = 0;
            const firstBitIndex = (280 * r) + (7 * c);
            for (let bit = firstBitIndex; bit < firstBitIndex + 7; bit++) {
                charCode += bitArray[bit] * Math.pow(2, bitSignificance);
                bitSignificance--;
            }
            rowChars.push(String.fromCharCode(charCode));
        }
        page.push(rowChars.join(''));
    }
    return page;
}

var ENGINEERING = "QIECBAgQIIcWLGg2EDdy3QIKnXKgYtUE7f2QA2TB0wYr2DECAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYMS54fzJmix4-YCDToOLOjyZ0WLSkzo6AkcGHuZUcRHlB4dgyAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAQAEABAAWDP9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YNCho9zImSoAqBGoAp0FUy8-iChhz5UCA4MPEuZYgTAFyAFg1_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2DYCAAoACACeQHkBdYTJlixIkSKlSJEoUKIEBQABAAQAEABYN_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39g4AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGDn9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_YsAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIBix_f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f2LICAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAYs_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_39i0AgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgAIACAAgGLX9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9__f_3_9_Ytq-jT0yg7OXZs39w0Pzh3Ao_LLl3BZuHPl3dMIGllyBIWzrlLmkKJGTSJUycsoUqlZJYtXLzLBiyZlWjVs3IuHLp2UePXz9AgQokaBIlTJ0ChSqVoFi1cvQMGLJmgaNWzdA4cunaB49fP0ECDChoIkWNHQSJMqWgmTZ09BQo0qaCpVrV0FizatoLl29fQYMOLGgyZc2dBo06taDZt3b0HDjy5oOnXt3QePPr2g-ff38pgw4sZHJlzZyujTq1ktm3dvNcOPLmW6de3cn48-vZf59_fwZiHv3Y8uHYIjbMPPQDVCxcLf4E0-mXDk8mI-_dlFCn5a9_DKr6q-qvqr6q-qvqr6AFS390DJoGQKr6q-qvqr6q-qvqr6o";
var ADVERT = "QIECBAgQIJ9KDDmRUDZi3QU8PRk1QQeHIHDaIEDJiwYumDACdDwcnbLy6aeeXbl3dECBAgQIECBAgQIECBAgQIHwZkvcoCx0og8LNGjYwQPEjzpoWaNjBA82YHnTQwabEjTpowPEiBAgLHSiBbs1atjFA9SPe2pZqQNUHX1qQatSlrqQNW-5UsaIECAsdKIFidUqQJUCVAlVKlipchQJUCJanVIEqpAlSqlC5CgQIEB0ogQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQHSKBAgQYEH7ogQaGCApw_fEm54R3PCm5JuSKHoFUEVIECAudIoECBB6-___TB-_v0JTU_WqkZHFyQKHmjYgYBECpAqQIC50igQIEH___3_-iD__6FFSAig-IP6JCg26lzRr3avEgFUgLnSKBAg1f1X9lv_9NSBAgI6G-HX1V_EqBUqQJUqXBzagVSAudIoECD9_Qa2qL__6IMDzoq682qdAgQIEARAgQIECBAgVIC50igQIP_9AiaoFX__0VfV_1kjQIECBAgQBECBAgAoECpAgLnSKBBq__0CBCgQa___oreokCBAgQIECBAgQBECBAgVIECAudIoEHr__QIECBAg3_36FAgQIECBAgQIECAIgQIFSBAgQIAZ0igQf_7dAgKIECAinKf9bTR9QIv-N6i_ofzNagQIECBAgJnSKDR__tUBRAoe6NiBB_XYf_rqg_q2iD-gRb-iBAgQIECAmdIoNX_-1QFECDrq9IMH9h664P_D-w34P7DZ4ToECBAgQICZ0ig___5TQ8SfEHzQ82MPCzpoedEHzA82MPjDQ0-LNDSk0JnSOD___lNXVh_Qf9T3cx_oP-prqa_1S3Y0_q_zX-s1NdTUmdI6v_9-U1NUH9B_1NdTX-g_6mvpL_wMNTX-g1Nf6DAz1tSZ0j-_v0JREjQokaFEhRIUSNCiRoUCNAjRoEaBEhRo0CNGgBnSP9OgQFECCNPpIIVKfDkVaUWmggzoiCFPny5M6PTQIECAGdIjUAGlJnR0DBu5coGrFm0YMEE-kgpxYqChBjxUDNuwQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAy92np007s6AFSy9tOXvzQA7O_ryQTd-7L5DQVtpBJ3ZMvg";
var UK = "QIECBAgQIIcWLGg2EDFy2QIJu_cgZNUETLjQA2TN0xYr2DAodJIECBAgQIEGDB4_PUCBAgQIECBAgQIECBAgQIEANkvaMih0kgQIECDA1Qfv__OgQYGCBAgQIECBAgQIECBAgQIECBAgKHSSBAgQIH6FR-__-v7___oECBAgQIEAORPmxUE6LXpoECAodJIECBAoQKum7______9-gQIECBAgQA82_Zs39-aB8-QIAh0kgQIECBAgSev_____v06BAgQIECBAgQIECBAgQIECBAgKHSSBAgQIECBR00____-_w9GCBAgQIECBAgQIECBAgQIECAodJIECBAgQIECD8rx________ECBAgQIECBAgQIECBAgQICh0kgQIECBAgQLETRlv_______6oECBAgQIECBAgQIECBAgKHSyBAgQIHGQlwYIEH_-_x_____9-dECBAgQIECBAgQIECAIdLIECDAmJbfz_-0RJ0qBV________7sECBAgQIECBAgQIAh0sgQIMzAl-__fX5Sg0JECvX______586IECBAgQIECBAgCHSyBAgwJiW9OjX_0qBAgQIEX________-l8fPjBAgQIECAIdLIEHBYhQIECBQxQICWDhg5fv____________tUCBAgQIAh0sgzIECBAgQIEGlAgQEtP_______________-lQIECBAgCHSyBUwQIECBAgQakCBASQqv_____________-6FAgQIECAIdLIECJygQIECBAgaoEBJBg______________5-OiBAgQIAh0sgQKGKBAgQIEHBKgJIMH7____8v__________QoECBAgCHSyBRmQIECBA4RoECAkgVoVaNel________r16FAgQIECAIdLINCFAgwOEyBAgQICSBAgQePn7___r06RAgQIECBAgQIAh0sgQLeKxCgQIECBAgJIECDR__v0aNGhQIECBAgQIECBAgCHSSBAgQIECBAgQIECBAgQYP3_-1QIECBAgQIECBAgQIECAIdJIECBAgQIECBAgQIECBB6boUSBAgQIECBAgQIECBAgQIAh0kgQIECBAgQIECBAgQIFStAgQIECBAgQIECBAgQIECBAgAzsvjognZe_MFIy4cmzTuy8wdTfwQU-G_l0DVKy-lhyad6A";
var SPLASH = "QIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECAsaMIEGDx8YIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQICxowg0N2bdmgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgLGjCBFvz9_6BAZQIECBAgQIECAig0NECBAgQIECBAgQIECAsaMcOD5tjyoGCBAgQIECBAgQICLhCgQIECBAgQIECBAgQICxowoTod79ArSEcHBAgQIECBAg0ITKBAgQcGCBAgQIECBAgLGjCBBgXIUCAyRXmlLBAgQIECBuZ4fPn___aoECBAgQIECBAaQIECBAgQIEBFAgQaTPDh8-f___-vXo9f9qgQIECBAgQIECBAgQIEBFAgQcOHz5____69ejRoECBAg__0CBAgQIECBAgQIECBAgQEUCL___r16NGXQIOHDh8-NCOD-3QIECBAgQIECBAgQIECBARQINf0ug-fPi9evRo0aBAgI6v6VAgQIECBAgQIECBAgQIEBFAgRf2hfBw4cOHD58-fPiAj-_oECBAgQIECBAgQIECBAgQEUCBBr-l0SNGjRo0CBAgQEcH9qgQIECBAgQIECBAgQIECBARQIECL-0Lr169ev-fPnxAR1f0KBAgQIECBAgQIAiBAgQIEBFAgQINf3hw4cOCBAgQIEBH-_QIECBAgQIECBAgCIECBAgQIEB1ARRL1-_____________7VAgOIECBAgQIECAIgQIECBAgQHUBNAgQf26BAgQIN_8ijRoECA4gQIECBAgQIAiBAgQIECA6gQE0CDV_QoECBAgRf2iBAgQIEBxAgQIECBAgCIECBAgQIDqBAgQE0aFAgQIECBAgQIECBAgQHECBAgQIECAIgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIBp0Kg3cNqDSggdMuPRh3ZOe_N074eWVf0y7MvTL46IECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQKMalAyYMmKCplx6ECZBT35unfDyyoJnTIuQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECA";
var testpages = {
	ENGINEERING: ENGINEERING,
	ADVERT: ADVERT,
	UK: UK,
	SPLASH: SPLASH
};

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

const NS = "http://www.w3.org/2000/svg";

let clipPathId = 0; // used by ClipPath constructor
let _window;        // set by SVG constructor
let _doc;           // set by SVG constructor

// The API exposed here is a subset of svg.js v3 - https://svgjs.com/docs/3.0/
// This wraps objects around DOM Elements

class Element {
    constructor() {
        // subclass should create this._e
    }

    _node() {
        return this._e;
    }

    _removeNode() {
        this._e = null;
    }

    attr_(objOrName, val) {
        if (typeof objOrName == 'object') {
            for (const attrName in objOrName) {
                if (objOrName[attrName] == null)
                    this._e.removeAttribute(attrName);
                else
                    this._e.setAttribute(attrName, objOrName[attrName]);
            }
        } else {
            if (typeof val == 'undefined')
                return this._e.getAttribute(objOrName);
            else if (val == null)
                this._e.removeAttribute(objOrName);
            else
                this._e.setAttribute(objOrName, val);
        }
        return this;
    }

    addClass_(name) {
        if (!this.hasClass_(name)) {
            const classes = this.classes_();
            classes.push(name);
            this._e.setAttribute('class', classes.join(' '));
        }
        return this;
    }

    hasClass_(name) {
        return this.classes_().indexOf(name) !== -1;
    }

    classes_() {
        const classes = this._e.getAttribute('class');
        return classes == null ? [] : classes.split(' ');
    }

    removeClass_(name) {
        if (this.hasClass_(name))
            this._e.setAttribute('class', this.classes_().filter(c => c !== name).join(' '));
        return this;
    }

    toggleClass_(name) {
        if (this.hasClass_(name))
            this.removeClass_(name);
        else
            this.addClass_(name);
        return this;
    }

    data_(objOrName, val) {
        if (typeof objOrName == 'object') {
            for (const dataProp in objOrName) {
                if (objOrName[dataProp] == null)
                    delete this._e.dataset[dataProp];
                else
                    this._e.dataset[dataProp] = objOrName[dataProp];
            }
        } else {
            if (typeof val == 'undefined')
                return this._e.dataset[objOrName];
            else if (val == null)
                delete this._e.dataset[objOrName];
            else
                this._e.dataset[objOrName] = val;
        }
        return this;
    }

}

class SVG extends Element {
    constructor(windowDom) {
        super();
        _window = windowDom;
        _doc = _window.document;

        this._e = _doc.createElementNS(NS, "svg");
        this._e.setAttribute('xmlns', NS);
        return this;
    }

    addTo_(selector) {
        const node = _doc.querySelector(selector);
        if (node) {
            node.appendChild(this._e);
        } else {
            throw new Error('@techandsoftware/teletext: E117: addTo failed to match provided selector')
        }
        return this;
    }

    viewbox_(viewbox) {
        this._e.setAttribute('viewBox', viewbox);
        return this;
    }

    size_(width, height) {
        this._e.setAttribute('width', width);
        this._e.setAttribute('height', height);
        return this;
    }

    style_(style) {
        const styleNode = _doc.createElementNS(NS, 'style');
        styleNode.append(style);
        this._e.append(styleNode);
        return this;
    }

    group_() {
        const group = new Group();
        this._e.append(group._node());
        return group;
    }

    width_() {
        return this._e.clientWidth;
    }

    height_() {
        return this._e.clientHeight;
    }

    symbol_(id) {
        const symbol = new SVGSymbol(id);
        this._e.append(symbol._node());
        return symbol;
    }
}


class Group extends Element {
    constructor() {
        super();
        this._e = _doc.createElementNS(NS, 'g');
        this._c = [];
        return this;
    }

    group_() {
        const group = new Group();
        this._e.append(group._node());
        this._c.push(group);
        return group;
    }

    plain_(text) {
        const textObj = new Text(text);
        this._e.append(textObj._node());
        this._c.push(textObj);
        return textObj;
    }

    defs_() {
        const defs = new Defs();
        this._e.append(defs._node());
        return defs;
    }

    rect_(width, height) {
        const rect = new Rect(width, height);
        this._e.append(rect._node());
        this._c.push(rect);
        return rect;
    }

    last_() {
        return this._c[this._c.length - 1];
    }

    children_() {
        return this._c;
    }

    clipWith_(clipPath) {
        this._e.setAttribute('clip-path', `url("#${clipPath._node().id}")`);
        return this;
    }

    unclip_() {
        this._e.removeAttribute('clip-path');
        return this;
    }

    remove_() {
        this._e.parentNode && this._e.parentNode.removeChild(this._e);
        this._e = null;
        this._c.forEach(c => c._removeNode());
        this._c = [];
    }

    line_(x1, y1, x2, y2) {
        const line = new Line(x1, y1, x2, y2);
        this._e.append(line._node());
        this._c.push(line);
        return line;
    }

    use_(id) {
        const use = new Use(id);
        this._e.append(use._node());
        this._c.push(use);
        return use;
    }

    image_(width, height) {
        const image = new Image(width, height);
        this._e.append(image._node());
        this._c.push(image);
        return image;
    }
}

class Image extends Element {
    constructor(width, height) {
        super();
        this._e = _doc.createElementNS(NS, 'image');
        this._e.setAttribute('width', parseInt(width));
        this._e.setAttribute('height', parseInt(height));
        return this;
    }

    attr(...params) {
        return this.attr_(...params);
    }
}

class Use extends Element {
    constructor(id) {
        super();
        this._e = _doc.createElementNS(NS, 'use');
        this._e.setAttribute('href', `#${id}`);
        return this;
    }

    fill_(fill) {
        this._e.setAttribute('fill', fill);
        return this;
    }

    move_(x, y) {
        this._e.setAttribute('x', x);
        this._e.setAttribute('y', y);
        return this;
    }
}

// Called SVGSymbol to avoid clash with built-in Symbol
class SVGSymbol extends Element {
    constructor(id) {
        super();
        this._e = _doc.createElementNS(NS, 'symbol');
        this._e.setAttribute('id', id);
        return this;
    }

    rect_(width, height) {
        const rect = new Rect(width, height);
        this._e.append(rect._node());
        return rect;
    }
}

class Text extends Element {
    constructor(text) {
        super();
        this._e = _doc.createElementNS(NS, 'text');
        this._e.append(text);
        return this;
    }

    plain_(text) {
        this._e.textContent = text;
        return this;
    }

    fill_(fill) {
        this._e.setAttribute('fill', fill);
        return this;
    }

}

class Defs extends Element {
    constructor() {
        super();
        this._e = _doc.createElementNS(NS, 'defs');
        return this;
    }

    clip_() {
        const clip = new ClipPath();
        this._e.append(clip._node());
        return clip;
    }

    find_(selector) {
        const matchedEls = this._e.querySelectorAll(selector);
        return [...matchedEls].map(wrapSVGElement);
    }

    rect_(width, height) {
        const rect = new Rect(width, height);
        this._e.append(rect._node());
        return rect;
    }
}

class ClipPath extends Element {
    constructor() {
        super();
        this._e = _doc.createElementNS(NS, 'clipPath');
        this._e.setAttribute('id', `clipPath-${clipPathId}`);
        clipPathId++;
        return this;
    }

    children_() {
        return [...this._e.children].map(wrapSVGElement);
    }

    add_(shape) {
        this._e.appendChild(shape._node());
    }
}

class Rect extends Element {
    constructor(widthOrEl, height) {
        super();
        if (widthOrEl instanceof _window.SVGElement) {
            this._e = widthOrEl;
            return this;
        }
        const width = widthOrEl;
        this._e = _doc.createElementNS(NS, 'rect');
        this._e.setAttribute('width', parseInt(width));
        this._e.setAttribute('height', parseInt(height));
        return this;
    }

    fill_(fill) {
        this._e.setAttribute('fill', fill);
        return this;
    }

    move_(x, y) {
        this._e.setAttribute('x', x);
        this._e.setAttribute('y', y);
        return this;
    }

    width_(width) {
        if (width === undefined)
            return parseInt(this._e.getAttribute('width'));

        this._e.setAttribute('width', parseInt(width));
        return this;
    }

    height_(height) {
        if (height === undefined)
            return parseInt(this._e.getAttribute('height'));

        this._e.setAttribute('height', parseInt(height));
        return this;
    }

    remove_() {
        this._e.parentNode && this._e.parentNode.removeChild(this._e);
        this._e = null;
    }

}

class Line extends Element {
    constructor(x1, y1, x2, y2) {
        super();
        this._e = _doc.createElementNS(NS, 'line');
        this._e.setAttribute('x1', x1);
        this._e.setAttribute('y1', y1);
        this._e.setAttribute('x2', x2);
        this._e.setAttribute('y2', y2);
        return this;
    }
}


function wrapSVGElement(el) {
    let wrappedEl;
    switch (el.constructor.name) {
        case "SVGRectElement":
            wrappedEl = new Rect(el);
            break;
        default:
            throw new Error("SVG:wrapSVGElement Unable to wrap SVG element of type " + el.constructor.name);
    }
    return wrappedEl;
}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

// Exported in public interface
const Colour = {
    BLACK  : Symbol('BLACK'),
    RED    : Symbol('RED'),
    GREEN  : Symbol('GREEN'),
    YELLOW : Symbol('YELLOW'),
    BLUE   : Symbol('BLUE'),
    MAGENTA: Symbol('MAGENTA'),
    CYAN   : Symbol('CYAN'),
    WHITE  : Symbol('WHITE'),
};
Object.freeze(Colour);

const CellType = {
    ALPHA_ : Symbol('ALPHA'),
    MOSAIC_CONTIGUOUS_: Symbol('MOSAIC_CONTIGUOUS'),
    MOSAIC_SEPARATED_: Symbol('MOSAIC_SEPARATED'),
    G3_    : Symbol('G3')
};
Object.freeze(CellType);

const CellSize = {
    NORMAL_SIZE_:   Symbol('NORMAL_SIZE'),
    DOUBLE_HEIGHT_: Symbol('DOUBLE_HEIGHT'),
    DOUBLE_WIDTH_:  Symbol('DOUBLE_WIDTH'),
    DOUBLE_SIZE_:   Symbol('DOUBLE_SIZE'),
};
Object.freeze(CellSize);

// Exported in public interface
class Attributes {
    static charFromTextColour(colour) {
        if (colour in textColourToChar) return textColourToChar[colour];
        throw new Error('Attributes.charFromTextColour: bad colour: ' + colour);
    }

    static charFromGraphicColour(colour) {
        if (colour in graphicColourToChar) return graphicColourToChar[colour];
        throw new Error('Attributes.charFromGraphicColour: bad colour');
    }

    static charFromAttribute(attrib) {
        if (attrib in spacingAttributesToChar) return spacingAttributesToChar[attrib];
        throw new Error('Attributes.charFromAttribute: bad attribute');
    }
}

Attributes.TEXT_COLOUR         = CellType.ALPHA_;
Attributes.MOSAIC_COLOUR       = Symbol('MOSAIC_COLOUR');
Attributes.NEW_BACKGROUND      = Symbol('NEW_BACKGROUND');
Attributes.BLACK_BACKGROUND    = Symbol('BLACK_BACKGROUND');
Attributes.CONTIGUOUS_GRAPHICS = CellType.MOSAIC_CONTIGUOUS_;
Attributes.SEPARATED_GRAPHICS  = CellType.MOSAIC_SEPARATED_;
Attributes.ESC                 = Symbol('ESC');
Attributes.FLASH               = Symbol('FLASH');
Attributes.STEADY              = Symbol('STEADY');
Attributes.NORMAL_SIZE         = CellSize.NORMAL_SIZE_;
Attributes.DOUBLE_HEIGHT       = CellSize.DOUBLE_HEIGHT_;
Attributes.DOUBLE_WIDTH        = CellSize.DOUBLE_WIDTH_;
Attributes.DOUBLE_SIZE         = CellSize.DOUBLE_SIZE_;
Attributes.CONCEAL             = Symbol('CONCEAL');
Attributes.HOLD_MOSAICS        = Symbol('HOLD_MOSAICS');
Attributes.RELEASE_MOSAICS     = Symbol('RELEASE_MOSAICS');
Attributes.START_BOX           = Symbol('START_BOX');
Attributes.END_BOX             = Symbol('END_BOX');
Attributes.UNKNOWN_            = Symbol('UNKNOWN'); // pseudo-attribute

// private functions/data below

function attribFromChar(level, char) {
    let attribute = null;
    let colour = null;
    if (char in attributeChars && charCodesByLevel[level].includes(char.charCodeAt(0))) {
        if (char in charToTextColour) {
            attribute = Attributes.TEXT_COLOUR;
            colour = attributeChars[char];
        } else if (char in charToGraphicColour) {
            attribute = Attributes.MOSAIC_COLOUR;
            colour = attributeChars[char];
        } else
            attribute = attributeChars[char];
    } else if (char.charCodeAt(0) <= 0x1f)
        attribute = Attributes.UNKNOWN_;
    return {
        attribute_: attribute,
        colour_: colour
    };
}

function fillColourFromColourAttrib(colour) {
    return colourAttribToFillColour[colour];
}

const colourAttribToFillColour = {
    [Colour.BLACK]   : '#000',
    [Colour.RED]     : '#f00',
    [Colour.GREEN]   : '#0f0',
    [Colour.YELLOW]  : '#ff0',
    [Colour.BLUE]    : '#00f',
    [Colour.MAGENTA] : '#f0f',
    [Colour.CYAN]    : '#0ff',
    [Colour.WHITE]   : '#fff',
};
Object.freeze(colourAttribToFillColour);

// TODO - tidy up strings
const charToTextColour = {
    [String.fromCharCode(0x0)] : Colour.BLACK,
    [String.fromCharCode(0x1)] : Colour.RED,
    [String.fromCharCode(0x2)] : Colour.GREEN,
    [String.fromCharCode(0x3)] : Colour.YELLOW,
    [String.fromCharCode(0x4)] : Colour.BLUE,
    [String.fromCharCode(0x5)] : Colour.MAGENTA,
    [String.fromCharCode(0x6)] : Colour.CYAN,
    [String.fromCharCode(0x7)] : Colour.WHITE,
};
Object.freeze(charToTextColour);
const charToGraphicColour = {
    [String.fromCharCode(0x10)] : Colour.BLACK,
    [String.fromCharCode(0x11)] : Colour.RED,
    [String.fromCharCode(0x12)] : Colour.GREEN,
    [String.fromCharCode(0x13)] : Colour.YELLOW,
    [String.fromCharCode(0x14)] : Colour.BLUE,
    [String.fromCharCode(0x15)] : Colour.MAGENTA,
    [String.fromCharCode(0x16)] : Colour.CYAN,
    [String.fromCharCode(0x17)] : Colour.WHITE,
};
Object.freeze(charToGraphicColour);
const attributeChars = {
    [String.fromCharCode(0x08)] : Attributes.FLASH,
    [String.fromCharCode(0x09)] : Attributes.STEADY,
    [String.fromCharCode(0x0a)] : Attributes.END_BOX,
    [String.fromCharCode(0x0b)] : Attributes.START_BOX,
    [String.fromCharCode(0x0c)] : Attributes.NORMAL_SIZE,
    [String.fromCharCode(0x0d)] : Attributes.DOUBLE_HEIGHT,
    [String.fromCharCode(0x0e)] : Attributes.DOUBLE_WIDTH,
    [String.fromCharCode(0x0f)] : Attributes.DOUBLE_SIZE,
    [String.fromCharCode(0x18)] : Attributes.CONCEAL,
    [String.fromCharCode(0x19)] : Attributes.CONTIGUOUS_GRAPHICS,
    [String.fromCharCode(0x1a)] : Attributes.SEPARATED_GRAPHICS,
    [String.fromCharCode(0x1b)] : Attributes.ESC,
    [String.fromCharCode(0x1c)] : Attributes.BLACK_BACKGROUND,
    [String.fromCharCode(0x1d)] : Attributes.NEW_BACKGROUND,
    [String.fromCharCode(0x1e)] : Attributes.HOLD_MOSAICS,
    [String.fromCharCode(0x1f)] : Attributes.RELEASE_MOSAICS,
};

const textColourToChar = {};
for (const char in charToTextColour) {
    textColourToChar[charToTextColour[char]] = char;
    attributeChars[char] = charToTextColour[char];
}
Object.freeze(textColourToChar);
const graphicColourToChar = {};
for (const char in charToGraphicColour) {
    graphicColourToChar[charToGraphicColour[char]] = char;
    attributeChars[char] = charToGraphicColour[char];
}
Object.freeze(graphicColourToChar);
Object.freeze(attributeChars);

const spacingAttributesToChar = {};
for (const char in attributeChars) {
    spacingAttributesToChar[attributeChars[char]] = char;
}
Object.freeze(spacingAttributesToChar);

// 'level 0' is fake but derived from Ceefax 1975 pages at https://archive.teletextarchaeologist.org/Pages/Details/21000
// which has different control codes
const Level = {
    0:   Symbol('0'),   // 7 colour text and contiguous graphics, flashing
    1:   Symbol('1'),   // + background colours, separated graphics, conceal, box, double height
    1.5: Symbol('1.5'), // + black text/graphics
    2.5: Symbol('2.5'), // + double width, double size
};
Object.freeze(Level);

const charCodesByLevel = {};
charCodesByLevel[Level[0]] = [     // fictional level 0
    0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7,
    0x08, 0x09,
    0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
];
charCodesByLevel[Level[1]] = [...charCodesByLevel[Level[0]]].concat([
    0x0a, 0x0b, 0x0c, 0x0d, 0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
]);
charCodesByLevel[Level[1.5]] = [...charCodesByLevel[Level[1]]].concat([0x0, 0x10]);
charCodesByLevel[Level[2.5]] = [...charCodesByLevel[Level[1.5]]].concat([0xe, 0xf]);
Object.freeze(charCodesByLevel);

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.

const WIDTH_PX = 400;
const HEIGHT_PX = 250;
const COLS = 40;
const ROWS$1 = 25;
const SCREEN_SCALE = 2;
const ASPECT_RATIO_VERTICAL_SCALE = {
    1.33: WIDTH_PX/(1.33 * HEIGHT_PX),
    1.2:  WIDTH_PX/(1.2  * HEIGHT_PX),
    1.22: WIDTH_PX/(1.22 * HEIGHT_PX),
};
const DEFAULT_ASPECT_RATIO = 1.2;

const CELL_HEIGHT = HEIGHT_PX / ROWS$1;
const CELL_WIDTH = WIDTH_PX / COLS;
const CELL_DOUBLE_HEIGHT = CELL_HEIGHT * 2;
const CELL_DOUBLE_WIDTH = CELL_WIDTH * 2;

const TEXT_X_OFFSET = CELL_WIDTH / 2;           // middle of cell
const TEXT_Y_OFFSET = CELL_HEIGHT * (4 / 5);    // font baseline

// FUDGE contiguous mosaics are slightly bigger than they should be to avoid tiny gaps on adjacent characters.
// Suspect the gaps are due to font antialiasing, with no way to switch antialiasing off.
const MOSAIC_METRIC = {
    _contiguous: {
        _textLength: CELL_WIDTH + 0.4,
        _DX: 0 - TEXT_X_OFFSET - 0.2,
    },
    _separated: {
        _textLength: CELL_WIDTH,
        _DX: 0 - TEXT_X_OFFSET + 0.5,
    }
};
Object.freeze(MOSAIC_METRIC);

class VectorViewBase {
    constructor(model, dom) {
        this._svg = new SVG(dom)
            .viewbox_(`0 0 ${WIDTH_PX - 1} ${HEIGHT_PX - 1}`)
            .size_(WIDTH_PX * SCREEN_SCALE, HEIGHT_PX * SCREEN_SCALE * ASPECT_RATIO_VERTICAL_SCALE[DEFAULT_ASPECT_RATIO])
            .attr_({
                'preserveAspectRatio': 'none',
                'style': 'font-family: sans-serif'
            })
            .style_(getStyle());

        this.d = this._svg.group_().attr_('class', 'conceal_concealed flash_flashing');

        this._aspectRatio = DEFAULT_ASPECT_RATIO;

        this._createDisplay();
        this._createBoxModeClip();
        this._gridLayer = null;

        this._model = model;
        this._listenerId = this._model.onSet_.attach_(
            () => this._update()
        );
        this._boxMode = false;
        this._mixMode = false;
        this._pageContainsBox = false;

        this._plugins = {};
        console.debug('VectorViewBase constructed');
    }

    addTo_(selector) {
        this._svg.addTo_(selector);
    }

    detach_() {
        this._model.onSet_.detach_(this._listenerId);
        this._listenerId = null;
    }

    _update() {
        console.debug('## View._update');
        let nextRowHidden = false;  // row might be hidden if row above contains double height or size
        let pageContainsFlash = false;
        this._pageContainsBox = false;
        this.d.removeClass_('flash_flashing');
        this._gridrows.forEach((rowView, rowIndex) => {
            let nextCellObscured = false;   // cell might be obscured if previous cell contains double width or size
            this._resetRow(rowIndex);
            if (nextRowHidden) {
                nextRowHidden = false;
                this._clearRowCells(rowView, rowIndex);
                return;
            }

            const rowModel = this._model.getRow_(rowIndex);
            let previousBg, previousBoxed;
            rowView.forEach((cellView, cellIndex) => {
                if (nextCellObscured) {
                    nextCellObscured = false;
                    this._clearCell(cellView);
                    this._extendBackgroundForRow(rowIndex);
                    if (previousBoxed) this._extendBox();
                    return;
                }

                const cell = rowModel.getCell_(cellIndex);
                const bg = fillColourFromColourAttrib(cell.bgColour_);
                const isMosaicByte = cell.isMosaicByte_();
                const fill = fillColourFromColourAttrib(cell.fgColour_);
                const attr = this._getCellAttr(cell.type_, isMosaicByte, cell.isCursive_);
                this._renderCell(cellView, cell, attr, fill, cellIndex, rowIndex, isMosaicByte);

                if (cell.boxed_) {
                    if (previousBoxed) this._extendBox();
                    else this._setBoxForRow(rowIndex, cellIndex);
                    this._pageContainsBox = true;
                }

                if (previousBg == bg) this._extendBackgroundForRow(rowIndex);
                else this._setBackgroundForRow(rowIndex, cellIndex, bg);

                if (cell.size_ == CellSize.DOUBLE_WIDTH_ || cell.size_ == CellSize.DOUBLE_SIZE_) nextCellObscured = true;
                previousBg = bg;
                previousBoxed = cell.boxed_;
                if (cell.flashing_) pageContainsFlash = true;
            });

            if (rowModel.doubleHeight_) {
                this._setRowDoubleHeight(rowIndex);
                this._setBoxDoubleHeight();
                nextRowHidden = true;
            } else {
                nextRowHidden = false;
            }

            this._makeClipFromBoxesForRow(rowIndex);
        });
        if ('_endOfUpdate' in this._plugins) this._plugins._endOfUpdate(this._svg.width_(), this._svg.height_());
        this.d.addClass_('conceal_concealed');
        // FUDGE keep flashing synchronised
        if (pageContainsFlash) setTimeout(() => this.d.addClass_('flash_flashing'), 100);
        this._refreshMixMode();
    }

    _resetRow(rowIndex) {
        this._resetBackgroundForRow(rowIndex);
        this._resetBoxClipForRow(rowIndex);
    }

    _clearRowCells(rowView, rowNum) {
        if ('_clearCellsForRow' in this._plugins)
            this._plugins._clearCellsForRow(rowView.length, rowNum);

        rowView.forEach(cellView => this._clearCell(cellView));
    }

    _clearCell(cellView) {
        cellView.plain_(' ')
            .attr_({
                dx: null,
                dy: null,
                textLength: null,
                lengthAdjust: null,
                'text-anchor': null,
                transform: null,
                class: null,
            })
        ;
    }

    _renderCell(cellView, cell, attr, fill, cellIndex, rowIndex, isMosaic) {
        this._renderText(cellView, cell, attr, fill, cellIndex, rowIndex);

        if ((cell.type_ == CellType.MOSAIC_CONTIGUOUS_ && isMosaic) || cell.type_ == CellType.G3_) cellView.addClass_('mosaic');
        else if (cell.type_ == CellType.MOSAIC_SEPARATED_ && isMosaic) cellView.addClass_('mosaic_separated');
    }

    _renderText(cellView, cell, attr, fill, cellIndex, rowIndex) {
        cellView.plain_(cell.char_).attr_(attr).fill_(fill);
        if (cell.size_ == CellSize.DOUBLE_HEIGHT_)
            cellView.attr_('transform', `translate(0 ${_getYTranslate(rowIndex)}) scale(1 2)`);
        else if (cell.size_ == CellSize.DOUBLE_WIDTH_)
            cellView.attr_('transform', `translate(${_getXTranslate(cellIndex)} 0) scale(2 1)`);
        else if (cell.size_ == CellSize.DOUBLE_SIZE_)
            cellView.attr_('transform', `translate(${_getXTranslate(cellIndex)} ${_getYTranslate(rowIndex)}) scale(2 2)`);

        if (cell.flashing_) cellView.addClass_('flash');
        if (cell.concealed_) cellView.addClass_('conceal');
    }

    reveal_() {
        this.d.toggleClass_('conceal_concealed');
    }

    setFont_(font) {
        let newFont = font;
        if (font == 'native')
            newFont = '-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif';
        else if (font == 'default')
            newFont = 'sans-serif';

        this._svg.attr_('style', `font-family: ${newFont}`);
    }

    grid_() {
        if (this._gridLayer) {
            this._gridLayer.remove_();
            this._gridLayer = null;
        } else {
            this._drawGrid();
        }
    }

    mixMode_() {
        if (this._mixMode) {
            this._mixMode = false;
            this._bgLayer.attr_('opacity', null).unclip_();
        } else {
            this._mixMode = true;
            this._setMixMode();
        }
    }

    setAspectRatio_(aspectRatio) {
        this._aspectRatio = aspectRatio;
        this.setHeight_(this._svg.height_());
    }

    setHeight_(height) {
        const width = this._aspectRatio == 'natural' ? height * (WIDTH_PX / HEIGHT_PX) : height * this._aspectRatio;
        this._svg.size_(width, height);
    }

    _setMixMode() {
        if (this._boxMode && this._pageContainsBox)
            this._bgLayer.attr_('opacity', 0.3);
        else if (this._pageContainsBox)
            this._bgLayer.clipWith_(this._boxLayer).attr_('opacity', 0.3);
        else
            this._bgLayer.attr_('opacity', 0);
    }

    _refreshMixMode() {
        if (this._mixMode) this._setMixMode();
    }

    boxMode_() {
        if (!this._boxMode) {
            this.d.clipWith_(this._boxLayer);
            this._boxMode = true;
            console.log('box activated');
        } else {
            this.d.unclip_();
            this._boxMode = false;
            console.log('box deactivated');
        }
        this._refreshMixMode();
    }

    _drawGrid() {
        this._gridLayer = this.d.group_();
        for (let row = 0; row < ROWS$1; row++) {
            this._gridLayer.line_(0, row * CELL_HEIGHT, WIDTH_PX - 1, row * CELL_HEIGHT).attr_({
                stroke: '#555',
                'stroke-width': 0.5,
            });
        }
        for (let col = 0; col < COLS; col++) {
            this._gridLayer.line_(col * CELL_WIDTH, 0, col * CELL_WIDTH, HEIGHT_PX - 1).attr_({
                stroke: '#555',
                'stroke-width': 0.5,
            });
        }
    }

    _createBoxModeClip() {
        // FUDGE can't use groups directly in <clipPath> https://github.com/w3c/fxtf-drafts/issues/17
        // Boxed cells are buffered and tagged with data-boxbuffer as the row is constructed
        // Then moved to the <clipPath> stored in this._boxLayer and tagged with data-r=rowNum
        this._defs = this.d.defs_();
        this._lastBoxBuffer = null;
        this._boxLayer = this._defs.clip_();
    }

    _createDisplay() {
        this._createRowBackgrounds();
        this._createCells();
    }

    _createRowBackgrounds() {
        const bgrows = [];
        const bgGroup = this.d.group_();
        bgGroup.attr_({
            'shape-rendering': 'crispEdges',
            id: 'background'
        });
        this._bgrows = bgrows;   // store backgrounds per row
        this._bgLayer = bgGroup;
    }

    _createCells() {
        const gridrows = [];
        const textGroup = this.d.group_().attr_({
            'text-anchor': 'middle',
            'fill': '#fff'
        }).attr_('id', 'textlayer');
        for (let rowNum = 0; rowNum < ROWS$1; rowNum++) {
            const rowCells = [];
            for (let colNum = 0; colNum < COLS; colNum++) {
                rowCells.push(textGroup.plain_(getRandomLetter()).attr_({
                    x: (colNum * CELL_WIDTH) + TEXT_X_OFFSET,
                    y: (rowNum * CELL_HEIGHT) + TEXT_Y_OFFSET,
                }));
            }
            gridrows.push(rowCells);
        }
        this._gridrows = gridrows;   // text per cell per row: [rowNum][colNum]
        this._textLayer = textGroup;
    }

    _resetBoxClipForRow(rowNum) {
        this._boxLayer.children_()
            .filter(b => b.data_('r') == rowNum)
            .forEach(b => b.remove_());
    }

    _resetBackgroundForRow(rowNum) {
        if (this._bgrows[rowNum]) this._bgrows[rowNum].remove_();
        this._bgrows[rowNum] = this._bgLayer.group_();
    }

    _extendBackgroundForRow(rowNum) {
        const last = this._bgrows[rowNum].last_();
        const width = last.width_();
        last.width_(width + CELL_WIDTH);
    }

    _setBackgroundForRow(rowNum, colNum, colour) {
        const x = colNum * CELL_WIDTH;
        const y = rowNum * CELL_HEIGHT;
        this._bgrows[rowNum]
            .rect_(CELL_WIDTH, CELL_HEIGHT)
            .fill_(colour)
            .move_(x, y);
    }

    _extendBox() {
        const width = this._lastBoxBuffer.width_();
        this._lastBoxBuffer.width_(width + CELL_WIDTH);
    }

    _setRowDoubleHeight(rowNum) {
        this._bgrows[rowNum].children_().forEach(bg => bg.attr_('height', CELL_DOUBLE_HEIGHT));
    }

    _setBoxDoubleHeight() {
        this._defs.find_('[data-boxbuffer]').forEach(box => box.height_(CELL_DOUBLE_HEIGHT));
        // TODO might be quicker to filter instead of using a selector
    }

    _setBoxForRow(rowNum, colNum) {
        const x = colNum * CELL_WIDTH;
        const y = rowNum * CELL_HEIGHT;
        this._lastBoxBuffer = this._defs.rect_(CELL_WIDTH, CELL_HEIGHT).data_('boxbuffer', true).move_(x, y);
    }

    // FUDGE move boxes tagged with data-boxbuffer into the clip layer.
    _makeClipFromBoxesForRow(rowNum) {
        this._defs.find_('[data-boxbuffer]').forEach(box => {
            box.data_({
                r: rowNum,
                boxbuffer: null
            });
            this._boxLayer.add_(box);
        });
    }

    _getCellAttr(cellType, isMosaicChar, isCursive) {
        if ((cellType == CellType.MOSAIC_CONTIGUOUS_ && isMosaicChar) || cellType == CellType.G3_) {
            return {
                dx: MOSAIC_METRIC._contiguous._DX,
                dy: -0.15,
                textLength: MOSAIC_METRIC._contiguous._textLength,
                lengthAdjust: 'spacingAndGlyphs',
                'text-anchor': 'start',
                transform: null,
                class: null,
            };
        } else if (cellType == CellType.MOSAIC_SEPARATED_ && isMosaicChar) {
            return {
                dx: MOSAIC_METRIC._separated._DX,
                dy: null,
                textLength: MOSAIC_METRIC._separated._textLength,
                lengthAdjust: 'spacingAndGlyphs',
                'text-anchor': 'start',
                transform: null,
                class: null,
            };
        }
        return {
            dx: null,
            dy: null,
            textLength: isCursive ? CELL_WIDTH : null,
            lengthAdjust: isCursive ? 'spacingAndGlyphs' : null,
            'text-anchor': null,
            transform: null,
            class: null,
        };
    }

    registerPlugin(name, methods) {
        if ('renderBackground' in methods)
            this._plugins._background = methods.renderBackground;
        if ('renderMosaic' in methods)
            this._plugins._mosaic = methods.renderMosaic; 
        if ('endOfPageUpdate' in methods)
            this._plugins._endOfUpdate = methods.endOfPageUpdate;
        if ('clearCellsForRow' in methods)
            this._plugins._clearCellsForRow = methods.clearCellsForRow;

        return {
            lookupColour: colourLookupFn,
            isDoubleHeight: isDoubleHeightFn,
            isDoubleWidth: isDoubleWidthFn,
            isDoubleSize: isDoubleSizeFn,
            isSeparatedMosaic: isSeparatedMosaicFn,
            createImageOverlay: this._createImageOverlay.bind(this)
        };
    }

    _createImageOverlay() {
        const image = this.d.image_(WIDTH_PX, HEIGHT_PX);
        image.attr_('preserveAspectRatio', 'none');
        return image;
    }
}

// expose constants here for subclasses
VectorViewBase._CELL_WIDTH = CELL_WIDTH;
VectorViewBase._CELL_HEIGHT = CELL_HEIGHT;
VectorViewBase._CELL_DOUBLE_WIDTH = CELL_DOUBLE_WIDTH;
VectorViewBase._CELL_DOUBLE_HEIGHT = CELL_DOUBLE_HEIGHT;
VectorViewBase._WIDTH_PX = WIDTH_PX;
VectorViewBase._HEIGHT_PX = HEIGHT_PX;
VectorViewBase._MOSAIC_METRIC = MOSAIC_METRIC;
// constants for plugins
VectorViewBase.ROWS = ROWS$1;
VectorViewBase.COLS = COLS;

// helper functions used by plugin
const colourLookupFn = colourSymbol => fillColourFromColourAttrib(colourSymbol);
const isDoubleHeightFn = size => size == CellSize.DOUBLE_HEIGHT_;
const isDoubleWidthFn = size => size == CellSize.DOUBLE_WIDTH_;
const isDoubleSizeFn = size => size == CellSize.DOUBLE_SIZE_;
const isSeparatedMosaicFn = type => type == CellType.MOSAIC_SEPARATED_;

// functions used for cell transforms
const _getYTranslate = row => 0 - (row * CELL_HEIGHT);
const _getXTranslate = col => 0 - (col * CELL_WIDTH);

function getRandomLetter() {
    return String.fromCharCode(32 + Math.random() * 95); // returns letter in ASCII range
}

function getStyle() {

    // .mosaic class font size - FUDGE bigger than 10px to close tiny gaps vertically */
    return `@font-face {
font-family: 'Unscii';
src: url('fonts/unscii-16.woff') format('woff'), 
url('fonts/unscii-16.ttf') format('truetype'),
url('fonts/unscii-16.otf') format('opentype');
unicode-range: U+0000-00FF, U+2022, U+2500, U+2502, U+250C, U+2510, U+2514, U+2518, U+251C, U+251D, U+2524, U+2525, U+252C, U+252F, U+2534, U+2537, U+253C, U+253F, U+2588, U+258C, U+2590, U+2592, U+25CB, U+25CF, U+25E2-25E5, U+2B60-2B63, U+E0C0-E0FF, U+1FB00-1FB70, U+1FB75, U+1FBA0-1FBA7;
-webkit-font-smoothing: none;
font-smooth: never;
}
@font-face {
font-family: 'Bedstead';
src: url('fonts/bedstead.otf') format('opentype');
unicode-range: U+0000-00FF;
}
@keyframes blink {
to {
visibility: hidden;
}
}
@keyframes fancyblink {
from {
filter: none;
opacity: 0.7;
}
33% {
filter: none;
opacity: 1;
}
66% {
filter: blur(0px);
opacity: 1;
}
95% {
filter: blur(4px);
opacity: 0;
}
to {
filter: blur(0px);
opacity: 0;
}
}
#textlayer {
font-size: 10px;
}
.mosaic {
font-family: 'Unscii';
font-size: 10.3px;
}
.mosaic_separated {
font-family: 'Unscii';
font-size: 10px;
}
.flash_flashing .flash {
/* animation: blink 2s steps(3, start) infinite; */
animation: fancyblink 2s linear infinite;
}
.conceal_concealed  .conceal {
visibility: hidden;
}
svg #background {
transition-property: opacity;
transition-duration: 0.25s;
}
svg {
background-color: transparent;
}
svg use {
shape-rendering: crispEdges;
}
rect { color: orange; }
`;
}

var g0_latin = {
	$: "¤",
	"": "■"
};
var g0_latin__czech_slovak = {
	"#": "#",
	$: "ů",
	"@": "č",
	"[": "ť",
	"\\": "ž",
	"]": "ý",
	"^": "í",
	_: "ř",
	"`": "é",
	"{": "á",
	"|": "|",
	"}": "ú",
	"~": "š"
};
var g0_latin__english = {
	"#": "£",
	$: "$",
	"@": "@",
	"[": "←",
	"\\": "½",
	"]": "→",
	"^": "↑",
	_: "#",
	"`": "—",
	"{": "¼",
	"|": "‖",
	"}": "¾",
	"~": "÷"
};
var g0_latin__estonian = {
	"#": "#",
	$: "õ",
	"@": "Š",
	"[": "Ä",
	"\\": "Ö",
	"]": "Ž",
	"^": "Ü",
	_: "Õ",
	"`": "š",
	"{": "ä",
	"|": "ö",
	"}": "ž",
	"~": "ü"
};
var g0_latin__french = {
	"#": "é",
	$: "ï",
	"@": "à",
	"[": "ë",
	"\\": "ê",
	"]": "ù",
	"^": "î",
	_: "#",
	"`": "è",
	"{": "â",
	"|": "ô",
	"}": "û",
	"~": "ç"
};
var g0_latin__german = {
	"#": "#",
	$: "$",
	"@": "§",
	"[": "Ä",
	"\\": "Ö",
	"]": "Ü",
	"^": "^",
	_: "_",
	"`": "°",
	"{": "ä",
	"|": "ö",
	"}": "ü",
	"~": "ß"
};
var g0_latin__italian = {
	"#": "£",
	$: "$",
	"@": "é",
	"[": "°",
	"\\": "ç",
	"]": "→",
	"^": "↑",
	_: "#",
	"`": "ù",
	"{": "à",
	"|": "ò",
	"}": "è",
	"~": "ì"
};
var g0_latin__latvian_lithuanian = {
	"#": "#",
	$: "$",
	"@": "Š",
	"[": "ė",
	"\\": "ę",
	"]": "Ž",
	"^": "č",
	_: "ū",
	"`": "š",
	"{": "ą",
	"|": "ų",
	"}": "ž",
	"~": "į"
};
var g0_latin__polish = {
	"#": "#",
	$: "ń",
	"@": "ą",
	"[": "Ƶ",
	"\\": "Ś",
	"]": "Ł",
	"^": "ć",
	_: "ó",
	"`": "ę",
	"{": "ż",
	"|": "ś",
	"}": "ł",
	"~": "ź"
};
var g0_latin__portuguese_spanish = {
	"#": "ç",
	$: "$",
	"@": "¡",
	"[": "á",
	"\\": "é",
	"]": "í",
	"^": "ó",
	_: "ú",
	"`": "¿",
	"{": "ü",
	"|": "ñ",
	"}": "è",
	"~": "à"
};
var g0_latin__romanian = {
	"#": "#",
	$: "¤",
	"@": "Ț",
	"[": "Â",
	"\\": "Ș",
	"]": "Ă",
	"^": "Î",
	_: "ı",
	"`": "ț",
	"{": "â",
	"|": "ș",
	"}": "ă",
	"~": "î"
};
var g0_latin__serbian_croatian_slovenian = {
	"#": "#",
	$: "Ë",
	"@": "Č",
	"[": "Ć",
	"\\": "Ž",
	"]": "Đ",
	"^": "Š",
	_: "ë",
	"`": "č",
	"{": "ć",
	"|": "ž",
	"}": "đ",
	"~": "š"
};
var g0_latin__swedish_finnish_hungarian = {
	"#": "#",
	$: "¤",
	"@": "É",
	"[": "Ä",
	"\\": "Ö",
	"]": "Å",
	"^": "Ü",
	_: "_",
	"`": "é",
	"{": "ä",
	"|": "ö",
	"}": "å",
	"~": "ü"
};
var g0_latin__turkish = {
	"#": "₺",
	$: "ğ",
	"@": "İ",
	"[": "Ş",
	"\\": "Ö",
	"]": "Ç",
	"^": "Ü",
	_: "Ğ",
	"`": "ı",
	"{": "ş",
	"|": "ö",
	"}": "ç",
	"~": "ü"
};
var g2_latin = {
	"0": "°",
	"1": "±",
	"2": "²",
	"3": "³",
	"4": "×",
	"5": "µ",
	"6": "¶",
	"7": "·",
	"8": "÷",
	"9": "’",
	"!": "¡",
	"\"": "¢",
	"#": "£",
	"%": "¥",
	"&": "#",
	"'": "§",
	"(": "¤",
	")": "‘",
	"*": "“",
	"+": "«",
	",": "←",
	"-": "↑",
	".": "→",
	"/": "↓",
	":": "”",
	";": "»",
	"<": "¼",
	"=": "½",
	">": "¾",
	"?": "¿",
	"@": " ",
	A: "̀",
	B: "́",
	C: "̂",
	D: "̃",
	E: "̄",
	F: "̆",
	G: "̇",
	H: "̈",
	I: "̣",
	J: "̊",
	K: "̧",
	L: "̲",
	M: "̋",
	N: "̨",
	O: "̌",
	P: "—",
	Q: "¹",
	R: "®",
	S: "©",
	T: "™",
	U: "♪",
	V: "₠",
	W: "‰",
	X: "α",
	Y: null,
	Z: null,
	"[": null,
	"\\": "⅛",
	"]": "⅜",
	"^": "⅝",
	_: "⅞",
	"`": "Ω",
	a: "Æ",
	b: "Ð",
	c: "ª",
	d: "Ħ",
	e: null,
	f: "Ĳ",
	g: "Ŀ",
	h: "Ł",
	i: "Ø",
	j: "Œ",
	k: "º",
	l: "Þ",
	m: "Ŧ",
	n: "Ŋ",
	o: "ŉ",
	p: "ĸ",
	q: "æ",
	r: "đ",
	s: "ð",
	t: "ħ",
	u: "ı",
	v: "ĳ",
	w: "ŀ",
	x: "ł",
	y: "ø",
	z: "œ",
	"{": "ß",
	"|": "þ",
	"}": "ŧ",
	"~": "ŋ",
	"": "■"
};
var g0_greek = {
	"<": "«",
	">": "»",
	"@": "ΐ",
	A: "Α",
	B: "Β",
	C: "Γ",
	D: "Δ",
	E: "Ε",
	F: "Ζ",
	G: "Η",
	H: "Θ",
	I: "Ι",
	J: "Κ",
	K: "Λ",
	L: "Μ",
	M: "Ν",
	N: "Ξ",
	O: "Ο",
	P: "Π",
	Q: "Ρ",
	R: "ʹ",
	S: "Σ",
	T: "Τ",
	U: "Υ",
	V: "Φ",
	W: "Χ",
	X: "Ψ",
	Y: "Ω",
	Z: "Ϊ",
	"[": "Ϋ",
	"\\": "ά",
	"]": "έ",
	"^": "ή",
	_: "ί",
	"`": "ΰ",
	a: "α",
	b: "β",
	c: "γ",
	d: "δ",
	e: "ε",
	f: "ζ",
	g: "η",
	h: "θ",
	i: "ι",
	j: "κ",
	k: "λ",
	l: "μ",
	m: "ν",
	n: "ξ",
	o: "ο",
	p: "π",
	q: "ρ",
	r: "ς",
	s: "σ",
	t: "τ",
	u: "υ",
	v: "φ",
	w: "χ",
	x: "ψ",
	y: "ω",
	z: "ϊ",
	"{": "ϋ",
	"|": "ό",
	"}": "ύ",
	"~": "ώ",
	"": "■"
};
var g2_greek = {
	"0": "°",
	"1": "±",
	"2": "²",
	"3": "³",
	"4": "×",
	"5": "m",
	"6": "n",
	"7": "p",
	"8": "÷",
	"9": "’",
	"!": "a",
	"\"": "b",
	"#": "£",
	$: "e",
	"%": "h",
	"&": "i",
	"'": "§",
	"(": ":",
	")": "‘",
	"*": "“",
	"+": "k",
	",": "←",
	"-": "↑",
	".": "→",
	"/": "↓",
	":": "”",
	";": "t",
	"<": "¼",
	"=": "½",
	">": "¾",
	"?": "x",
	"@": " ",
	A: "̀",
	B: "́",
	C: "̂",
	D: "̃",
	E: "̄",
	F: "̆",
	G: "̇",
	H: "̈",
	I: "̣",
	J: "̊",
	K: "̧",
	L: "̲",
	M: "̋",
	N: "̨",
	O: "̌",
	P: "?",
	Q: "¹",
	R: "®",
	S: "©",
	T: "™",
	U: "♪",
	V: "₠",
	W: "‰",
	X: "ɑ",
	Y: "Ί",
	Z: "Ύ",
	"[": "Ώ",
	"\\": "⅛",
	"]": "⅜",
	"^": "⅝",
	_: "⅞",
	"`": "C",
	a: "D",
	b: "F",
	c: "G",
	d: "J",
	e: "L",
	f: "Q",
	g: "R",
	h: "S",
	i: "U",
	j: "V",
	k: "W",
	l: "Y",
	m: "Z",
	n: "Ά",
	o: "Ή",
	p: "c",
	q: "d",
	r: "f",
	s: "g",
	t: "j",
	u: "l",
	v: "q",
	w: "r",
	x: "s",
	y: "u",
	z: "v",
	"{": "w",
	"|": "y",
	"}": "z",
	"~": "Έ",
	"": "■"
};
var g0_cyrillic = {
	"@": "Ю",
	A: "А",
	B: "Б",
	C: "Ц",
	D: "Д",
	E: "Е",
	F: "Ф",
	G: "Г",
	H: "Х",
	I: "И",
	J: "Ѝ",
	K: "К",
	L: "Л",
	M: "М",
	N: "Н",
	O: "О",
	P: "П",
	Q: "Я",
	R: "Р",
	S: "С",
	T: "Т",
	U: "У",
	V: "Ж",
	W: "В",
	X: "Ь",
	Z: "З",
	"[": "Ш",
	"]": "Щ",
	"^": "Ч",
	"`": "ю",
	a: "а",
	b: "б",
	c: "ц",
	d: "д",
	e: "е",
	f: "ф",
	g: "г",
	h: "х",
	i: "и",
	j: "ѝ",
	k: "к",
	l: "л",
	m: "м",
	n: "н",
	o: "о",
	p: "п",
	q: "я",
	r: "р",
	s: "с",
	t: "т",
	u: "у",
	v: "ж",
	w: "в",
	x: "ь",
	z: "з",
	"{": "ш",
	"}": "щ",
	"~": "ч",
	"": "■"
};
var g0_cyrillic__russian_bulgarian = {
	"&": "ы",
	Y: "Ъ",
	"\\": "Э",
	_: "Ы",
	y: "ъ",
	"|": "э"
};
var g0_cyrillic__serbian_croatian = {
	"@": "Ч",
	J: "Ј",
	Q: "Ќ",
	V: "В",
	W: "Ѓ",
	X: "Љ",
	Y: "Њ",
	"[": "Ћ",
	"\\": "Ж",
	"]": "Ђ",
	"^": "Ш",
	_: "Џ",
	"`": "ч",
	j: "ј",
	q: "ќ",
	v: "в",
	w: "ѓ",
	x: "љ",
	y: "њ",
	"{": "ћ",
	"|": "ж",
	"}": "ђ",
	"~": "ш"
};
var g0_cyrillic__ukranian = {
	"&": "ї",
	Y: "І",
	"\\": "Є",
	_: "Ї",
	y: "і",
	"|": "є"
};
var g2_cyrillic = {
	"0": "m",
	"1": "n",
	"2": "p",
	"3": "t",
	"4": "x",
	"5": "x",
	"6": "°",
	"7": "±",
	"8": "²",
	"9": "³",
	"!": "a",
	"\"": "b",
	"#": "£",
	$: "e",
	"%": "h",
	"&": "i",
	"'": "§",
	"(": ":",
	")": "‘",
	"*": "“",
	"+": "k",
	",": "←",
	"-": "↑",
	".": "→",
	"/": "↓",
	":": "¼",
	";": "½",
	"<": "¾",
	"=": "÷",
	">": "’",
	"?": "”",
	"@": " ",
	A: "̀",
	B: "́",
	C: "̂",
	D: "̃",
	E: "̄",
	F: "̆",
	G: "̇",
	H: "̈",
	I: "̣",
	J: "̊",
	K: "̧",
	L: "̲",
	M: "̋",
	N: "̨",
	O: "̌",
	P: "?",
	Q: "©",
	R: "®",
	S: "¹",
	T: "ɑ",
	U: "Ί",
	V: "Ύ",
	W: "Ώ",
	X: "‰",
	Y: "₠",
	Z: "™",
	"[": "⅛",
	"\\": "⅜",
	"]": "⅝",
	"^": "⅞",
	_: "♪",
	"`": "C",
	a: "D",
	b: "F",
	c: "G",
	d: "J",
	e: "L",
	f: "Q",
	g: "R",
	h: "S",
	i: "U",
	j: "V",
	k: "W",
	l: "Y",
	m: "Z",
	n: "Ά",
	o: "Ή",
	p: "c",
	q: "d",
	r: "f",
	s: "g",
	t: "j",
	u: "l",
	v: "q",
	w: "r",
	x: "s",
	y: "u",
	z: "v",
	"{": "w",
	"|": "y",
	"}": "z",
	"~": "Έ",
	"": "■"
};
var g0_arabic = {
	"#": "£",
	"&": "ﻰ",
	"'": "ﻱ",
	"(": ")",
	")": "(",
	";": "؛",
	"<": ">",
	">": "<",
	"?": "؟",
	"@": "ﺔ",
	A: "ﺀ",
	B: "ﺒ",
	C: "ﺏ",
	D: "ﺘ",
	E: "ﺕ",
	F: "ﺎ",
	G: "ﺍ",
	H: "ﺑ",
	I: "ﺓ",
	J: "ﺗ",
	K: "ﺛ",
	L: "ﺟ",
	M: "ﺣ",
	N: "ﺧ",
	O: "ﺩ",
	P: "ﺫ",
	Q: "ﺭ",
	R: "ﺯ",
	S: "ﺳ",
	T: "ﺷ",
	U: "ﺻ",
	V: "ﺿ",
	W: "ﻃ",
	X: "ﻇ",
	Y: "ﻋ",
	Z: "ﻏ",
	"[": "ﺜ",
	"\\": "ﺠ",
	"]": "ﺤ",
	"^": "ﺨ",
	_: "#",
	"`": "ـ",
	a: "ﻓ",
	b: "ﻗ",
	c: "ﻛ",
	d: "ﻟ",
	e: "ﻣ",
	f: "ﻧ",
	g: "ﻫ",
	h: "ﻭ",
	i: "ﻰ",
	j: "ﻳ",
	k: "ﺙ",
	l: "ﺝ",
	m: "ﺡ",
	n: "ﺥ",
	o: "ﻴ",
	p: "ﻯ",
	q: "ﻌ",
	r: "ﻐ",
	s: "ﻔ",
	t: "ﻑ",
	u: "ﻘ",
	v: "ﻕ",
	w: "ﻙ",
	x: "ﻠ",
	y: "ﻝ",
	z: "ﻤ",
	"{": "ﻡ",
	"|": "ﻨ",
	"}": "ﻥ",
	"~": "ﻻ",
	"": "■"
};
var g2_arabic = {
	"0": "٠",
	"1": "١",
	"2": "٢",
	"3": "٣",
	"4": "٤",
	"5": "٥",
	"6": "٦",
	"7": "٧",
	"8": "٨",
	"9": "٩",
	"!": "ﻉ",
	"\"": "ﺁ",
	"#": "ﺃ",
	$: "ﺅ",
	"%": "ﺇ",
	"&": "ﺋ",
	"'": "ﺊ",
	"(": "ﭼ",
	")": "ﭽ",
	"*": "ﭺ",
	"+": "ﭘ",
	",": "ﭙ",
	"-": "ﭖ",
	".": "ﮊ",
	"/": "ﮔ",
	":": "ﻎ",
	";": "ﻍ",
	"<": "ﻼ",
	"=": "ﻬ",
	">": "ﻪ",
	"?": "ﻩ",
	"@": "à",
	"[": "ë",
	"\\": "ê",
	"]": "ù",
	"^": "î",
	_: "ﻊ",
	"`": "é",
	"{": "â",
	"|": "ô",
	"}": "û",
	"~": "ç",
	"": "■"
};
var g0_hebrew = {
	"#": "£",
	"[": "←",
	"\\": "½",
	"]": "→",
	"^": "↑",
	_: "#",
	"`": "א",
	a: "ב",
	b: "ג",
	c: "ד",
	d: "ה",
	e: "ו",
	f: "ז",
	g: "ח",
	h: "ט",
	i: "י",
	j: "ך",
	k: "כ",
	l: "ל",
	m: "ם",
	n: "מ",
	o: "ן",
	p: "נ",
	q: "ס",
	r: "ע",
	s: "ף",
	t: "פ",
	u: "ץ",
	v: "צ",
	w: "ק",
	x: "ר",
	y: "ש",
	z: "ת",
	"{": "₪",
	"|": "‖",
	"}": "¾",
	"~": "÷",
	"": "■"
};
var g1_block_mosaic_to_unicode__legacy_computing = {
	"0": "🬏",
	"1": "🬐",
	"2": "🬑",
	"3": "🬒",
	"4": "🬓",
	"5": "▌",
	"6": "🬔",
	"7": "🬕",
	"8": "🬖",
	"9": "🬗",
	" ": " ",
	"!": "🬀",
	"\"": "🬁",
	"#": "🬂",
	$: "🬃",
	"%": "🬄",
	"&": "🬅",
	"'": "🬆",
	"(": "🬇",
	")": "🬈",
	"*": "🬉",
	"+": "🬊",
	",": "🬋",
	"-": "🬌",
	".": "🬍",
	"/": "🬎",
	":": "🬘",
	";": "🬙",
	"<": "🬚",
	"=": "🬛",
	">": "🬜",
	"?": "🬝",
	"`": "🬞",
	a: "🬟",
	b: "🬠",
	c: "🬡",
	d: "🬢",
	e: "🬣",
	f: "🬤",
	g: "🬥",
	h: "🬦",
	i: "🬧",
	j: "▐",
	k: "🬨",
	l: "🬩",
	m: "🬪",
	n: "🬫",
	o: "🬬",
	p: "🬭",
	q: "🬮",
	r: "🬯",
	s: "🬰",
	t: "🬱",
	u: "🬲",
	v: "🬳",
	w: "🬴",
	x: "🬵",
	y: "🬶",
	z: "🬷",
	"{": "🬸",
	"|": "🬹",
	"}": "🬺",
	"~": "🬻",
	"": "█"
};
var g1_block_mosaic_to_unicode__unscii_separated = {
	"0": "",
	"1": "",
	"2": "",
	"3": "",
	"4": "",
	"5": "",
	"6": "",
	"7": "",
	"8": "",
	"9": "",
	" ": " ",
	"!": "",
	"\"": "",
	"#": "",
	$: "",
	"%": "",
	"&": "",
	"'": "",
	"(": "",
	")": "",
	"*": "",
	"+": "",
	",": "",
	"-": "",
	".": "",
	"/": "",
	":": "",
	";": "",
	"<": "",
	"=": "",
	">": "",
	"?": "",
	"`": "",
	a: "",
	b: "",
	c: "",
	d: "",
	e: "",
	f: "",
	g: "",
	h: "",
	i: "",
	j: "",
	k: "",
	l: "",
	m: "",
	n: "",
	o: "",
	p: "",
	q: "",
	r: "",
	s: "",
	t: "",
	u: "",
	v: "",
	w: "",
	x: "",
	y: "",
	z: "",
	"{": "",
	"|": "",
	"}": "",
	"~": "",
	"": ""
};
var g3 = {
	"0": "🭇",
	"1": "🭈",
	"2": "🭉",
	"3": "🭊",
	"4": "🭋",
	"5": "◢",
	"6": "🭌",
	"7": "🭍",
	"8": "🭎",
	"9": "🭏",
	" ": "🬼",
	"!": "🬽",
	"\"": "🬾",
	"#": "🬿",
	$: "🭀",
	"%": "◣",
	"&": "🭁",
	"'": "🭂",
	"(": "🭃",
	")": "🭄",
	"*": "🭅",
	"+": "🭆",
	",": "🭨",
	"-": "🭩",
	".": "🭰",
	"/": "▒",
	":": "🭐",
	";": "🭑",
	"<": "🭪",
	"=": "🭫",
	">": "🭵",
	"?": "█",
	"@": "┷",
	A: "┯",
	B: "┝",
	C: "┥",
	D: "🮤",
	E: "🮥",
	F: "🮦",
	G: "🮧",
	H: "🮠",
	I: "🮡",
	J: "🮢",
	K: "🮣",
	L: "┿",
	M: "•",
	N: "●",
	O: "○",
	P: "│",
	Q: "─",
	R: "┌",
	S: "┐",
	T: "└",
	U: "┘",
	V: "├",
	W: "┤",
	X: "┬",
	Y: "┴",
	Z: "┼",
	"[": "→",
	"\\": "←",
	"]": "↑",
	"^": "↓",
	_: " ",
	"`": "🭒",
	a: "🭓",
	b: "🭔",
	c: "🭕",
	d: "🭖",
	e: "◥",
	f: "🭗",
	g: "🭘",
	h: "🭙",
	i: "🭚",
	j: "🭛",
	k: "🭜",
	l: "🭬",
	m: "🭭",
	n: null,
	o: null,
	p: "🭝",
	q: "🭞",
	r: "🭟",
	s: "🭠",
	t: "🭡",
	u: "◤",
	v: "🭢",
	w: "🭣",
	x: "🭤",
	y: "🭥",
	z: "🭦",
	"{": "🭧",
	"|": "🭮",
	"}": "🭯",
	"~": null,
	"": null
};
var encodings = {
	g0_latin: g0_latin,
	g0_latin__czech_slovak: g0_latin__czech_slovak,
	g0_latin__english: g0_latin__english,
	g0_latin__estonian: g0_latin__estonian,
	g0_latin__french: g0_latin__french,
	g0_latin__german: g0_latin__german,
	g0_latin__italian: g0_latin__italian,
	g0_latin__latvian_lithuanian: g0_latin__latvian_lithuanian,
	g0_latin__polish: g0_latin__polish,
	g0_latin__portuguese_spanish: g0_latin__portuguese_spanish,
	g0_latin__romanian: g0_latin__romanian,
	g0_latin__serbian_croatian_slovenian: g0_latin__serbian_croatian_slovenian,
	g0_latin__swedish_finnish_hungarian: g0_latin__swedish_finnish_hungarian,
	g0_latin__turkish: g0_latin__turkish,
	g2_latin: g2_latin,
	g0_greek: g0_greek,
	g2_greek: g2_greek,
	g0_cyrillic: g0_cyrillic,
	g0_cyrillic__russian_bulgarian: g0_cyrillic__russian_bulgarian,
	g0_cyrillic__serbian_croatian: g0_cyrillic__serbian_croatian,
	g0_cyrillic__ukranian: g0_cyrillic__ukranian,
	g2_cyrillic: g2_cyrillic,
	g0_arabic: g0_arabic,
	g2_arabic: g2_arabic,
	g0_hebrew: g0_hebrew,
	g1_block_mosaic_to_unicode__legacy_computing: g1_block_mosaic_to_unicode__legacy_computing,
	g1_block_mosaic_to_unicode__unscii_separated: g1_block_mosaic_to_unicode__unscii_separated,
	g3: g3
};

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.

const sextants = {};

// for plugins
class WrappedCell {
    constructor(cell) {
        this.type = cell.type_;
        this.flashing = cell.flashing_;
        this.concealed = cell.concealed_;
        this.size = cell.size_;
        this.sextants = cell.getSextants_();
    }
}

class Cell {
    constructor() {
        this._byte = ' ';
        this._char = ' ';
        this._fgColour = Colour.WHITE;
        this._bgColour = Colour.BLACK;
        this._type = CellType.ALPHA_;
        this._flashing = false;
        this._size = CellSize.NORMAL_SIZE_;
        this._concealed = false;
        this._boxed = false;
        this._byteHeld = null;
        this._isCursive = false;
        this._diacriticCode = null;
        this._enhancedChar = null;
    }

    set byte_(byte) {
        this._byte = byte;
    }

    get byte_() {
        return this._byte;
    }

    set fgColour_(colour) {
        this._fgColour = colour;
    }

    get fgColour_() {
        return this._fgColour;
    }

    set bgColour_(colour) {
        this._bgColour = colour;
    }

    get bgColour_() {
        return this._bgColour;
    }

    get isCursive_() {
        return this._isCursive;
    }

    setMappedChar_(encoding) {
        const isG1 = this._type == CellType.MOSAIC_CONTIGUOUS_ || this._type == CellType.MOSAIC_SEPARATED_;
        if (this._type == CellType.ALPHA_ || (((this._byte.charCodeAt(0) & 0b100000) == 0) && isG1)) {
            this._char = getCharWithEncoding(this._byte, encoding);
            if (this._diacriticCode > 0) this._char += encodings["g2_latin"][String.fromCharCode(this._diacriticCode + 0x40)];
            this._isCursive = false;
            if (encoding == 'g0_arabic' || encoding == 'g2_arabic') this._isCursive = Utils.isCursive_(this._char);
        } else if (this._type == CellType.MOSAIC_CONTIGUOUS_)
            this._char = getCharWithEncoding(this._byte, 'g1_block_mosaic_to_unicode__legacy_computing');
        else if (this._type == CellType.MOSAIC_SEPARATED_)
            this._char = getCharWithEncoding(this._byte, 'g1_block_mosaic_to_unicode__unscii_separated');
        else if (this._type == CellType.G3_) {
            this._char = getCharWithEncoding(this._byte, 'g3');
        }
        this._byteHeld = null;
    }

    setSpace_(heldMosaic) {
        if ((this._type == CellType.MOSAIC_CONTIGUOUS_ || this._type == CellType.MOSAIC_SEPARATED_)
            && heldMosaic.active_) {
            this._byteHeld = heldMosaic.char_;
            this._type = heldMosaic.type_;
            let charEncoding = 'g1_block_mosaic_to_unicode__legacy_computing';
            if (this._type == CellType.MOSAIC_SEPARATED_) charEncoding = 'g1_block_mosaic_to_unicode__unscii_separated';
            this._char = getCharWithEncoding(heldMosaic.char_, charEncoding);
        } else {
            this._byteHeld = null;
            this._char = ' ';
        }
    }

    get char_() {
        return this._char;
    }

    get type_() {
        return this._type;
    }

    set type_(type) {
        this._type = type;
    }

    set flashing_(state) {
        this._flashing = state;
    }

    get flashing_() {
        return this._flashing;
    }

    get size_() {
        return this._size;
    }

    set size_(size) {
        this._size = size;
    }

    set concealed_(concealed) {
        this._concealed = concealed;
    }

    get concealed_() {
        return this._concealed;
    }

    set boxed_(boxed) {
        this._boxed = boxed;
    }

    get boxed_() {
        return this._boxed;
    }

    // used in rendering to distinguish burn-through characters in G1 set
    isMosaicByte_() {
        const code = this._byteHeld != null ? this._byteHeld.charCodeAt(0) : this._byte.charCodeAt(0);
        return (code <= 0x7f) && ((code & 0b100000) == 0b100000);
    }
    
    // used in page model to keep track of mosaic to hold 
    isMosaic_() {
        const code = this._byte.charCodeAt(0);
        const isMosaic = (this._type == CellType.MOSAIC_CONTIGUOUS_ || this._type == CellType.MOSAIC_SEPARATED_)
                && (code <= 0x7f) 
                && ((code & 0b100000) == 0b100000);
        return isMosaic;
    }

    getSextants_() {
        const code = this._byteHeld != null ? this._byteHeld.charCodeAt(0) : this._byte.charCodeAt(0);
        if (code > 0x7f) return null;
        if (code in sextants) return sextants[code];

        let sextant = code - 0x20;
        if (sextant >= 0x40) sextant -= 0x20;
        sextants[code] = [...sextant.toString(2).padStart(6, '0')].reverse();
        return sextants[code];
    }
}

// clones a cell so that its values can be overriden by enhancement data
class EnhancedCell extends Cell {
    constructor(cell) {
        super();
        Object.assign(this, cell);
    }

    set diacritic_(diacriticCode) {
        this._diacriticCode = diacriticCode;
    }

    get diacritic_() {
        return this._diacriticCode;
    }

    set enhancedChar_(char) {
        this._enhancedChar = char;
    }

    get char_() {
        return this._enhancedChar == null ? this._char : this._enhancedChar;
    }
}

// private

function getCharWithEncoding(byte, encoding) {
    if (!(encoding in encodings)) throw new Error(`Cell getCharWithEncoding: bad encoding: ${encoding}`);
    if (byte in encodings[encoding]) return encodings[encoding][byte];
    const matches = encoding.match(/^(.+)__/);
    if (matches != null) {
        const baseEncoding = matches[1];
        if (byte in encodings[baseEncoding]) {
            encodings[encoding][byte] = encodings[baseEncoding][byte];
            return encodings[baseEncoding][byte];
        }
    }
    return byte;
}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.

class View extends VectorViewBase {
    constructor(model, webkitCompat, dom) {
        super(model, dom);
        // webkit doesn't use the width/height on <symbol> which is SVG2.
        // When webkitCompat is true, the width/height are duplicated on <use>
        this._webkitCompat = webkitCompat;
        this._mosaicSymbols = new Set();
        console.debug('VectorViewGraphicMosaic constructed');
    }

    _createDisplay() {
        super._createDisplay();
        this._graphicrows = [];
        this._graphicLayer = this.d.group_();
    }

    _resetRow(rowIndex) {
        super._resetRow(rowIndex);
        this._resetGraphicRow(rowIndex);
    }

    _renderCell(cellView, cell, attr, fill, cellIndex, rowIndex, isMosaic) {
        if ('_background' in this._plugins) {
            this._plugins._background(rowIndex, cellIndex, cell.size_, cell.bgColour_);
        }

        if (cell.type_ == CellType.ALPHA_ || cell.type_ == CellType.G3_ || !isMosaic) {
            this._renderText(cellView, cell, attr, fill, cellIndex, rowIndex);
            if (cell.type_ == CellType.G3_) cellView.addClass_('mosaic');
        } else if (isMosaic) {
            cellView.plain_(' ').attr_(attr);
            this._renderMosaic(rowIndex, cellIndex, cell, fill);
        }
    }

    _renderMosaic(row, col, cell, fill) {
        if ('_mosaic' in this._plugins) {
            const wrappedCell = new WrappedCell(cell);
            const rendered = this._plugins._mosaic(row, col, wrappedCell, fill);
            if (rendered) return;
        }

        const sextants = cell.getSextants_();
        if (!sextants.includes('1')) return;
        let id = cell.type_ == CellType.MOSAIC_CONTIGUOUS_ ? 'c' : 's';
        id += sextants.join('');

        let width = VectorViewBase._CELL_WIDTH;
        let height = VectorViewBase._CELL_HEIGHT;
        if (cell.type_ == CellType.MOSAIC_CONTIGUOUS_) {
            width = VectorViewBase._CELL_WIDTH + 0.3;
            height = VectorViewBase._CELL_HEIGHT + 0.2;
        }

        if (!this._mosaicSymbols.has(id)) {
            this._mosaicSymbols.add(id);
            const symbol = this._svg.symbol_(id);

            if (cell.type_ == CellType.MOSAIC_CONTIGUOUS_) {
                symbol.attr_({
                    preserveAspectRatio: 'none',
                    width: width,     // FUDGE cell is bigger than it should be
                    height: height,   // to close tiny gaps on Chromecast
                    viewBox: '0 0 12 18',
                });
                for (let i = 0; i < 6; i++) {
                    sextants[i] == '1' && symbol.rect_(6, 6).move_((i % 2) * 6, Math.floor(i/2) * 6);
                }
            } else { // MOSAIC_SEPARATED_
                symbol.attr_({
                    preserveAspectRatio: 'none',
                    width: width,
                    height: height,
                    viewBox: '0 0 12 18',
                });
                for (let i = 0; i < 6; i++) {
                    sextants[i] == '1' && symbol.rect_(4, 4).move_(((i % 2) * 6) + 1, (Math.floor(i/2) * 6) + 2);
                }
            }
        }

        let use;
        if (cell.type_ == CellType.MOSAIC_CONTIGUOUS_)
            use = this._graphicrows[row]
                .use_(id)
                .move_(col * VectorViewBase._CELL_WIDTH - 0.15, row * VectorViewBase._CELL_HEIGHT - 0.1)
                .fill_(fill);
        else // MOSAIC_SEPARATED
            use = this._graphicrows[row]
                .use_(id)
                .move_(col * VectorViewBase._CELL_WIDTH, row * VectorViewBase._CELL_HEIGHT)
                .fill_(fill);
        if (this._webkitCompat) // FUDGE need width/height for webkit browsers as they don't inherit them from symbol
            use.attr_({width: width, height: height});
        if (cell.size_ == CellSize.DOUBLE_HEIGHT_ || cell.size_ == CellSize.DOUBLE_SIZE_)
            use.attr_('height', VectorViewBase._CELL_DOUBLE_HEIGHT);
        if (cell.size_ == CellSize.DOUBLE_WIDTH_ || cell.size_ == CellSize.DOUBLE_SIZE_)
            use.attr_('width', VectorViewBase._CELL_DOUBLE_WIDTH);
        if (cell.flashing_) use.addClass_('flash');
        if (cell.concealed_) use.addClass_('conceal');
    }

    _resetGraphicRow(rowNum) {
        if (this._graphicrows[rowNum]) this._graphicrows[rowNum].remove_();
        this._graphicrows[rowNum] = this._graphicLayer.group_();
    }

    // eslint-disable-next-line no-unused-vars
    _getCellAttr(cellType, isMosaicChar, isCursive) {
        if (cellType == CellType.G3_) {
            return {
                dx: VectorViewBase._MOSAIC_METRIC._contiguous._DX,
                dy: -0.15,
                textLength: VectorViewBase._MOSAIC_METRIC._contiguous._textLength,
                lengthAdjust: 'spacingAndGlyphs',
                'text-anchor': 'start',
                transform: null,
                class: null,
            };
        }
        return {
            dx: null,
            dy: null,
            textLength: isCursive ? VectorViewBase._CELL_WIDTH : null,
            lengthAdjust: isCursive ? 'spacingAndGlyphs' : null,
            'text-anchor': null,
            transform: null,
            class: null,
        };
    }
}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

class Enhancement {
    constructor(model) {
        this._model = model;
        this._x = 0;
        this._y = 0;
        this._data = [];
    }

    // printPos() {
    //     console.log(this._x, this._y);
    //     return this;
    // }
    pos(x, y) {
        x = parseInt(x);
        y = parseInt(y);
        if (x < 0 || x > 39)
            return this;
        if (y < 0 || y > 24)
            return this;
        this._x = x;
        this._y = y;
        return this;
    }

    putG0(char, diacriticCode) {
        let dcode = null;
        if (typeof diacriticCode != 'undefined') {
            const code = parseInt(diacriticCode);
            if (code >= 0 && code <= 15)
                dcode = code;
        }
        const charCode = char.charCodeAt(0);
        if (charCode < 0x20 || charCode > 0x7f)
            return this;
        this._data.push({
            x_: this._x,
            y_: this._y,
            type_: 'g0',
            char_: char,
            diacritic_: dcode
        });
        return this;
    }

    putG1(char) {
        const charCode = char.charCodeAt(0);
        if (charCode < 0x20 || charCode > 0x7f ||
            (charCode >= 0x40 && charCode <= 0x5f))
            return this;
        this._data.push({
            x_: this._x,
            y_: this._y,
            type_: 'g1',
            char_: char,
        });
        return this;
    }

    putG2(char) {
        const charCode = char.charCodeAt(0);
        if (charCode < 0x20 || charCode > 0x7f)
            return this;
        this._data.push({
            x_: this._x,
            y_: this._y,
            type_: 'g2',
            char_: char,
        });
        return this;
    }

    putG3(char) {
        const charCode = char.charCodeAt(0);
        if (charCode < 0x20 || charCode > 0x7f)
            return this;
        this._data.push({
            x_: this._x,
            y_: this._y,
            type_: 'g3',
            char_: char,
        });
        return this;
    }

    putAt() {
        this._data.push({
            x_: this._x,
            y_: this._y,
            type_: 'char',
            char_: '@'
        });
        return this;
    }

    end() {
        this._model.enhance_(this._data);
        this._model.notify_();
        return this;
    }
}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
class ViewClassic extends VectorViewBase {}

const TEST_PAGE_NAMES = ['SPLASH', 'ENGINEERING', 'ADVERT', 'UK'];

class TeletextController {
    constructor(model, options) {
        this._windowDom = null;
        if (typeof window == 'object') this._windowDom = window;
        this._opt = {
            webkitCompat_: true // generate SVG that's compatible with webkit by default. The resulting SVG is larger
        };
        if (typeof options == 'object') {
            if ('webkitCompat' in options && !options.webkitCompat) this._opt.webkitCompat_ = false;
            if ('dom' in options) this._windowDom = options.dom;
        }
        if (this._windowDom == null)
            throw new Error('TeletextController E24: No window dom object available');

        this._view = new View(model, this._opt.webkitCompat_, this._windowDom);
        this._model = model;
        this._levelIndex = 1;
        this._testPageIndex = 0;
        this._initEventHandlers();
        this._viewSelector = null;
        this._height = null;
        this._posX = 0;
        this._posY = 0;
        console.debug('TeletextController constructed');
    }

    setRowFromOutputLine(rowNum, string) {
        const chars = Utils.decodeOutputLine_(string);
        this._model.setRowFromChars_(rowNum, chars);
    }

    setRow(rowNum, string) {
        this._model.setRowFromChars_(rowNum, string);
    }

    setPageFromOutputLines(lines) {
        const rows = Utils.getRowsFromOutputLines_(lines);
        this.setPageRows(rows);
    }

    setPageRows(rows) {
        this._model.clearEnhancements_();
        this._model.setRows_(rows);
    }

    showTestPage() {
        this.loadPageFromEncodedString(testpages[TEST_PAGE_NAMES[this._testPageIndex]]);
        this._testPageIndex++;
        if (this._testPageIndex == TEST_PAGE_NAMES.length) this._testPageIndex = 0;
    }
    
    showRandomisedPage() {
        const rows = [];
        for (let row = 0; row < 25; row++) {
            const cols = [];
            for (let col = 0; col < 40; col++) {
                cols.push(String.fromCharCode(Math.random() * 127));
            }
            rows.push(cols.join(''));
        }
        this.setPageRows(rows);
    }

    loadPageFromEncodedString(input) {
        const decoded = Utils.decodeBase64URLEncoded_(input, this._windowDom.atob);
        this.setPageRows(decoded);
    }

    _initEventHandlers() {
        this._windowDom.addEventListener('ttx.reveal', () => this._view.reveal_());
        this._windowDom.addEventListener('ttx.mix', () => this._view.mixMode_());
        this._windowDom.addEventListener('ttx.subtitlemode', () => this._view.boxMode_());
    }

    toggleReveal() {
        this._view.reveal_();
    }

    toggleMixMode() {
        this._view.mixMode_();
    }

    toggleBoxMode() {
        this._view.boxMode_();
    }

    toggleGrid() {
        this._view.grid_();
    }

    setLevel(level) {
        this._model.setLevel_(level);
    }

    addTo(selector) {
        this._selector = selector;
        this._view.addTo_(selector);
    }

    setFont(font) {
        this._view.setFont_(font);
    }

    clearScreen(withUpdate) {
        this._model.clearEnhancements_();
        this._model.clearScreen_(withUpdate);
    }

    setAspectRatio(aspectRatio) {
        if (aspectRatio == 'natural') {
            this._view.setAspectRatio_(aspectRatio);
            return;
        }
        const ar = parseFloat(aspectRatio);
        if (Number.isNaN(ar)) throw new Error("E80 setAspectRatio: bad number");
        this._view.setAspectRatio_(ar);
    }

    setHeight(height) {
        const newHeight = parseFloat(height);
        if (Number.isNaN(newHeight)) throw new Error("E98 setHeight: bad number");
        this._view.setHeight_(newHeight);
        this._height = newHeight;
    }

    setDefaultG0Charset(encoding, withUpdate) {
        const matches = encoding.match(/g0_/);
        if (matches == null) throw new Error("E130 setDefaultG0Charset: Bad g0 set");
        this._model.setPrimaryG0CharacterEncoding_(encoding, withUpdate);
    }

    setSecondG0Charset(encoding, withUpdate) {
        const matches = encoding.match(/g0_/);
        if (matches == null) throw new Error("E136 setSecondG0Charset: Bad g0 set");
        this._model.setSecondaryG0CharacterEncoding_(encoding, withUpdate);
    }

    setG2Charset(encoding, withUpdate) {
        const matches = encoding.match(/g2_/);
        if (matches == null) throw new Error("E142 setG2Charset: Bad g2 set");
        this._model.setG2CharacterEncoding_(encoding, withUpdate);
    }

    remove() {
        this._view.detach_();
        if (this._selector) {
            const el = document.querySelector(this._selector);
            if (el) el.removeChild(el.firstChild);
        }
        this._view = null;
    }

    setView(view) {
        this.remove();
        switch (view) {
            case 'classic__font-for-mosaic':
                this._view = new ViewClassic(this._model, this._windowDom);
                break;
            case 'classic__graphic-for-mosaic':
                this._view = new View(this._model, this._opt.webkitCompat_, this._windowDom);
                break;
            default:
                throw new Error("setView E126: bad view name:" + view);
        }
        if (this._height) this._view.setHeight_(this._height);
        if (this._selector) this._view.addTo_(this._selector);
        this._model.notify_();
    }

    registerViewPlugin(plugin) {
        plugin.registerWithView(this._view);
        this._model.notify_();
    }

    enhance() {
        return new Enhancement(this._model);
    }


    // dumpToConsole() {
    //     this._model.dumpToConsole();
    // }
}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

class Event {
    constructor(sender) {
        this._sender = sender;
        this._listeners = [];
    }

    attach_(listener) {
        this._listeners.push(listener);
        return this._listeners.length - 1;
    }

    notify_(args) {
        this._listeners.forEach(fn => fn != null && fn(this._sender, args));
    }

    detach_(index) {
        this._listeners[index] = null;
    }
}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.
// SPDX-License-Identifier: AGPL-3.0-only OR LicenseRef-uk.ltd.TechAndSoftware-1.0

class RowModel {
    constructor() {
        this._doubleHeight = false;
        this._cells = [];
    }

    get doubleHeight_() {
        return this._doubleHeight;
    }

    set doubleHeight_(isDoubleHeight) {
        this._doubleHeight = isDoubleHeight;
    }

    addCell_(cell) {
        this._cells.push(cell);
    }

    getCell_(i) {
        if (i >= this._cells.length) throw new Error('RowModel.getCell E20 bad cell index');
        return this._cells[i];
    }
}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.

const ROWS = 25;
const CELLS_PER_ROW = 40;
const DEFAULT_PRIMARY_G0_CHARACTER_SET = 'g0_latin';
const DEFAULT_G2_CHARACTER_SET = 'g2_latin';

const ENHANCEMENT_LEVELS = [Level[1.5], Level[2.5]];
const G3_CHARS_IN_LEVEL_1_5 = "\u0051\u005b\u005c\u005d";

class PageModel {
    constructor() {
        this._screen = [];
        for (let r = 0; r < ROWS; r++) {
            const row = [];
            for (let c = 0; c < CELLS_PER_ROW; c++) {
                row.push(new Cell());
            }
            this._screen.push(row);
        }
        this._primaryG0CharacterEncoding = DEFAULT_PRIMARY_G0_CHARACTER_SET;
        this._secondaryG0CharacterEncoding = null;
        this._g2CharacterEncoding = DEFAULT_G2_CHARACTER_SET;
        this._startBoxChar = Attributes.charFromAttribute(Attributes.START_BOX);
        this._level = Level[1];
        this._enhancement = [];
        
        this.onSet_ = new Event(this);
        console.debug('PageModel constructed');
    }

    notify_() {
        this.onSet_.notify_();
    }

    setRowFromChars_(rowNum, text) {
        if (rowNum >= ROWS) {
            throw new Error("PageModel E29 bad row number");
        }
        this._setRowFromChars(rowNum, text);
        this.onSet_.notify_();
    }

    setRows_(rows) {
        rows = rows.slice(0, ROWS);
        rows.forEach((row, index) => {
            this._setRowFromChars(index, row);
        });
        this.onSet_.notify_();
    }

    _setRowFromChars(rowNum, text) {
        let textArray = [...text];
        textArray = textArray.slice(0, CELLS_PER_ROW);
        textArray.forEach((c, colNum) => {
            const code = c.charCodeAt(0);
            if (Number.isNaN(code) || code > 127) {
                throw new Error(`PageModel E51 failed to write row: bad character code (${code}) at row ${rowNum} col ${colNum}`);
            }
            this._screen[rowNum][colNum].byte_ = c;
        });
        if (textArray.length < CELLS_PER_ROW) {
            for (let colNum = textArray.length; colNum < CELLS_PER_ROW; colNum++) {
                this._screen[rowNum][colNum].byte_ = ' ';
            }
        }
    }

    // dumpToConsole() {
    //     this._screen.forEach((row, index) => {
    //         let rowString = '';
    //         row.forEach(cell => {
    //             rowString += cell.byte.charCodeAt(0).toString(16).padStart(2, '0') + ' ';
    //         });
    //         console.log(index, '|', rowString, '|');
    //     });
    // }

    setLevel_(level) {
        this._level = level;
        console.debug('PageModel.setLevel: switching to Level', level);
        console.debug('new level: ', this._level);
        this.onSet_.notify_();
    }

    clearScreen_(withUpdate) {
        const updateAfterClear = typeof withUpdate != 'undefined' ? withUpdate : true;
        if (updateAfterClear) {
            const rows = [];
            for (let rowNum = 0; rowNum < ROWS; rowNum++) {
                rows.push("");
            }
            this.setRows_(rows);
        } else {
            for (let rowNum = 0; rowNum < ROWS; rowNum++) {
                this._setRowFromChars(rowNum, "");
            }
        }
    }

    setPrimaryG0CharacterEncoding_(encoding, withUpdate) {
        this._primaryG0CharacterEncoding = encoding;
        const g0base = encoding.match(/^g0_([a-z]+)/);
        if (g0base != null) {
            // the g2 set selected is derived from the g0 set, apart from hebrew which has no g2_ set
            const g2 = `g2_${g0base[1]}`;
            if (g2 in encodings) this._g2CharacterEncoding = g2;
            else if (g0base[1] == 'hebrew') this._g2CharacterEncoding = 'g2_arabic';
        }
        console.debug('PageModel.setPrimaryG0CharacterEncoding: set default g0 encoding to', encoding, 'with g2 encoding to', this._g2CharacterEncoding);
        if (withUpdate) this.onSet_.notify_();
    }

    setSecondaryG0CharacterEncoding_(encoding, withUpdate) {
        this._secondaryG0CharacterEncoding = encoding;
        console.debug('PageModel.setSecondaryG0CharacterEncoding: set second g0 encoding to', encoding);
        if (withUpdate) this.onSet_.notify_();
    }

    setG2CharacterEncoding_(encoding, withUpdate) {
        this._g2CharacterEncoding = encoding;
        console.debug('PageModel.setG2CharacterEncoding: set g2 encoding to', encoding);
        if (withUpdate) this.onSet_.notify_();
    }

    getRow_(rowNum) {
        if (rowNum >= ROWS) {
            throw new Error("PageModel.getRow E42 bad rowNum");
        }
        const rowModel = new RowModel();
        let textColour, switchedG0CharacterEncoding;

        // start of row defaults for 'set-after' attributes
        let nextCellType = CellType.ALPHA_;
        let nextTextColour = Colour.WHITE;
        let nextFlashing = false;
        let nextSize = CellSize.NORMAL_SIZE_;
        let nextSwitchedG0CharacterEncoding = false;
        let nextConcealed = false; // setting is set-at, unsetting is set-after
        let cancelNextHoldMosaics = false; // setting is set-at, cancelling is set-after
        let nextBoxed = false;

        // start of row defaults for 'set-at' attributes
        let backgroundColour = Colour.BLACK;
        let graphicType = CellType.MOSAIC_CONTIGUOUS_;
        let heldMosaic = {
            active_: false,
            char_: ' ',
            type_: CellType.MOSAIC_CONTIGUOUS_
        };

        let rowEnhancements = [];
        if (ENHANCEMENT_LEVELS.includes(this._level))
            rowEnhancements = this._enhancement.filter(e => e.y_ == rowNum);

        this._screen[rowNum].forEach((cell, cellIndex) => {
            const char = cell.byte_;
            const attrib = attribFromChar(this._level, char);

            // 'set-after' attributes from previous cell
            textColour = nextTextColour;
            cell.type_ = nextCellType;
            cell.boxed_ = nextBoxed;
            switchedG0CharacterEncoding = nextSwitchedG0CharacterEncoding;
            if (attrib.attribute_ != Attributes.STEADY) cell.flashing_ = nextFlashing;
            if (attrib.attribute_ != Attributes.NORMAL_SIZE) cell.size_ = nextSize;
            if (attrib.attribute_ != Attributes.CONCEAL) cell.concealed_ = nextConcealed;
            if (cancelNextHoldMosaics) {
                if (attrib.attribute_ != Attributes.HOLD_MOSAICS) {
                    heldMosaic.active_ = false;
                    heldMosaic.char_ = ' ';
                }
                cancelNextHoldMosaics = false;
            }

            switch (attrib.attribute_) {
                case Attributes.TEXT_COLOUR: // set after this cell
                    nextCellType = CellType.ALPHA_;
                    nextTextColour = attrib.colour_;
                    nextConcealed = false;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.MOSAIC_COLOUR: // set after this cell
                    nextCellType = graphicType;
                    nextTextColour = attrib.colour_;
                    nextConcealed = false;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.NEW_BACKGROUND: // set at this cell
                    backgroundColour = textColour;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.BLACK_BACKGROUND: // set at
                    backgroundColour = Colour.BLACK;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.CONTIGUOUS_GRAPHICS: // set at
                    graphicType = CellType.MOSAIC_CONTIGUOUS_;
                    if (cell.type_ == CellType.MOSAIC_SEPARATED_) cell.type_ = CellType.MOSAIC_CONTIGUOUS_;
                    if (nextCellType == CellType.MOSAIC_SEPARATED_) nextCellType = CellType.MOSAIC_CONTIGUOUS_;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.SEPARATED_GRAPHICS: // set at
                    graphicType = CellType.MOSAIC_SEPARATED_;
                    if (cell.type_ == CellType.MOSAIC_CONTIGUOUS_) cell.type_ = CellType.MOSAIC_SEPARATED_;
                    if (nextCellType == CellType.MOSAIC_CONTIGUOUS_) nextCellType = CellType.MOSAIC_SEPARATED_;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.ESC: // for switching g0 sets. Set after
                    if (this._secondaryG0CharacterEncoding) {
                        nextSwitchedG0CharacterEncoding = !switchedG0CharacterEncoding;
                    }
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.FLASH: // set after
                    nextFlashing = true;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.STEADY: // set at
                    cell.flashing_ = false;
                    nextFlashing = false;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.NORMAL_SIZE: // set at
                    cell.size_ = CellSize.NORMAL_SIZE_;
                    nextSize = CellSize.NORMAL_SIZE_;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.DOUBLE_HEIGHT: // set after
                    nextSize = CellSize.DOUBLE_HEIGHT_;
                    rowModel.doubleHeight_ = true;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.DOUBLE_WIDTH: // set after
                    nextSize = CellSize.DOUBLE_WIDTH_;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.DOUBLE_SIZE: // set after
                    nextSize = CellSize.DOUBLE_SIZE_;
                    rowModel.doubleHeight_ = true;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.CONCEAL: // set at
                    cell.concealed_ = true;
                    nextConcealed = true;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.HOLD_MOSAICS: // set at
                    heldMosaic.active_ = true;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.RELEASE_MOSAICS: // set after
                    cancelNextHoldMosaics = true;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.START_BOX: // set between two start box chars
                    if (cellIndex >= 1) {
                        if (this._screen[rowNum][cellIndex-1].byte_ == this._startBoxChar) {
                            cell.boxed_ = true;
                            nextBoxed = true;
                        }
                    }
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.END_BOX: // set after
                    nextBoxed = false;
                    cell.setSpace_(heldMosaic);
                    break;
                case Attributes.UNKNOWN_:
                    cell.setSpace_(heldMosaic);
                    break;
                default:
                    if (switchedG0CharacterEncoding)
                        cell.setMappedChar_(this._secondaryG0CharacterEncoding);
                    else
                        cell.setMappedChar_(this._primaryG0CharacterEncoding);
                    // mosaic chars are held for use when 'hold mosaics' is active
                    // ?? spec question. what's the impact of enhancements on held mosaics? is the held mosaic from the base page or the enhancement?
                    if (cell.isMosaic_()) {
                        heldMosaic.char_ = char;
                        heldMosaic.type_ = cell.type_;
                    }
            }

            cell.fgColour_ = textColour;
            cell.bgColour_ = backgroundColour;

            const cellEnhancements = rowEnhancements.filter(e => e.x_ == cellIndex);
            cellEnhancements.forEach(e => {
                const ecell = new EnhancedCell(cell);
                cell = ecell;
                if (e.type_ == 'g0') {
                    cell.byte_ = e.char_;
                    cell.diacritic_ = e.diacritic_;
                    cell.type_ = CellType.ALPHA_;
                    if (switchedG0CharacterEncoding)
                        cell.setMappedChar_(this._secondaryG0CharacterEncoding);
                    else
                        cell.setMappedChar_(this._primaryG0CharacterEncoding);
                } else if (e.type_ == 'g1') {
                    if (this._level == Level[2.5]) {
                        cell.byte_ = e.char_;
                        cell.type_ = graphicType;
                        cell.setMappedChar_();
                    }
                } else if (e.type_ == 'g2') {
                    cell.byte_ = e.char_;
                    cell.type_ = CellType.ALPHA_;
                    cell.setMappedChar_(this._g2CharacterEncoding);
                } else if (e.type_ == 'g3') {
                    const toKeep = this._level == Level[1.5] && G3_CHARS_IN_LEVEL_1_5.indexOf(e.char_) == -1 ? false : true;
                    if (toKeep) {
                        cell.byte_ = e.char_;
                        cell.type_ = CellType.G3_;
                        cell.setMappedChar_();
                    }
                } else if (e.type_ == 'char') {
                    cell.enhancedChar_ = e.char_;
                    cell.type_ = CellType.ALPHA_;
                }
                // console.log(cell);
                // console.log(cell.printEnhancements());
            });

            rowModel.addCell_(cell);
        });
        // console.dir(rowModel);
        return rowModel;
    }

    enhance_(data) {
        this._enhancement = data;
    }

    clearEnhancements_() {
        this._enhancement = [];
    }

}

// SPDX-FileCopyrightText: © 2021 Tech and Software Ltd.

const model = new PageModel();

function Teletext(options) {
    return new TeletextController(model, options);
}

export { Attributes, Colour, Level, Teletext };
//# sourceMappingURL=teletext.js.map
