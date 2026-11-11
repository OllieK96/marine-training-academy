/* Module: Network map and cross-system fault-finding. Brand-agnostic: built from the product modules in this course. */
TRAINING.addModule({ id:'netmap', title:'Network Map: Reading Any Vessel and Finding Faults Across Systems', icon:'🗺️',
  summary:'The buses on a modern yacht or centre-console (House DC, AC, NMEA 2000, Ethernet, control CAN, internet), how to draw and read a map of an unfamiliar vessel, which products sit on which bus, and cross-system fault-finding exercises that apply to any builder.',
  lessons:[
  { id:'nm1', title:'Why map the vessel first', level:'Foundation', min:10, src:['gvolvo'], body:[
    ['p', "Every builder fits a different mix of products, but they all connect them with a small set of buses. If you can name the bus a symptom lives on, you can find the fault on a vessel you have never seen. This module teaches the habit of <b>mapping before measuring</b>."],
    ['ul', ["A <b>bus</b> is a shared wire path that carries power or data for many units.", "A <b>gateway</b> moves data from one bus to another (for example an engine gateway to NMEA 2000).", "A <b>node</b> is a unit on a bus.", "Most faults are on the bus (power, termination, connectors), at a gateway, or at a node's own supply and ground."]],
    ['where', "The same map applies to a Riviera or Maritimo (Garmin, CZone, Volvo or shaft joystick, Seakeeper), a Princess or Sunseeker (IPS, Garmin, Mastervolt), a Boston Whaler or Contender (Mercury or Yamaha, Simrad or Garmin, Empirbus or Naviop) or any other vessel. Build the map from the labels you find."],
    ['qc', { q:"What does a gateway do?", o:["Moves data from one bus to another", "Powers the batteries", "Cools the engine", "Measures AC current"], a:0, e:"Gateways translate between buses, for example EVC to NMEA 2000." }]
  ]},
  { id:'nm2', title:'The six buses and what lives on each', level:'Foundation', min:14, interactive:true, src:['gvolvo','slslink'], body:[
    ['table', ['Bus', 'Carries', 'Typical products', 'Typical faults'], [
      ['House DC', 'Power', 'Batteries, BMS, busbars, fuses, MPPT, DC-DC, digital switching modules', 'Voltage dips, loose ground, BMS opening'],
      ['AC', 'Shore, generator and inverter power', 'Shore inlet, RCD, galvanic isolator, Mastervolt/Victron inverter-chargers, gyros on AC models, cablemasters', 'RCD trips, polarity, changeover interruption'],
      ['NMEA 2000', 'Instruments, engine data, switching, GPS', 'CZone, Sentinel/Siren, Seakeeper GPS, Garmin sensors', 'Termination, power injection, drop cables'],
      ['Ethernet (Marine Network)', 'Radar, sonar, video, shared display data', 'Garmin Marine Network, Raymarine, Simrad displays and sensors', 'Isolation coupler, cable, software mismatch'],
      ['Control CAN', 'Engine, drive, thruster, stabiliser control', 'Volvo EVC, J1939 engines, Twin Disc EC300, Sleipner S-Link, Seakeeper Ride, Optimus CAN1/CAN2, Yamaha multi-hub', 'Crossing buses, terminator, supply to control units'],
      ['Internet / Wi-Fi / cellular', 'Remote access and updates', 'Starlink, routers, cellular telematics', 'Power, antenna view, plan, subscription']
    ]],
    ['int', 'netmap'],
    ['tip', "Use the Fault injection control to break a bus and watch which units light up. In the real world, you rarely lose a whole bus: you lose one device or one segment, but the same thinking narrows it down."],
    ['qc', { q:"Radar and sonar show nothing but depth is fine. Which bus is likely involved?", o:["Ethernet (Marine Network)", "AC", "Internet", "House DC for every unit"], a:0, e:"Radar and sonar travel on the Ethernet-based Marine Network; depth uses NMEA 2000 or its own transducer." }]
  ]},
  { id:'nm3', title:'Who fits what: a product matrix', level:'Intermediate', min:14, src:['where_riv','where_mar','where_prin','where_sun','where_bw','where_cont','where_azim','where_ray'], body:[
    ['p', "This is a map of public information from builder pages and press material, not a guarantee for any one hull. Always confirm on the vessel."],
    ['table', ['System', 'Riviera', 'Maritimo', 'Princess', 'Sunseeker', 'Boston Whaler', 'Contender'], [
      ['Switching', 'CZone', 'CZone (M75, YachtSense on S55)', 'Mastervolt/CZone implied', 'Unknown (PLC on one 28 m yacht)', 'Not stated', 'Empirbus + Aegis BMS'],
      ['Propulsion control', 'Volvo IPS or MAN shaft', 'Volvo, shaft', 'IPS + joystick', 'IPS + Glass Cockpit', 'Mercury Verado + DTS', 'Yamaha HMEX or Mercury'],
      ['Stabilisation', 'Humphree fins or Seakeeper', 'Seakeeper, Seakeeper Ride', 'Seakeeper option, interceptors', 'Seakeeper 6 option', 'Seakeeper SK3 option', 'Seakeeper 2 / Ride'],
      ['Thrusters', 'Side-Power / Sleipner', 'Side-Power / Vetus', 'Sleipner eVision', 'Side-Power', 'Option (not with JPO)', 'Lenco bow'],
      ['Remote monitoring', 'Sentinel', 'CZone remote', 'Princess Connect', 'Not stated', 'Whaler Watch / Nautic-On', 'Not stated'],
      ['Batteries', 'Fusion Pulse LiFePO4', 'Mastervolt (M75)', 'Mastervolt', 'Not stated', 'Lithium option', 'Aegis BMS']
    ]],
    ['p', "Other builders found in the research: Azimut (Neuron by MDP Tech), Pursuit (Yamaha HMEX, Siren Marine, Fischer Panda), Everglades (Yamaha with joystick, Garmin, Seakeeper 2, Lumitec), Grady-White (Yamaha HMEX), Sea Ray SLX (CZone and Simrad, to be verified)."],
    ['verify', "Entries marked 'Not stated' or 'implied' were not confirmed from public pages. Several entries come from dealer listings and need verification on the boat. Do not quote this table to a customer."],
    ['qc', { q:"What should you do with a 'who fits what' table?", o:["Treat it as a starting guess and confirm on the vessel", "Quote it to the customer", "Assume it is exact", "Ignore the hull label"], a:0, e:"Brochures differ from the boat in front of you." }]
  ]},
  { id:'nm4', title:'Drawing the map of an unfamiliar vessel', level:'Intermediate', min:12, src:['gvolvo'], body:[
    ['steps', ["Walk the vessel with a notepad and note every control unit, gateway, display and module with its label.", "Group by bus: which cables go to which unit; identify bus type from connectors (M12 for NMEA 2000, RJ45-style for Ethernet, product-specific for others).", "Mark each gateway and note which buses it joins.", "Mark power: where each unit gets power and its fuse.", "Mark the terminators on each CAN bus.", "Photograph labels and fuse positions before changing anything.", "Keep a copy with the vessel's documents."]],
    ['tip', "A map made once pays off at every later fault. Record firmware and software versions while you are there."],
    ['qc', { q:"What should you mark at each end of a CAN backbone?", o:["Its terminator", "A fuse", "A battery", "A bilge pump"], a:0, e:"NMEA 2000 and other CAN buses are terminated at both ends." }]
  ]},
  { id:'nm5', title:'Cross-system fault-finding: which bus is it?', level:'Advanced', min:16, interactive:true, src:['slslink','skrt','tdec'], body:[
    ['p', "The scenarios in this course (CZone ON but dead, Garmin reboots with thruster, IPS joystick dead, EC300 flybridge, Seakeeper Ride CAN, S-Link no communication, lithium BMS drop, Siren no switching, Yamaha recognition) all follow the same pattern. Try the generic quiz, then do the scenario exercises."],
    ['int', 'netmap'],
    ['table', ['Scenario', 'Bus or layer', 'Key lesson'], [
      ['CZone circuit shows ON but is dark', 'House DC output (fuse)', 'The screen shows command, not voltage'],
      ['Display reboots when thruster runs', 'House DC', 'Measure under load'],
      ['IPS joystick dead, helm works', 'Control supply at the connector', 'Check power and connectors first'],
      ['EC300 flybridge will not take control', 'Configuration rule', 'Check the transfer rule and levers'],
      ['Seakeeper Ride 1024', 'Control CAN crossed with NMEA 2000', 'Keep buses separate'],
      ['S-Link alarm 12', 'Control CAN termination', 'Fit the END terminator'],
      ['Thruster stops on one lithium battery', 'House DC and BMS', 'Check current rating'],
      ['Siren shows no switches', 'NMEA 2000 configuration', 'Third-party mode needed'],
      ['Yamaha autopilot missing after engine swap', 'Recognition', 'Reset recognition']
    ]],
    ['qc', { q:"What common first step applies to every scenario in this module?", o:["Name the bus or layer before measuring", "Replace the biggest component", "Reboot everything", "Update all software"], a:0, e:"Naming the bus narrows the search." }]
  ]},
  { id:'nm6', title:'Handover and documentation', level:'Advanced', min:10, src:['gvolvo'], body:[
    ['p', "A good handover leaves the next person able to find a fault in minutes. Give the owner a one-page network map, a list of every product with its label, a list of firmware versions, the position of every bypass or fuse, and the settings you changed."],
    ['ul', ["Network map with bus names and terminators.", "Table of products: make, model, serial, location, supply fuse.", "Configuration files stored off the boat (CZone, Empirbus, thruster or stabiliser settings).", "Photos of fuse positions and bypass positions on switching modules.", "Test results: battery voltage under load, charge voltage settings, calibration done."]],
    ['qc', { q:"Where should configuration files be kept?", o:["A copy off the boat as well as on the vessel", "Nowhere", "Only on a chartplotter", "Only in the cloud with no copy"], a:0, e:"A copy off the boat saves hours if a module fails." }]
  ]}
]});
