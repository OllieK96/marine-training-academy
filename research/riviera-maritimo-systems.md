# Riviera & Maritimo: current electrical / electronic systems (research report)

Prepared 11 Nov 2026 (Brisbane time). Research only. The app and repo were not modified.

**Evidence tags**
- **[C]** Confirmed: I read the source page or PDF and it says this.
- **[S]** Snippet only: the fact comes from a search-result excerpt or summary, and I did not read the full page (the page blocked me or I did not open it).
- **[I]** Inferred: a reasonable engineering conclusion that no source states directly.
- **[T]** Thin: little or nothing is published.

Neither builder publishes wiring schematics, bus topologies or equipment lists. Most detail comes from builder brochures, press releases and boat reviews, and from owner or broker listings. Broker listings are often **US-spec (110 V / 60 Hz)** and do not represent Australian-delivered boats. Read every spec below in that light.

---

## 1. Riviera (Coomera, Gold Coast)

### 1.1 Current lineup [C] https://www.rivieraaustralia.com/models/
| Range | Models | Engines listed |
|---|---|---|
| Sport Yacht (Platinum Edition) | 4600, 5000 (premiere), 5600, 6000, 6200, 6800 | Volvo Penta D8 IPS800 (4600/5000), D11 IPS950 (5600/6000), D13 IPS1200 (6200), D13 IPS1350 (6800) |
| Sports Express | 4300 (premiere) | Volvo Penta D6 IPS600 |
| SUV | 395, 445, 465, 505, 585, 645 Series II, 735 (premiere, "World Premiere 2027") | D6 IPS600, D8 IPS800, D13 IPS1200/1350; **645 and 735 use MAN V8/V12 shaft drive** (645: V8 1300 / V12 1550; 735: V12 1800/2000/2200) |
| Sports Motor Yacht | 46, 50, 58, 64 Series II, 68 Series II, 72 Series II | 46/50/58: IPS; 64/68/72: MAN V8/V12 shaft drive |
| Motor Yacht / Open Flybridge | 78 (MAN V12); 39 and 43 Open Flybridge (D6 IPS600) | |
| Belize | 55 Sedan, 55 Daybridge (premiere), 66 Sedan, 66 Daybridge | D11 IPS950 (55), D13 IPS1350 (66) |

Rule of thumb [C]: **Riviera up to about 60 ft uses Volvo Penta IPS with the Garmin-based Glass Cockpit. Larger boats use MAN shaft drive with Twin Disc controls.** The 735 page names "EJS joystick at the forward and aft helms and in the cockpit" (https://www.rivieraaustralia.com/models/735-suv/). A 2021 review of the 645 confirms the Twin Disc Express Joystick System (EJS) with hydraulic thrusters and Twin Disc gearboxes (https://powerandmotoryacht.com/boats/riviera-645-suv-sea-trial-and-review/).

### 1.2 Helm electronics, displays, autopilot
- **IPS boats:** the Volvo Penta Glass Cockpit is standard on all current Riviera and Belize IPS boats [C] (https://www.rivieraaustralia.com/enews-articles/easier-riviera-boating-with-the-glass-cockpit-system/).
  - It is a Volvo + Garmin partnership. Garmin supplies the displays and navigation; Volvo supplies EVC engine data.
  - Displays range from 7 to 24 inches. Features include Garmin Auto Guidance, Dynamic Positioning (DPS), Joystick Docking, and "Smart Modes" linked to joystick or throttle buttons. For example, docking mode can bring up a full-screen docking-camera view.
- **Examples [C]:**
  - 5600: two 19-inch 4K Garmin screens (https://www.rivieraaustralia.com/app/uploads/PPB-Mar-Apr-2026.pdf).
  - 6800: triple 19-inch Garmin MFDs, Volvo Penta joystick, Side-Power bow thruster, Humphree Interceptor tabs (https://www.yachtingmagazine.com/yachts/riviera-6800-sy-platinum-edition-reviewed/).
  - 585 SUV: triple Garmin MFDs for radar, charts and sounder (https://www.rivieraaustralia.com/app/uploads/OCEAN109_BOAT-REVIEW-MASTER-RIVIERA-585SUV-LR3-1.pdf).
- **735 SUV (MAN boat):** "Garmin Navigation and Instrumentation" [C].
- **US-market 4600 listing [S, US-spec]:** two 16-inch Volvo Glass Bridge 8616 displays, Garmin AIS 800, Garmin GMR Fantom 54 open-array radar, GSD 25 sounder with ClearVü/SideVü, and the Volvo autopilot built into the Glass Bridge (https://zornyachts.com/yacht/2026-riviera-4600-sport-yacht-platinum-edition/).
- **Volvo Penta Assisted Docking** (the system holds a path and compensates for wind and current) and **Easy Connect** (Bluetooth interface to the EVC, with a diagnostic-email feature) are available [C] (https://www.rivieraaustralia.com/brochures-files/riviera-585-suv/ and https://www.rivieraaustralia.com/enews-articles/stay-connected-to-your-yacht-from-wherever-you-are/). Easy Connect "talks to the CZone electrical system, which in turn connects to Siren Marine."

### 1.3 Engines, drives, engine networks
- **Volvo Penta IPS (D6/D8/D11/D13)** [C].
  - Counter-rotating forward-facing props, joystick, DPS.
  - ACP (Anti-Corrosion Protection) unit on the transom to reduce anodes (https://www.rivieraaustralia.com/brochures-files/riviera-585-suv/).
- **MAN V8/V12 shaft drive** on the larger boats [C].
  - Riviera's MAN warranty is "5 years or 2,500 hours" [C].
  - Sentinel integrates with the engine management of Volvo Penta or MAN yachts [C] (https://www.rivieraaustralia.com/enews-articles/riviera-adds-a-virtual-crew-member-with-yacht-sentinel/).
- **Engine network detail** (published by Volvo/Garmin, not by Riviera): I did not open the full manuals.
  - [S] EVC is a CAN-bus system. The Garmin Glass Cockpit receives engine data over J1939 / EVC and can re-publish it to NMEA 2000.
  - [S] The Garmin display Ethernet port is the Garmin Marine Network, not plain Ethernet.
  - Manual: https://static.garmin.com/pumac/Volvo_MFD_86xx_OM_SW25_EN-US.pdf
- **Cummins and CAT:** not found as main engines on any current Riviera. They are not used in the lineup. (Cummins appears only as the Onan generator brand.)

### 1.4 Digital switching and monitoring
- **CZone is standard on every current model** [C] (e.g. https://www.rivieraaustralia.com/models/395-suv/ and /445-suv/).
  - It is described as CAN-based, with DC and AC switching and over-current protection.
  - It monitors AC volts, amps, frequency and kW; DC volts, amps and remaining capacity; and tank levels (https://www.rivieraaustralia.com/brochures-files/riviera-585-suv/).
  - There is a touchscreen at the saloon entrance, plus optional iPad control over Wi-Fi.
  - Modes: Cruising, Dock Unattended, Entertaining, Sleep, Service (https://www.rivieraaustralia.com/enews-articles/managing-your-on-board-power/).
- **Sentinel Marine app** is included with every new Riviera [C] (https://www.rivieraaustralia.com/models/395-suv/).
  - Features: battery voltages, bilge pumps, shore power loss, saloon temperature, tank levels, saloon motion, engine hours, geo-fence and anchor-drag alerts, and a PIR motion sensor.
  - It remotely operates selected CZone circuits and modes.
  - Sentinel's own support site says it uses a cellular Boat Monitor, connects to the **NMEA 2000** network, and needs CZone remote-switch configuration plus a licence. Each CZone interface (SI, COI, OI, C6, C1) provides 28 virtual remote switches. Data refreshes about every 20 minutes when the boat is stationary (https://sentinelmarinesolutions.freshdesk.com/support/solutions/articles/26000034667-czone-integration-guide and .../26000046291-sentinel-monitoring-overview).
  - **History [C]:** the 2023 to 24 brochures and the Aug 2023 article name **Siren Marine** as the remote telemetry. The July 2025 article introduces Sentinel "on all new Rivieras." I did not find a statement of why the supplier changed [I].
- **Empirbus, Naviop, Böning, Raymarine YachtSense:** no evidence Riviera uses them [T].

### 1.5 Batteries, chargers, inverters
- **Lithium (LiFePO4) is standard from 54 to 78 ft, optional under 50 ft** [C] (585 brochure). Newer pages say the house, auxiliary and starting batteries are all lithium-ion (https://www.rivieraaustralia.com/models/735-suv/). The Dec 2023 article says AGM for starting and LiFePO4 for house, so check each model.
- **Brand [C]:** **Fusion Pulse** LiFePO4, with a built-in BMS in each battery that disconnects on over-discharge or over-voltage. **Mastervolt** battery charger and inverter systems are fitted (https://www.rivieraaustralia.com/enews-articles/boating-education-series-lithium-batteries/).
  - The 4600 brochure names the Mastervolt AC/DC inverter.
  - The 395 SUV brochure says **24 V house power** and a Mastervolt inverter feeding the icemaker, entertainment and selected outlets (https://www.rivieraaustralia.com/brochures-files/riviera-395-suv/20/).
  - A US-market 4600 listing shows a 4 × 24 V 100 Ah lithium bank [S].
  - The 6800 review reports a 3,000 W inverter/charger, brand not stated [C: https://www.yachtingmagazine.com/yachts/riviera-6800-sy-platinum-edition-reviewed/].
- **Victron / Enerdrive:** not found on Riviera [T]. Riviera is a **Mastervolt + CZone** boat.
- **Charging layout [C]:** an alternator dedicated to each battery bank, battery chargers from shore or generator, an inverter on dedicated circuits, and a battery-parallel emergency system (managing-your-on-board-power article above). Riviera advises 100% state of charge before bed, 4-hour AC cycles, and an annual specialist check.
- **Solar [C]:** the **Praxis** 2 mm nano-composite "solar skin" is bonded into the hardtop. It is an option across the range from April 2026 and feeds the house bank via CZone. One example reports 1.8 kW giving about 10 kWh/day (https://www.rivieraaustralia.com/riviera-unveils-integrated-solar-breakthrough/).

### 1.6 Generators and shore power
- **Generators [C]:** Cummins Onan.
  - 585: Onan EQD, quoted as 22.5 kW in the text and 27 kW / 50 Hz in the spec table of the same review. That is a source conflict (Ocean 109 PDF above).
  - 6800 (US review): 29 kW + 13.5 kW Onan.
  - 68 SMY (2017): Cummins 27.5 kW + 13.5 kW.
- **Kohler** appears on a US-market 4600 (16 kW, 110 V / 60 Hz) [S, US-spec].
- **Fischer Panda:** not found [T].
- **Shore power:** a US-market 4600 listing shows a **Glendinning Cablemaster with wireless remote** [S]. No isolation transformer or Atlas/ASEA converter is mentioned in any source I found [T]. Whole-yacht RCD/GFCI is stated in brochures to comply with ABYC and CE [C]. Sentinel alerts on shore-power loss [C].

### 1.7 Stabilisers, thrusters, trim
- **Stabilisers [C]:** options are **Humphree fins** (fully electric, 24 V DC, 360° anchor mode, integrated with Humphree interceptors and Volvo EVC) or **Seakeeper** gyros. The 735 SUV page lists **Seakeeper 18** as an option, and the 5000 Sport Yacht lists Seakeeper (https://www.rivieraaustralia.com/models/735-suv/, https://www.rivieraaustralia.com/enews-articles/world-premiere-riviera-reveals-the-new-5000-sport-yacht-platinum/).
  - Riviera's own comparison article says gyros need the generator at anchor and fins use ship's power. It says over 50% of yachts had gyros, with a recent trend to Humphree fins (https://www.rivieraaustralia.com/enews-articles/stabiliser-systems-which-is-better-for-your-boating/).
  - Gyro vs fin systems should not run together.
  - Riviera engine rooms have a dedicated gyro space (395 brochure).
  - A US-market 4600 has a Seakeeper 6 [S].
- **Trim [C]:** Humphree Interceptors (6800) and a "Volvo Interceptor System" (US-market 4600 [S]). Zipwake, Bennett and Lenco: not found [T].
- **Thrusters:** Side-Power bow thruster (585: SEP 210 [C, review spec table]; 6800 Side-Power bow thruster [C]; US 4600: SEP100 proportional [S]). Hydraulic thrusters with Twin Disc EJS on the 645 [C]. The 68 SMY (2017) had a standard bow and optional stern thruster [C]. Vetus on Riviera: not found [T].

### 1.8 Steering
No current Riviera source states the steering type [T]. IPS pods are steered electronically from the helm and joystick, per the brochures [C]; whether this is pure steer-by-wire is [I]. The MAN boats presumably use hydraulic steering with Twin Disc controls [I, not confirmed].

### 1.9 AV, connectivity, cameras, lighting, HVAC
- **Starlink:** option on the 5000, 735, 645 and Belize 55 [C] (press pages above, and https://marinebusiness.news/news/leisure-marine/riviera-announces-new-645-suv-series-ii/).
- **Cameras [C]:** the 585 brochure lists cameras at aft, cockpit, alfresco deck, bow anchor and engine room, feeding helm screens. A US-market 4600 listing shows Garmin GC 200 IP infrared dome cameras and SIONX night vision [S, US-spec].
- **Stereo [S]:** Fusion Apollo and JL Audio on the 4600 per a search snippet of a boat listing. I did not open the page. Bose and KEF were not found [T].
- **Lighting [C]:** Lumitec SeaBlaze underwater lights (585 spec table; 4600 listing [S]); LED throughout.
- **HVAC:** tropical air-conditioning is fitted. Examples: 4600 (US) 30,000 BTU + 2 × 12,000 BTU [S]. Dometic chillers on the 6800 appear only in a snippet [S]. A boat-specific brand is [T]; Cruisair and Webasto are not confirmed.

### 1.10 Hybrid / electric propulsion
None found [T]. The nearest items are large lithium banks, 24 V systems and Praxis solar, which cut generator use but are not propulsion.

### 1.11 Australia-specific
- Brochures and specs for Australian-delivered boats use 50 Hz generators (585: 50 Hz [C]).
- US-market listings show 110 V / 60 Hz Kohler/Onan sets [S].
- Brochures cite ABYC and CE for battery boxes, RCD/GFCI and bonding. **No mention of AS/NZS 3004 or Australian shore-power standards** [T].

---

## 2. Maritimo (Gold Coast)

### 2.1 Current lineup [C] https://www.maritimo.com.au/model-overview/
| Series | Models | Standard engines (spec sheets) |
|---|---|---|
| M-Series flybridge ("Sky Lounge") | M75 (Black Edition), M60 (Black Edition), M55 (Black Edition), M50 | M75: Scania DI16 1150 (MTU 1625 optional). M60/M55/M50: 2× Volvo Penta D13 800 + ZF |
| S-Series sedan | S75, S60, S55 (Black Edition), S50 | S75 Scania DI16 1150; S60/S55 D13 800; S50 D13 800 (1000 hp optional, Scania DI16 1150 on hull 3 [C, powerboat.world]) |
| Offshore-Series | M600 (Black Edition), S600 | 2× D13 800 |

- The older /models/ page is stale. The 2024 S60 PDF still lists the S50 with D11 670, which conflicts with the current S50 model page and reviews (D13). The M54 and X60 are discontinued [C: https://www.yachtbuyer.com/en-us/maritimo/heritage].
- **All models are straight shaft drive** (no pods). Maritimo does not use IPS.

### 2.2 Helm electronics
- **Garmin is the standard.** Maritimo says about **99% of its US boats carry Garmin**. It names Garmin 9000-series MFDs up to 27 inches, **surround-view (360°) camera system** and **LiveScope forward sonar** as what owners ask for (https://www.maritimo.com.au/maritimo-product-partner-profile-garmin/) [C].
- **Display counts in reviews [C]:**
  - M50: "pair of 19-inch Garmin" (powerboat.world); "three 19-inch" (Yachting); "two 22-inch" (Club Marine). These reviews disagree, so it is likely option-dependent.
  - M600: three 19-inch.
  - S75 hull 1: two 24-inch.
  - S60: Garmin package standard, with engine-room and stern cameras (https://yachtstyle.co/review-maritimo-s60/).
- **Autopilot:** The powerboat.world M50 review calls the autopilot "FRED" (Frightfully Remarkable Electronic Device) and says it is on every Maritimo [C]. The underlying brand is not stated [T]. The M50 also has a stand-alone autopilot and engine display (Club Marine) [C].
- **Simrad:** appears on custom builds, e.g. the M75 "Talisman" with three Simrad MFDs [C: https://powerboatmagazine.co.nz/maritimo-m75/]. Raymarine appears via YachtSense (see 2.4).

### 2.3 Engines, drives, joystick, engine network
- **Volvo D11/D13 (EVC), Scania DI16, MTU 2000 V10** with ZF reduction gears (ratios 2.04:1 on M50, 2.2:1 and 2.5:1 on S50 hulls) [C].
- **Twin Disc EJS joystick and QuickShift gearboxes:** Maritimo helped develop EJS. Modes: Cruise (with Sync), Express, Trolling. Joystick vectoring ties gearbox control to thrusters (https://www.maritimo.com.au/maritimo-product-partner-profile-twin-disc/) [C]. S75 helm: "Twin Disc EJS joystick and throttles" (Yachting) [C].
- **Yacht Controller wireless remote** is compatible with Maritimo and can drive engines plus bow/stern thrusters (Club Marine M50; M75 review) [C].
- No Maritimo-specific engine-network (J1939/EVC) detail is published [T].
- **Cummins / CAT / MAN / Zeus / Pod:** not used (Cummins only as the Onan generator brand).

### 2.4 Digital switching and monitoring (important: this is not uniform)
- **Raymarine YachtSense** was announced as an offering for the **S55** at Sanctuary Cove, May 2023: helm integration, phone app, fluid levels, onboard modes, maintenance logging, remote diagnosis [C] (https://www.raymarine.com/en-us/about-raymarine/newsroom/raymarine-to-supply-yachtsensetm-digital-switching-systems-for-the-maritimo-s55).
  - Raymarine's materials describe YachtSense as using RayNet Ethernet to MFDs, SeaTalkNG / NMEA 2000, and J1939 and RS-485 ports on the master module [S] (https://www.raymarine.com/en-us/our-products/digital-boating/yachtsense-digital-control-systems/yachtsense-modules/master-module).
  - I could not confirm whether YachtSense is standard or optional on current Black Edition S55, S60 or M60 [T].
- **CZone + Fathom e-Power (Navico)** on the M75 "Talisman" (custom, Navico application engineering involved): CZone controls "every aspect of every on-board system," with a Mastervolt lithium bank and a "6th generation Mastervolt BMS." The article calls this "a first for Maritimo" [C: https://powerboatmagazine.co.nz/maritimo-m75/]. Modes include Daytime Cruising and a CZone night mode that dims the Simrad displays.
- **Siren / Sentinel, Empirbus, Naviop, Böning:** not found on Maritimo [T].
- **Conclusion [I]:** Maritimo's electrical control is more varied and owner-specified than Riviera's. A tech has to identify which system is fitted rather than assume CZone.

### 2.5 Batteries, chargers, inverters
- **Dated standard spec (older M55, US price list, c.2018) [C, dated, US]:** 4 × 200 Ah house, 2 × 2 start (900 CCA) batteries, 4 kW / 100 A inverter-charger, RCD on all sub-circuits, polarity warning on shore power, 24 V generator charging alternator, solenoid pack for autopilot (https://chesapeakeyachtcenter.com/wp-content/uploads/2018/09/M55_US202-1-.pdf). Do not treat this as the current spec.
- **Current Black Edition electrical details (battery chemistry, inverter brand) are not published** on the maritimo.com.au model pages or spec PDFs I read [T].
- **Mastervolt** lithium + BMS on the M75 above [C]. Victron / Enerdrive: not found [T].

### 2.6 Generators, shore power
- **Cummins Onan, 50 Hz [C]:** 17.5 kW on S60/S55/S50/M600, 17.2 kW on M600 BE (spec PDFs: https://www.maritimo.com.au/wp-content/uploads/2024/10/AUS_Maritimo_S60_Oct24-Web.pdf and ..._M600_BE_Aug24-Web.pdf). The S75 has 22 kW (spec) or 2 × 22.5 kW Onan (Yachting review) [C].
- Kohler and Fischer Panda: not found [T].
- Shore power, isolation transformers, Atlas/ASEA converters and cablemasters: nothing published [T].

### 2.7 Stabilisers, thrusters, trim tabs
- **Seakeeper is a core partner [C]:** since July 2009, Maritimo was the first OEM in Australia and Asia-Pacific to adopt Seakeeper. Over 100 units are fitted. The Seakeeper 9 was the biggest-volume model (https://www.maritimo.com.au/maritimo-product-partner-profile-seakeeper/).
- **Other gyros [C]:** Quick (Gineico) X30 / X56 on M55 / M75 (https://www.maritimo.com.au/maritimo-product-partner-profile-gineico-marine/, https://www.boatingnz.co.nz/boat-reviews/luxury-awaits/). Twin ARG250T gyros on the S75 hull 1 (Yachting). Twin ARG on the M75 Talisman.
- **Seakeeper Ride** (rotary "bucket" interceptors, 12 V DC): optional on the **M50** (https://www.yachtingmagazine.com/yachts/maritimo-m50-reviewed/) and fitted to **S50 hull 2** (Seakeeper Ride 1275, Gold Coast sea trial 26 Aug 2026: 44% roll, 33% pitch reduction at about 24 mph in light beam seas) [C: https://ride.seakeeper.com/sea-trial/maritimo-s50-2027/].
- **Interceptors:** Humphree Dynamic interceptors on the M75 Talisman and Humphree interceptors on the S75 [C]; interceptor trim tabs on the S50 [C]. Bennett, Lenco, Zipwake: not confirmed on current models [T].
- **Thrusters [C]:** hydraulic Side-Power bow and stern on the M75 and S75. **Optional Vetus or Sleipner brushless proportional thrusters** on boats under 70 ft (powerboat.world S50 review). The M50 has proportional Vetus bow and stern thrusters on one joystick (Club Marine, Yachting).

### 2.8 Steering
Not specified in current sources [T]. Older M55 specs list a "solenoid pack for autopilot," which suggests hydraulic steering with an autopilot [I]. Reviews praise manual "feel" when the autopilot is in standby.

### 2.9 AV, connectivity, cameras, lighting, HVAC
- **Stereo:** Fusion stereo controlled from iPhone (S50, M50) [C]; Apollo audio on the 2021 M55 [C]; JL Audio on the M75 Talisman [C].
- **Starlink + satellite TV** on the M75 Talisman [C].
- **Cameras [C]:** Garmin surround-view option; M75 Talisman had reversing, engine-room, cockpit, anchor and **FLIR night-vision** cameras.
- **Lighting:** Aqualuma blue underwater lights (M75, 8 units) [C]. Lumitec / OceanLED: not found [T].
- **HVAC:** climate-controlled Sky Lounge and air conditioning exist. Brands (Dometic / Cruisair / Webasto) are not published [T].

### 2.10 Hybrid / electric
No Maritimo hybrid propulsion found [T]. A 2021 snippet says Maritimo was holding off on hybrids [S] (https://www.boatsales.com.au/editorial/details/maritimo-to-hold-off-on-hybrid-motor-yachts-for-now-133352/). Fathom e-Power (a lithium + inverter + CZone package) is a power-system product, not propulsion.

### 2.11 Australia-specific
Spec sheets quote **50 Hz** generators [C]. The US price list shows 60 Hz sets for US boats [C]. No AS/NZS 3004 mention found [T].

---

## 3. Side-by-side comparison

| System | Riviera | Maritimo |
|---|---|---|
| Drive | Volvo IPS pods (≤ about 60 ft); MAN shaft (larger) | Straight shaft: Volvo D11/D13, Scania, MTU, ZF |
| Joystick | Volvo IPS joystick; Twin Disc EJS on MAN boats [C] | Twin Disc EJS + QuickShift [C]; Yacht Controller remote |
| Helm electronics | Volvo Glass Cockpit (Garmin) on IPS; Garmin on 735 | Garmin standard (about 99% of US boats); Simrad / Raymarine on some boats |
| Digital switching | **CZone standard on all** [C] | Varies: **Raymarine YachtSense** (S55, 2023) [C]; **CZone + Fathom e-Power** (M75 custom) [C]; current standard [T] |
| Remote monitoring | **Sentinel** (cellular, via N2K + CZone), formerly Siren Marine [C] | YachtSense app (S55) [C]; CZone remote (M75) [C]; nothing else found |
| Batteries | Fusion Pulse LiFePO4 house (+ lithium start on newer pages); 24 V house [C] | Mastervolt lithium + BMS (M75) [C]; others [T] |
| Charger / inverter | Mastervolt [C] | Mastervolt (M75) [C]; older 4 kW unit unnamed [C, dated] |
| Solar | Praxis integrated hardtop option [C] | [T] |
| Generators | Cummins Onan (Kohler on US 4600 [S]) | Cummins Onan 17.2 to 22.5 kW, 50 Hz [C] |
| Stabilisers | Humphree fins (24 V) or Seakeeper (6, 18 named) [C] | Seakeeper (since 2009), Quick, ARG gyros; Seakeeper Ride (M50/S50) [C] |
| Trim | Humphree interceptors; Volvo interceptors [C, S] | Humphree interceptors (M75/S75); interceptor tabs (S50) [C] |
| Thrusters | Side-Power; hydraulic on MAN boats [C] | Side-Power hydraulic (large); Vetus/Sleipner brushless (< 70 ft) [C] |
| Cameras / night vision | Multi-camera to helm; Garmin GC 200, SIONX (US) [C/S] | Garmin surround view; FLIR night vision [C] |
| AV | Fusion Apollo + JL Audio [S]; Starlink option [C] | Fusion (S50/M50), JL Audio, Starlink (M75) [C] |
| Hybrid / electric | None found | None found |
| NMEA / network publication | CZone N2K/CAN; EVC CAN; Garmin Marine Network [S] | Not published |

---

## 4. Proposed new training segments

**Overlap key:** NEW (no coverage today), EXTEND (add to an existing lesson or module), OVERLAP (substantially covered; link instead of duplicating). The existing app already has: `n4` CZone and integrated systems, `n5` CZone COI, `x3` Humphree/Zipwake interceptors, `x4` Seakeeper overview, `x8` Seakeeper 1 and 3 electrical, `p2` Volvo Penta EVC/Cummins/CAT/MAN, `p3` joystick/IPS/pods, `p4` thrusters, and the full Mastervolt module (`m1` to `m4`).

### Module A: Riviera systems
| # | Lesson | Overlap | Public material |
|---|---|---|---|
| A1 | Riviera power architecture (24 V house, Fusion Pulse LiFePO4 + AGM start, per-bank alternators, Mastervolt chargers/inverter, battery parallel, CZone modes) | EXTEND `b3`, `m1`–`m4`, `n4` | Riviera articles (power management, lithium); Mastervolt manuals already in app. **Fusion Pulse public manuals not verified.** |
| A2 | Volvo Penta IPS + EVC + Glass Cockpit (Garmin) architecture; DPS, Assisted Docking, Easy Connect, ACP | EXTEND `p2`, `p3` | Garmin Glass Cockpit owner's manuals at static.garmin.com [S]; Volvo EVC installation manual only found on a third-party host, so verify before citing |
| A3 | Riviera MAN shaft-drive boats: Twin Disc EJS + hydraulic thrusters | NEW (EJS not covered) | Twin Disc public manuals not verified |
| A4 | Sentinel remote monitoring + CZone remote switching (28 virtual switches per interface, licence, N2K connection) | NEW | **Good**: Sentinel support site |
| A5 | Praxis integrated solar + lithium safety | EXTEND `b4` | Riviera press pages; Praxis marketing only. Wiring/MPPT detail [T] |
| A6 | Cameras, night vision, Starlink, Glendinning cablemaster, Fusion/JL AV | NEW | Mostly brand marketing; Garmin camera manuals available |

### Module B: Maritimo systems
| # | Lesson | Overlap | Public material |
|---|---|---|---|
| B1 | Maritimo shaft-drive platform: Volvo D13 / Scania / MTU + ZF; Twin Disc QuickShift and EJS modes (Cruise/Sync/Express/Trolling) | EXTEND `p2`, `p3` | Maritimo partner profile (Twin Disc) |
| B2 | Maritimo helm electronics: Garmin 9000-series MFDs, surround view, LiveScope, autopilot ("FRED"), Yacht Controller | EXTEND `n3` | Maritimo partner profile (Garmin); Garmin manuals |
| B3 | Digital switching on Maritimo: Raymarine YachtSense vs CZone + Fathom e-Power; how to identify which system is aboard | NEW (YachtSense not covered; extends `n4`) | YachtSense install/operation manual 81394 [S]; Raymarine training [S]; CZone downloads/training [S] |
| B4 | Maritimo stabilisation: Seakeeper 9/10.5, Quick, ARG; Humphree interceptors; Seakeeper Ride | EXTEND `x3`, `x4` (link to Module S) | Seakeeper manuals; Humphree technical documents; Maritimo Seakeeper profile |
| B5 | Thrusters: hydraulic Side-Power vs Vetus/Sleipner brushless proportional | EXTEND `p4` | Side-Power manuals already in app; Vetus/Sleipner manuals |
| B6 | Generators and 50 Hz AC distribution; older standard Maritimo electrical layout | OVERLAP `s3`, `s4` | Spec PDFs; Maritimo does not publish schematics [T] |

### Module S: Seakeeper (requested by the user)
Seakeeper publishes the most public training and manual material of anything found.
| # | Lesson | Overlap | Public material |
|---|---|---|---|
| S1 | How a gyro works: vacuum flywheel, precession, spool-up, brake | OVERLAP `x4` (expand) | Seakeeper product pages |
| S2 | Range and sizing (models 1 to 40; boat length / displacement matching; Maritimo/Riviera typical sizes) | NEW | https://www.seakeeper.com/seakeeper-products/ pages |
| S3 | Electrical requirements: **AC main + DC control + seawater pump**, per model, 50/60 Hz, generator vs inverter loading | EXTEND `x8` (currently SK1 and SK3 only) | Current manuals https://manuals.seakeeper.com/seakeeper/ (installation + operation manuals for models 1 to 40) |
| S4 | Controls and integration: ConnectBox, MFD integration, NMEA 2000 | NEW | Product pages; manuals |
| S5 | **Seakeeper Ride**: Software Module, Distribution Module, proprietary CAN (**kept separate from the N2K backbone**), 25 A breaker (30 A quad), Deutsch/Ampseal wiring, NMEA LEN = 1, commissioning | NEW | **Excellent**: https://manuals.seakeeper.com/ride/seakeeper-ride-electrical-installation-manual-all-sizes/ and the Ride mechanical and configuration manuals |
| S6 | Commissioning, fault-finding and safe handling | EXTEND `x8` safety content | Manuals; Seakeeper University (dealers only) |
| S7 | Seakeeper pathway: Seakeeper University and the Gold Coast training centre | NEW (info only) | https://twindisc.com.au/resources/news-events/seakeeper-university-graduate-elevates-marine-training-in-apac/ |

Spec facts already verified for S3 (from seakeeper.com product pages):
- **Seakeeper 6:** 220 VAC at 20 A, 50/60 Hz, or 110 VAC at 30 A; control power 12 VDC at 15 A.
- **Seakeeper 10.5:** 220 VAC at 20 A; control and seawater pump 24 VDC at 10 A each.
- **Seakeeper 18:** 208 to 230 VAC at 30 A; 24 VDC control and pump.
- Spool-up to stabilisation ranges from 18 to 27 minutes across these models.

### Module C: Cross-cutting
| # | Lesson | Overlap | Public material |
|---|---|---|---|
| C1 | **Network map of a modern Riviera/Maritimo** (EVC CAN, Garmin Marine Network Ethernet, N2K backbone, CZone, Sentinel gateway, Seakeeper Ride CAN, thruster/joystick CAN). A hotspot diagram plus "where do I terminate / which bus am I on" quiz | EXTEND `n2`, `n3`, `n4`; diagram NEW | No published per-model topology [T]; build from vendor manuals, labelled "typical architecture" |
| C2 | Australian-spec vs US-spec boats (240 V / 50 Hz vs 110 V / 60 Hz; AS/NZS 3004) | OVERLAP `f3`, `nav-ext` (3004) | Builders do not cite 3004 [T]; the app already covers it |
| C3 | Fault-finding scenarios: CZone "ON but dead," Sentinel not showing switches, Seakeeper Ride CAN fault, Glass Cockpit loses EVC data | EXTEND fault module | Vendor manuals |

Suggested exam: one 15-question exam each for Riviera, Maritimo and Seakeeper, plus extra questions in the final certification.

---

## 5. Gaps and cautions
1. **No per-model wiring schematics, equipment lists or NMEA 2000 topologies are public** for either builder. Owner's manuals are not on the public sites. Any lesson on "what is on a given model" must be labelled typical or generic, and the user (who works on these boats) will know the real detail better. He may be able to supply real examples.
2. **Maritimo's current standard electrics are largely undocumented.** Its model pages and PDFs give hull/engine/generator data only. YachtSense (S55, 2023) and CZone/Fathom (a custom M75) are the only confirmed switching systems.
3. **Not found for either builder:** Naviop, Böning, Empirbus, Maretron, Zeus (Navico MFDs found only on custom Maritimo builds), Victron, Enerdrive, Fischer Panda, Zipwake, Bennett, Lenco, OceanLED, Bose, KEF, Webasto and Cruisair. Isolation transformers, Atlas/ASEA converters and any hybrid/electric propulsion are also absent from public material.
4. **Source conflicts:** Riviera 585 generator size (22.5 kW vs 27 kW); Maritimo M50 helm screens (two 19-inch vs three 19-inch vs two 22-inch); Maritimo S50 engine (2024 PDF says D11 670, current page D13 800).
5. **US-spec data** (Kohler 110 V/60 Hz, Glendinning, SIONX, Garmin GC 200) came from broker listings and should not be taught as Australian standard.
6. **Several Riviera and Maritimo facts are from search snippets** where the full page blocked me (boatsales.com.au and boattest.com returned 403). Items tagged [S] should be re-verified before going into lessons.
7. **Terminology:** Riviera now says "Sentinel"; older material and some reviews say "Siren Marine". Riviera calls its displays "Glass Cockpit," while the 2026 US listing says "Glass Bridge".
8. **Seakeeper gyro power:** Riviera's own article says gyros need the generator. That matches the AC input of the Seakeeper 6/10.5/18, but the Seakeeper Ride unit is 12 V DC. The app's existing SK1 and SK3 lessons cover DC-powered models, so SK6+ needs the AC-power content added.

## 6. Key source URLs
- Riviera: https://www.rivieraaustralia.com/models/ ; 395 SUV, 735 SUV, 6200 pages; https://www.rivieraaustralia.com/brochures-files/riviera-585-suv/ ; https://www.rivieraaustralia.com/enews-articles/managing-your-on-board-power/ ; .../boating-education-series-lithium-batteries/ ; .../riviera-adds-a-virtual-crew-member-with-yacht-sentinel/ ; .../stabiliser-systems-which-is-better-for-your-boating/ ; https://www.rivieraaustralia.com/riviera-unveils-integrated-solar-breakthrough/
- Maritimo: https://www.maritimo.com.au/model-overview/ ; partner profiles (Garmin, Twin Disc, Seakeeper, Gineico) at https://www.maritimo.com.au/maritimo-product-partner-profile-garmin/ etc.; https://powerboatmagazine.co.nz/maritimo-m75/ ; https://www.yachtingmagazine.com/yachts/maritimo-m50-reviewed/ ; https://powerboat.world/news/299937/Maritimo-S50-Review-Second-is-the-winner ; Raymarine YachtSense release (URL in 2.4)
- Seakeeper: https://manuals.seakeeper.com/seakeeper/ ; https://manuals.seakeeper.com/ride/seakeeper-ride-electrical-installation-manual-all-sizes/ ; https://www.seakeeper.com/seakeeper-products/seakeeper-6/ (also -10-5, -18) ; https://www.seakeeper.com/press-releases/seakeeper-expands-dealer-training-program-with-new-facility-in-italy/
- Sentinel: https://sentinelmarinesolutions.freshdesk.com/support/solutions/articles/26000034667-czone-integration-guide
- Raw downloads used (brochures, spec PDFs): /workspace/research/src/
