TRAINING.addModule({ id:'steer', title:'Steering Systems & Autopilot', icon:'🧭',
  summary:'Hydraulic and electro-hydraulic steering, autopilot drive units and rudder feedback, electronic steer-by-wire (Volvo IPS, ZF, Twin Disc) and calibration.',
  lessons:[
  { id:'t1', title:'Hydraulic and electro-hydraulic steering', level:'Foundation', min:12, interactive:true, body:[
    ['p', "Most Australian cruisers use <b>hydraulic steering</b>: a helm pump moves oil through hoses to a hydraulic cylinder that moves the rudder arm. It is simple, reliable and works without electricity. Hydraulic steering often uses a single cylinder per rudder (for twin rudders there may be two cylinders linked by a tie bar)."],
    ['int', 'hot:steer'],
    ['h', 'Electro-hydraulic steering'],
    ['p', "<b>Electro-hydraulic</b> systems use an electric pump to drive hydraulic cylinders, controlled by a helm sensor or joystick. They allow multiple helm stations and integration with autopilot and joystick systems. Typical elements are an electronic control unit, one or more pumps, a hydraulic reservoir and sensors for rudder angle."],
    ['ul', ["Check oil level, hose condition and leaks before any electrical diagnosis.", "Bleed air according to the manufacturer's procedure – air creates a spongy wheel and lost motion.", "Check steering stops (hard-over limits) so that the autopilot and helm agree.", "Use only the specified hydraulic oil."]],
    ['tip', "Before blaming the autopilot, test the steering with the autopilot off: stiff, slow or notchy steering is a hydraulic or mechanical fault."],
    ['safety', "Hydraulic oil under pressure can inject through skin. Relieve pressure before disconnecting hoses and wear eye protection."],
    ['qc', { q:"What causes a spongy steering wheel with lost motion on a hydraulic system?", o:["Air in the system", "High battery voltage", "Too much oil", "A faulty GPS"], a:0, e:"Air compresses and creates elasticity in the hydraulic circuit." }]
  ]},
  { id:'t2', title:'Autopilot drive units and rudder feedback', level:'Foundation', min:12, body:[
    ['p', "An autopilot has four key parts: <b>heading sensor</b> (fluxgate compass or AHRS), a <b>course computer</b>, a <b>drive unit</b> and a <b>rudder reference</b> (feedback) sensor. The computer compares the heading to the target and moves the rudder through the drive unit."],
    ['table', ['Drive type', 'How it works', 'Typical use'], [['Hydraulic pump (reversible)', 'A small electric pump adds oil to the steering circuit', 'Most hydraulic steering installations'], ['Constant-running pump with solenoids', 'Pump runs continuously, valves direct the oil', 'Larger boats'], ['Linear drive', 'Electric ram connected to the rudder quadrant', 'Mechanical steering'], ['Rotary drive', 'Electric motor drives the steering shaft or chain', 'Some sailboats and cable steering']]],
    ['h', 'Rudder reference'],
    ['p', "The rudder reference sensor (a potentiometer or electronic sensor) tells the computer the real rudder angle. If the sensor is loose, worn or wired wrong, the autopilot will oscillate or give errors."],
    ['ul', ["Mount the heading sensor away from magnetic items, cables and speakers.", "Use an adequate supply: pump motors draw a lot of current, so wire sizes and voltage drop matter.", "Fit fuses or breakers as specified by the maker."]],
    ['tip', "If an autopilot hunts or oscillates, check the rudder reference mechanically for backlash first, then the gain settings."],
    ['qc', { q:"What does the rudder reference sensor provide?", o:["Actual rudder angle to the course computer", "Wind speed", "Water temperature", "Engine RPM"], a:0, e:"It gives the feedback needed for the autopilot to control rudder position." }]
  ]},
  { id:'t3', title:'Electronic steering and joystick systems', level:'Intermediate', min:13, body:[
    ['p', "Modern pod and joystick systems such as <b>Volvo Penta IPS</b>, ZF pod systems and engine-and-gearbox control systems from companies such as <b>Twin Disc</b> use electronic control, often with no mechanical link between the wheel and the drives. Which system your boat has depends on model and year – check the build documents."],
    ['ul', ["<b>Steer-by-wire:</b> sensors at the helm send a signal to an ECU, which commands the pods or rudders electrically or hydraulically.", "<b>Joystick control:</b> combines steering, engine and gear commands to move the boat sideways and rotate on the spot.", "<b>Multiple helm stations:</b> each has its own control unit and a transfer procedure.", "<b>Redundancy:</b> systems typically include fault detection and a backup mode, but behaviour varies by manufacturer."]],
    ['h', 'What to inspect'],
    ['ul', ["Power supplies to ECUs and drives – low or noisy voltage is a common cause of random alarms.", "CAN-bus wiring, connectors and terminators.", "Helm sensors and joystick calibration.", "Fault codes read with the manufacturer's diagnostic tool."]],
    ['tip', "Always read and record fault codes before clearing them. Intermittent faults often show up as stored codes that point to a connector or supply problem."],
    ['safety', "Before working on pods, thrusters or steering actuators, make sure the system cannot move: isolate power and warn people near the stern."],
    ['qc', { q:"What is a common cause of random alarms on electronic steering systems?", o:["Low or noisy supply voltage", "Fresh paint", "Wrong flag", "Low tide"], a:0, e:"ECUs and drives are sensitive to voltage dips and noise." }]
  ]},
  { id:'t4', title:'Calibration and fault-finding steering systems', level:'Advanced', min:13, body:[
    ['h', 'Autopilot set-up sequence'],
    ['steps', ["Confirm steering is mechanically sound and fully bled; confirm rudder travel and stops.", "Install and calibrate the rudder reference: set centre and port/starboard limits.", "Install the heading sensor and perform compass deviation calibration (usually a slow turn in calm water).", "Run the dockside set-up wizard: boat type, drive type, hard-over time, rudder limits.", "Run the sea trial: auto-learn, set rudder gain and counter rudder, check performance at different speeds."]],
    ['h', 'Common faults'],
    ['table', ['Symptom', 'Likely causes'], [['Autopilot hunts or oscillates', 'Excess gain, backlash in rudder reference, air in steering'], ['Rudder drives to one side', 'Reversed pump wires, wrong rudder reference polarity'], ['Weak or slow steering with autopilot on', 'Voltage drop on pump supply, worn pump, low hydraulic oil'], ['Heading wanders', 'Compass interference, uncalibrated sensor'], ['Intermittent drop-outs', 'Network or power connection problems, poor terminals'], ['Stiff helm', 'Mechanical binding, hydraulic fault, incorrect oil or air lock']]],
    ['h', 'Testing under load'],
    ['p', "Measure pump supply voltage while the drive unit runs against the rudder – a few tenths of a volt of drop is acceptable but large drops show a cable, fuse or connection fault. Check the temperature of lugs and fuse holders after operation."],
    ['tip', "After any steering repair or replacement, redo the autopilot dockside calibration. Rudder limits and drive direction frequently change."],
    ['qc', { q:"An autopilot drives the rudder hard to one side and stays there. What is a likely cause?", o:["Reversed rudder reference or pump polarity", "Low bilge level", "Wrong shore power", "Unused radio"], a:0, e:"Reversed feedback or drive polarity makes the controller push in the wrong direction." }]
  ]}
]});
