(function() {
  // Mapping for punctuation pairs that toggle between opening/closing marks.
  const pairedPunctuation = {
    "~": "\uff5e",
    "!": "\uff01",
    $: "\uffe5",
    "^": "\u2026\u2026",
    "*": "\u00d7",
    "(": "\uff08",
    ")": "\uff09",
    "-": "\uff0d",
    _: "\u2014\u2014",
    "[": "\u3010",
    "]": "\u3011",
    "{": "\uff5b",
    "}": "\uff5d",
    "\\": "\u3001",
    ";": "\uff1b",
    ":": "\uff1a",
    "'": ["\u2018\u2019", 0],
    "\"": ["\u201c\u201d", 0],
    ",": "\uff0c",
    ".": "\u3002",
    "<": "\u300a",
    ">": "\u300b",
    "/": "\uff0f",
    "?": "\uff1f"
  };

  // Full-width variants used when the user requests punctuation mapping.
  const fullWidthFallback = {
    "~": "\uff5e",
    "!": "\uff01",
    "@": "\uff20",
    "#": "\uff03",
    $: "\uff04",
    "^": "\uff3e",
    "&": "\uff06",
    "*": "\uff0a",
    "(": "\uff08",
    ")": "\uff09",
    "-": "\uff0d",
    _: "\uff3f",
    "[": "\uff3b",
    "]": "\uff3d",
    "{": "\uff5b",
    "}": "\uff5d",
    "\\": "\uff3c",
    "|": "\uff5c",
    ";": "\uff1b",
    ":": "\uff1a",
    "'": "\uff07",
    "\"": "\uff02",
    ",": "\uff0c",
    ".": "\uff0e",
    "<": "\uff1c",
    ">": "\uff1e",
    "/": "\uff0f",
    "?": "\uff1f"
  };

  const fullWidthSequence =
    "\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19" + // digits
    "\uff41\uff42\uff43\uff44\uff45\uff46\uff47\uff48\uff49\uff4a" +
    "\uff4b\uff4c\uff4d\uff4e\uff4f\uff50\uff51\uff52\uff53\uff54" +
    "\uff55\uff56\uff57\uff58\uff59\uff5a" + // lowercase
    "\uff21\uff22\uff23\uff24\uff25\uff26\uff27\uff28\uff29\uff2a" +
    "\uff2b\uff2c\uff2d\uff2e\uff2f\uff30\uff31\uff32\uff33\uff34" +
    "\uff35\uff36\uff37\uff38\uff39\uff3a"; // uppercase

  for (let index = 0; index < fullWidthSequence.length; ++index) {
    const mapped = fullWidthSequence.charAt(index);
    if (index < 10) {
      fullWidthFallback[String(index)] = mapped;
    } else if (index < 36) {
      fullWidthFallback[String.fromCharCode(index + 87)] = mapped;
    } else {
      fullWidthFallback[String.fromCharCode(index + 29)] = mapped;
    }
  }

  google.elements.ime.loadConfig("zh-t-i0-pinyin-x0-shuangpin-ziranma", {
    0: 0,
    1: 2,
    2: !0,
    3: !1,
    4: !0,
    5: !0,
    6: !0,
    7: !0,
    8: !1,
    9: !0,
    10: !1,
    28: !1,
    30: !1,
    11: !1,
    12: !0,
    13: 50,
    14: 5,
    15: 5,
    16: null,
    19: function(_, key, flags, overrides) {
      if (flags == 0) return null;
      const response = { back: 0 };
      const isLetter = !!(flags & 1);
      if ((flags & 4) && isLetter) {
        let candidate = pairedPunctuation[key];
        if (overrides && overrides[key] !== void 0) {
          candidate = overrides[key];
        }
        if (candidate) {
          let replacement;
          if (candidate.length > 1) {
            const nextChar = candidate[0].charAt(candidate[1]);
            candidate[1] ^= 1;
            replacement = nextChar;
          } else {
            replacement = candidate;
          }
          response.text = replacement;
          return response;
        }
      }
      let fallbackChar = null;
      if (
        flags & 2 &&
        (!isLetter || !/[a-z]/i.test(key)) &&
        (fallbackChar = fullWidthFallback[key])
      ) {
        response.text = fallbackChar;
        return response;
      }
      return null;
    },
    22: /[a-z']/i,
    24: /[=.]/,
    25: /[\-,]/,
    26: /[^a-z \r]/i
  });
})();
