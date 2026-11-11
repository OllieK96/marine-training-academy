/* Shore power: Glendinning Cablemaster lesson and where-you-will-see-it notes. Sources: Glendinning Cablemaster CM-4/CM-7/CM-8 manual (print 06/08) and the wireless remote wiring sheet 04154-1B (01/24). */
(function(){
  const T = TRAINING;
  T.extend('shore', 's3', [
    ['where', "Cummins Onan generators are the generator brand named on Riviera yachts (for example an Onan EQD on the 585); US-market boats show Kohler or Onan 60 Hz sets. Fischer Panda appears on Pursuit. Australian boats use 50 Hz sets. The installation rules above apply to whichever brand you meet."]
  ], ['where_riv']);
  T.addLessons('shore', [
    { id:'s6', title:'Glendinning Cablemaster: shore power cable handlers', level:'Intermediate', min:14, src:['glcm','glrc'], body:[
      ['p', "A <b>Cablemaster</b> is a motor-driven reel that pays out and retracts the shore power cable through a hawse pipe. A US-market Riviera listing shows a Cablemaster with a wireless remote [S]. It is a DC motor device on a vessel with AC shore power, so it needs both a DC supply and the right AC cable."],
      ['where', "Cablemaster-type cable handlers appear on yachts of many builders. Identify the model from the label and match the cable rating to the shore inlet."],
      ['table', ['Model', 'Designed for (manual)'], [
        ['CM-4', '30 A shore power cable (the manual also mentions telephone cable use)'],
        ['CM-7', '50 A shore power cable (the workhorse of the line)'],
        ['CM-8', 'Heavy-duty version for 100 A shore power cable']
      ]],
      ['ul', ["<b>DC supply</b>: 12 V DC is standard, with 24 V DC available; the manual quotes 7 to 11 A under load. Overcurrent protection must be provided in the supply: the wiring text and the remote wiring sheet say 20 A for 12 V DC and 15 A for 24 V DC. A figure of 5 A appears on an older wiring page, so confirm against the sheet for the unit installed.", "<b>Separate breaker</b>: a dedicated breaker for the Cablemaster lets it be turned off, preventing unauthorised use when unattended, which matters if children can reach the switch.", "<b>Limit switches</b>: an in-limit switch (on the power unit gasket) and an out-limit switch in the guide roller assembly stop the motor at the ends of travel. The out-limit switch is operated by a nylon safety collar on the cable, which also acts as a mechanical stop if the switch fails or the cable is pulled.", "<b>Vertical pipe extension</b>: if the guide roller assembly is moved to the end of an extension, the out-limit switch wire must be extended and the safety collar fitted; failure to do so can damage the shore power cable.", "<b>Remote control</b>: the 04154-1B wireless remote wiring sheet (12/24 V DC, 4 channels) runs from the Cablemaster relay assembly (04034) with a recommended 5 A fuse in the remote supply and a 20 A (12 V) or 15 A (24 V) breaker for the motor circuit.", "<b>Cable</b>: part numbers include 50 A 125 V and 125/250 V cables and 30 A 125 V cable. Match the cable and plug to the vessel's inlet and shore supply."]],
      ['safety', "Isolate the shore supply at the pedestal and the Cablemaster breaker before working on the unit, keep the cable clear of the reel when it is energised and follow the user warnings in the manual about overloading and overheating the cord reel."],
      ['verify', "The Cablemaster manual on file is dated 2008 and the remote sheet January 2024. The two do not agree on one 24 V breaker value, and they are US documents (125 V and 125/250 V cables). For a 230 V 50 Hz Australian vessel check the cable specification fitted and the unit's label."],
      ['qc', { q:"How is the Cablemaster out-limit switch operated?", o:["By a nylon safety collar on the shore power cable", "By a timer", "By the shore pedestal", "By a GPS"], a:0, e:"The collar activates the out-limit switch and acts as a mechanical stop." }]
    ]}
  ]);
  T.addQ && T.addQ('shore', [
    ["Which Cablemaster model is designed for 50 A shore power cable?", "CM-7", "CM-4", "CM-8", "None", "CM-4 is 30 A, CM-7 is 50 A and CM-8 is the heavy-duty 100 A version."],
    ["What DC supply does a standard Cablemaster use?", "12 V DC (24 V DC available)", "230 V AC", "5 V DC", "415 V AC", "Per the Cablemaster specification."],
    ["What overcurrent protection do the Cablemaster wiring text and remote sheet give for a 12 V supply?", "20 A fuse or breaker", "1 A", "200 A", "None", "The remote wiring sheet and the manual text quote 20 A for 12 V and 15 A for 24 V."],
    ["What stops a Cablemaster from over-paying out cable if the out-limit switch fails?", "The nylon safety collar acting as a mechanical stop", "A GPS", "The pedestal", "Nothing", "The collar also serves as a mechanical stop."],
    ["Why fit a separate breaker for the Cablemaster?", "To turn it off and prevent unauthorised use when unattended", "To increase its speed", "To reduce voltage", "It is not recommended", "The manual recommends a separate breaker."],
    ["Which part must be moved if the guide roller is relocated on a vertical pipe extension?", "The out-limit switch wiring and the safety collar must be reconnected", "The battery", "The hawse pipe", "Nothing", "Failure to rewire the out-limit switch can damage the shore cable."],
    ["Which Glendinning document gives the wireless remote wiring?", "Sheet 04154-1B (01/24)", "A Victron manual", "A Seakeeper manual", "None", "The wireless remote sheet is 04154-1B."]
  ]);
})();
