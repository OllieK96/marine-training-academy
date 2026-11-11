TRAINING.addModule({ id:'prop', title:'Engines, Propulsion & Thrusters', icon:'⚙️',
  summary:'Engine electrics and EVC systems, Cummins/CAT/MAN electronics overview, IPS and pod systems, and bow/stern thrusters (Side-Power, Sleipner).',
  lessons:[
  { id:'p1', title:'Engine electrics fundamentals', level:'Foundation', min:12, body:[
    ['p', "Every diesel engine has a <b>starting circuit</b>, a <b>charging circuit</b> and an <b>instrument/alarm circuit</b>. Modern electronic engines add an ECU and a communication network."],
    ['h', 'Starting circuit'],
    ['ul', ["Battery positive goes through the main isolator to the starter solenoid; negative returns via the engine block or a dedicated cable.", "Cranking draws hundreds of amps. Voltage drop in cables or a poor connection shows as slow cranking.", "Test: measure voltage across each cable and connection while cranking – more than about 0.5 V across the positive or negative cable run is suspicious."]],
    ['h', 'Charging circuit'],
    ['ul', ["The alternator is driven by a belt and charges the starter and house banks through isolators, relays or DC-DC chargers.", "Check belt tension, alternator output, sense wire and cable connections.", "Fuse the alternator output close to the battery or alternator as the manufacturer states."]],
    ['h', 'Ignition-protected equipment'],
    ['p', "Equipment installed in engine rooms and fuel-vapour spaces on petrol vessels must be ignition protected (ISO 8846 or equivalent). Diesel engine rooms are less strict about ignition, but many items still need to be rated for the environment."],
    ['tip', "Slow cranking is rarely a bad starter. Test battery voltage while cranking and measure voltage drops before replacing parts."],
    ['qc', { q:"How do you check for voltage drop in a starting circuit?", o:["Measure across each cable while cranking", "Measure only at rest", "Measure AC voltage", "Measure resistance with the engine running"], a:0, e:"Voltage drop must be measured under load." }]
  ]},
  { id:'p2', title:'Electronic engines: Volvo Penta EVC, Cummins, CAT and MAN', level:'Intermediate', min:13, interactive:true, body:[
    ['p', "Riviera and Maritimo boats commonly use Volvo Penta, CAT, MAN or Cummins engines, depending on model and year. All modern types are electronically controlled and use <b>CAN-bus</b> communication, usually based on SAE J1939 or a manufacturer variant."],
    ['int', 'hot:evc'],
    ['table', ['Brand', 'Electronics notes', 'Diagnostic tool (typical)'], [['Volvo Penta (EVC)', 'Electronic Vessel Control system links engines, helm displays, joysticks and pods; IPS has dedicated control units', 'Volvo Penta diagnostic software and interface'], ['Caterpillar (CAT)', 'ECMs for engine control; marine power displays', 'CAT Electronic Technician (ET) with a communication adapter'], ['MAN', 'Electronic engine control with CAN communications to helm panels', 'MAN diagnostic tool'], ['Cummins', 'Electronic control with display and diagnostics', 'Cummins INSITE or similar']]],
    ['h', 'Key principles'],
    ['ul', ["Always diagnose with the manufacturer's tool first: it provides fault codes and live data.", "ECUs need stable power, good grounds and an uncorrupted CAN bus.", "CAN-bus: two-wire twisted pair with 120 Ω terminators at each end; measure about 60 Ω with power off.", "Never weld on the vessel without disconnecting ECUs, alternator and battery as the maker specifies.", "Do not modify engine wiring or fit non-approved accessories into the CAN network."]],
    ['tip', "Power-cycling the system after fixing a fault often clears stored codes that you must still record. Take photos of the display and keep a log."],
    ['safety', "Starting an engine with a poor or disconnected battery can create voltage spikes that damage ECUs. Do not disconnect batteries while the engine is running."],
    ['qc', { q:"What resistance should you expect between CAN-H and CAN-L with power off on a correctly terminated bus?", o:["About 60 Ω", "0 Ω", "About 1 MΩ", "About 12 Ω"], a:0, e:"Two 120 Ω terminators in parallel give about 60 Ω." }]
  ]},
  { id:'p3', title:'Joystick, IPS and pod systems', level:'Intermediate', min:12, body:[
    ['p', "<b>Pod drives</b> such as Volvo Penta IPS place propellers under the hull and steer by rotating the pods. They are controlled by electronic units that communicate with engine ECUs and the joystick."],
    ['ul', ["<b>Joystick:</b> sends commands to the pod control units, which calculate the thrust and angle required for each drive.", "<b>Sensors:</b> pod angle sensors and engine data feed the control system.", "<b>Docking mode:</b> speed is limited and the system uses the joystick; settings may be changed by service tools.", "<b>Network:</b> a dedicated CAN network connects ECUs, helm units and the joystick."]],
    ['h', 'Common electrical problems'],
    ['table', ['Symptom', 'Likely cause'], [['Joystick unresponsive', 'Network fault, low supply voltage, unrecognised joystick'], ['Pod does not steer', 'Hydraulic or actuator fault, sensor calibration, ECU fault code'], ['System alarm after start', 'Battery voltage dips, poor ground, connector corrosion'], ['Intermittent control loss', 'CAN bus faults, loose connectors or damaged wiring']]],
    ['tip', "Check connectors in the bilge and under the helm. Corrosion and loose pins are very common sources of intermittent faults."],
    ['qc', { q:"A joystick system is intermittently unresponsive. What is one of the first checks?", o:["Supply voltage and CAN connectors", "Windscreen wipers", "Fuel tank level", "Radar range"], a:0, e:"Intermittent loss often comes from supply or connector problems." }]
  ]},
  { id:'p4', title:'Bow and stern thrusters', level:'Advanced', min:14, interactive:true, body:[
    ['p', "Bow and stern thrusters (such as Side-Power and Sleipner units) are among the heaviest electrical loads on a boat. A DC thruster can draw several hundred amps for short periods. Proper installation and testing are essential."],
    ['int', 'hot:thruster'],
    ['h', 'Electrical design points'],
    ['ul', ["<b>Dedicated battery:</b> placed close to the thruster to keep cable runs short. Battery capacity and CCA must suit the motor.", "<b>Cable size and length:</b> the manufacturer specifies cable size and maximum length; undersized cable reduces thrust and overheats.", "<b>Main fuse and isolator:</b> a high-rated fuse close to the battery plus a battery switch.", "<b>Control:</b> proportional or on-off controllers with run-time and thermal protection.", "<b>Duty cycle:</b> thrusters are rated for short run times; overheating protection will cut the motor."]],
    ['h', 'Fault-finding'],
    ['steps', ["Confirm battery voltage at rest and while the thruster runs.", "Check control power and status on the control module.", "Measure voltage drops across fuse, contactor and cables while running.", "Check motor brushes, commutator and the tunnel/propeller for obstruction.", "Check thermal protection status and cooling time."]],
    ['int', 'sim:thruster'],
    ['safety', "Thruster circuits can deliver very high current. Remove metal jewellery, isolate the battery and use insulated tools when working on terminals."],
    ['qc', { q:"A thruster is weak and 3.9 V is measured across its contactor while running. What is the likely fault?", o:["Burnt or pitted contactor contacts", "Low tide", "Flat compass", "Excess brush length"], a:0, e:"Excessive drop across a contactor shows high resistance in its contacts." }]
  ]}
]});
