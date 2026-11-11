/* Trim & stabilisation: Humphree electric fins (24 V), integration and choosing a system. Extends module 'trim' (lessons x1-x8 unchanged). Sources: Humphree fin brochure, fin installation manual, control system installation manual, HCS-5 manual. */
TRAINING.addLessons('trim', [
  { id:'x9', title:'Humphree 24 V electric fins: servo, power and consumption', level:'Intermediate', min:15, src:['humfinb','humfini','humctl','humhcs5'], body:[
    ['p', "Humphree's electric fin stabilisers use <b>24 V DC brushless servo actuators</b> (SU553 and SU563 servo units) that rotate the fin directly. There is no hydraulic power pack and no AC power box: the system runs from the battery bank and the engine alternators charge it underway. The servo is a conductively cooled unit and the fin is a flange-mount design that can be replaced underwater and that breaks away safely in a fin strike (Humphree brochure)."],
    ['where', "24 V Humphree fins are described on Riviera yachts and are a common choice on Maritimo (alongside Seakeeper and Humphree interceptors), and Humphree interceptors are part of the Princess Easy Boating package. The same electrical principles apply to any 24 V electric fin or high-current servo system."],
    ['table', ['Item', 'From the Humphree documents'], [
      ['Fin sizes', '0.6, 0.8, 1.0, 1.3 and 1.5 m2 (twin or quad installation); suits yachts 50-164 ft'],
      ['Fin mass / max speed', '0.6 m2 18 kg 40 kn; 0.8 m2 20 kg 40 kn; 1.0 m2 25 kg 40 kn; 1.3 m2 52 kg 36 kn; 1.5 m2 55 kg 33 kn'],
      ['Servo power supply', '24-32 V DC; brushless servo; fin speed up to 90 degrees per second; rotation up to 360 degrees; manual tiller for a power loss'],
      ['Peak power', 'Up to 5 kW (SU553) and 8 kW (SU563)'],
      ['Average consumption at zero speed (max / typical in moderate waves)', '0.6 m2: 43 A / about 25 A RMS at 24 V; 0.8 m2: 58 / 35 A; 1.0 m2: 71 / 42 A; 1.3 m2: 90 / 65 A; 1.5 m2: 105 / 80 A (each fin)'],
      ['Supply to each RCU', 'Each RideControl Unit (RCU) is fed through its own slow-acting fuse (the control manual gives 10 A for one or two servos and 16 A for three or four)']
    ]],
    ['p', "<b>Zero-speed stabilisation</b> at anchor is a feature: the fins rotate to damp roll with no engine running ('zero emission mode' on batteries). This also makes the <b>battery bank, charger and DC cable</b> design part of stabiliser design. A four-fin yacht at anchor in a swell can draw several hundred amps. The generator usually must run, or the bank must be sized for it."],
    ['safety', "Fins rotate when ZERO SPEED STABILIZATION is enabled. Swimmers must stay clear, and the fins must be disabled when people are in the water or the boat is hauled out (Humphree installation manual)."],
    ['tip', "When fins seem weak at anchor, look at battery voltage while they work. A 24 V bank sagging below the servo's working range or a long voltage-dropped cable looks like a servo or software fault."],
    ['verify', "Consumption figures are the maker's brochure averages for the SU553 table. Use the current manual for the exact servo and fin."],
    ['qc', { q:"What supply voltage range do Humphree electric fin servos use?", o:["24-32 V DC", "12 V DC only", "230 V AC", "400 V three-phase"], a:0, e:"The brochure specifies a 24-32 V DC brushless servo." }]
  ]},
  { id:'x10', title:'Humphree control system: RCU, control panels and the bus', level:'Intermediate', min:15, src:['humctl','humhcs5','humfini'], body:[
    ['p', "The Humphree system is a small network. The <b>RCU (RideControl Unit)</b> is the control computer; <b>control panels</b> (such as the CP514 and the touch panel TCP) give the operator interface; servos, sensors and external signals connect to the RCU ports."],
    ['ul', ["<b>RCU-1</b> goes on the vessel centreline, between the centre of gravity and the transom, aligned with the vessel; additional RCUs can be placed where convenient.", "<b>Control bus and termination plugs</b>: the control bus must have termination plugs installed. If they are missing the control panel may show an alarm for communication error, and short-circuit or bus-signal errors can occur. When a secondary panel is added to a CP514, move the termination plug as the manual shows.", "<b>Power</b>: each RCU gets a separate slow-acting fuse, with 12/24 V supply on the RCU power input; keep cables routed above areas where water can collect.", "<b>External signals</b> can come over NMEA 2000 or the EXTBUS or analogue interface: rudder angle, monitoring systems, engine or speed data. The same type of signal cannot be connected to both a control unit and a control panel.", "<b>Integration</b>: the system can be integrated with Garmin, Simrad and Raymarine MFDs for display and control.", "<b>Fins and interceptors together</b>: one system can control roll (fins) and pitch/trim (interceptors); a coordinated turn feature coordinates fins and rudder movement; at anchor the fins can rotate 180 degrees at the bow to resist anchor swinging (anchor mode)."]],
    ['table', ['Symptom', 'Check'], [
      ['Panel shows communication alarm', 'Termination plugs on the control bus, damaged control cable, RCU power'],
      ['One side weak or stuck', 'Servo cable and connector, servo power, fin free to move (manual tiller), RCU port assignment'],
      ['Wrong response in turns', 'Rudder signal source and calibration, EXTBUS/NMEA 2000 signal'],
      ['Interceptors fine, fins weak', 'Different power supply path: DC feed, fuse, voltage sag at servo']
    ]],
    ['verify', "This lesson summarises the control installation manual 24163-01 and the 2025 HCS-5 manual (software 6.0.x). A different software or hardware generation may use different panels, ports or alarm text."],
    ['qc', { q:"What happens if control bus termination plugs are not installed on a Humphree system?", o:["The control panel may show a communication error alarm and bus errors can occur", "The fins get stronger", "The system uses less power", "Nothing"], a:0, e:"The manual requires termination plugs to avoid short-circuit and control bus errors." }]
  ]},
  { id:'x11', title:'Choosing and comparing stabilisation: gyro, fins, interceptors and Ride', level:'Advanced', min:15, interactive:true, src:['humfinb','sk6o','skrt'], body:[
    ['p', "Different stabilisation products solve different problems. Understand the trade-offs so you can explain a boat's symptoms and options."],
    ['table', ['System', 'What it does', 'Power', 'Works at anchor?', 'Typical trouble'], [
      ['Gyro (Seakeeper)', 'Reduces roll with a precessing flywheel', 'AC (larger) or 12 V DC (smaller) plus 24 V/12 V control and a seawater pump', 'Yes, once spun up', 'Spool-up time, AC supply quality, cooling flow, GPS, alarms'],
      ['Electric fins (Humphree 24 V)', 'Fins damp roll; also yaw with coordinated turns', '24 V DC from the battery bank', 'Yes, with zero-speed mode', 'Battery sag, RCU fuse, bus termination, fin or servo damage'],
      ['Hydraulic fins (other makers)', 'Fins driven by a hydraulic power unit', 'Pump motor (AC or DC)', 'Often underway only; zero-speed type for anchor', 'Oil level, filters, sensors'],
      ['Interceptors (Humphree, Zipwake)', 'Blades alter trim and list underway', '12/24 V actuators', 'No (need speed)', 'Calibration, offset on angled transoms, wiring and fuses'],
      ['Seakeeper Ride', 'Actuated blades for trim and list control', '12 V', 'No', 'CAN bus cross-over, GPS, Software Module orientation']
    ]],
    ['ul', ["Roll at anchor: gyro or zero-speed fins. Planing trim and list: interceptors or Ride. Both: gyro plus interceptors, or fins plus interceptors.", "<b>Cost of power</b>: fins use bank capacity; gyros need a generator or big inverter for AC models; interceptors are small loads.", "<b>Installation constraints</b>: fins and interceptors cut or penetrate the hull; gyros need a strong foundation, cooling water and space near the centre of gravity."]],
    ['where', "Riviera: Humphree fins (24 V) or a Seakeeper (SK18 on the 735). Maritimo: Seakeeper (long-standing partner), Seakeeper Ride and Humphree interceptors. Princess: Humphree interceptors with Active Ride Control in the Easy Boating package and Seakeeper options. Sunseeker: Seakeeper 6 optional. Boston Whaler, Contender and Everglades: Seakeeper 2 or 3 on larger centre-consoles, plus Livorsi or Lenco tabs."],
    ['int', 'match:stabsys'],
    ['qc', { q:"Which system is the most reliable choice for reducing roll at anchor with the engines off, where the fins are battery-powered?", o:["24 V electric fins with zero-speed stabilisation", "Trim tabs", "Interceptors", "Seakeeper Ride"], a:0, e:"Fins with zero-speed mode can run from batteries at anchor; interceptors and Ride need boat speed." }]
  ]}
]);
