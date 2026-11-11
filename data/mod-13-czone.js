/* Module: CZone digital switching (product-based). Sources: CZone/BEP OI-MOI and COI sheets, Configuration Tool R20, Siren Marine CZone guides, Mastervolt, Raymarine.
   Builder notes are deliberately limited to "Where you'll see it" boxes; the training itself is product- and system-based. */
TRAINING.addModule({ id:'czone', title:'Digital Switching: CZone (and how it compares)', icon:'🧩',
  summary:'CZone output/input modules, DIP addresses, configuration files, modes, fail-safe bypass, Sentinel/Siren integration and fault-finding, plus a comparison with Raymarine YachtSense, Empirbus, Naviop, Böning and OEM systems.',
  lessons:[
  { id:'cz1', title:'What digital switching is, and the product families', level:'Foundation', min:12, src:['czoi','czcoi','where_riv','where_mar','where_prin','where_ray'], body:[
    ['p', "Digital switching replaces the old breaker panel and switch bank with <b>output modules</b> installed close to the loads, controlled over a data network from touchscreens, keypads and apps. The big gains are less copper (short runs to the load), software-defined <b>modes</b> (Dock, Anchor, Night), remote control and a log of what is on. The cost is that a wiring fault can now hide behind <i>software state</i>: a circuit can be 'on' on the screen and dead at the load."],
    ['where', "<b>CZone</b> is described as standard on Riviera and is common on Maritimo (other Maritimo boats use Raymarine YachtSense or a CZone/Fathom e-Power combination). It is reported on Sea Ray SLX models and is the usual partner for Mastervolt power electronics (Princess uses Mastervolt as its power-electronics supplier; the exact switching platform varies by model). Empirbus appears on Contender (with an Aegis battery system), Azimut uses its own 'Neuron' system, and the system on a Sunseeker or Ferretti is not published, so <b>identify what is fitted before you quote a fault</b>. Treat the builder list as a starting point only."],
    ['h', 'CZone building blocks'],
    ['table', ['Part', 'Role', 'What you need to know'], [
      ['OI (Output Interface)', '6 x 20 A programmable outputs', 'Each channel has a settable break current from 200 mA to 20 A; channels can be bridged for higher current; PWM dimming and soft start on lighting; mechanical ATC fuse per circuit that can be moved to a bypass position (CZone OI/MOI sheet).'],
      ['MOI (Motor Output Interface)', '2 x 20 A outputs plus one 20 A H-bridge', 'Reverses polarity to drive trim tabs, hatch lifters and similar motor loads.'],
      ['COI (Combination Output Interface)', 'Outputs and inputs in one unit', 'OUT-H 4 x 25 A, OUT-L 12 x 10 A dimmable, 8 analogue and digital switch inputs; full mechanical fuse and bypass per circuit (see module nav, lesson n5).'],
      ['Input / sensor / mixed interfaces (SI, SCI, MI)', 'Read switches, tank and other sensors', 'Listed in the CZone part list (e.g. SI 80-911-0013-00, SCI 80-911-0011-00, MI 80-911-0005-00). Check the current datasheet for I/O counts before quoting.'],
      ['User interfaces', 'Contact 6 / Contact 6 Plus keypads, Control 1, Touch 5/7/10 displays', 'Plus the NMEA 2000 chartplotter pages from Garmin, Raymarine and Simrad that can show the CZone screens.'],
      ['Bridges and tools', 'Network Bridge, MasterBus Bridge, Wireless Interface, USB-to-CAN', 'The Configuration Tool needs the USB-to-CAN adapter on a powered network (see lesson cz5).']
    ]],
    ['p', "CZone modules operate on 5 to 35 V DC (OI/MOI sheet) and share the boat's <b>NMEA 2000</b> backbone for data, so the NMEA 2000 rules (terminators, one power injection point, LEN limits, tee quality) apply directly. See module nav (lessons n2 and n4)."],
    ['verify', "The part numbers above come from the CZone product listing, not from the datasheets for each unit. Always confirm a module's part number and firmware on its label before ordering or loading a configuration."],
    ['qc', { q:"Why can a digital-switched circuit show ON on the screen and still be dead at the load?", o:["The screen shows software state; wiring, a blown or bypassed fuse or the load itself can still be faulty", "Digital switches never fail", "The screen reads the load voltage", "The circuit is always powered through the bypass"], a:0, e:"The screen shows the command and module state, not necessarily the voltage at the load. Measure at the load." }]
  ]},
  { id:'cz2', title:'Fusing, bypass and fail-safe thinking', level:'Foundation', min:12, src:['czoi','czcoi'], body:[
    ['p', "A professional digital-switching install is built so that a failed module <b>cannot strand the boat</b>. CZone describes four layers of protection per output: a <b>mechanical ATC fuse</b>, <b>hardware short-circuit protection</b>, <b>software short-circuit protection</b> and <b>software over-current protection</b> (OI/MOI sheet). The software layers are configurable per channel, so a '10 A' circuit is only as safe as its configuration file and its actual wire size."],
    ['h', 'Manual bypass (OI and COI)'],
    ['ul', ["Each circuit has an ATC fuse with a <b>normal</b> position and a <b>bypass</b> position. Moving the fuse to bypass makes the circuit permanently live and independent of the network and software. It is how a boat keeps running bilge pumps, nav lights or fridges after a module or network failure.", "The ATC fuse should be one size above the software fuse rating (COI install notes). Use the correct fuse in the bypass position as well.", "Cables of 100 A or more should be kept at least 50 mm from the module (OI/MOI sheet) so their magnetic field does not disturb the module.", "In a bypass position the circuit no longer obeys the module's over-current protection, only the ATC fuse. Re-check wire size against that fuse. Do not leave a circuit bypassed after a repair unless that is the intended design."]],
    ['safety', "A bypass fuse removes the module's control of that circuit and can create an ignition hazard in gas or explosive atmospheres. Never insert or move fuses in a petrol-engined bilge or with a gas leak suspected."],
    ['p', "<b>Design question to ask on every boat:</b> which loads are critical (bilge pumps, nav lights, engine ECUs, fridge)? Are they on digital switching at all, or on traditional breakers, or on a module with a labelled bypass? A good commissioning sheet lists the bypass position for each critical circuit."],
    ['tip', "Photograph the fuse positions on every module before you start. Techs sometimes find a circuit that was left in bypass 'temporarily' years ago, which makes the screen lie in the other direction (OFF on screen but live)."],
    ['qc', { q:"How do you override a CZone OI circuit if the network or the module's software fails?", o:["Move that circuit's ATC fuse to the bypass position", "Reboot the chartplotter", "Reflash the firmware at the helm", "Remove the network terminator"], a:0, e:"The bypass position connects the load directly through the fuse and does not depend on the network or software." }]
  ]},
  { id:'cz3', title:'DIP addresses and the configuration file', level:'Intermediate', min:16, interactive:true, src:['czcoi','czoi','czcfg'], body:[
    ['p', "Every CZone module needs a <b>unique DIP-switch address</b> that matches the address assigned to it in the configuration file. The COI manual shows an 8-position switch (the example is 01101100, where 1 = ON). The address plus module type is how the system knows which physical box is 'Bilge OI' in the configuration."],
    ['h', 'How the pieces fit'],
    ['ul', ["<b>Configuration file</b>: describes modules, outputs, inputs, modes, alarms, display pages and the circuit names. It is written to every module on the network. Keep a copy off the boat.", "<b>DIP addresses</b>: set on the module with a screwdriver (COI, OI, MOI) or by a <b>virtual DIP</b> in the tool for interfaces with no physical switch (MasterBus Bridge, Wireless Interface).", "<b>Modes</b>: logic groups of outputs that the system switches together (Dock, Anchor, Night, Away). A mode can have conflicting priority with a manual switch, so 'it won't turn on' is sometimes just a mode.", "<b>Network</b>: NMEA 2000 backbone with its own power. A module with power but no network cannot receive instructions."]],
    ['h', 'LED flash codes (OI/MOI sheet)'],
    ['table', ['Indicator', 'Meaning'], [
      ['DC power LED', 'Green: input power OK. Red: reverse polarity. Off: no input power.'],
      ['Network LED', 'Green: network power connected. Red: network traffic. Off: network power disconnected.'],
      ['Channel LED green', 'Output on'],
      ['Channel LED red x1', 'Not configured'],
      ['Channel LED red x2', 'Configuration conflict'],
      ['Channel LED red x3', 'DIP-switch conflict (two modules share an address)'],
      ['Channel LED red x4', 'Memory failure'],
      ['Channel LED red x5', 'No modules detected'],
      ['Channel LED red x6', 'Low run current'],
      ['Channel LED red x10', 'Over temperature'],
      ['Channel LED red x11', 'Reverse current'],
      ['Channel LED red x12', 'Current calibration']
    ]],
    ['int', 'czdip'],
    ['note', "When two modules share an address you get a <b>DIP-switch conflict (3 red flashes)</b>. When a module has an address that is not in the loaded configuration you get <b>not configured (1 red flash)</b>. A module configured but not found on the network shows black or off-line in the tool and raises a Missing Module alarm."],
    ['qc', { q:"A new OI has been fitted with the same DIP setting as the existing bilge OI. What do the channel LEDs show?", o:["Red flashing 3 times: DIP-switch conflict", "Solid green", "Red flashing once: reverse polarity", "Nothing: the network corrects it"], a:0, e:"Three red flashes indicates a DIP-switch conflict (two modules with the same address)." }]
  ]},
  { id:'cz4', title:'Outputs, inputs, dimming and motor loads', level:'Intermediate', min:12, src:['czoi','czcoi'], body:[
    ['p', "Understanding how a channel is <i>configured</i> explains most nuisance trips and dead circuits. The OI channels are programmable switches that switch high-side (+) power to the load. The ground is still a return to the boat's negative bus."],
    ['ul', ["<b>Break current</b> per channel is set between 200 mA and 20 A (OI). If the file says 5 A and the load draws 6 A, the channel trips even though the ATC fuse is 20 A. Compare the file, the fuse and the cable.", "<b>Fusing characteristic</b>: you can select slow-blow or fast-blow behaviour to suit lamps, pumps and motors, mimicking mechanical fuses and breakers.", "<b>Dimming / PWM</b> on lighting and smooth-start on halogen or motor loads. PWM can cause audible buzz, flicker with some LED drivers or radio interference, so check driver compatibility.", "<b>Bridged channels</b> combine outputs for higher current, but only for outputs designed to be bridged and configured that way.", "<b>MOI H-bridge</b>: reverses polarity to move a trim tab or hatch lifter. Swapped motor wires reverse direction, as with a manual DPDT switch.", "<b>Inputs</b>: a switch input does nothing until the file tells the system what that input should do (toggle, momentary, mode, alarm). Alarms on input detection (for example external voltage detected on a bilge-pump line on a COI) are a configuration choice."]],
    ['table', ['Symptom', 'First thing to check'], [
      ['Circuit trips instantly on switch-on', 'Short or inrush on the load; configured break current too low; LED code (6x low run current is different from over-current)'],
      ['Circuit shows ON, load dead', 'Voltage at output terminal, then at the load; bypass fuse position; corroded connector'],
      ['Circuit is dim or flickers', 'PWM dimming configured on a non-dimmable load; poor connection; low supply'],
      ['Nothing responds from the touchscreen', 'Network power LED; terminators; NMEA 2000 backbone; whether the configuration matches the modules']
    ]],
    ['tip', "Measure at the module output terminal first, then at the load. That one reading splits software (module not switching) from field wiring (the module is on but the load is not receiving)."],
    ['qc', { q:"A lighting circuit flickers only when dimmed, and is fine at 100%. Most likely cause?", o:["PWM dimming with a non-dimmable or incompatible LED driver", "Failed battery", "A missing network terminator", "A DIP conflict"], a:0, e:"PWM dimming into a driver that is not designed for it is a common cause of flicker." }]
  ]},
  { id:'cz5', title:'Configuration Tool workflow and firmware', level:'Intermediate', min:14, src:['czcfg', 'czcoi'], body:[
    ['p', "The CZone Configuration Tool (R20 documented in this course) runs on a laptop and talks to the network through a <b>USB-to-CAN adapter</b> plugged into the NMEA 2000 backbone, which must be powered at its normal network voltage (12 V on most boats)."],
    ['steps', ["<b>Back up first</b>: read the configuration from the network and save it as a file with the vessel name and date.", "Use <b>Identify Modules</b> to find a physical box on a live network.", "Assign or check DIP numbers manually, automatically, or by detecting the next un-configured switch pattern. Virtual DIP applies to the MasterBus Bridge and Wireless Interface (default 11111111; change it and use 'Force Dipswitch for Address' if it conflicts).", "Edit outputs, inputs, modes and alarms. Set alarm severity (Critical, Important, Standard, Warning, Systems On) so the alarm list is useful, not a wall of noise.", "Write the configuration to all modules and check that none show black or off-line.", "Update firmware over CAN if needed. A firmware package (.czswup) is loaded through the tool; do not interrupt power or the network while it runs."]],
    ['p', "<b>Switched module or network power.</b> If a module or the whole network is deliberately switched off (for example, at the key switch), enable the tool's option for switched module/network power so the system does not raise a Missing Module alarm every time the power is turned off."],
    ['safety', "Do not update firmware or write a configuration on a live boat with unattended critical loads (bilge, heating, refrigeration) unless you have confirmed they have a manual bypass or traditional backup. A failed update can leave modules not configured until the write succeeds."],
    ['verify', "This lesson documents R20 of the Configuration Tool. Newer releases may differ in menu names and supported hardware. Check the revision of the Tool, the firmware on the modules and the configuration compatibility before updating."],
    ['qc', { q:"What does a module shown black or off-line in the Configuration Tool usually mean?", o:["It is not communicating: DIP not set or no working network connection", "It is working perfectly", "It has the newest firmware", "It is in bypass"], a:0, e:"Black means the tool cannot see the module on the network, so check DIP address, power and network connection." }]
  ]},
  { id:'cz6', title:'Remote monitoring and switching: Sentinel and Siren Marine', level:'Advanced', min:14, src:['sircz','sircr','sirmtc','czcfg'], body:[
    ['p', "Cellular monitors expose digital switching to a phone app by speaking <b>NMEA 2000</b> to the CZone modules. Two products are met on Australian and US yachts: Sentinel (fitted by some builders as a remote-monitoring and switching system) and Siren Marine MTC/MTC Pro."],
    ['h', 'Sentinel (as documented by CZone-based integration guides)'],
    ['ul', ["Needs CZone release 15 / firmware 6.15.8.0 or newer on the modules involved (check the current guide).", "Needs at least one CZone SI, COI, OI, Contact 6 or Control 1 acting as the 'gateway'.", "Each gateway presents <b>28 virtual remote switches</b> to the app through the NMEA 2000 'Third-Party Switch Bank' control: PGN 127501 carries status and PGN 127502 carries commands.", "Remote switching in the Sentinel app is on the mobile apps only. After changing CZone mode or output names use <i>Refresh switching configuration</i> in the app.", "Sentinel does not use the 'advanced CZone remote control switch functions'."]],
    ['h', 'Siren Marine MTC'],
    ['ul', ["Needs OI firmware 6.17.17.0 or newer (per the Siren CZone remote control guide).", "In the CZone config, add a <b>virtual switch group</b> with a unique instance between 0 and 252 and tick <b>Enable advanced CZone remote switch functions</b>.", "Limitations from the guide: on/off and mode switching only, no dimming, no CZone alarms; non-existent circuit names can appear in the app."]],
    ['table', ['Symptom', 'Likely cause'], [
      ['Switch names missing or wrong in the app', 'Switching configuration not refreshed after a CZone change; virtual switch group not set up'],
      ['Status updates are slow at anchor', 'Monitor polls on a long interval to save battery (Sentinel refreshes about every 20 minutes when the vessel is at rest per its maker)'],
      ['Command accepted, nothing happens', 'Gateway module offline; the mode logic overrides it; output in bypass'],
      ['App shows boat offline', 'Cellular signal or antenna; monitor power; SIM or subscription']
    ]],
    ['where', "Sentinel is described on Riviera, Siren Marine on US centre-console and sportfishing boats such as Pursuit and in the Siren/CZone guides, 'Princess Connect' is the Princess telemetry system and Whaler Watch / Nautic-On appear on Boston Whaler. Only some are CZone-integrated: the next lessons and the Remote Monitoring module treat these as products, not as brands."],
    ['verify', "Firmware and release numbers are taken from published integration guides and may have moved on. Check with Siren Marine, Sentinel or CZone support for the current minimums."],
    ['qc', { q:"How many virtual remote switches does each CZone 'gateway' module present to Sentinel?", o:["28", "6", "8", "100"], a:0, e:"Per the Sentinel/CZone integration documentation each gateway module gives 28 virtual remote switches." }]
  ]},
  { id:'cz7', title:'Comparing platforms: YachtSense, Empirbus, Naviop, Böning and OEM systems', level:'Advanced', min:14, src:['where_ray','where_azim','czoi'], body:[
    ['p', "The aim is to <b>apply what you know about CZone to any platform</b>. All digital-switching systems have the same parts: output modules, input modules, a data network, a configuration file and an operator interface. They differ in the network used, the tool and what can be done in bypass."],
    ['table', ['Platform', 'What it is', 'Key points for the technician'], [
      ['CZone (BEP / Mastervolt, Navico group)', 'Output/input modules on NMEA 2000', 'DIP addressing; Configuration Tool; ATC fuse bypass; integrates with Mastervolt MasterBus via a bridge; displays on Garmin, Raymarine, Simrad MFDs.'],
      ['Raymarine YachtSense Digital Switching', 'Module stack from Raymarine, shown on Axiom/LightHouse', 'Up to 12 modules stacked on one master; a second bracket is needed above six; 100 A total per stack (Raymarine software history, V5.2.25 in Feb 2026).'],
      ['Empirbus (Garmin)', 'Controller-based digital switching, configured in its own tool', 'Garmin owns Empirbus (Boat Switch, 20 circuits); on Contender 2026 brochure it is paired with an Aegis battery management system.'],
      ['Naviop', 'Italian yacht automation, often paired with Simrad/B&G', 'Central controllers, I/O modules, touchscreens; used on larger yachts.'],
      ['Böning', 'German yacht automation', 'Controller and I/O with its own visualisation; Raymarine LightHouse can display Empirbus, CZone and Böning screens.'],
      ['Builder-specific systems', 'Azimut Neuron (MDP Tech), PLC-based systems (e.g. an ABB AC500 on a 2012 Sunseeker 28 m yacht)', 'Proprietary tools and parts; a service document from the builder is usually needed. Treat as unknown until you see the hardware.']
    ]],
    ['h', 'A platform-independent diagnostic approach'],
    ['steps', ["Identify the platform from the module labels (not from the brochure).", "Power: measure module supply voltage and ground at the module under load.", "Data: check network power, termination and any gateway.", "Address and configuration: does the module match what the system expects?", "Output: measure at the output terminal, then at the load.", "Bypass: know how to force the circuit on without the system, and what protection you lose.", "Record what you changed and keep a copy of the configuration."]],
    ['verify', "This comparison is limited to public information. The Configuration Tools for Empirbus, Naviop and Böning are not part of this course. Do not assume DIP-switch addressing or an ATC fuse bypass exists on a different platform."],
    ['qc', { q:"Which statement is true of any digital-switching platform?", o:["It has output modules, a network, a configuration and a user interface, so the same method applies", "It never needs a configuration file", "Bypass is always an ATC fuse", "All platforms use the same DIP addressing"], a:0, e:"The architecture is common. Details of addressing and bypass vary by product." }]
  ]},
  { id:'cz8', title:'Fault-finding scenario: the circuit that is ON but dead', level:'Advanced', min:12, interactive:true, src:['czoi','czcoi'], body:[
    ['p', "A customer says the anchor light shows ON on the touchscreen but is dark. Use the simulator to find the fault with as few tests as possible. The best answer is found by measuring, not by rebooting."],
    ['int', 'sim:czondead'],
    ['note', "Method: screen state, module LEDs, voltage at the output terminal, voltage at the load, then fuse and connector. A tidy log of your readings is what separates a diagnosis from a guess."],
    ['int', 'match:czone']
  ]}
  ]});
