TRAINING.addModule({ id:'mastervolt', title:'Mastervolt', icon:'🟩',
  summary:'Mass Combi inverter-chargers, ChargeMaster, MasterBus networking, MLI Ultra lithium, Alpha Pro alternator regulators and DC distribution.',
  lessons:[
  { id:'m1', title:'Mastervolt system overview', level:'Foundation', min:10, interactive:true, body:[
    ['p', "Mastervolt (Netherlands) specialises in marine and mobile power. A typical Mastervolt installation uses a <b>Mass Combi</b> inverter-charger, one or more <b>ChargeMaster</b> chargers, <b>MLI Ultra</b> lithium batteries or lead-acid banks, a <b>MasterShunt</b> battery monitor, an <b>Alpha Pro</b> alternator regulator and a <b>MasterBus</b> network that connects them all to displays."],
    ['int', 'hot:mastervolt'],
    ['table', ['Product', 'Function'], [['Mass Combi', 'Inverter, charger and transfer switch in one'], ['ChargeMaster', 'Multi-output battery charger'], ['Alpha Pro', 'External alternator regulator with multi-stage charging'], ['MasterShunt', 'Battery monitor with MasterBus interface'], ['MLI Ultra', 'Lithium-ion battery with integrated BMS and communications'], ['EasyView / MasterView', 'Display and control panels for MasterBus']]],
    ['note', "Features differ between models and software revisions. <b>Always use the Mastervolt manual for the exact device</b> and the MasterAdjust software to see what settings your model supports."],
    ['tip', "Most Mastervolt gear defaults to safe settings, but battery type must be set correctly. A wrong battery profile is the number one cause of problems."],
    ['qc', { q:"What network do Mastervolt devices use to communicate?", o:["MasterBus", "VE.Can", "NMEA 0183", "Wi-Fi only"], a:0, e:"MasterBus is Mastervolt's CAN-based network." }]
  ]},
  { id:'m2', title:'Mass Combi and ChargeMaster', level:'Foundation', min:12, body:[
    ['p', "The <b>Mass Combi</b> combines an inverter, a charger and an AC transfer switch. The <b>ChargeMaster</b> is a dedicated battery charger, often with three outputs for house, start and thruster batteries."],
    ['h', 'Mass Combi features'],
    ['ul', ["<b>Shore current limit:</b> the unit adjusts charging or uses battery power to stay within the shore supply limit.", "<b>Power Support:</b> the inverter adds power from the battery when AC demand exceeds the supply.", "<b>Charge profiles:</b> multi-stage charging for lead-acid and lithium types with selectable voltage.", "<b>Parallel / three-phase options:</b> some models can be combined to increase output.", "<b>Remote control and display:</b> via MasterBus panels."]],
    ['h', 'ChargeMaster basics'],
    ['ul', ["Multiple outputs let one charger look after several battery banks, with a lower current on the secondary outputs.", "Battery type selection matters: choose the setting that matches each bank.", "Use the temperature sensor if supplied so charge voltage is compensated for temperature."]],
    ['h', 'Installation principles'],
    ['ul', ["Use the cable size and fuse sizes given in the manual.", "Keep cables short and tight, with good terminations.", "Allow ventilation; keep the unit away from heat sources and wet areas.", "Protect AC circuits with an RCD and correct overcurrent protection."]],
    ['safety', "AC output may be live from inverter mode even with shore power disconnected. Isolate the DC supply before servicing."],
    ['qc', { q:"What is the Mass Combi 'Power Support' feature for?", o:["Adding battery power when AC demand exceeds supply", "Charging only", "Starting the engine", "Sending alarms"], a:0, e:"Power Support lets the inverter supplement a limited supply." }]
  ]},
  { id:'m3', title:'MasterBus networking and configuration', level:'Intermediate', min:14, body:[
    ['p', "<b>MasterBus</b> is a CAN-based network that lets Mastervolt devices share data and control. Each device has two MasterBus connections, so cables run from device to device in a <b>daisy chain</b>. Both ends of the chain need a <b>terminator</b>."],
    ['h', 'MasterBus rules'],
    ['ul', ["Use the supplied UTP cables and only the correct connectors.", "Daisy-chain only: do not make T-junctions or star wiring.", "Fit exactly two terminators, one at each end.", "At least one device must supply power to the network (MasterBus powered)."]],
    ['h', 'MasterAdjust and panel configuration'],
    ['p', "Connect a PC with the MasterBus USB interface and use MasterAdjust software to read and change device settings, view events and save configurations. Panels like EasyView offer basic control."],
    ['ul', ["Set battery type, capacity and charging parameters.", "Define shore current limits and power support settings.", "Set up alarms and relay outputs.", "Name devices so the network is easy to understand."]],
    ['tip', "When devices drop off the network, check each cable and terminator first. Swap known-good cables to isolate. A loose connector is a more common cause than failed electronics."],
    ['qc', { q:"How should MasterBus devices be cabled?", o:["In a daisy chain with terminators at both ends", "Star wiring from one hub", "T-pieces off a backbone", "Wireless only"], a:0, e:"MasterBus is a daisy chain with a terminator at each end." }]
  ]},
  { id:'m4', title:'MLI Ultra lithium, Alpha Pro regulators and DC distribution', level:'Advanced', min:14, body:[
    ['h', 'Lithium integration'],
    ['p', "Mastervolt's lithium-ion batteries include a battery management system and communicate on MasterBus (and in some cases other buses), so the charger and other devices can follow the battery's requirements."],
    ['ul', ["Follow the manufacturer's rules on charging voltage, current, temperature and parallel connections.", "Use correct fusing and wiring as specified. The connection diagrams are model-specific.", "Verify that all charging sources are set for lithium and, where possible, are controlled by the battery data.", "Use system settings on MasterBus to define alarm and cut-off levels."]],
    ['h', 'Alpha Pro alternator regulators'],
    ['p', "The Alpha Pro is an external regulator that controls the alternator field and applies a multi-stage charge profile with temperature compensation. Battery voltage sensing and temperature sensors must be wired correctly."],
    ['ul', ["Wiring errors in sense leads can cause overcharge or undercharge.", "Set the profile to match the battery type and the alternator's capability.", "Use temperature sensing for both the battery and (where available) the alternator."]],
    ['h', 'DC distribution'],
    ['ul', ["Use fused distribution close to the battery, with fuses rated to protect each cable.", "Keep positive and negative busbars tidy, labelled and torqued.", "Provide a main battery switch and consider an emergency disconnect."]],
    ['h', 'Fault-finding Mastervolt systems'],
    ['table', ['Symptom', 'First checks'], [['Charger stays in bulk', 'Battery type profile, voltage drop on charge cable, loads during charge, shore current limit'], ['Alternator overcharges', 'Alpha Pro sense wiring, temperature sensor, set-point'], ['Device missing from panel', 'MasterBus cables, terminators, network power'], ['Inverter overloads', 'Load size and inrush current; DC voltage at inverter under load']]],
    ['safety', "Do not bypass the BMS or fuses. If a lithium battery shows damage, swelling or heat, isolate and follow the manufacturer's emergency procedures."],
    ['qc', { q:"A Mastervolt charger never leaves bulk and the battery voltage reads low at the battery. What is a likely cause?", o:["Voltage drop in the charging cable or heavy loads during charge", "Wrong AC colour code", "Low VHF power", "Autopilot setting"], a:0, e:"Voltage drop and loads can stop the battery reaching the absorption voltage." }]
  ]}
]});
