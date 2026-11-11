/* Fundamentals: manual-derived extensions (Victron "Wiring Unlimited"). Loaded after mod-01-fundamentals.js. */
(function(){
  const T = TRAINING;
  T.extend('fund', 'f2', [
    ['h', 'Voltage drop worked example (Wiring Unlimited)'],
    ['steps', ["A 2400 W inverter on 12 V draws 200 A. Two 1.5 m cables of 16 mm2 each have about 1.6 mOhm resistance.", "Drop per cable = 200 A x 0.0016 = 0.32 V; with positive and negative together 0.64 V, so the inverter sees 11.36 V instead of 12 V (about 5% lost as heat).", "Because inverter power is constant, current rises (to about 210 A) as voltage falls.", "At 24 V the same load draws 100 A and the total drop is 0.32 V (1.3%); at 48 V it draws 50 A and drops 0.16 V (0.3%)."]],
    ['p', "Victron advise aiming for no more than <b>2.5%</b> voltage drop (0.3 V at 12 V, 0.6 V at 24 V, 1.2 V at 48 V). The preferred upper inverter sizes per system voltage are 12 V up to 3000 VA, 24 V up to 5000 VA, 48 V 5000 VA and up. Raising the system voltage is the first fix when cables would otherwise become very thick."],
    ['h', 'Maximum current for the 0.259 V drop (total cable length = positive + negative)'],
    ['table', ['Cable (mm2)', 'Up to 5 m', 'Up to 10 m', 'Up to 15 m', 'Up to 20 m'], [['10', '30 A', '15 A', '10 A', '8 A'], ['16', '48 A', '24 A', '16 A', '12 A'], ['25', '75 A', '38 A', '25 A', '19 A'], ['35', '105 A', '53 A', '35 A', '26 A'], ['50', '150 A', '75 A', '50 A', '38 A'], ['70', '210 A', '105 A', '70 A', '53 A'], ['95', '285 A', '143 A', '95 A', '71 A'], ['120', '360 A', '180 A', '120 A', '90 A']]],
    ['p', "Rule of thumb for cables up to 5 m (from the book's example): cross-section in mm2 is about current / 3 (200 A needs about 66 mm2). Always use the figure in the product manual first; contact losses are not included in the table."],
    ['h', 'What else adds resistance'],
    ['ul', ["Each cable connection about 0.06 mOhm; a 500 A shunt about 0.10 mOhm; a 150 A fuse about 0.35 mOhm; a 2 m 35 mm2 cable about 1.08 mOhm.", "Heat from a bad joint follows P = I2R: in low-voltage DC even a little resistance can produce dangerous heat.", "Measure the real drop after installation: load the inverter to maximum and measure across each battery cable under load."]],
    ['qc', { q:"Wiring Unlimited suggests aiming for a total cable voltage drop no larger than:", o:["2.5%", "10%", "0.1%", "20%"], a:0, e:"2.5% is the guideline in the book (0.3 V at 12 V)." }],
    ['qc', { q:"A 2400 W load on a 12 V system draws 200 A. What current at 48 V?", o:["50 A", "100 A", "200 A", "25 A"], a:0, e:"2400 / 48 = 50 A, so the cable drop is a fraction of the 12 V case." }]
  ], ['wu', 'cables']);

  T.addLessons('fund', [
    { id:'f6', title:'Connections, torque, crimps and fuse selection', level:'Intermediate', min:14, src:['wu', 'cables'], body:[
      ['h', 'Connection quality'],
      ['ul', ["A tight connection with a large contact area has lower resistance than a loose or small one; fit washers and spring washers in the correct order on bolted joints.", "Use a torque wrench or torque screwdriver and the torque in the product manual: terminal fasteners are often tin-plated <b>brass</b>, not stainless, and over-tightening damages them.", "Use a correctly sized terminal and a ratcheting crimp tool, then tug-test the crimp; do not push insulation too far into the barrel."]],
      ['p', "Maximum torque for brass (H62) fasteners if the manual gives no figure:"],
      ['table', ['Thread', 'N.m', 'lbf.ft'], [['M4', '2.9', '2.1'], ['M5', '5', '3.7'], ['M6', '6', '4.4'], ['M8', '12', '8.9'], ['M10', '24', '17'], ['M12', '40', '30']]],
      ['h', 'Cables'],
      ['ul', ["Use fine-stranded flexible cable; avoid coarse strands, non-flexible cable and AC cable. In marine or damp locations use <b>tinned-copper marine cable</b>.", "If one thick cable is impractical, use two: their combined area must equal the required area (2 x 35 mm2 = 70 mm2). Local rules may require each cable to be fused separately or each to carry the full load.", "Insulated crimp colours: red 0.5-1.5 mm2, blue 1.5-2.5 mm2, yellow 2.5-6 mm2.", "Victron do not recommend bullet connectors or butt splices for these systems: they often make poor contact."]],
      ['h', 'Fuses and breakers'],
      ['ul', ["Every consumer connected to a battery needs its own fuse in the <b>positive</b> cable, after a main battery fuse.", "Selection criteria: current rating (the lower of consumer and cable rating), voltage rating (DC-rated and at least the maximum system voltage; many DC fuses suit 12/24 V but not 48 V), interrupt rating, speed and type.", "Slow-blow is common in DC marine circuits with motor or inverter inrush; fast fuses are used on AC, though compressors and motors need slower ones.", "Lithium batteries can deliver far higher short-circuit current than lead-acid, so the fuse's <b>interrupt rating</b> must exceed the available fault current or it may fail catastrophically. Circuit breakers used on DC may be polarity-sensitive."]],
      ['table', ['Fuse type', 'Range', 'DC rating'], [['Blade (automotive)', 'up to 120 A', '32 V DC, slow'], ['Midi', '23-200 A', '32 V DC, slow'], ['MRBF (marine)', '30-300 A', '58 V DC'], ['Mega', '40-500 A', '32 V DC, slow'], ['ANL', '35-750 A', '32 V DC, fast'], ['CNN', '10-800 A', '48 V DC, 125 V AC, fast'], ['NH', 'up to 1000 A', '440-550 V DC']]],
      ['qc', { q:"Why is the interrupt rating of a DC fuse particularly important with lithium batteries?", o:["They can deliver a much higher short-circuit current", "They run at lower voltage", "They need slower fuses", "They never fault"], a:0, e:"A fuse with too low an interrupt rating can rupture or explode on a lithium fault." }],
      ['qc', { q:"Which crimp terminal colour suits 1.5-2.5 mm2 wire?", o:["Blue", "Red", "Yellow", "Green"], a:0, e:"Red 0.5-1.5, blue 1.5-2.5, yellow 2.5-6 mm2." }]
    ]}
  ]);
})();
