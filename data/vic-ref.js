/* Victron path, module 8: error and LED code reference. Tables are generated from TRAINING.codes (data/codes.js), so the lookup interactive and the lessons share one source of truth. */
(function(){
  var C = TRAINING.codes, VB = TRAINING.vebusCodes;
  function tbl(key, h){ return ['table', h || ['Code / pattern', 'Meaning', 'What to do'], C[key].rows.map(function(r){ return [r[0], r[1], r[2] || '-']; })]; }
  var vbRows = Object.keys(VB.meaning).map(function(k){ return [k, VB.meaning[k][0], VB.meaning[k][1]]; });
  TRAINING.addModule({ id:'vic-ref', title:'Victron 8: Error & LED Code Reference', icon:'🚨',
    summary:'Reference and trainer for the codes you meet on the job: VE.Bus LED codes, MultiPlus-II fault table, MPPT and Orion XS errors, Lynx Smart BMS flash codes, Blue Smart and Orion-Tr LEDs, and VE.Direct error values.',
    lessons:[
    { id:'r1', title:'VE.Bus LEDs: special indications and OK codes', level:'Intermediate', min:8, src:['mp2','qu3'], body:[
      ['p', "Multis in a parallel or three-phase VE.Bus system can show <b>OK codes</b> and <b>error codes</b> on the Inverter-on, Bulk, Absorption and Float LEDs."],
      ['ul', ["<b>OK code</b> (device itself is fine but cannot start because another device has an error): a flashing <b>bulk</b> LED means this device can do inverter operation; a flashing <b>float</b> LED means it can charge. All other LEDs should be off. OK codes only appear when the device is not inverting or charging.", "<b>Special indications:</b> bulk + absorption flashing together = voltage-sense error (over 7 V deviation); absorption + float flashing together = battery temperature reading is extremely unlikely (sensor defective or miswired). The unit stays in normal operation for both.", "<b>'Mains on' flashing with no output</b> = charger-only operation with mains present: the unit rejects the mains or is still synchronising.", "<b>Inverter-on flashing in phase opposition</b> to the other LEDs = a VE.Bus error code (next lesson)."]],
      ['int', 'codes:multi'],
      ['qc', { q:"A Multi in a 3-phase system shows a flashing Bulk LED and nothing else. What does that mean?", o:["VE.Bus error 1", "OK code: this device is fine and can perform inverter operation", "Battery is in bulk charge", "Overload"], a:1, e:"A flashing bulk LED is an OK code: the device can invert but cannot start because another device in the system has an error." }]
    ]},
    { id:'r2', title:'VE.Bus error codes: reading the LED grid', level:'Advanced', min:12, src:['mp2','qu3'], body:[
      ['p', "Procedure from the manual: the device must be in error (no AC output); the <b>Inverter-on</b> LED must flash; any flashing Bulk/Absorption/Float LED must flash in <b>opposition</b> to it; at least one of those three LEDs is on or flashing. Then use the <b>Bulk LED</b> state to pick a table, the <b>Float</b> LED for the row and the <b>Absorption</b> LED for the column."],
      ['table', ['Bulk LED', 'Float row', 'Abs off', 'Abs flashing', 'Abs on'], [['Off','Float off','0','3','6'],['Off','Float flashing','1','4','7'],['Off','Float on','2','5','8'],['Flashing','Float off','9','12','15'],['Flashing','Float flashing','10','13','16'],['Flashing','Float on','11','14','17'],['On','Float off','18','21','24'],['On','Float flashing','19','22','25'],['On','Float on','20','23','26']]],
      ['h', 'Codes the manual explains'],
      ['table', ['Code', 'Meaning', 'Cause / solution'], vbRows],
      ['tip', "Code 24 (switch-over protection): the manual's possible fix is raising the AC input lower limit from the factory 180 V to 210 V. Code 25: switch everything off, then bring devices on one by one; update the last one that triggers the error."],
      ['int', 'vebusdec'],
      ['qc', { q:"VE.Bus code 3 means:", o:["Overvoltage on AC-out", "Not all, or more than, the expected devices were found in the system", "Firmware incompatibility", "Time synchronisation problem"], a:1, e:"Code 3 = the system is not properly configured or a communication cable fault: reconfigure and check cables." }],
      ['qc', { q:"Bulk LED on, Float flashing, Absorption off. Which code?", o:["10", "19", "22", "5"], a:1, e:"Bulk-on table, float-flashing row, absorption-off column = 19." }]
    ]},
    { id:'r3', title:'MultiPlus-II general fault table', level:'Intermediate', min:9, src:['mp2'], body:[
      ['p', "The non-VE.Bus problems: no AC out, charger not working, battery not full or overcharged. Everything below is paraphrased from the manual's general error table."],
      tbl('multi', ['Symptom', 'Cause', 'Solution']),
      ['int', 'codes:multi'],
      ['qc', { q:"MultiPlus-II 'Bulk' LED flashes and 'Mains on' lit; charger stopped. Most likely cause?", o:["Bulk protection: the 10-hour maximum bulk time was exceeded", "Blown AC fuse", "VE.Bus code 3", "Generator frequency"], a:0, e:"Bulk protection (10 h max) can point to a system error such as a cell short; reset by switching off and on; it can only be disabled in VEConfigure." }]
    ]},
    { id:'r4', title:'SmartSolar MPPT error codes', level:'Intermediate', min:10, src:['mppt','mppt150','mpptrs'], body:[
      ['p', "Errors show in VictronConnect, a remote display or a GX device. The table follows the 100/30 - 100/50 manual's overview; always check the live error page that Victron links for the newest list."],
      tbl('mppt'),
      ['safety', "Errors 38/39 and 80+ mean the PV input is internally shorted to protect the battery. First update the firmware, then check the battery voltage setting (12/24/36/48 V) and whether another device charges to a higher voltage."],
      ['int', 'codes:mppt'],
      ['qc', { q:"MPPT shows error 38 after an inverter/charger equalised at 17 V. Most likely reason?", o:["Panel shading", "The MPPT sees a battery voltage above its maximum (another device charges higher)", "Temperature sensor failure", "Blown PV fuse"], a:1, e:"Errors 38/39 can come from the wrong battery-voltage setting or another device charging at a higher voltage; recovery for 38 is disconnect panels then battery, wait 3 min, reconnect battery then panels." }]
    ]},
    { id:'r5', title:'Orion XS and Orion-Tr: errors and LEDs', level:'Intermediate', min:9, src:['oxs','otr','bsip'], body:[
      ['p', "Orion XS errors (from the 12/12-50A manual):"],
      tbl('orion'),
      ['p', "Blue Smart IP22 and Orion-Tr Smart status LEDs:"],
      tbl('led'),
      ['int', 'codes:orion'],
      ['int', 'codes:led'],
      ['qc', { q:"Orion XS error 67 means:", o:["Cable too thin", "The charger is set for BMS control but receives no BMS messages", "Battery reverse polarity", "Input voltage too high"], a:1, e:"After 15 s the output drops to base voltage (12 V); the error is shown after 3 minutes." }]
    ]},
    { id:'r6', title:'Lynx Smart BMS LED flash codes', level:'Intermediate', min:7, src:['lbms'], body:[
      ['p', "The Lynx Smart BMS has a <b>Bluetooth LED</b> and a <b>Status LED</b>. Red flash counts repeat every 4 seconds."],
      tbl('lynx', ['LED', 'Meaning', 'Note']),
      ['int', 'lyxled'],
      ['int', 'codes:lynx'],
      ['qc', { q:"Red LED flashes 5 times every 4 seconds on a Lynx Smart BMS.", o:["Pre-charge time out", "Pre-charge high current", "Probably wrong system voltage", "Contactor failure"], a:0, e:"5 = pre-charge time out; 6 = pre-charge high current; 7 = probably wrong system voltage; 10 = safety contactor failure." }]
    ]},
    { id:'r7', title:'VE.Direct and VE.Can fields for integrators', level:'Advanced', min:8, src:['vedirect','datacom'], body:[
      ['p', "If you build displays or logging on a VE.Direct port, the <b>CS</b> field gives the operating state and <b>ERR</b> the error code (relevant when in fault state)."],
      ['table', ['CS value', 'State'], [['0','Off'],['1','Low power'],['2','Fault'],['3','Bulk'],['4','Absorption'],['5','Float'],['6','Storage'],['7','Equalize (manual)'],['9','Inverting'],['11','Power supply'],['245','Starting-up'],['246','Repeated absorption'],['247','Auto equalize / Recondition'],['248','BatterySafe'],['252','External control']]],
      tbl('vedirect', ['ERR', 'Meaning', 'Note']),
      ['note', "ERR 19 can be ignored (start-up/shutdown condition, not reported since v1.15); ERR 21 can be ignored for 5 minutes (not reported when non-persistent since v1.16)."],
      ['int', 'codes:vedirect'],
      ['qc', { q:"In the VE.Direct protocol, CS value 5 is:", o:["Bulk", "Absorption", "Float", "Storage"], a:2, e:"3 bulk, 4 absorption, 5 float, 6 storage." }]
    ]},
    { id:'r8', title:'Error-code trainer', level:'Advanced', min:10, src:['mp2','mppt','oxs','lbms'], body:[
      ['p', "Pick a family and answer from the symptom. Questions are drawn at random from the code tables in this module; your score is not saved, so use it repeatedly."],
      ['int', 'trainer'],
      ['p', "<b>Fault-finding habit:</b> read the code, update firmware, check the settings that the code names, then check wiring (torque, polarity, negatives bypassing a shunt), then replace hardware."]
    ]}
  ]});
})();
