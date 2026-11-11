/* Data for the interactive network map (typical modern cruiser or centre-console: product based, not builder specific). */
(function(){
  const T = TRAINING;
  T.netmap = {
    buses:[
      { id:'dc',  name:'House DC',        color:'#d6361e', note:'Battery, fuses, busbars and the supply to every unit. Voltage dips here cause resets everywhere.' },
      { id:'ac',  name:'AC (shore / generator / inverter)', color:'#e9a100', note:'Shore inlet, generator, inverter and the AC loads. 230 V 50 Hz on an Australian vessel.' },
      { id:'n2k', name:'NMEA 2000',       color:'#2a7de1', note:'CAN-based instrument and switching backbone: terminators, drop cables, a powered backbone.' },
      { id:'eth', name:'Ethernet (Marine Network)', color:'#6b3fa0', note:'Radar, sonar, networked video and MFD sync. Use the maker\'s network parts and isolation couplers.' },
      { id:'can', name:'Control CAN (engine, drive, thruster, stabiliser)', color:'#1d8f4f', note:'Product-specific buses such as EVC, J1939, S-Link, Seakeeper Ride CAN and Optimus CAN1/CAN2. Keep them separate from the boat NMEA 2000.' },
      { id:'ip',  name:'Internet / Wi-Fi / cellular', color:'#555', note:'Starlink, routers, cellular telematics. Loss means no remote access; the boat itself still runs.' }
    ],
    nodes:[
      { id:'bat', l:'Batteries & BMS', row:0, col:0, buses:['dc'], d:'Lithium or AGM banks, the BMS, the main fuses and busbars. The BMS can open the bank on over-current, over-voltage or over-discharge.', fail:'Everything on House DC loses power. A BMS cut-out under a thruster or generator load looks like a random failure elsewhere.' },
      { id:'chg', l:'Inverter / charger', row:0, col:1, buses:['dc','ac'], d:'Joins shore or generator AC to the DC bank and can invert DC back to AC. Often has its own data bus (VE.Bus, MasterBus).', fail:'No charging from shore or generator and no inverted AC. DC systems still run until the bank is flat.' },
      { id:'shore', l:'Shore / generator / cablemaster', row:0, col:2, buses:['ac'], d:'Shore inlet with RCD protection, generator and changeover, cablemaster. Cablemasters have a DC motor and limit switches as well.', fail:'AC loads, gyro AC drive (on AC models) and the charger lose supply. Open-transition changeover interrupts AC briefly.' },
      { id:'solar', l:'Solar (MPPT)', row:0, col:3, buses:['dc'], d:'Solar array, including integrated hardtop solar, through MPPT controllers into the house bank.', fail:'Less charging; nothing else on the vessel depends on it directly.' },
      { id:'cz', l:'Digital switching modules', row:0, col:4, buses:['dc','n2k'], d:'Output and input modules (CZone, YachtSense, Empirbus and others) switch circuits, with a configuration and a bypass.', fail:'If NMEA 2000 fails, screens lose control but each module keeps its last state or its bypass. If a module loses power its outputs go off.' },
      { id:'stab', l:'Stabilisers (gyro / fins / interceptors)', row:0, col:5, buses:['dc','ac','n2k'], d:'A gyro uses AC or DC supply, 12 or 24 V control, a seawater pump and a GPS on NMEA 2000. Fins and interceptors and Seakeeper Ride have their own control CAN that must not be joined to the boat NMEA 2000.', fail:'Loss of GPS or supply reduces or stops stabilisation. A gyro can take up to 30 minutes to return to speed after a power loss.' },
      { id:'thr', l:'Thrusters', row:0, col:6, buses:['dc','can'], d:'High-current motors on a heavy cable and a fuse, with a control bus (S-Link, V-CAN or proprietary) and panels.', fail:'No bow or stern thrust. Heavy loads pull down the supply for the rest of the boat.' },
      { id:'gen', l:'Generator', row:0, col:7, buses:['ac','dc'], d:'Marine generator with start batteries, auto-start signals and AC output.', fail:'No AC at anchor; AC-only loads and battery charging at anchor are affected.' },
      { id:'helm', l:'Helm MFDs', row:1, col:0, buses:['dc','eth','n2k'], d:'Garmin, Raymarine or Simrad displays on Ethernet and NMEA 2000, and on some boats the engine bus.', fail:'No charts, radar overlay or switching pages. The engines and steering still work.' },
      { id:'radar', l:'Radar / sonar / cameras', row:1, col:1, buses:['dc','eth'], d:'Networked sensors with their own supply on the Ethernet network.', fail:'No radar, sonar or video. Depth from an N2K transducer is separate.' },
      { id:'sens', l:'Sensors (GPS, depth, wind, tanks)', row:1, col:2, buses:['n2k'], d:'NMEA 2000 devices powered from the backbone.', fail:'Missing data pages. Autopilots and gyros can raise alarms when GPS or heading is lost.' },
      { id:'ap', l:'Autopilot', row:1, col:3, buses:['dc','n2k','can'], d:'Autopilot ECU, heading sensor and rudder feedback or steering actuator.', fail:'Disengages or will not engage; manual steering remains.' },
      { id:'eng', l:'Engine ECUs / gateways', row:1, col:4, buses:['dc','can','n2k'], d:'Engine and drive control units on the maker\'s CAN bus, with a gateway to NMEA 2000 for display.', fail:'Loss of engine data on the display. Engine control faults depend on the system.' },
      { id:'joy', l:'Joystick / shift & throttle', row:1, col:5, buses:['dc','can'], d:'Electronic control heads and joysticks (Volvo EVC, Twin Disc EC300, Yamaha, Mercury, Optimus).', fail:'Loss of joystick or of a control station. Other stations may still work.' },
      { id:'tele', l:'Remote monitoring gateway', row:1, col:6, buses:['dc','n2k','ip'], d:'Sentinel, Siren, Princess Connect, Whaler Watch and similar: always-on supply, N2K for data and switching, cellular for the cloud.', fail:'No remote alerts. Needs an always-on supply and N2K power when the boat is unattended.' },
      { id:'net', l:'Starlink / router / Wi-Fi', row:1, col:7, buses:['dc','ip'], d:'Starlink Mini or larger, routers and access points. Keep instrument networks separate from the guest network.', fail:'No internet or remote access. Onboard systems keep working.' }
    ],
    symptoms:[
      { q:'The radar and sonar show no image but depth and wind data are normal.', a:'eth', why:'Radar and sonar travel on the Ethernet Marine Network. Depth and wind use NMEA 2000.' },
      { q:'Depth, wind and the switching screen buttons are all dead, but radar is fine.', a:'n2k', why:'Instrument and switching data share NMEA 2000. Check backbone power and terminators.' },
      { q:'The phone app is offline, yet everything on board works normally.', a:'ip', why:'Remote access depends on cellular or Starlink. The boat does not.' },
      { q:'The helm display reboots whenever the thruster runs.', a:'dc', why:'A voltage dip on House DC from a heavy load.' },
      { q:'The joystick and thrusters do nothing but the wheel and engines work normally.', a:'can', why:'The control CAN carries joystick and thruster commands, separate from NMEA 2000.' },
      { q:'DC loads are fine but the charger will not accept the shore supply.', a:'ac', why:'The AC side: inlet, RCD, changeover, polarity or generator.' }
    ]
  };
})();
