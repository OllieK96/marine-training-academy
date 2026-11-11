TRAINING.addQ('trim', [
 ["What supply do Humphree electric fin servos use?", "24-32 V DC", "12 V DC", "230 V AC", "415 V three-phase", "The brochure lists a 24-32 V DC brushless servo."],
 ["What is the RMS maximum average consumption at zero speed for a 1.0 m2 Humphree fin (SU553, each)?", "71 A at 24 V", "7 A", "700 A", "None", "The brochure lists 71 A RMS max average (about 42 A in moderate waves)."],
 ["What does the integrated manual tiller on a Humphree servo allow?", "Rotating the fin by hand if power is lost", "Changing the battery", "Charging the bank", "Rinsing the fin", "The servo has an integrated manual tiller."],
 ["How is each Humphree RCU supplied?", "Through its own slow-acting fuse", "Through a shared quick-blow fuse for all", "Without a fuse", "From the NMEA 2000 network", "The manual says power must be supplied to each RCU through separate slow-acting fuses."],
 ["Where is RCU-1 placed on the vessel?", "On the centreline between the centre of gravity and the transom", "At the bow", "In the engine", "Anywhere", "RCU-1 goes along the centreline between CG and transom, aligned with the vessel."],
 ["What happens if control-bus termination plugs are missing on a Humphree system?", "Communication error alarms and bus errors", "Higher thrust", "Lower fuel use", "Nothing", "Termination plugs are needed for correct bus operation."],
 ["What does the Humphree anchor mode do with the fins?", "Rotates them 180 degrees when anchored at the bow so they push away from the anchor line", "Retracts them", "Locks them", "Turns them off", "It eliminates anchor walking by keeping the anchor line tensioned."],
 ["Which safety rule applies when zero-speed stabilisation is enabled?", "Swimmers must stay away because the fins rotate", "Nothing", "Keep the engines off", "Disable the batteries", "The installation manual warns that fins rotate in ZERO SPEED STABILIZATION."],
 ["Which stabilisation systems work with the boat stationary?", "Gyros and zero-speed fins", "Interceptors and trim tabs", "Seakeeper Ride only", "None", "Interceptors and Ride need speed."],
 ["Why can a weak fin at anchor be caused by the battery?", "A battery bank sagging under the servo's heavy current reduces servo supply", "Fins ignore batteries", "Fins use AC only", "The bank is irrelevant", "Servo load is high; check voltage at the servo while working."],
 ["Which Humphree product gives fin and interceptor control from one control system?", "HCS5 / RCU based control system", "A manual switch", "A Seakeeper ConnectBox", "A NMEA 0183 multiplexer", "The system can be integrated across fins and interceptors."],
 ["What is the maximum speed of a 1.5 m2 Humphree fin per the brochure?", "33 knots", "10 knots", "60 knots", "5 knots", "Larger fins have a lower maximum speed (1.3 m2 36 kn, 1.5 m2 33 kn)."],
 ["Why does a larger electric fin installation increase DC design needs?", "Higher servo currents need battery capacity, cable and fusing", "It needs hydraulic oil", "It needs AC", "It needs no electrical design", "24 V servo loads can be hundreds of amps."],
 ["Which Seakeeper product acts on trim and list with actuated blades?", "Seakeeper Ride", "Seakeeper 18", "ConnectBox", "SK2", "Ride uses blades at the transom controlled over a proprietary CAN bus."]
]);
TRAINING.addQ('prop', [
 ["What is the main difference between on/off and proportional thruster control?", "Proportional controllers vary voltage and speed with protection; on/off switches full voltage", "Proportional ones are AC only", "There is none", "On/off ones are hydraulic", "A controller varies motor voltage in proportional systems."],
 ["What does an S2 duty rating of 2-3 minutes mean for a SEP thruster?", "The maximum continuous operating time before motor limits are reached", "It runs for ever", "It is the battery size", "A warranty term", "Thrusters are short-duty devices."],
 ["What is the SEP 100 nominal thrust?", "116 kg", "10 kg", "500 kg", "1 kg", "SEP 100 is rated at 116 kg in the guide."],
 ["Which SEP models are 24 V only?", "SEP 120 and SEP 150", "SEP 80 and SEP 100", "SEP 130 only", "All of them", "The guide lists SEP 120 and 150 as 24 V only."],
 ["Which fuse does the guide list for a 12 V SEP 80?", "ANL 400", "10 A blade", "ANL 1000", "No fuse", "The 12 V SEP 80 uses ANL 400."],
 ["Which Sleipner S-Link alarm number is 'Low voltage'?", "5", "12", "15", "36", "Alarm 5 is low voltage; 35 is the early warning."],
 ["S-Link alarm 12 means:", "No communication", "Fuse blown", "Motor overtemperature", "Low oil level", "Alarm 12: no S-Link communication."],
 ["S-Link alarm 15 means:", "Fuse blown (or battery cables swapped)", "No communication", "Not calibrated", "Interlock", "Alarm 15 is fuse blown or battery cables swapped."],
 ["At what Rx/Tx count does an S-Link panel show WARNING?", "96", "10", "1000", "50", "WARNING at 96, PASSIVE above 127, BUS OFF above 255."],
 ["What must the S-Link bus have at its end?", "An END terminator", "A fuse", "A battery", "A bilge pump", "S-Link needs a power cable and an END terminator."],
 ["Which devices can connect directly to S-Link?", "Sleipner or authorised devices; others use an interface", "Any NMEA device", "Any Ethernet device", "Anything", "Other equipment connects through a Sleipner interface."],
 ["What does the PPC do on a lithium-powered thruster?", "Controls output voltage to the motor (needs firmware 1.033 or later with lithium)", "Charges the bank", "Controls the autopilot", "Heats the battery", "The guide says PPC firmware must be 1.033 or later with lithium."],
 ["What should you check after wiring a SEP thruster motor?", "That the motor flange is isolated from B+ and B- with an ohmmeter", "That the flange is connected to B+", "Nothing", "The paint colour", "The guide calls for an isolation check."],
 ["What lug torque does the guide give for M8 motor nuts?", "13 Nm", "130 Nm", "1 Nm", "300 Nm", "M8 13 Nm, M10 23 Nm."]
]);
