/* Matching activities and fault-finding scenarios */
TRAINING.matches.proto = { title:'Match the Bus to its Description', intro:'Communication networks you will meet on Victron, Mastervolt and NMEA-based boats.', pairs:[
  ['VE.Direct', 'Point-to-point serial link from a Victron MPPT, shunt or inverter to a GX device or USB interface'],
  ['VE.Bus', 'RJ45 network between MultiPlus/Quattro units (parallel / three-phase) and the GX device'],
  ['VE.Can', 'Victron CAN-bus at 250 kbit/s needing a terminator at each end of the run'],
  ['MasterBus', 'Mastervolt daisy-chain network with terminators and MasterAdjust software'],
  ['NMEA 2000', 'Marine CAN backbone with T-pieces, drop cables and two 120 Ω terminators'],
  ['NMEA 0183', 'Older serial standard: one talker, several listeners, 4800 baud by default']] };
TRAINING.matches.stab = { title:'Match the Stabilisation / Trim Device', intro:'Trim and stabilisation hardware found on motor yachts.', pairs:[
  ['Trim tabs', 'Hinged plates at the transom that deflect water to change running angle and list'],
  ['Interceptors', 'Vertical blades that drop from the transom to create lift, controlled electrically'],
  ['Gyro stabiliser', 'Spinning flywheel in a vacuum enclosure that resists roll, usable at rest'],
  ['Fin stabilisers', 'Underwater wings moved by actuators to reduce roll, with gyro sensors in the controller'],
  ['Rudder reference unit', 'Reports actual rudder angle to the autopilot computer'],
  ['Bow thruster', 'Tunnel propeller driven by a high-current motor for low-speed lateral thrust']] };
TRAINING.matches.protect = { title:'Match the Protection Device to its Job', intro:'Circuit protection and isolation devices.', pairs:[
  ['Class T fuse', 'Very high interrupt rating, used to protect lithium battery banks'],
  ['MRBF / ANL fuse', 'Common marine battery-terminal and heavy-cable fuse types'],
  ['RCD (30 mA)', 'Trips when current leaks to earth or between active and neutral circuits'],
  ['Galvanic isolator', 'Blocks small DC corrosion voltages in the shore-power earth conductor'],
  ['Isolation transformer', 'Completely separates the vessel AC system from the shore supply'],
  ['Battery isolator switch', 'Disconnects battery power for servicing and emergency shut-off']] };
TRAINING.matches.hotel = { title:'Match the System to its Electrical Quirk', intro:'Hotel systems have predictable electrical behaviours.', pairs:[
  ['Anchor windlass', 'Short bursts of very high motor current needing heavy cable and a contactor'],
  ['Automatic bilge pump', 'Needs a permanent fused battery feed and an independent high-level alarm'],
  ['Air-conditioning', 'Compressor inrush, a seawater pump and a flow-switch safety'],
  ['Watermaker', 'High-pressure pump, membrane and fresh-water flush cycle'],
  ['Vacuum / macerator toilet', 'Pump and level-sensor logic that suffers from low voltage and blockages'],
  ['Marine fridge compressor', 'Electronic controller with battery-protection cut-out and a thermostat']] };
TRAINING.matches.faults = { title:'Match the Symptom to the Most Likely Cause', intro:'Quick diagnostic instincts.', pairs:[
  ['Battery volts fine at rest, collapse under load', 'High-resistance connection or failing battery'],
  ['RCD trips whenever the water heater runs', 'Earth leakage from the heating element'],
  ['Devices drop in and out on the N2K network', 'Missing terminator or damaged connector'],
  ['Charger stays in bulk, battery never full', 'Charge voltage not reached – voltage drop, wrong profile or current limit'],
  ['Zinc anodes vanishing fast', 'Stray current or incorrect bonding / shore connection'],
  ['Autopilot hunting back and forth', 'Wrong gain or sloppy rudder feedback / air in the steering']] };

TRAINING.scenarios.thruster = { title:'Weak Bow Thruster (24 V)', par:'5–6',
  intro:'“The bow thruster has gone weak. It spins slowly and cuts out quickly. The boat’s batteries are fine.” The thruster is a 24 V brushed DC unit with a dedicated battery, main fuse, contactor and short heavy cable runs.',
  tests:[
    { g:'Battery', l:'Battery voltage at rest (at the posts)', r:'25.4 V' },
    { g:'Battery', l:'Battery voltage at posts while thruster runs', r:'23.6 V' },
    { g:'Battery', l:'State of charge (shunt)', r:'94 %' },
    { g:'Voltage drops (thruster running)', l:'Positive cable: battery to fuse', r:'0.12 V' },
    { g:'Voltage drops (thruster running)', l:'Across main fuse', r:'0.08 V' },
    { g:'Voltage drops (thruster running)', l:'Across contactor main terminals', r:'3.9 V' },
    { g:'Voltage drops (thruster running)', l:'Negative cable: motor to battery negative', r:'0.35 V' },
    { g:'Voltage drops (thruster running)', l:'Voltage at motor terminals', r:'19.3 V' },
    { g:'Control & inspection', l:'Control voltage at contactor coil', r:'23.1 V' },
    { g:'Control & inspection', l:'Thermal protection status', r:'Not tripped' },
    { g:'Control & inspection', l:'Inspect motor brushes / commutator', r:'70% brush left, clean' },
    { g:'Control & inspection', l:'Propeller / tunnel by hand', r:'Free, no fouling' }],
  diagnoses:['Flat or failing battery', 'High resistance in the main contactor (burnt / pitted contacts)', 'Undersized or corroded positive cable', 'Worn motor brushes', 'Fouled propeller or tunnel', 'Control / joystick fault'], answer:1,
  explain:'The battery is healthy and sags only a little under load (25.4 → 23.6 V). The cables and fuse show tiny drops, but <b>3.9 V is lost across the contactor</b> – that is power turned into heat, leaving only 19.3 V at the motor. Replace or rebuild the contactor and re-test the drop; it should be a small fraction of a volt.' };
TRAINING.scenarios.shore = { title:'No Power on Shore Supply', par:'5–6',
  intro:'“We plugged in at the marina but there is no AC on board, the air-con is dead and the batteries are going flat.” The boat has a shore inlet, an isolation transformer, an AC switchboard with RCD and an inverter-charger.',
  tests:[
    { g:'Marina side', l:'Pedestal outlet voltage', r:'238 V AC' },
    { g:'Marina side', l:'Pedestal breaker / RCD', r:'On' },
    { g:'Boat inlet', l:'Voltage at boat shore inlet', r:'238 V AC' },
    { g:'Boat inlet', l:'Shore breaker at switchboard', r:'On' },
    { g:'Boat inlet', l:'Input RCD (press test)', r:'Trips and resets OK' },
    { g:'Isolation transformer', l:'Primary (input) voltage', r:'238 V AC' },
    { g:'Isolation transformer', l:'Secondary (output) voltage', r:'0 V AC' },
    { g:'Isolation transformer', l:'Thermal overload / output breaker', r:'Tripped (reset button out)' },
    { g:'Downstream', l:'AC voltage at inverter-charger input', r:'0 V AC' },
    { g:'Downstream', l:'Inverter-charger LEDs', r:'No mains · Inverter on · Low battery' }],
  diagnoses:['Marina pedestal fault', 'Boat RCD tripped', 'Isolation transformer thermal overload tripped', 'Inverter-charger failure', 'Reverse polarity at the pedestal'], answer:2,
  explain:'Power is present all the way to the transformer <i>primary</i> but absent on the <i>secondary</i>, and the thermal/output breaker is tripped. Reset it, then find out <b>why</b> it tripped – typically an overloaded transformer (several large loads together), poor ventilation or a downstream fault. The inverter-charger itself is simply starved of input.' };
TRAINING.scenarios.n2k = { title:'Network Data Dropouts', par:'4–5',
  intro:'“The chartplotter keeps losing the engine data and the autopilot beeps with a data fault. It comes and goes.” Eleven devices on an NMEA 2000 backbone with a single power feed.',
  tests:[
    { g:'Power', l:'Network voltage at helm T-piece', r:'12.6 V' },
    { g:'Power', l:'Network voltage at furthest device', r:'12.4 V' },
    { g:'Resistance (power OFF)', l:'CAN-H to CAN-L at any T-piece', r:'120 Ω' },
    { g:'Resistance (power OFF)', l:'CAN-H to CAN-L at far end T-piece', r:'120 Ω' },
    { g:'Resistance (power OFF)', l:'CAN-H to shield', r:'O.L' },
    { g:'Inspection', l:'Helm end of backbone', r:'Terminator fitted' },
    { g:'Inspection', l:'Stern end of backbone', r:'Open port on last T-piece – no terminator' },
    { g:'Inspection', l:'Connectors for corrosion', r:'Dry and clean' },
    { g:'Inspection', l:'Drop cable lengths', r:'All under 6 m' }],
  diagnoses:['Low supply voltage', 'Missing terminator at one end of the backbone', 'Short between CAN-H and CAN-L', 'Failed chartplotter', 'Too many terminators fitted'], answer:1,
  explain:'Voltage is healthy and there is no short. A reading of <b>120 Ω instead of ≈60 Ω</b> means only one terminator is in circuit, confirmed by the open port at the stern end. Fit a terminator and the intermittent faults will clear.' };
TRAINING.scenarios.drain = { title:'Flat Batteries After a Few Days', par:'5–6',
  intro:'“We left the boat on the mooring for three days with the main isolator on, and the house batteries were flat when we returned.” There is no shore power or solar.',
  tests:[
    { g:'Battery', l:'Rest voltage after 3 days', r:'11.9 V' },
    { g:'Battery', l:'Battery load test (after recharge)', r:'Capacity good (≈ 90 %)' },
    { g:'Drain', l:'Standby current at battery negative, all breakers on', r:'2.6 A' },
    { g:'Drain', l:'Switch off Navigation breaker', r:'2.6 A (no change)' },
    { g:'Drain', l:'Switch off Freshwater / pumps breaker', r:'2.6 A (no change)' },
    { g:'Drain', l:'Switch off Cabin lighting breaker', r:'2.6 A (no change)' },
    { g:'Drain', l:'Switch off Entertainment breaker', r:'0.3 A' },
    { g:'Checks', l:'Bilge pump / float switch', r:'Float down, no draw' },
    { g:'Checks', l:'Inverter on standby?', r:'Off' }],
  diagnoses:['Faulty / failing batteries', 'Parasitic drain on the entertainment circuit', 'Bilge pump cycling', 'Inverter standby draw', 'Alternator leakage'], answer:1,
  explain:'The batteries test fine. The standby load is 2.6 A, which would remove about 190 Ah over 3 days, and it drops to 0.3 A only when the <b>Entertainment</b> circuit is switched off. Find the amplifier or device left powered (or a stuck relay) and fix the supply or switching.' };
TRAINING.matches.vicshunt = { title:'Match the Victron Monitor / BMS Product to its Job', intro:'Battery monitoring and management products in the Victron range.', pairs:[
  ['SmartShunt', 'Bluetooth battery monitor on a shunt (300 / 500 / 1000 / 2000 A versions) with a VE.Direct port'],
  ['Lynx Shunt VE.Can', 'High-current monitor mounted on the Lynx busbar, talking VE.Can'],
  ['Lynx Smart BMS', 'Main safety contactor with built-in pre-charge and allow-to-charge / allow-to-discharge outputs'],
  ['Smart Battery Sense', 'Wireless voltage and temperature sensor for MPPT chargers (not needed under GX DVCC control)'],
  ['Lynx Distributor', 'Fused DC distribution module with blown-fuse indication'],
  ['VE.Bus BMS V2', 'BMS paired with MultiPlus/Quattro: free-floating charge/load disconnect outputs on cell limits']] };
