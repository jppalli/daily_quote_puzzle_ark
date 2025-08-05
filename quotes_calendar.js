// Daily Quote Puzzle - Calendar Quotes Database
// Each quote includes the original text, author, scrambled words, and scrambled author name

const quotesCalendar = [
    {
        "text": "The journey of a thousand miles begins with a single step.",
        "author": "Lao Tzu",
        "scrambledAuthor": "aLo zuT",
        "scrambledWords": [
            {
                "original": "journey",
                "scrambled": "uernjoy",
                "index": 1
            },
            {
                "original": "thousand",
                "scrambled": "osnathdu",
                "index": 4
            },
            {
                "original": "begins",
                "scrambled": "sgineb",
                "index": 6
            },
            {
                "original": "step",
                "scrambled": "spet",
                "index": 10
            }
        ],
        "date": "2025-03-08"
    },
    {
        "text": "April showers bring May flowers.",
        "author": "English Proverb",
        "scrambledAuthor": "hglEins bvProer",
        "scrambledWords": [
            {
                "original": "April",
                "scrambled": "lirpA",
                "index": 0
            },
            {
                "original": "showers",
                "scrambled": "wohsers",
                "index": 1
            },
            {
                "original": "flowers",
                "scrambled": "woflers",
                "index": 4
            }
        ],
        "date": "2025-04-01"
    },
    {
        "text": "The best time to plant a tree was twenty years ago. The second best time is now.",
        "author": "Chinese Proverb",
        "scrambledAuthor": "eehinCs vbProer",
        "scrambledWords": [
            {
                "original": "plant",
                "scrambled": "tnalp",
                "index": 4
            },
            {
                "original": "twenty",
                "scrambled": "ywentt",
                "index": 9
            },
            {
                "original": "second",
                "scrambled": "dnoces",
                "index": 14
            }
        ],
        "date": "2025-04-02"
    },
    {
        "text": "Spring is nature's way of saying, 'Let's party!'",
        "author": "Robin Williams",
        "scrambledAuthor": "iRnob mWilails",
        "scrambledWords": [
            {
                "original": "Spring",
                "scrambled": "gnirpS",
                "index": 0
            },
            {
                "original": "nature's",
                "scrambled": "ertanu's",
                "index": 2
            },
            {
                "original": "party",
                "scrambled": "ytrap",
                "index": 7
            }
        ],
        "date": "2025-04-03"
    },
    {
        "text": "In every walk with nature, one receives far more than they seek.",
        "author": "John Muir",
        "scrambledAuthor": "hJno riuM",
        "scrambledWords": [
            {
                "original": "walk",
                "scrambled": "klwa",
                "index": 2
            },
            {
                "original": "nature",
                "scrambled": "ertanu",
                "index": 4
            },
            {
                "original": "receives",
                "scrambled": "ceeviers",
                "index": 6
            },
            {
                "original": "seek",
                "scrambled": "kees",
                "index": 12
            }
        ],
        "date": "2025-04-04"
    },
    {
        "text": "The earth laughs in flowers.",
        "author": "Ralph Waldo Emerson",
        "scrambledAuthor": "hplaR ldoaW mEserno",
        "scrambledWords": [
            {
                "original": "earth",
                "scrambled": "htrae",
                "index": 1
            },
            {
                "original": "laughs",
                "scrambled": "hguals",
                "index": 2
            },
            {
                "original": "flowers",
                "scrambled": "woflers",
                "index": 4
            }
        ],
        "date": "2025-04-05"
    },
    {
        "text": "Bloom where you are planted.",
        "author": "Saint Francis de Sales",
        "scrambledAuthor": "tainS cFarins ed eSals",
        "scrambledWords": [
            {
                "original": "Bloom",
                "scrambled": "moolB",
                "index": 0
            },
            {
                "original": "planted",
                "scrambled": "detnalp",
                "index": 4
            }
        ],
        "date": "2025-04-06"
    },
    {
        "text": "May what I do flow from me like a river, no forcing and no holding back.",
        "author": "Rainer Maria Rilke",
        "scrambledAuthor": "eRainr aiMar ekilR",
        "scrambledWords": [
            {
                "original": "flow",
                "scrambled": "wolf",
                "index": 4
            },
            {
                "original": "river",
                "scrambled": "verir",
                "index": 9
            },
            {
                "original": "forcing",
                "scrambled": "gnicorf",
                "index": 11
            },
            {
                "original": "holding",
                "scrambled": "gnidloh",
                "index": 14
            }
        ],
        "date": "2025-05-01"
    },
    {
        "text": "The flower that blooms in adversity is the rarest and most beautiful of all.",
        "author": "Walt Disney",
        "scrambledAuthor": "tlaW yensiD",
        "scrambledWords": [
            {
                "original": "flower",
                "scrambled": "wofler",
                "index": 1
            },
            {
                "original": "blooms",
                "scrambled": "smoolb",
                "index": 3
            },
            {
                "original": "adversity",
                "scrambled": "ytisrevda",
                "index": 5
            },
            {
                "original": "rarest",
                "scrambled": "tserarr",
                "index": 8
            },
            {
                "original": "beautiful",
                "scrambled": "lufituaeb",
                "index": 11
            }
        ],
        "date": "2025-05-02"
    },
    {
        "text": "Where flowers bloom, so does hope.",
        "author": "Lady Bird Johnson",
        "scrambledAuthor": "ydaL driB nohnsJo",
        "scrambledWords": [
            {
                "original": "flowers",
                "scrambled": "woflers",
                "index": 1
            },
            {
                "original": "bloom",
                "scrambled": "moolb",
                "index": 2
            },
            {
                "original": "hope",
                "scrambled": "epoh",
                "index": 5
            }
        ],
        "date": "2025-05-03"
    },
    {
        "text": "Keep your face always toward the sunshine and shadows will fall behind you.",
        "author": "Walt Whitman",
        "scrambledAuthor": "tlaW namtihW",
        "scrambledWords": [
            {
                "original": "face",
                "scrambled": "ecaf",
                "index": 2
            },
            {
                "original": "sunshine",
                "scrambled": "enihsnus",
                "index": 6
            },
            {
                "original": "shadows",
                "scrambled": "swodahs",
                "index": 8
            },
            {
                "original": "behind",
                "scrambled": "dniheb",
                "index": 12
            }
        ],
        "date": "2025-05-04"
    },
    {
        "text": "Life is like a garden. Perfect moments can be had, but not preserved, except in memory.",
        "author": "Leonard Nimoy",
        "scrambledAuthor": "dranoLe yomiN",
        "scrambledWords": [
            {
                "original": "garden",
                "scrambled": "nedrag",
                "index": 4
            },
            {
                "original": "Perfect",
                "scrambled": "tcefPer",
                "index": 6
            },
            {
                "original": "moments",
                "scrambled": "stnemom",
                "index": 7
            },
            {
                "original": "preserved",
                "scrambled": "deserverp",
                "index": 12
            },
            {
                "original": "memory",
                "scrambled": "yromem",
                "index": 16
            }
        ],
        "date": "2025-05-05"
    },
    {
        "text": "Summer afternoon—summer afternoon; to me those have always been the two most beautiful words in the English language.",
        "author": "Henry James",
        "scrambledAuthor": "yrneH semaJ",
        "scrambledWords": [
            {
                "original": "Summer",
                "scrambled": "remmuS",
                "index": 0
            },
            {
                "original": "afternoon",
                "scrambled": "noonretfa",
                "index": 1
            },
            {
                "original": "beautiful",
                "scrambled": "lufituaeb",
                "index": 11
            },
            {
                "original": "language",
                "scrambled": "egaugnal",
                "index": 16
            }
        ],
        "date": "2025-06-01"
    },
    {
        "text": "You must be the change you wish to see in the world.",
        "author": "Mahatma Gandhi",
        "scrambledAuthor": "maaMaht Gdaihn",
        "scrambledWords": [
            {
                "original": "change",
                "scrambled": "ahnceg",
                "index": 4
            },
            {
                "original": "wish",
                "scrambled": "ishw",
                "index": 6
            },
            {
                "original": "see",
                "scrambled": "ese",
                "index": 8
            },
            {
                "original": "world",
                "scrambled": "wodlr",
                "index": 11
            }
        ],
        "date": "2025-06-02"
    },
    {
        "text": "Happiness is not something ready made. It comes from your own actions.",
        "author": "Dalai Lama",
        "scrambledAuthor": "aailD amaL",
        "scrambledWords": [
            {
                "original": "happiness",
                "scrambled": "pseanihsp",
                "index": 0
            },
            {
                "original": "something",
                "scrambled": "mgithoens",
                "index": 3
            },
            {
                "original": "comes",
                "scrambled": "mceos",
                "index": 7
            },
            {
                "original": "actions",
                "scrambled": "atoisnc",
                "index": 11
            }
        ],
        "date": "2025-06-03"
    },
    {
        "text": "Do what you can, with what you have, where you are.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "roeohTed veloeostR",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "thaw",
                "index": 1
            },
            {
                "original": "what",
                "scrambled": "twha",
                "index": 1
            },
            {
                "original": "where",
                "scrambled": "rehwe",
                "index": 8
            },
            {
                "original": "are",
                "scrambled": "ear",
                "index": 10
            }
        ],
        "date": "2025-06-04"
    },
    {
        "text": "Every moment is a fresh beginning.",
        "author": "T.S. Eliot",
        "scrambledAuthor": ".ST. itlEo",
        "scrambledWords": [
            {
                "original": "every",
                "scrambled": "vyere",
                "index": 0
            },
            {
                "original": "moment",
                "scrambled": "oetmnm",
                "index": 1
            },
            {
                "original": "fresh",
                "scrambled": "efshr",
                "index": 4
            },
            {
                "original": "beginning",
                "scrambled": "ngeingbni",
                "index": 5
            }
        ],
        "date": "2025-06-05"
    },
    {
        "text": "The only limit to our realization of tomorrow will be our doubts of today.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "hroeeTdo eeoRslotv",
        "scrambledWords": [
            {
                "original": "limit",
                "scrambled": "timli",
                "index": 2
            },
            {
                "original": "realization",
                "scrambled": "zatriaeilon",
                "index": 5
            },
            {
                "original": "doubts",
                "scrambled": "dsubto",
                "index": 11
            },
            {
                "original": "today",
                "scrambled": "dytoa",
                "index": 13
            }
        ],
        "date": "2025-06-06"
    },
    {
        "text": "To handle yourself, use your head; to handle others, use your heart.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "eeTodorh oetlseoRv",
        "scrambledWords": [
            {
                "original": "handle",
                "scrambled": "lenahd",
                "index": 1
            },
            {
                "original": "yourself",
                "scrambled": "sofyuelr",
                "index": 2
            },
            {
                "original": "handle",
                "scrambled": "hadlne",
                "index": 1
            },
            {
                "original": "heart",
                "scrambled": "htrae",
                "index": 11
            }
        ],
        "date": "2025-06-07"
    },
    {
        "text": "The mind is everything. What you think you become.",
        "author": "Buddha",
        "scrambledAuthor": "auddBh",
        "scrambledWords": [
            {
                "original": "mind",
                "scrambled": "nmid",
                "index": 1
            },
            {
                "original": "everything",
                "scrambled": "engvehrity",
                "index": 3
            },
            {
                "original": "think",
                "scrambled": "inhkt",
                "index": 6
            },
            {
                "original": "become",
                "scrambled": "bcoeme",
                "index": 8
            }
        ],
        "date": "2025-06-08"
    },
    {
        "text": "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        "author": "Aristotle",
        "scrambledAuthor": "tAtsioler",
        "scrambledWords": [
            {
                "original": "repeatedly",
                "scrambled": "elayetedrp",
                "index": 4
            },
            {
                "original": "excellence",
                "scrambled": "celelcxene",
                "index": 6
            },
            {
                "original": "act",
                "scrambled": "tca",
                "index": 11
            },
            {
                "original": "habit",
                "scrambled": "ibtha",
                "index": 14
            }
        ],
        "date": "2025-06-09"
    },
    {
        "text": "The future belongs to those who believe in the beauty of their dreams.",
        "author": "Eleanor Roosevelt",
        "scrambledAuthor": "rEaenol tRoosevle",
        "scrambledWords": [
            {
                "original": "future",
                "scrambled": "erutuf",
                "index": 1
            },
            {
                "original": "belongs",
                "scrambled": "sgnoelb",
                "index": 2
            },
            {
                "original": "believe",
                "scrambled": "veeileb",
                "index": 6
            },
            {
                "original": "beauty",
                "scrambled": "ytuaeb",
                "index": 9
            },
            {
                "original": "dreams",
                "scrambled": "smaerd",
                "index": 12
            }
        ],
        "date": "2025-06-10"
    },
    {
        "text": "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        "author": "Ralph Waldo Emerson",
        "scrambledAuthor": "Rhpla doaWl rnemsEo",
        "scrambledWords": [
            {
                "original": "behind",
                "scrambled": "eihdbn",
                "index": 2
            },
            {
                "original": "before",
                "scrambled": "rbeoef",
                "index": 7
            },
            {
                "original": "matters",
                "scrambled": "rmtaste",
                "index": 11
            },
            {
                "original": "within",
                "scrambled": "tinwih",
                "index": 16
            }
        ],
        "date": "2025-06-11"
    },
    {
        "text": "The only way to make sense out of change is to plunge into it, move with it, and enjoy the dance.",
        "author": "Alan Watts",
        "scrambledAuthor": "alAn tsWat",
        "scrambledWords": [
            {
                "original": "make",
                "scrambled": "mkae",
                "index": 4
            },
            {
                "original": "change",
                "scrambled": "cegnah",
                "index": 8
            },
            {
                "original": "plunge",
                "scrambled": "uelpng",
                "index": 11
            },
            {
                "original": "enjoy",
                "scrambled": "yojen",
                "index": 18
            }
        ],
        "date": "2025-06-12"
    },
    {
        "text": "Life is either a daring adventure or nothing at all.",
        "author": "Helen Keller",
        "scrambledAuthor": "eenHl elKrel",
        "scrambledWords": [
            {
                "original": "life",
                "scrambled": "eifl",
                "index": 0
            },
            {
                "original": "daring",
                "scrambled": "nirdga",
                "index": 4
            },
            {
                "original": "adventure",
                "scrambled": "aevdturne",
                "index": 5
            },
            {
                "original": "nothing",
                "scrambled": "ingnhto",
                "index": 7
            }
        ],
        "date": "2025-06-13"
    },
    {
        "text": "You miss 100 percent of the shots you don't take.",
        "author": "Wayne Gretzky",
        "scrambledAuthor": "aneyW zGyrekt",
        "scrambledWords": [
            {
                "original": "miss",
                "scrambled": "smsi",
                "index": 1
            },
            {
                "original": "percent",
                "scrambled": "pctenre",
                "index": 3
            },
            {
                "original": "shots",
                "scrambled": "ossht",
                "index": 6
            },
            {
                "original": "take",
                "scrambled": "teka",
                "index": 9
            }
        ],
        "date": "2025-06-14"
    },
    {
        "text": "The greatest wealth is to live content with little.",
        "author": "Plato",
        "scrambledAuthor": "aPotl",
        "scrambledWords": [
            {
                "original": "greatest",
                "scrambled": "tetgrsea",
                "index": 1
            },
            {
                "original": "wealth",
                "scrambled": "thweal",
                "index": 2
            },
            {
                "original": "content",
                "scrambled": "tenncot",
                "index": 6
            },
            {
                "original": "little",
                "scrambled": "tiletl",
                "index": 8
            }
        ],
        "date": "2025-06-15"
    },
    {
        "text": "Success is to be measured not by wealth, but by the legacy you leave behind.",
        "author": "Unknown",
        "scrambledAuthor": "wUnknon",
        "scrambledWords": [
            {
                "original": "success",
                "scrambled": "scsscue",
                "index": 0
            },
            {
                "original": "measured",
                "scrambled": "suerdema",
                "index": 4
            },
            {
                "original": "wealth",
                "scrambled": "lewaht",
                "index": 7
            },
            {
                "original": "legacy",
                "scrambled": "gyaecl",
                "index": 11
            }
        ],
        "date": "2025-06-16"
    },
    {
        "text": "The purpose of our lives is to be happy.",
        "author": "Dalai Lama",
        "scrambledAuthor": "aDali amaL",
        "scrambledWords": [
            {
                "original": "purpose",
                "scrambled": "psepuro",
                "index": 1
            },
            {
                "original": "lives",
                "scrambled": "vsile",
                "index": 4
            },
            {
                "original": "be",
                "scrambled": "eb",
                "index": 7
            },
            {
                "original": "happy",
                "scrambled": "aphyp",
                "index": 8
            }
        ],
        "date": "2025-06-17"
    },
    {
        "text": "Change your thoughts and you change your world.",
        "author": "Norman Vincent Peale",
        "scrambledAuthor": "mNnrao inctVen aelPe",
        "scrambledWords": [
            {
                "original": "change",
                "scrambled": "aeghnc",
                "index": 0
            },
            {
                "original": "thoughts",
                "scrambled": "htgosuth",
                "index": 2
            },
            {
                "original": "change",
                "scrambled": "nagech",
                "index": 0
            },
            {
                "original": "world",
                "scrambled": "lrowd",
                "index": 7
            }
        ],
        "date": "2025-06-18"
    },
    {
        "text": "The only person you are destined to become is the person you decide to be.",
        "author": "Ralph Waldo Emerson",
        "scrambledAuthor": "alRph ladWo esnoEmr",
        "scrambledWords": [
            {
                "original": "person",
                "scrambled": "sroenp",
                "index": 2
            },
            {
                "original": "destined",
                "scrambled": "eeddnits",
                "index": 5
            },
            {
                "original": "become",
                "scrambled": "comeeb",
                "index": 7
            },
            {
                "original": "decide",
                "scrambled": "edecid",
                "index": 12
            }
        ],
        "date": "2025-06-19"
    },
    {
        "text": "It is never too late to be what you might have been.",
        "author": "T.S. Eliot",
        "scrambledAuthor": "ST.. oilEt",
        "scrambledWords": [
            {
                "original": "never",
                "scrambled": "veren",
                "index": 2
            },
            {
                "original": "late",
                "scrambled": "eatl",
                "index": 4
            },
            {
                "original": "what",
                "scrambled": "ahtw",
                "index": 7
            },
            {
                "original": "been",
                "scrambled": "eenb",
                "index": 11
            }
        ],
        "date": "2025-06-20"
    },
    {
        "text": "You cannot shake hands with a clenched fist.",
        "author": "Mahatma Gandhi",
        "scrambledAuthor": "ataMhma anidGh",
        "scrambledWords": [
            {
                "original": "cannot",
                "scrambled": "nnoatc",
                "index": 1
            },
            {
                "original": "shake",
                "scrambled": "kseah",
                "index": 2
            },
            {
                "original": "clenched",
                "scrambled": "cenlcdeh",
                "index": 6
            },
            {
                "original": "fist",
                "scrambled": "tisf",
                "index": 7
            }
        ],
        "date": "2025-06-21"
    },
    {
        "text": "The secret of getting ahead is getting started.",
        "author": "Mark Twain",
        "scrambledAuthor": "aMkr awnTi",
        "scrambledWords": [
            {
                "original": "secret",
                "scrambled": "ctrees",
                "index": 1
            },
            {
                "original": "getting",
                "scrambled": "ttiengg",
                "index": 3
            },
            {
                "original": "ahead",
                "scrambled": "aeahd",
                "index": 4
            },
            {
                "original": "started",
                "scrambled": "etrsatd",
                "index": 7
            }
        ],
        "date": "2025-06-22"
    },
    {
        "text": "What we think, we become.",
        "author": "Buddha",
        "scrambledAuthor": "auddhB",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "hawt",
                "index": 0
            },
            {
                "original": "think",
                "scrambled": "inthk",
                "index": 2
            },
            {
                "original": "we",
                "scrambled": "ew",
                "index": 1
            },
            {
                "original": "become",
                "scrambled": "eemcbo",
                "index": 4
            }
        ],
        "date": "2025-06-23"
    },
    {
        "text": "A goal is a dream with a deadline.",
        "author": "Napoleon Hill",
        "scrambledAuthor": "eapnNloo lilH",
        "scrambledWords": [
            {
                "original": "goal",
                "scrambled": "lgoa",
                "index": 1
            },
            {
                "original": "dream",
                "scrambled": "rmdae",
                "index": 4
            },
            {
                "original": "with",
                "scrambled": "iwht",
                "index": 5
            },
            {
                "original": "deadline",
                "scrambled": "nldieead",
                "index": 7
            }
        ],
        "date": "2025-06-24"
    },
    {
        "text": "Act as if what you do makes a difference. It does.",
        "author": "William James",
        "scrambledAuthor": "iimallW eamsJ",
        "scrambledWords": [
            {
                "original": "act",
                "scrambled": "cta",
                "index": 0
            },
            {
                "original": "what",
                "scrambled": "hwat",
                "index": 3
            },
            {
                "original": "makes",
                "scrambled": "sekam",
                "index": 6
            },
            {
                "original": "difference",
                "scrambled": "ndficfeere",
                "index": 8
            }
        ],
        "date": "2025-06-25"
    },
    {
        "text": "The best preparation for tomorrow is doing your best today.",
        "author": "Jesse Jackson",
        "scrambledAuthor": "Jeses asJckno",
        "scrambledWords": [
            {
                "original": "best",
                "scrambled": "stbe",
                "index": 1
            },
            {
                "original": "preparation",
                "scrambled": "eraptpnrioa",
                "index": 2
            },
            {
                "original": "tomorrow",
                "scrambled": "oowmrrto",
                "index": 4
            },
            {
                "original": "today",
                "scrambled": "toady",
                "index": 9
            }
        ],
        "date": "2025-06-26"
    },
    {
        "text": "You are never too old to set another goal or to dream a new dream.",
        "author": "C.S. Lewis",
        "scrambledAuthor": "CS.. Liwse",
        "scrambledWords": [
            {
                "original": "never",
                "scrambled": "eenvr",
                "index": 2
            },
            {
                "original": "set",
                "scrambled": "tes",
                "index": 6
            },
            {
                "original": "goal",
                "scrambled": "algo",
                "index": 8
            },
            {
                "original": "dream",
                "scrambled": "maerd",
                "index": 11
            }
        ],
        "date": "2025-06-27"
    },
    {
        "text": "The only true wisdom is in knowing you know nothing.",
        "author": "Socrates",
        "scrambledAuthor": "coaetSsr",
        "scrambledWords": [
            {
                "original": "true",
                "scrambled": "erut",
                "index": 2
            },
            {
                "original": "wisdom",
                "scrambled": "sdwmio",
                "index": 3
            },
            {
                "original": "knowing",
                "scrambled": "giwnnko",
                "index": 6
            },
            {
                "original": "nothing",
                "scrambled": "tnnogih",
                "index": 9
            }
        ],
        "date": "2025-06-28"
    },
    {
        "text": "It is not the mountain we conquer, but ourselves.",
        "author": "Edmund Hillary",
        "scrambledAuthor": "nuEdmd Hyliral",
        "scrambledWords": [
            {
                "original": "mountain",
                "scrambled": "tunoinam",
                "index": 4
            },
            {
                "original": "conquer",
                "scrambled": "qneuorc",
                "index": 6
            },
            {
                "original": "but",
                "scrambled": "tub",
                "index": 7
            },
            {
                "original": "ourselves",
                "scrambled": "vssuoeerl",
                "index": 8
            }
        ],
        "date": "2025-06-29"
    },
    {
        "text": "Life is short, and it is up to you to make it sweet.",
        "author": "Sarah Bernhardt",
        "scrambledAuthor": "aarSh edtBnhrar",
        "scrambledWords": [
            {
                "original": "life",
                "scrambled": "lefi",
                "index": 0
            },
            {
                "original": "short",
                "scrambled": "shrot",
                "index": 2
            },
            {
                "original": "make",
                "scrambled": "aemk",
                "index": 10
            },
            {
                "original": "sweet",
                "scrambled": "estew",
                "index": 12
            }
        ],
        "date": "2025-06-30"
    },
    {
        "text": "The way to get started is to quit talking and begin doing.",
        "author": "Walt Disney",
        "scrambledAuthor": "taWl syneiD",
        "scrambledWords": [
            {
                "original": "started",
                "scrambled": "etarstd",
                "index": 4
            },
            {
                "original": "quit",
                "scrambled": "tiqu",
                "index": 7
            },
            {
                "original": "talking",
                "scrambled": "natkilg",
                "index": 8
            },
            {
                "original": "begin",
                "scrambled": "ebgin",
                "index": 10
            }
        ],
        "date": "2025-07-01"
    },
    {
        "text": "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
        "author": "James Cameron",
        "scrambledAuthor": "Jsema eronaCm",
        "scrambledWords": [
            {
                "original": "goals",
                "scrambled": "gsola",
                "index": 4
            },
            {
                "original": "ridiculously",
                "scrambled": "urlluyicdiso",
                "index": 5
            },
            {
                "original": "failure",
                "scrambled": "aferuli",
                "index": 10
            },
            {
                "original": "success",
                "scrambled": "suescsc",
                "index": 17
            }
        ],
        "date": "2025-07-02"
    },
    {
        "text": "If you look at what you have in life, you'll always have more.",
        "author": "Oprah Winfrey",
        "scrambledAuthor": "apOrh Wenyrfi",
        "scrambledWords": [
            {
                "original": "look",
                "scrambled": "okol",
                "index": 2
            },
            {
                "original": "what",
                "scrambled": "athw",
                "index": 4
            },
            {
                "original": "life",
                "scrambled": "ifle",
                "index": 8
            },
            {
                "original": "always",
                "scrambled": "wsaayl",
                "index": 10
            }
        ],
        "date": "2025-07-03"
    },
    {
        "text": "If life were predictable it would cease to be life, and be without flavor.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "oreTehdo etoeRlosv",
        "scrambledWords": [
            {
                "original": "life",
                "scrambled": "lfei",
                "index": 1
            },
            {
                "original": "predictable",
                "scrambled": "blitaedcpre",
                "index": 3
            },
            {
                "original": "cease",
                "scrambled": "aeesc",
                "index": 6
            },
            {
                "original": "flavor",
                "scrambled": "ovalrf",
                "index": 13
            }
        ],
        "date": "2025-07-04"
    },
    {
        "text": "The greatest glory in living is not in never falling, but in rising every time we fall.",
        "author": "Nelson Mandela",
        "scrambledAuthor": "elnsoN anedlMa",
        "scrambledWords": [
            {
                "original": "greatest",
                "scrambled": "gtseeart",
                "index": 1
            },
            {
                "original": "glory",
                "scrambled": "roylg",
                "index": 2
            },
            {
                "original": "falling",
                "scrambled": "iagnllf",
                "index": 9
            },
            {
                "original": "rising",
                "scrambled": "igirns",
                "index": 12
            }
        ],
        "date": "2025-07-05"
    },
    {
        "text": "It does not matter how slowly you go as long as you do not stop.",
        "author": "Confucius",
        "scrambledAuthor": "ucsfinuCo",
        "scrambledWords": [
            {
                "original": "matter",
                "scrambled": "ttmrea",
                "index": 3
            },
            {
                "original": "slowly",
                "scrambled": "lyoswl",
                "index": 5
            },
            {
                "original": "long",
                "scrambled": "olng",
                "index": 9
            },
            {
                "original": "stop",
                "scrambled": "opts",
                "index": 14
            }
        ],
        "date": "2025-07-06"
    },
    {
        "text": "Whether you think you can or you think you can't, you're right.",
        "author": "Henry Ford",
        "scrambledAuthor": "Hnery oFdr",
        "scrambledWords": [
            {
                "original": "whether",
                "scrambled": "rwtehhe",
                "index": 0
            },
            {
                "original": "think",
                "scrambled": "knthi",
                "index": 2
            },
            {
                "original": "think",
                "scrambled": "ikthn",
                "index": 2
            },
            {
                "original": "right",
                "scrambled": "hitrg",
                "index": 11
            }
        ],
        "date": "2025-07-07"
    },
    {
        "text": "The best revenge is massive success.",
        "author": "Frank Sinatra",
        "scrambledAuthor": "anFrk tarniaS",
        "scrambledWords": [
            {
                "original": "best",
                "scrambled": "etbs",
                "index": 1
            },
            {
                "original": "revenge",
                "scrambled": "vnregee",
                "index": 2
            },
            {
                "original": "massive",
                "scrambled": "msiasev",
                "index": 4
            },
            {
                "original": "success",
                "scrambled": "scescus",
                "index": 5
            }
        ],
        "date": "2025-07-08"
    },
    {
        "text": "Life is what we make it, always has been, always will be.",
        "author": "Grandma Moses",
        "scrambledAuthor": "dmGaanr sesoM",
        "scrambledWords": [
            {
                "original": "life",
                "scrambled": "ilfe",
                "index": 0
            },
            {
                "original": "what",
                "scrambled": "htaw",
                "index": 2
            },
            {
                "original": "make",
                "scrambled": "kema",
                "index": 4
            },
            {
                "original": "always",
                "scrambled": "waslay",
                "index": 6
            }
        ],
        "date": "2025-07-09"
    },
    {
        "text": "The only impossible journey is the one you never start.",
        "author": "Tony Robbins",
        "scrambledAuthor": "nyoT osnbiRb",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "yonl",
                "index": 1
            },
            {
                "original": "impossible",
                "scrambled": "pbslieisom",
                "index": 2
            },
            {
                "original": "journey",
                "scrambled": "neruyjo",
                "index": 3
            },
            {
                "original": "never",
                "scrambled": "nevre",
                "index": 8
            }
        ],
        "date": "2025-07-10"
    },
    {
        "text": "Believe you can and you're halfway there.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "rodeTohe vtselReoo",
        "scrambledWords": [
            {
                "original": "believe",
                "scrambled": "ilvebee",
                "index": 0
            },
            {
                "original": "can",
                "scrambled": "nac",
                "index": 2
            },
            {
                "original": "you're",
                "scrambled": "reo'yu",
                "index": 4
            },
            {
                "original": "halfway",
                "scrambled": "fwylaah",
                "index": 5
            }
        ],
        "date": "2025-07-11"
    },
    {
        "text": "It is during our darkest moments that we must focus to see the light.",
        "author": "Aristotle",
        "scrambledAuthor": "rtoeistlA",
        "scrambledWords": [
            {
                "original": "during",
                "scrambled": "drinug",
                "index": 2
            },
            {
                "original": "darkest",
                "scrambled": "datrkse",
                "index": 4
            },
            {
                "original": "moments",
                "scrambled": "esntomm",
                "index": 5
            },
            {
                "original": "focus",
                "scrambled": "ucfos",
                "index": 9
            }
        ],
        "date": "2025-07-12"
    },
    {
        "text": "Don't let yesterday take up too much of today.",
        "author": "Will Rogers",
        "scrambledAuthor": "lliW grosRe",
        "scrambledWords": [
            {
                "original": "yesterday",
                "scrambled": "yryatsede",
                "index": 2
            },
            {
                "original": "take",
                "scrambled": "etak",
                "index": 3
            },
            {
                "original": "much",
                "scrambled": "chum",
                "index": 6
            },
            {
                "original": "today",
                "scrambled": "dotya",
                "index": 8
            }
        ],
        "date": "2025-07-13"
    },
    {
        "text": "The way to get started is to quit talking and begin doing.",
        "author": "Walt Disney",
        "scrambledAuthor": "latW ysnDie",
        "scrambledWords": [
            {
                "original": "started",
                "scrambled": "rdsatte",
                "index": 4
            },
            {
                "original": "quit",
                "scrambled": "quti",
                "index": 7
            },
            {
                "original": "talking",
                "scrambled": "tliangk",
                "index": 8
            },
            {
                "original": "doing",
                "scrambled": "gdnio",
                "index": 11
            }
        ],
        "date": "2025-07-14"
    },
    {
        "text": "Your time is limited, don't waste it living someone else's life.",
        "author": "Steve Jobs",
        "scrambledAuthor": "tvSee sobJ",
        "scrambledWords": [
            {
                "original": "time",
                "scrambled": "emit",
                "index": 1
            },
            {
                "original": "limited",
                "scrambled": "elimtdi",
                "index": 3
            },
            {
                "original": "waste",
                "scrambled": "ewast",
                "index": 5
            },
            {
                "original": "living",
                "scrambled": "vignli",
                "index": 7
            }
        ],
        "date": "2025-07-15"
    },
    {
        "text": "The best time to plant a tree was 20 years ago. The second best time is now.",
        "author": "Chinese Proverb",
        "scrambledAuthor": "sCeehni brorPev",
        "scrambledWords": [
            {
                "original": "best",
                "scrambled": "steb",
                "index": 1
            },
            {
                "original": "plant",
                "scrambled": "lntpa",
                "index": 4
            },
            {
                "original": "years",
                "scrambled": "yares",
                "index": 9
            },
            {
                "original": "second",
                "scrambled": "sedcon",
                "index": 12
            }
        ],
        "date": "2025-07-16"
    },
    {
        "text": "Innovation distinguishes between a leader and a follower.",
        "author": "Steve Jobs",
        "scrambledAuthor": "tSeve obsJ",
        "scrambledWords": [
            {
                "original": "innovation",
                "scrambled": "ooantnviin",
                "index": 0
            },
            {
                "original": "distinguishes",
                "scrambled": "sgiutdhiseins",
                "index": 1
            },
            {
                "original": "leader",
                "scrambled": "deaelr",
                "index": 4
            },
            {
                "original": "follower",
                "scrambled": "orflwole",
                "index": 7
            }
        ],
        "date": "2025-07-17"
    },
    {
        "text": "The only thing we have to fear is fear itself.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "Tohoered eevRtsolo",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "olyn",
                "index": 1
            },
            {
                "original": "thing",
                "scrambled": "thgni",
                "index": 2
            },
            {
                "original": "fear",
                "scrambled": "rfae",
                "index": 6
            },
            {
                "original": "itself",
                "scrambled": "lfsiet",
                "index": 9
            }
        ],
        "date": "2025-07-18"
    },
    {
        "text": "In the middle of difficulty lies opportunity.",
        "author": "Albert Einstein",
        "scrambledAuthor": "btleAr iiEntens",
        "scrambledWords": [
            {
                "original": "middle",
                "scrambled": "dmlied",
                "index": 2
            },
            {
                "original": "difficulty",
                "scrambled": "fuiiydltfc",
                "index": 4
            },
            {
                "original": "lies",
                "scrambled": "leis",
                "index": 5
            },
            {
                "original": "opportunity",
                "scrambled": "rtyotoiuppn",
                "index": 6
            }
        ],
        "date": "2025-07-19"
    },
    {
        "text": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "author": "Winston Churchill",
        "scrambledAuthor": "nstWnoi cuChrillh",
        "scrambledWords": [
            {
                "original": "success",
                "scrambled": "ccssues",
                "index": 0
            },
            {
                "original": "failure",
                "scrambled": "lreufia",
                "index": 4
            },
            {
                "original": "courage",
                "scrambled": "aocuegr",
                "index": 11
            },
            {
                "original": "continue",
                "scrambled": "ntonecui",
                "index": 13
            }
        ],
        "date": "2025-07-20"
    },
    {
        "text": "The future belongs to those who believe in the beauty of their dreams.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "Troheedo Roevoltes",
        "scrambledWords": [
            {
                "original": "future",
                "scrambled": "rfeutu",
                "index": 1
            },
            {
                "original": "belongs",
                "scrambled": "beosgln",
                "index": 2
            },
            {
                "original": "believe",
                "scrambled": "ielebve",
                "index": 6
            },
            {
                "original": "beauty",
                "scrambled": "ubteya",
                "index": 9
            }
        ],
        "date": "2025-07-21"
    },
    {
        "text": "Be yourself; everyone else is already taken.",
        "author": "Oscar Wilde",
        "scrambledAuthor": "srcaO Weldi",
        "scrambledWords": [
            {
                "original": "yourself",
                "scrambled": "sufyoerl",
                "index": 1
            },
            {
                "original": "everyone",
                "scrambled": "yeernevo",
                "index": 2
            },
            {
                "original": "already",
                "scrambled": "lyearda",
                "index": 5
            },
            {
                "original": "taken",
                "scrambled": "ntkae",
                "index": 6
            }
        ],
        "date": "2025-07-22"
    },
    {
        "text": "Life is what happens when you're busy making other plans.",
        "author": "John Lennon",
        "scrambledAuthor": "oJhn onnLne",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "athw",
                "index": 2
            },
            {
                "original": "happens",
                "scrambled": "shppaen",
                "index": 3
            },
            {
                "original": "busy",
                "scrambled": "usyb",
                "index": 6
            },
            {
                "original": "making",
                "scrambled": "nakmig",
                "index": 7
            }
        ],
        "date": "2025-07-23"
    },
    {
        "text": "The only way to do great work is to love what you do.",
        "author": "Steve Jobs",
        "scrambledAuthor": "tveeS oJbs",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "onyl",
                "index": 1
            },
            {
                "original": "great",
                "scrambled": "taegr",
                "index": 5
            },
            {
                "original": "work",
                "scrambled": "orkw",
                "index": 6
            },
            {
                "original": "love",
                "scrambled": "evlo",
                "index": 9
            }
        ],
        "date": "2025-07-24"
    },
    {
        "text": "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
        "author": "Benjamin Franklin",
        "scrambledAuthor": "emjnBain rknlnFai",
        "scrambledWords": [
            {
                "original": "tell",
                "scrambled": "llte",
                "index": 0
            },
            {
                "original": "forget",
                "scrambled": "ogfert",
                "index": 4
            },
            {
                "original": "remember",
                "scrambled": "errmmeeb",
                "index": 9
            },
            {
                "original": "learn",
                "scrambled": "anlre",
                "index": 14
            }
        ],
        "date": "2025-07-25"
    },
    {
        "text": "You have been assigned this mountain to show others it can be moved.",
        "author": "Unknown",
        "scrambledAuthor": "nnUkwon",
        "scrambledWords": [
            {
                "original": "assigned",
                "scrambled": "desagisn",
                "index": 3
            },
            {
                "original": "mountain",
                "scrambled": "uamontni",
                "index": 5
            },
            {
                "original": "show",
                "scrambled": "owhs",
                "index": 7
            },
            {
                "original": "moved",
                "scrambled": "modve",
                "index": 12
            }
        ],
        "date": "2025-07-26"
    },
    {
        "text": "Do not go where the path may lead, go where there is no path and leave a trail.",
        "author": "Ralph Waldo Emerson",
        "scrambledAuthor": "Rhalp doWla oEmnser",
        "scrambledWords": [
            {
                "original": "where",
                "scrambled": "ewher",
                "index": 3
            },
            {
                "original": "path",
                "scrambled": "hapt",
                "index": 5
            },
            {
                "original": "where",
                "scrambled": "rehew",
                "index": 3
            },
            {
                "original": "trail",
                "scrambled": "lrait",
                "index": 17
            }
        ],
        "date": "2025-07-27"
    },
    {
        "text": "It is better to be hated for what you are than to be loved for what you are not.",
        "author": "André Gide",
        "scrambledAuthor": "Arndé Gdie",
        "scrambledWords": [
            {
                "original": "better",
                "scrambled": "tbtree",
                "index": 2
            },
            {
                "original": "hated",
                "scrambled": "thead",
                "index": 5
            },
            {
                "original": "loved",
                "scrambled": "eodlv",
                "index": 13
            },
            {
                "original": "what",
                "scrambled": "thaw",
                "index": 7
            }
        ],
        "date": "2025-07-28"
    },
    {
        "text": "Always remember that you are absolutely unique. Just like everyone else.",
        "author": "Mark Twain",
        "scrambledAuthor": "rMak waniT",
        "scrambledWords": [
            {
                "original": "remember",
                "scrambled": "brmremee",
                "index": 1
            },
            {
                "original": "absolutely",
                "scrambled": "tsolaebuly",
                "index": 5
            },
            {
                "original": "unique",
                "scrambled": "eiuqun",
                "index": 6
            },
            {
                "original": "everyone",
                "scrambled": "nreeeovy",
                "index": 9
            }
        ],
        "date": "2025-07-29"
    },
    {
        "text": "When you reach the end of your rope, tie a knot in it and hang on.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "rdoeohTe voleRstoe",
        "scrambledWords": [
            {
                "original": "reach",
                "scrambled": "herac",
                "index": 2
            },
            {
                "original": "rope",
                "scrambled": "oerp",
                "index": 7
            },
            {
                "original": "knot",
                "scrambled": "oktn",
                "index": 10
            },
            {
                "original": "hang",
                "scrambled": "ahng",
                "index": 14
            }
        ],
        "date": "2025-07-30"
    },
    {
        "text": "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
        "author": "Mother Teresa",
        "scrambledAuthor": "Mteohr Tesare",
        "scrambledWords": [
            {
                "original": "spread",
                "scrambled": "esrpda",
                "index": 0
            },
            {
                "original": "everywhere",
                "scrambled": "eveewrryeh",
                "index": 2
            },
            {
                "original": "leaving",
                "scrambled": "negvali",
                "index": 13
            },
            {
                "original": "happier",
                "scrambled": "riaepph",
                "index": 14
            }
        ],
        "date": "2025-07-31"
    },
    {
        "text": "The only real mistake is the one from which we learn nothing.",
        "author": "Henry Ford",
        "scrambledAuthor": "yenHr rdFo",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "lnoy",
                "index": 1
            },
            {
                "original": "mistake",
                "scrambled": "satikme",
                "index": 3
            },
            {
                "original": "learn",
                "scrambled": "lrnae",
                "index": 10
            },
            {
                "original": "nothing",
                "scrambled": "otngnih",
                "index": 11
            }
        ],
        "date": "2025-08-02"
    },
    {
        "text": "The future starts today, not tomorrow.",
        "author": "Pope John Paul II",
        "scrambledAuthor": "Ppoe oJhn ualP II",
        "scrambledWords": [
            {
                "original": "future",
                "scrambled": "furtue",
                "index": 1
            },
            {
                "original": "starts",
                "scrambled": "stsart",
                "index": 2
            },
            {
                "original": "today",
                "scrambled": "ayotd",
                "index": 3
            },
            {
                "original": "tomorrow",
                "scrambled": "wmooortr",
                "index": 5
            }
        ],
        "date": "2025-08-01"
    },
    {
        "text": "Do one thing every day that scares you.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "dhrTeoeo Rtvooesle",
        "scrambledWords": [
            {
                "original": "one",
                "scrambled": "noe",
                "index": 1
            },
            {
                "original": "thing",
                "scrambled": "hgint",
                "index": 2
            },
            {
                "original": "day",
                "scrambled": "yad",
                "index": 4
            },
            {
                "original": "scares",
                "scrambled": "creass",
                "index": 6
            }
        ],
        "date": "2025-08-03"
    },
    {
        "text": "The greatest discovery of all time is that a person can change his future by merely changing his attitude.",
        "author": "Oprah Winfrey",
        "scrambledAuthor": "hrOap ifWnyer",
        "scrambledWords": [
            {
                "original": "greatest",
                "scrambled": "atsrgeet",
                "index": 1
            },
            {
                "original": "discovery",
                "scrambled": "iseorcvdy",
                "index": 2
            },
            {
                "original": "change",
                "scrambled": "gahcen",
                "index": 11
            },
            {
                "original": "attitude",
                "scrambled": "iauttedt",
                "index": 18
            }
        ],
        "date": "2025-08-04"
    },
    {
        "text": "Do one thing every day that scares you.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "dhrTeoeo Rtvooesle",
        "scrambledWords": [
            {
                "original": "one",
                "scrambled": "noe",
                "index": 1
            },
            {
                "original": "thing",
                "scrambled": "hgint",
                "index": 2
            },
            {
                "original": "day",
                "scrambled": "yad",
                "index": 4
            },
            {
                "original": "scares",
                "scrambled": "creass",
                "index": 6
            }
        ],
        "date": "2025-08-05"
    },
    {
        "text": "What you do today can improve all your tomorrows.",
        "author": "Ralph Nader",
        "scrambledAuthor": "apRlh arNed",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "wtha",
                "index": 0
            },
            {
                "original": "today",
                "scrambled": "dtyoa",
                "index": 3
            },
            {
                "original": "improve",
                "scrambled": "ierpmov",
                "index": 5
            },
            {
                "original": "tomorrows",
                "scrambled": "wrtoosmro",
                "index": 8
            }
        ],
        "date": "2025-08-06"
    },
    {
        "text": "Success is not the absence of obstacles, but the courage to push through them.",
        "author": "Unknown",
        "scrambledAuthor": "nnwonkU",
        "scrambledWords": [
            {
                "original": "success",
                "scrambled": "uscsces",
                "index": 0
            },
            {
                "original": "absence",
                "scrambled": "bceensa",
                "index": 4
            },
            {
                "original": "courage",
                "scrambled": "grucaoe",
                "index": 9
            },
            {
                "original": "through",
                "scrambled": "hohutrg",
                "index": 12
            }
        ],
        "date": "2025-08-07"
    },
    {
        "text": "The only thing standing between you and your goal is the story you keep telling yourself.",
        "author": "Tony Robbins",
        "scrambledAuthor": "yTon nbbRois",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "onyl",
                "index": 1
            },
            {
                "original": "standing",
                "scrambled": "ingantds",
                "index": 3
            },
            {
                "original": "goal",
                "scrambled": "lgao",
                "index": 8
            },
            {
                "original": "telling",
                "scrambled": "gnilelt",
                "index": 14
            }
        ],
        "date": "2025-08-08"
    },
    {
        "text": "You can't go back and change the beginning, but you can start where you are and change the ending.",
        "author": "C.S. Lewis",
        "scrambledAuthor": ".CS. sewiL",
        "scrambledWords": [
            {
                "original": "change",
                "scrambled": "geahnc",
                "index": 5
            },
            {
                "original": "beginning",
                "scrambled": "niinbgneg",
                "index": 7
            },
            {
                "original": "start",
                "scrambled": "sttar",
                "index": 11
            },
            {
                "original": "ending",
                "scrambled": "dineng",
                "index": 18
            }
        ],
        "date": "2025-08-09"
    },
    {
        "text": "The best way to predict the future is to create it.",
        "author": "Peter Drucker",
        "scrambledAuthor": "etreP ckeurrD",
        "scrambledWords": [
            {
                "original": "best",
                "scrambled": "tbes",
                "index": 1
            },
            {
                "original": "predict",
                "scrambled": "itcrpde",
                "index": 4
            },
            {
                "original": "future",
                "scrambled": "erfutu",
                "index": 6
            },
            {
                "original": "create",
                "scrambled": "erctea",
                "index": 9
            }
        ],
        "date": "2025-08-10"
    },
    {
        "text": "It is not what you look at that matters, it is what you see.",
        "author": "Henry David Thoreau",
        "scrambledAuthor": "yeHrn idaDv huraToe",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "awht",
                "index": 3
            },
            {
                "original": "look",
                "scrambled": "oolk",
                "index": 5
            },
            {
                "original": "matters",
                "scrambled": "raemstt",
                "index": 8
            },
            {
                "original": "see",
                "scrambled": "ees",
                "index": 13
            }
        ],
        "date": "2025-08-11"
    },
    {
        "text": "The only way to achieve the impossible is to believe it is possible.",
        "author": "Lewis Carroll",
        "scrambledAuthor": "Liwse larroCl",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "nyol",
                "index": 1
            },
            {
                "original": "achieve",
                "scrambled": "iehavce",
                "index": 4
            },
            {
                "original": "impossible",
                "scrambled": "ismspeolbi",
                "index": 6
            },
            {
                "original": "believe",
                "scrambled": "bveleei",
                "index": 9
            }
        ],
        "date": "2025-08-12"
    },
    {
        "text": "You are braver than you believe, stronger than you seem, and smarter than you think.",
        "author": "A.A. Milne",
        "scrambledAuthor": ".AA. Melni",
        "scrambledWords": [
            {
                "original": "braver",
                "scrambled": "rbvrae",
                "index": 2
            },
            {
                "original": "believe",
                "scrambled": "vebelie",
                "index": 5
            },
            {
                "original": "stronger",
                "scrambled": "gsteorrn",
                "index": 6
            },
            {
                "original": "smarter",
                "scrambled": "rsemart",
                "index": 11
            }
        ],
        "date": "2025-08-13"
    },
    {
        "text": "The greatest risk is not taking any risk at all.",
        "author": "Mark Zuckerberg",
        "scrambledAuthor": "rkaM cerekZrubg",
        "scrambledWords": [
            {
                "original": "greatest",
                "scrambled": "stergaet",
                "index": 1
            },
            {
                "original": "risk",
                "scrambled": "kisr",
                "index": 2
            },
            {
                "original": "taking",
                "scrambled": "gnkait",
                "index": 5
            },
            {
                "original": "risk",
                "scrambled": "skir",
                "index": 2
            }
        ],
        "date": "2025-08-14"
    },
    {
        "text": "Don't watch the clock; do what it does. Keep going.",
        "author": "Sam Levenson",
        "scrambledAuthor": "maS vneLseon",
        "scrambledWords": [
            {
                "original": "watch",
                "scrambled": "wtcah",
                "index": 1
            },
            {
                "original": "clock",
                "scrambled": "coclk",
                "index": 3
            },
            {
                "original": "does",
                "scrambled": "soed",
                "index": 7
            },
            {
                "original": "keep",
                "scrambled": "ekpe",
                "index": 8
            }
        ],
        "date": "2025-08-15"
    },
    {
        "text": "The only limit to our realization of tomorrow is our doubts of today.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "ehodTore oRtoelesv",
        "scrambledWords": [
            {
                "original": "limit",
                "scrambled": "ilimt",
                "index": 2
            },
            {
                "original": "realization",
                "scrambled": "larzatnieoi",
                "index": 5
            },
            {
                "original": "tomorrow",
                "scrambled": "otormrwo",
                "index": 7
            },
            {
                "original": "doubts",
                "scrambled": "uostbd",
                "index": 10
            }
        ],
        "date": "2025-08-16"
    },
    {
        "text": "Your life does not get better by chance, it gets better by change.",
        "author": "Jim Rohn",
        "scrambledAuthor": "imJ hoRn",
        "scrambledWords": [
            {
                "original": "life",
                "scrambled": "eifl",
                "index": 1
            },
            {
                "original": "better",
                "scrambled": "etterb",
                "index": 5
            },
            {
                "original": "chance",
                "scrambled": "nhceca",
                "index": 7
            },
            {
                "original": "change",
                "scrambled": "ncahge",
                "index": 12
            }
        ],
        "date": "2025-08-17"
    },
    {
        "text": "The only person you should try to be better than is the person you were yesterday.",
        "author": "Unknown",
        "scrambledAuthor": "nnUownk",
        "scrambledWords": [
            {
                "original": "person",
                "scrambled": "srenop",
                "index": 2
            },
            {
                "original": "try",
                "scrambled": "ryt",
                "index": 5
            },
            {
                "original": "better",
                "scrambled": "retbet",
                "index": 8
            },
            {
                "original": "yesterday",
                "scrambled": "sedatyeyr",
                "index": 15
            }
        ],
        "date": "2025-08-18"
    },
    {
        "text": "Success is walking from failure to failure with no loss of enthusiasm.",
        "author": "Winston Churchill",
        "scrambledAuthor": "ostninW Cuihrllch",
        "scrambledWords": [
            {
                "original": "success",
                "scrambled": "sescusc",
                "index": 0
            },
            {
                "original": "failure",
                "scrambled": "realiuf",
                "index": 4
            },
            {
                "original": "failure",
                "scrambled": "eluaifr",
                "index": 4
            },
            {
                "original": "enthusiasm",
                "scrambled": "aiuhmtssen",
                "index": 11
            }
        ],
        "date": "2025-08-19"
    },
    {
        "text": "The best way out is always through.",
        "author": "Robert Frost",
        "scrambledAuthor": "terobR Fotsr",
        "scrambledWords": [
            {
                "original": "best",
                "scrambled": "tseb",
                "index": 1
            },
            {
                "original": "way",
                "scrambled": "ayw",
                "index": 2
            },
            {
                "original": "always",
                "scrambled": "lasawy",
                "index": 5
            },
            {
                "original": "through",
                "scrambled": "ghorthu",
                "index": 6
            }
        ],
        "date": "2025-08-20"
    },
    {
        "text": "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        "author": "Zig Ziglar",
        "scrambledAuthor": "iZg gZaril",
        "scrambledWords": [
            {
                "original": "achieving",
                "scrambled": "igaehvinc",
                "index": 4
            },
            {
                "original": "goals",
                "scrambled": "lagos",
                "index": 6
            },
            {
                "original": "important",
                "scrambled": "tnmriaotp",
                "index": 10
            },
            {
                "original": "become",
                "scrambled": "moebec",
                "index": 14
            }
        ],
        "date": "2025-08-21"
    },
    {
        "text": "The only thing that stands between you and your dream is the will to try and the belief that it is actually possible.",
        "author": "Irving Babbitt",
        "scrambledAuthor": "ivgrnI bbaBitt",
        "scrambledWords": [
            {
                "original": "thing",
                "scrambled": "hgnti",
                "index": 2
            },
            {
                "original": "dream",
                "scrambled": "erdma",
                "index": 9
            },
            {
                "original": "will",
                "scrambled": "illw",
                "index": 12
            },
            {
                "original": "belief",
                "scrambled": "eibelf",
                "index": 17
            }
        ],
        "date": "2025-08-22"
    },
    {
        "text": "You must do the thing you think you cannot do.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "eoTorhed etsveoloR",
        "scrambledWords": [
            {
                "original": "must",
                "scrambled": "sutm",
                "index": 1
            },
            {
                "original": "thing",
                "scrambled": "igthn",
                "index": 4
            },
            {
                "original": "think",
                "scrambled": "ihknt",
                "index": 6
            },
            {
                "original": "cannot",
                "scrambled": "onatcn",
                "index": 8
            }
        ],
        "date": "2025-08-23"
    },
    {
        "text": "The only way to do great work is to love what you do.",
        "author": "Steve Jobs",
        "scrambledAuthor": "evSte sJob",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "yonl",
                "index": 1
            },
            {
                "original": "great",
                "scrambled": "rgate",
                "index": 5
            },
            {
                "original": "love",
                "scrambled": "velo",
                "index": 9
            },
            {
                "original": "what",
                "scrambled": "hwta",
                "index": 10
            }
        ],
        "date": "2025-08-24"
    },
    {
        "text": "If you want to lift yourself up, lift up someone else.",
        "author": "Booker T. Washington",
        "scrambledAuthor": "kooreB .T tahnnioWgs",
        "scrambledWords": [
            {
                "original": "want",
                "scrambled": "wnat",
                "index": 2
            },
            {
                "original": "lift",
                "scrambled": "tfil",
                "index": 4
            },
            {
                "original": "yourself",
                "scrambled": "lusyoerf",
                "index": 5
            },
            {
                "original": "someone",
                "scrambled": "onemseo",
                "index": 9
            }
        ],
        "date": "2025-08-25"
    },
    {
        "text": "The greatest glory is not in never failing, but in rising up every time we fail.",
        "author": "Ralph Waldo Emerson",
        "scrambledAuthor": "Rhpla adWol rnesomE",
        "scrambledWords": [
            {
                "original": "greatest",
                "scrambled": "gersaett",
                "index": 1
            },
            {
                "original": "glory",
                "scrambled": "glryo",
                "index": 2
            },
            {
                "original": "failing",
                "scrambled": "iinafgl",
                "index": 7
            },
            {
                "original": "rising",
                "scrambled": "sriign",
                "index": 10
            }
        ],
        "date": "2025-08-26"
    },
    {
        "text": "The only limit is the one you set yourself.",
        "author": "Unknown",
        "scrambledAuthor": "nUownkn",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "lyno",
                "index": 1
            },
            {
                "original": "limit",
                "scrambled": "timli",
                "index": 2
            },
            {
                "original": "set",
                "scrambled": "est",
                "index": 7
            },
            {
                "original": "yourself",
                "scrambled": "seloyurf",
                "index": 8
            }
        ],
        "date": "2025-08-27"
    },
    {
        "text": "You have within you, right now, everything you need to deal with whatever the world can throw at you.",
        "author": "Brian Tracy",
        "scrambledAuthor": "nriBa rTcya",
        "scrambledWords": [
            {
                "original": "within",
                "scrambled": "initwh",
                "index": 2
            },
            {
                "original": "right",
                "scrambled": "hgtir",
                "index": 4
            },
            {
                "original": "everything",
                "scrambled": "enrhviyegt",
                "index": 6
            },
            {
                "original": "deal",
                "scrambled": "elad",
                "index": 10
            }
        ],
        "date": "2025-08-28"
    },
    {
        "text": "The only way to discover the limits of the possible is to go beyond them into the impossible.",
        "author": "Arthur C. Clarke",
        "scrambledAuthor": "Arruth .C kaerCl",
        "scrambledWords": [
            {
                "original": "discover",
                "scrambled": "vcsrodie",
                "index": 4
            },
            {
                "original": "limits",
                "scrambled": "islitm",
                "index": 6
            },
            {
                "original": "possible",
                "scrambled": "sbeslpio",
                "index": 9
            },
            {
                "original": "impossible",
                "scrambled": "ibseliopsm",
                "index": 17
            }
        ],
        "date": "2025-08-29"
    },
    {
        "text": "What we achieve inwardly will change outer reality.",
        "author": "Plutarch",
        "scrambledAuthor": "thracPlu",
        "scrambledWords": [
            {
                "original": "what",
                "scrambled": "hawt",
                "index": 0
            },
            {
                "original": "achieve",
                "scrambled": "aceehvi",
                "index": 2
            },
            {
                "original": "inwardly",
                "scrambled": "dlrniyaw",
                "index": 3
            },
            {
                "original": "reality",
                "scrambled": "eiatrly",
                "index": 7
            }
        ],
        "date": "2025-08-30"
    },
    {
        "text": "The only thing we have to fear is fear itself.",
        "author": "Theodore Roosevelt",
        "scrambledAuthor": "ooeTerdh eRoslotev",
        "scrambledWords": [
            {
                "original": "only",
                "scrambled": "yonl",
                "index": 1
            },
            {
                "original": "thing",
                "scrambled": "hntig",
                "index": 2
            },
            {
                "original": "fear",
                "scrambled": "rfea",
                "index": 6
            },
            {
                "original": "itself",
                "scrambled": "tslfei",
                "index": 9
            }
        ],
        "date": "2025-08-31"
    }
];
