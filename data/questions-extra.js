/* Manual-derived question banks (generated from /workspace/qa/qgen). Format: [question, options, correctIndex, explanation] */
TRAINING.addQuestions("enerdrive", [
[
"On the DC2DC+ 40A, which channel is the start battery / alternator input?",
[
"The ignition-sense terminal",
"CH1",
"CH3",
"CH2"
],
2,
"CH3 = alternator/start input, CH2 = solar, CH1 = house battery output."
],
[
"What is the maximum solar open-circuit voltage for the DC2DC+ solar input?",
[
"24 V",
"60 V",
"100 V",
"45 V"
],
3,
"Above 45 V the unit shuts down (E03) and can be damaged."
],
[
"The DC2DC+ treats a CH3 input above what voltage at first connection as a 24 V system?",
[
"13 V",
"17 V",
"24 V",
"12.6 V"
],
1,
"It stores the result until the input is disconnected or drops below 7 V."
],
[
"How close to each battery must the DC2DC+ fuse or breaker be installed?",
[
"Within 50 cm of the unit",
"Beside the unit only",
"Within 20 cm",
"Within 2 m"
],
2,
"The manual calls for an individual fuse or breaker within 20 cm of both the start and house batteries."
],
[
"Recommended DC2DC+ fuse on the alternator/start side?",
[
"150 A",
"70 A",
"10 A",
"30 A"
],
1,
"70 A alternator side, 60 A house side."
],
[
"What does the manual say about automatic resettable breakers on the DC2DC+ alternator side?",
[
"Only for lithium",
"Required at 24 V",
"Not recommended",
"Required"
],
2,
"Use fuses or manual breakers instead."
],
[
"The DC2DC+ cable sizing figures are based on what voltage drop?",
[
"10 %",
"20 %",
"0.5 %",
"3 %"
],
3,
"One-way sizes, calculated with the return run, for 3 % drop."
],
[
"DC2DC+ normal-mode start-up threshold on a 12 V input?",
[
"Above 10.5 V",
"Above 13.2 V",
"Above 14.4 V",
"Above 12.0 V"
],
1,
"Normal start-up 13.2 V, recovery 12.8 V. Priority start-up is 12.3 V."
],
[
"What puts the DC2DC+ into Priority mode?",
[
"A solar input above 30 V",
"A lithium battery",
"Ignition-sense input or manual override",
"A temperature sensor"
],
2,
"Priority mode uses lower start-up thresholds, intended for smart alternators."
],
[
"What is the DC2DC+ under-voltage shutdown on a 12 V input?",
[
"8 V",
"9.5 V",
"12 V",
"10.5 V"
],
3,
"24 V input shuts down at 21.0 V."
],
[
"The DC2DC+ display shows the CH3 input check every 3 minutes for 5 seconds. Is this a fault?",
[
"Yes, E05",
"No, it is normal operation",
"Yes, E03",
"Yes, A01"
],
1,
"The unit charges 3 minutes then rests 5 s to check the input voltage."
],
[
"What solar input range does the DC2DC+ MPPT accept?",
[
"10-24 V only",
"5-12 V",
"30-100 V",
"14.5-45 V"
],
3,
"Shutdown below 14.5 V, recovery at 15 V."
],
[
"Recommended maximum solar power on the DC2DC+ solar input?",
[
"40 W",
"1500 W",
"500 W",
"100 W"
],
2,
"About 20 % over-drive (600 W) is accepted."
],
[
"Does the DC2DC+ temperature sensor need to be fitted on lithium installs?",
[
"Yes, always",
"Only on AGM",
"No",
"Yes at 24 V"
],
2,
"The RJ12 sensor port is for lead-acid temperature compensation."
],
[
"What does a green slow-flashing (2 s) ePRO Plus shunt light mean?",
[
"Error",
"Initialising",
"Needs recharging",
"Healthy main battery, state of charge above 50 %"
],
3,
"Orange slow = 30-50 %, red slow = below 30 %, red fast = error."
],
[
"What does a fast red flashing ePRO Plus shunt light indicate?",
[
"Error",
"Empty battery",
"Charging",
"Normal"
],
0,
"Red fast (0.5 s) is an error; red slow is empty."
],
[
"How many battery banks can the ePRO Plus monitor?",
[
"Up to three",
"Six",
"One",
"Two"
],
0,
"Plus a 600 A peak (500 A continuous) rating."
],
[
"Why must the battery negative be interrupted for the ePRO Plus shunt?",
[
"It is a safety rule for lithium",
"So the shunt sits in the high-current path",
"To isolate the display",
"To reduce voltage"
],
1,
"Current that bypasses the shunt is not measured."
],
[
"Which B-TEC rule prevents it draining a start battery?",
[
"Fit a diode",
"Never connect it via a VSR; use a DC-DC charger",
"Use AGM only",
"Always parallel with starter"
],
1,
"The lithium voltage can keep a VSR closed and drain the start battery."
],
[
"Can B-TEC batteries be wired in series to make a higher voltage?",
[
"Only for 24 V",
"Yes, up to 4",
"Yes with a balancer",
"No, buy a purpose-built higher-voltage battery"
],
3,
"Parallel is allowed, series is not."
],
[
"What is the largest inverter on a single 12 V 100 Ah B-TEC?",
[
"1000 W",
"2000 W",
"3000 W",
"500 W"
],
0,
"125 Ah: 1000 W, 200 Ah: 2600 W, 300 Ah: 3000 W."
],
[
"Over-discharge protection on B-TEC occurs at what cell voltage?",
[
"3.60 V",
"2.80 V per cell",
"1.50 V",
"2.00 V"
],
1,
"About 11.2 V on a 12 V battery; release at 3.20 V per cell."
],
[
"After a B-TEC low-voltage shutdown, how long do you have to recharge?",
[
"No limit",
"24 hours",
"30 days",
"14 days"
],
3,
"Leaving it flat can damage the battery."
],
[
"What charge voltage is needed to release a 12 V B-TEC from low-voltage protection?",
[
"14.8 V only",
"12.8 V or more",
"13.8 V",
"10 V"
],
1,
"25.6 V on 24 V, 38.4 V on 36 V models."
],
[
"B-TEC app alarm code LTC means:",
[
"Lithium temperature critical",
"Low temperature charge",
"Low thermal current",
"Load test complete"
],
1,
"LTD is low temperature discharge, HTD high temperature discharge."
],
[
"Recommended DC fuse for the 12 V 3000 W Enerdrive inverter-charger?",
[
"600 A",
"100 A",
"150 A",
"300 A"
],
3,
"250 A on the 2000 W unit."
],
[
"The 2000/3000 W inverter-charger DC cable should be rated at least:",
[
"105 C copper, under 1.5 m per leg",
"60 C aluminium",
"90 C, under 5 m",
"75 C, any length"
],
0,
"Longer runs need a thicker cable."
],
[
"Front-panel code F08 sets:",
[
"Battery type",
"Buzzer",
"Bulk current",
"Load sense"
],
0,
"F02 load sense, F06 buzzer, F09 bulk current."
],
[
"Which F-code is the AC charger on/off?",
[
"F03",
"F01",
"F14",
"F07"
],
3,
"Default ON."
],
[
"Default battery type on the 2000/3000 W inverter-charger?",
[
"AGM",
"Li (lithium)",
"Flooded",
"Gel"
],
1,
"Options Li, AGM, FLd, PGM, PSY."
],
[
"E01 in bypass mode on the inverter-charger means:",
[
"Output short",
"AC reversed",
"Over-temperature",
"Battery below 9.5 V"
],
3,
"Charge current limited to ~25 A and E11 follows after 15 min."
],
[
"ePRO Combi DIP 1 ON means:",
[
"External: settings come from ePRO Dashboard",
"Factory reset",
"Local: DIP switches rule",
"60 Hz mode"
],
0,
"With DIP 1 OFF the DIP switches override Dashboard settings."
],
[
"ePRO Combi default charge program (DIP 5 OFF, 6 ON)?",
[
"Custom",
"Flooded",
"AGM",
"GEL"
],
2,
"5 OFF 6 OFF Flooded; 5 ON 6 OFF GEL; both ON Custom."
],
[
"Which accessory is needed to use ePRO Dashboard with the Combi?",
[
"Bluetooth dongle",
"VE.Direct cable",
"ePROLink to USB Communication Kit",
"MasterBus USB"
],
2,
"Part 5092120 with an isolated interface box."
],
[
"On the ePRO Combi, DIP 2 selects:",
[
"Battery type",
"ASB",
"Inverter frequency 50/60 Hz",
"Boost"
],
2,
"OFF = 50 Hz, ON = 60 Hz."
],
[
"What does ASB (Automatic Stand By) do on the ePRO Combi?",
[
"Cuts charging",
"Bonds neutral",
"Pulses the output to look for a load",
"Selects GEL"
],
2,
"Leave off for clocks, computers and AV gear."
],
[
"ePRO Combi ground switch function?",
[
"Bonds AC output neutral to PE in inverter mode",
"Isolates shore",
"Grounds the DC negative",
"Selects 60 Hz"
],
0,
"It enables GFCI use in inverter mode; disable for a floating output."
]
]);
TRAINING.addQuestions("mastervolt", [
[
"Mass Combi Ultra 12/3000: continuous power at 25 C?",
[
"1500 W",
"2000 W",
"3500 W",
"3000 W"
],
3,
"Peak load 6000 W."
],
[
"Mass Combi Ultra 24/3500 maximum peak load?",
[
"7000 W",
"3500 W",
"5000 W",
"10000 W"
],
0,
"12 V model peak 6000 W."
],
[
"Which Mass Combi Ultra models have a PV (SOLAR) input?",
[
"12/3000-150 and 24/3500-100",
"All three",
"None",
"48/3500-50 only"
],
0,
"The 48 V model has no solar input."
],
[
"Torque for the Mass Combi Ultra DC M8 connections?",
[
"15-20 Nm",
"40-50 Nm",
"1-2 Nm",
"5 Nm"
],
0,
"Crimp M8 lugs with the right tool and fuse the positive."
],
[
"Minimum PE conductor from the Mass Combi Ultra ground stud?",
[
"35 mm2",
"2.5 mm2",
"10 mm2",
"1.5 mm2"
],
2,
"M6 stud on the left side, to the hull or chassis."
],
[
"Mass Combi Ultra: is the automatic neutral-to-earth link enabled by default?",
[
"Only in power-sharing",
"Yes in inverter mode only",
"No, disabled; enable it with the ground relay setting (B8)",
"Yes"
],
2,
"Follow local rules and use RCDs."
],
[
"Mass Combi Ultra DIP B1/B2 = 0/1 sets the mains input fuse to:",
[
"16 A",
"6 A",
"10 A",
"30 A"
],
2,
"00 = 30 A, 10 = 16 A, 01 = 10 A, 11 = 6 A."
],
[
"Which output on the Mass Combi Ultra is only live when external AC is present?",
[
"Output 2",
"Both",
"Neither",
"Output 1"
],
0,
"Output 1 is always powered."
],
[
"What does power sharing do?",
[
"Shares loads between batteries",
"Doubles inverter output",
"Parallel two units",
"Reduces charger current as load rises so the input stays within the limit"
],
3,
"Set the limit equal to the upstream breaker."
],
[
"Mass Combi Ultra main switch positions?",
[
"On, Off, Inverter Off",
"On, Standby, Charge",
"I, II, III",
"Auto, Manual, Off"
],
0,
"No red LED lit while active means no failure detected."
],
[
"ChargeMaster Plus: how many outputs does it have?",
[
"Four",
"Three",
"Two",
"One"
],
1,
"They share total current and charge to the same settings."
],
[
"ChargeMaster Plus DIP 1 ON enables:",
[
"MasterBus configuration",
"CZone mode",
"Lithium mode",
"Remote off"
],
0,
"On CZone, DIP 1 and 2 are OFF."
],
[
"ChargeMaster Plus DIP 3-4-5 = 1-0-0 selects:",
[
"Lithium-ion (fixed, for Mastervolt MLI)",
"AGM",
"Gel",
"Flooded"
],
0,
"0-0-1 Flooded, 0-1-0 AGM, 0-1-1 Gel."
],
[
"ChargeMaster Plus DIP 3-4-5 = 1-1-1 selects:",
[
"Test mode",
"Equalise",
"Gel",
"Constant voltage 13.25 / 26.50 V without temperature compensation"
],
3,
"A fixed constant-voltage setting."
],
[
"ChargeMaster Plus float voltage for AGM/Gel (12 V)?",
[
"13.25 V",
"13.50 V",
"14.25 V",
"13.80 V"
],
3,
"Flooded float 13.25 V, lithium 13.50 V."
],
[
"What do DIP 3-10 mean on a CZone-configured ChargeMaster Plus?",
[
"Current limit",
"Unique CZone address (at least one ON)",
"Language",
"Battery type"
],
1,
"DIP 1 and 2 must be OFF."
],
[
"A DIP-switch setting conflicts with MasterBus. Which wins?",
[
"The newer setting",
"Neither, it faults",
"MasterBus",
"The DIP switch"
],
3,
"A greyed-out setting in MasterAdjust usually means a DIP is not at default."
],
[
"How is the ChargeMaster Plus switched on and off?",
[
"Press once",
"Remove AC",
"Switch the DIP",
"Hold ON/OFF about 3 s"
],
3,
"Off or stand-by does not isolate it from the battery or AC."
],
[
"How many terminators does a MasterBus network need?",
[
"One",
"Three",
"None",
"One at each end"
],
3,
"A missing terminator is a classic cause of unreliable data."
],
[
"May a MasterBus network contain a T-connection?",
[
"Yes up to 3",
"Yes",
"Only with a hub",
"No, it is a linear chain with no rings or T-connections"
],
3,
"Use straight UTP cables."
],
[
"How many non-powering devices can one MasterBus powering device support?",
[
"Three",
"Sixty-three",
"Ten",
"One"
],
0,
"At least one powering device is required."
],
[
"Maximum devices on a MasterBus network per the MLI Ultra manual?",
[
"63",
"8",
"255",
"16"
],
0,
"Only MasterBus devices should be connected."
],
[
"What do you use to configure MasterBus devices from a laptop?",
[
"VictronConnect",
"ePRO Dashboard",
"MasterAdjust via a MasterBus USB interface",
"CZone tool only"
],
2,
"The interface's green LED should light or blink."
],
[
"MasterShunt 500 includes which fuse?",
[
"T-500A",
"MRBF 300",
"ANL 100",
"None"
],
0,
"Fuse is a last line of defence."
],
[
"MasterShunt Peukert exponent range?",
[
"1.0 only",
"1.01-1.50",
"0.5-2.0",
"2-5"
],
1,
"Do not change without detailed battery knowledge."
],
[
"MasterShunt default 'Amp = Full' threshold?",
[
"10 %",
"20 %",
"2.0 % of capacity",
"0.1 %"
],
2,
"Adjustable 0.1-10 %."
],
[
"A 300 Ah bank, Amp = Full 2 %. Current below which the bank counts as full?",
[
"60 A",
"6 A",
"3 A",
"30 A"
],
1,
"300 x 0.02 = 6 A, together with the other conditions."
],
[
"MasterShunt default Pre SOC low alarm?",
[
"80 %",
"10 %",
"20 %",
"40 %"
],
3,
"SOC low 35 %, SOC OK 80 %."
],
[
"MasterShunt never returns to 100 %. What does the manual suggest?",
[
"Re-wire shunt",
"Lower the float voltage setting by 0.1 V",
"Disable alarms",
"Raise capacity"
],
1,
"Float should be set just under the lowest float voltage of all chargers."
],
[
"Allowed open-clamp voltage before installing a 12 V MLI Ultra?",
[
"10-12 V",
"12.0-14.6 V",
"14.6-18 V",
"9-20 V"
],
1,
"24 V models 24.0-29.2 V."
],
[
"Maximum main T-fuse for an MLI Ultra system?",
[
"500 A with 15 kA breaking capacity",
"50 A",
"150 A, 5 kA",
"1000 A"
],
0,
"A safety relay is also required."
],
[
"MLI Ultra: recommended Depth of Discharge Remaining for best cycle life?",
[
"50 %",
"80 %",
"10 %",
"100 %"
],
1,
"100 % reduces cycle life."
],
[
"MLI Ultra cell temperature above which a non-resettable event occurs?",
[
"45 C",
"75 C",
"30 C",
"65 C"
],
1,
"Above 65 C is a resettable event."
],
[
"Torque on MLI Ultra main DC connections?",
[
"50 Nm",
"0.5 Nm",
"14.7-19.6 Nm",
"1 Nm"
],
2,
"Per the manual."
],
[
"Alpha Pro III: target alternator rpm?",
[
"3000 and 8000",
"6000 constant",
"About 1500 at idle and 3500 at cruising",
"500 and 1000"
],
2,
"Mastervolt alternators use a two-V-belt pulley."
],
[
"Alpha Pro III field fuse for Mastervolt alternators?",
[
"50 A",
"10 A",
"1 A",
"100 A"
],
1,
"20 A maximum for others."
],
[
"What must the Alpha Pro [reg on] terminal be connected to?",
[
"Chassis",
"Always live",
"Battery negative",
"An ignition relay or oil-pressure switch"
],
3,
"Left on with the engine stopped it overheats the field windings."
],
[
"Alpha Pro D+ lamp: 3 short blinks every 2 s mean:",
[
"OK",
"Battery too high",
"I field too high",
"I field too low"
],
2,
"2 short = U battery too high; 1 short = I field too low."
]
]);
TRAINING.addQuestions("steer", [
[
"Which ACU is for a constant-running pump with solenoid valves?",
[
"ACU-300",
"ACU-100",
"ACU-200",
"ACU-400"
],
0,
"ACU-300 drive output 5 A."
],
[
"ACU-200 maximum continuous drive output?",
[
"7 A",
"5 A",
"15 A",
"30 A"
],
2,
"ACU-100 7 A, ACU-400 30 A."
],
[
"Which ACU does NOT power the SeaTalkng backbone?",
[
"ACU-300",
"ACU-200",
"ACU-400",
"ACU-100"
],
3,
"The others list a 3 A / 12 V SeaTalkng output."
],
[
"What ACU suits a Type 2 or Type 3 hydraulic pump?",
[
"ACU-200",
"ACU-400",
"ACU-300",
"ACU-100"
],
1,
"30 A maximum continuous."
],
[
"Raymarine preferred ground conductor for under 1 m runs?",
[
"0.5 mm2",
"6 mm2 (#10 AWG) or more",
"1 mm2",
"2 mm2"
],
1,
"8 mm2 (#8 AWG) over 1 m."
],
[
"A LOW BATTERY alarm on an EV-1 system is commonly caused by:",
[
"Low supply voltage at the ACU from thin cable or poor connections",
"Wrong hull type",
"Compass drift",
"AIS fault"
],
0,
"Check supply voltage at the ACU under load."
],
[
"Should an SR50 weather receiver share a bus with Evolution components?",
[
"Yes",
"Only with an ACU-400",
"Only at 24 V",
"No, use a separate isolated bus"
],
3,
"Bandwidth issues."
],
[
"Evolution set-up order after power-up and software updates?",
[
"Sea trial first",
"Hull type, Dockside wizard, hard-over time if no rudder reference, compass linearization",
"Compass, then power",
"AIS first"
],
1,
"Complete these before sea-trial wizards."
],
[
"How long is a long press to power on an Evolution pilot display?",
[
"0.2 s",
"10 s",
"About 2 s",
"30 s"
],
2,
"About 5 s to power off."
],
[
"Minimum distance of the EV-1 CCU from iron, magnets and high-current wires?",
[
"3 m",
"5 cm",
"60 cm (2 ft)",
"10 cm"
],
2,
"Test with a handheld compass; more than three degrees movement means interference."
],
[
"Minimum distance of a large magnet (subwoofer) from a CCU location?",
[
"60 cm",
"1.5 m (5 ft)",
"10 cm",
"5 m"
],
1,
"Per the EV-1 install guide."
],
[
"What should the Dockside wizard do with rudder alignment?",
[
"Auto-detect",
"Only starboard",
"Centre, port, starboard, back to centre with OK at each",
"Skip"
],
2,
"With a rudder reference transducer."
],
[
"NAC-3 power feed includes which fuse?",
[
"1 A",
"3 A",
"100 A",
"30 A"
],
3,
"Check polarity, install the fuse, then power on."
],
[
"How many terminators does a NMEA 2000 backbone need?",
[
"Two",
"None",
"Four",
"One"
],
0,
"120 ohm each at opposite ends."
]
]);
TRAINING.addQuestions("trim", [
[
"Lenco switch convention: the left side controls which tab?",
[
"Port",
"Neither",
"Starboard (based on bow position)",
"Both"
],
2,
"Test each tab after wiring."
],
[
"What do the Lenco helm display's purple wire do?",
[
"Powers actuators",
"Ground",
"GPS data",
"Senses ignition off to automatically retract the tabs"
],
3,
"It uses no ignition current."
],
[
"Lenco control unit supply capability required?",
[
"100 A",
"20 A at 12 V or 10 A at 24 V",
"5 A at 24 V",
"1 A"
],
1,
"Dual-actuator wiring drawings quote 30 A at 12 V / 20 A at 24 V."
],
[
"The Lenco Auto Glide control box and keypad draw about what in standby?",
[
"3.5 A",
"0 mA",
"35 mA",
"35 A"
],
2,
"Hence the battery switch recommendation."
],
[
"Lenco control box mounting?",
[
"Upside down",
"Vertical surface, connector toward the stern, level within about 15 degrees",
"On the engine",
"Horizontal, any"
],
1,
"Keypad clearance is 2.75 in square."
],
[
"Zipwake Series S/E supply and fuse?",
[
"12-32 V DC, 15 A fuse, no automatic thermal/magnetic fuse",
"24 V only",
"5 V, none",
"120 V"
],
0,
"Cable limit 6 m interceptor to distribution unit."
],
[
"Humphree: why is blade offset calibration mandatory on an angled transom?",
[
"For GPS",
"For the fins",
"Failure can severely affect vessel motion even with the blade retracted",
"Warranty marketing"
],
2,
"Do not set the interceptor level with the hull bottom on an angled transom."
],
[
"Seakeeper 3 high-current 12 V source requirement?",
[
"10-16 V, 75 A continuous, 100 A overcurrent protection",
"24 V 5 A",
"11-12 V 5 A",
"100 V"
],
0,
"Seakeeper 1: 11.3-16 V, 55 A continuous, 80 A overcurrent protection."
],
[
"Where should a Seakeeper be mounted?",
[
"Any wet space",
"Aft of amidships, dry, with maintenance clearance",
"Bilge",
"Forward"
],
1,
"It generates forces of up to 6.74 kN (Seakeeper 1)."
],
[
"Bennett/Lenco acceleration-state step: how long to hold the throttle up straight?",
[
"None",
"10 hours",
"30 minutes",
"About 3 seconds without using the tabs"
],
3,
"Part of the orientation process; FAV lights stop flashing when oriented."
]
]);
TRAINING.addQuestions("prop", [
[
"Run a Side-Power thruster out of the water?",
[
"Yes, for up to 5 minutes",
"Yes, if the battery is disconnected",
"Yes, on 24 V models",
"Never: no load means extreme speed"
],
3,
"On land only a fraction of a second, and let propellers stop before reversing."
],
[
"Where do you place the thruster fuse and isolator?",
[
"Anywhere",
"As close as possible to battery positive, easily accessible",
"In the bilge",
"At the thruster only"
],
1,
"Required per the Side-Power manual."
],
[
"Washers between lugs on a thruster power connection?",
[
"Rubber washers",
"One of each",
"Always flat washers",
"Do not use flat washers: overheating and fire"
],
3,
"Spring washers go on the outer position."
],
[
"Side-Power M10 nut torque?",
[
"2 Nm",
"50 Nm",
"100 Nm",
"23 Nm"
],
3,
"M8 is 13 Nm."
],
[
"What can a big lithium bank do to ON/OFF thrusters?",
[
"Improve life",
"Only slows them",
"Over-volt them, shortening life and voiding warranty",
"Nothing"
],
2,
"Check the rated voltage of the thruster."
],
[
"Thruster tunnel centre depth rule (Side-Power)?",
[
"10 cm below",
"On the waterline",
"Half a diameter above",
"At least one tunnel diameter below waterline"
],
3,
"Tunnel ends have a 10 % radius."
],
[
"Vetus V-CAN total network limit?",
[
"400 m",
"4 m",
"1 km",
"40 m"
],
3,
"Supply is 12 V (10-16 V)."
],
[
"Vetus BOW PRO motor controller fuse in the commissioning checklist?",
[
"100 A",
"5 A (ATO)",
"None",
"1 A"
],
1,
"Confirm it is fitted."
]
]);
TRAINING.addQuestions("nav", [
[
"Max NMEA 2000 single drop cable length?",
[
"6 m (20 ft)",
"100 m",
"1 m",
"60 m"
],
0,
"All drops combined may total 78 m."
],
[
"Max NMEA 2000 total devices?",
[
"50",
"255",
"253",
"10"
],
0,
"Per Garmin's rules."
],
[
"NMEA 2000 maximum voltage drop to the farthest device?",
[
"12 V",
"3 V",
"6 V",
"0.1 V"
],
1,
"Power in the middle of the network if necessary."
],
[
"NMEA 2000 power voltage?",
[
"5 V",
"24 V",
"12 V DC only, never 24 V",
"48 V"
],
2,
"Fused (Garmin cable includes 3 A) and connected to the TOP of a T-connector."
],
[
"Max distance between any two points on a NMEA 2000 backbone?",
[
"6 m",
"100 m (328 ft)",
"10 m",
"1 km"
],
1,
"Measured between terminators plus end drops."
],
[
"On a CZone network, how does a module get its address?",
[
"Bluetooth",
"Unique dipswitch setting (or virtual dipswitch on bridges)",
"Serial number",
"Auto only"
],
1,
"MasterBus bridge defaults 11111111."
],
[
"CZone COI OUT-H: how many outputs and rating?",
[
"4 outputs at 25 A each",
"2 at 100 A",
"8 at 10 A",
"16 at 25 A"
],
0,
"OUT-L is 12 outputs at 10 A, dimmable."
],
[
"Total current limits on a COI?",
[
"1000 A",
"10 A",
"40 A",
"80 A OUT-H, 100 A OUT-L"
],
3,
"Rated for 150 A at 40 C, derating above."
],
[
"CZone COI USB read: how long to hold the USB button?",
[
"1 min",
"5 s (LED flashes red; solid green when done)",
"None",
"1 s"
],
1,
"Use FAT32; the drive must have no .zcf or .czfwp files."
],
[
"CZone COI firmware file type?",
[
"Many .zcf",
"exe",
"A single .czfwp (no .zcf)",
"A zip with .bak"
],
2,
"Can take 10-40 minutes."
]
]);
TRAINING.addQuestions("shore", [
[
"Victron VDI-32 maximum current?",
[
"64 A",
"32 A",
"16 A",
"100 A"
],
1,
"Peak 3200 A for 20 ms."
],
[
"Victron galvanic isolator IP rating?",
[
"IP44",
"IP00",
"IP67 (potted)",
"IP20"
],
2,
"Mount length vertical with 10 cm clearance."
],
[
"Where is a galvanic isolator wired?",
[
"Into the green safety ground before all vessel ground connections",
"Line",
"Neutral",
"DC negative"
],
0,
"No ground connection may bypass it."
],
[
"Onan MDKC/MDKD common ground conductor size?",
[
"Same as the largest battery cable",
"Half the cable",
"Any",
"1 mm2"
],
0,
"USCG 33 CFR 183.415 requires it between genset and propulsion cranking circuits."
],
[
"Onan genset bonding point?",
[
"Starter",
"Fuel tank",
"Exhaust",
"Engine block, same location as negative battery cable"
],
3,
"A metallic fuel line is bonded too."
],
[
"Fischer Panda minimum distance (exhaust elbow critical point to maximum water level)?",
[
"3 mm",
"6 m",
"60 mm",
"600 mm"
],
3,
"Treat as a minimum."
],
[
"Fischer Panda AGT-DC: what happens if started with the battery disconnected?",
[
"Nothing",
"Rectifier diodes are damaged",
"Faster start",
"Engine overspeeds only"
],
1,
"The diode block is fresh-water cooled; loss of coolant can also damage it quickly."
],
[
"AGT-DC rectifier screw torque?",
[
"4 Nm",
"0.4 Nm",
"40 Nm",
"12 Nm"
],
0,
"Use a torque wrench."
],
[
"Recommended battery with an inverter on AGT-DC at 12 V?",
[
"10 Ah",
"40 Ah",
"None",
"At least 240 Ah"
],
3,
"At 24 V at least 120 Ah."
],
[
"A Fischer Panda engine will not stop or runs rough. First check?",
[
"Anode",
"Alternator",
"Display",
"The 12 V fuel solenoid valve"
],
3,
"Unplug it briefly while running: the engine should react immediately."
]
]);
TRAINING.addQuestions("hotel", [
[
"Maxwell windlass breaker/isolator maximum distance from battery?",
[
"10 m",
"None",
"1.8 m (6 ft)",
"50 cm"
],
2,
"Accessible and dry location."
],
[
"Maxwell RC8-8 12 V recommended protection?",
[
"40 A",
"50 A",
"135 A",
"70 A"
],
2,
"RC6 12 V 50 A; RC8-6 12 V 70 A; RC10 12 V 135 A."
],
[
"Maxwell RC6 24 V recommended protection?",
[
"5 A",
"40 A",
"80 A",
"135 A"
],
1,
"Slow-blow fuse (with battery switch) or breaker."
],
[
"Maxwell cable table allows what voltage drop?",
[
"10 % at working load",
"0.1 %",
"50 %",
"None"
],
0,
"Cable length is total battery to winch and back."
],
[
"Maxwell footswitch minimum distance from the windlass?",
[
"5 m",
"None",
"5 mm",
"500 mm"
],
3,
"Keep breather holes clear."
],
[
"Maxwell HRC motor earthing?",
[
"Bonded to anchor",
"Isolated-earth type: not separately earthed",
"Floating relay",
"Must be earthed to hull"
],
1,
"Anchor and chain must be insulated from the hull."
],
[
"Which action do the Maxwell manuals warn against when changing windlass direction?",
[
"Using the footswitch",
"Reversing slowly",
"Switching direction immediately, before it has stopped",
"Using the remote panel"
],
2,
"Wait for the windlass to stop in one direction before applying power the other way."
],
[
"A Freedom windlass motor runs but the chainwheel does not turn. Check?",
[
"Replace battery",
"Replace anode",
"Clutch nut too loose or chainwheel jammed",
"Re-flash display"
],
2,
"Also check shaft key and gearbox."
],
[
"Cruisair SMX keypad cable?",
[
"Coax",
"USB",
"Cat3",
"CX (CXP for SMXir keypads), not standard phone cable"
],
3,
"Do not route beside AC or antenna cables."
],
[
"Cruisair SMX II high-pressure switch on retrofit?",
[
"Wire to AC",
"Optional",
"Must be connected to HIGH PRESS terminals, old switch wires bypassed",
"Omit"
],
2,
"The SMX shuts down the unit on a high-pressure fault."
],
[
"Cruisair PR8X pump relay runs up to how many units?",
[
"1",
"8",
"3",
"20"
],
1,
"PR3X: 3 units."
],
[
"Running 60 Hz DX equipment on 50 Hz, the DX manual says to:",
[
"Increase 17 %",
"Add a capacitor",
"No change",
"Reduce voltage by 17 %"
],
3,
"To prevent overheating the motor."
]
]);
TRAINING.addQuestions("fund", [
[
"Wiring Unlimited: preferred max inverter power on a 12 V system?",
[
"500 VA",
"10000 VA",
"5000 VA",
"3000 VA"
],
3,
"24 V up to 5000 VA; 48 V 5000 VA and up."
],
[
"A 2400 W inverter on 24 V draws about:",
[
"200 A",
"50 A",
"10 A",
"100 A"
],
3,
"2400/24 = 100 A."
],
[
"What is the contact resistance of one cable connection per the book?",
[
"About 0.06 mOhm",
"6 Ohm",
"10 mOhm",
"0.6 Ohm"
],
0,
"A 150 A fuse is about 0.35 mOhm."
],
[
"What material are many electrical terminal fasteners made of?",
[
"Tin-plated brass",
"Titanium",
"Aluminium",
"Stainless steel"
],
0,
"Over-tightening damages them."
],
[
"Brass M8 maximum torque if no manual figure?",
[
"12 N.m",
"40 N.m",
"0.6 N.m",
"1 N.m"
],
0,
"M10 is 24 N.m."
],
[
"What does a yellow insulated crimp terminal fit?",
[
"10-16 mm2",
"1.5-2.5 mm2",
"0.5-1.5 mm2",
"2.5-6 mm2"
],
3,
"Red 0.5-1.5, blue 1.5-2.5."
],
[
"Wiring Unlimited recommended cable type for marine use?",
[
"Solid core",
"AC cable",
"Aluminium",
"Tin-coated copper marine cable with fine strands"
],
3,
"Avoid coarse strands and non-flexible cable."
],
[
"A single DC consumer fuse should match:",
[
"Battery Ah",
"Higher",
"The lower of consumer current and cable rating",
"Nothing"
],
2,
"With multiple consumers match the cable."
],
[
"What fuse speed is common for DC marine circuits with motor or inverter inrush?",
[
"No fuse",
"Very fast",
"Fast only",
"Slow blow"
],
3,
"Fast fuses typically suit AC loads."
]
]);
TRAINING.addQuestions("batt", [
[
"Why does the battery nearest the load fail first in a badly wired parallel bank?",
[
"It carries more current and is charged harder",
"It is older",
"It is colder",
"It is smaller"
],
0,
"Others see extra interconnect resistance."
],
[
"Victron Battery Balancer starts working above:",
[
"12 V",
"27.3 V",
"10 V",
"14 V"
],
1,
"It flags above 0.1 V difference and draws up to 0.7 A."
],
[
"How many Victron Battery Balancers for a 48 V bank of 12 V batteries?",
[
"Two",
"Three",
"Six",
"One"
],
1,
"24 V needs one."
],
[
"What does a battery midpoint alarm indicate?",
[
"Failed battery, ageing, or (flooded) need to equalise",
"Bad fuse",
"Low AC",
"Wrong alternator"
],
0,
"BMV-702/712 and SmartShunt have a second voltage input."
]
]);
TRAINING.addQuestions("fault", [
[
"When should you measure DC voltage drop?",
[
"At idle",
"With power off",
"Only while charging at float",
"Under high current: inverter at full load"
],
3,
"A drop only appears when current is high."
],
[
"How do you measure ripple with a multimeter?",
[
"Amps",
"DC volts at idle",
"Ohms",
"AC volts across the inverter DC terminals under full load"
],
3,
"The AC component of the DC voltage."
],
[
"12 V Victron inverter ripple full alarm level (RMS)?",
[
"0.5 V",
"12 V",
"2.50 V",
"0.1 V"
],
2,
"Pre-alarm is 1.50 V."
],
[
"Victron ripple pre-alarm LED indication?",
[
"None",
"Both on",
"Only bulk",
"Overload and low-battery LEDs both blink"
],
3,
"Unit turns off after 20 min; full alarm = both on and powers down."
],
[
"One fix for ripple?",
[
"Add a load",
"Shorten or thicken battery cables and check connections",
"Change DIP",
"Lower mains"
],
1,
"Ripple only occurs when there is a voltage drop."
]
]);
