/* Module: Lithium house banks (LiFePO4): Fusion Pulse / LFP24-100P and Mastervolt MLI. Extends, does not repeat, the Mastervolt and Battery modules.
   Sources: LFP24-100P datasheet (distributor copy), Riviera lithium article, Mastervolt MLI manuals (see module mastervolt m4, m9). */
TRAINING.addModule({ id:'lith', title:'Lithium House Banks: Fusion Pulse, Mastervolt MLI & BMS Behaviour', icon:'🔋',
  summary:'LiFePO4 on yachts: reading a lithium datasheet, built-in BMS limits, 24 V banks, charging from shore, alternator and solar, what happens when a BMS opens, and how lithium interacts with thrusters, gyros and inverters.',
  lessons:[
  { id:'li1', title:'LiFePO4 on a boat: what is different from lead-acid', level:'Foundation', min:12, src:['fuslfp','rivli'], body:[
    ['p', "Lithium iron phosphate (LiFePO4) batteries are now fitted as house banks on many yachts. They are lighter, tolerate deep discharge and charge fast, but they behave differently from lead-acid in ways that matter to a technician."],
    ['where', "Fusion Pulse LiFePO4 batteries with a built-in BMS are described on Riviera yachts (house bank, 24 V), Mastervolt lithium with its own BMS is described on the Maritimo M75, and Mastervolt is Princess's power-electronics supplier, and Contender lists an Aegis battery management system with Empirbus switching. Boston Whaler lists lithium as an option. The same rules apply to every product."],
    ['table', ['Topic', 'Lead-acid', 'LiFePO4'], [
      ['Voltage curve', 'Slopes down with state of charge, so voltage hints at SoC', 'Very flat for most of the range, so voltage is a poor SoC gauge: use a shunt-based monitor'],
      ['Charge temperature', 'Charges in the cold, with reduced voltage', 'Must not charge below 0 C (the LFP24-100P datasheet gives 0 to 55 C for charge)'],
      ['Protection', 'Fuse and charger settings', 'A BMS that can disconnect the battery output or input'],
      ['Charging', 'Bulk, absorption, float', 'Constant current then constant voltage; float is not required'],
      ['Weight', 'Heavy', 'About 40% of the weight of a comparable lead-acid battery (datasheet claim)'],
      ['Failure modes', 'Gradual capacity loss', 'Sudden disconnect by the BMS when a limit is passed']
    ]],
    ['ul', ["<b>The BMS is part of the electrical system.</b> It can open at over-voltage, over-discharge, over-current or over-temperature. Riviera's own education article states each battery has a built-in BMS that disconnects on over-discharge or over-voltage.", "<b>Nominal cell voltage is 3.2 V</b>, so a '24 V' battery has eight cells in series and a nominal 25.6 V. Lead-acid '24 V' is two 12 V batteries in series at 24 V nominal. Chargers, alternator regulators and inverter low-voltage cut-offs need lithium settings.", "<b>Thermal runaway risk is lower</b> in LiFePO4 than in other lithium chemistries, but a fire in a lithium bank is still hard to put out. Follow the maker's installation instructions."]],
    ['safety', "Do not bypass a BMS or connect a bank to a charge source with settings for a different chemistry. Never charge lithium below 0 C unless the battery has a heater and the maker allows it."],
    ['qc', { q:"Why is battery voltage a poor way to read state of charge on LiFePO4?", o:["The voltage curve is flat across most of the charge range", "Lithium has no voltage", "The voltage rises as it discharges", "The BMS fixes the voltage"], a:0, e:"The flat curve means a shunt (coulomb counter) is needed for state of charge." }]
  ]},
  { id:'li2', title:'Reading a lithium datasheet: the LFP24-100P as a worked example', level:'Intermediate', min:14, interactive:true, src:['fuslfp'], body:[
    ['p', "Datasheet numbers are often misread. The LFP24-100P datasheet on file is a distributor (Brava) copy of the 25.6 V 100 Ah LiFePO4 battery; the Fusion Pulse range is a rebadged item of this type. Use it as a model, then check the maker's current sheet for the battery on the boat."],
    ['table', ['Item (datasheet)', 'Value', 'What it means on a boat'], [
      ['Rated voltage', '25.6 V', 'Eight cells in series'],
      ['Nominal capacity', '100 Ah (2560 Wh at C5)', 'Energy is voltage x amp hours: 25.6 x 100 = 2.56 kWh'],
      ['Charge voltage', '28.8 V (29.2 V cut-off)', 'Set a 24 V charger or alternator regulator accordingly'],
      ['Charge current', '20 A (50 A maximum)', 'A single battery cannot absorb a large charger alone; add batteries in parallel'],
      ['Rated discharge current', '50 A (100 A maximum), 200 A for less than 3 s', 'A single battery cannot run a big thruster or inverter surge'],
      ['Discharge cut-off', '20 V', 'The BMS opens or the inverter shuts down near here'],
      ['Charge temperature', '0 to 55 C', 'No charging in freezing conditions'],
      ['Discharge temperature', '-20 to 60 C', 'Wider than charge range'],
      ['Weight', 'About 21.9 kg', 'Used for weight and balance'],
      ['Cycle life', '>2000 cycles at 1C, 100% DOD', 'A manufacturer figure under test conditions']
    ]],
    ['p', "<b>Worked example.</b> A bank of four of these in parallel is 25.6 V, 400 Ah, about 10.2 kWh. At the datasheet's rated discharge of 50 A each it can supply 200 A continuously (about 5 kW at 25.6 V); at the 100 A maximum each it can supply 400 A (about 10 kW). Charging at the 20 A normal rate each is 80 A (about 2 kW). These are arithmetic from the datasheet, not a design: the BMS, cable and protection decide the real limits."],
    ['int', 'match:lithspec'],
    ['verify', "The datasheet is generic and from a distributor. Whether Fusion's current Pulse product has the same figures, a CAN or NMEA 2000 interface, or parallel limits is not confirmed here. A distributor copy is not a Fusion Pulse owner manual."],
    ['qc', { q:"How much energy does a 25.6 V 100 Ah battery store?", o:["About 2.56 kWh", "About 100 kWh", "About 25.6 kWh", "About 256 Wh"], a:0, e:"25.6 V x 100 Ah = 2,560 Wh." }]
  ]},
  { id:'li3', title:'BMS behaviour: what opens, when, and what else it takes with it', level:'Intermediate', min:14, interactive:true, src:['fuslfp','rivli'], body:[
    ['p', "A BMS protects cells by opening a contactor or MOSFET output. When it does, everything on the bank loses its battery at once. Learn the common triggers and what each load does in response."],
    ['table', ['Trigger', 'Example on a yacht', 'Result'], [
      ['Over-current', 'Thruster, windlass, inverter surge or short circuit above the BMS limit', 'Output opens for a time, then recovers; load appears to cut out'],
      ['Over-voltage', 'Charger or alternator regulator set too high, or a regulation fault', 'Charge path opens; charge source can fail if it needs a battery to hold the voltage'],
      ['Over-discharge', 'Flat bank after long anchoring', 'Output opens near the cut-off voltage (20 V for the example datasheet)'],
      ['Over-temperature / under-temperature', 'Hot engine room, charging below 0 C', 'Charge or discharge is disabled']
    ]],
    ['ul', ["<b>Alternators</b>: an alternator running into an opened battery can produce a voltage spike. Use regulators and DC-DC chargers that are designed for lithium and for BMS disconnects, as in the Mastervolt Alpha Pro III lesson (m10) and the Victron DC-DC lessons.", "<b>Inverters</b>: a lithium low-voltage cut-off set for lead-acid will either shut early or let the BMS open first.", "<b>Digital switching and monitors</b> that were running on the bank go dark, which can look like a network fault.", "<b>Gyros and thrusters</b>: the Seakeeper manuals contain battery state-of-charge logic for lithium on supported models (see the Seakeeper module); thrusters need a bank rated for their peak current (see thruster lesson p9)."]],
    ['note', "Mastervolt MLI Ultra batteries report safety events over MasterBus. See Mastervolt lesson m9 for the events and DIP switches."],
    ['int', 'sim:bmsdrop'],
    ['qc', { q:"A bank's BMS opens during a thruster burst. What is the most useful first check?", o:["Compare the thruster's peak current with the battery's surge and maximum current ratings", "Replace the thruster motor", "Raise the charger voltage", "Fit a bigger fuse"], a:0, e:"The thruster peak current may exceed the battery's discharge ratings, so the BMS trips." }]
  ]},
  { id:'li4', title:'Charging lithium: shore, alternator, solar and DC-DC', level:'Intermediate', min:14, src:['fuslfp','mli3','malpha'], body:[
    ['p', "Every charge source must be set for lithium and must not exceed the bank's acceptance. Think of them as a list: shore charger or inverter/charger, alternator or DC-DC, solar MPPT, generator charger."],
    ['ul', ["<b>Charge profile</b>: constant current to the charge voltage, then constant voltage as the current tapers. The LFP24-100P example gives 28.8 V as the charge voltage and a taper to about 0.02 C. Float is not required; if the charger offers a lithium profile use it.", "<b>Charge current</b>: add up what all sources can deliver at once. With four example batteries (20 A normal charge each) that is 80 A; solar, shore and alternator together can exceed it.", "<b>Alternators</b>: a lithium bank accepts the full alternator output continuously and may overheat a standard alternator. Use an alternator regulator with current limiting, or a DC-DC charger.", "<b>Temperature</b>: do not charge below 0 C (example datasheet). Have a low-temperature charge disable in the BMS or the charger.", "<b>Settings change between chemistries</b>: see Victron DVCC (vic-gx) and Mastervolt MLI (m9) for examples of lithium communication from the BMS to the chargers."]],
    ['tip', "After a 'lithium upgrade', read back every charge source's setting. A forgotten lead-acid float or equalise setting is the most common cause of a lithium over-voltage."],
    ['verify', "Charge limits come from the example datasheet and the cross-referenced manuals. Use the datasheet for the actual battery fitted."],
    ['qc', { q:"What must be checked on every charge source after fitting a lithium bank?", o:["That its profile and current limit match the lithium battery", "That it is the same brand", "That it has a float stage", "That it is 12 V"], a:0, e:"Each source needs lithium settings and a current limit." }]
  ]},
  { id:'li5', title:'24 V banks, paralleling and cable design', level:'Advanced', min:14, src:['fuslfp','rivli'], body:[
    ['p', "Yacht house banks are often 24 V. Riviera's house battery is described as 24 V in its education articles. A US-market 4600 listing shows four 24 V 100 Ah lithium batteries. A 24 V bank halves the current for a given power compared with 12 V, which reduces cable size and voltage drop."],
    ['ul', ["<b>Parallel batteries</b>: use equal cable lengths and a common busbar so that each battery shares current equally, and follow the maker's limit on the number of batteries in parallel.", "<b>Fusing</b>: fuse each battery or each parallel string and use a fuse (Class T is common for lithium) with a high enough interrupt rating for lithium's short-circuit current.", "<b>Series connection</b>: only batteries designed for series operation should be wired in series, and they must be balanced before connection.", "<b>Isolation</b>: a main isolator that a BMS cannot override gives a safe way to work on the bank.", "<b>Voltage drop</b>: calculate it for the peak load. A 24 V 340 A thruster on a 6 m run needs a cable chosen from the thruster maker's chart, not a rule of thumb."]],
    ['table', ['Bank example', 'Voltage', 'Capacity', 'Energy'], [
      ['1 x LFP24-100P', '25.6 V', '100 Ah', '2.56 kWh'],
      ['2 in parallel', '25.6 V', '200 Ah', '5.12 kWh'],
      ['4 in parallel', '25.6 V', '400 Ah', '10.24 kWh']
    ]],
    ['verify', "Parallel and fuse requirements come from the manufacturer's installation manual, which was not available for the Fusion Pulse range. Read the manual for the actual battery."],
    ['qc', { q:"Why do yachts use 24 V banks?", o:["For a given power the current is half that of 12 V, so cables are smaller and voltage drop is lower", "Because 24 V batteries are lighter", "Because 12 V does not exist", "Because lithium needs 24 V"], a:0, e:"Power = V x I. Doubling voltage halves current." }]
  ]},
  { id:'li6', title:'Fault-finding lithium systems', level:'Advanced', min:12, src:['fuslfp'], body:[
    ['p', "Most lithium faults are system faults, not cell faults. Work from the symptom to the layer: BMS state, charge source settings, wiring, then the load."],
    ['table', ['Symptom', 'First checks'], [
      ['Everything on the bank goes dead suddenly', 'BMS state or LED, over-current event, battery temperature and the last load that started'],
      ['Charger does not charge', 'Charge temperature, BMS charge permission, charger profile, charge voltage vs bank voltage'],
      ['Bank looks full but runs out quickly', 'Shunt calibration, battery capacity setting, hidden parasitic loads, SoC reset'],
      ['Inverter shuts down early', 'Low voltage cut-off setting, voltage drop in cables under load, BMS limit'],
      ['Thruster weak or stops', 'Bank current rating, BMS over-current, cable length and voltage at the motor under load (lesson p9)'],
      ['Alternator overheats', 'Current limiting or DC-DC charger fitted for lithium']
    ]],
    ['steps', ["Measure battery voltage and read the BMS or monitor state.", "Check what was running and the temperature.", "Measure voltage at the load while it runs.", "Check every charge source's profile and current limit.", "Verify with the shunt monitor: record state of charge and current before and after.", "Record the findings, and the BMS events if the BMS provides them."]],
    ['qc', { q:"What should you measure first when the bank goes dead suddenly?", o:["The state of the BMS and the voltage at the battery terminals", "The thruster motor winding", "The charger firmware", "The bilge pump"], a:0, e:"The BMS may have opened, so the bank's terminals can be at 0 V while the cells are fine." }]
  ]}
]});
