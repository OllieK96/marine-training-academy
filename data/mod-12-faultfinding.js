TRAINING.addModule({ id:'fault', title:'Fault-Finding Methodology & Tools', icon:'🔍',
  summary:'A repeatable diagnostic method, multimeter and clamp meter use, voltage-drop and insulation testing, reading schematics and practical simulator scenarios.',
  lessons:[
  { id:'q1', title:'A diagnostic method that works', level:'Foundation', min:10, body:[
    ['p', "Good fault-finders are not faster at guessing – they are better at <b>narrowing the problem down</b> with as few tests as possible. Use the same sequence every time."],
    ['steps', ["<b>Listen:</b> ask the owner when it happens, how often, what changed recently (work, weather, new equipment).", "<b>Verify:</b> see the fault yourself if you can. Note exact symptoms, alarms and codes.", "<b>Look:</b> inspect fuses, breakers, terminals, corrosion, heat damage, chafe, water in connectors.", "<b>Think:</b> list the possible causes; choose the test that splits them in half.", "<b>Test:</b> measure; do not assume. Record the reading and the test conditions.", "<b>Fix and prove:</b> repair, then confirm the fault is gone under the same conditions that caused it.", "<b>Document:</b> note what you found and changed so the next person knows."]],
    ['h', 'Divide and conquer'],
    ['p', "For a circuit that does not work, start at the middle: is there supply at the half-way point? If yes, the fault is downstream; if not, upstream. Repeat. Most circuits can be solved in four or five measurements."],
    ['note', "The three things every electrical device needs are <b>power, ground and a signal or control</b>. If it has all three and still does not work, the device is faulty."],
    ['tip', "Take a photo of the wiring before disconnecting anything and label wires with tape. You will thank yourself later."],
    ['qc', { q:"What is the best first step in fault-finding?", o:["Ask when and how the fault happens, and verify it", "Replace the most likely part", "Disconnect the battery", "Clear all codes"], a:0, e:"Understanding the symptoms avoids random parts-swapping." }]
  ]},
  { id:'q2', title:'Meters and testers: multimeter, clamp meter, insulation tester', level:'Foundation', min:13, body:[
    ['h', 'Digital multimeter'],
    ['ul', ["Use a quality meter with a suitable <b>CAT rating</b> for AC work and true-RMS for non-sinusoidal waveforms (inverters, dimmers).", "<b>Voltage (DC/AC):</b> in parallel with the circuit. <b>Current:</b> in series – only through the correct fused input, never across a voltage source. <b>Resistance/continuity:</b> circuit must be de-energised.", "Check the leads and test the meter on a known source before and after a safety-critical measurement."]],
    ['h', 'Clamp meter'],
    ['ul', ["DC clamp meters use Hall-effect sensors; AC-only clamps will not measure DC.", "Zero the meter away from other magnetic fields before measuring DC.", "Great for parasitic drain, alternator output and inverter loads without breaking circuits."]],
    ['h', 'Insulation resistance tester'],
    ['ul', ["Applies a high test voltage (often 500 V DC) – isolate and disconnect electronics first.", "Typical minimum acceptable AC installation insulation resistance is above 1 MΩ; values in the tens or hundreds of MΩ are common for healthy wiring.", "Damp or damaged wiring shows low readings; investigate by disconnecting circuits section by section."]],
    ['h', 'Other useful tools'],
    ['table', ['Tool', 'Use'], [['RCD tester', 'Checks trip current and time'], ['Thermal camera / IR thermometer', 'Finds hot connections under load'], ['Reference electrode (Ag/AgCl)', 'Checks hull potentials and stray current'], ['Low-ohm tester', 'Bonding and earth continuity'], ['Diagnostic software', 'Reads codes from engines, inverters and networks']]],
    ['safety', "Never use a standard multimeter on a circuit above its voltage rating. Always check that you are on the right range and that leads are in the right sockets before measuring."],
    ['qc', { q:"How should an ammeter in a multimeter be connected?", o:["In series with the load", "In parallel with the load", "Across the battery", "To earth"], a:0, e:"Current is measured by passing it through the meter." }]
  ]},
  { id:'q3', title:'Voltage-drop testing, parasitic drain and schematic reading', level:'Intermediate', min:14, body:[
    ['h', 'Voltage-drop testing'],
    ['p', "A voltage-drop test finds high-resistance connections while the circuit is working. Run the load, place the meter probes on the two ends of the part under test and read the voltage across it. A healthy cable or connection reads very little."],
    ['table', ['Part under test', 'Typical acceptable reading under load'], [['A crimp, lug or terminal', 'A few tens of millivolts at most'], ['A switch, relay or contactor', 'A few tenths of a volt at most'], ['A whole circuit run', 'Within the voltage-drop limit for that circuit (e.g. 3%)']]],
    ['h', 'Parasitic drain'],
    ['steps', ["Switch off everything and wait for modules to sleep.", "Insert a clamp meter (DC, zeroed) on the battery negative to see the total standby current.", "Switch off breakers or pull fuses one at a time and watch for a step change.", "Investigate the circuit that reduces the reading; check relays stuck on, amplifiers and displays in standby."]],
    ['h', 'Reading schematics'],
    ['ul', ["Find the <b>power source</b> (battery, fuse) first, then follow the path to the load and back to the negative.", "Learn the symbols for fuses, breakers, relays, switches, motors and ground.", "Note wire colours and numbers; note connectors and splice points.", "Compare the drawing with the actual wiring – boats often have undocumented modifications."]],
    ['spec', 'Common DC wire colours', [['Positive', 'Red'], ['Negative', 'Black (some systems use yellow for engine negative)'], ['Others', 'Per the builder or manufacturer; always check the wiring diagram']]],
    ['int', 'sim:drain'],
    ['tip', "Voltage-drop testing a negative path is often overlooked. A poor negative connection looks like a poor positive one."],
    ['qc', { q:"What is the best way to find an intermittent high-resistance connection?", o:["Measure voltage drop across it while the load runs", "Measure resistance with power on", "Disconnect all fuses", "Replace the battery"], a:0, e:"A live voltage-drop test reveals hidden resistance." }]
  ]},
  { id:'q4', title:'Fault-finding simulator practice', level:'Advanced', min:15, interactive:true, body:[
    ['p', "Time to practise. Each scenario below gives you a customer complaint and a set of tests you can perform. Choose tests that narrow down the cause, then submit a diagnosis. Aim to find the answer in as few tests as the par value suggests."],
    ['int', 'sim:shore'],
    ['int', 'sim:n2k'],
    ['int', 'match:faults'],
    ['h', 'After the simulator'],
    ['ul', ["Which test gave the most information? Usually a voltage-drop or a split-the-circuit test.", "Which tests were unnecessary? Remove them next time.", "What would you have done if the readings had been different?"]],
    ['tip', "Write down your measurement results in a table as you go – patterns appear that are easy to miss when you rely on memory."],
    ['qc', { q:"Voltage is present at the isolation transformer input but absent at its output. What is a probable cause?", o:["Thermal overload or output breaker tripped", "Marina supply failure", "Reverse polarity", "Inverter fault"], a:0, e:"The transformer secondary is dead while the primary is live." }]
  ]}
]});
