import React, { useState, useEffect } from "react";
import {
  Building2, Sparkles, ShieldCheck, KeyRound, Camera,
  CheckCircle2, AlertTriangle, TrendingUp, FileText,
  Smartphone, LayoutDashboard, Lock, Unlock,
  Receipt, Plus, Eye, X, Check, LogOut, LogIn,
  ScanLine, Activity, RotateCcw, Wifi, MapPin, Car, UserCheck
} from "lucide-react";

const INITIAL_UNITS = [
  {
    id: "A-101",
    building: "Residence Park · A Épület",
    floor: 1,
    number: "101",
    type: "Stúdió (38 m²)",
    sqm: 38,
    srl: "Transilvania Stay SRL",
    status: "READY",
    guestName: "Kovács Péter",
    guestCnp: "1890512123456",
    guestAddress: "400001 Cluj-Napoca, Str. Memorandumului 12",
    guestCount: "2 felnőtt",
    stayDates: "2026.11.19 – 2026.11.22 (3 éj)",
    nextCheckIn: "15:00",
    checkedInAt: null,
    pinCode: "482910#",
    pinActive: false,
    formCompleted: false,
    wifiSsid: "ResidencePark_A101_5G",
    wifiPass: "ClujStay2026!",
    parkingSpot: "P-14 (Mélygarázs -1)",
    cleaner: "Maria I.",
    cleaningProgress: 100,
    cleaningDurationSec: 2340,
    revenueMonth: 9450,
    otaFee: 1417,
    cleaningCost: 540,
    utilities: 380,
    taxes: 420,
    photos: ["Fürdőszoba", "Hálószoba", "Konyhapult"],
    note: "Tiszta, fertőtlenített lakás. Vendég online bejelentkezésére vár.",
    justCheckedOut: false,
  },
  {
    id: "A-102",
    building: "Residence Park · A Épület",
    floor: 1,
    number: "102",
    type: "2 szobás (54 m²)",
    sqm: 54,
    srl: "Transilvania Stay SRL",
    status: "OCCUPIED",
    guestName: "Andrei Popescu",
    guestCnp: "1850320401122",
    guestAddress: "010011 București, Bd. Magheru 24",
    guestCount: "2 felnőtt + 1 gyerek",
    stayDates: "2026.11.17 – 2026.11.19 (2 éj)",
    nextCheckIn: "Kijelentkezés ma",
    checkedInAt: "2026.11.17 15:14",
    pinCode: "910344#",
    pinActive: true,
    formCompleted: true,
    wifiSsid: "ResidencePark_A102_5G",
    wifiPass: "ClujStay2026!",
    parkingSpot: "P-15 (Mélygarázs -1)",
    cleaner: "Maria I.",
    cleaningProgress: 100,
    cleaningDurationSec: 2880,
    revenueMonth: 13200,
    otaFee: 1980,
    cleaningCost: 720,
    utilities: 510,
    taxes: 590,
    photos: ["Fürdőszoba", "Nappali", "Konyhapult"],
    note: "Vendég a lakásban. PIN kód aktív. Kijelentkezésre vár.",
    justCheckedOut: false,
  },
  {
    id: "A-104",
    building: "Residence Park · A Épület",
    floor: 1,
    number: "104",
    type: "2 szobás (56 m²)",
    sqm: 56,
    srl: "Transilvania Stay SRL",
    status: "DIRTY",
    guestName: "Elena Munteanu (Érk: 14:30)",
    guestCnp: "2920814125678",
    guestAddress: "500007 Brașov, Str. Republicii 8",
    guestCount: "3 felnőtt",
    stayDates: "2026.11.19 – 2026.11.24 (5 éj)",
    nextCheckIn: "14:30 (SÜRGŐS)",
    checkedInAt: null,
    pinCode: "773190#",
    pinActive: false,
    formCompleted: true,
    wifiSsid: "ResidencePark_A104_5G",
    wifiPass: "ClujStay2026!",
    parkingSpot: "P-18 (Mélygarázs -1)",
    cleaner: "Maria I.",
    cleaningProgress: 0,
    cleaningDurationSec: 0,
    revenueMonth: 14100,
    otaFee: 2115,
    cleaningCost: 810,
    utilities: 530,
    taxes: 630,
    photos: [],
    note: "Előző vendég távozott! Azonnali takarítás szükséges 14:30-ig.",
    justCheckedOut: false,
  },
  {
    id: "B-205",
    building: "Residence Park · B Épület (Új)",
    floor: 2,
    number: "205",
    type: "Stúdió (40 m²)",
    sqm: 40,
    srl: "Cluj Urban Living SRL",
    status: "MAINTENANCE",
    guestName: "Zárolva (Építési garancia)",
    guestCnp: "-",
    guestAddress: "-",
    guestCount: "-",
    stayDates: "-",
    nextCheckIn: "-",
    checkedInAt: null,
    pinCode: "000000#",
    pinActive: false,
    formCompleted: false,
    wifiSsid: "ResidencePark_B205_5G",
    wifiPass: "Service205",
    parkingSpot: "P-22",
    cleaner: "-",
    cleaningProgress: 0,
    cleaningDurationSec: 0,
    revenueMonth: 10400,
    otaFee: 1560,
    cleaningCost: 650,
    utilities: 540,
    taxes: 750,
    photos: [],
    note: "Építési garancia: Zuhanykabin szilikonozás & csaptelep csere (AquaFix).",
    justCheckedOut: false,
  },
  {
    id: "B-302",
    building: "Residence Park · B Épület (Új)",
    floor: 3,
    number: "302",
    type: "3 szobás VIP (82 m²)",
    sqm: 82,
    srl: "Cluj Urban Living SRL",
    status: "CLEANING",
    guestName: "Dr. Szabó László (Érk: 16:00)",
    guestCnp: "1781104260011",
    guestAddress: "540015 Târgu Mureș, Piața Trandafirilor 5",
    guestCount: "4 felnőtt",
    stayDates: "2026.11.19 – 2026.11.23 (4 éj)",
    nextCheckIn: "16:00",
    checkedInAt: null,
    pinCode: "662019#",
    pinActive: false,
    formCompleted: true,
    wifiSsid: "ResidencePark_B302_5G",
    wifiPass: "VipCluj302!",
    parkingSpot: "P-01 (VIP)",
    cleaner: "Ioana V.",
    cleaningProgress: 60,
    cleaningDurationSec: 1620,
    revenueMonth: 21800,
    otaFee: 3270,
    cleaningCost: 1120,
    utilities: 780,
    taxes: 980,
    photos: ["Fürdőszoba", "Nappali"],
    note: "Ioana V. jelenleg a lakásban takarít (2/3 fotó feltöltve).",
    justCheckedOut: false,
  },
  {
    id: "B-304",
    building: "Residence Park · B Épület (Új)",
    floor: 3,
    number: "304",
    type: "2 szobás (55 m²)",
    sqm: 55,
    srl: "Cluj Urban Living SRL",
    status: "READY",
    guestName: "Michael Weber (Érk: 17:30)",
    guestCnp: "DE-99481204",
    guestAddress: "80331 München, Maximilianstraße 14",
    guestCount: "2 felnőtt",
    stayDates: "2026.11.19 – 2026.11.21 (2 éj)",
    nextCheckIn: "17:30",
    checkedInAt: null,
    pinCode: "331890#",
    pinActive: false,
    formCompleted: false,
    wifiSsid: "ResidencePark_B304_5G",
    wifiPass: "ClujStay2026!",
    parkingSpot: "P-04",
    cleaner: "Ioana V.",
    cleaningProgress: 100,
    cleaningDurationSec: 2510,
    revenueMonth: 12900,
    otaFee: 1935,
    cleaningCost: 680,
    utilities: 490,
    taxes: 580,
    photos: ["Fürdőszoba", "Hálószoba", "Konyhapult"],
    note: "Kész és ellenőrzött. Vendég adatlapjára vár.",
    justCheckedOut: false,
  },
];

const INITIAL_LOGS = [
  { id: 1, time: "14:12", type: "CLEANING", text: "Ioana V. feltöltött 2 fotót (B-302 lakás)" },
  { id: 2, time: "11:04", type: "CHECKOUT", text: "Előző vendég távozott (A-104) – Takarítási riasztás aktív" },
  { id: 3, time: "10:15", type: "INVOICE", text: "ANAF e-Factura #F-2026-894 beküldve (Transilvania Stay SRL)" },
];

const TRANSLATIONS = {
  HU: {
    title: "Mai feladataim",
    subtitle: "Residence Park · Cluj-Napoca",
    urgent: "SÜRGŐS",
    readyBadge: "KÉSZ",
    startBtn: "TAKARÍTÁS INDÍTÁSA",
    finishBtn: "KÉSZ VAGYOK (KIJELENTKEZÉS)",
    pinLabel: "Ideiglenes Okoszár PIN",
    checklistTitle: "Kötelező ellenőrzőlista",
    photosTitle: "Kötelező ellenőrző fotók (3/3)",
    issueBtn: "Hiba / Kár jelentése",
    supplyBtn: "Fogyóeszköz elfogyott",
    completedMsg: "Lakás készre jelentve! Admin értesítve.",
    newFromCheckout: "ÚJ · Vendég most jelentkezett ki!",
    tasks: [
      "Ágynemű csere és feszes ágyazás",
      "Fürdőszoba fertőtlenítés, törölközők bekészítése",
      "Konyhapult, hűtő, kávéfőző és kapszulák ellenőrzése",
      "Padló porszívózása és felmosása",
    ],
  },
  RO: {
    title: "Sarcinile mele de azi",
    subtitle: "Residence Park · Cluj-Napoca",
    urgent: "URGENT",
    readyBadge: "GATA",
    startBtn: "ÎNCEPE CURĂȚENIA",
    finishBtn: "AM TERMINAT (CHECK-OUT)",
    pinLabel: "PIN Temporar Yală Smart",
    checklistTitle: "Listă obligatorie de verificare",
    photosTitle: "Fotografii obligatorii (3/3)",
    issueBtn: "Raportează defecțiune / daună",
    supplyBtn: "Consumabile epuizate",
    completedMsg: "Apartament marcat ca GATA! Admin notificat.",
    newFromCheckout: "NOU · Oaspetele tocmai a făcut check-out!",
    tasks: [
      "Schimbare lenjerie de pat și aranjare",
      "Dezinfectare baie și pregătire prosoape",
      "Verificare bucătărie, frigider și capsule cafea",
      "Aspirare și spălare pardoseală",
    ],
  },
  EN: {
    title: "My Tasks Today",
    subtitle: "Residence Park · Cluj-Napoca",
    urgent: "URGENT",
    readyBadge: "DONE",
    startBtn: "START CLEANING",
    finishBtn: "MARK AS READY (CHECK-OUT)",
    pinLabel: "Temporary Smart Lock PIN",
    checklistTitle: "Mandatory Checklist",
    photosTitle: "Required Verification Photos (3/3)",
    issueBtn: "Report Issue / Damage",
    supplyBtn: "Restock Supplies",
    completedMsg: "Apartment marked READY! Admin notified.",
    newFromCheckout: "NEW · Guest just checked out!",
    tasks: [
      "Change bed linen and make beds",
      "Sanitize bathroom and place fresh towels",
      "Check kitchen counter, fridge & coffee capsules",
      "Vacuum and mop all floors",
    ],
  },
};

export default function App() {
  const [activeRole, setActiveRole] = useState("OWNER");
  const [units, setUnits] = useState(INITIAL_UNITS);
  const [logs, setLogs] = useState(INITIAL_LOGS);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedUnitModal, setSelectedUnitModal] = useState(null);
  const [sharedUtilityBill, setSharedUtilityBill] = useState(2400);
  const [eFacturaSynced, setEFacturaSynced] = useState(false);

  const [cleanerLang, setCleanerLang] = useState("HU");
  const [selectedCleanerUnitId, setSelectedCleanerUnitId] = useState("A-104");
  const [cleaningStarted, setCleaningStarted] = useState(false);
  const [checkedItems, setCheckedItems] = useState([false, false, false, false]);
  const [takenPhotos, setTakenPhotos] = useState([false, false, false]);
  const [cleanerIssueSent, setCleanerIssueSent] = useState(null);
  const [timerSec, setTimerSec] = useState(0);

  const [selectedGuestUnitId, setSelectedGuestUnitId] = useState("A-101");
  const [guestForm, setGuestForm] = useState({
    name: "Kovács Péter",
    cnp: "1890512123456",
    address: "400001 Cluj-Napoca, Str. Memorandumului 12",
    agreed: true,
  });
  const [guestToast, setGuestToast] = useState(null);
  const [copiedWifi, setCopiedWifi] = useState(false);

  const dirtyUnits = units.filter((u) => u.status === "DIRTY" || u.status === "CLEANING");
  const activeCleanerUnit =
    units.find((u) => u.id === selectedCleanerUnitId) || dirtyUnits[0] || units[2];

  const guestSelectableUnits = units.filter((u) => u.status !== "MAINTENANCE");
  const activeGuestUnit =
    units.find((u) => u.id === selectedGuestUnitId) || guestSelectableUnits[0];

  useEffect(() => {
    if (activeGuestUnit) {
      setGuestForm({
        name: activeGuestUnit.guestName.replace(/\s*\(.*?\)/g, ""),
        cnp: activeGuestUnit.guestCnp === "-" ? "" : activeGuestUnit.guestCnp,
        address: activeGuestUnit.guestAddress === "-" ? "" : activeGuestUnit.guestAddress,
        agreed: true,
      });
    }
  }, [selectedGuestUnitId]);

  useEffect(() => {
    let interval = null;
    if (cleaningStarted && activeCleanerUnit.status !== "READY") {
      interval = setInterval(() => setTimerSec((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [cleaningStarted, activeCleanerUnit.status]);

  const addLog = (type, text) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
    setLogs((prev) => [{ id: Date.now(), time: timeStr, type, text }, ...prev.slice(0, 7)]);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const calcNetProfit = (u) => {
    return u.revenueMonth - (u.otaFee + u.cleaningCost + u.utilities + u.taxes);
  };

  const handleSelectCleanerUnit = (unitId) => {
    setSelectedCleanerUnitId(unitId);
    const target = units.find((u) => u.id === unitId);
    if (target?.status === "CLEANING") {
      setCleaningStarted(true);
      setCheckedItems([true, true, false, false]);
      setTakenPhotos([true, true, false]);
      setTimerSec(target.cleaningDurationSec || 1200);
    } else {
      setCleaningStarted(false);
      setCheckedItems([false, false, false, false]);
      setTakenPhotos([false, false, false]);
      setTimerSec(0);
    }
    setCleanerIssueSent(null);
  };

  const handleStartCleaning = () => {
    setCleaningStarted(true);
    setUnits((prev) =>
      prev.map((u) =>
        u.id === activeCleanerUnit.id
          ? {
              ...u,
              status: "CLEANING",
              cleaner: "Maria I.",
              note: "Maria I. belépett a lakásba (Okoszár PIN nyitva).",
            }
          : u
      )
    );
    addLog("CLEANING", `Maria I. elindította a takarítást (${activeCleanerUnit.id})`);
  };

  const handleCompleteCleaning = () => {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === activeCleanerUnit.id
          ? {
              ...u,
              status: "READY",
              cleaningProgress: 100,
              cleaningDurationSec: timerSec || 1850,
              photos: ["Fürdőszoba", "Hálószoba", "Konyhapult"],
              justCheckedOut: false,
              note: `Frissen takarítva (Maria I. · ${formatTime(
                timerSec || 1850
              )}). 3/3 fotó feltöltve.`,
            }
          : u
      )
    );
    setCleaningStarted(false);
    addLog("READY", `${activeCleanerUnit.id} lakás KÉSZRE jelentve (3/3 fotó auditálható)`);
  };

  const handleGuestOcrSimulate = () => {
    setGuestForm({
      name: activeGuestUnit.guestName.replace(/\s*\(.*?\)/g, "") || "Kovács Péter",
      cnp: "1890512123456",
      address: "400001 Cluj-Napoca, Str. Memorandumului 12",
      agreed: true,
    });
    setGuestToast("Személyi igazolvány (CI) adatok kiolvasva (OCR)!");
    setTimeout(() => setGuestToast(null), 3000);
  };

  const handleGuestCheckIn = () => {
    const nowStr = "Ma 15:35";
    setUnits((prev) =>
      prev.map((u) =>
        u.id === activeGuestUnit.id
          ? {
              ...u,
              status: "OCCUPIED",
              guestName: guestForm.name || u.guestName,
              guestCnp: guestForm.cnp,
              guestAddress: guestForm.address,
              formCompleted: true,
              pinActive: true,
              checkedInAt: nowStr,
              justCheckedOut: false,
              note: `Vendég online bejelentkezett (${nowStr}). Okoszár PIN aktív.`,
            }
          : u
      )
    );
    addLog(
      "CHECKIN",
      `${guestForm.name} bejelentkezett (${activeGuestUnit.id}) – Okoszár PIN aktiválva`
    );
    setGuestToast("Sikeres Check-in! Az okoszár PIN-kód aktiválva.");
    setTimeout(() => setGuestToast(null), 3500);
  };

  const handleGuestCheckOut = () => {
    const unitId = activeGuestUnit.id;
    const gName = activeGuestUnit.guestName.replace(/\s*\(.*?\)/g, "");
    setUnits((prev) =>
      prev.map((u) =>
        u.id === unitId
          ? {
              ...u,
              status: "DIRTY",
              pinActive: false,
              checkedInAt: null,
              cleaningProgress: 0,
              photos: [],
              justCheckedOut: true,
              note: `Vendég (${gName}) kijelentkezett! PIN törölve, takarítónő riasztva.`,
            }
          : u
      )
    );
    setSelectedCleanerUnitId(unitId);
    setCleaningStarted(false);
    setCheckedItems([false, false, false, false]);
    setTakenPhotos([false, false, false]);
    setTimerSec(0);

    addLog(
      "CHECKOUT",
      `${gName} kijelentkezett (${unitId}) – PIN törölve, takarítási feladat kiküldve!`
    );
    setGuestToast("Kijelentkezés rögzítve! e-Factura elküldve, takarító értesítve.");
    setTimeout(() => setGuestToast(null), 4000);
  };

  const handleResetDemo = () => {
    setUnits(INITIAL_UNITS);
    setLogs(INITIAL_LOGS);
    setSelectedCleanerUnitId("A-104");
    setSelectedGuestUnitId("A-101");
    setCleaningStarted(false);
    setCheckedItems([false, false, false, false]);
    setTakenPhotos([false, false, false]);
    setCleanerIssueSent(null);
    setTimerSec(0);
    setEFacturaSynced(false);
  };

  const totalRevenue = units.reduce((acc, u) => acc + u.revenueMonth, 0);
  const totalNet = units.reduce((acc, u) => acc + calcNetProfit(u), 0);
  const totalSqm = units.reduce((acc, u) => acc + u.sqm, 0);
  const marginPct = ((totalNet / totalRevenue) * 100).toFixed(1);

  const filteredUnits = units.filter((u) => {
    return statusFilter === "ALL" || u.status === statusFilter;
  });

  const t = TRANSLATIONS[cleanerLang];
  const allTasksDone = checkedItems.every(Boolean) && takenPhotos.every(Boolean);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans pb-20 md:pb-6">
      {/* ===================================================================== */}
      {/* DESKTOP TOP BAR (Csak számítógépen látszik)                           */}
      {/* ===================================================================== */}
      <div className="hidden md:block sticky top-0 z-50 bg-slate-900 text-white shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Building2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-wide">
                PropControl <span className="text-emerald-400">Enterprise</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Cluj-Napoca · Regim Hotelier Platform
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveRole("OWNER")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeRole === "OWNER" ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-300"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> 1. Nagyfőnök (BI)
            </button>
            <button
              onClick={() => setActiveRole("ADMIN")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeRole === "ADMIN" ? "bg-sky-500 text-slate-950" : "bg-slate-800 text-slate-300"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> 2. Admin (Operatív)
            </button>
            <button
              onClick={() => setActiveRole("CLEANER")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeRole === "CLEANER" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> 3. Takarító
              {dirtyUnits.length > 0 && (
                <span className="px-1.5 bg-rose-500 text-white rounded-full text-[10px]">
                  {dirtyUnits.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveRole("GUEST")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeRole === "GUEST" ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-300"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" /> 4. Vendég
            </button>
            <button
              onClick={handleResetDemo}
              className="flex items-center gap-1 text-xs bg-slate-800 text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-700 ml-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE COMPACT TOP HEADER (Csak mobilon látszik)                      */}
      {/* ===================================================================== */}
      <div className="md:hidden sticky top-0 z-40 bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-1 rounded-md">
            <Building2 className="w-4 h-4 text-slate-950" />
          </div>
          <span className="font-bold text-sm">
            PropControl <span className="text-emerald-400">Mobile</span>
          </span>
        </div>
        <button
          onClick={handleResetDemo}
          className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 1. NAGYFŐNÖK NÉZETE                                                   */}
      {/* ===================================================================== */}
      {activeRole === "OWNER" && (
        <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              Tulajdonosi BI & ROI
            </span>
            <h1 className="text-lg sm:text-2xl font-bold mt-1.5">
              Portfólió Teljesítmény – 2026. Nov
            </h1>
            <p className="text-xs text-slate-500">
              2 cégcsoport (SRL) · Összesített valós nettó profit
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div className="text-[11px] text-slate-500">Bruttó Bevétel</div>
              <div className="text-lg sm:text-2xl font-bold mt-1">
                {totalRevenue.toLocaleString("ro-RO")} RON
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">↑ +14,2%</div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border-2 border-emerald-500/40">
              <div className="text-[11px] text-slate-500">Nettó Profit</div>
              <div className="text-lg sm:text-2xl font-bold text-emerald-600 mt-1">
                {totalNet.toLocaleString("ro-RO")} RON
              </div>
              <div className="text-[11px] text-slate-600 mt-1">Árrés: {marginPct}%</div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div className="text-[11px] text-slate-500">Megtérülés / m²</div>
              <div className="text-lg sm:text-2xl font-bold mt-1">
                {Math.round(totalNet / totalSqm)} RON/m²
              </div>
              <div className="text-[11px] text-slate-500 mt-1">{totalSqm} m²</div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div className="text-[11px] text-slate-500">Építési Garancia</div>
              <div className="text-lg sm:text-2xl font-bold text-amber-600 mt-1">1 Aktív</div>
              <div className="text-[11px] text-slate-500 mt-1">B-205 (Alvállalkozó)</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 font-bold text-sm">
              Lakásonkénti Nettó Profitabilitás
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase">
                  <tr>
                    <th className="px-3 py-2.5">Lakás</th>
                    <th className="px-3 py-2.5 text-right">Bruttó</th>
                    <th className="px-3 py-2.5 text-right">Nettó</th>
                    <th className="px-3 py-2.5 text-right">RON/m²</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {units.map((u) => {
                    const net = calcNetProfit(u);
                    return (
                      <tr key={u.id}>
                        <td className="px-3 py-2.5 font-bold">{u.id}</td>
                        <td className="px-3 py-2.5 text-right">{u.revenueMonth.toLocaleString()}</td>
                        <td className="px-3 py-2.5 text-right font-bold text-emerald-600">
                          {net.toLocaleString()} RON
                        </td>
                        <td className="px-3 py-2.5 text-right">{Math.round(net / u.sqm)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. ADMIN NÉZETE                                                       */}
      {/* ===================================================================== */}
      {activeRole === "ADMIN" && (
        <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                Operatív Vezérlőpult
              </span>
              <h1 className="text-lg sm:text-2xl font-bold mt-1">Lakás-státusz Mátrix</h1>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { key: "ALL", label: `Összes (${units.length})` },
                { key: "READY", label: `Kész (${units.filter((u) => u.status === "READY").length})` },
                { key: "OCCUPIED", label: `Bent (${units.filter((u) => u.status === "OCCUPIED").length})` },
                { key: "DIRTY", label: `Piszkos (${units.filter((u) => u.status === "DIRTY").length})` },
                { key: "CLEANING", label: `Takarítás (${units.filter((u) => u.status === "CLEANING").length})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
                    statusFilter === tab.key ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredUnits.map((u) => {
              const badgeMap = {
                READY: { label: "KÉSZ", cls: "bg-emerald-100 text-emerald-800" },
                OCCUPIED: { label: "BENT", cls: "bg-sky-100 text-sky-800" },
                DIRTY: { label: "PISZKOS", cls: "bg-rose-100 text-rose-800" },
                CLEANING: { label: "TAKARÍTÁS", cls: "bg-amber-100 text-amber-800" },
                MAINTENANCE: { label: "SZERVIZ", cls: "bg-purple-100 text-purple-800" },
              };
              const b = badgeMap[u.status];
              return (
                <div
                  key={u.id}
                  className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${
                    u.justCheckedOut ? "border-rose-500" : "border-slate-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold">
                      Lakás {u.number} <span className="text-xs font-normal text-slate-400">({u.id})</span>
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${b.cls}`}>
                      {b.label}
                    </span>
                  </div>
                  <div className="mt-2 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Vendég:</span>
                      <span className="font-semibold">{u.guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">PIN:</span>
                      <span className="font-mono font-bold">
                        {u.pinCode} {u.pinActive ? "(AKTÍV)" : "(ZÁRVA)"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-slate-50 rounded-xl text-[11px] text-slate-600">
                    {u.note}
                  </div>
                  <div className="mt-2 pt-2 border-t flex justify-between items-center text-xs">
                    <span className="text-slate-400">Fotók: {u.photos.length}/3</span>
                    <button
                      onClick={() => setSelectedUnitModal(u)}
                      className="text-sky-600 font-bold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Adatlap
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-2">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" /> Élő Eseménynapló
            </h3>
            {logs.map((log) => (
              <div key={log.id} className="p-2 rounded-xl bg-slate-50 text-xs flex justify-between gap-2">
                <span className="text-slate-800">{log.text}</span>
                <span className="text-slate-400 font-mono shrink-0">{log.time}</span>
              </div>
            ))}
          </div>

          {selectedUnitModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-3 shadow-2xl">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-bold text-base">Lakás {selectedUnitModal.number}</h3>
                  <button onClick={() => setSelectedUnitModal(null)}>
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-xl">
                  <div><strong>Vendég:</strong> {selectedUnitModal.guestName}</div>
                  <div><strong>CNP:</strong> {selectedUnitModal.guestCnp}</div>
                  <div><strong>Lakcím:</strong> {selectedUnitModal.guestAddress}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. TAKARÍTÓNŐ MOBIL NÉZETE (Teljes szélességű, keret nélküli app)     */}
      {/* ===================================================================== */}
      {activeRole === "CLEANER" && (
        <div className="max-w-md mx-auto bg-slate-900 text-white min-h-[calc(100vh-105px)] flex flex-col">
          <div className="bg-emerald-600 p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-[11px] uppercase font-bold text-emerald-100">{t.subtitle}</div>
                <h2 className="text-lg font-bold text-white">{t.title}</h2>
              </div>
              <div className="flex gap-1 bg-emerald-700/80 p-1 rounded-lg">
                {["HU", "RO", "EN"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCleanerLang(lang)}
                    className={`px-2 py-1 rounded text-[11px] font-bold ${
                      cleanerLang === lang ? "bg-white text-emerald-900" : "text-emerald-100"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
              {units
                .filter((u) => ["DIRTY", "CLEANING", "READY"].includes(u.status))
                .map((u) => (
                  <button
                    key={u.id}
                    onClick={() => handleSelectCleanerUnit(u.id)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                      activeCleanerUnit.id === u.id
                        ? "bg-white text-emerald-950 shadow"
                        : "bg-emerald-700/70 text-white"
                    }`}
                  >
                    {u.id}
                    {u.status === "READY" && " ✓"}
                  </button>
                ))}
            </div>
          </div>

          <div className="p-4 flex-1 space-y-4">
            {activeCleanerUnit.justCheckedOut && activeCleanerUnit.status === "DIRTY" && (
              <div className="bg-rose-500/20 border border-rose-500 text-rose-200 p-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400 shrink-0" />
                {t.newFromCheckout}
              </div>
            )}

            <div className="bg-slate-800 rounded-2xl p-3.5 border border-slate-700">
              <div className="flex justify-between items-center">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeCleanerUnit.status === "READY"
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {activeCleanerUnit.status === "READY" ? t.readyBadge : t.urgent}
                </span>
                <span className="text-xs text-slate-300 font-semibold">
                  {activeCleanerUnit.nextCheckIn}
                </span>
              </div>
              <h3 className="text-lg font-bold mt-1.5">
                {activeCleanerUnit.building.split("·")[1]} · Lakás {activeCleanerUnit.number}
              </h3>
              <p className="text-xs text-slate-400">
                {activeCleanerUnit.type} · {activeCleanerUnit.guestCount}
              </p>
            </div>

            {activeCleanerUnit.status === "READY" ? (
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <div className="font-bold text-emerald-300 text-base">{t.completedMsg}</div>
              </div>
            ) : !cleaningStarted ? (
              <button
                onClick={handleStartCleaning}
                className="w-full py-4 bg-emerald-500 active:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl text-base shadow-lg flex items-center justify-center gap-2"
              >
                <KeyRound className="w-5 h-5" />
                {t.startBtn}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-amber-500/15 border border-amber-500/40 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <div className="text-[11px] text-amber-300">{t.pinLabel}</div>
                    <div className="text-xl font-mono font-bold text-amber-400">
                      {activeCleanerUnit.pinCode}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-slate-400">Időmérő</div>
                    <div className="font-mono font-bold text-sm text-white">
                      {formatTime(timerSec)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {t.tasks.map((taskText, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const copy = [...checkedItems];
                        copy[idx] = !copy[idx];
                        setCheckedItems(copy);
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs flex items-center gap-3 ${
                        checkedItems[idx]
                          ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-200 line-through"
                          : "bg-slate-800 border-slate-700 text-slate-200"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                          checkedItems[idx]
                            ? "bg-emerald-500 border-emerald-500 text-slate-950"
                            : "border-slate-500"
                        }`}
                      >
                        {checkedItems[idx] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span>{taskText}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {["Fürdő", "Ágy", "Konyha"].map((label, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const copy = [...takenPhotos];
                        copy[idx] = true;
                        setTakenPhotos(copy);
                      }}
                      className={`p-3 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 ${
                        takenPhotos[idx]
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                          : "bg-slate-800 border-slate-600 text-slate-400"
                      }`}
                    >
                      {takenPhotos[idx] ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Camera className="w-6 h-6" />
                      )}
                      <span className="text-[11px] font-bold">{label}</span>
                    </button>
                  ))}
                </div>

                <button
                  disabled={!allTasksDone}
                  onClick={handleCompleteCleaning}
                  className={`w-full py-3.5 rounded-2xl font-extrabold text-sm ${
                    allTasksDone
                      ? "bg-sky-500 text-slate-950 shadow-lg"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {t.finishBtn}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. VENDÉG MOBIL PORTÁL (Teljes szélességű, keret nélküli app)         */}
      {/* ===================================================================== */}
      {activeRole === "GUEST" && (
        <div className="max-w-md mx-auto bg-slate-50 min-h-[calc(100vh-105px)] flex flex-col">
          <div className="bg-indigo-600 text-white p-4">
            <div className="text-[11px] uppercase tracking-wider text-indigo-200 font-bold">
              Residence Park Cluj
            </div>
            <h2 className="text-lg font-bold">Vendég Portál · Digital Key</h2>

            <div className="mt-3">
              <label className="text-[10px] text-indigo-200 block mb-1">
                Válassz foglalást / lakást:
              </label>
              <select
                value={selectedGuestUnitId}
                onChange={(e) => setSelectedGuestUnitId(e.target.value)}
                className="w-full bg-indigo-700 text-white text-xs font-semibold px-3 py-2.5 rounded-xl border border-indigo-500 outline-none"
              >
                {guestSelectableUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.id} · {u.guestName.replace(/\s*\(.*?\)/g, "")} (
                    {u.status === "OCCUPIED"
                      ? "Bent tartózkodik"
                      : u.status === "READY"
                      ? "Check-inre vár"
                      : "Takarítás alatt"}
                    )
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 flex-1 space-y-4">
            {guestToast && (
              <div className="bg-emerald-600 text-white text-xs font-bold p-3 rounded-xl shadow flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{guestToast}</span>
              </div>
            )}

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  activeGuestUnit.status === "OCCUPIED"
                    ? "bg-sky-100 text-sky-800"
                    : activeGuestUnit.status === "READY"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {activeGuestUnit.status === "OCCUPIED"
                  ? "AKTÍV TARTÓZKODÁS"
                  : activeGuestUnit.status === "READY"
                  ? "ONLINE BEJELENTKEZÉS"
                  : "TAKARÍTÁS ALATT"}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1.5">
                {activeGuestUnit.building.split("·")[1]} · Lakás {activeGuestUnit.number}
              </h3>
              <div className="text-xs text-slate-500 mt-0.5">
                {activeGuestUnit.type} · {activeGuestUnit.stayDates}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" /> Str. Fabricii 105
                </span>
                <span className="flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-indigo-500" /> {activeGuestUnit.parkingSpot}
                </span>
              </div>
            </div>

            {activeGuestUnit.status === "OCCUPIED" ? (
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-md space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-emerald-100 flex items-center gap-1">
                    <Unlock className="w-4 h-4" /> Okoszár PIN Aktív
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                    {activeGuestUnit.checkedInAt || "15:14"}
                  </span>
                </div>
                <div className="text-center py-2 bg-black/20 rounded-xl">
                  <div className="text-3xl font-mono font-extrabold tracking-widest">
                    {activeGuestUnit.pinCode}
                  </div>
                </div>
                <div className="bg-white/15 rounded-xl p-2.5 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-emerald-200" />
                    <div>
                      <div className="font-bold">{activeGuestUnit.wifiSsid}</div>
                      <div className="text-[11px] text-emerald-100">
                        Jelszó: {activeGuestUnit.wifiPass}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCopiedWifi(true);
                      setTimeout(() => setCopiedWifi(false), 2000);
                    }}
                    className="bg-white text-emerald-900 font-bold px-2.5 py-1.5 rounded-lg text-[11px]"
                  >
                    {copiedWifi ? "Másolva ✓" : "Másolás"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-200/80 border border-slate-300 rounded-2xl p-3.5 flex items-center gap-3">
                <Lock className="w-5 h-5 text-slate-600 shrink-0" />
                <div className="text-xs text-slate-700">
                  <strong>Okoszár PIN zárolva:</strong> A Check-in után azonnal megjelenik a belépőkódod.
                </div>
              </div>
            )}

            {activeGuestUnit.status !== "OCCUPIED" ? (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
                <button
                  onClick={handleGuestOcrSimulate}
                  className="w-full py-2 px-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <ScanLine className="w-4 h-4" /> Okmány előtöltés (OCR)
                </button>
                <input
                  type="text"
                  value={guestForm.name}
                  onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                  placeholder="Teljes név"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold"
                />
                <input
                  type="text"
                  value={guestForm.cnp}
                  onChange={(e) => setGuestForm({ ...guestForm, cnp: e.target.value })}
                  placeholder="CNP / Útlevélszám"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-xs"
                />
                <button
                  disabled={activeGuestUnit.status !== "READY" || !guestForm.name}
                  onClick={handleGuestCheckIn}
                  className={`w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md ${
                    activeGuestUnit.status === "READY"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  {activeGuestUnit.status === "READY"
                    ? "BEJELENTKEZÉS (CHECK-IN)"
                    : "Várakozás a takarításra..."}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
                <button
                  onClick={handleGuestCheckOut}
                  className="w-full py-3.5 bg-rose-600 text-white font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <LogOut className="w-4 h-4" /> KIJELENTKEZÉS (CHECK-OUT)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MOBILE FIXED BOTTOM NAVIGATION BAR (Csak mobilon látszik)             */}
      {/* ===================================================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 px-2 py-1.5 grid grid-cols-4 gap-1 shadow-2xl">
        <button
          onClick={() => setActiveRole("OWNER")}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[10px] font-bold ${
            activeRole === "OWNER" ? "bg-amber-500 text-slate-950" : "text-slate-400"
          }`}
        >
          <TrendingUp className="w-4 h-4 mb-0.5" />
          Főnök
        </button>

        <button
          onClick={() => setActiveRole("ADMIN")}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[10px] font-bold ${
            activeRole === "ADMIN" ? "bg-sky-500 text-slate-950" : "text-slate-400"
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          Admin
        </button>

        <button
          onClick={() => setActiveRole("CLEANER")}
          className={`relative flex flex-col items-center justify-center py-1.5 rounded-xl text-[10px] font-bold ${
            activeRole === "CLEANER" ? "bg-emerald-500 text-slate-950" : "text-slate-400"
          }`}
        >
          <Smartphone className="w-4 h-4 mb-0.5" />
          Takarító
          {dirtyUnits.length > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] flex items-center justify-center">
              {dirtyUnits.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveRole("GUEST")}
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl text-[10px] font-bold ${
            activeRole === "GUEST" ? "bg-indigo-500 text-white" : "text-slate-400"
          }`}
        >
          <UserCheck className="w-4 h-4 mb-0.5" />
          Vendég
        </button>
      </div>
    </div>
  );
}
