# Marine Electrical Training Academy

An offline, CDX-style interactive training app for marine auto electricians (Riviera, Maritimo and general vessels).
It is a **static web app**: open `index.html` in any modern browser (Safari, Chrome, Edge, Firefox on Mac or iPad). No server, no internet, no build step.

* 29 modules (19 original plus 10 product-based modules: CZone, Garmin, Volvo Penta IPS/EVC, shaft-drive joysticks (Twin Disc), Seakeeper, lithium banks, remote monitoring, connectivity/solar/lighting, outboard systems, network map) · 198 lessons (Foundation / Intermediate / Advanced) · 856 exam questions. Product modules also extend Trim & Stabilisation (Humphree fins), Engines & Thrusters (thruster types, S-Link, lithium supply) and Shore Power (Glendinning Cablemaster).
* Lessons are built from ~90 official manuals (see `sources/INDEX.md`): spec tables, wiring and fuse requirements, setup procedures, LED/error-code tables and troubleshooting. Every lesson ends with a **Source** box linking the manuals it used
* 25 interactive types / 55+ placed interactives: calculators, animated system diagrams, hotspot diagrams with "Quiz me" mode, matching activities, fault-finding simulators, trim-tab and NMEA 2000 testers, **LED / error-code lookups with quizzes (13 families: Victron MPPT, Orion, VE.Direct, Lynx, charger LEDs, Mastervolt Mass Combi Ultra and ChargeMaster Plus, Enerdrive DC2DC+ / inverter-charger / ePRO Combi, Raymarine Evolution, CZone COI)**, **DIP-switch simulators (Quattro, ePRO Combi, Mass Combi Ultra, ChargeMaster Plus)**, a Victron error-code trainer and a NMEA 2000 power-drop checker
* Module exams (15 randomised questions, 80% pass), final certification exam (50 questions across every module), printable certificates
* Progress, exam history, name and theme are saved in the browser's localStorage (Settings has export / import / reset and an "Unlock all levels" override)

> Content is general training information. Always follow manufacturer manuals, AS/NZS 3004, ISO 10133/13297, ABYC guidance and your licence conditions.

## Folder layout

```
index.html              app shell – lists every script (add new data files here)
css/style.css           theme (navy/teal, light + dark)
js/ui.js                DOM helper h(), shuffle, localStorage state
js/app.js               router, dashboard, lessons, exams, certificates, search, settings
js/interactives.js      calculators + animated diagrams (ohm, vdrop, bank, sp, flow, galv)
js/interactives2.js     hotspot diagrams, matching, fault simulator, trim, n2k tester, charge profile
data/registry.js        TRAINING object: pass mark, exam size, addModule(), addQuestions()
data/paths.js           learning paths (groups of modules)
data/mod-NN-*.js        one file per module (lessons)
data/*-ext.js           manual-derived extensions: extend existing lessons and add new ones (loaded after the parent module)
data/vic-*.js           the Victron learning path (inverters, GX, batteries, PV, chargers, wiring, reference)
data/codes.js           LED / error-code tables shared by lessons, lookups, trainers and quizzes
data/sources.js         source catalogue (key -> title, URL, local file)
data/questions-NN.js    one file per module (question bank)
data/questions-victron.js, questions-extra.js   generated manual-based question banks
sources/                INDEX.md + text/ (extracted manual text, for searching). The PDFs are shipped separately (MarineElectricalTraining-sources.zip)
data/diagrams.js        hotspot diagram definitions
data/activities.js      matching sets and fault-finding scenarios
screenshots/            QA screenshots
```

## Adding a new module

1. Create `data/mod-13-mything.js`:

```js
TRAINING.addModule({
  id: 'mything',                 // unique, no spaces
  title: 'My New Module',
  icon: '🛠️',
  summary: 'One or two sentences shown on the dashboard.',
  lessons: [
    { id: 'a1', title: 'Lesson title', level: 'Foundation',   // Foundation | Intermediate | Advanced
      min: 10, interactive: false,
      body: [
        ['p', 'A paragraph. <b>HTML</b> such as <b>, <i>, <code> is allowed.'],
        ['h', 'A sub-heading'],
        ['ul', ['bullet one', 'bullet two']],
        ['ol', ['numbered one', 'numbered two']],
        ['steps', ['Step one', 'Step two']],
        ['tip', 'Field tip text'],
        ['safety', 'Safety warning text'],
        ['note', 'Key point text'],
        ['spec', 'Table title', [['Item', 'Detail'], ['Item 2', 'Detail 2']]],
        ['table', ['Col A', 'Col B'], [['r1a', 'r1b'], ['r2a', 'r2b']]],
        ['int', 'ohm'],                   // embed an interactive (see below)
        ['qc', { q: 'Quick check question?', o: ['A', 'B', 'C', 'D'], a: 1, e: 'Why B is correct.' }]
      ] }
  ]
});
```

2. Add the module id to a path in `data/paths.js` (e.g. add `'mything'` to a `modules` array, or create a new `TRAINING.addPath({...})`).
3. Create `data/questions-13.js` (see next section).
4. Add both `<script src="data/mod-13-mything.js"></script>` and `<script src="data/questions-13.js"></script>` to `index.html`, before `js/ui.js`.

Lesson levels gate progress inside a module: Intermediate lessons unlock when all Foundation lessons are complete, Advanced when all Intermediate lessons are complete (override: Settings → Unlock all levels).

## Adding questions

```js
TRAINING.addQuestions('mything', [
  // [question, [options...], indexOfCorrectOption (0-based), explanation]
  ['What is Ohm\'s law?', ['V = I × R', 'P = V ÷ I', 'I = V × R', 'R = V × I'], 0, 'Voltage equals current times resistance.'],
]);
```

* Any number of questions per module (aim for 15+). Module exams draw `TRAINING.moduleExamSize` (15) at random; the final exam draws `TRAINING.finalPerModule` (2) from every module plus 2 extras (40 questions with 19 modules). Options and order are shuffled at run time, so put the correct answer anywhere.
* Pass mark and sizes live in `data/registry.js`.
* Quote text containing apostrophes with double quotes, or escape them (`\'`).

## Interactives

Embed with `['int', '<key>']` inside any lesson body:

| Key | What it is |
| --- | --- |
| `ohm` | Ohm's law & power calculator (type any two values) |
| `vdrop` | Voltage-drop & cable size calculator |
| `bank` | Battery bank sizing tool (editable load table) |
| `sp` | Series/parallel battery wiring visualiser |
| `flow` | Animated power-flow diagram (shore, alternator, solar, loads, inverter) |
| `galv` | Galvanic corrosion lab |
| `charge` | Bulk/absorption/float charge profile explorer |
| `trim` | Trim tab simulator |
| `n2k` | NMEA 2000 / CAN termination tester |
| `hot:<id>` | Clickable hotspot diagram with quiz mode – ids in `data/diagrams.js` (`victron`, `enerdrive`, `mastervolt`, `steer`, `thruster`, `n2k`, `trimtab`, `evc`) |
| `match:<id>` | Click-to-match activity – ids in `data/activities.js` (`proto`, `stab`, `protect`, `hotel`, `faults`) |
| `sim:<id>` | Fault-finding simulator – ids in `data/activities.js` (`thruster`, `shore`, `n2k`, `drain`) |

### New hotspot diagram

Add to `data/diagrams.js`: `TRAINING.diagrams.mine = { title, w, h, nodes:[{id,x,y,w,h,l,s,d,tip}], links:[[fromId,toId,'dc'|'ac'|'data'|'hyd'|'neg', 'label?', 'hv'|'vh'?]] }`. Set `bus:true` on a wide node so links drop straight onto it. Then use `['int','hot:mine']`.

### New matching set / simulator scenario

In `data/activities.js`:

```js
TRAINING.matches.mine = { title:'…', intro:'…', pairs:[['Left item','Matching right item'], …] };
TRAINING.scenarios.mine = { title:'…', par:'4–5', intro:'Customer complaint…',
  tests:[{ g:'Group name', l:'Test label', r:'Reading shown' }, …],
  diagnoses:['Option 0','Option 1', …], answer:1, explain:'Why this is the cause (HTML ok).' };
```

### New custom interactive

In a JS file loaded after `js/ui.js`:

```js
TRAINING.interactives.myTool = { title: () => 'My Tool', build(body, arg){ body.append(UI.h('p', null, 'Hello')); } };
```

`UI.h(tag, attrs, ...children)` builds HTML or SVG elements (`on*` attributes become event listeners; `html` sets innerHTML).

## Resetting / backing up progress

Settings → Export progress (JSON file) / Import progress / Reset all progress. Progress is stored per browser under the key `marineTraining.v1`. Note that opening the app from a different folder or browser creates separate progress.


## Extending lessons with manual facts

Existing lesson ids are never changed (saved progress uses them), so new detail is added from a `*-ext.js` file loaded after the module:

```js
TRAINING.extend('hotel', 'h3', [ ['h','Heading'], ['table', [...], [...]] ], ['dmc']);   // append blocks + source keys to lesson h3
TRAINING.addLessons('hotel', [ { id:'h5', title:'...', level:'Intermediate', min:12, src:['mxrc'], body:[ ... ] } ]);
```

* `src:[keys]` renders a **Source** box using `data/sources.js` (key -> title, URL, local PDF name). `node /workspace/qa/chk_src.js`-style checks should show no missing keys.
* `['int','codes:<family>']` embeds a code lookup + quiz for a family defined in `data/codes.js` (`T.codes[family] = {title, rows:[[code, meaning, action]]}`); `['int','dip:<set>']` embeds a DIP-switch simulator defined in `js/interactives4.js`.
* Question banks can be generated with a seeded shuffle (`qa/qgen/gen.py`) so the correct option is not always first.

## Source manuals

`sources/INDEX.md` lists every manual used with its URL and local file. Not obtained: Volvo Penta IPS/EVC, Maretron, SeaStar/Teleflex, ZF/Twin Disc, Kohler, Lewmar and Muir manuals, and the Skylla-IP65 manual. The Enerdrive ePOWER 1000-2000 PDF is a scan with no extractable text.

## Product-based modules (added Nov 2026)

These are organised by **product and system, not by boat builder**. Each module runs basic to advanced and ends with an exam. A short **Where you'll see it** note in a lesson says which builders fit the product (from public builder pages and press material, marked for verification). Builders covered by the research (`research/other-builders.md`): Riviera, Maritimo, Princess, Sunseeker, Azimut, Ferretti (not identified), Boston Whaler, Contender, Pursuit, Everglades, Grady-White, Sea Ray.

New block types in a lesson body: `['where', 'text']` (a "Where you'll see it" callout) and `['verify', 'text']` (flags dealer-only, revision-dependent, conflicting or secondary-source information; never skipped).

New interactives (`js/interactives5.js`): `czdip` (CZone DIP address and channel-LED simulator), `skcalc` (Seakeeper model finder using `TRAINING.skmodels`), `netmap` (network map explorer with bus filters, fault injection and a "which bus is it?" quiz; data in `data/netmap-data.js`). New data-driven interactives: `hot:garminhelm`, `hot:ips`, `hot:hmex`; `match:czone|stabsys|siren|lithspec|outbcomp|conn`; ten fault-finding scenarios in `data/activities-new.js` (`czondead`, `garminnet`, `ipsjoy`, `ec300fly`, `skride`, `bmsdrop`, `sirnoswitch`, `hmexjoy`, `slinkbus`, `skpower`); code lookups `codes:slink`, `codes:ec300`, `codes:skgyro`, `codes:skride`. Questions for the product modules use `TRAINING.addQ(moduleId, [[question, correct, wrong1, wrong2, wrong3, explanation], ...])` (`data/qhelper.js`).

Accuracy rules used: nothing is invented; where manuals disagree the lesson says so; items that could not be sourced (Mercury SmartCraft and Joystick Piloting manuals, the Volvo EVC-C IPS install manual, separate CZone module manuals, the Fusion Pulse owner manual, Simrad/Naviop and Böning/Empirbus configuration documents) are taught as principles and flagged. The US-spec-only and secondary-source items are marked.
