/* Engines, propulsion & thrusters: deeper thruster lessons (technology types, S-Link, batteries/lithium). Extends module 'prop' (p1-p6 unchanged). Sources: Sleipner S-Link manual doc 2917 rev 31 (2026), S-Link alarm codes doc 3062 rev 7, SEP install guide doc 2728 rev 22, Vetus manuals. */
TRAINING.addLessons('prop', [
  { id:'p7', title:'Thruster technologies: brushed DC, proportional/brushless and hydraulic', level:'Intermediate', min:14, src:['sep','slslink','vet1'], body:[
    ['p', "Thrusters are not all alike. The motor and drive type decides the electrical design, the controls and what can go wrong."],
    ['table', ['Type', 'How it works', 'Electrical notes', 'Typical faults'], [
      ['Brushed DC, on/off', 'A large brushed motor switched by a contactor or solenoid at full voltage', 'Very high current for short bursts (hundreds of amps); S2 duty ratings of a few minutes; heavy fuse and isolator', 'Contactor failure, worn brushes, overheating after repeated use, voltage drop in cables'],
      ['Brushed DC, proportional', 'The same motor driven by a power controller that varies voltage (PWM)', 'Needs a controller (for example a Sleipner PPC) and a control bus; the controller handles inrush and temperature', 'Controller overtemperature, bus communication faults, cable and fuse sizing'],
      ['Brushless, variable speed', 'A brushless motor with its own drive; speed and thrust are continuously variable', 'Often 24 V on a dedicated battery pack; precise control and quieter operation', 'Drive faults, battery management (BMS) limits, communication'],
      ['Hydraulic', 'Hydraulic motor fed by a pump from an electric motor or engine PTO', 'The electrical side is the pump motor and control valves; oil level and temperature are monitored', 'Oil temperature, filters, pump motor supply']
    ]],
    ['where', "Side-Power / Sleipner thrusters are fitted to Riviera, Maritimo (hydraulic Side-Power on bigger boats, Vetus or Sleipner brushless under about 70 ft), Princess (a Sleipner eVision variable-speed bow thruster with its own 24 V battery pack in the Easy Boating package) and Sunseeker (Side-Power). Vetus BOW PRO thrusters use V-CAN."],
    ['ul', ["<b>Duty cycle</b>: the SEP range's maximum operating time is quoted as an S2 motor rating of 2 to 3 minutes at 20 C. Repeated short bursts still heat the motor and cut run time.", "<b>Voltage under load</b> decides thrust. SEP supply limits: 12 V units around 15.2 to 15.5 V maximum, 24 V units 31 V, measured at the PPC terminals (Side-Power guide).", "<b>Controls</b>: panels, joysticks, remote controls and CAN bus (S-Link, V-CAN) connect to the power controller. The type of control decides which fault tables apply."]],
    ['qc', { q:"What does a proportional thruster controller add compared with an on/off contactor?", o:["Variable voltage (speed) control, plus temperature and current protection", "More battery capacity", "A bigger propeller", "A hydraulic pump"], a:0, e:"A proportional power controller varies motor voltage and adds protection." }]
  ]},
  { id:'p8', title:'S-Link: bus, panels and alarm codes', level:'Advanced', min:16, interactive:true, src:['slslink','slalarm','slleg','sep'], body:[
    ['p', "<b>S-Link</b> is Sleipner's CAN-based control bus for thrusters, stabilisers, windlasses and other Sleipner devices. A thruster system is a bus with a <b>power cable</b>, an <b>END terminator</b>, backbone and spur cables. Only Sleipner or authorised devices connect directly; other equipment must use a Sleipner interface (for example MSI8730, GW-1 or ESI-1)."],
    ['ul', ["Panels such as the PJC211 and PJC212 show a diagnostic screen with <b>Rx and Tx error counters</b> and state flags: WARNING at 96 counts, PASSIVE above 127, BUS OFF above 255. Hot-plugging a cable briefly increases the counters.", "Check, in this order: power on the S-Link power cable, END terminator fitted, connectors fully latched, cable damage, device addresses, then the panel.", "Panel warning levels for the HOLD function: level 1 (single short beep every 2.4 s) for voltage below 9.3 V (12 V) or 17.5 V (24 V) or motor temperature above 85 C; level 2 below 8.9 V / 16.3 V or above 100 C; level 3 (continuous beeps and red backlight) below 8.5 V / 15 V or above 110 C. The HOLD function cancels and thrusters stop when limits are exceeded.", "Panel settings include Timer Auto-Off, a relay output for selected alarms, an external buzzer option and thrust limit/asymmetric thrust adjustments."]],
    ['int', 'codes:slink'],
    ['note', "Codes 5 (low voltage) and 35 (warning low voltage) use different thresholds: code 5 is 12 V thruster below 8.00 V or 24 V below 12.00 V; code 35 is the earlier warning at 9.30 V (12 V) or 17.50 V (24 V)."],
    ['verify', "S-Link alarm text was taken from document 3062 revision 7 (2021). Sleipner also publishes a newer 'Legacy Fault Codes' document (6797 rev 11, 2026) and an online fault code navigator. Use the current version for the exact device and firmware."],
    ['qc', { q:"At what Rx/Tx error count does an S-Link panel show the BUS OFF state?", o:["Above 255", "At 10", "At 96", "Above 127"], a:0, e:"WARNING at 96, PASSIVE above 127, BUS OFF above 255 per the panel diagnostics." }]
  ]},
  { id:'p9', title:'Thrusters, batteries and lithium: cabling, fusing and BMS limits', level:'Advanced', min:16, src:['sep','slslink','fuslfp'], body:[
    ['p', "A thruster is the heaviest short-duration DC load on most boats. Poor cabling and an under-rated battery are the number one cause of 'weak thruster' calls."],
    ['table', ['Model (Side-Power guide, doc 2728 rev 22)', 'Thrust', 'Nominal current / fuse / cable (example rows)'], [
      ['SEP 80', '96 kg (12 V or 24 V)', '12 V: about 530 A, ANL 400, 70 mm2 under 7 m. 24 V: about 280 A, ANL 250'],
      ['SEP 100', '116 kg', '12 V: about 740 A, ANL 500, 95 mm2. 24 V: about 340 A, ANL 325'],
      ['SEP 120 (24 V only)', '139 kg', '24 V: about 420 A, ANL 325'],
      ['SEP 130', '160 kg', '12 V: about 800 A, ANL 500. 24 V: about 350 A, ANL 325'],
      ['SEP 150 (24 V only)', '182 kg', '24 V: about 610 A, ANL 500']
    ]],
    ['ul', ["Always use the chart in the manual for the exact model, supply voltage and <b>total cable length (positive and negative)</b>. The values above are rows from the guide.", "Lug torque: M8 13 Nm and M10 23 Nm; no washers between lugs. After wiring, check with an ohmmeter that the motor flange is isolated from both B+ and B-.", "<b>Lithium banks</b>: the PPC controls output voltage for lithium, and PPC firmware must be 1.033 or later with lithium. An under-rated BMS or a BMS whose current limit is below the thruster peak can drop the load suddenly, which looks like a thruster fault.", "<b>Lithium voltage</b>: a high-capacity lithium bank can supply a higher voltage than an on/off thruster is rated for; running above rated voltage reduces run time and wears or damages the motor (see lesson p4).", "<b>Dedicated bank</b>: a dedicated thruster battery close to the thruster, or a dedicated 24 V pack (as on Princess's eVision setup), shortens cables and separates thruster load from the house system."]],
    ['table', ['Symptom', 'Check'], [
      ['Weak thrust, motor hot', 'Voltage at the motor terminals while running, cable length and size, battery state and CCA'],
      ['Thruster stops suddenly', 'BMS over-current limit, PPC or motor temperature alarm, tripped thermal protection'],
      ['Does not run, but panel is alive', 'Contactor/relay and control wiring (S-Link alarm 10 motor contactor, alarm 7 IPC error / motor relay fault)'],
      ['Alarm 12 No communication', 'S-Link power, END terminator, connectors, panel diagnostics']
    ]],
    ['verify', "The Fusion Pulse LFP24-100P datasheet on file is a distributor copy (25.6 V, 100 Ah, 50 A rated discharge, 100 A max, 200 A for under 3 s; built-in BMS). Confirm Fusion's current specification and its surge-current rating before relying on a lithium bank for any thruster supply."],
    ['qc', { q:"What can an under-rated lithium BMS do to a thruster supply?", o:["Cut off the load suddenly when current exceeds its limit", "Increase thrust", "Reduce voltage drop", "Charge the thruster battery faster"], a:0, e:"A BMS with a low current limit can open the contactor under thruster load." }]
  ]}
]);
