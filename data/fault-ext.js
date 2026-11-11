/* Fault-finding: manual-derived extensions (Victron "Wiring Unlimited"). Loaded after mod-12-faultfinding.js. */
(function(){
  const T = TRAINING;
  T.addLessons('fault', [
    { id:'q5', title:'Ripple and voltage drop under load: measure, interpret, fix', level:'Advanced', min:13, src:['wu'], body:[
      ['p', "Many 'inverter overload' and 'low battery' complaints on boats are really DC voltage-drop problems. A drop only appears when current is high, so test with the inverter at full load or the charger at full current, not at idle."],
      ['h', 'Measuring voltage drop'],
      ['steps', ["Load the inverter to maximum power (or run the charger at full current).", "Measure across each battery cable under load (for example the negative cable between inverter and battery pole).", "If the battery is far from the inverter or in another enclosure: measure at the inverter's DC terminals and at the battery poles, then compare; the difference is the drop.", "Compare to the 2.5% target (0.3 V at 12 V, 0.6 V at 24 V, 1.2 V at 48 V)."]],
      ['h', 'Ripple'],
      ['ul', ["With an inverter, AC load current makes the DC current fluctuate; with a voltage drop the DC voltage then ripples. The cause is the same drop that thin cables, poor joints or weak batteries create.", "Measure with a multimeter set to <b>AC</b> across the inverter's DC terminals under full load: the AC reading is the ripple. VE.Configure also tracks ripple.", "Effects: shorter life for inverter capacitors, other DC equipment and batteries (each ripple is a mini cycle), and reduced charge power."]],
      ['table', ['System', 'Pre-alarm (20 min), RMS', 'Full alarm (3 s), RMS', 'Charge regulation'], [['12 V', '1.50 V', '2.50 V', '1.4 V'], ['24 V', '2.25 V', '3.75 V', '2.1 V'], ['48 V', '3.00 V', '5.00 V', '2.8 V'], ['MultiPlus Compact', '1.50 V', '2.5 V', '0.8 V']]],
      ['p', "Alarm indication: pre-alarm = overload and low-battery LEDs both blink (unit turns off after 20 minutes); full alarm = both LEDs on and the unit powers down."],
      ['h', 'Fix list from the manual'],
      ['ul', ["Shorten battery cables and use thicker ones.", "Check fuses, shunts and isolation switches for connectivity and for correct specification.", "Check for loose or corroded terminals and bad lug crimps.", "Check for old, damaged or undersized batteries."]],
      ['qc', { q:"How do you measure ripple with a multimeter?", o:["AC volts across the inverter DC terminals under full load", "DC volts at the battery at idle", "Resistance across the cable", "AC volts at the output"], a:0, e:"The AC component of the DC voltage under full load is the ripple." }],
      ['qc', { q:"Both the overload and low-battery LEDs blink on a Victron inverter/charger. What does the Wiring Unlimited book say this indicates?", o:["Ripple pre-alarm", "Full ripple alarm", "Bulk charging", "Mains OK"], a:0, e:"Blinking = pre-alarm (off after 20 min); both steady on = full alarm." }]
    ]}
  ]);
})();
