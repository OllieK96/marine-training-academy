/* Module: Connectivity, integrated solar and lighting. Sources: Starlink Mini spec sheet, Garmin/Volvo MFD manual, Riviera solar article. Lighting: principles only (no maker manual obtained). */
TRAINING.addModule({ id:'conn', title:'Connectivity, Integrated Solar & Lighting', icon:'🛰️',
  summary:'Starlink Mini power and mounting, onboard Wi-Fi and instrument-network separation, IP cameras and PoE, integrated hardtop solar (Praxis) with lithium banks, and marine LED lighting integration.',
  lessons:[
  { id:'cn1', title:'Starlink Mini: power, fusing and environment', level:'Foundation', min:12, interactive:true, src:['slmini'], body:[
    ['p', "Starlink Mini is a small satellite terminal with built-in Wi-Fi that can run from 12 V or 24 V DC. The spec sheet gives the facts you need to wire it."],
    ['table', ['Item', 'Starlink Mini spec sheet'], [
      ['Input rating', '12-48 V DC, 60 W'],
      ['Average power', '25-40 W'],
      ['USB-C power delivery', '100 W (20 V, 5 A) minimum with the Starlink USB-C to barrel jack cable accessory'],
      ['Wi-Fi', 'Wi-Fi 5, dual-band 3x3 MU-MIMO, up to 128 devices, coverage up to 112 m2'],
      ['Ethernet', 'One latching Ethernet port with the Starlink plug; with a standard RJ45 cable the unit is no longer rated IP67'],
      ['Environmental', 'IP67 (with the DC cable and plug installed), -30 to 50 C, operational wind 96 km/h or more'],
      ['Weight', '1.10 kg (1.53 kg with kickstand and 15 m cable)'],
      ['AC power supply (if used)', '100-240 V, 1.6 A, IP66']
    ]],
    ['p', "<b>Worked example</b>: at 60 W a 12 V supply is 5 A and a 24 V supply is 2.5 A (P / V). The average 25-40 W is about 2.1-3.3 A at 12 V. Fuse and cable for the rated 60 W plus a margin; keep the run short because a 12 V cable run loses a larger fraction of its voltage than a 24 V one."],
    ['ul', ["Run it from the house DC supply to avoid an AC power supply (an inverter wastes energy at low load).", "Mount with a clear view of the sky, away from radar and other transmitters, and not in the way of the helm radome.", "Use the Starlink cable and plug; a non-Starlink plug or an exposed RJ45 can remove the waterproofing."]],
    ['where', "Starlink appears on Contender 35ST listings and on many yachts as an owner-fit or builder option. Always treat the install like any other DC load: fuse at the supply, size cable for the run."],
    ['verify', "The spec sheet is for the Starlink Mini. Standard, Gen 3 and Maritime terminals have different power and mounting."],
    ['int', 'match:conn'],
    ['qc', { q:"What does the Starlink Mini spec sheet give as its DC input rating?", o:["12-48 V, 60 W", "5 V, 1 A", "230 V AC only", "12 V, 300 W"], a:0, e:"The Mini accepts 12-48 V DC and is rated 60 W." }]
  ]},
  { id:'cn2', title:'Onboard networks: Wi-Fi, instruments and cameras', level:'Intermediate', min:14, src:['gvolvo','slmini'], body:[
    ['p', "A modern yacht has several networks that look the same but must not be mixed: the <b>guest or internet network</b> (router, Wi-Fi, Starlink), the <b>Marine Network</b> (radar, sonar, video, MFD sync) and <b>NMEA 2000</b> (CAN). Mixing them causes data loss, security exposure and sometimes hardware damage."],
    ['table', ['Network', 'Purpose', 'Rule'], [
      ['Internet / Wi-Fi', 'Crew, guests, apps, updates', 'Router or access point; keep separate from instruments'],
      ['Garmin Marine Network or Raymarine/Simrad Ethernet', 'Radar, sonar, video, shared charts', "Use the maker's cables and switches; do not plug an Ethernet device straight into a plotter: Garmin requires a PoE isolation coupler (P/N 010-10580-10 in the manual)"],
      ['NMEA 2000', 'Instruments, engine data, digital switching', '12 V backbone, two terminators, drop cables']
    ]],
    ['ul', ["<b>IP cameras</b>: most need a network switch or injector and power over Ethernet. Garmin's manual allows up to two video encoders on a Marine Network.", "<b>Updates</b>: updating plotters over a shared network can push settings to other displays.", "<b>Isolation</b>: Ethernet shields and grounds can carry ground loops between equipment; use isolation couplers where the maker requires them."]],
    ['verify', "General design principles. Manufacturer instructions for a specific network take priority."],
    ['qc', { q:"What does Garmin require between an IP camera and a plotter on the Marine Network?", o:["A PoE isolation coupler", "Nothing", "A bigger fuse", "A coax tee"], a:0, e:"Direct connection can damage the plotter and the camera." }]
  ]},
  { id:'cn3', title:'Integrated solar (Praxis) and what it means for the bank', level:'Intermediate', min:14, src:['rivsolar','rivpwr'], body:[
    ['p', "Riviera describes a <b>Praxis</b> 2 mm nano-composite 'solar skin' bonded into the hardtop, optional across the range from April 2026, feeding the house bank through CZone. An example in the Riviera article quotes 1.8 kW of solar giving about 10 kWh a day."],
    ['ul', ["<b>Arithmetic check</b>: 10 kWh / 1.8 kW is about 5.6 equivalent full-power hours a day. Real output depends on sun hours, angle, shading and heat; treat marketing figures as best case.", "<b>MPPT and string voltage</b>: panels are wired in series strings so the open-circuit voltage at cold temperature stays under the MPPT limit (see the Victron PV string designer in the Victron module).", "<b>Shading</b>: a curved hardtop and a mast shadow cut output. Bypass diodes and layout matter.", "<b>Lithium bank</b>: the bank must accept charge (above 0 C) and the BMS may open under high solar voltage; solar charging stops when it does.", "<b>Fire and installation</b>: a solar skin is a roof laminate, so cable routing, fusing at the controller and a DC isolator are still required."]],
    ['where', "Praxis integrated solar is described on Riviera options. Many other boats use framed panels on the hardtop. Whatever the panel type, the controller, fuses and isolation are as in the Victron PV module."],
    ['verify', "Praxis wiring detail, MPPT model and voltage were not found in public sources; the production figures are marketing claims from Riviera's press pages."],
    ['qc', { q:"What does 1.8 kW giving 10 kWh a day imply?", o:["About 5.6 full-power hours per day", "24 hours of full power", "Nothing: the claim cannot be checked", "That the system is 10 kW"], a:0, e:"10 kWh divided by 1.8 kW is about 5.6 hours." }]
  ]},
  { id:'cn4', title:'Marine LED lighting integration (Lumitec and similar)', level:'Intermediate', min:12, src:['where_riv','where_cont'], body:[
    ['p', "Yachts use LED courtesy, navigation and underwater lights from makers such as Lumitec, OceanLED or Aqualuma. Public sources show Lumitec SeaBlaze underwater lights on Riviera specifications and Lumitec light bars on Everglades; Maritimo's M75 specification lists Aqualuma blue underwater lights. No maker manual is included in this course, so only general principles are taught."],
    ['ul', ["<b>Supply</b>: LED lights have wide input ranges but must be fed through the right fuse and dimmer. Check each product label for voltage and current.", "<b>Dimming</b>: PWM dimmers can cause flicker or radio and sonar noise. Confirm the dimmer type is supported by the light.", "<b>Control</b>: lights may be switched by CZone or another digital switching outputs, or by their own controller; know which.", "<b>Voltage drop</b>: long cables to underwater lights reduce brightness and cause colour changes.", "<b>Underwater lights</b> through hulls need correct bonding and sealing; follow the maker's installation instructions.", "<b>Interference</b>: cheap LED drivers can affect VHF and AM; use marine-rated products and keep wiring away from antenna cables."]],
    ['verify', "Product-specific wiring, colours and control protocols for Lumitec and others are not documented here. Use the manufacturer's installation manual."],
    ['qc', { q:"Why can PWM-dimmed LED lights cause problems?", o:["They can create flicker or radio and sonar noise", "They use more power", "They cannot be dimmed", "They always melt cables"], a:0, e:"PWM switching noise can couple into sensitive electronics." }]
  ]}
]});
