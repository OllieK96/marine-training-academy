/* Victron path, module 3: GX devices, Venus OS, VRM, DVCC. Sources: Cerbo GX / Ekrano GX manuals, Data communication note, Automatic generator start/stop note. */
TRAINING.addModule({ id:'vic-gx', title:'Victron 3: GX, Venus OS, VRM & DVCC', icon:'🧠',
  summary:'Cerbo GX hardware and ports, connecting Victron and third-party products, Remote Console and VRM, DVCC charge control, generator start/stop and data integration (Modbus-TCP, MQTT, NMEA 2000).',
  lessons:[
  { id:'g1', title:'Cerbo GX hardware: ports, power and displays', level:'Foundation', min:10, src:['cerbo','ekrano'], body:[
    ['p', "A GX device is the brain of a Victron system: it runs <b>Venus OS</b>, collects data from every product, controls charging through DVCC and sends data to the VRM portal. The Cerbo GX is the usual choice for marine installs; the Ekrano GX adds a built-in screen."],
    ['table', ['Cerbo GX (MK2 / MK3)', 'Specification'], [
      ['Supply voltage', '8 - 70 V DC'],
      ['Mounting', 'Wall or 35 mm DIN rail'],
      ['VE.Direct ports (always isolated)', '3 ports (MK2 supports up to 15 VE.Direct devices, MK3 up to 25)'],
      ['VE.Bus (always isolated)', '2 paralleled RJ45 sockets'],
      ['VE.Can', 'VE.Can 1 isolated, VE.Can 2 non-isolated'],
      ['Other comms', 'Bluetooth, Wi-Fi (2.4 GHz), Ethernet 10/100 RJ45'],
      ['Inputs', '4 resistive tank level, 4 temperature sense, 4 digital'],
      ['Relays', '2 x NO/NC: 6 A up to 30 V DC, 1 A up to 70 V DC, 6 A / 125 V AC'],
      ['Environment', '-20 to +50 °C, IP20 (so mount it inside a dry enclosure)'],
      ['Size', '78 x 154 x 48 mm'],
      ['GX Touch 50 / 70', '800x480 / 1024x600 screens, IP54 (without connectors), 2 m cable']]],
    ['ul', ["<b>VE.Bus is not Ethernet.</b> It uses RJ45 sockets, but plugging a VE.Bus cable into an Ethernet port (or the reverse) is a classic installer mistake.", "<b>VE.Can needs a terminator at each end</b> of the cable run (RJ45 terminator, like a bus network).", "<b>PIN for the VictronConnect/Bluetooth connection:</b> for GX devices with serial numbers before HQ2242 the default is 000000; from HQ2242 the PIN is a random 6-digit number printed on the label on the back of the unit.", "A protection cover for the connectors is included from serial number HQ2242 onwards."]],
    ['tip', "Treat the GX device like any other bus-connected device: label every cable at both ends, and photograph the connection layout at the end of the install."],
    ['int', 'hot:victron'],
    ['qc', { q:"How many resistive tank level inputs does the Cerbo GX have?", o:["1", "2", "4", "8"], a:2, e:"The Cerbo GX has 4 resistive tank level inputs, 4 temperature inputs and 4 digital inputs." }]
  ]},
  { id:'g2', title:'Connecting Victron and other products', level:'Foundation', min:12, src:['cerbo','datacom'], body:[
    ['p', "Each Victron product has a communication port, and the GX device speaks to all of them. Knowing which protocol belongs to which product tells you which cable you need."],
    ['table', ['Product', 'Port / protocol', 'Note'], [
      ['MPPT solar chargers (small / 75-150 range)', 'VE.Direct', 'Direct to Cerbo VE.Direct ports'],
      ['SmartShunt, BMV-700/712', 'VE.Direct', 'Also Bluetooth for VictronConnect'],
      ['MultiPlus-II, Quattro, Phoenix (larger)', 'VE.Bus (RJ45)', 'GX VE.Bus socket; daisy chain'],
      ['Lynx Smart BMS, Lynx Shunt VE.Can, larger MPPTs, Skylla-i', 'VE.Can (CAN-bus)', 'Terminate both ends; NMEA 2000 compatible variant'],
      ['Phoenix Inverter small (250-500 VA)', 'VE.Direct', 'Direct or via interface'],
      ['Third-party batteries', 'CAN-bus BMS profile', 'Supported managed batteries pass CVL/CCL/DCL']]],
    ['p', "Victron's data communication note ranks the protocols for outside systems: for a whole system, <b>Modbus-TCP</b> is the preferred and easiest route (the GX device provides pre-calculated system values). For internet integrations use the <b>VRM JSON API</b> or <b>MQTT</b>. For a marine NMEA 2000 network use the VE.Can/NMEA 2000 integration. VE.Bus itself is a proprietary daisy chain on RS485 and is not open to third parties; the MK2/MK3 interface protocol is available on request."],
    ['ul', ["<b>VE.Direct:</b> point-to-point, TTL/RS232 style - one device per port.", "<b>VE.Can / NMEA 2000:</b> CAN-bus with drop cables or daisy chain, J1939 and NMEA 2000 based.", "<b>VE.Bus:</b> daisy chain; the Cerbo's two RJ45 sockets are paralleled.", "<b>Modbus-TCP:</b> over Ethernet/Wi-Fi from the GX device."]],
    ['tip', "If the boat already has an NMEA 2000 backbone, the VE.Can port does not have to share it. Many installers keep VE.Can for Victron-only devices and bridge to the boat network through a documented NMEA 2000 integration so the chartplotter shows state of charge."],
    ['qc', { q:"For a customer integrating a whole Victron system into their own software, which protocol does Victron recommend first?", o:["Direct VE.Bus", "Modbus-TCP via a GX device", "BMV text protocol", "NMEA 0183"], a:1, e:"The data communication note recommends Modbus-TCP for a complete system, with JSON API/MQTT for internet use." }]
  ]},
  { id:'g3', title:'Remote Console, VRM and updates', level:'Intermediate', min:10, src:['cerbo'], body:[
    ['p', "Once a GX device has internet (Ethernet, Wi-Fi, a 4G router or Starlink) it uploads data to the <b>VRM portal</b> and can be reached by the <b>Remote Console</b>."],
    ['ul', ["<b>Remote Console on the local network:</b> open the GX device's IP address in a browser or use the VictronConnect/VRM app. The manual lists alternative methods to find the IP address when you do not know it.", "<b>Remote Console on VRM:</b> works through the portal even when you are not on the boat's network; access to it is controlled in the VRM access settings.", "<b>Firmware updates:</b> Venus OS updates can be installed from the device or remotely via VRM. Updating a GX device over a weak connection is a common cause of 'stuck' units - do updates when the boat has power and a stable link.", "<b>Alarms:</b> VRM can email alarms such as low battery, high temperature or loss of communication."]],
    ['steps', ["Connect the GX device to internet (Ethernet is the most reliable).", "Create or log into the VRM account; add the installation using the VRM portal ID shown on the GX device.", "Set the access level and enable Remote Console only if the owner wants it.", "Update Venus OS to the current version before commissioning.", "Test an alarm (for example a deliberate low battery voltage setting) to prove notification works."]],
    ['safety', "Remote control means remote risk: a shore current limit or relay changed by someone else can affect a boat. Use strong passwords, change the default GX device password and restrict VRM access to those who need it."],
    ['qc', { q:"Where do you set up which people can open the Remote Console on VRM?", o:["On the MPPT", "In the VRM access settings for the installation", "In the Lynx Smart BMS", "In VEConfigure"], a:1, e:"The GX manual has a section on access settings for the Remote Console and Controls pane in VRM." }]
  ]},
  { id:'g4', title:'DVCC: Distributed Voltage and Current Control', level:'Advanced', min:16, src:['cerbo'], body:[
    ['p', "Enabling DVCC (<b>Settings, System Setup, Charge Control</b>) changes the GX device from a passive monitor into an <b>active system controller</b>. What you get depends on the battery type, the installed components and their configuration."],
    ['h', 'Managed (CAN-bus BMS) batteries'],
    ['p', "The GX device receives the battery's <b>Charge Voltage Limit (CVL)</b>, <b>Charge Current Limit (CCL)</b> and <b>Discharge Current Limit (DCL)</b>. Inverter/chargers, solar chargers and Orion XS chargers then disable their own algorithms and follow the battery's instructions."],
    ['h', 'Lead-acid and other systems'],
    ['ul', ["A configurable <b>system-wide charge current limit</b> (the GX device reduces the inverter/charger when solar is already at full output).", "<b>Shared Voltage Sense (SVS)</b>: charger voltage regulation uses the best battery voltage available (BMS or BMV first, otherwise the VE.Bus battery voltage).", "<b>Shared Temperature Sense (STS)</b>: sources include BMV-702/712, SmartShunt, Lynx Shunt, a GX temperature input, the Multi/Quattro, or an MPPT sensor. STS is forced off with the Lynx Smart BMS and some managed batteries.", "<b>Shared Current Sense (SCS)</b>: shares the battery current with MPPTs and Orion XS so tail-current end-of-absorption uses the real battery current."]],
    ['h', 'Limit charge current: priorities and details'],
    ['ul', ["Charge sources are prioritised: <b>1) MPPT solar chargers, 2) Orion XS DC-DC chargers, 3) inverter/chargers</b>.", "If a CAN-bus BMS requests a different current, the <b>lower</b> value wins.", "Only Victron inverter/chargers, MPPTs and Orion XS are controlled. A Skylla-i or an alternator connected to the bank is <b>not</b> counted.", "DC loads are only compensated if a SmartShunt or BMV-712 is configured as a DC meter (a 'DC system' shunt): with 50 A limit and a 25 A load the chargers may deliver 75 A.", "Current drawn by the inverter/charger's AC loads is compensated for (10 A of AC load with a 50 A limit lets solar charge to 60 A).", "A limit set in the device itself (VictronConnect/VEConfigure) always still applies: 50 A in the device and 100 A in DVCC means 50 A.", "'Limit managed battery charge voltage' is only for the commissioning period of some managed batteries (BYD, Pylontech): do not use it for anything else because it can stop cell balancing."]],
    ['int', 'dvcc'],
    ['tip', "When a lithium system 'will not charge past 80 %' or 'charges to the wrong voltage', check DVCC first: the CVL/CCL the BMS sends overrides the charger's own settings."],
    ['qc', { q:"With DVCC and a 50 A limit configured, a 25 A DC load measured by a SmartShunt set as 'DC system' will allow chargers to deliver:", o:["25 A", "50 A", "75 A", "100 A"], a:2, e:"The DVCC limit compensates for DC loads measured by a DC-system shunt: 50 A limit + 25 A load = 75 A." }]
  ]},
  { id:'g5', title:'Generator start/stop and the three-wire interface', level:'Advanced', min:9, src:['gen','cerbo'], body:[
    ['p', "Victron offers three ways to signal a generator start and each has a sweet spot."],
    ['table', ['Option', 'Best for', 'Notes'], [['GX device generator start/stop', 'Anything with a Cerbo', 'Most feature-rich: SoC, battery voltage, high load, test runs and silent times'], ['BMV battery monitor relay', 'Simple systems', 'Starts on low voltage / SoC; dry contact, check its ratings'], ['Relay in the Multi/Quattro', 'No GX device', 'Use the Virtual Switch generator function (recommended) or the more complex assistant']]],
    ['p', "Each of these has a <b>single relay</b>: it closes when the generator must run and opens to stop. Generators that need a separate <b>start pulse and stop pulse</b> (the note names Cummins/Onan as an example) need extra circuitry or the assistant-based alternative. Options can be combined by wiring the open contacts in parallel (either may start) or series (both must agree)."],
    ['ul', ["Test the full cycle on the dock: manual start, auto start on load, stop on SoC, and the manual-override position.", "Check the AC input limit for the generator in the Multi/Quattro matches the generator's rating.", "Keep 'silent times' in mind on boats on a mooring."]],
    ['qc', { q:"A generator needs a start pulse and a separate stop pulse. What does Victron's note tell you about the standard relays?", o:["They already provide both pulses", "They are single-relay outputs, so extra circuitry or the assistant approach is needed", "Only the BMV can do this", "It cannot be done"], a:1, e:"The standard Victron start/stop relays close to run and open to stop; pulse-type three-wire generators need additional measures." }]
  ]},
  { id:'g6', title:'Integrating with NMEA 2000, Modbus-TCP and MQTT', level:'Advanced', min:10, src:['cerbo','datacom'], body:[
    ['p', "Boat owners want to see battery state, solar yield and shore current on the chartplotter (MFD). The GX manual has dedicated chapters for <b>Marine MFD integration by app</b> and <b>by NMEA 2000</b>."],
    ['ul', ["<b>NMEA 2000 out:</b> the GX device publishes battery, inverter and tank data on a VE.Can port set to the NMEA 2000 profile. The Lynx Smart BMS manual lists the PGNs it supports on the same network.", "<b>MFD app integration (glass bridge):</b> monitor shore and generator power, battery state, chargers/inverters, solar production, AC and DC loads, tanks and temperatures; <b>control</b> the shore current limit and switch the inverter/charger on, off or charger-only; optionally open the Remote Console panel. Compatible with all Victron inverter/chargers (500 VA up to large three-phase systems), BMV-700/702/712, SmartShunt, Lynx Shunt VE.Can and Lynx Smart BMS, and all MPPTs.", "Note from the manual: monitoring/control of AC chargers on VE.Direct or VE.Can (Smart IP43, Skylla series) only works when shore power is connected.", "<b>Modbus-TCP:</b> easiest for custom integrations and AV/automation processors. Use the register list in Victron's technical information.", "<b>MQTT and VRM API:</b> internet-based data; good for dashboards."]],
    ['note', "Keep NMEA 2000 powering rules in mind: do not connect the Victron VE.Can power or terminators in a way that duplicates the boat backbone's power feed or terminators."],
    ['qc', { q:"Which Victron communication option is preferred for integrating a complete system into third-party software?", o:["VE.Bus", "Modbus-TCP", "Bluetooth", "VE.Direct text"], a:1, e:"Modbus-TCP is preferred; it exposes pre-calculated system values from the GX device." }]
  ]}
  ]});
