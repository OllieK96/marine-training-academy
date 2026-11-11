/* Hotspot diagrams. Each node: id, grid column/row, label, sub-label, description (d), field tip.
   links: [fromId, toId, type(dc|ac|data|hyd|neg), label?, route?(hv|vh)] */
(function(){
  const X = [20, 215, 410, 605, 800], Y = [30, 200, 370];
  const nd = (id, c, r, l, s, d, tip, ex) => Object.assign({ id, x:X[c], y:Y[r], w:150, h:64, l, s, d, tip }, ex || {});
  const D = TRAINING.diagrams;

  D.victron = { title:'Hotspot Diagram: Typical Victron System', w:970, h:450,
    nodes:[
      nd('pv', 0, 0, 'Solar array', 'PV panels', 'Converts sunlight to DC. Panels are wired in series strings so the string open-circuit voltage (Voc, worst case cold) stays under the MPPT input limit.', 'Check string Voc against the MPPT voltage rating. A "100/30" MPPT tolerates 100 V maximum PV voltage and charges at up to 30 A.'),
      nd('mppt', 1, 0, 'SmartSolar MPPT', 'VE.Direct', 'Tracks the maximum power point of the array and converts it to battery voltage. Talks to the GX device on VE.Direct and can be set up with VictronConnect over Bluetooth.', 'With a GX device and DVCC, the MPPT takes its charge voltage and current limits from the battery/BMS instead of its own settings.'),
      nd('cerbo', 2, 0, 'Cerbo GX', 'system brain', 'The GX device collects data from every Victron product and BMS, runs Venus OS, shows the system on a touch display or remote console and sends data to VRM. It coordinates charging (DVCC) and can start a generator.', 'Give every GX port a clean install: VE.Can needs a terminator at both ends of the cable run, and VE.Bus (RJ45) is not Ethernet - never plug one into the other.'),
      nd('vrm', 3, 0, 'VRM / phone app', 'remote monitoring', 'The VRM portal and the VictronConnect/VRM apps show history, alarms and remote control through the internet connection of the GX device (Ethernet, Wi-Fi, 4G router or Starlink).', 'Alarms and remote shore-current limit control are very handy for an owner who is away from the boat.'),
      nd('batt', 0, 1, 'Battery bank', 'lithium / AGM', 'Stores energy for the house system. Charge voltages, current limits and low-voltage cut-off must match the battery maker.', 'A lithium bank with a CAN-bus BMS should drive the system through the GX (DVCC) so every charger obeys the BMS.'),
      nd('shunt', 1, 1, 'SmartShunt / Lynx Shunt', 'battery monitor', 'Measures current in and out of the bank to compute state of charge, voltage, consumed Ah and time-to-go. Every load and charger must pass through the shunt (negative side) or the SoC will be wrong.', 'If SoC drifts, check for any negative wires connected to the battery side of the shunt, then re-sync at a full charge.'),
      nd('lynx', 2, 1, 'Lynx distributor', 'fused DC bus', 'A modular DC busbar with fuse holders and fuse-blown indication. Lynx Smart BMS and Lynx Shunt/Power In modules clip together to form a tidy, safe DC distribution with minimal loose cable.', 'Use Lynx fuse status LEDs and the GX alarm to locate a blown fuse quickly - fuses are the first thing to check after any power loss.'),
      nd('inv', 3, 1, 'MultiPlus / Quattro', 'inverter-charger', 'Inverter, battery charger and AC transfer switch in one. MultiPlus has one AC input; Quattro has two (shore and generator). It passes shore power through to the AC loads and charges the bank; when shore power drops it inverts from the battery.', 'Check AC input current limit, input voltage window and the DVCC limits when a charger "does nothing".'),
      nd('shore', 4, 1, 'Shore / generator', '240 V AC in', 'Incoming AC from the marina or generator via the boat\'s shore-power inlet, RCD/breaker and any isolation transformer or galvanic isolator.', 'A generator may need a different AC input current limit than shore power and a wider input voltage window.'),
      nd('alt', 0, 2, 'Alternator', 'engine driven', 'Engine-driven DC source. On lithium systems it is normally buffered by a DC-DC charger so a low-resistance battery cannot overload and overheat it.', null),
      nd('orion', 1, 2, 'Orion DC-DC', 'alternator charger', 'DC-DC converter that charges the house bank from the starter battery or alternator with a controlled charge profile and a current limit.', 'Set the current limit to protect the alternator at idle, and check cable size - these units draw high input current.'),
      nd('dcl', 2, 2, 'DC loads', 'fused circuits', 'Fridge, lighting, pumps, electronics - all fed from fused circuits on the DC distribution, and all passing through the shunt.', null),
      nd('acl', 3, 2, 'AC loads', 'AC output', 'Air-con, galley and outlets supplied by the inverter-charger AC output (often through a protected AC distribution panel).', 'Remember the inverter has its own continuous and peak power limit - large air-con compressors may need soft-start devices.')
    ],
    links:[['pv','mppt','dc'],['mppt','lynx','dc'],['batt','shunt','dc'],['shunt','lynx','dc'],['alt','orion','dc'],['orion','lynx','dc'],['lynx','inv','dc'],['lynx','dcl','dc'],['inv','shore','ac'],['inv','acl','ac'],['cerbo','mppt','data','VE.Direct'],['cerbo','inv','data','VE.Bus'],['cerbo','vrm','data','internet']] };
  /* Layout: the Lynx/DC bus is a wide node so that solar, DC-DC, battery (via shunt) and loads each join it from their own side - no line passes through another device. */
  (function(){
    const V = D.victron; V.h = 610;
    const pos = { pv:[20,30], mppt:[215,30], cerbo:[410,30], inv:[605,30], shore:[800,30], vrm:[410,150], acl:[800,150], shunt:[20,400], batt:[20,520], orion:[215,400], alt:[215,520], dcl:[605,400] };
    V.nodes.forEach(n => { if (pos[n.id]){ n.x = pos[n.id][0]; n.y = pos[n.id][1]; } });
    const l = V.nodes.find(n => n.id === 'lynx'); Object.assign(l, { x:20, y:285, w:930, h:56, bus:true });
    l.s = 'fused DC bus - every source and load joins here';
    const sh = V.nodes.find(n => n.id === 'shunt'); sh.s = 'in the battery negative';
  })();

  D.enerdrive = { title:'Hotspot Diagram: Typical Enerdrive Power System', w:970, h:450,
    nodes:[
      nd('pv', 0, 0, 'Solar array', 'PV panels', 'DC source from the roof or hardtop. String voltage and current must suit the solar regulator.', null),
      nd('mppt', 1, 0, 'Solar regulator', 'MPPT', 'Converts panel power to battery charge. Must be programmed for the battery chemistry (lithium vs AGM) and set to the maker\'s voltages.', 'Confirm the regulator profile matches B-TEC lithium settings in the battery documentation.'),
      nd('epro', 2, 0, 'ePRO monitor', 'battery monitor', 'Enerdrive battery monitoring with shunt: shows volts, amps, amp-hours consumed and state of charge, with alarm outputs on some models.', 'The shunt must see all current in and out of the battery negative. Set battery capacity and chemistry correctly during setup.'),
      nd('app', 3, 0, 'App / display', 'Bluetooth or Wi-Fi', 'Phone or display used to view and configure supported ePOWER / battery products.', 'Update firmware and apps before blaming hardware.'),
      nd('alt', 0, 2, 'Alternator', 'engine driven', 'Engine alternator supplying the DC-DC charger. Lithium banks should not be connected directly to a standard alternator.', null),
      nd('dcdc', 1, 2, 'DC2DC charger', 'alternator charger', 'DC-DC charger that provides a controlled multi-stage charge to the house bank from the starter system or alternator, with selectable battery profiles.', 'Use cable sized for the input current and keep the run short to limit voltage drop; check the ignition/enable signal wiring.'),
      nd('btec', 2, 1, 'B-TEC lithium', 'LiFePO4 + BMS', 'Enerdrive lithium iron phosphate batteries with an internal battery management system (BMS) that guards against over/under-voltage, over-current and temperature extremes.', 'If a BMS disconnects, find out why (low voltage, over-current, temperature) before simply resetting.'),
      nd('epower', 3, 1, 'ePOWER inverter-charger', 'AC / DC', 'Pure-sine inverter and charger that passes AC through when shore power is present and supplies AC from the battery when it is not.', 'Check AC input limits, charger current limits and the selected battery profile first.'),
      nd('shore', 4, 1, 'Shore / generator', '240 V AC in', 'AC supply entering through the boat\'s inlet, RCD protection and any isolation device.', null),
      nd('dcl', 2, 2, 'DC distribution', 'fuses / switching', 'Fused DC distribution for the house loads, sized for the cable and the load.', null),
      nd('acl', 3, 2, 'AC loads', 'outlets / galley', 'AC distribution and loads supplied by the ePOWER AC output, normally through RCD-protected circuits.', null)
    ],
    links:[['pv','mppt','dc'],['mppt','btec','dc','','vh'],['alt','dcdc','dc'],['dcdc','btec','dc','','vh'],['btec','epower','dc'],['epower','shore','ac'],['epower','acl','ac'],['btec','dcl','dc'],['epro','btec','data'],['epro','app','data'],['app','epower','data']] };

  D.mastervolt = { title:'Hotspot Diagram: Typical Mastervolt System', w:970, h:450,
    nodes:[
      nd('panel', 1, 0, 'Display panel', 'EasyView / MasterView', 'Panels show system status and allow configuration and control of devices on the MasterBus network.', null),
      nd('bus', 2, 0, 'MasterBus', 'daisy-chain network', 'Mastervolt\'s CAN-based network linking inverters, chargers, batteries, shunts and panels. Cabling is a daisy chain (no T-pieces or stars) with terminators at both ends.', 'A faulty or unterminated link often shows up as devices missing from the panel - check the terminators, connectors and the cable.'),
      nd('cm', 4, 0, 'ChargeMaster', 'multi-output charger', 'Multi-stage battery charger with several outputs for house, starter and bow-thruster batteries.', 'Select the correct battery type; wrong profiles are a classic cause of undercharged or overcharged banks.'),
      nd('alt', 0, 2, 'Alternator', 'engine driven', 'Engine alternator controlled by an external Alpha Pro regulator for multi-stage charging.', 'The Alpha Pro uses a battery temperature sensor and voltage sense for accurate charging.'),
      nd('alpha', 1, 2, 'Alpha Pro', 'alternator regulator', 'External regulator that controls the alternator field and applies a multi-stage battery charge profile with temperature compensation.', 'Voltage-sense wiring errors lead to overcharge; verify sense and temperature sensor connections.'),
      nd('shunt', 1, 1, 'MasterShunt', 'battery monitor', 'Measures current and calculates state of charge, supplying data on MasterBus.', null),
      nd('mli', 2, 1, 'MLI Ultra lithium', 'battery + BMS', 'Mastervolt lithium-ion battery with built-in BMS and MasterBus communication for monitoring and system control.', 'Follow Mastervolt\'s install and charge-voltage rules strictly - lithium has a narrow tolerance.'),
      nd('combi', 3, 1, 'Mass Combi', 'inverter-charger', 'Inverter, charger and transfer switch in one. Provides AC from battery and supports shore power with power-sharing features depending on the model.', 'Check shore limit settings and the battery type on MasterAdjust if the charger behaves oddly.'),
      nd('shore', 4, 1, 'Shore / generator', '240 V AC in', 'Incoming AC supply via RCD/breaker, any isolation transformer and galvanic isolator.', null),
      nd('dist', 2, 2, 'DC distribution', 'fuses / switches', 'Fuse and switch panel feeding DC circuits with correctly rated fuses and cable.', null),
      nd('acl', 3, 2, 'AC loads', 'AC circuits', 'AC loads supplied by the Combi\'s AC output via the protected switchboard.', null)
    ],
    links:[['panel','bus','data'],['bus','combi','data'],['bus','mli','data'],['bus','shunt','data'],['shore','combi','ac'],['combi','mli','dc'],['mli','shunt','dc'],['alt','alpha','data'],['alt','mli','dc','','vh'],['mli','dist','dc'],['combi','acl','ac'],['shore','cm','ac'],['cm','mli','dc']] };

  D.steer = { title:'Hotspot Diagram: Hydraulic Steering with Autopilot', w:970, h:450,
    nodes:[
      nd('mfd', 0, 0, 'Chartplotter / MFD', 'autopilot control', 'Shows heading and sets autopilot modes, and sends commands to the course computer over the network.', null),
      nd('compass', 1, 0, 'Heading sensor', 'compass / AHRS', 'Fluxgate compass or AHRS sensor giving heading to the autopilot. Must be mounted away from magnetic interference and calibrated.', 'Heading errors are often a magnetised object or a power cable placed next to the sensor.'),
      nd('helm', 0, 1, 'Helm pump', 'wheel', 'The helm pump converts steering-wheel rotation into hydraulic flow to the rudder cylinder.', 'Air in the system gives a spongy wheel or lost motion; bleed it using the manufacturer\'s procedure.'),
      nd('cyl', 2, 1, 'Steering cylinder', 'ram', 'Hydraulic ram that moves the rudder arm in response to oil flow from the helm pump and the autopilot pump.', null),
      nd('rudder', 3, 1, 'Rudder', 'tiller / arm', 'The rudder or drive leg steered by the ram. Autopilot and helm both work through the same hydraulics.', null),
      nd('power', 0, 2, 'Fused supply', 'DC power', 'Dedicated fused power for the autopilot drive and computer. Low voltage or voltage drop under load leads to erratic behaviour.', 'Measure voltage at the pump while it runs - it should be within about 5% of battery voltage.'),
      nd('acu', 1, 2, 'Course computer', 'ACU / ECU', 'The autopilot\'s brain. Takes heading, rudder angle and speed inputs and drives the pump to hold a course.', 'Run the dockside setup and sea trial calibration after any steering or sensor change.'),
      nd('pump', 2, 2, 'Autopilot pump', 'reversible hydraulic', 'Reversible hydraulic pump (or solenoid-controlled constant-run pump) that adds oil to the steering circuit on autopilot command.', 'Check for an undersized cable supplying a pump - it is a common cause of weak autopilot performance.'),
      nd('rref', 3, 2, 'Rudder reference', 'feedback sensor', 'Position sensor on the rudder that reports the real rudder angle to the course computer for feedback.', 'A loose or worn link here causes hunting, wrong rudder angle readings or hard-over alarms.')
    ],
    links:[['helm','cyl','hyd'],['cyl','rudder','neg'],['pump','cyl','hyd'],['acu','pump','dc'],['power','acu','dc'],['mfd','acu','data','','hv'],['compass','acu','data'],['rref','rudder','neg'],['rref','acu','data']] };

  D.thruster = { title:'Hotspot Diagram: Electric Bow Thruster Circuit', w:970, h:450,
    nodes:[
      nd('joy', 0, 0, 'Control panel', 'joystick / switches', 'The helm control (proportional or on-off) that tells the thruster which way and how hard to push.', null),
      nd('ctrl', 2, 0, 'Control module', 'logic / S-Link', 'Receives helm commands and drives the contactors. May include run-time and thermal protection and a power-on delay.', 'A thruster that will not start with good battery voltage: check control power and status LEDs before the main circuit.'),
      nd('therm', 3, 0, 'Thermal sensor', 'motor protection', 'Temperature switch in the motor that disables the thruster before it overheats. Thrusters have a limited continuous run time.', 'A cooling period of a few minutes is normal after heavy use - an immediate trip suggests low voltage or a stuck brush/propeller.'),
      nd('batt', 0, 1, 'Thruster battery', '12 / 24 V', 'A thruster typically draws hundreds of amps, so it often has its own battery located close to the motor.', 'Test battery voltage while the thruster is running - sag below spec makes the thruster weak.'),
      nd('fuse', 1, 1, 'Main fuse + isolator', 'high-current protection', 'Protects the heavy cable and gives a way to isolate the system. Typically a high-rated marine fuse and battery isolator.', 'Check fuse holder and lug temperatures with an IR thermometer after a run - a hot terminal means high resistance.'),
      nd('cont', 2, 1, 'Main contactor', 'solenoid', 'Heavy-duty relay that connects battery power to the motor on command. Burnt contacts add resistance and reduce thrust.', 'Measure the voltage drop across the contactor while running - it should be tiny.'),
      nd('motor', 3, 1, 'DC motor', 'brushed', 'Brushed DC motor that drives the propeller through a gear. Brushes wear and commutator dust builds up.', 'Inspect brush length and commutator condition in service.'),
      nd('tunnel', 4, 1, 'Tunnel + propeller', 'thrust', 'The tunnel and propeller that push water sideways. Antifoul, growth and rope can restrict it.', null),
      nd('dcdc', 0, 2, 'Charger / DC-DC', 'keeps battery topped up', 'Maintains the thruster battery from the charger or a DC-DC unit.', null)
    ],
    links:[['joy','ctrl','data'],['ctrl','cont','data'],['motor','therm','data'],['therm','ctrl','data'],['batt','fuse','dc'],['fuse','cont','dc'],['cont','motor','dc'],['motor','tunnel','neg','shaft'],['dcdc','batt','dc']] };

  D.n2k = { title:'Hotspot Diagram: NMEA 2000 + CZone Digital Switching', w:970, h:450,
    nodes:[
      nd('gps', 0, 0, 'GPS / sensors', 'depth, wind', 'Sensors that publish position, speed, depth and wind data onto the network.', null),
      nd('mfd', 1, 0, 'MFD / chartplotter', 'display & control', 'Shows data from the network and can control CZone switching and other integrated systems.', null),
      nd('ap', 2, 0, 'Autopilot', 'course computer', 'Uses heading, rudder and speed data to steer the vessel.', 'Make sure it has the correct sources selected on the MFD to avoid conflicting data.'),
      nd('eng', 3, 0, 'Engine gateway', 'J1939 to N2K', 'Converts engine data from the engine ECU\'s CAN bus to NMEA 2000 so it can be displayed on MFDs.', null),
      nd('pwr', 4, 0, 'Network power', 'fused 12 V feed', 'Powers the network through a single fused connection, ideally near the middle of the backbone.', 'Only one power connection point should feed the backbone.'),
      Object.assign(nd('bb', 0, 1, 'NMEA 2000 BACKBONE', 'CAN-H / CAN-L + 12 V', 'The main cable run to which devices connect using T-pieces and short drop cables. It needs a 120 ohm terminator at each end.', 'Measure about 60 ohms between CAN-H and CAN-L with the power off to confirm both terminators are present.'), { x:20, y:200, w:930, h:52, bus:true }),
      nd('coi', 0, 2, 'CZone output module', 'COI / MOI', 'CZone output modules switch loads (lights, pumps, etc.) from commands on the network. Each has a unique address set during configuration.', 'Addressing and the configuration file must match - an incorrectly addressed module can cause confusing symptoms.'),
      nd('cii', 1, 2, 'CZone input module', 'switch inputs', 'Reads physical switch inputs (e.g. helm switches, sensors) and publishes them to the CZone system.', null),
      nd('touch', 2, 2, 'Touchscreen / keypad', 'user control', 'A dedicated touchscreen or keypad to operate modes and loads, or use the MFD.', 'Modes such as Anchor, Dock or Night turn groups of loads on or off together.'),
      nd('gx', 3, 2, 'Victron GX', 'VE.Can to N2K', 'A GX device can place battery, inverter and tank data onto NMEA 2000 for display on the MFD.', 'Ensure it is configured for the right N2K device instances.'),
      nd('term', 4, 2, 'Terminators', '120 ohm x 2', 'One terminator at each end of the backbone matches the cable impedance and prevents reflections.', 'Count them - there must be exactly two.')
    ],
    links:[['gps','bb','data'],['mfd','bb','data'],['ap','bb','data'],['eng','bb','data'],['pwr','bb','dc'],['coi','bb','data'],['cii','bb','data'],['touch','bb','data'],['gx','bb','data'],['term','bb','data']] };

  D.trimtab = { title:'Hotspot Diagram: Electric Trim Tab System', w:970, h:450,
    nodes:[
      nd('ind', 0, 0, 'Position indicator', 'LEDs / gauge', 'Shows tab position at the helm, either on the switch panel or in a display.', null),
      nd('pwr', 1, 0, 'Fused 12/24 V supply', 'breaker', 'Dedicated supply with a breaker sized to the actuators. Voltage drop is a common cause of slow or uneven tabs.', 'Measure voltage at the control box with both tabs moving.'),
      nd('sw', 0, 1, 'Helm switch', 'port / stbd', 'Pushbutton or rocker switch that commands each tab up or down.', null),
      nd('ctrl', 1, 1, 'Control box', 'relays / logic', 'Switches power to the actuators, can supply position feedback and auto-retract functions.', null),
      nd('port', 3, 0, 'Port actuator', 'electric ram', 'Electric linear actuator that moves the port tab. Do not hold the switch after the end of travel.', 'A slow or stalled actuator often means voltage drop or water ingress.'),
      nd('stbd', 3, 2, 'Starboard actuator', 'electric ram', 'Same function for the starboard tab. A mismatch in speed between sides suggests wiring or voltage-drop issues.', null),
      nd('hull', 4, 1, 'Transom + tabs', 'hinged plates', 'The plates hinged to the transom bottom that deflect water to alter trim and list.', null),
      nd('gps', 0, 2, 'GPS / speed input', 'auto function', 'Some systems use GPS or speed data for automatic retraction or auto-trim.', null)
    ],
    links:[['sw','ind','data'],['pwr','ctrl','dc'],['sw','ctrl','data'],['ctrl','port','dc'],['ctrl','stbd','dc'],['port','hull','neg'],['stbd','hull','neg'],['gps','ctrl','data']] };

  D.evc = { title:'Hotspot Diagram: Engine / EVC Network', w:970, h:450,
    nodes:[
      nd('ecup', 0, 0, 'Port engine ECU', 'engine control', 'The engine control unit manages fuelling, protection and reports data on a CAN bus.', 'Never weld or jump-start on a vessel with ECUs without disconnecting them as per the engine manufacturer.'),
      nd('ecus', 1, 0, 'Stbd engine ECU', 'engine control', 'The starboard engine\'s ECU. Both engines share the control network for synchronisation and helm control.', null),
      nd('gw', 2, 0, 'N2K gateway', 'J1939 to NMEA 2000', 'Converts engine data to NMEA 2000 for MFD display.', null),
      nd('helm', 3, 0, 'Helm display / EVC', 'gauges & control', 'The helm interface shows engine data and alarms and transmits control commands.', null),
      nd('joy', 4, 0, 'Joystick / pod ECU', 'IPS / steering control', 'Joystick and pod control units coordinate engines, pods and steering via the control network.', null),
      Object.assign(nd('bus', 0, 1, 'ENGINE CAN BUS (J1939 / EVC)', '250 kbit/s CAN with 120 ohm terminators', 'The communication backbone that carries commands and data between ECUs, gauges and gateways.', 'Always test the bus terminators with the power off: expect about 60 ohms between CAN-H and CAN-L.'), { x:20, y:200, w:930, h:52, bus:true }),
      nd('diag', 0, 2, 'Diagnostic socket', 'service tool port', 'Connection point for the engine maker\'s diagnostic software to read fault codes and live data.', 'Always read and record fault codes before clearing anything.'),
      nd('key', 1, 2, 'Start / stop panel', 'ignition, sync', 'Ignition, start/stop buttons and sync control wiring to ECUs and helm stations.', null),
      nd('batt', 2, 2, 'Battery supply', 'clean power', 'ECUs need stable supply and good grounds; low voltage during cranking can cause resets and ghost faults.', 'Check battery cables and grounds before suspecting an ECU.'),
      nd('steer', 3, 2, 'Steering / pod ECU', 'drive control', 'Controls steering actuators on pod drives and communicates with the joystick.', null),
      nd('term', 4, 2, 'Terminators', '120 ohm x 2', 'Two terminators at the bus ends. Extra ones lower the resistance and cause communication faults.', null)
    ],
    links:[['ecup','bus','data'],['ecus','bus','data'],['gw','bus','data'],['helm','bus','data'],['joy','bus','data'],['diag','bus','data'],['key','bus','data'],['batt','bus','dc'],['steer','bus','data'],['term','bus','data']] };
})();
