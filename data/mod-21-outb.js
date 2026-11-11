/* Module: Outboard and centre-console control systems (Yamaha Helm Master EX / DES, SeaStar Optimus EPS and 360, Mercury SmartCraft / DTS / Joystick Piloting).
   Sources: Yamaha 2023 Helm Master EX rigging guide (dealer guide), SeaStar Optimus EPS manual Rev D and Optimus 360 manual, builder spec sheets for Mercury. */
TRAINING.addModule({ id:'outb', title:'Outboard & Centre-Console Systems: Yamaha, SeaStar & Mercury', icon:'🚤',
  summary:'Digital throttle, shift and steering on outboards: Yamaha Helm Master EX (DEC, DES, autopilot, joystick), SeaStar Optimus steer-by-wire with CAN1/CAN2/CAN3, and Mercury SmartCraft, DTS and Joystick Piloting (flagged as secondary-source), with a diagnostic method that works on any of them.',
  lessons:[
  { id:'ob1', title:'Digital outboard control: the architecture', level:'Foundation', min:12, src:['yhmex','opteps','where_bw','where_cont'], body:[
    ['p', "Outboard boats have moved from cables to <b>digital controls</b>: a remote control lever reads position electronically, an engine ECU executes it, steering may be by wire, and displays and joysticks join the same network. Every maker uses the same building blocks."],
    ['table', ['Block', 'Job', 'Examples'], [
      ['Remote control and shift/throttle', 'Position sensor and switches at the helm', 'Yamaha DEC lever, Mercury DTS, Optimus control head'],
      ['Steering', 'Hydraulic or electric helm', 'Yamaha DES, Optimus EPS, hydraulic helm'],
      ['Control units', 'Merge commands and send to engines and steering', 'Yamaha BCU and SCU, Optimus PCM'],
      ['Display', 'Status and settings', 'Yamaha CL5 or MFD interface, Optimus CANtrak, Mercury VesselView'],
      ['Autopilot and joystick', 'Higher-level control', 'Yamaha Level 3 and 4, Optimus 360, Mercury Joystick Piloting'],
      ['Gateways', 'Connect to NMEA 2000 and MFDs', 'Yamaha NMEA 2000 gateway, Optimus on CAN3']
    ]],
    ['where', "Boston Whaler: Mercury Verado with DTS and optional Joystick Piloting. Contender: Yamaha Helm Master EX and DES, or Mercury Joystick Piloting. Pursuit, Grady-White and Everglades: Yamaha Helm Master EX (with joystick on some). Optimus steering also appears on sterndrive and small inboard boats. Always identify the system from the labels."],
    ['ul', ["<b>Most faults are power, ground, connector or recognition faults</b> before they are software faults.", "<b>Calibration</b> is part of installation. A replaced engine, control or sensor often needs recognition and calibration steps.", "<b>Dealer tools</b> are needed for many procedures (Yamaha YDIS, SeaStar setup menus for authorised installers)."]],
    ['verify', "Mercury SmartCraft documentation was not obtainable. Only builder spec sheets and general principles are used for Mercury. Yamaha content is from the dealer rigging guide (2nd edition, August 2023)."],
    ['qc', { q:"What is the most common class of fault on digital outboard control systems?", o:["Power, ground, connector or recognition faults", "Broken propellers", "Wrong paint", "Faulty trim tabs"], a:0, e:"The control systems depend on clean power and connectors, and on recognition after components change." }]
  ]},
  { id:'ob2', title:'Yamaha Helm Master EX: levels, parts and requirements', level:'Intermediate', min:16, interactive:true, src:['yhmex'], body:[
    ['p', "The Yamaha Helm Master EX (6X9 system) has four levels. The guide states that the system cannot be expanded unless DES is fitted."],
    ['table', ['Level', 'Name', 'Adds'], [
      ['1', 'DEC: Digital Electronic Control', 'Digital throttle and shift, single lever, trim assist, centre engine, display, key switch'],
      ['2', 'DES: Digital Electric Steering', 'Electric steering, adjustable lock to lock and steering friction; built-in on some outboards, bolt-on for others'],
      ['3', 'Autopilot', 'Heading hold, course hold, pattern steer, Track Point'],
      ['4', 'Joystick: full maneuverability', 'Joystick maneuvering (incl. single engine), SetPoint features, bow thruster integration']
    ]],
    ['ul', ["<b>Components</b>: DEC (remote control), SCU (Steering Control Unit), BCU (Boat Control Unit), EKS (Electronic Key Switch) with Y-COP, CL5 display or MFD interface, NMEA 2000 gateway, thruster driver, heading sensor, joystick.", "<b>Battery</b>: minimum ratings are listed in the guide, for example 680 A CCA/SAE and 80 Ah (20 hr) for L4 2.8 L and V6 4.2 L engines, and 700 A and 110 Ah for V8 5.3/5.6 L.", "<b>Engine spacing</b>: minimum clearance 724 mm (28.5 in) for V6/V8 and 660 mm (26.0 in) for L4. Wider spacing gives better results.", "<b>Installation cautions</b>: keep 30 cm (1 ft) from two-way radios, antenna cables and generators; cover unused multi-hub connectors with waterproof caps; do not bend the heat-shrink bus wires beyond 45 degrees; connectors must lock with a click.", "<b>Predelivery BPS scan</b>: a BPS scan is required for each system before the boat leaves the builder or dealer, to check component compatibility and record serial numbers."]],
    ['int', 'hot:hmex'],
    ['verify', "Procedures that use YDIS (software updates, BPS scan) are dealer tasks. The rigging guide is a dealer document: use it to understand the system, and refer dealer-only steps to a Yamaha dealer."],
    ['qc', { q:"Which Helm Master EX level must be present before the system can be expanded?", o:["Level 2: DES", "Level 4: joystick", "Level 3: autopilot only", "None"], a:0, e:"The guide says the system cannot be expanded unless DES is fitted." }]
  ]},
  { id:'ob3', title:'Yamaha Helm Master EX: recognition, calibration and fault-finding', level:'Advanced', min:16, interactive:true, src:['yhmex'], body:[
    ['p', "The guide's own warning is the most useful fact: <b>when an engine is remounted, always reset recognition of the remote controls</b>. If DEC recognition is not done, the active lamp on the remote control does not light, autopilot is not displayed on the gauge, steering errors occur and steering sensor calibration cannot be done."],
    ['ul', ["<b>Calibrations in the guide</b>: CL5 display calibration, heading sensor calibration, joystick calibration (including a version with a bow thruster) and a steering sensor calibration, each in a set order after installation.", "<b>Systematic checks</b>: the guide's troubleshooting steps measure input voltage at each unit (helm unit, DEC, BCU, GPS, joystick, autopilot panel, heading sensor, thruster driver) and then check the circuit (communication). Harnesses are checked in sections (main, DEC, SCU link, helm, BCU).", "<b>Faults with no trouble code</b>: the guide has a separate chart for the bow thruster when no trouble code is detected.", "<b>YDIS</b> is the dealer diagnostic: the guide uses it to troubleshoot the 6X9 system. A technician without YDIS can still verify power, ground, connector lock and recognition, then refer the code and conditions."]],
    ['steps', ["Record the symptom and any codes shown on the display.", "Check battery voltage at rest and under load against the guide minimum.", "Check each unit's supply and ground.", "Check connector locks and water ingress.", "Check recognition after any engine or control change.", "Escalate with notes if YDIS is needed."]],
    ['int', 'sim:hmexjoy'],
    ['qc', { q:"After an engine is remounted on a Helm Master EX boat, what must be reset?", o:["Recognition of the remote controls (DEC recognition)", "The compass only", "The battery rating", "Nothing"], a:0, e:"Without recognition, the active lamp, autopilot display and steering calibration fail." }]
  ]},
  { id:'ob4', title:'SeaStar Optimus EPS: CAN1, CAN2 and CAN3', level:'Intermediate', min:16, src:['opteps','opt360'], body:[
    ['p', "<b>Optimus EPS</b> is a steer-by-wire system: an electronic helm sends digital messages to a Pump Control Module (PCM), which runs hydraulic pumps and uses SmartCylinders (with rudder feedback units) for precise control. SeaStar's manual describes redundant sensors, fault-tolerant communications and extensive self-monitoring."],
    ['table', ['Network', 'Type', 'Use'], [
      ['CAN1', 'Low-speed, fault-tolerant, redundant power wiring', 'Safety-critical communications: helm to PCM'],
      ['CAN2', 'High-speed', 'Non-critical tasks, passing data to and from the CANtrak display and SeaStar-approved autopilots'],
      ['CAN3', 'NMEA 2000 (public)', 'Optimus broadcasts public messages and can monitor engine RPM; optional']
    ]],
    ['ul', ["<b>CANtrak display</b>: required at the main helm, optional at other stations. ED1700 is for twin sterndrive or inboard with two independent rudders (harness for CAN1 and CAN2); ED1800 for single sterndrive or single rudder (CAN1 only).", "<b>CAN2 caution</b>: connect nothing but Optimus components or SeaStar-approved autopilots, and note that on a 24 V system the CAN2 voltage is also 24 V, which could damage some third-party components.", "<b>Protection</b>: a circuit breaker must be within 7 in of the power source; where the breaker is further away an additional device within 7 in protects the intervening wire.", "<b>Optimus 360</b> adds a joystick: there must be a master joystick (EJ1400 twin, EJ1403 triple, EJ1404 quad, with additional station EJ1401). The CANtrak shows a persistent 'Missing Master Joystick' or 'Invalid Joystick Configuration' warning if there is none or if the type does not match the engines.", "<b>Setup order</b> (360 manual): initial setup, purging, calibration, control head and gateway setup, sea trial, then joystick setup."]],
    ['where', "Optimus is a steer-by-wire and joystick system for sterndrive and small inboard boats (per the SeaStar manual); Seakeeper Ride's troubleshooting guide warns not to cross its CAN with Optimus, Yamaha or other networks."],
    ['verify', "Based on the 2016 Optimus EPS installation manual (Rev D) and the Optimus 360 manual. Newer revisions may have different part numbers."],
    ['qc', { q:"Which Optimus network is for safety-critical communications?", o:["CAN1", "CAN2", "CAN3", "NMEA 0183"], a:0, e:"CAN1 is the low-speed, fault-tolerant network with redundant power wiring." }]
  ]},
  { id:'ob5', title:'Mercury SmartCraft, DTS and Joystick Piloting (secondary-source)', level:'Intermediate', min:12, src:['where_bw','where_cont'], body:[
    ['p', "Mercury Verado and other Mercury outboards use SmartCraft digital networking, with Digital Throttle and Shift (DTS) and electronic steering, and offer <b>Joystick Piloting for outboards</b> with Skyhook on some boats. Mercury service manuals were not obtainable for this course, so only builder-sheet facts are included."],
    ['ul', ["<b>Boston Whaler MY26 spec sheets</b>: Mercury Verado with DTS; Joystick Piloting optional. The sheets note that a Simrad autopilot is not compatible with Joystick Piloting, that Joystick Piloting requires the Premium Package or a VesselView 4 inch display, and that the bow thruster option is not available with Joystick Piloting.", "<b>Contender and others</b>: some boats offer Mercury Joystick Piloting as an alternative to Yamaha Helm Master EX.", "<b>VesselView</b>: Mercury's display; VesselView Mobile (Bluetooth) can notify a dealer.", "<b>Theft Deterrent System</b> and Whaler Watch are options on Boston Whaler."]],
    ['table', ['Question', 'Why it matters'], [
      ['Which engine generation and network?', 'Fault codes and procedures differ between engines'],
      ['What displays and gateways are fitted?', 'VesselView and NMEA 2000 gateway behaviour'],
      ['Is the autopilot compatible with the joystick system?', 'Builder sheets note an incompatibility for some autopilots'],
      ['What dealer tools are needed?', 'Mercury diagnostic software is dealer-only']
    ]],
    ['verify', "This is a secondary-source lesson. Mercury SmartCraft details (codes, wiring, calibration) are not covered because no manual was available; use Mercury's service documentation."],
    ['qc', { q:"According to the Boston Whaler MY26 spec sheets, which is not compatible with Mercury Joystick Piloting?", o:["A Simrad autopilot", "Seakeeper gyro", "A VHF radio", "A depth sounder"], a:0, e:"The spec sheets state that a Simrad autopilot is not compatible." }]
  ]},
  { id:'ob6', title:'Comparing systems and one method for all of them', level:'Advanced', min:14, interactive:true, src:['yhmex','opteps'], body:[
    ['table', ['Question', 'Yamaha Helm Master EX', 'SeaStar Optimus', 'Mercury'], [
      ['Steering', 'DES (Level 2)', 'EPS, hydraulic pumps and SmartCylinders', 'Electronic steering with DTS'],
      ['Joystick', 'Level 4 with SetPoint', 'Optimus 360 (master joystick)', 'Joystick Piloting for outboards (secondary-source)'],
      ['Display', 'CL5 or MFD interface', 'CANtrak', 'VesselView'],
      ['Network', 'Own multi-hub bus; NMEA 2000 gateway', 'CAN1, CAN2 and CAN3', 'SmartCraft; NMEA 2000'],
      ['Key warnings', 'Reset recognition after engine remount; BPS scan', 'Do not connect third-party devices to CAN2; 24 V CAN2 is 24 V', 'Check autopilot compatibility']
    ]],
    ['steps', ["Identify the system from labels, not from the builder's brochure.", "Check battery rating, supply and ground at each unit.", "Check connectors for lock, water and corrosion.", "Check recognition or configuration after any change.", "Read the display for system-level warnings.", "Escalate with notes if dealer tools are needed."]],
    ['int', 'match:outbcomp'],
    ['qc', { q:"What step comes first in a method that works on any digital outboard system?", o:["Identify the system from its labels", "Replace the ECU", "Update software", "Rewire the helm"], a:0, e:"Identify what is fitted before using any fault table." }]
  ]}
]});
