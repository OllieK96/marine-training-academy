/* Hotspot diagrams, matching activities and fault-finding scenarios for the product-based modules.
   Scenarios are TRAINING exercises built from the lessons: readings are illustrative, not measurements from a particular vessel. */
(function(){
  const T = TRAINING;
  const n = (id, x, y, l, s, d, tip, w, h) => ({ id, x, y, w:w || 150, h:h || 64, l, s, d, tip });

  /* ---------- Hotspot: Garmin helm on a Volvo Penta boat ---------- */
  T.diagrams.garminhelm = { title:'Hotspot Diagram: Garmin Helm as Three Networks (Volvo Penta example)', w:970, h:450,
    nodes:[
      n('mfd1', 20, 30, 'Helm MFD 1', 'Glass Cockpit / GPSMAP', 'A Garmin display at the helm. It is on all three networks: Garmin Marine Network (Ethernet), NMEA 2000, and on a Volvo Penta installation it reads the EVC network.', 'A display that reboots when a thruster or windlass runs is usually a supply voltage dip, not software. Measure at the display under load.'),
      n('mfd2', 215, 30, 'Helm MFD 2', 'second display', 'A second display shares charts, user data and settings over the Marine Network. Software versions should match.', 'Settings that revert or differ between displays: look at which display is pushing synced settings, and compare software versions.'),
      n('radar', 410, 30, 'Radar scanner', 'Marine Network', 'Radar connects over the Garmin Marine Network. It needs its own power supply and a suitable cable.', 'No radar: check scanner supply voltage, cable and coupler, then the selected source in the display.'),
      n('sonar', 605, 30, 'Sonar / camera', 'Marine Network + PoE', 'Networked sonar and IP cameras join the Marine Network. An IP camera connected straight to a plotter can damage the plotter and the device; Garmin requires a PoE isolation coupler (P/N 010-10580-10 in the manual).', 'Up to two video encoders per Marine Network according to the manual.'),
      n('sw', 800, 30, 'Switching', 'CZone / other', 'Digital switching appears on the plotter under A/V, Gauges, Controls > Switching when a supported system is on NMEA 2000.', 'Supported systems change with software; check the current release notes.'),
      n('n2k', 20, 200, 'NMEA 2000 backbone', 'CAN, 12 V', 'The instrument network: GPS, depth, wind, tanks and more. 12 V DC only, a terminator at each end, a maximum 3 V drop to the furthest device and power injected through a T-connector.', 'No depth, wind or tank data: check backbone power, terminators, connectors and the device list.'),
      n('gps', 215, 200, 'GPS / heading', 'sensors', 'GPS and heading sources feed the autopilot, radar overlay and logging over NMEA 2000.', 'If the autopilot disengages, check the heading source, supply dips and rudder feedback.'),
      n('ap', 410, 200, 'Autopilot', 'ECU and sensors', 'The autopilot computer reads heading and rudder data and drives the steering. Alarms are shown on the display.', 'A supply dip can reset the autopilot ECU as well as the display.'),
      n('evcgw', 605, 200, 'EVC gateway / bus', 'Volvo Penta', 'The EVC network is the engine CAN bus. The Glass Cockpit reads engine and drive data through it. Look under Settings > Communications > EVC Network.', 'No engine data: check the EVC Network page (Features, Components, Software), then fuses and connectors.'),
      n('eng', 800, 200, 'Engines / drives', 'ECUs on EVC', 'Engine control units and the drives. Each has its own supply, ground and CAN connections.', 'Record codes before clearing anything.'),
      n('pwr', 215, 370, 'House DC supply', 'fuses / cable', 'The supply to the display and network injection. It carries inrush currents from big loads.', 'Voltage drop in cable and fuse holders, or a loose ground, causes reboots and dropouts under load.'),
      n('thr', 410, 370, 'Thruster / windlass', 'big loads', 'High current loads that pull the supply down when they start.', 'Fit heavy loads on their own feeds and bring the electronics supply back to a clean point.')
    ],
    links:[['mfd1','mfd2','data','Marine Network'],['mfd2','radar','data'],['radar','sonar','data'],['mfd1','n2k','data','N2K'],['n2k','gps','data'],['gps','ap','data'],['ap','evcgw','data'],['evcgw','eng','data','EVC'],['pwr','n2k','dc'],['thr','pwr','dc']] };

  /* ---------- Hotspot: IPS system ---------- */
  T.diagrams.ips = { title:'Hotspot Diagram: Volvo Penta IPS / EVC System (typical)', w:970, h:450,
    nodes:[
      n('helm', 20, 30, 'Helm levers and joystick', 'control units', 'Read the throttle and gear levers and the joystick stations and send commands on the EVC bus.', 'If all functions are lost suspect the bus or power. If one station or option fails, test another station first.'),
      n('disp', 215, 30, 'Glass Cockpit', 'Garmin-based displays', 'Show engine data, alarms and the EVC feature, component and software lists (Settings > Communications > EVC Network).', 'Record alarms and the lists before clearing anything.'),
      n('ec', 410, 30, 'Easy Connect', 'Bluetooth / N2K', 'Plugs into the multilink at the helm, gives a Bluetooth dashboard on a smart device, can share diagnostic codes with a chosen dealer and provides NMEA 2000 functions.', 'A phone dashboard does not replace the dealer tool.'),
      n('evc', 410, 200, 'EVC bus (CAN)', 'private network', 'The engine CAN network that ties control units, displays and smart functions together.', 'Water or corrosion in a connector can look like a failed control unit.'),
      n('ecu1', 215, 200, 'Engine ECU (port)', 'engine and drive', 'Each engine and drive has its own control unit and connections.', 'Measure supply and ground at the control unit under load.'),
      n('ecu2', 605, 200, 'Engine ECU (stbd)', 'engine and drive', 'The second engine. A fault on one side only points at that side\'s wiring, connector or unit.', 'Compare one side against the other.'),
      n('int', 20, 200, 'Interceptors', 'auto trim', 'The Volvo Penta Interceptor system integrates with EVC for automatic trim (catalogue sizes 300 to 1,050 mm).', 'They are controlled over EVC, not as a separate stabiliser.'),
      n('acp', 800, 200, 'ACP', 'anti-corrosion', 'Active Corrosion Protection: monitor-only below 75% battery state of charge without shore power and inactive below 50%; backup anodes protect the drives.', 'Check shore power, battery charge and bonding before blaming ACP for fast anode wear.'),
      n('bat', 215, 370, 'Batteries / supply', '12 or 24 V', 'The supply to every control unit and the display.', 'Battery voltage at rest and under load, then supply and ground at the control units.'),
      n('thr', 410, 370, 'Bow thruster / DPS', 'Easy Boating', 'Easy Boating options include joystick, Dynamic Positioning (DPS), Assisted Docking and, on some boats, a variable-speed bow thruster.', 'Option packages differ by builder and model.')
    ],
    links:[['helm','evc','data'],['disp','evc','data'],['ec','evc','data'],['evc','ecu1','data'],['evc','ecu2','data'],['int','evc','data'],['acp','ecu2','data'],['bat','ecu1','dc'],['bat','thr','dc']] };

  /* ---------- Hotspot: Yamaha Helm Master EX ---------- */
  T.diagrams.hmex = { title:'Hotspot Diagram: Yamaha Helm Master EX (levels 1 to 4)', w:970, h:450,
    nodes:[
      n('dec', 20, 30, 'DEC', 'Level 1: Digital Electronic Control', 'Digital throttle and shift with the remote control, display (CL5 or MFD interface) and switches. It is the base level and includes functions such as single lever, trim assist and centre engine.', 'After an engine is remounted, always reset DEC recognition. Without it the active lamp on the remote control does not light, autopilot is not shown and steering errors occur.'),
      n('des', 215, 30, 'DES', 'Level 2: Digital Electric Steering', 'Steering by wire (built into some outboards, bolt-on for others). The guide states that the system cannot be expanded unless DES is fitted.', 'Steering sensor calibration cannot be done if DEC recognition has not been done.'),
      n('ap', 410, 30, 'Autopilot', 'Level 3', 'Adds heading hold, course hold, pattern steer and Track Point. Uses a heading sensor and an autopilot panel.', 'Heading sensor calibration is done from a Yamaha display.'),
      n('joy', 605, 30, 'Joystick', 'Level 4: full maneuverability', 'Adds joystick maneuverability (including single engine), SetPoint features and bow thruster integration.', 'Joystick calibration has a variant for boats with a bow thruster.'),
      n('bcu', 20, 200, 'BCU', 'Boat Control Unit', 'Boat-side control unit that joins the helm devices, GPS, heading sensor and MFD interfaces.', 'Do not mount where it can be stepped on. Cover unused connectors with waterproof caps.'),
      n('scu', 215, 200, 'SCU', 'Steering Control Unit', 'The steering control unit(s), with software that dealers update with YDIS on some early serial numbers.', 'A BPS scan checks component compatibility and records serial numbers before the boat is delivered.'),
      n('eks', 410, 200, 'EKS / Y-COP', 'key switch', 'The Electronic Key Switch with the Y-COP system (433 MHz or 315 MHz kits by market).', 'Check you have the kit frequency for the market.'),
      n('disp', 605, 200, 'CL5 / MFD interface', 'display', 'Yamaha CL5 display or an interface that shows engine and system data on an MFD. A gateway puts data on NMEA 2000.', 'Interfaces are separate kits.'),
      n('bat', 215, 370, 'Battery', 'minimum rating', 'The guide lists minimum battery ratings by engine type (for example 680 A CCA/SAE and 80 Ah for L4 2.8 L and V6 4.2 L; 700 A and 110 Ah for V8 5.3/5.6 L).', 'A weak battery produces odd communication faults across the system.'),
      n('thr', 410, 370, 'Thruster driver', 'bow thruster', 'A thruster driver integrates a bow thruster into the joystick and autopilot functions.', 'The guide has a separate troubleshooting chart for the bow thruster.')
    ],
    links:[['dec','des','data'],['des','ap','data'],['ap','joy','data'],['bcu','scu','data'],['scu','eks','data'],['eks','disp','data'],['bat','scu','dc'],['bcu','thr','data']] };

  /* ---------- Matching activities ---------- */
  T.matches.czone = { title:'Match the CZone Term to its Meaning', intro:'Digital switching vocabulary used on CZone and, with differences, on every platform.', pairs:[
    ['Load', 'One physical output switch on a module'],
    ['Circuit', 'A virtual switch built from one or more loads'],
    ['Mode', 'A group of circuit states that is activated and cannot itself be switched off'],
    ['ATC bypass position', 'Makes the circuit live through its fuse and independent of the network and software'],
    ['DIP address', 'Physical or virtual address that must match the configuration file'],
    ['Virtual switch group', 'Third-party mapping of up to 28 switches for devices such as Siren or Sentinel']] };
  T.matches.stabsys = { title:'Match the Stabilisation System to its Characteristic', intro:'Gyros, fins, interceptors and Ride.', pairs:[
    ['Gyro (Seakeeper)', 'Reduces roll at anchor from a vacuum-sealed flywheel; needs spool-up time and cooling'],
    ['24 V electric fins (Humphree)', 'Servo-driven fins that can stabilise at zero speed from battery power'],
    ['Interceptors', 'Blades at the transom for trim and list; need boat speed'],
    ['Seakeeper Ride', 'Actuated blades controlled by a Software Module with GPS, on its own CAN bus'],
    ['Humphree RCU', 'Control computer fed through its own slow-acting fuse'],
    ['Zero speed mode', 'Fins rotate at anchor, so swimmers must stay clear']] };
  T.matches.siren = { title:'Match the Siren MTC Input to its Wiring', intro:'From the Siren Marine MTC setup guide.', pairs:[
    ['IGNITION', 'Looks for positive voltage from the engine ignition switch'],
    ['HIGH WATER', 'Normally open float or sensor that closes to ground'],
    ['SHORE PWR', 'Uses a PAM-1 AC relay or sensor plug to detect shore power'],
    ['ENGINE HRS', 'Switch to ground such as an oil pressure switch; use PAM-4 for a positive source'],
    ['OUTPUT 1-3', 'Maximum 1 A each; use an external relay for larger loads'],
    ['BL SEA ON / OFF', 'Drives a Blue Sea remote battery switch']] };
  T.matches.lithspec = { title:'Match the LFP24-100P Datasheet Item to its Value', intro:'25.6 V 100 Ah LiFePO4 (distributor datasheet).', pairs:[
    ['Rated voltage', '25.6 V'],
    ['Nominal capacity', '100 Ah (2560 Wh)'],
    ['Charge temperature range', '0 to 55 C'],
    ['Discharge cut-off', '20 V'],
    ['Rated discharge current', '50 A (100 A maximum)'],
    ['Surge discharge', '200 A for less than 3 s']] };
  T.matches.outbcomp = { title:'Match the Outboard Control System to its Feature', intro:'Product-based comparison. Mercury items come from builder spec sheets only.', pairs:[
    ['Yamaha Helm Master EX', 'Four levels from DEC and DES to autopilot and joystick; cannot be expanded without DES'],
    ['SeaStar Optimus EPS', 'Steer-by-wire helm with PCM, SmartCylinders and CAN1, CAN2 and CAN3'],
    ['Optimus 360', 'Joystick system that needs a master joystick matching the number of engines'],
    ['Mercury Joystick Piloting', 'Builder sheets note it needs a Premium Package or VesselView 4 and is not compatible with a Simrad autopilot'],
    ['Yamaha BPS scan', 'Checks component compatibility and records serial numbers before delivery'],
    ['CANtrak display', 'Shows Optimus system status and faults at the helm']] };
  T.matches.conn = { title:'Match the Connectivity Item to its Fact', intro:'Starlink Mini and onboard network basics.', pairs:[
    ['Starlink Mini DC input', '12-48 V, 60 W rating'],
    ['Starlink Mini average power', '25-40 W'],
    ['Starlink Mini Wi-Fi', 'Wi-Fi 5, up to 128 devices'],
    ['IP camera on a Garmin plotter network', 'Needs a PoE isolation coupler'],
    ['Standard RJ45 on Starlink Mini', 'Reduces the IP67 rating'],
    ['Starlink Mini operating temperature', '-30 to 50 C']] };

  /* ---------- Fault-finding scenarios ---------- */
  T.scenarios.czondead = { title:'CZone: circuit shows ON but the anchor light is dark', par:'4-5',
    intro:"The anchor light shows ON on the touchscreen but the lamp is dark. The vessel has CZone output interfaces with ATC fuses at each channel.",
    tests:[
      {g:'Screen / network', l:'Touchscreen state of the circuit', r:'ON'},
      {g:'Screen / network', l:'Other circuits on the same module', r:'Work normally'},
      {g:'Module LEDs', l:'DC power LED', r:'Green'},
      {g:'Module LEDs', l:'Network LED', r:'Green with red traffic'},
      {g:'Module LEDs', l:'Channel LED for the anchor light', r:'Green (output on)'},
      {g:'Measurements', l:'Voltage on the supply side of the ATC fuse', r:'12.6 V'},
      {g:'Measurements', l:'Voltage on the output side of the ATC fuse', r:'0 V'},
      {g:'Measurements', l:'Voltage at the lamp terminals', r:'0 V'},
      {g:'Measurements', l:'Lamp on a known 12 V supply', r:'Lights'},
      {g:'Measurements', l:'ATC fuse resistance with the fuse removed', r:'Open circuit'}
    ],
    diagnoses:['The channel ATC fuse has blown, so the module commands ON but nothing reaches the lamp', 'The lamp has failed', 'The module has a DIP-switch conflict', 'The network has failed', 'A mode is overriding the circuit'],
    answer:0, explain:"The module and the network are healthy and the channel LED is green, so the command is being sent. Voltage is present on the supply side of the fuse and absent after it, and the fuse measures open. The lamp works on a known supply, so the lamp is not at fault. The screen shows commanded state, not voltage at the load. Replace the fuse with the correct rating and find why it blew (wire size, a short or an over-rated lamp)." };

  T.scenarios.garminnet = { title:'Garmin display reboots when the bow thruster runs', par:'4-5',
    intro:"On a 12 V helm, the Garmin display at the helm restarts every time the bow thruster is used. Radar and engine data are fine otherwise.",
    tests:[
      {g:'Network', l:'Marine Network status', r:'Healthy, all devices seen'},
      {g:'Network', l:'Software versions on both displays', r:'Match'},
      {g:'Network', l:'NMEA 2000 backbone voltage (idle)', r:'12.4 V'},
      {g:'Display supply', l:'Voltage at the display idle', r:'12.5 V'},
      {g:'Display supply', l:'Voltage at the display while the thruster runs', r:'8.3 V (dips)'},
      {g:'Display supply', l:'Voltage at the battery while the thruster runs', r:'11.9 V'},
      {g:'Display supply', l:'Voltage drop across the display supply fuse holder under thruster use', r:'1.1 V'},
      {g:'Settings', l:'Radar setting changes', r:'None recently'}
    ],
    diagnoses:['A voltage dip on the supply to the display when the thruster draws current', 'A software mismatch between displays', 'A wrong network name', 'A faulty radar setting', 'A failed Ethernet cable'],
    answer:0, explain:"Networks and software are fine. The display supply falls to 8.3 V while the battery only falls to 11.9 V, so much of the loss is in the display's supply path (a poor fuse holder, undersized cable or shared feed). Fix the supply path and check the thruster battery and cabling." };

  T.scenarios.ipsjoy = { title:'IPS joystick does nothing at the dock (illustrative)', par:'4-5',
    intro:"At the dock the joystick does nothing. The wheel steers and both throttle and gear levers work on both engines. No dealer tool is available. This exercise uses the course's non-dealer checks only.",
    tests:[
      {g:'Display', l:'Active alarms', r:'None related to the engines'},
      {g:'Display', l:'EVC feature list', r:'Normal'},
      {g:'Station', l:'Joystick at a second station (if fitted)', r:'Also does nothing'},
      {g:'Power', l:'Battery voltage at rest', r:'12.8 V'},
      {g:'Power', l:'Supply voltage on the fuse side feeding the joystick connector', r:'12.7 V'},
      {g:'Power', l:'Supply voltage at the joystick connector pins', r:'3.1 V'},
      {g:'Environment', l:'Inspect the joystick connector', r:'Green corrosion on two pins, bilge water seen nearby'},
      {g:'Environment', l:'Drive and engine ECU supplies', r:'Normal'}
    ],
    diagnoses:['A corroded connector adding resistance on the joystick supply path', 'A failed drive', 'Flat batteries', 'The dealer needs to re-flash the software', 'A GPS fault'],
    answer:0, explain:"The helm functions and the engine units are healthy, so the bus and engines are not the problem. Voltage is good up to the connector but only 3.1 V at the pins, and the connector is visibly corroded. Clean or replace the connector and seal it. Anything beyond that (calibration or software) is dealer work." };

  T.scenarios.ec300fly = { title:'EC300: no response from the flybridge', par:'4-5',
    intro:"The helm lower station controls work. At the flybridge the customer presses Station Select but cannot take control. The flybridge control head has power.",
    tests:[
      {g:'Flybridge', l:'Station Select LED after pressing', r:'Does not turn red; lower-station LED stays lit'},
      {g:'Flybridge', l:'Supply voltage at the control head', r:'12.1 V'},
      {g:'Flybridge', l:'Audible transfer tone', r:'None'},
      {g:'Controller', l:'Flash codes', r:'None'},
      {g:'Levers', l:'Lower station lever positions', r:'Both about 20 percent ahead'},
      {g:'Levers', l:'Flybridge lever positions', r:'Both in neutral'},
      {g:'Configuration', l:'Programmed transfer type', r:'Lever match'},
      {g:'Wiring', l:'Control head cable continuity', r:'Good'}
    ],
    diagnoses:['The lever-match transfer rule is blocking transfer because the flybridge levers do not match the lower station', 'The flybridge control head has failed', 'A communication fault (code 436)', 'The wrong mode is selected', 'The gearbox valve coil is open'],
    answer:0, explain:"No flash codes, good supply and good cable rule out the head, the bus and the coils. The system is programmed for lever-match transfer, and the flybridge levers are in neutral while the lower levers are ahead. Match the lever positions and press Station Select again. Check the programmed transfer rule before suspecting hardware." };

  T.scenarios.skride = { title:'Seakeeper Ride: 1024 No CAN Communication', par:'4-5',
    intro:"A Seakeeper Ride system shows fault 1024. It worked until a new GPS was added to the boat's NMEA 2000 network last week.",
    tests:[
      {g:'App', l:'Fault history', r:'1024 No CAN Communication; 1040 UI Issue'},
      {g:'App', l:'GPS data on NMEA 2000', r:'Present on the boat network'},
      {g:'Wiring', l:'Ride CAN bus tee to the boat NMEA 2000 tee', r:'Two tees are joined by a short drop cable'},
      {g:'Wiring', l:'Ride CAN terminators', r:'Present at both ends'},
      {g:'Wiring', l:'Distribution Module supply', r:'12.6 V'},
      {g:'Wiring', l:'Software Module supply', r:'12.6 V'},
      {g:'Wiring', l:'Actuator cables', r:'Seated and undamaged'}
    ],
    diagnoses:['The Ride CAN bus has been connected to the boat NMEA 2000 network', 'The actuator has failed', 'The Software Module is installed upside down', 'The battery is too low', 'The gyro software is too old'],
    answer:0, explain:"The Ride proprietary CAN bus must stay separate from the boat NMEA 2000 network (it is built with similar cables, which makes it easy to cross them). Joining the networks causes 1024 and 1040. Separate them and give the Software Module its GPS through the correct connection." };

  T.scenarios.bmsdrop = { title:'Thruster stops after a few seconds on a single lithium battery (illustrative)', par:'4-5',
    intro:"A 24 V 340 A (nominal) bow thruster is fed from a single 25.6 V 100 Ah LiFePO4 battery with a built-in BMS. The thruster runs for a couple of seconds and stops; the panel shows no alarm. After a minute it works again briefly.",
    tests:[
      {g:'Panel', l:'Thruster panel alarm', r:'None'},
      {g:'Battery', l:'Voltage at rest', r:'26.4 V'},
      {g:'Battery', l:'Battery output voltage just after the stop', r:'0 V (battery output disconnected)'},
      {g:'Battery', l:'Datasheet surge rating', r:'200 A for less than 3 s; 100 A maximum'},
      {g:'Thruster', l:'Motor and contactor', r:'Healthy when supplied from a lead-acid battery'},
      {g:'Cabling', l:'Voltage at the motor terminals under load', r:'Not measurable because supply drops out'},
      {g:'Battery', l:'Temperature', r:'22 C'}
    ],
    diagnoses:['The thruster peak current is above the battery surge limit and the BMS opens the output', 'The thruster motor is faulty', 'The panel has failed', 'A communication fault', 'The battery is too cold'],
    answer:0, explain:"A 340 A nominal thruster needs far more than the 200 A for 3 s the datasheet gives, so the BMS protects the cells by opening the output. The battery is at a normal temperature and the thruster works from lead-acid. Use a bank sized and rated for the thruster current, check the BMS limits, and consider a dedicated thruster pack." };

  T.scenarios.sirnoswitch = { title:'Siren app shows no Switching tab for CZone', par:'4-5',
    intro:"A CZone-equipped boat has a Siren Marine unit on the NMEA 2000 bus. The owner's app shows the engine and battery data but no Switching tab or digital switches.",
    tests:[
      {g:'Network', l:'Siren unit on the NMEA 2000 network and powered', r:'Yes'},
      {g:'Network', l:'NMEA 2000 bus powered when the boat is unattended', r:'Yes'},
      {g:'CZone', l:'OI firmware version', r:'6.17.17.0'},
      {g:'CZone', l:'Third-Party Devices tab in the Configuration Tool', r:'No Switch Bank PGN Control group is listed'},
      {g:'CZone', l:'Circuits and modes are all configured on screen', r:'Yes'},
      {g:'App', l:'App version', r:'Current'}
    ],
    diagnoses:['The CZone configuration has no third-party virtual switch group, so Siren cannot see the switches', 'The OI firmware is too old', 'The Siren unit has no power', 'The app version is too old', 'The NMEA 2000 bus is not powered'],
    answer:0, explain:"The firmware meets the minimum in the guide, power and network are fine and the CZone system itself works. Equipment that is not configured for third-party operation is not visible to the Siren unit. In the Configuration Tool add a virtual switch group (instance 0 to 252, advanced remote switch functions enabled), map the circuits, load the configuration and let the Siren unit discover the switches." };

  T.scenarios.hmexjoy = { title:'Yamaha Helm Master EX: autopilot missing after an engine replacement', par:'4-5',
    intro:"A twin Yamaha boat with Helm Master EX has had one outboard replaced. Now the remote control active lamp does not light, the autopilot does not show on the gauge and there are steering errors.",
    tests:[
      {g:'Helm', l:'Remote control active lamp', r:'Does not light'},
      {g:'Helm', l:'Autopilot on the gauge', r:'Not displayed'},
      {g:'Power', l:'Battery voltage', r:'12.7 V'},
      {g:'Power', l:'Battery rating vs the guide minimum', r:'Meets the minimum'},
      {g:'Harness', l:'Connector locking (click) on the new engine harness', r:'Locked'},
      {g:'Dealer steps', l:'DEC recognition performed after the engine was remounted', r:'No'},
      {g:'Dealer steps', l:'Steering sensor calibration', r:'Cannot be completed'}
    ],
    diagnoses:['DEC recognition was not reset after the engine was remounted', 'The battery is too small', 'The heading sensor is faulty', 'The bow thruster driver has failed', 'The joystick needs calibration first'],
    answer:0, explain:"The guide states that when an engine is remounted the recognition of the remote controls must be reset. Without it the active lamp does not light, the autopilot is not shown, steering errors occur and steering sensor calibration cannot be done. A dealer then runs the BPS scan and calibrations." };

  T.scenarios.slinkbus = { title:'S-Link thruster panel shows No communication (alarm 12)', par:'4-5',
    intro:"A Sleipner thruster system shows alarm 12 (No communication) after a cable was moved behind a panel. The panel is lit.",
    tests:[
      {g:'Panel', l:'Diagnostic screen Rx/Tx counters', r:'Rising; state WARNING (96 or more) then PASSIVE'},
      {g:'Bus', l:'S-Link power cable', r:'Connected, 12.4 V on the bus'},
      {g:'Bus', l:'END terminator', r:'Missing at the far end'},
      {g:'Bus', l:'Connector latches', r:'All latched'},
      {g:'Bus', l:'Cable damage', r:'None visible'},
      {g:'Thruster', l:'Fuse and contactor supply', r:'Normal'}
    ],
    diagnoses:['The END terminator is missing, causing bus errors', 'The thruster motor has failed', 'The main fuse has blown', 'Low battery voltage', 'The thruster is overheated'],
    answer:0, explain:"The bus is powered and connected, but the far end has no END terminator. Counters rise on a poorly terminated CAN bus. Fit the terminator and check the counters fall. The motor and fuse are not the problem because alarm 12 is a communication alarm." };
})();
