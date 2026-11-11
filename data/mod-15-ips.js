/* Module: Volvo Penta IPS, EVC and Easy Boating (product-based). Sources: Volvo Penta accessories catalogue, Garmin/Volvo MFD manual. Dealer-tool-only procedures are flagged, not taught. */
TRAINING.addModule({ id:'ips', title:'Volvo Penta IPS, EVC & Joystick Systems', icon:'⚙️',
  summary:'EVC architecture and CAN, helm functions, joystick docking and Dynamic Positioning, interceptors, Active Corrosion Protection, Glass Cockpit integration and a safe fault-finding approach that respects dealer-only procedures.',
  lessons:[
  { id:'ip1', title:'EVC: the system that ties the boat together', level:'Foundation', min:12, interactive:true, src:['vpacc','gvolvo'], body:[
    ['p', "Volvo Penta <b>EVC (Electronic Vessel Control)</b> connects the engine, transmission, instruments and 'smart features' in one system based on <b>CAN-bus</b> technology (Volvo Penta accessories catalogue). Think of it as a private network of control units, and the Glass Cockpit or instruments as windows into it."],
    ['where', "EVC with IPS drives is standard on Riviera IPS models (Garmin Glass Cockpit helm), Princess V/F/S-class boats and Sunseeker Predator and Manhattan IPS models. Boats with shaft drive (Maritimo, many Riviera 645 to 78 SMY models) use other joystick and control platforms (see the shaft-drive module). The same EVC diagnostic thinking applies to non-IPS Volvo Penta installs."],
    ['table', ['Part', 'Role'], [
      ['Engine ECU / drive units', 'Run the engine and the drive. Each engine has its own control units and CAN connections.'],
      ['Helm control units and levers', 'Read the throttle and gear levers and the joystick stations; send commands over the EVC bus.'],
      ['Displays', 'Instruments or the Glass Cockpit read engine and boat data and alarms.'],
      ['Interfaces and gateways', 'Easy Connect (Bluetooth and NMEA 2000 functionality) and other gateways to NMEA 2000.'],
      ['Options', 'Interceptor system, Battery Management System, Active Corrosion Protection, Dynamic Positioning, Assisted Docking, electronic steering']
    ]],
    ['int', 'hot:ips'],
    ['p', "The catalogue notes that many features are options in some markets and standard in others, and that some features are factory-fit only (no retrofit), others retrofit by dealer. Always confirm what a particular boat actually has through the display lists."],
    ['qc', { q:"What technology does Volvo Penta EVC use to connect engine, transmission, instruments and features?", o:["CAN-bus", "Analogue wiring only", "Wi-Fi", "Fibre optic"], a:0, e:"The Volvo Penta catalogue describes EVC as a system based on CAN-bus technology." }]
  ]},
  { id:'ip2', title:'Helm functions you will be asked about', level:'Foundation', min:12, src:['vpacc'], body:[
    ['p', "These are the standard 'EVC features' described by Volvo Penta. A customer's complaint almost always names one of them."],
    ['table', ['Feature', 'What it does'], [
      ['Single-lever mode', 'Controls twin, triple or quad engines with one lever'],
      ['Low-speed mode', 'Reduces speed at idle by about 50%, from roughly 5-6 knots to 2-3 knots'],
      ['Cruise control', 'Fingertip control of engine rpm for economy and comfort'],
      ['Tow mode', 'Limits speed to a preset maximum rpm and holds speed'],
      ['Sportfish mode', 'Lets the boat turn on its axis and follow a fish at speed in reverse with the engine controls only'],
      ['Powertrim Assistant', 'Automatic drive trim for the best attitude'],
      ['Autopilot', 'EVC-integrated, follows steering wheel changes automatically (shadow drive)'],
      ['Trip computer', 'Fuel use, distance to empty and trip data'],
      ['Joystick docking', 'Move the joystick in any direction and the boat follows. Up to six stations can be installed.'],
      ['Dynamic Positioning (DPS)', 'Holds position, with repositioning by tapping or rotating the joystick'],
      ['Assisted Docking', 'Hybrid of joystick docking and DPS for slow speed near the dock, with side push against a fixed structure'],
      ['Joystick driving', 'Steer with the joystick at all speeds; autopilot engages after each course change']
    ]],
    ['tip', "When a customer says 'the joystick does not work', first ask <b>which function</b> (docking, DPS, assisted docking, driving), at <b>which station</b>, and whether it is available in the display's feature list."],
    ['qc', { q:"Which EVC feature holds the boat's position automatically?", o:["Dynamic Positioning System (DPS)", "Tow mode", "Low-speed mode", "Trip computer"], a:0, e:"DPS maintains position and heading with repositioning commands from the joystick." }]
  ]},
  { id:'ip3', title:'Power, grounds and CAN health', level:'Intermediate', min:14, src:['vpacc','gvolvo'], body:[
    ['p', "Most EVC 'ghost' faults trace back to power quality or connectors. This is a principle-based lesson: the specific supply voltage and wiring is on the installation drawing for the engine, and the Driveline Info screen shows the electrical system voltage."],
    ['ul', ["<b>Supply</b>: control units need a stable supply during cranking and thruster operation. Voltage dips cause resets, 'lost network' alarms and joystick drop-outs.", "<b>Grounds</b>: poor engine-to-battery ground paths and corroded bonding points are common. Measure voltage drop on the negative as well as the positive under load.", "<b>CAN wiring</b>: the EVC bus has terminations at its ends. Damaged insulation, wet connectors and bent pins in bilge connectors cause intermittent faults. Treat the harness gently and inspect by eye before testing.", "<b>Battery Management System</b> (option): gives an overview of battery status so low-voltage problems are visible.", "<b>Charging and isolation</b>: ensure the engine and start batteries are charged and that isolators and DC-DC chargers do not drop the voltage during operation."]],
    ['steps', ["Record the voltage at the display and at the engine ECU supply with the engine off, running and while operating the joystick.", "Look for voltage dips during thruster operation, cranking and when large loads start.", "Inspect connectors in the bilge and under the helm for corrosion and loose pins.", "Check the EVC feature and component lists on the display against what should be installed.", "Only then look at software and calibration, with a Volvo Penta dealer where required."]],
    ['verify', "Terminator positions, fuse sizes and cable gauges are in the installation drawing for the exact engine and EVC generation. They are not given here. Do not assume that EVC wiring on a different generation or engine range matches."],
    ['qc', { q:"A joystick drops out only when the bow thruster runs. What should you check first?", o:["Supply voltage dips and grounds during thruster operation", "The language setting", "The radar", "The galley circuit"], a:0, e:"Large loads cause supply dips that reset control units. Measure supply and ground under load." }]
  ]},
  { id:'ip4', title:'Active Corrosion Protection (ACP)', level:'Intermediate', min:12, src:['vpacc'], body:[
    ['p', "ACP uses <b>impressed current cathodic protection (ICCP)</b> to protect IPS and Aquamatic drives. It monitors the drive's electrode potential and adjusts the output current through the transom unit. It replaces the standard transom sacrificial anodes on IPS installations and is fully integrated with EVC, so protection status appears on the engine displays."],
    ['table', ['Item', 'From the Volvo Penta catalogue'], [
      ['Requirements', 'Volvo Penta IPS or Aquamatic sterndrives; EVC generation C2 or later; EVC displays 2.5 inch, 4 inch, 7 inch or Glass Cockpit; fibreglass hull'],
      ['Components', 'Control unit, transom unit and a backup zinc anode (two anodes for twin Aquamatic sterndrives). Triple and quad IPS installations need an extra bonding cable.'],
      ['Typical current', 'Under most conditions less than 50 mA for a single Aquamatic and less than 350 mA for a triple IPS1/10 with unpainted drives (reduced with painted drives). Current capacity is 3 A.'],
      ['Battery state of charge', 'Below 75% (no shore power) the system goes to monitor-only and protection comes from the backup anodes. Below 50% it is inactive.']
    ]],
    ['safety', "ICCP outputs and AC shore-power leakage interact. Do not disconnect or jumper the system, and do not swap anodes or paints without following Volvo Penta's instructions for IPS drives."],
    ['tip', "If the customer reports faster than usual zinc wear or a corrosion alert at the dock, check for shore power connection, battery state of charge, and bonding to the drive before blaming the ACP unit."],
    ['qc', { q:"At what battery state of charge does ACP go to monitor-only if there is no shore power?", o:["Below 75%", "Below 95%", "Below 10%", "It never does"], a:0, e:"Below 75% it is monitor-only and below 50% it is inactive; backup anodes protect the drives." }]
  ]},
  { id:'ip5', title:'Interceptors, Glass Cockpit and Easy Connect', level:'Intermediate', min:12, src:['vpacc','gvolvo'], body:[
    ['ul', ["<b>Interceptor System</b>: integrated with EVC for automatic trim on Volvo Penta powered yachts from about 35 to 100 feet, with interceptor sizes from 300 to 1,050 mm (catalogue). Princess lists this as part of its Easy Boating package (Active Ride Control). The related hardware is Humphree-type interceptors (see the stabilisation module).", "<b>Glass Cockpit</b>: Garmin-based displays from 10 to 24 inches that gather navigation and engine information (see the Garmin module).", "<b>Easy Connect</b>: plugs into the multilink at the helm, gives a Bluetooth dashboard on a phone or tablet, shares diagnostic trouble codes with a chosen dealer, and the interface includes NMEA 2000 functionality so it can bridge engine data to an existing network.", "<b>Electronic steering</b> and joystick stations are factory-fit oriented; retrofit may be a major job (catalogue availability table)."]],
    ['where', "Interceptors integrated with IPS and a Glass Cockpit are seen on Riviera IPS boats, Princess (Easy Boating package: Sleipner variable-speed bow thruster, interceptors with Active Ride Control, DPS, Assisted Docking) and Sunseeker."],
    ['qc', { q:"What does the Volvo Penta Easy Connect interface provide?", o:["A Bluetooth dashboard and the option to share diagnostic codes with a dealer, plus NMEA 2000 functionality", "A battery charger", "A bilge pump", "A radar scanner"], a:0, e:"Easy Connect plugs into the multilink and shows engine and boat data on a smart device." }]
  ]},
  { id:'ip6', title:'Fault-finding without the dealer tool', level:'Advanced', min:14, interactive:true, src:['vpacc','gvolvo'], body:[
    ['p', "What a technician can usefully do before the dealer's diagnostic software arrives is substantial: confirm the symptom, check power, check connectors, read what the display shows and write it all down."],
    ['steps', ["<b>Symptom</b>: which function, which station, since when, and what changed (refit, new load, shore power, software update).", "<b>Power</b>: battery voltage at rest and under load; supply and ground at control units.", "<b>Display</b>: active alarms and fault codes, the EVC feature list, component list and software list (Settings > Communications > EVC Network).", "<b>Environment</b>: bilge water, corrosion at connectors, chafed harnesses.", "<b>Isolate</b>: if a station or option is the issue, test another station or function; if all functions are lost, suspect the bus or power.", "<b>Record</b> codes and photos before clearing anything. Hand over a clean case to the dealer."]],
    ['verify', "Procedures that need Volvo Penta's diagnostic tool and dealer credentials (software loading, parameter changes, joystick calibration, drive installation settings) are dealer-only. This course does not describe how to bypass them. If a customer needs those done, escalate with your notes."],
    ['int', 'sim:ipsjoy'],
    ['qc', { q:"What should you do before clearing any fault codes?", o:["Record the codes and conditions, then hand them to the dealer if needed", "Delete them immediately", "Disconnect the batteries", "Re-flash the ECU"], a:0, e:"The codes and conditions are the evidence; clearing them first removes the best information." }]
  ]}
  ]});
