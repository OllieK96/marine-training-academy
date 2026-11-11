/* Navigation, networks & digital switching: manual-derived extensions (Garmin NMEA 2000 fundamentals and technical reference, CZone COI and Configuration Tool). Loaded after mod-10-nav-networks.js. */
(function(){
  const T = TRAINING;
  T.extend('nav', 'n2', [
    ['h', 'The hard numbers (Garmin NMEA 2000 documents)'],
    ['table', ['Rule', 'Limit'], [['Terminators', 'Exactly two, 120 ohm each, at opposite ends of the backbone (an in-line terminator can replace the last T-connector, but only one in-line terminator is possible)'], ['Distance between any two points', '100 m (328 ft), measured between terminators plus the drop cables at the end devices'], ['Single drop cable', '6 m (20 ft) maximum'], ['All drop cables combined', '78 m (256 ft) maximum'], ['Devices', 'No more than 50'], ['Power supply', '12 V DC only (never 24 V); no more than 3 V drop to the farthest device'], ['Power cable', 'Fused (the Garmin cable includes a 3 A fuse), drain wire grounded with the ground wire, connected to the TOP of a T-connector']]],
    ['ul', ["<b>Linear backbone:</b> use the SIDES of T-connectors to build the backbone and the TOP only for devices. Never attach a T-connector or backbone cable to the top of a T-connector.", "Use one T-connector per device. A cable up to 6 m can serve as backbone or drop; longer cables are backbone only.", "<b>Power isolator:</b> a part that stops a device from supplying power to the network, used where a device must not back-feed.", "Power at the middle of the network when the end-powered drop exceeds 3 V, balancing the drop on both sides; if a side still cannot get under 3 V, call a professional installer."]],
    ['int', 'n2kcalc']
  ], ['gn2k', 'gn2kt']);

  T.extend('nav', 'n4', [
    ['h', 'CZone Configuration Tool: workflow facts (R20)'],
    ['ul', ["Every CZone module needs a unique <b>dipswitch</b> address. Assign it in the tool (drop-down, or the tool can assign sequential numbers), or let the tool detect which module has the next unconfigured dipswitch set.", "<b>Read Config From Network</b> loads the live system into the tool; a module shown black is off-line (its dipswitch may not be set, or it has no working network connection).", "Interfaces with no physical dipswitch (the MasterBus Bridge Interface, the Wireless Interface) use a <b>virtual dipswitch</b>: the MasterBus bridge defaults to 11111111, and if that is in use change it and press <b>Force Dipswitch for Address</b>.", "Use the <b>Identify Modules</b> option to find a module on a live network without checking its dipswitch.", "Load shedding can run by voltage or by battery capacity."]],
    ['p', "See <b>CZone COI: outputs, LEDs and USB configuration</b> (n5) for the module hardware."]
  ], ['czcfg']);

  T.addLessons('nav', [
    { id:'n5', title:'CZone COI: outputs, LEDs and USB configuration', level:'Advanced', min:14, src:['czcoi', 'czcfg'], body:[
      ['p', "The Combination Output Interface (COI) is a CZone module that combines output and input devices in one unit with full mechanical fuse protection plus bypass on every circuit (as required by ABYC/CE and AS/NZS 3004), IPX5 water-ingress protection and NMEA 2000 certification."],
      ['table', ['Group', 'Channels', 'Rating'], [['OUT-H', '4 high-current outputs (1-4)', '25 A each; optional alarm on detection of external voltage (useful for bilge pump circuits)'], ['OUT-L', '12 low-current outputs (5-16)', '10 A each, dimmable'], ['IN-A', '8 analogue inputs', '-'], ['IN-D', 'Digital switch inputs', '-']]],
      ['ul', ["Total current is limited: up to 80 A for the OUT-H connector and 100 A for the OUT-L connector; do not parallel outputs between connectors. The module is rated for 150 A at 40 C, derating above that.", "Set the module dipswitch (labels on the circuit-label sheet: COI, DIP 1-8) and insert the circuit fuses; a manual fuse-bypass position exists but inserting a bypass fuse creates an ignition hazard in explosive atmospheres.", "Supply voltage thresholds on the Power LED: green above 12 V (12 V system) or 20 V (24 V system), red below."]],
      ['h', 'USB configuration (firmware 6.11.30.0 or newer)'],
      ['ol', ["Use a FAT32 USB drive (up to 32 GB recommended).", "<b>Read:</b> insert a drive with no .zcf or .czfwp files, press the USB button for 5 s (LED flashes red), wait for solid green (under 20 s). The COI writes a .zcf, a .csv, CZone.bak and a result text file.", "<b>Write:</b> the drive must hold CZone.bak matching the live system and exactly one .zcf (and no firmware files).", "<b>Firmware:</b> a single .czfwp file and no .zcf; it can take 10-40 minutes depending on the number of module types."]],
      ['int', 'codes:coi'],
      ['qc', { q:"A CZone COI channel LED flashes red 3 times repeatedly. What does that mean?", o:["DIP switch conflict", "Short circuit", "Memory failure", "Over temperature"], a:0, e:"3 red flashes = dip switch conflict (8 = short circuit, 4 = memory failure, 10 = over temperature)." }],
      ['qc', { q:"What is the maximum drop-cable length to a single NMEA 2000 device?", o:["6 m", "30 m", "78 m", "100 m"], a:0, e:"Single drop cables are limited to 6 m; all drops combined to 78 m." }]
    ]}
  ]);
})();
