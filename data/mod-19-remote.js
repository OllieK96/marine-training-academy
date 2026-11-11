/* Module: Remote monitoring and telematics (Siren Marine, Sentinel, Princess Connect, Whaler Watch / Nautic-On, Azimut Neuron).
   Sources: Siren Marine MTC setup guide, Siren CZone configuration documents, Sentinel support pages. Other platforms: builder pages only. */
TRAINING.addModule({ id:'remote', title:'Remote Monitoring & Telematics: Siren, Sentinel and Friends', icon:'📡',
  summary:'What a telematics unit does, how it is wired (always-on supply, inputs, outputs), how it uses NMEA 2000 and CZone for data and remote switching, and how to fault-find a boat that cannot be reached.',
  lessons:[
  { id:'rm1', title:'What telematics does and why the wiring matters', level:'Foundation', min:12, src:['sirmtc','sentmon'], body:[
    ['p', "A telematics unit is a small computer with a cellular modem and GPS. It watches sensor inputs and boat networks and sends alerts to an app. Its usefulness depends entirely on <b>power, signal and wiring</b>, not on the app."],
    ['where', "Sentinel is included with new Riviera yachts and replaced Siren Marine in Riviera's materials (reason not stated). Siren Marine is fitted to Pursuit and other US boats. Princess Connect is the standard telemetry on new Princess yachts; Whaler Watch (Faria Beede telematics) and Nautic-On appear on Boston Whaler; Azimut's own Neuron system includes remote diagnostics. The principles are the same: identify the gateway from its label."],
    ['ul', ["<b>Always-on supply</b>: the Siren MTC guide says to connect directly to the battery (or a 24/7 circuit powered by it) with a 5 A fuse and not to wire it to the switched side. The MTC runs on 10-30 V DC, so 12 V and 24 V boats are both supported.", "<b>Back-up battery and sleep</b>: the MTC has an internal 3000 mAh lithium-polymer back-up battery; it draws less than 20 mA at 12 V when asleep on the network and 70 mA during active tracking (MTC guide).", "<b>Inputs</b>: the MTC has seven digital inputs, five analogue inputs and two 1-wire temperature inputs; its operating temperature is -22 to 167 F when on primary power.", "<b>Cloud and subscription</b>: the unit reports to a cloud service. The guide gives subscription prices that are old; check the current plan."]],
    ['verify', "The Siren MTC guide on file is an early document (it mentions 3G and sensors to be released in 2017). Later Siren hardware and the Sentinel hardware may differ, so use this lesson for principles and check the current guide for the unit installed."],
    ['qc', { q:"How should a Siren MTC be powered according to its setup guide?", o:["Directly from the battery or a 24/7 circuit through a 5 A fuse, not the switched side", "From the ignition switch", "From the shore power inlet", "From a USB port"], a:0, e:"The MTC needs permanent power for GPS, cellular and charging its back-up battery." }]
  ]},
  { id:'rm2', title:'Siren MTC terminals: inputs, outputs and sensors', level:'Intermediate', min:14, interactive:true, src:['sirmtc'], body:[
    ['table', ['Terminal', 'Use (MTC guide)', 'Wiring rule'], [
      ['BATT 1+ / NEG / 2+', 'Power and monitoring of up to two batteries', 'Battery 2 shares the NEG; fuse the supply'],
      ['IGNITION', 'Engine on/off and engine hours', 'Looks for positive voltage from the ignition switch'],
      ['ARM/DIS', 'Manual arm and disarm switch', 'Switch to the negative'],
      ['SECURITY 1 and 2', 'Motion sensors, reed switches, canvas snaps', 'Sensor to the input and ground'],
      ['HIGH WATER', 'Bilge high-water alert', 'Normally open float closing to ground'],
      ['SHORE PWR', 'Shore power present or lost', 'Siren PAM-1 AC relay on the positive leg or a shore power sensor plug'],
      ['ENGINE HRS (Engine 2)', 'Second engine hours', 'Normally open switch to ground (best from an oil pressure switch); use a PAM-4 relay from a positive source'],
      ['TEMP 1', 'Temperature probe', 'White wire to TEMP1+, red to TEMP1-; the red and white are data and ground, not positive and negative'],
      ['OUTPUT 1 / 2 / 3', 'Remote control of devices', 'Maximum 1 A each; use an external relay for pumps, HVAC or fridges'],
      ['BL SEA ON / OFF', 'Remote battery switch', 'Orange wire to ON and brown wire to OFF on a Blue Sea remote switch'],
      ['BILGE P1 / P2', 'Bilge pump activity', 'Positive side of the pump or the helm indicator light']
    ]],
    ['tip', "Wiring a positive signal to a ground-triggered input (or the reverse) is the commonest installation mistake. Always check which polarity the input wants."],
    ['safety', "Do not use a telematics output to switch a bilge pump or any load above its 1 A rating directly. Remote control of a battery switch or pump can create hazards if the vessel is unattended; configure with care."],
    ['int', 'match:siren'],
    ['qc', { q:"What is the maximum current rating of each MTC output?", o:["1 A", "30 A", "100 mA", "10 A"], a:0, e:"The guide specifies 1 A and recommends external relays for larger loads." }]
  ]},
  { id:'rm3', title:'NMEA 2000, CZone and remote switching', level:'Advanced', min:16, interactive:true, src:['sircz','sircr','sentcz'], body:[
    ['p', "Remote switching of a CZone boat works through the NMEA 2000 backbone. The telematics unit must be on the same bus as the CZone modules, and the bus must stay powered when the boat is unattended."],
    ['ul', ["<b>Third-party operation</b>: CZone modules that are not configured for third-party operation are invisible to the Siren unit (Siren CZone guide). At least one OI (or interface) must be configured for third-party mode, creating a virtual OI.", "<b>PGNs</b>: CZone OI broadcasts its status with standard PGN 127501 and accepts commands with PGN 127502; the virtual switch bank provides up to <b>28 circuits or modes</b>.", "<b>Firmware</b>: the Siren guide asks for OI firmware of at least 6.17.17.0. The Sentinel pages describe 28 virtual remote switches per CZone interface (SI, COI, OI, C6, C1) and state that a licence is needed.", "<b>Virtual switch group</b>: in the CZone Configuration Tool, Third-Party Devices > Switch Bank PGN Control > Add; name it, pick a module, choose a unique Switch Bank Instance from 0 to 252 and enable advanced remote switch functions.", "<b>Limitations in the guide</b>: no dimming through the Siren unit (on/off and modes only), CZone alarm conditions are not detected, and the circuit name list can contain circuits that do not exist, so the app must hide them.", "<b>Terms</b>: a <i>load</i> is one output switch, a <i>circuit</i> maps to one or more loads, and a <i>mode</i> is a set of circuit states that can only be activated, not switched off."]],
    ['h', 'In the app (Siren guide, app version 01.18.x build 345 or higher)'],
    ['ul', ["Once the unit first sends CZone data, the Commands tab becomes Switching and Digital Switches appears in the settings.", "Circuits are listed with their CZone label; unconfigured ones show as Circuit-XXXXX-YYYY-ZZ. Each can be toggled on or marked as a mode.", "A mode command gives a 10 second cancel bar; only one mode can be active at a time; the app tries for up to 60 seconds before a timeout error.", "Editing a name in the app does not change it on the boat."]],
    ['verify', "Firmware numbers and app versions are taken from the Siren documents and Sentinel pages as published. The Sentinel's refresh interval (about 20 minutes when stationary) comes from Sentinel's monitoring overview and may change."],
    ['int', 'sim:sirnoswitch'],
    ['qc', { q:"Which PGNs does a CZone OI use to share state with a third-party device?", o:["127501 (status) and 127502 (commands)", "129029 and 129038", "126992 only", "None"], a:0, e:"Standard switch bank PGNs 127501 and 127502." }]
  ]},
  { id:'rm4', title:'Sentinel, Princess Connect, Whaler Watch and other platforms', level:'Intermediate', min:12, src:['sentmon','rivsent','where_prin','where_bw','where_azim'], body:[
    ['p', "Builders offer their own branded remote systems. Treat each as a product: find the gateway, its power, its inputs and how it talks to the boat."],
    ['table', ['Platform', 'What public sources say', 'What to confirm on the boat'], [
      ['Sentinel (Riviera)', 'Cellular boat monitor, connects to NMEA 2000, needs CZone remote-switch configuration and a licence. Features include battery voltage, bilge, shore power loss, tank levels, saloon motion, geo-fence and anchor-drag alerts. Integrates with the engine management on Volvo Penta or MAN yachts.', 'Where the gateway is, its supply, the NMEA 2000 connection, CZone third-party configuration, licence status'],
      ['Siren Marine', 'Cellular units with wired and wireless sensors, GPS and CZone/NMEA 2000 integration.', 'Which unit and software version'],
      ['Princess Connect', 'Standard telemetry on new Princess yachts: remote monitoring, maintenance alerts and digital manuals. The telemetry hardware supplier is not stated publicly.', 'Identify the hardware from labels'],
      ['Whaler Watch / Nautic-On', 'Telematics options on Boston Whaler: cellular or satellite, geo-fence; Mercury also offers VesselView Mobile with dealer notification.', 'Which system, its supply and the engine connection'],
      ['Azimut Neuron', 'Own digital yacht management system with remote diagnostics, developed with MDP Tech.', 'Needs the builder service documents']
    ]],
    ['verify', "Only the Sentinel and Siren Marine entries have vendor documents in this course. The others come from builder pages and press material, so the architecture is not documented here."],
    ['qc', { q:"What is the first step when you meet an unfamiliar remote monitoring system?", o:["Identify the gateway hardware from its label and trace its power and connections", "Delete the app", "Cut its antenna", "Assume it is Sentinel"], a:0, e:"Brand names change; hardware labels and wiring tell you what it is." }]
  ]},
  { id:'rm5', title:'Fault-finding: boat unreachable or switches missing', level:'Advanced', min:12, src:['sirmtc','sircz','sentcz'], body:[
    ['table', ['Symptom', 'Likely cause', 'Check'], [
      ['Unit offline', 'Power loss, flat battery, no cellular coverage, expired plan', 'Fuse, always-on supply voltage, antenna, plan status'],
      ['No GPS fix', 'Internal antenna blocked, unit enclosed in metal', 'Position and external antenna option (SMA)'],
      ['Alerts false or missing', 'Input polarity or threshold wrong', 'Test each input against the table in lesson rm2'],
      ['No Switching tab', 'CZone not configured for third-party operation', 'Third-party virtual switch group, firmware, NMEA 2000 bus power'],
      ['Mode or circuit does not respond', 'Command timeout, mode override, bus power off', 'Retry, check bus power when unattended, check the mode state'],
      ['Shows circuits that do not exist', 'NMEA 2000 limitation', 'Hide unused entries in the app']
    ]],
    ['qc', { q:"A boat is unreachable. Which should you check first?", o:["Power at the unit and the fuse", "The paint colour", "Engine oil", "The anchor"], a:0, e:"No power means no cellular or GPS." }]
  ]}
]});
