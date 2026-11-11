/* Seakeeper data: gyro model table (manuals), gyro alarm guidance, Seakeeper Ride fault codes (Troubleshooting Guide updated 8/13/2026), scenarios. */
(function(){
  const T = TRAINING;
  /* Model data. len = product page boat length range (ft). Electrical fields come from the operation/installation manuals listed in each model's src.
     null = not verified in a manual obtained for this course; the calculator shows 'see manual'. */
  T.skmodels = [
    { m:'Seakeeper 1', len:'23-30 ft', kg:165, kind:'DC', acA:null, ctl:'12 VDC (see existing lesson x8)', pump:'12 VDC (see existing lesson x8)', rpm:null, prec:null, coast:null, flow:null, note:'Electrical data is in module Trim & Stabilisation, lesson x8 (installation manual).' },
    { m:'Seakeeper 2', len:'30-36 ft', kg:188, kind:'DC', hi:'12 VDC, 100 A high-current supply (operation manual start-up step)', ctl:'12 VDC low current + 12 VDC seawater pump', rpm:null, prec:'+/-67 deg', coast:'8+ hours', flow:'see installation manual', note:'Has Battery SoC monitoring logic for lithium via NMEA 2000 (op manual).' },
    { m:'Seakeeper 3', len:'35-41 ft', kg:249, kind:'DC', hi:'12 VDC, 11-15 V, 80 A max at spool-up, 100 A overcurrent protection (install manual)', ctl:'12 VDC low current, 11-15 V', rpm:null, prec:'+/-67 deg', coast:'8+ hours', flow:'2-6 GPM (7.6-22.7 L/min)', note:'2 AWG supply conductors, cable length up to 9 m (install manual). Older lesson x8 quotes 75 A; check the revision.' },
    { m:'Seakeeper 4', len:'38-44 ft', kg:338, kind:'?', note:'Length and weight from the product page only. Electrical data not verified in a manual obtained for this course.' },
    { m:'Seakeeper 5', len:'40-48 ft', kg:339, kind:'?', note:'Length and weight from the product page only. Electrical data not verified.' },
    { m:'Seakeeper 6', len:'44-52 ft', kg:395, kind:'AC', ac:'110 VAC 30 A or 230 VAC 20 A (op manual)', ctl:'12 VDC 15 A', pump:'12 VDC 15 A or 24 VDC 10 A', rpm:'9,700 normal / 7,600 quiet', prec:'+/-63 deg', coast:'4+ hours', flow:'2.5-8 GPM (op manual); install manual says 2.5-5 GPM', note:'Flow figures differ between the SK6 operation and installation manuals. Verify the revision for the serial number.' },
    { m:'Seakeeper 7.5', len:'45-54 ft', kg:468, kind:'?', note:'Length and weight from the product page only. Electrical data not verified.' },
    { m:'Seakeeper 9', len:'(older model, not on the current products page)', kg:null, kind:'AC', ac:'230 VAC 1-phase 20 A (install manual)', ctl:'24 VDC 10 A', pump:'24 VDC 10 A', rpm:'9,000 normal / 7,200 quiet', prec:'+/-70 deg', coast:'4+ hours', flow:'4-8 GPM (15.1-30.3 L/min)', note:'Check whether the unit is a Seakeeper 9 or 10 before quoting.' },
    { m:'Seakeeper 10', len:'50-60 ft', kg:565, kind:'AC', ac:'230 VAC 1-phase 30 A (install manual)', ctl:'24 VDC 10 A', pump:'24 VDC 10 A max (install manual)', rpm:null, prec:null, coast:null, flow:null, note:'Install manual 90841-4 used for the electrical data.' },
    { m:'Seakeeper 10.5', len:'50-62 ft', kg:584, kind:'AC', ac:'230 VAC 30 A (op manual 91039-1)', ctl:'24 VDC 10 A', pump:'24 VDC 10 A', rpm:'8,250 normal / 6,600 quiet (spool target quoted as 8,700 in the same manual)', prec:'+/-60 deg', coast:'4+ hours', flow:'4.5-6 GPM', note:'Spool modes: Default 40 min to speed at 4,000 W startup draw; Low Power Spool 3,500 W with a longer spool time. Some sources list 20 A for SK10.5 AC; the op manual says 30 A. Check the plate.' },
    { m:'Seakeeper 14', len:'55-68 ft', kg:797, kind:'AC', ac:'230 VAC 1-phase 30 A (install manual)', ctl:'24 VDC 10 A', pump:'24 VDC 10 A', rpm:null, prec:null, coast:null, flow:'4.5-6 GPM (install manual)', note:'Install manual 90873-2-1.' },
    { m:'Seakeeper 18', len:'60-75 ft', kg:1116, kind:'AC', ac:'208-230 VAC 1-phase 30 A, 2-pole breaker', ctl:'24 VDC 10 A', pump:'24 VDC 10 A (20 A max)', rpm:'6,150 normal / 4,613 quiet', prec:'+/-70 deg', coast:'4.5+ hours', flow:'4-8 GPM, max pressure 30 psi in op manual (20 psi in install manual)', note:'Pressure limits differ between manuals (20 psi vs 30 psi). Verify.' },
    { m:'Seakeeper 26', len:'70-85 ft', kg:1431, kind:'AC', ac:'230 VAC 1-phase 20 A, 2-pole breaker', ctl:'24 VDC 10 A', pump:'24 VDC 10 A (op manual) or 230 VAC 5 A max (install manual)', rpm:'5,000 normal / 3,750 quiet', prec:'+/-60 deg', coast:'6+ hours', flow:'4-8 GPM (15.1-30.3 L/min)', note:'The seawater pump supply differs between the SK26 installation and operation manuals. Confirm which pump is fitted.' },
    { m:'Seakeeper 40', len:'85-110 ft', kg:1848, kind:'AC', ac:'230 VAC 1-phase 30 A, 2-pole breaker', ctl:'24 VDC 15 A', pump:'24 VDC 20 A', rpm:'5,150 normal / 4,000 quiet', prec:'+/-70 deg', coast:'4+ hours', flow:'13-15 GPM (49.2-56.8 L/min)', note:'Install manual 90715-4.' }
  ];

  T.codes.skgyro = { title:'Seakeeper gyro alarms, warnings and notifications (text-based)', src:'sk18o',
    rows:[
    ['AC Mains Low (notification, then alarm after 2 min)', 'Motor drive box has no or out-of-range AC supply. If not corrected within two minutes the brake locks and the unit stops precessing.', 'Check AC breaker, generator or inverter output and the shore/generator changeover. After restore press Power to clear; allow up to 30 min to reach stabilising speed.'],
    ['AC outside 208-230 V range (brief)', 'The motor drive box shuts down briefly for protection and resumes when the voltage returns to range.', 'Typical when a generator cannot regulate through a large load step, or at the shore-to-generator transfer. Look at generator voltage regulation and load steps.'],
    ['DC control power lost', 'Display blank, flywheel slows, brake locks (no precession).', 'Check the control power breaker and supply voltage. After restore press Power; allow up to 30 min to return to speed.'],
    ['Seawater pump power lost', 'No cooling flow, so the unit shuts down on a high-temperature alarm.', 'Check the pump breaker/fuse, the electric ball valve and strainer. Reset the alarm after restoring.'],
    ['High temperature alarm(s)', 'Coolant or drive temperature too high.', 'Check coolant reservoir level (50% ethylene glycol / 50% distilled water), seawater pump aligned and running, flow within 4-8 GPM (model dependent), leaks.'],
    ['GPS signal lost (warning)', 'Message on the Home screen and in Alarm History. The unit does not spool down but precession rate and angle are reduced until GPS returns.', 'Check the NMEA 2000 GPS source and network. A GPS is required on the network.'],
    ['ConnectBox POWER button pulsing red', 'The Seakeeper has caused an alarm.', 'Open the MFD app or 5 inch Touch Display, read and address the alarm.'],
    ['Alarm will not clear', 'Reset Alarm only works when the condition is no longer present; then press Power.', 'Find and fix the condition. Do not keep resetting without a physical inspection.'],
    ['Rinse Reminder (notification)', 'Shown when the unit is turned off to coast down.', 'Rinse with mild soap and fresh water. Not a fault.'],
    ['Maintenance reminder (1000 run hours)', 'Service reminder from the Service page timer.', 'Book routine service and reset the timer.']
  ]};

  T.codes.skride = { title:'Seakeeper Ride fault codes', src:'skrt',
    rows:[
    ['554 NMEA2000Fault', 'No GPS via NMEA 2000: cable between Software Module and N2K loose or damaged, network not correctly assembled or unpowered, or main unit mirrored to another unit.', 'Check the cable, restore network power, fit terminators, confirm Ride appears on the network.'],
    ['555 LossGPSFix', 'No GPS: boat indoors, antenna blocked or defective, or main unit mirrored.', 'Move outside, repair or adjust the antenna.'],
    ['256/257/259/260/262/263 AgeCount', 'Configuration incomplete; loose or damaged links between Software Module and Distribution Module or actuator or power cables; EMI.', 'Check each link; separate Ride wiring from jack plate or windlass wiring; use the 256-263 checklist.'],
    ['556-559 NoCAN', 'Connection Software Module to Distribution Module lost, or Software Module lost power while the Distribution Module stayed powered.', 'Follow the No Controllers Found checks.'],
    ['1024 No CAN Communication', 'Ride proprietary CAN bus interrupted. The boat NMEA network may be connected to the Ride network, or a cable or tee is faulty.', 'Make sure the Ride CAN is not crossed with GPS, Optimus, Yamaha or other networks; check CAN stats; rebuild with new cables and tees.'],
    ['1028 Controller Configuration Invalid', 'Current controller configuration not valid.', 'Open the fault, use the button to go to the configuration; no factory reset needed.'],
    ['1040 UI Issue', 'Some or all Ride CAN devices not detected, or other networks connected to the Ride network.', 'See 1024.'],
    ['265-272 RangeFault', 'Controller blade position different from expected.', 'Check the blade is firmly attached and not broken; redo controller zeroing.'],
    ['283-287 NotResponsive', 'Something blocks blade deployment.', 'Check contamination between blade and seal plate or actuator, blade zero, blade diagnostics and the blade-to-seal-plate gap.'],
    ['320/340/380/400 Authentication, 485-488 Internal Fault, 571-576 Config in Progress', 'Controller failed to authenticate or could not be configured.', 'Power cycle and clear; see No Controllers Found; look for EMI from jack plate or windlass.'],
    ['500/501/504/505 Sensor faults', 'Software Module hardware or motion sensor faults.', 'Software update; power cycle and clear.'],
    ['508-512, 518-521 Out of range', 'Angles, rates, accelerations out of range: inconsistent GPS, Software Module mounted more than 15 degrees off level or upside down, or angle calibration off.', 'Remount upright within 15 degrees front-to-back and side-to-side; redo attitude calibration.'],
    ['513-515 Temperature', 'Heat source near the Software Module.', 'Shut off power, check for fire signs, remove heat sources.'],
    ['516 VBattLow / 517 VBattHigh', 'Battery under 9.5 V or over 16 V for more than 2 seconds.', 'Check batteries, terminals and wiring; recharge or replace; inspect alternator; for high voltage consult the manufacturer.'],
    ['522 IMU Orientation Startup / 523 IMUOrientation', 'Software Module installed incorrectly, or the Bow/Stern selection does not match the physical orientation.', 'Review mounting; make the app selection match the module; software update.'],
    ['553 EPEFault', 'GPS accuracy low.', 'Check antenna mounting and sky view; select another GPS source or replace it.'],
    ['570 ConfigurationFault', 'Configuration incomplete.', 'Factory reset and repeat configuration with current software.'],
    ['579 System State Request Timeout', 'Actuator communication fault during configuration.', 'Re-establish controller connection.'],
    ['580/581', 'Improper actuator count or span configuration (incorrect actuator present).', 'Make sure the Software Module matches the system.'],
    ['582 SystemUpdateFailed', 'Update did not load properly.', 'Check memory stick formatting and the update procedure.'],
    ['1032 GyroIncompatible', 'The detected Seakeeper gyro system is not compatible with this version of Ride.', 'Update the gyro software.'],
    ['1041-1044 CAN update faults', 'Update software not found, failed to program, failed to disable the system or downgrade attempted.', 'Insert the latest software in the micro USB of the Software Module; cycle power to the whole system; check CAN terminators.'],
    ['1050-1052 Authentication', 'Actuator and Software Module not compatible (genuine/matching size required).', 'Install the correct sized actuator/controller type for the system.'],
    ['2050 FailedToRebootController', 'Invalid action such as re-zeroing with an active AgeCount fault.', 'Clear all faults before using Service menu items.'],
    ['2150/2151 Log download', 'Not enough space on the USB stick or zip failed.', 'Use a bigger stick; remove and retry.']
  ]};

  T.scenarios.skpower = { title:'Seakeeper stops stabilising when the generator is switched', par:'4-5',
    intro:"A 24 V gyro on a 55-60 ft yacht shows 'AC Mains Low' and then stops stabilising whenever the generator is shut down and the boat changes over to shore power. After the changeover the flywheel takes a long time to come back to stabilising speed.",
    tests:[
      {g:'Display / app', l:'Alarm History', r:'AC Mains Low, repeated at each transfer'},
      {g:'Display / app', l:'Control power', r:'24 V present throughout'},
      {g:'Display / app', l:'Flywheel speed after transfer', r:'Slow to return; takes about 25 minutes'},
      {g:'AC supply', l:'AC voltage at the motor drive box during transfer', r:'Drops to 0 V for several seconds (open-transition changeover)'},
      {g:'AC supply', l:'AC voltage on shore power after transfer', r:'230 V, stable'},
      {g:'AC supply', l:'AC breaker for the Seakeeper', r:'On, not tripped'},
      {g:'Cooling', l:'Seawater pump during transfer', r:'Running (24 V present)'},
      {g:'Cooling', l:'Coolant level', r:'Correct'},
      {g:'Network', l:'GPS on NMEA 2000', r:'Present'}
    ],
    diagnoses:['The AC supply to the motor drive box is interrupted at the changeover', 'A failed seawater pump', 'Low coolant', 'Missing GPS', 'A tripped Seakeeper breaker'],
    answer:0,
    explain:"The AC to the motor drive box drops during the changeover. The unit raises 'AC Mains Low', and any loss that is not restored quickly (or that slows the flywheel) means a long wait to return to speed. Fix: a changeover that keeps the supply continuous (or accept the re-spool time), and confirm generator and shore supplies are inside 208-230 V. Cooling, GPS and breaker readings are normal." };
})();
