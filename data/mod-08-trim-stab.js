TRAINING.addModule({ id:'trim', title:'Trim Tabs & Stabilisation', icon:'🌊',
  summary:'Bennett and Lenco trim tabs, Humphree and Zipwake interceptors, and Seakeeper gyro and fin stabiliser overview.',
  lessons:[
  { id:'x1', title:'How trim tabs work', level:'Foundation', min:11, interactive:true, body:[
    ['p', "Trim tabs are hinged plates mounted on the bottom of the transom. When lowered, they deflect water downward; the reaction pushes the stern up and the bow down. They help a boat get on the plane, adjust running attitude for load and sea state, and correct list from wind or uneven weight."],
    ['int', 'trim'],
    ['table', ['Goal', 'What to do with the tabs'], [['Bow too high / slow to plane', 'Lower both tabs'], ['Bow plunging / pounding in a head sea', 'Raise (retract) the tabs'], ['Boat leaning to port', 'Lower the port tab'], ['Boat leaning to starboard', 'Lower the starboard tab'], ['Docking or going astern', 'Fully retract tabs']]],
    ['ul', ["<b>Electric actuator tabs</b> (e.g. Lenco and Bennett electric systems) use a motor-driven screw actuator on each tab.", "<b>Hydraulic tabs</b> (e.g. Bennett hydraulic systems) use a pump unit and hydraulic cylinders.", "Control may be a rocker switch with position indicators or an automated system that uses speed or GPS input."]],
    ['note', "Using tabs to fix a trim problem hides the cause. Persistent heavy tab use can indicate incorrect propeller, weight distribution or engine trim."],
    ['qc', { q:"Which tab deflection helps correct a list to port?", o:["Lower the port tab", "Lower the starboard tab", "Retract both tabs", "Switch off the engines"], a:0, e:"The lowered tab lifts that side of the stern, raising the low side." }]
  ]},
  { id:'x2', title:'Trim tab electrics and fault-finding', level:'Foundation', min:12, body:[
    ['p', "Trim tab systems are simple but unforgiving of poor wiring: each actuator draws significant current, and long cable runs to the stern can cause slow tab movement."],
    ['h', 'Installation checklist'],
    ['ul', ["Use the manufacturer's recommended cable size and fuse/breaker for the actuator current and run length.", "Seal and support cables where they pass the transom; use heat-shrink with adhesive connectors on any bilge-area joint.", "Check the power supply voltage at the control box with both tabs operating.", "Mount control switches where the helm can see tab position indicators."]],
    ['h', 'Common faults'],
    ['table', ['Symptom', 'Likely cause', 'Test'], [['One tab slow or weak', 'Voltage drop or failing actuator', 'Measure supply voltage at the actuator under load'], ['Tab moves one way only', 'Failed relay or switch contact', 'Check relay outputs, switch continuity'], ['Neither tab works', 'Blown fuse or breaker, no power to control box', 'Measure voltage at the box, check fuse and breaker'], ['Tab drifts down', 'Hydraulic leak or actuator wear', 'Inspect for leaks, test holding'], ['Indicators wrong', 'Position sensor fault or calibration', 'Check sensor wiring and recalibrate']]],
    ['int', 'hot:trimtab'],
    ['tip', "Water ingress is the number one killer of electric actuators. Check seals and connectors, and use dielectric grease on terminals."],
    ['safety', "Fingers, hands and lines can be trapped by moving tabs. Isolate power before working near the transom."],
    ['qc', { q:"What does slow tab movement on one side usually indicate?", o:["Voltage drop or a failing actuator on that side", "Too much antifoul", "Compass error", "A tide change"], a:0, e:"Measure voltage under load to separate wiring faults from actuator faults." }]
  ]},
  { id:'x3', title:'Interceptors: Humphree and Zipwake', level:'Intermediate', min:12, body:[
    ['p', "<b>Interceptors</b> are blades that extend vertically from the transom, creating a pressure wedge that lifts the stern. They respond quickly, can operate effectively at a wide range of speeds, and are usually controlled by an electronic controller that can use sensors (roll and pitch) to adjust automatically. Humphree and Zipwake are well-known brands."],
    ['ul', ["<b>Advantages:</b> fast response, less drag when retracted, often less drag than tabs at high speed, integrated automatic control.", "<b>Controller:</b> a control unit takes input from the helm and sensors and commands the actuators.", "<b>Sensors:</b> pitch and roll sensors and a speed source support automatic control; they need correct orientation and calibration.", "<b>Integration:</b> many controllers connect to the vessel network so MFDs can display and control them."]],
    ['h', 'Checking an interceptor system'],
    ['steps', ["Check power supply voltage and fuses at the controller.", "Check communications (the bus used by the manufacturer) and terminators.", "Run the controller's self-test or calibration (travel limits for each blade).", "Verify the sensors are correctly mounted and zeroed while the boat is level.", "Test manual and auto modes at sea."]],
    ['tip', "Interceptor actuators are often electrically driven. Follow the manufacturer's service documentation and use their diagnostic tool where one is provided."],
    ['int', 'match:stab'],
    ['qc', { q:"What do pitch and roll sensors allow an interceptor system to do?", o:["Automatically adjust blades for attitude", "Charge the batteries", "Measure speed only", "Steer the boat"], a:0, e:"Sensors give the controller the data to automatically keep the boat level." }]
  ]},
  { id:'x4', title:'Seakeeper gyros and fin stabilisers', level:'Advanced', min:13, body:[
    ['p', "<b>Seakeeper</b> gyro stabilisers contain a heavy flywheel spinning at thousands of rpm inside a vacuum enclosure. When the boat rolls, the gyro precesses and produces a counter-torque that reduces roll, including at anchor. <b>Fin stabilisers</b> (such as Naiad, Quantum and ABT-TRAC systems) use underwater fins driven by hydraulic actuators and controlled by an electronic controller using gyro sensors."],
    ['table', ['System', 'How it works', 'Electrical considerations'], [['Gyro stabiliser', 'Flywheel in a vacuum, gimbal precession counters roll', 'AC or DC supply depending on model; cooling water or coolant circuit; vacuum pump; long spin-up and spin-down times'], ['Fin stabilisers', 'Fins move to oppose roll based on sensor signals', 'Hydraulic power unit with electric motor; controller and sensors; underway only unless zero-speed type']]],
    ['h', 'Gyro operating rules'],
    ['ul', ["Follow the maker's start-up sequence: enable, spin-up (typically tens of minutes), then precession enable.", "Never remove power or cooling from a spinning unit – the flywheel takes a long time to stop and the bearings can be damaged without cooling.", "Maintain correct supply voltage and cable size, since the unit draws high current during spin-up.", "Keep cooling water flow and coolant levels in order; blocked strainers cause alarms.", "Observe vibration, noise and temperature alarms and log them."]],
    ['h', 'Fin stabiliser basics'],
    ['ul', ["Check hydraulic oil level, hoses and filters.", "Ensure sensors and controllers are powered and calibrated.", "Test fin movement with the boat on a safe stand or alongside as per manufacturer's procedure.", "Retract fins before docking or running aground risk."]],
    ['safety', "A spinning gyro stores large amounts of energy. Never open or work on a gyro until it has fully spun down and the maker's lock-out process is complete."],
    ['qc', { q:"Why must cooling continue to a gyro until it has stopped spinning?", o:["Bearings can overheat and be damaged while it is still spinning", "To make noise", "To charge batteries", "It is not needed"], a:0, e:"A flywheel keeps spinning long after power is removed and generates heat in the bearings." }]
  ]}
]});
