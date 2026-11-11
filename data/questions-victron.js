/* Manual-derived question banks (generated from /workspace/qa/qgen). Format: [question, options, correctIndex, explanation] */
TRAINING.addQuestions("vic-inv", [
[
"A MultiPlus-II 12/3000/120-32 has which charger current and AC transfer switch rating?",
[
"12 A charger and 120 A switch",
"32 A charger and 120 A transfer switch",
"120 A charger and 32 A transfer switch",
"3000 A charger and 12 A switch"
],
2,
"The name decodes as battery volts / VA / charge amps - transfer switch amps."
],
[
"MultiPlus-II 24/3000/70-32: what is its peak power?",
[
"2400 W",
"3000 W",
"2200 W",
"5500 W"
],
3,
"Peak is 5500 W for the 3 kVA models; 2400 W is the continuous rating at 25 °C."
],
[
"What continuous output does the 3 kVA MultiPlus-II list at 65 °C?",
[
"2400 W",
"1700 W",
"3000 W",
"2200 W"
],
1,
"The manual lists 2400 W at 25 °C, 2200 W at 40 °C and 1700 W at 65 °C."
],
[
"The 3 kVA MultiPlus-II absorption voltage default on a 24 V model is:",
[
"27.6 V",
"57.6 V",
"28.8 V",
"14.4 V"
],
2,
"Defaults are 14.4 V at 12 V, 28.8 V at 24 V and 57.6 V at 48 V."
],
[
"What DC fuse does the manual pair with the 24/3000/70?",
[
"400 A",
"300 A",
"125 A",
"600 A"
],
1,
"12/3000/120 uses 400 A, 24/3000/70 uses 300 A and 48/3000/35 uses 125 A."
],
[
"Recommended cable for a 24/3000/70 within 0-5 m (per pole)?",
[
"25 mm²",
"95 mm²",
"50 mm²",
"2 x 50 mm²"
],
2,
"The manual lists 50 mm² up to 5 m and 95 mm² for 5-10 m."
],
[
"Torque for the MultiPlus-II M8 battery stud nut?",
[
"1.2 Nm",
"5 Nm",
"33 Nm",
"12 Nm"
],
3,
"12 Nm with an insulated box spanner."
],
[
"The MultiPlus-II voltage-sense wires can compensate for how much drop in each cable before the charger limits current instead?",
[
"0.5 V",
"1 V",
"5 V",
"0.1 V"
],
1,
"The charger compensates up to 1 V per cable; beyond that it reduces charge current."
],
[
"Which MultiPlus-II feature cuts the no-load consumption by about 70 % by pulsing every two seconds?",
[
"AES",
"PowerAssist",
"Search mode",
"UPS function"
],
2,
"AES cuts about 20 % by narrowing the sine; Search mode switches the inverter off between pulses."
],
[
"What does the ground relay do?",
[
"Grounds the DC negative",
"Limits generator current",
"Protects against reverse polarity",
"Grounds AC-out neutral when the input relays are open so the output RCD still works"
],
3,
"It keeps an earth reference on the output when the unit inverts."
],
[
"With bulk protection enabled, what is the maximum bulk time?",
[
"3 minutes",
"10 hours",
"1 hour",
"24 hours"
],
1,
"A 10-hour bulk may hint at a shorted cell. It can only be disabled in VEConfigure."
],
[
"Recommended lead-acid charge current for a Quattro is about:",
[
"Equal to capacity in Ah",
"50 - 60 % of capacity",
"1 % of capacity",
"10 - 20 % of battery capacity"
],
3,
"The manual advises 10-20 % of Ah capacity for battery life."
],
[
"A Quattro has AC-in-1 and AC-in-2. If both have voltage, which does it use?",
[
"Neither until the user chooses",
"Whichever is higher voltage",
"AC-in-1 (normally the generator)",
"AC-in-2 (shore)"
],
2,
"AC-in-1 wins, which is why the generator goes there."
],
[
"Quattro 3 kVA DIP ds8/ds7/ds6 = on/off/on gives what AC-in-1 limit?",
[
"16 A",
"50 A",
"25 A",
"30 A"
],
2,
"on-off-on = 25 A; on-on-off = 30 A; on-on-on = 50 A."
],
[
"Quattro ds5 off sets AC-in-2 limit to:",
[
"30 A",
"6 A",
"10 A",
"16 A"
],
3,
"ds5 off = 16 A (default), on = 30 A. More needs VEConfigure or a panel."
],
[
"How do you store a Quattro DIP-switch setting?",
[
"Press the Up button for 2 seconds",
"Switch the unit off",
"Hold the Mode button for 10 s",
"It stores automatically"
],
0,
"The overload and low-battery LEDs flash to confirm."
],
[
"A new Quattro shows all DIP switches off. What does that mean?",
[
"Factory settings are in the microprocessor; the DIP position does not describe them until you store a setting",
"DIP switches are disabled",
"All limits are minimum",
"The unit is faulty"
],
0,
"The real settings were loaded by computer."
],
[
"How many identical MultiPlus-II units can be paralleled (excluding 8k/10k/15k)?",
[
"Twelve",
"Six",
"Two",
"Three"
],
1,
"The manual allows up to six units in parallel."
],
[
"What wiring rule applies to DC cables in a parallel system?",
[
"Use a splitter at the unit",
"Equal length and cross-section for every unit",
"Only one unit needs fusing",
"Different lengths to balance"
],
1,
"Equal cables ensure equal current sharing."
],
[
"UTP cables in a VE.Bus parallel system must be:",
[
"Hand-crimped",
"Run via a hub",
"Crossover type",
"Connected directly unit to unit with no splitters or boxes"
],
3,
"No splitters or connection boxes; use industrial straight cables."
],
[
"Three-phase operation with these Multis is supported as:",
[
"Wye (star) only",
"Wye or delta",
"Delta only",
"Split-phase only"
],
0,
"The unit is unsuitable for three-phase delta."
],
[
"PowerControl does what first as AC input current approaches the limit?",
[
"Starts the generator",
"Reduces the charge current",
"Raises the inverter voltage",
"Opens the AC input"
],
1,
"PowerAssist then adds inverter power if loads still exceed the limit."
],
[
"PowerAssist is used to:",
[
"Disable the input relay",
"Increase charger current",
"Reduce DC ripple",
"Add battery (inverter) power so the AC supply is never overloaded"
],
3,
"It supplements limited shore or generator power."
],
[
"When should the 'Weak AC' setting be turned on?",
[
"To reduce AES consumption",
"When the charger barely charges because of a distorted input (also with the dynamic current limiter)",
"To raise AC voltage",
"On every shore connection"
],
1,
"WeakAC accepts distortion but reduces max charge current by about 20 %."
],
[
"An assistant is:",
[
"A cable type",
"A small configurable program loaded into a VE.Bus unit",
"A Bluetooth app",
"A GX firmware"
],
1,
"Assistants extend features without extra hardware."
],
[
"A Two-Signal BMS assistant takes which two third-party signals?",
[
"Charge and float",
"Temperature and current",
"Shore and generator",
"Battery full/over-voltage and battery empty/under-voltage"
],
3,
"Full signal stops/floats the charger; empty signal disables the inverter."
],
[
"What does ECO mode on a Phoenix / Inverter Smart do?",
[
"Goes to standby when no load is connected to cut idle consumption (about 85 %)",
"Raises output voltage",
"Doubles the peak power",
"Starts a generator"
],
0,
"Very small loads can be missed in ECO mode."
]
]);
TRAINING.addQuestions("vic-gx", [
[
"What does a Cerbo GX run?",
[
"Venus OS",
"Windows IoT",
"VE.Configure",
"Android"
],
0,
"Venus OS collects data, runs DVCC and uploads to VRM."
],
[
"Cerbo GX supply voltage range?",
[
"24 V only",
"9 - 17 V DC",
"230 V AC",
"8 - 70 V DC"
],
3,
"It accepts 8-70 V DC."
],
[
"Cerbo GX enclosure rating:",
[
"IP67",
"IP20: mount in a dry enclosure",
"IP65",
"IP54"
],
1,
"Only the GX Touch displays are IP54 (without connectors)."
],
[
"How many VE.Direct ports does the Cerbo GX have?",
[
"8",
"1",
"2",
"3"
],
3,
"Three isolated VE.Direct ports; more via USB."
],
[
"Cerbo VE.Can ports are:",
[
"VE.Can 1 isolated, VE.Can 2 non-isolated",
"Both non-isolated",
"Both isolated",
"VE.Can 1 only"
],
0,
"This matters when you bridge to NMEA 2000."
],
[
"A classic installer mistake with VE.Bus is:",
[
"Using Bluetooth",
"Using UTP cable",
"Plugging VE.Bus into an Ethernet port (or the reverse)",
"Fitting a terminator"
],
2,
"VE.Bus uses RJ45 sockets but is not Ethernet."
],
[
"Default Bluetooth PIN for a GX device made before serial HQ2242?",
[
"123456",
"The serial number",
"000000",
"1234"
],
2,
"From HQ2242 the PIN is random and printed on the label."
],
[
"VE.Can needs:",
[
"No termination",
"One terminator in the middle",
"A terminator at each end of the run",
"Only an end terminator at the GX"
],
2,
"Like any CAN backbone it needs two terminators."
],
[
"Which protocol is a point-to-point link, one device per port?",
[
"VE.Bus",
"Modbus TCP",
"VE.Direct",
"VE.Can"
],
2,
"VE.Direct is point to point."
],
[
"For third-party access to a whole Victron system, the easiest route is:",
[
"Modbus-TCP via the GX device",
"VE.Direct to each device",
"VE.Bus directly",
"Bluetooth advertising"
],
0,
"The GX device pre-calculates system values."
],
[
"What does the Remote Console on VRM let you do?",
[
"Bypass the fuse",
"Update the inverter hardware",
"Change the boat's AC wiring",
"Reach the GX device from anywhere through the portal"
],
3,
"Access is controlled in the VRM access settings."
],
[
"What does enabling DVCC do?",
[
"Turns the GX device into an active system controller",
"Disables Bluetooth",
"Resets firmware",
"Shuts down the inverter"
],
0,
"DVCC adds charge limits and shared voltage/temperature/current sense."
],
[
"With a managed CAN-bus battery and DVCC, chargers follow:",
[
"The battery's CVL, CCL and DCL",
"The VRM schedule",
"The DIP switches",
"Their own algorithm"
],
0,
"Charge voltage, charge current and discharge current limits."
],
[
"DVCC charge-current priority order:",
[
"MPPT, then Orion XS, then inverter/charger",
"Orion, MPPT, Multi",
"Inverter/charger, then MPPT, then Orion",
"All equal"
],
0,
"Solar gets priority."
],
[
"If the BMS CCL and the DVCC limit differ, which is used?",
[
"The DVCC always",
"The BMS always",
"The lower value",
"The higher"
],
2,
"The lower value wins."
],
[
"With a 50 A DVCC limit and a 25 A DC load, the chargers may deliver 75 A when:",
[
"SoC is 100 %",
"Float stage",
"A SmartShunt/BMV-712 is set as a DC meter",
"DVCC is off"
],
2,
"DC loads are compensated only if a DC-system shunt is configured."
],
[
"Which charge source is NOT limited by DVCC?",
[
"Orion XS",
"Multi/Quattro",
"A Skylla-i or a plain alternator",
"MPPT"
],
2,
"Only Victron inverter/chargers, MPPTs and Orion XS are controlled."
],
[
"Which DVCC option should only be used briefly during commissioning of some managed batteries?",
[
"Limit managed battery charge voltage",
"Limit charge current",
"SVS/STS/SCS",
"Shared voltage sense"
],
0,
"It can stop cell balancing if left on."
],
[
"Lynx Smart BMS with DVCC: Shared Temperature Sense is",
[
"Same as SVS",
"Mandatory",
"Using GX temp inputs",
"Forced off"
],
3,
"STS is forced off with the Lynx Smart BMS and some managed batteries."
],
[
"A lithium bank charges only to 80 % and the Multi's own settings look right. Check first:",
[
"DVCC and the BMS charge limits",
"The cable colour",
"Float timer",
"Peukert exponent"
],
0,
"The BMS CVL/CCL overrides local charger settings."
],
[
"Which generator start/stop option is the most feature-rich?",
[
"Manual switch",
"GX device generator start/stop",
"Multi relay with an assistant",
"BMV relay"
],
1,
"It supports SoC, voltage, load, test runs and silent times."
],
[
"Two generator start contacts wired in parallel mean:",
[
"Either may start the generator",
"Both must agree",
"Neither works",
"The generator never stops"
],
0,
"Series wiring requires both to agree."
],
[
"Generators needing separate start and stop pulses (such as some Onan/Cummins sets) need:",
[
"Extra circuitry or the assistant-based approach",
"A bigger fuse",
"Nothing extra",
"A second GX"
],
0,
"A single relay does not give two pulses."
],
[
"AC chargers on VE.Direct/VE.Can in an MFD integration (Smart IP43, Skylla) work only when:",
[
"DVCC is off",
"Bluetooth is on",
"Always",
"Shore power is connected"
],
3,
"The manual notes this limit."
]
]);
TRAINING.addQuestions("vic-batt", [
[
"A battery monitor calculates state of charge from:",
[
"Voltage only",
"Temperature",
"Cable length",
"The current flowing through its shunt"
],
3,
"It integrates current and resets at full-charge detection."
],
[
"All load and charger negatives must connect to:",
[
"The battery side of the shunt",
"The system-minus side of the shunt",
"The hull",
"Directly to the battery post"
],
1,
"Anything bypassing the shunt is not counted."
],
[
"If a fridge negative bypasses the shunt, SoC reads:",
[
"Correct",
"Zero",
"Too low",
"Too high"
],
3,
"Discharge current is missed."
],
[
"SmartShunt supply voltage range:",
[
"8 - 70 V",
"12 V only",
"24 - 48 V",
"6.5 - 70 V DC"
],
3,
"The SmartShunt supply range is 6.5-70 V DC."
],
[
"Maximum bolt torque on SmartShunt studs (except the 300 A model):",
[
"33 Nm",
"1.6 Nm",
"10 Nm",
"21 Nm"
],
3,
"The 300 A model is limited to 10 Nm."
],
[
"SoC shows 100 % always and charge/discharge read inverted. Fix:",
[
"Reset Peukert",
"Increase capacity",
"Change the tail current",
"Swap the two negative power cables on the monitor"
],
3,
"Charge should read positive and discharge negative."
],
[
"Recommended charged voltage for a 12 V lithium bank in the monitor:",
[
"13.9 V",
"14.7 V",
"12.0 V",
"14.0 V"
],
0,
"Lead-acid is 14.0 V; lithium is 13.9 V (27.8 V, 55.6 V)."
],
[
"Peukert exponent usually used for LiFePO4 unless the supplier says otherwise:",
[
"1.01",
"1.25",
"0.8",
"1.5"
],
0,
"Lithium has very little Peukert effect."
],
[
"Typical charge efficiency setting for lithium:",
[
"80 %",
"50 %",
"98 %",
"110 %"
],
2,
"Lead-acid is lower."
],
[
"A battery monitor declares the battery full when:",
[
"Voltage, tail current and detection time are all met",
"Time elapsed is 3 h",
"Voltage is met",
"The charger says float"
],
0,
"All three conditions together."
],
[
"Default tail current for a 200 Ah lead-acid bank is 4 %, which is:",
[
"16 A",
"8 A",
"4 A",
"2 A"
],
1,
"0.04 x 200 Ah = 8 A."
],
[
"Default charge detection time:",
[
"1 hour",
"10 minutes",
"3 minutes",
"30 seconds"
],
2,
"Raise it to avoid cloud-induced early resets on solar-only boats."
],
[
"SoC never reaches 100 % on a lithium bank because the charger stops early. Try:",
[
"Resetting history",
"Raising the tail current or checking charged voltage vs what the charger delivers",
"Lowering capacity",
"Swapping cables"
],
1,
"The monitor never sees the full-charge condition."
],
[
"Only one phone can connect to a SmartShunt by Bluetooth at a time. A steady blue LED means:",
[
"Firmware error",
"Unit unpowered",
"Bluetooth disabled",
"Another device is already connected"
],
3,
"A blinking blue LED means it is advertising."
],
[
"Lynx Distributor offers:",
[
"Pre-charge",
"Fused DC distribution with blown-fuse indication",
"Battery monitoring",
"AC distribution"
],
1,
"Up to four modules connect to a Lynx Smart BMS."
],
[
"What does the Lynx Smart BMS pre-charge circuit protect?",
[
"Against reverse polarity",
"Capacitive loads such as inverters at contactor close",
"The shore breaker",
"Against low temperature"
],
1,
"It avoids inrush damage."
],
[
"The Lynx Smart BMS has:",
[
"No reverse polarity protection",
"Built-in reverse protection",
"A 12 V-only design",
"AC output"
],
0,
"Check polarity before connecting."
],
[
"If current continues after ATC/ATD is open, the Lynx Smart BMS opens the contactor after:",
[
"5 minutes",
"30 seconds",
"1 hour",
"1 second"
],
1,
"A secondary safety delay."
],
[
"Lynx Smart BMS 500 A continuous contactor rating:",
[
"300 A",
"500 A (600 A peak for 5 min)",
"250 A",
"1000 A"
],
1,
"The 1000 A model has 1200 A peak."
],
[
"Charging Lithium Smart batteries is allowed from:",
[
"0 °C",
"+15 °C",
"+5 °C to +50 °C",
"-20 °C"
],
2,
"Discharge works from -20 to +50 °C."
],
[
"Maximum number of Lithium Smart batteries per system:",
[
"8",
"50",
"20",
"4"
],
2,
"Regardless of the BMS used."
],
[
"Recommended charge voltage for Lithium Smart batteries:",
[
"12.0 V",
"14.2 V (28.4 V)",
"13.2 V",
"16 V"
],
1,
"Range is 14-14.4 V; float 13.5 V."
],
[
"VE.Bus BMS V2 is used with:",
[
"SmartSolar only",
"Cerbo only",
"Skylla only",
"MultiPlus/Quattro"
],
3,
"Its charge-disconnect output goes free-floating on cell over-voltage/over-temperature."
],
[
"Smart Battery Sense is NOT needed when:",
[
"An MPPT is fitted",
"The battery is lead-acid",
"A GX device with DVCC controls the system",
"It is a 12 V system"
],
2,
"The GX device already shares voltage and temperature."
],
[
"For lithium installs, Wiring Unlimited says at least one fuse must have:",
[
"Interrupt rating at or above the bank's maximum prospective short-circuit current",
"A fast blow rating",
"A 12 V rating",
"A blue colour"
],
0,
"Interrupt rating (kA) matters as much as amps."
],
[
"A 32 V DC fuse (Mega/ANL) is:",
[
"Fine on any voltage",
"Only for 48 V",
"Fine on 12/24 V but wrong on 48 V",
"Only for AC"
],
2,
"Check DC voltage rating, not just amps."
]
]);
TRAINING.addQuestions("vic-pv", [
[
"In 'SmartSolar MPPT 150/45' the 45 is:",
[
"Fuse size",
"PV voltage",
"Weight",
"Maximum battery charge current in A"
],
3,
"First number is max PV Voc, second is charge current."
],
[
"The MPPT 100/30 nominal PV power at 24 V:",
[
"1400 W",
"880 W",
"700 W",
"440 W"
],
1,
"440 W at 12 V and 880 W at 24 V."
],
[
"MPPT 100/50 nominal PV power at 12 V:",
[
"440 W",
"700 W",
"500 W",
"880 W"
],
1,
"1400 W at 24 V."
],
[
"PV voltage must exceed battery voltage by how much for start-up?",
[
"5 V (then +1 V minimum)",
"0.1 V",
"20 V",
"None"
],
0,
"After starting, battery voltage + 1 V is the minimum."
],
[
"MPPT 100/30 and 100/50 default absorption/float (12 V):",
[
"14.7 V / 13.2 V",
"15 V / 14 V",
"13.8 V / 14.4 V",
"14.4 V / 13.8 V"
],
3,
"Equalisation is disabled by default (16.2 V at 12 V)."
],
[
"MPPT mounting rule:",
[
"Flat on a battery",
"Vertical on a non-flammable surface, terminals down, at least 10 cm clearance above and below",
"Horizontal over the battery",
"Terminals up"
],
1,
"Within 3 m of the battery and never directly above it."
],
[
"Torque for MPPT 100/30 battery and PV connections:",
[
"33 Nm",
"12 Nm",
"1.6 Nm",
"5.6 Nm"
],
2,
"These are small terminals."
],
[
"Voc at the coldest morning matters because:",
[
"Battery voltage falls",
"Current drops",
"Open-circuit voltage rises as temperature falls",
"Shading increases"
],
2,
"Use the panel's temperature coefficient."
],
[
"Absorption in the MPPT ends when current falls below:",
[
"0 A",
"The tail current (2 A)",
"10 A",
"100 mA"
],
1,
"It also adapts to the previous discharge depth."
],
[
"MPPT temperature compensation is poor when:",
[
"Lithium is used",
"A Smart Battery Sense is fitted",
"The charger's own internal temperature is used and it sits in a hot space",
"A BMV sensor is used"
],
2,
"Keep charger and battery within about 5 °C or use a direct battery sensor."
],
[
"MPPT error 33 means:",
[
"Over-current",
"Calibration lost",
"BMS lost",
"PV over-voltage (array Voc too high)"
],
3,
"It auto-resets when PV voltage drops; re-organise panels."
],
[
"MPPT error 38 recovery:",
[
"Disconnect panels, then battery, wait 3 minutes, reconnect battery then panels",
"Reset the app",
"Replace fuse",
"Reconnect panels first"
],
0,
"The charger needs the battery to power its controller first."
],
[
"MPPT error 116 in history only:",
[
"Replace unit",
"Re-torque terminals",
"Can be ignored if the unit works normally",
"Check cables"
],
2,
"Early units logged it at the factory."
],
[
"MPPT error 119 (settings data lost) needs:",
[
"Nothing",
"Replace the PV array",
"Change the cable",
"Factory defaults, power down 3 minutes, reconfigure"
],
3,
"It does not auto-reset."
],
[
"What does MPPT error 21 tell you to check about negatives?",
[
"Polarity of the load",
"PV minus / battery minus must not bypass the charger",
"Earth bond",
"Fuse colour"
],
1,
"Also update firmware and reset to defaults."
],
[
"Orion XS 12/12-50A continuous power up to 40 °C:",
[
"1500 W",
"350 W",
"700 W",
"50 W"
],
2,
"Derate above 40 °C."
],
[
"Orion XS 12/12-50A fuse and cable up to 5 m:",
[
"200 A, 70 mm²",
"60 - 70 A fuse, 16 mm² (6 AWG)",
"30 A, 4 mm²",
"10 A, 2.5 mm²"
],
1,
"4 AWG for 5-10 m."
],
[
"Orion XS terminal torque for 4 AWG / 25 mm²:",
[
"5.6 Nm",
"1.6 Nm",
"2.8 Nm",
"12 Nm"
],
0,
"6-10 AWG = 4.5 Nm; 8-12 AWG = 2.8 Nm."
],
[
"The Orion XS emergency reverse charge can supply up to:",
[
"100 A",
"1 A",
"25 A",
"5 A"
],
2,
"It can start a flat starter battery from the house bank."
],
[
"Orion XS error 67 means:",
[
"BMS connection lost",
"Short circuit",
"Over-temperature",
"Reverse polarity"
],
0,
"Output falls to base voltage after 15 s; error shown after 3 minutes."
],
[
"Orion-Tr Smart green LED blinking every 0.8 s means:",
[
"Bluetooth connected",
"Bulk or absorption",
"Error",
"Float"
],
1,
"Green on = float."
],
[
"Orion-Tr Smart blue LED blinking every 3 seconds:",
[
"Connected",
"No input",
"Identify",
"Error: read it in VictronConnect"
],
3,
"0.8 s = connected, 0.4 s = identify."
],
[
"Alternator output at idle can be only about:",
[
"100 %",
"150 %",
"10 %",
"50 % of its rating"
],
3,
"Set the Orion XS current limit with that in mind."
],
[
"Why do lithium banks risk overheating an alternator?",
[
"High resistance",
"Very low impedance lets the alternator run flat out for long periods",
"Cold temperatures",
"High voltage"
],
1,
"Limit charging current with a DC-DC charger."
]
]);
TRAINING.addQuestions("vic-chg", [
[
"Blue Smart IP22 Normal mode absorption (12 V):",
[
"13.8 V",
"14.2 V",
"14.7 V",
"14.4 V"
],
3,
"High = 14.7 V; Li-ion = 14.2 V."
],
[
"Which IP22 mode disables float?",
[
"Normal",
"Normal + Recondition",
"High",
"Li-ion"
],
3,
"Li-ion has storage 13.5 V and no float."
],
[
"IP22 Recondition voltage in Normal mode (12 V):",
[
"16.5 V",
"13.2 V",
"16.2 V",
"14.4 V"
],
2,
"High + Recondition is 16.5 V."
],
[
"IP22 charger LEDs: all four stage LEDs lit means:",
[
"Storage",
"Error",
"Night mode",
"Power supply mode"
],
3,
"Error is shown by all four blinking."
],
[
"IP22 NIGHT LED blinking means:",
[
"Error",
"Night mode",
"VE.Smart",
"Low current mode is enabled"
],
3,
"Night mode is steady for 8 hours."
],
[
"IP22 history shows the last how many charge cycles?",
[
"10",
"40",
"5",
"100"
],
1,
"In VictronConnect."
],
[
"IP22 12/20 DC cable for 1.5-3 m run:",
[
"10 mm²",
"2.5 mm²",
"4 mm²",
"16 mm²"
],
0,
"<1.5 m = 4 mm²; 4.5-6 m = 16 mm²."
],
[
"Why use an isolation transformer on shore power?",
[
"Blocks galvanic corrosion currents while keeping safe earthing",
"Removes the need for fuses",
"Charges batteries",
"Raises frequency"
],
0,
"Leaving earth out is dangerous; connecting it causes corrosion."
],
[
"The Victron isolation transformer 1:1.05 ratio:",
[
"Converts frequency",
"Boosts output by 5 %",
"Equals 1:1",
"Cuts output by 5 %"
],
1,
"Compensates marina voltage drop; it cannot convert frequency."
],
[
"Transformer terminals J33 to J21 do what?",
[
"Select 115 V",
"Link input and output earth for lift-out",
"Link output neutral to earth so an output GFCI works",
"Select 230 V"
],
2,
"J34A to J34 is the out-of-water link."
],
[
"When the vessel is out of the water, you should:",
[
"Remove the GFCI",
"Link input earth to output earth (J34A to J34)",
"Remove all earths",
"Link J1 to J2"
],
1,
"Remove it again before relaunch."
],
[
"Galvanic isolator VDI wiring position:",
[
"In the phase",
"In the green safety earth ahead of all vessel earth connections",
"On the DC bus",
"In the neutral"
],
1,
"Nothing on the vessel may bypass it."
],
[
"VDI isolator mounting:",
[
"Vertical for best cooling (IP67)",
"Upside down",
"Sealed in foam",
"Horizontal under batteries"
],
0,
"The heat sink normally rises no more than 20 °C."
],
[
"Shore breaker trips under high loads. Check:",
[
"Cable colour",
"Float voltage",
"VE.Can termination",
"AC input limit versus breaker rating and PowerAssist availability"
],
3,
"The limit should be at or below the pedestal."
]
]);
TRAINING.addQuestions("vic-wire", [
[
"Wiring Unlimited's guide for total cable voltage drop:",
[
"0.1 %",
"No more than 2.5 %",
"5 V",
"10 %"
],
1,
"0.3 V at 12 V, 0.6 V at 24 V, 1.2 V at 48 V."
],
[
"For a 2400 W load, current at 24 V is:",
[
"200 A",
"50 A",
"100 A",
"25 A"
],
2,
"200 A at 12 V and 50 A at 48 V."
],
[
"At 200 A through a 0.0016 ohm cable the drop is:",
[
"0.032 V",
"0.32 V",
"3.2 V",
"1.6 V"
],
1,
"V = I x R."
],
[
"A higher system voltage reduces voltage drop because:",
[
"Resistance rises",
"Fuses blow later",
"Current falls for the same power",
"Cable gets thicker"
],
2,
"2400 W at 48 V is only 50 A."
],
[
"Wiring Unlimited chart: 50 mm² with 10 m total positive+negative carries about:",
[
"75 A",
"38 A",
"150 A",
"30 A"
],
0,
"150 A at 5 m total."
],
[
"Yellow insulated crimp terminals suit:",
[
"2.5 - 6 mm²",
"1.5 - 2.5 mm²",
"10 - 25 mm²",
"0.5 - 1.5 mm²"
],
0,
"Red 0.5-1.5 mm², blue 1.5-2.5 mm²."
],
[
"Which splice does Wiring Unlimited suggest instead of butt splices?",
[
"Solder only",
"Bullet connector",
"Twisting and taping",
"WAGO 221-482 compact splicing connector"
],
3,
"For cables up to 4 mm²."
],
[
"After crimping a terminal you should:",
[
"Skip testing",
"Heat it with a flame",
"Paint it",
"Give the wire a small tug to test it"
],
3,
"Also use a ratcheting crimp tool."
],
[
"Lynx Smart BMS busbar torque (M10):",
[
"12 Nm",
"33 Nm",
"5.6 Nm",
"1.6 Nm"
],
1,
"Some older 1000 A units specify 14 Nm."
],
[
"Orion XS fuse for the 12/12-50A:",
[
"60 - 70 A",
"100 A",
"10 A",
"250 A"
],
0,
"Fit on both sides."
],
[
"Isolation transformer plus Quattro: avoid:",
[
"Using GFCI",
"Using 4500 W",
"Using PE",
"A second neutral-earth bond downstream"
],
3,
"Map every bond before testing."
],
[
"SoC drift upward after new loads were added is most likely due to:",
[
"Weak Wi-Fi",
"Bad crimp on VE.Can",
"Wrong clock",
"A negative wired to the battery bypassing the shunt"
],
3,
"Move it to the system side and resync."
],
[
"Before commissioning changes, you should:",
[
"Reset all devices",
"Disable Bluetooth",
"Save a settings file or screenshot as a baseline",
"Remove firmware"
],
2,
"It lets you compare after a fault."
],
[
"A 24 V 3 kVA unit within 5 m uses which fuse in the manual?",
[
"60 A",
"125 A",
"300 A",
"600 A"
],
2,
"24/3000/70 pairs with 300 A."
]
]);
TRAINING.addQuestions("vic-ref", [
[
"A VE.Bus error code requires the Inverter-on LED to:",
[
"Flash together with them",
"Flash in opposition to any flashing Bulk/Absorption/Float LED",
"Be steady",
"Be off"
],
1,
"Plus the device must be in error with no AC output."
],
[
"A flashing Bulk LED alone (OK code) means:",
[
"The device itself can perform inverter operation",
"Charging only",
"VE.Bus code 9",
"Overload"
],
0,
"A flashing float LED means it can charge."
],
[
"VE.Bus code 3 means:",
[
"Time sync problem",
"Internal error",
"Overvoltage on AC-out",
"Not all (or more than) the expected devices found"
],
3,
"Reconfigure and check communication cables."
],
[
"VE.Bus code 4:",
[
"Firmware mismatch",
"No other device detected",
"Master failed",
"Switch-over protection"
],
1,
"Check communication cables."
],
[
"VE.Bus code 5:",
[
"Cannot function as slave",
"Overvoltage has occurred",
"Overvoltage on AC-out",
"Device cannot transmit"
],
2,
"Check the AC cables."
],
[
"VE.Bus code 25 means:",
[
"Slave unsupported",
"Time sync",
"Firmware incompatibility between devices",
"Master failure"
],
2,
"Switch devices on one by one; update the last one switched on."
],
[
"VE.Bus code 24 possible fix:",
[
"Replace the battery",
"Increase charge current",
"Lower it to 100 V",
"Raise the AC input lower voltage limit to 210 V"
],
3,
"The factory setting is 180 V."
],
[
"VE.Bus code 26 is:",
[
"Slave unsupported",
"Overvoltage",
"Internal error",
"No device"
],
2,
"Switch all off and on; contact Victron if it persists."
],
[
"Bulk LED off, Float on, Absorption off = code:",
[
"20",
"2",
"8",
"5"
],
1,
"Bulk-off table, float-on row, absorption-off column."
],
[
"Bulk flashing, Float off, Absorption flashing = code:",
[
"3",
"13",
"21",
"12"
],
3,
"Bulk-flashing table, float-off row, absorption-flashing column."
],
[
"Bulk on, Float on, Absorption on = code:",
[
"17",
"8",
"18",
"26"
],
3,
"Bottom right of the bulk-on table."
],
[
"Bulk and Absorption LEDs flash together (special indication):",
[
"Temperature sensor fault",
"Overload",
"Mains rejected",
"Voltage sense error (over 7 V deviation)"
],
3,
"The unit stays in normal operation."
],
[
"Absorption and Float LEDs flash together:",
[
"Extremely unlikely battery temperature reading",
"Voltage sense error",
"Ground relay",
"Bulk protection"
],
0,
"Sensor defective or miswired."
],
[
"MultiPlus-II 'Low battery' and 'Overload' LEDs flashing simultaneously indicate:",
[
"DC ripple above 1.5 Vrms",
"VE.Bus code 3",
"Blown AC fuse",
"Mains loss"
],
0,
"Check battery cables, connections and capacity."
],
[
"MultiPlus-II: charge current falls to 0 when absorption starts. Possible cause:",
[
"Battery over 50 °C or a defective temperature sensor",
"Too low float",
"Weak GX",
"Wrong frequency"
],
0,
"Disconnect the sensor to test."
],
[
"MPPT error 38 and 39 mean:",
[
"BMS lost",
"Firmware incompatible",
"Over-temperature",
"PV input internally shorted to protect the battery"
],
3,
"Check battery voltage setting and other chargers."
],
[
"Orion XS error 122:",
[
"Short circuit",
"Overheating",
"BMS lost",
"History data corrupted: clear history in VictronConnect"
],
3,
"It does not auto-reset."
],
[
"Orion XS error 27 means:",
[
"Calibration lost",
"Terminal overheated",
"Charger short circuit (over-current on battery side)",
"Settings lost"
],
2,
"Auto-resets; else power down for 3 minutes."
],
[
"Lynx Smart BMS red LED: 3 flashes every 4 s:",
[
"Wrong system voltage",
"Pre-charge timeout",
"Contactor failure",
"High/low cell voltage or temperature"
],
3,
"Read the alarm in VictronConnect."
],
[
"Lynx Smart BMS red 7 flashes:",
[
"Probably wrong system voltage",
"Pre-charge high current",
"Internal supply error",
"Initialisation error"
],
0,
"5 = pre-charge timeout, 6 = pre-charge high current."
],
[
"Lynx Smart BMS red 10 flashes:",
[
"Battery comms error",
"Safety contactor failure",
"High BMS temperature",
"Contactor current too high"
],
1,
"2 = battery comms error, 8 = contactor current too high."
],
[
"Lynx Smart BMS red 14 flashes:",
[
"High BMS temperature",
"Battery voltage not allowed",
"Pre-charge timeout",
"Internal supply error"
],
1,
"12 = internal supply error."
],
[
"Lynx Smart BMS green LED steady means:",
[
"Running, contactor closed",
"Standby",
"Bootloader",
"Pre-charging"
],
0,
"Green blinking = pre-charging; green every 3 s = standby."
],
[
"VE.Direct CS value 3 is:",
[
"Float",
"Off",
"Fault",
"Bulk"
],
3,
"4 absorption, 5 float, 2 fault."
],
[
"VE.Direct ERR 19 can be:",
[
"A BMS fault",
"Fatal",
"Ignored only on BMV",
"Ignored: occurs at start-up/shutdown"
],
3,
"Not reported since v1.15."
],
[
"A Mass Combi Ultra 'Shunt Mismatch' alarm means:",
[
"The shunt is too small",
"The cable is too thin",
"The nominal voltage set at the MasterShunt/MLi differs from what the Combi detects",
"Generator frequency error"
],
2,
"Check battery voltage and settings."
]
]);
TRAINING.addQuestions("victron", [
[
"VictronConnect settings changes for a VE.Bus unit need:",
[
"A GX only",
"The Smart dongle",
"A MK2-USB",
"An MK3-USB"
],
3,
"The Smart dongle is status-only."
],
[
"The VE.Bus Smart dongle can:",
[
"Change settings",
"Read data, switch On/Off/Charger-only and set the shore current limit",
"Configure parallel",
"Update firmware"
],
1,
"It is Bluetooth based."
],
[
"VictronConnect on iOS can configure a Multi?",
[
"Only Phoenix",
"Yes",
"No: iOS cannot connect an MK3-USB",
"Only Quattro"
],
2,
"Android, Windows and macOS can."
],
[
"What firmware is needed for full VictronConnect functionality on VE.Bus?",
[
"19xx200",
"None",
"415 or higher",
"100"
],
2,
"Only units with the new microcontroller (software number starting 26/27)."
],
[
"The RJ45 cable for MK3 must be:",
[
"Hand-crimped",
"Crossover",
"An industrially made straight-through UTP",
"Coax"
],
2,
"Hand-crimped cables often cause problems."
],
[
"A VE.Bus firmware update causes:",
[
"A reset to factory defaults",
"DIP reset",
"No change",
"Only history clear"
],
0,
"Save settings first."
],
[
"Victron says stable systems should be updated when:",
[
"Never",
"Every month",
"Commissioning, troubleshooting or a new feature is needed",
"Always latest"
],
2,
"No need to chase updates."
],
[
"In Victron lithium mode (VE.Bus guide) drop-in battery with built-in BMS:",
[
"Use VE.Bus BMS",
"Enable lithium mode and set maker's voltages; no Assistant needed",
"Disable charger",
"Install the BMS assistant"
],
1,
"Case A."
],
[
"Which protocol is RS485 daisy chain, proprietary?",
[
"Modbus",
"VE.Can",
"VE.Direct",
"VE.Bus"
],
3,
"VE.Can is CAN; VE.Direct is point to point."
],
[
"'Overruled by remote' should typically be ticked for:",
[
"Never",
"Stationary systems",
"Generator inputs",
"Shore connections on boats"
],
3,
"So the user can match the pedestal limit."
],
[
"DC input low restart should be:",
[
"Zero",
"Below shut-down",
"At least ~1 V above low shut-down",
"Equal"
],
2,
"Prevents rapid cycling."
]
]);
