TRAINING.addModule({ id:'hotel', title:'Hotel Systems', icon:'🛥️',
  summary:'Windlass, bilge and general pumps, freshwater, sanitation, HVAC and air-conditioning, lighting, watermakers and refrigeration.',
  lessons:[
  { id:'h1', title:'Windlass and anchoring electrics', level:'Foundation', min:11, body:[
    ['p', "The windlass is one of the highest current loads on a boat. A typical electric windlass motor draws from tens of amps up to hundreds of amps when stalled or when pulling a heavy anchor in a loaded situation."],
    ['ul', ["<b>Power supply:</b> a dedicated heavy cable from the battery, via a fuse or breaker and a contactor/solenoid close to the windlass.", "<b>Controls:</b> deck switches, helm switches and remote control; many include a chain counter.", "<b>Protection:</b> a thermal breaker or fuse sized as the manufacturer says; undersize and it nuisance-trips, oversize and the cable is at risk.", "<b>Voltage drop:</b> a long run from the battery makes the windlass slow and hot. Keep the cable size generous and the run short."]],
    ['h', 'Typical faults'],
    ['table', ['Symptom', 'Likely cause'], [['Windlass slow, motor hot', 'Voltage drop, poor connection, weak battery'], ['Click but no run', 'Contactor contacts, low supply, seized motor'], ['One direction only', 'Failed solenoid or switch contact'], ['Breaker keeps tripping', 'Overload, mechanical jam, wrong breaker rating']]],
    ['tip', "Run the engine while using the windlass to support the battery voltage and extend the battery life."],
    ['safety', "Hands and fingers near chain and gypsy are a serious hazard. Isolate the windlass supply before working on it."],
    ['qc', { q:"A windlass is slow and the motor gets hot. What is a likely cause?", o:["Voltage drop in the supply cable", "Too much battery capacity", "Radar interference", "Wrong flag"], a:0, e:"High resistance leads to low voltage at the motor under load." }]
  ]},
  { id:'h2', title:'Bilge, freshwater and sanitation systems', level:'Foundation', min:13, body:[
    ['h', 'Bilge pumps'],
    ['ul', ["An automatic bilge pump should be wired directly to the battery through a fuse (not via the main isolator) so it works even when the boat is unattended.", "A float switch (or electronic level switch) controls the pump; a manual switch lets the crew test or override.", "Install a separate <b>high-water alarm</b> with its own sensor, so a failed pump or float is detected.", "Bilge pump discharge must be above the waterline with an anti-siphon loop where required."]],
    ['h', 'Freshwater system'],
    ['ul', ["A pressure pump with an accumulator tank provides steady pressure; a pressure switch starts and stops the pump.", "Repeated short cycling indicates an air leak, accumulator problem, pressure switch fault or a dripping tap.", "Hot water: electric element on AC, plus an engine heat exchanger on many boats."]],
    ['h', 'Sanitation'],
    ['ul', ["<b>Electric macerator and vacuum toilets</b> use motors and pumps controlled by switches and level sensors.", "<b>Holding tank systems:</b> level sensors, pump-out and discharge pumps, often controlled by a timer or float.", "Low voltage and blockages are the most common causes of failures."]],
    ['tip', "When troubleshooting a pump, check three things: voltage at the pump, the ground connection and the pump's inlet filter/strainer."],
    ['int', 'match:hotel'],
    ['qc', { q:"Why is an automatic bilge pump wired directly to the battery?", o:["So it works even when the main isolator is off", "To save cable", "To increase voltage", "For appearance"], a:0, e:"The pump must protect the boat when it is unattended." }]
  ]},
  { id:'h3', title:'HVAC, air-conditioning and lighting', level:'Intermediate', min:13, body:[
    ['h', 'Marine air-conditioning'],
    ['p', "Boat air-conditioning uses seawater to cool the condenser. Common systems are <b>self-contained units</b> (individual compressors and air handlers) and <b>chilled-water systems</b> (one central chiller and air handlers in each cabin). Brands include Cruisair, Dometic Marine and Webasto."],
    ['ul', ["<b>Seawater pump:</b> must run when the compressor runs; flow switches protect against no-flow conditions.", "<b>Compressor:</b> large inrush current; soft starters or inverter compressors reduce the load on shore and generator power.", "<b>Controls:</b> thermostats, display panels, and safety switches (high pressure, low pressure, flow).", "<b>Condensate:</b> pumps remove water from the air-handler tray; a failed pump can flood a bilge."]],
    ['h', 'Lighting'],
    ['ul', ["LED lighting dominates; use drivers and dimmers rated for the LED type to avoid flicker or radio interference.", "PWM dimmers can create noise in AM/FM radio and VHF; use suitable filtered products and keep wiring away from antennas.", "Check wire sizes: LED load is small but a long run of many lights can still cause voltage drop."]],
    ['tip', "If an air-con shuts down on a high-pressure fault, check seawater flow, strainer blockages and the pump before suspecting the compressor."],
    ['qc', { q:"A marine air-con trips on high pressure. What is a likely first check?", o:["Seawater flow and strainer", "Bilge pump", "Compass", "GPS"], a:0, e:"Poor seawater flow raises condenser pressure." }]
  ]},
  { id:'h4', title:'Watermakers and refrigeration', level:'Advanced', min:13, body:[
    ['h', 'Watermakers'],
    ['p', "A reverse-osmosis watermaker forces seawater through a membrane at high pressure. Brands include Spectra, Sea Recovery and Schenker. The electrical components are a pump motor (AC or DC), a feed pump, control and flush valves, a salinity probe and flow meters."],
    ['ul', ["Check voltage and phase at the motor. Low voltage causes high current and overheating.", "Salinity probe readings determine whether the product water goes to the tank or to waste.", "Fresh water flushing after use prevents membrane fouling; solenoid valves and timers must be reliable.", "Protect electronics from water and salt air."]],
    ['h', 'Refrigeration'],
    ['ul', ["Many boat fridges use 12 or 24 V DC compressors with an electronic controller that includes battery protection thresholds.", "Poor connections or small cable cause low voltage at the controller and compressor cycling errors; fridges show fault codes with LED flashes.", "Check fans, the condenser airflow and seawater cooling flow where fitted.", "Ice makers add a pump, water inlet valve and heater circuits."]],
    ['table', ['Symptom', 'Likely causes'], [['Fridge compressor will not start', 'Low voltage, loose connection, controller protection, faulty thermostat'], ['Fridge errors on battery low', 'Cable too small or voltage drop, weak battery'], ['Watermaker high pressure alarm', 'Blocked filter, valve issue, membrane fouling'], ['Watermaker motor trips', 'Low voltage, overload, mechanical issue']]],
    ['tip', "Record the compressor controller fault code and match it to the maker's table: it usually directs you straight to the cause."],
    ['qc', { q:"Why do many 12 V fridge controllers include battery-protection thresholds?", o:["To avoid flattening the battery", "To save paint", "To cool faster", "To measure speed"], a:0, e:"The controller shuts down the compressor at low voltage to protect the battery." }]
  ]}
]});
