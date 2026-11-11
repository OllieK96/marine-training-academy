/* Module: Shaft-drive joystick and electronic gear/throttle controls (Twin Disc QuickShift / EC300 / EJS). Source: Twin Disc EC300 operation manual (Rev D, March 2013) and EJS brochure. Verify the current revision for the exact installation. */
TRAINING.addModule({ id:'shaft', title:'Shaft-Drive Joystick & Electronic Controls (Twin Disc EJS)', icon:'🕹️',
  summary:'Twin Disc QuickShift transmissions with EC300 controls and the Express Joystick System: modes, stations, wiring interfaces, calibration, flash codes and how the same ideas apply to MAN, CAT, Volvo, Scania and MTU shaft installs.',
  lessons:[
  { id:'sd1', title:'What a shaft-drive joystick system is', level:'Foundation', min:12, src:['tdejs','tdec'], body:[
    ['p', "Conventional shaft-drive boats can be given joystick manoeuvring if the transmissions can shift smoothly and quickly and the propeller speed can be controlled at very low rpm. The <b>Twin Disc Express Joystick System (EJS)</b> is built on a <b>QuickShift transmission</b> with <b>EC300</b> electronic controls. The QuickShift loads the clutch gradually and in milliseconds, so shifting from full forward to full reverse is shockless. Express mode controls prop speed down to about 50 rpm using the normal lever heads (Twin Disc EJS brochure)."],
    ['where', "Twin Disc EJS is described on Riviera shaft-drive models (MAN V8/V12 on the 645, 735 and 64-78 SMY) and on Maritimo shaft-drive boats with Volvo D13, Scania, MTU and ZF engines. Other shaft-drive builders may use ZF, Twin Disc or engine-maker controls. Treat this module as a template for any electronic shaft-line control."],
    ['table', ['Part', 'Role'], [
      ['EC300 controller', 'One per engine. Reads lever positions and sensors, drives the transmission valves and communicates with the engine ECU.'],
      ['Control heads (analogue or digital)', 'Station Select button, Mode Select (Cruise 1-3, Express, Troll, Sync), levers'],
      ['Optional display', 'Shows operating data and fault information; needed for some setup and troubleshooting steps'],
      ['Servo actuator', 'Where mechanical push-pull cables are used for the engine or transmission'],
      ['Joystick (EJS)', 'Commands engines, transmissions and thrusters together, including lateral movement and spinning on the spot']
    ]],
    ['p', "The EC300 is designed to interface with 'all popular electronic engines and transmissions' and can be powered from 10 to 30 V, with J1939 or NMEA 2000 data broadcasting. It supports up to eight control stations and single-lever control for up to eight shaft lines."],
    ['verify', "The EC300 manual used here is Rev D (March 2013) and includes EJS entries. Newer production systems may differ in connectors, tools and fault tables. Use this as a conceptual and fault-finding guide, and confirm the current Twin Disc documents for the specific installation."],
    ['qc', { q:"What does the QuickShift transmission allow that makes joystick control possible on shaft drives?", o:["Instant but gradual clutch loading, so shifting forward to reverse is shockless", "Hydraulic steering", "A bigger propeller", "A pod drive"], a:0, e:"QuickShift modulated clutch engagement lets the system shift quickly and smoothly and control slow prop speed." }]
  ]},
  { id:'sd2', title:'Stations, modes and transfers', level:'Foundation', min:14, src:['tdec'], body:[
    ['ul', ["<b>Station Select</b> button: the station with its red LED lit is the active station. Control is transferred by pressing the button at the station you want.", "<b>Cruise 1-3</b>: normal engine and transmission control, with different lever/gear characteristics.", "<b>Express</b>: controlled clutch slip while engine speed varies, giving slow-speed control of the prop (down to about 50 rpm) while the engine stays in an efficient range.", "<b>Troll</b>: a controlled slipping clutch with engine speed fixed and the lever controlling prop speed (for trolling and very slow cruising).", "<b>Sync</b>: engines are synchronised so one lever can hold twin engines at the same speed; sync authority is limited (about 7.5 degrees of lever difference in the manual).", "<b>Direction disable / warm-up</b>: lets engine speed be raised in neutral for warming without engaging the gear."]],
    ['table', ['Station transfer type', 'Behaviour'], [
      ['Instant', 'Control moves immediately'],
      ['Neutral', 'The levers at the station must be in neutral'],
      ['Lever match', 'Levers must match positions before transfer'],
      ['Lever match with acknowledge', 'Levers match and the operator acknowledges'],
      ['Emergency (double-press)', 'A double press forces transfer when needed']
    ]],
    ['tip', "When a customer says 'it won't take control at the flybridge', check the transfer rule that is programmed (neutral, lever match or acknowledge) before suspecting the control head."],
    ['qc', { q:"Which EC300 mode uses a controlled slipping clutch with a fixed engine speed?", o:["Troll", "Express", "Cruise 1", "Sync"], a:0, e:"Troll fixes engine speed and the lever controls prop speed with a slipping clutch. Express varies engine speed as well." }]
  ]},
  { id:'sd3', title:'Wiring and interfaces', level:'Intermediate', min:14, src:['tdec'], body:[
    ['p', "An EC300 system is simple in concept: sensors in, commands out. Diagnose by walking along that path."],
    ['table', ['Signal', 'Notes from the manual'], [
      ['Supply', '10 to 30 V system power. A reliable supply with clean grounds is essential; see supply faults 531-534.'],
      ['Input and prop speed sensors', 'Used to control slip. Faults 221-226 cover shorted, open and missing signals.'],
      ['Oil temperature and pressure sensors', 'Used to protect the transmission; faults 231-236 and 423-426'],
      ['Valve coils (forward, reverse, troll, neutral, shaft brake)', 'Driven by the controller; faults 241-247 and 251-265 for open, shorted or simultaneous coils'],
      ['Throttle to engine', 'Electronic engines use J1939 or analogue interfaces. Fault 434 relates to throttle power low.'],
      ['Neutral start interlock', 'Relay in the EC300 prevents starting in gear. For emergency starts the manual describes placing a jumper between pins 9 and 10 on the J5 connector cable, preferably at the engine control. Refer to the engine maker drawings.'],
      ['Alarm relay', 'J8 pins 7 and 8, turned on after initialisation when enabled in the setup; indicates a logged fault.']
    ]],
    ['safety', "Using the emergency neutral-start jumper bypasses the interlock. Only use it with the gear mechanically in neutral and the boat secure, never as a permanent repair. Remove it as soon as the control works."],
    ['p', "If the EC300 fails on a boat with push-pull cables, the cables are free to move so throttle, troll or gear levers can be operated manually. If the servo resists, unplug its connector. Check whether the transmissions have a manual gear-select 'come-home' feature."],
    ['qc', { q:"Which EC300 connector and pins carry the alarm relay according to the manual?", o:["J8 pins 7 and 8", "J5 pins 9 and 10", "J1 pins 1 and 2", "J2 pins 3 and 4"], a:0, e:"J5 pins 9 and 10 are the neutral start interlock; J8 pins 7 and 8 are the alarm relay." }]
  ]},
  { id:'sd4', title:'Calibration and set-up concepts', level:'Intermediate', min:14, src:['tdec'], body:[
    ['p', "After any control head, lever or controller change the levers must be calibrated so the controller knows neutral, detent and full positions."],
    ['ul', ["<b>Analogue levers</b> (engines off): press and hold Station Select for at least 20 seconds to enter Analog Lever Calibration (all LEDs flash then go out). Then set the lever to full forward, forward detent, reverse detent and full reverse in turn, holding Station Select about 6 seconds at each (the neutral LED flashes fast to accept it). The last acceptance makes the LED flash continuously; return the levers to neutral to finish.", "<b>Digital levers</b>: power up while holding buttons 3 and 4 until the LEDs and beeper go off for two seconds and PORT LED 1 and STBD LED 1 alternately flash. Move the levers to full forward, forward detent, neutral, reverse detent and full reverse in turn, pressing any button at each; the head acknowledges each position with all LEDs and the beeper, and a longer acknowledgement confirms completion.", "Calibrate each station separately, then check neutral, detent and full-throw readings on the display.", "Set the station transfer rules, sync authority and mode options in the configuration, with the optional display or the setup tool."]],
    ['verify', "Calibration button sequences and timings differ between analogue and digital control heads and between software versions. Follow the manual for the head and revision fitted. Parameter edits that require Twin Disc service software are for Twin Disc trained technicians."],
    ['qc', { q:"To enter analogue lever calibration the Station Select button is held for at least:", o:["20 seconds", "1 second", "2 minutes", "It is never held"], a:0, e:"The manual specifies pressing and holding the Station Select for at least 20 seconds." }]
  ]},
  { id:'sd5', title:'Flash codes and reading faults', level:'Advanced', min:14, interactive:true, src:['tdec'], body:[
    ['p', "The EC300 reports faults through LEDs and, with a display, in text. Faults are grouped into <b>serious</b> and <b>catastrophic</b> classes. The Alarm LED flashes the code (a count of flashes in a pattern), and the controller can inhibit functions (such as Express or station transfer) depending on the fault."],
    ['int', 'codes:ec300'],
    ['note', "Pattern: codes 22x are speed sensors, 23x temperature, 24x and 25x valve and coil circuits, 43x throttle and levers, 44x digital lever, 45x sensor excitation, 46x communications, 52x servo, 53x power supply."],
    ['verify', "Note the oil temperature codes: the Rev D manual lists 231 as oil temperature LOW and 232 as HIGH. Some summaries online reverse them. Use the manual for the revision you have."],
    ['qc', { q:"A flash code in the 22x range most likely points to:", o:["An input or prop speed sensor", "A valve coil", "A throttle power problem", "A servo overcurrent"], a:0, e:"221-226 cover shorted, open and missing input and prop speed signals." }]
  ]},
  { id:'sd6', title:'Other shaft-drive installs: MAN, CAT, Volvo, Scania, MTU and ZF', level:'Advanced', min:14, src:['tdec','tdejs'], body:[
    ['p', "The same architecture appears on every electronic shaft-line system. The differences are in the engine interface and the gearbox."],
    ['table', ['Question', 'Why it matters'], [
      ['How does the engine take throttle? (J1939, analogue, vendor CAN)', 'The control system must speak the engine ECU protocol correctly; wrong or missing CAN data leaves the engine at idle or with a limp mode'],
      ['Start/stop and neutral-start interlock wiring', 'Prevents starts in gear; often the first place a retrofit fails'],
      ['Gearbox type and valve coils (Twin Disc QuickShift, ZF, other)', 'Valve coil resistance and feedback differ by gearbox'],
      ['Speed sensors', 'Input and output speed are used to control slip; wrong sensor or air gap gives speed faults'],
      ['Thrusters in the joystick loop', 'Interface to bow and stern thrusters (analogue, proportional or CAN such as S-Link)'],
      ['Autopilot and steering', 'Rudder and thruster control must be integrated for joystick manoeuvres'],
      ['Alarm and data outputs', 'J1939 or NMEA 2000 broadcasts to the helm displays']
    ]],
    ['where', "MAN V8/V12 shaft installs appear on Riviera; Volvo D13, Scania, MTU and ZF on Maritimo; Caterpillar and others on many large cruisers. The joystick brand varies by builder and year. Always confirm which controller is fitted from the label before you plan the job."],
    ['verify', "Details of how a specific engine maker (MAN, CAT, Volvo, Scania, MTU) integrates with a particular controller are not published in public documents. Treat engine-specific wiring and parameters as dealer or manufacturer information."],
    ['qc', { q:"What should you identify first on a shaft-drive joystick boat?", o:["The controller and gearbox fitted, from their labels", "The boat's brand", "The colour of the helm", "The length of the shaft"], a:0, e:"The controller and gearbox determine the fault tables and procedures." }]
  ]},
  { id:'sd7', title:'Scenario: no response from the flybridge', level:'Advanced', min:10, interactive:true, src:['tdec'], body:[
    ['p', "The customer cannot take control of the boat from the flybridge, but the helm lower station works. Use the simulator to find the cause."],
    ['int', 'sim:ec300fly']
  ]}
  ]});
