/* Hotel systems: manual-derived extensions (Maxwell RC/HRC/Freedom windlasses, Dometic Cruisair). Loaded after mod-11-hotel.js. */
(function(){
  const T = TRAINING;
  T.extend('hotel', 'h3', [
    ['h', 'Cruisair SMX II control and DX installation notes'],
    ['ul', ["SMX keypad connects to the power/logic (P/L) board with a CX cable (SMXir keypads use a flat <b>CXP</b> cable with RJ-12 plugs); standard phone cable does not work. Cables run from 0.6 m to 24 m.", "The interconnect and the TSEP temperature-sensor cables carry low-voltage DC signals: do not route them beside AC power cables, high-voltage wiring or antenna wires, and keep them as short as possible.", "The TSEP sensor measures cabin air temperature, ideally in the return-air path; if it must be elsewhere it should be wall-mounted away from direct sunlight and heat.", "A <b>high-pressure switch</b> must be connected to the P/L board (terminals HIGH PRESS; wire 22 gauge or larger). When retrofitting, the old switch's wires are butt-connected (bypassed) so the SMX monitors the switch and shuts the unit down on a high-pressure fault. A low-pressure switch is recommended (LOW PRESS terminals).", "Pump relay: the PR3X runs up to 3 A/C units and the PR8X up to 8; the seawater pump starts with the first unit and stays on until the last one shuts down.", "Running 60 Hz equipment on 50 Hz: the DX manual says voltage should be reduced 17% to prevent overheating the motor."]]
  ], ['dmc']);

  T.addLessons('hotel', [
    { id:'h5', title:'Maxwell windlasses: protection, cables and wiring (RC, HRC, Freedom)', level:'Intermediate', min:13, src:['mxrc', 'mxhrc', 'mxfr'], body:[
      ['h', 'What the system consists of'],
      ['ul', ["Windlass with 12 V or 24 V motor, a reversing <b>solenoid pack</b>, a <b>circuit breaker/isolator</b> panel, a remote up/down control panel and optional footswitches.", "Solenoid pack: mount in a dry area close to the windlass, not in the chain locker.", "Breaker/isolator: gives limited protection for the motor and full protection for the supply cables, and isolates the system from the battery. Mount it no further than <b>1.8 m (6 ft)</b> from the battery, in an accessible and dry location.", "Remote panel: mount where the operator can see the windlass, sealed so terminals project into a dry area.", "Footswitches: at least <b>500 mm</b> from the windlass; the below-deck part must be dry and the breather holes clear; arrows should show the direction of operation."]],
      ['h', 'Circuit protection (RC series manual)'],
      ['p', "The RC manual says the winch circuit needs protection (not supplied) by a slow-blow fuse or a circuit breaker; if a fuse is used, fit a battery switch inline to isolate the circuit. Ratings:"],
      ['table', ['Model', '12 V', '24 V'], [['RC6', '50 A', '40 A'], ['RC8-6', '70 A', '40 A'], ['RC8-8', '135 A', '80 A'], ['RC10', '135 A', '80 A']]],
      ['h', 'Cable sizing'],
      ['ul', ["Maxwell's recommended conductor sizes allow for a <b>maximum 10% voltage drop</b> at working load; smaller cables reduce performance.", "Cable length means the <b>total round trip</b>: battery to winch and back to battery.", "Where a cable passes through the engine room, the cross-section needs to allow for the higher temperature (see the manual's note)."]],
      ['p', "Example, HRC manual (total length battery to winch and back):"],
      ['table', ['Total length', 'HRC 6, 12 V', 'HRC 8, 12 V', 'HRC 8, 24 V'], [['up to 10 m', '6.5 mm2 (9 AWG)', '16 mm2 (5 AWG)', '6.5 mm2 (9 AWG)'], ['10-17 m', '10.5 mm2 (7 AWG)', '26 mm2 (3 AWG)', '6.5 mm2 (9 AWG)'], ['17-27 m', '16 mm2 (5 AWG)', '42 mm2 (1 AWG)', '10.5 mm2 (7 AWG)']]],
      ['h', 'Corrosion and earthing'],
      ['ul', ["The HRC motor is the <b>isolated-earth</b> type, so it is not separately earthed.", "The anchor and chain must be insulated from the hull, including rubber-lining the chain locker and insulating the fixing point of the rode end."]],
      ['h', 'Operating rules the manuals repeat'],
      ['ul', ["Turn the breaker/isolator off when the windlass is not in use.", "Do not switch immediately from one direction to the other: wait for it to stop before applying power the other way.", "Seal terminals against moisture after the system has been tested."]],
      ['qc', { q:"Per the Maxwell manuals, how far from the battery should the windlass breaker/isolator be mounted at most?", o:["1.8 m (6 ft)", "5 m", "10 cm", "Anywhere in the chain locker"], a:0, e:"Maximum 1.8 m, in an accessible dry location." }],
      ['qc', { q:"What does 'cable length' mean in Maxwell's cable table?", o:["Battery to winch and back to battery", "Battery to winch only", "Winch to remote panel", "Footswitch cable"], a:0, e:"The table is based on the total round trip." }]
    ]},
    { id:'h6', title:'Windlass fault-finding (Maxwell Freedom troubleshooting guide)', level:'Intermediate', min:9, src:['mxfr', 'mxrc'], body:[
      ['table', ['Symptom', 'Checks'], [
        ['Windlass does not operate when activated', 'Breaker/isolator is On; connections at remote up/down panel and footswitches, breaker/isolator panel, reversing solenoid and windlass motor; battery condition by running other equipment; solenoid should click when activated'],
        ['Motor runs but chainwheel does not turn', 'Clutch nut too loose (slipping); chainwheel jammed with rope or chain (reverse to free); shaft-to-gearbox key fitted; gearbox noisy/rough means possible damage; check the motor drive pin by unbolting the motor from the gearbox'],
        ['Chainwheel turns but rope does not retrieve or pay out', 'Rope size/type matches the windlass model; rope or anchor fouled; twists or knots jammed in chain pipe; worn rope section (cut out and splice); pressure arm worn or missing; rope stiff from salt and sun (wash in fresh water)']
      ]],
      ['steps', ["Confirm the isolator is on and the battery is healthy under other loads.", "Operate from the remote panel, then the footswitch, to isolate a control fault.", "Listen for the solenoid click: click but no motor points downstream (cables, motor); no click points to controls, supply to the solenoid or the isolator.", "Check voltage at the motor while operating: a large drop points to cable size, connections or battery (the manuals allow a 10% drop at working load).", "Only then look at the mechanical side: clutch, key, gearbox."]],
      ['tip', "Rode size matters (the manual lists rope that slips when it is the wrong size or type): the RC range is specified as RC6 with 12-14 mm rope and 6-7 mm short-link chain, RC8 with 12-16 mm rope and 6-8 mm chain, and RC10 with 14-16 mm rope and 8-10 mm chain."],
      ['qc', { q:"A Maxwell windlass motor runs but the chainwheel does not turn. Which check is listed first by the manual?", o:["Clutch nut too loose or chainwheel jammed", "Replace the battery", "Replace the remote panel", "Re-terminate the solenoid"], a:0, e:"The guide lists the clutch nut and chainwheel jam among the first checks." }]
    ]}
  ]);
})();
