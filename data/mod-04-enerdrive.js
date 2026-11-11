TRAINING.addModule({ id:'enerdrive', title:'Enerdrive', icon:'🟧',
  summary:'Australian-designed power systems: ePOWER inverter-chargers, ePRO battery monitoring, DC2DC alternator charging and B-TEC lithium batteries.',
  lessons:[
  { id:'e1', title:'Enerdrive system overview', level:'Foundation', min:10, interactive:true, body:[
    ['p', "Enerdrive is an Australian brand of power-management products widely used in marine, RV and off-grid installations. A typical Enerdrive marine system combines an <b>ePOWER inverter-charger</b>, <b>B-TEC lithium batteries</b>, an <b>ePRO battery monitor</b>, a <b>DC2DC charger</b> for alternator charging and often a solar regulator, connected through fused DC distribution."],
    ['int', 'hot:enerdrive'],
    ['table', ['Component', 'Function', 'Typical points to check'], [['ePOWER inverter-charger', 'Inverts battery DC to 230 V AC, charges from shore/generator, passes AC through', 'AC input limits, charger profile, battery type selection, overload alarms'], ['B-TEC lithium battery', 'LiFePO4 storage with internal BMS', 'BMS status, voltage, temperature, connection torque'], ['ePRO battery monitor', 'Measures volts, amps and Ah to estimate state of charge', 'Shunt wiring, capacity and chemistry settings'], ['DC2DC', 'Charges house battery from engine alternator or starter battery', 'Ignition/enable input, cable size, profile'], ['Solar regulator', 'MPPT charge control', 'PV voltage, current rating, profile']]],
    ['note', "Model names, features and settings vary by product generation. This module covers the common principles. <b>Always use the current Enerdrive manual and datasheet for the exact unit.</b>"],
    ['tip', "Because Enerdrive products are built for Australian conditions, you will often meet them on retrofits to older boats. Spend time on the existing cable sizes and fusing – upgrades often expose weak cables."],
    ['qc', { q:"Which Enerdrive device charges the house battery from the alternator?", o:["ePRO", "DC2DC", "B-TEC", "ePOWER only"], a:1, e:"The DC2DC is a DC-DC charger used for alternator charging." }]
  ]},
  { id:'e2', title:'ePOWER inverter-chargers', level:'Foundation', min:12, body:[
    ['p', "An inverter-charger combines battery charging, DC to AC inversion and automatic AC pass-through in one unit. The ePOWER range follows this pattern, with sizes suited to everything from small cruisers to larger yachts."],
    ['h', 'Core functions'],
    ['ul', ["<b>Charging:</b> multi-stage charging with selectable battery profiles (e.g. AGM, lithium). Select the profile that matches the battery.", "<b>Inverting:</b> pure sine-wave output to run appliances. Check the continuous rating and surge rating against loads such as air-conditioning compressors.", "<b>Pass-through and transfer:</b> when shore or generator power is available it is passed to the loads; when it disappears the unit transfers to inverter mode.", "<b>Input current limit:</b> the unit should be set to match the shore supply so it does not trip the breaker."]],
    ['h', 'Installation principles'],
    ['ul', ["Use the DC cable size and fuse specified by the manufacturer. Inverter input current is large – at 12 V a 3000 W inverter can draw around 280 A.", "Keep DC cables short, equal length and well supported.", "Connect AC input and output as directed; the unit should be installed with an RCD protecting the AC output circuits.", "Ensure ventilation around the unit; inverters create heat when loaded.", "Fit a DC isolator and fuse as close to the battery as practical."]],
    ['tip', "If the inverter keeps tripping on low voltage, measure battery voltage right at the inverter DC terminals while it is loaded. Voltage drop in cables or poor lugs is a far more common cause than a failing inverter."],
    ['safety', "The AC output can be live even if shore power is removed. Isolate DC and AC before opening panels or working on AC wiring."],
    ['qc', { q:"What is a typical symptom of insufficient DC cable size on an inverter?", o:["Low voltage shutdown under load", "Higher AC frequency", "More battery capacity", "Better charging"], a:0, e:"Voltage drop on the DC cable makes the inverter see low voltage when loaded." }]
  ]},
  { id:'e3', title:'ePRO monitoring and DC2DC charging', level:'Intermediate', min:12, body:[
    ['h', 'Battery monitoring'],
    ['p', "A battery monitor works by measuring current through a <b>shunt</b> placed in the negative cable and integrating it over time. Setup requires the battery capacity, chemistry and a full-charge reference. The ePRO range provides this information on a display or app."],
    ['ul', ["All DC negatives must return through the shunt, otherwise measured current is wrong.", "Calibrate capacity and charged parameters when installing or replacing batteries.", "Use the monitor's alarms (low voltage, low SoC) to protect battery and loads."]],
    ['h', 'DC2DC chargers'],
    ['p', "A DC2DC charger takes power from the starter battery or alternator and provides a controlled charge to the house battery. It protects the alternator and makes a proper multi-stage charge possible, even when the alternator output voltage is below what the battery needs."],
    ['ul', ["<b>Isolation:</b> keeps the starter battery safe from house loads.", "<b>Current limit:</b> prevents overloading the alternator; check the maximum permitted draw.", "<b>Profile selection:</b> set the profile to match the battery chemistry.", "<b>Enable signal:</b> many units need an ignition-switched signal so they only operate when the engine is running."]],
    ['spec', 'DC2DC installation checklist', [['Input cable', 'Sized for input current with minimal voltage drop (keep it short)'], ['Fuse', 'Fitted at the source battery/alternator end and on the output, as the manual specifies'], ['Output cable', 'Sized for charge current to the house bank'], ['Earth/negative', 'Direct to battery negative or common bus, not a chassis point']]],
    ['tip', "Measure the voltage at the DC2DC input terminals while the engine runs at fast idle. If it is far below the alternator output, you have a cable or connection problem."],
    ['qc', { q:"Why must all DC negatives pass through the shunt?", o:["So the monitor sees all current in and out", "To reduce cable cost", "To increase voltage", "To reduce noise"], a:0, e:"Any current that bypasses the shunt is not measured, so SoC will be wrong." }]
  ]},
  { id:'e4', title:'B-TEC lithium batteries and system integration', level:'Advanced', min:14, body:[
    ['p', "Enerdrive B-TEC lithium batteries are LiFePO4 units with a built-in BMS. The BMS protects the battery, and the system around it must respect its limits."],
    ['h', 'Integration principles'],
    ['ul', ["<b>Charge sources:</b> every charger (inverter-charger, DC2DC, solar) must be set to the lithium profile and voltages given in the battery documentation.", "<b>Alternator charging:</b> use a DC2DC or other current-limiting device so the alternator is not overloaded.", "<b>Low-temperature charging:</b> the BMS may disconnect charging below freezing – plan for this in cold climates.", "<b>Parallel and series limits:</b> follow the maximum number of batteries and the manufacturer's connection rules.", "<b>Fusing:</b> use a fuse with an adequate interrupt rating (such as Class T) close to the battery."]],
    ['h', 'Commissioning checklist'],
    ['steps', ["Verify battery voltage and state before connecting.", "Check torque and polarity of all connections.", "Program all chargers with lithium profiles.", "Set the battery monitor parameters (capacity, chemistry).", "Test inverter, DC2DC and solar charging; monitor current and temperature.", "Record settings and photographs for your service file."]],
    ['h', 'Fault-finding hints'],
    ['ul', ["<b>No output from battery:</b> BMS may have disconnected – check for under-voltage, over-current or temperature, and use the manufacturer's reset procedure.", "<b>Battery not charging:</b> check charge profile and voltage, BMS charge disconnect, fuse and cable continuity.", "<b>Low capacity:</b> check for unbalanced cells (BMS data) and whether SoC in the monitor is correct."]],
    ['safety', "Never connect a lithium battery with a different state of charge directly in parallel with another bank without following the maker's procedure; large equalising currents can occur."],
    ['qc', { q:"Why is a Class T fuse often recommended near a lithium battery?", o:["Very high interrupt rating", "It is cheap", "It acts as a switch", "It filters noise"], a:0, e:"Lithium banks can deliver extreme fault current, so the fuse must safely interrupt it." }]
  ]}
]});
