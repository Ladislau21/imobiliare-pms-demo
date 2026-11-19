import React, { useState, useEffect } from 'react';
import {
  Building2,
  TrendingUp,
  Users,
  Sparkles,
  Wrench,
  CheckCircle2,
  Clock,
  AlertTriangle,
  KeyRound,
  Camera,
  FileText,
  Receipt,
  ShieldAlert,
  Crown,
  LayoutDashboard,
  Smartphone,
  ChevronRight,
  Check,
  X,
  Plus,
  Play,
  Square,
  Globe,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Lock,
  Unlock,
  PackageOpen,
  Search,
  Filter,
  SlidersHorizontal,
  UserCheck,
  Wifi,
  Car,
  Thermometer,
  Copy,
  LogOut,
  LogIn,
  ScanLine,
  Activity,
  RotateCcw,
  Download,
} from 'lucide-react';

// --- INITIAL REALISTIC ROMANIAN DEVELOPER DATA (CLUJ-NAPOCA) ---
// Statuses: 'CLEAN' (Zöld) | 'OCCUPIED' (Kék) | 'DIRTY' (Piros) | 'CLEANING' (Sárga) | 'MAINTENANCE' (Lila)
const INITIAL_APARTMENTS = [
  {
    id: 'A-101',
    building: 'Residence Park - A Épület',
    floor: 1,
    number: '101',
    type: 'Stúdió (38 m²)',
    sqm: 38,
    srl: 'Transilvania Stay SRL',
    status: 'CLEAN',
    nextGuest: 'Kovács Péter',
    guestCount: '2 felnőtt',
    stayDates: '2026.11.19 – 2026.11.22 (3 éj)',
    nextCheckIn: '15:00',
    checkedInAt: null,
    pinCode: '482910#',
    pinActive: false,
    formCompleted: false,
    wifiSsid: 'ResidencePark_A101_5G',
    wifiPass: 'ClujStay2026!',
    parkingSpot: 'P-14 (Mélygarázs -1)',
    cleaner: 'Elena M.',
    cleaningProgress: 100,
    cleaningDurationSec: 2340,
    revenueMonth: 9450,
    otaFee: 1418,
    cleaningCost: 720,
    utilities: 410,
    taxes: 680,
    photos: ['Fürdőszoba OK', 'Háló / Ágy OK', 'Konyha OK'],
    note: 'Tiszta, fertőtlenített lakás. Vendég online bejelentkezésére vár.',
    justCheckedOut: false,
  },
  {
    id: 'A-102',
    building: 'Residence Park - A Épület',
    floor: 1,
    number: '102',
    type: '2 szobás (54 m²)',
    sqm: 54,
    srl: 'Transilvania Stay SRL',
    status: 'OCCUPIED',
    nextGuest: 'Andrei Popescu',
    guestCount: '2 felnőtt + 1 gyerek',
    stayDates: '2026.11.17 – 2026.11.19 (2 éj)',
    nextCheckIn: '15:00',
    checkedInAt: '2026.11.17 15:12',
    pinCode: '739104#',
    pinActive: true,
    formCompleted: true,
    wifiSsid: 'ResidencePark_A102_5G',
    wifiPass: 'UrbanCluj88!',
    parkingSpot: 'P-19 (Mélygarázs -1)',
    cleaner: 'Elena M.',
    cleaningProgress: 0,
    cleaningDurationSec: 0,
    revenueMonth: 13200,
    otaFee: 1980,
    cleaningCost: 840,
    utilities: 590,
    taxes: 950,
    photos: [],
    note: 'Vendég jelenleg a lakásban tartózkodik. Távozás ma.',
    justCheckedOut: false,
  },
  {
    id: 'A-104',
    building: 'Residence Park - A Épület',
    floor: 1,
    number: '104',
    type: 'Stúdió (38 m²)',
    sqm: 38,
    srl: 'Transilvania Stay SRL',
    status: 'DIRTY',
    nextGuest: 'Szabó Eszter',
    guestCount: '2 felnőtt',
    stayDates: '2026.11.19 – 2026.11.21 (2 éj)',
    nextCheckIn: '15:00',
    checkedInAt: null,
    pinCode: '849215#',
    pinActive: false,
    formCompleted: true,
    wifiSsid: 'ResidencePark_A104_5G',
    wifiPass: 'Transilvania104!',
    parkingSpot: 'P-08 (Udvari beálló)',
    cleaner: 'Elena M.',
    cleaningProgress: 0,
    cleaningDurationSec: 0,
    revenueMonth: 9800,
    otaFee: 1470,
    cleaningCost: 720,
    utilities: 410,
    taxes: 705,
    photos: [],
    note: 'Előző vendég távozott! Takarításra vár 15:00-ig.',
    justCheckedOut: false,
  },
  {
    id: 'B-201',
    building: 'Residence Park - B Épület (Új)',
    floor: 2,
    number: '201',
    type: '2 szobás Penthouse (68 m²)',
    sqm: 68,
    srl: 'Cluj Urban Living SRL',
    status: 'CLEAN',
    nextGuest: 'Müller Thomas',
    guestCount: '2 felnőtt',
    stayDates: '2026.11.19 – 2026.11.24 (5 éj)',
    nextCheckIn: '15:00',
    checkedInAt: null,
    pinCode: '774109#',
    pinActive: false,
    formCompleted: false,
    wifiSsid: 'ResidencePark_B201_5G',
    wifiPass: 'Penthouse201!',
    parkingSpot: 'P-02 (VIP Fedett)',
    cleaner: 'Maria V.',
    cleaningProgress: 100,
    cleaningDurationSec: 3120,
    revenueMonth: 16800,
    otaFee: 1680,
    cleaningCost: 900,
    utilities: 680,
    taxes: 1210,
    photos: ['Fürdőszoba OK', 'Háló / Ágy OK', 'Konyha OK'],
    note: 'Direkt foglalás (0% OTA jutalék). Vendég check-inre vár.',
    justCheckedOut: false,
  },
  {
    id: 'B-205',
    building: 'Residence Park - B Épület (Új)',
    floor: 2,
    number: '205',
    type: '2 szobás (54 m²)',
    sqm: 54,
    srl: 'Cluj Urban Living SRL',
    status: 'MAINTENANCE',
    nextGuest: 'Zárolva (Garancia)',
    guestCount: '-',
    stayDates: '-',
    nextCheckIn: '-',
    checkedInAt: null,
    pinCode: '000000#',
    pinActive: false,
    formCompleted: false,
    wifiSsid: 'ResidencePark_B205_5G',
    wifiPass: 'Service205',
    parkingSpot: 'P-22',
    cleaner: '-',
    cleaningProgress: 0,
    cleaningDurationSec: 0,
    revenueMonth: 10400,
    otaFee: 1560,
    cleaningCost: 650,
    utilities: 540,
    taxes: 750,
    photos: [],
    note: 'Építési garancia: Zuhanykabin szilikonozás & csaptelep csere (AquaFix).',
    justCheckedOut: false,
  },
  {
    id: 'B-302',
    building: 'Residence Park - B Épület (Új)',
    floor: 3,
    number: '302',
    type: '3 szobás VIP (82 m²)',
    sqm: 82,
    srl: 'Cluj Urban Living SRL',
    status: 'CLEANING',
    nextGuest: 'Ioana Radu',
    guestCount: '4 felnőtt',
    stayDates: '2026.11.19 – 2026.11.23 (4 éj)',
    nextCheckIn: '16:00',
    checkedInAt: null,
    pinCode: '620488#',
    pinActive: false,
    formCompleted: true,
    wifiSsid: 'ResidencePark_B302_5G',
    wifiPass: 'VipSuite302!',
    parkingSpot: 'P-01 (VIP Fedett)',
    cleaner: 'Elena M.',
    cleaningProgress: 45,
    cleaningDurationSec: 1420,
    revenueMonth: 21500,
    otaFee: 3225,
    cleaningCost: 1150,
    utilities: 890,
    taxes: 1550,
    photos: ['Fürdőszoba OK'],
    note: 'Elena M. jelenleg takarítja (45% kész).',
    justCheckedOut: false,
  },
];

const INITIAL_ACTIVITY_LOG = [
  {
    id: 'LOG-1',
    time: '14:28',
    actor: 'Takarító (Maria V.)',
    apt: 'B-201',
    action: 'Takarítás befejezve + 3 fotó feltöltve → Státusz: KÉSZ (Zöld)',
    type: 'cleaner',
  },
  {
    id: 'LOG-2',
    time: '14:15',
    actor: 'Rendszer (ANAF SPV)',
    apt: 'A-101',
    action: 'Előlegszámla e-Factura XML automatikusan validálva',
    type: 'system',
  },
  {
    id: 'LOG-3',
    time: '13:50',
    actor: 'Takarító (Elena M.)',
    apt: 'B-302',
    action: 'Takarítás elindítva (Staff PIN: 9942# aktiválva)',
    type: 'cleaner',
  },
];

const INITIAL_ISSUES = [
  {
    id: 'ISS-1',
    apt: 'B-205',
    category: 'Építési garancia',
    title: 'Zuhanykabin tömítés szivárog',
    assignee: 'AquaFix Kft. (Alvállalkozó)',
    cost: '0 RON (Garanciális)',
    status: 'Folyamatban',
  },
  {
    id: 'ISS-2',
    apt: 'A-104',
    category: 'Vendégkár',
    title: 'Törött borospohár készlet (2 db)',
    assignee: 'Kaucióból levonva',
    cost: '85 RON (Terhelve)',
    status: 'Lezárva',
  },
  {
    id: 'ISS-3',
    apt: 'B-201',
    category: 'Építési garancia',
    title: 'Erkélyajtó vasalat beállítás',
    assignee: 'ThermoGlass Szerviz',
    cost: '0 RON (Garanciális)',
    status: 'Ütemezve',
  },
];

// --- TRANSLATIONS FOR CLEANER MOBILE PWA ---
const PWA_TEXT = {
  HU: {
    greeting: 'Szia, Elena! 👋',
    subtitle: 'Mai feladataid • Residence Park',
    urgentBadge: 'TAKARÍTÁSRA VÁR • ÉRKEZÉS:',
    justLeftBadge: 'VENDÉG MOST TÁVOZOTT!',
    cleaningBadge: 'FOLYAMATBAN',
    readyBadge: 'ELKÉSZÜLT',
    noTasks: 'Minden lakás tiszta és kész! 🎉',
    noTasksHint:
      'Ha egy vendég kijelentkezik a 4. fülön, a lakás azonnal megjelenik itt.',
    startBtn: 'TAKARÍTÁS INDÍTÁSA (OKOSZÁR NYITÁS)',
    pinLabel: 'Ideiglenes takarítói PIN-kód:',
    checklistTitle: '1. Kötelező ellenőrzőlista',
    tasks: [
      'Ágynemű csere és feszes ágyazás',
      'Fürdőszoba fertőtlenítés + 3 törölköző bekészítés',
      'Konyhapult, hűtő ellenőrzés + 2 kávékapszula',
      'Padló porszívózás és felmosás',
    ],
    photosTitle: '2. Kötelező fotók (Élő kamera)',
    photoLabels: ['Fürdőszoba', 'Háló / Ágy', 'Konyha'],
    reportIssue: 'Hiba / Kár jelentése',
    reportStock: 'Fogyóeszköz fogyott',
    finishBtn: 'KÉSZ VAGYOK (KIJELENTKEZÉS)',
    finishHint: 'A befejezéshez pipáld ki a listát és készítsd el a 3 fotót!',
    issueSent: 'Jelentés elküldve az Adminnak!',
    completedMsg:
      'Lakás készre jelentve! Az Admin és a Vendég felületen is azonnal zöldre váltott.',
  },
  RO: {
    greeting: 'Bună, Elena! 👋',
    subtitle: 'Sarcinile de azi • Residence Park',
    urgentBadge: 'DE CURĂȚAT • SOSIRE:',
    justLeftBadge: 'OASPETELE A PLECAT ACUM!',
    cleaningBadge: 'ÎN CURS',
    readyBadge: 'FINALIZAT',
    noTasks: 'Toate apartamentele sunt curate! 🎉',
    noTasksHint:
      'Când un oaspete face Check-out în tab-ul 4, apartamentul apare imediat aici.',
    startBtn: 'ÎNCEPE CURĂȚENIA (DESCHIDE YALA)',
    pinLabel: 'Cod PIN temporar curățenie:',
    checklistTitle: '1. Listă de verificare obligatorie',
    tasks: [
      'Schimbare lenjerie pat și aranjare',
      'Dezinfectare baie + 3 prosoape curate',
      'Verificare bucătărie, frigider + 2 capsule cafea',
      'Aspirare și spălare pardoseală',
    ],
    photosTitle: '2. Fotografii obligatorii (Cameră live)',
    photoLabels: ['Baie', 'Dormitor / Pat', 'Bucătărie'],
    reportIssue: 'Raportează defecțiune',
    reportStock: 'Lipsă consumabile',
    finishBtn: 'AM TERMINAT (CHECK-OUT)',
    finishHint: 'Bifează lista și încarcă cele 3 poze pentru a finaliza!',
    issueSent: 'Raport trimis către Admin!',
    completedMsg:
      'Apartament marcat ca GATA! Status actualizat în panoul Admin.',
  },
  EN: {
    greeting: 'Hi, Elena! 👋',
    subtitle: "Today's Tasks • Residence Park",
    urgentBadge: 'NEEDS CLEANING • ARRIVAL:',
    justLeftBadge: 'GUEST JUST CHECKED OUT!',
    cleaningBadge: 'IN PROGRESS',
    readyBadge: 'COMPLETED',
    noTasks: 'All apartments are clean & ready! 🎉',
    noTasksHint:
      'When a guest checks out in Tab 4, the apartment immediately appears here.',
    startBtn: 'START CLEANING (UNLOCK SMART LOCK)',
    pinLabel: 'Temporary Staff PIN Code:',
    checklistTitle: '1. Mandatory Checklist',
    tasks: [
      'Change bed linen & make bed',
      'Sanitize bathroom + place 3 fresh towels',
      'Check kitchen, fridge + 2 coffee capsules',
      'Vacuum and mop all floors',
    ],
    photosTitle: '2. Mandatory Photos (Live Camera)',
    photoLabels: ['Bathroom', 'Bedroom / Bed', 'Kitchen'],
    reportIssue: 'Report Damage / Issue',
    reportStock: 'Low Consumables',
    finishBtn: 'FINISH & CHECK OUT',
    finishHint: 'Complete checklist and take all 3 photos to finish!',
    issueSent: 'Report sent to Operations Admin!',
    completedMsg:
      'Apartment marked READY! Live status updated in Admin & Guest views.',
  },
};

// --- TRANSLATIONS FOR GUEST MOBILE PORTAL ---
const GUEST_TEXT = {
  HU: {
    portalTitle: 'Vendég Portál • Digital Key',
    selectApt: 'Válassz foglalást / lakást:',
    preCheckInBadge: 'ÉRKEZÉS ELŐTT • ONLINE BEJELENTKEZÉS',
    occupiedBadge: 'AKTÍV TARTÓZKODÁS • BENT TARTÓZKODIK',
    checkedOutBadge: 'KIJELENTKEZVE • KÖSZÖNJÜK!',
    dirtyWaitBadge: 'TAKARÍTÁS ALATT • HAMAROSAN KÉSZ',
    formTitle: 'Törvényes Szállásadói Adatlap (Fișă de cazare)',
    ocrBtn: 'Okmány előtöltés szimuláció (OCR)',
    fullName: 'Teljes név (személyi szerint)',
    docNumber: 'CNP / Útlevélszám',
    address: 'Lakcím (Város, Ország)',
    acceptRules: 'Elfogadom a házirendet és az adatkezelési tájékoztatót.',
    lockedPinTitle: 'Okoszár PIN-kód zárolva',
    lockedPinSub:
      'A bejelentkezés (Check-in) után azonnal megjelenik a 6 jegyű belépőkódod.',
    checkInBtn: 'BEJELENTKEZÉS (CHECK-IN)',
    pinCardTitle: 'Személyes Okoszár PIN-kódod',
    pinActiveLabel: 'AKTÍV • Érvényes a kijelentkezésig',
    unlockDoorBtn: 'AJTÓ NYITÁSA MOST (SMART LOCK)',
    doorUnlockedMsg: 'Ajtó nyitva! (5 mp múlva visszazár)',
    copyBtn: 'Másolás',
    infoTitle: 'Lakás információk & Wi-Fi',
    parkingLabel: 'Parkolóhely:',
    thermostatLabel: 'Fűtés / Klíma:',
    thermostatVal: '22.5°C (Automata okostermosztát)',
    reportBtn: 'Probléma / Kérés jelzése',
    lateCheckoutBtn: 'Late Check-out (+100 RON)',
    checkOutBtn: 'KIJELENTKEZÉS (CHECK-OUT)',
    checkOutSub:
      'Kijelentkezéskor a PIN-kódod lejár, a takarító csapat pedig azonnal értesítést kap.',
    thankYouTitle: 'Sikeres kijelentkezés! 👋',
    thankYouSub:
      'A digitális kulcsod (PIN) biztonsági okokból inaktiválva lett. A lakás átkerült a takarítónő mai listájára.',
    downloadInvoice: 'ANAF e-Factura letöltése (PDF)',
    newBookingSimBtn: 'Új vendég foglalás szimulálása erre a lakásra',
    dirtyNoticeTitle: 'A lakás jelenleg előkészítés alatt áll',
    dirtyNoticeSub:
      'Amint a takarító végzett a 3. fülön, itt azonnal megnyílik a Check-in!',
  },
  RO: {
    portalTitle: 'Portal Oaspeți • Cheie Digitală',
    selectApt: 'Selectează rezervarea / apartamentul:',
    preCheckInBadge: 'ÎNAINTE DE SOSIRE • CHECK-IN ONLINE',
    occupiedBadge: 'SEJUR ACTIV • ÎN APARTAMENT',
    checkedOutBadge: 'CHECK-OUT FINALIZAT • MULȚUMIM!',
    dirtyWaitBadge: 'ÎN CURĂȚENIE • DISPONIBIL ÎN CURÂND',
    formTitle: 'Fișă de anunțare a sosirii și plecării',
    ocrBtn: 'Simulare scanare CI / Pașaport (OCR)',
    fullName: 'Nume și prenume',
    docNumber: 'CNP / Serie Pașaport',
    address: 'Domiciliu (Oraș, Țară)',
    acceptRules: 'Accept regulamentul intern și politica GDPR.',
    lockedPinTitle: 'Codul PIN este blocat',
    lockedPinSub: 'După apăsarea butonului Check-in vei primi codul de acces.',
    checkInBtn: 'CHECK-IN (INTRARE ÎN APARTAMENT)',
    pinCardTitle: 'Codul tău PIN Smart Lock',
    pinActiveLabel: 'ACTIV • Valabil până la Check-out',
    unlockDoorBtn: 'DESCHIDE UȘA ACUM (SMART LOCK)',
    doorUnlockedMsg: 'Ușă descuiată! (Se blochează în 5 sec)',
    copyBtn: 'Copiază',
    infoTitle: 'Informații Apartament & Wi-Fi',
    parkingLabel: 'Loc de parcare:',
    thermostatLabel: 'Termostat:',
    thermostatVal: '22.5°C (Mod automat)',
    reportBtn: 'Raportează o problemă',
    lateCheckoutBtn: 'Late Check-out (+100 RON)',
    checkOutBtn: 'CHECK-OUT (ELIBERARE APARTAMENT)',
    checkOutSub:
      'La Check-out codul PIN se dezactivează, iar echipa de curățenie este notificată.',
    thankYouTitle: 'Check-out realizat cu succes! 👋',
    thankYouSub:
      'Codul PIN a fost dezactivat. Apartamentul a fost trimis automat la curățenie.',
    downloadInvoice: 'Descarcă ANAF e-Factura (PDF)',
    newBookingSimBtn: 'Simulează o rezervare nouă pe acest apartament',
    dirtyNoticeTitle: 'Apartamentul este în curs de pregătire',
    dirtyNoticeSub:
      'După finalizarea curățeniei în tab-ul 3, poți face Check-in aici!',
  },
  EN: {
    portalTitle: 'Guest Portal • Digital Key',
    selectApt: 'Select reservation / apartment:',
    preCheckInBadge: 'PRE-ARRIVAL • ONLINE CHECK-IN',
    occupiedBadge: 'ACTIVE STAY • CHECKED IN',
    checkedOutBadge: 'CHECKED OUT • THANK YOU!',
    dirtyWaitBadge: 'BEING CLEANED • READY SOON',
    formTitle: 'Legal Guest Registration Form (Fișă de cazare)',
    ocrBtn: 'Simulate ID / Passport Auto-Fill (OCR)',
    fullName: 'Full Name (as on ID)',
    docNumber: 'National ID (CNP) / Passport No.',
    address: 'Home Address (City, Country)',
    acceptRules: 'I accept the house rules and GDPR privacy policy.',
    lockedPinTitle: 'Smart Lock PIN is Locked',
    lockedPinSub:
      'Complete Check-in below to unlock your 6-digit door access PIN.',
    checkInBtn: 'CHECK IN NOW',
    pinCardTitle: 'Your Personal Smart Lock PIN',
    pinActiveLabel: 'ACTIVE • Valid until Check-out',
    unlockDoorBtn: 'UNLOCK DOOR NOW (SMART LOCK)',
    doorUnlockedMsg: 'Door Unlocked! (Auto-locks in 5s)',
    copyBtn: 'Copy',
    infoTitle: 'Apartment Info & Wi-Fi',
    parkingLabel: 'Parking Spot:',
    thermostatLabel: 'Climate / Heating:',
    thermostatVal: '22.5°C (Smart Thermostat)',
    reportBtn: 'Report Issue / Request',
    lateCheckoutBtn: 'Late Check-out (+100 RON)',
    checkOutBtn: 'CHECK OUT NOW',
    checkOutSub:
      'Checking out revokes your door PIN and immediately notifies housekeeping.',
    thankYouTitle: 'Checked Out Successfully! 👋',
    thankYouSub:
      'Your Smart Lock PIN has been revoked. Housekeeping has been automatically dispatched.',
    downloadInvoice: 'Download ANAF e-Factura (PDF)',
    newBookingSimBtn: 'Simulate New Incoming Booking for this Apartment',
    dirtyNoticeTitle: 'Apartment is currently being prepared',
    dirtyNoticeSub:
      'Once the cleaner finishes in Tab 3, Check-in will unlock here!',
  },
};

export default function App() {
  // Active Role: 'owner' | 'admin' | 'cleaner' | 'guest'
  const [role, setRole] = useState('guest');
  const [apartments, setApartments] = useState(INITIAL_APARTMENTS);
  const [activityLog, setActivityLog] = useState(INITIAL_ACTIVITY_LOG);
  const [issues, setIssues] = useState(INITIAL_ISSUES);
  const [toast, setToast] = useState(null);

  // Admin sub-navigation & filters
  const [adminTab, setAdminTab] = useState('matrix'); // 'matrix' | 'guests' | 'finance'
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApt, setSelectedApt] = useState(null);
  const [sharedUtilityBill, setSharedUtilityBill] = useState(3200);

  // Cleaner PWA states
  const [pwaLang, setPwaLang] = useState('HU');
  const [activeCleaningAptId, setActiveCleaningAptId] = useState('A-104');
  const [cleaningStarted, setCleaningStarted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [checkedTasks, setCheckedTasks] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [uploadedPhotos, setUploadedPhotos] = useState([false, false, false]);
  const [showIssueDrawer, setShowIssueDrawer] = useState(false);
  const [issueText, setIssueText] = useState('');
  const [issueType, setIssueType] = useState('Építési garancia');

  // Guest Mobile Portal states
  const [guestLang, setGuestLang] = useState('HU');
  const [guestAptId, setGuestAptId] = useState('A-101');
  const [guestNameInput, setGuestNameInput] = useState('Kovács Péter');
  const [guestDocInput, setGuestDocInput] = useState('');
  const [guestAddressInput, setGuestAddressInput] = useState('');
  const [guestRulesAccepted, setGuestRulesAccepted] = useState(true);
  const [doorUnlockedPulse, setDoorUnlockedPulse] = useState(false);
  const [justCheckedOutAptIds, setJustCheckedOutAptIds] = useState({});
  const [showGuestIssueModal, setShowGuestIssueModal] = useState(false);
  const [guestRequestText, setGuestRequestText] = useState('');

  // Helper notification & live activity logger
  const triggerToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3800);
  };

  const appendLog = (actor, apt, action, type) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;
    setActivityLog((prev) => [
      {
        id: `LOG-${Date.now()}`,
        time: timeStr,
        actor,
        apt,
        action,
        type,
      },
      ...prev.slice(0, 14),
    ]);
  };

  // Reset full demo state
  const handleResetDemo = () => {
    setApartments(INITIAL_APARTMENTS);
    setActivityLog(INITIAL_ACTIVITY_LOG);
    setIssues(INITIAL_ISSUES);
    setCleaningStarted(false);
    setCheckedTasks([false, false, false, false]);
    setUploadedPhotos([false, false, false]);
    setElapsedSeconds(0);
    setJustCheckedOutAptIds({});
    setGuestAptId('A-101');
    setActiveCleaningAptId('A-104');
    triggerToast('Teljes demó állapot alaphelyzetbe állítva!');
  };

  // Live timer for cleaner PWA
  useEffect(() => {
    let interval = null;
    if (cleaningStarted) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cleaningStarted]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const remSec = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(remSec).padStart(
      2,
      '0'
    )}`;
  };

  // Portfolio Financial Calculations
  const totalSqm = apartments.reduce((acc, a) => acc + a.sqm, 0);
  const totalGrossRevenue = apartments.reduce(
    (acc, a) => acc + a.revenueMonth,
    0
  );
  const totalCosts = apartments.reduce(
    (acc, a) => acc + a.otaFee + a.cleaningCost + a.utilities + a.taxes,
    0
  );
  const totalNetProfit = totalGrossRevenue - totalCosts;
  const profitMargin = ((totalNetProfit / totalGrossRevenue) * 100).toFixed(1);

  // --- GUEST CHECK-IN / CHECK-OUT HANDLERS ---
  const currentGuestApt =
    apartments.find((a) => a.id === guestAptId) || apartments[0];

  const handleSelectGuestApt = (newId) => {
    setGuestAptId(newId);
    const target = apartments.find((a) => a.id === newId);
    if (target) {
      setGuestNameInput(
        target.nextGuest !== 'Zárolva (Garancia)'
          ? target.nextGuest
          : 'Németh Gábor'
      );
      setGuestDocInput('');
      setGuestAddressInput('');
    }
  };

  const handleSimulateOcr = () => {
    setGuestDocInput('1890512125849 • KX 849201');
    setGuestAddressInput('400001 Cluj-Napoca, Str. Memorandumului nr. 12');
    triggerToast('Személyi igazolvány (OCR) adatok automatikusan beolvasva!');
  };

  const handleGuestCheckIn = () => {
    if (!guestNameInput.trim() || !guestDocInput.trim()) {
      triggerToast(
        'Kérlek töltsd ki a nevet és az okmányszámot (vagy használd az OCR gombot)!',
        'warn'
      );
      return;
    }
    const now = new Date();
    const stamp = `Ma ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    setApartments((prev) =>
      prev.map((apt) =>
        apt.id === guestAptId
          ? {
              ...apt,
              status: 'OCCUPIED',
              nextGuest: guestNameInput,
              checkedInAt: stamp,
              pinActive: true,
              formCompleted: true,
              justCheckedOut: false,
              note: `Vendég bejelentkezett (${stamp}). Okoszár PIN aktív.`,
            }
          : apt
      )
    );

    setJustCheckedOutAptIds((prev) => ({ ...prev, [guestAptId]: false }));
    appendLog(
      `Vendég (${guestNameInput})`,
      guestAptId,
      `Online Check-in kész → Okoszár PIN (${currentGuestApt.pinCode}) aktiválva`,
      'guest-in'
    );
    triggerToast(
      `Sikeres Check-in! Az okoszár PIN (${currentGuestApt.pinCode}) aktív.`
    );
  };

  const handleGuestCheckOut = () => {
    const departingGuest = currentGuestApt.nextGuest;
    setApartments((prev) =>
      prev.map((apt) =>
        apt.id === guestAptId
          ? {
              ...apt,
              status: 'DIRTY',
              pinActive: false,
              cleaningProgress: 0,
              photos: [],
              justCheckedOut: true,
              note: `Vendég (${departingGuest}) kijelentkezett! Azonnali takarításra vár.`,
            }
          : apt
      )
    );

    setJustCheckedOutAptIds((prev) => ({ ...prev, [guestAptId]: true }));
    // Automatically select this apartment in the Cleaner PWA so the user can test the next step seamlessly
    setActiveCleaningAptId(guestAptId);
    setCleaningStarted(false);
    setCheckedTasks([false, false, false, false]);
    setUploadedPhotos([false, false, false]);
    setElapsedSeconds(0);

    appendLog(
      `Vendég (${departingGuest})`,
      guestAptId,
      'Check-out megtörtént → PIN lezárva, lakás átadva a Takarítónőnek (Piros)',
      'guest-out'
    );
    triggerToast(
      `Kijelentkezés rögzítve! ${guestAptId} azonnal megjelent a Takarítónő listájában.`
    );
  };

  const handleSimulateNewBookingForApt = () => {
    setJustCheckedOutAptIds((prev) => ({ ...prev, [guestAptId]: false }));
    setGuestNameInput('Varga Dániel');
    setGuestDocInput('');
    setGuestAddressInput('');
    setApartments((prev) =>
      prev.map((apt) =>
        apt.id === guestAptId
          ? {
              ...apt,
              nextGuest: 'Varga Dániel',
              formCompleted: false,
              pinCode: `${Math.floor(100000 + Math.random() * 900000)}#`,
              revenueMonth: apt.revenueMonth + 680,
            }
          : apt
      )
    );
    triggerToast(
      'Új foglalás szimulálva (+680 RON bevétel)! Most tesztelheted újra a Check-int.'
    );
  };

  const handleGuestSendRequest = () => {
    if (!guestRequestText.trim()) return;
    const newIssue = {
      id: `ISS-${issues.length + 1}`,
      apt: guestAptId,
      category: 'Vendég kérés',
      title: guestRequestText,
      assignee: 'Operatív Admin',
      cost: '0 RON',
      status: 'Nyitott',
    };
    setIssues([newIssue, ...issues]);
    appendLog(
      `Vendég (${currentGuestApt.nextGuest})`,
      guestAptId,
      `Kérés / jelzés beküldve: "${guestRequestText}"`,
      'guest-in'
    );
    setGuestRequestText('');
    setShowGuestIssueModal(false);
    triggerToast('Üzenet elküldve a recepciónak / adminnak!');
  };

  // --- CLEANER WORKFLOW HANDLERS ---
  const dirtyOrCleaningApartments = apartments.filter(
    (a) => a.status === 'DIRTY' || a.status === 'CLEANING'
  );

  const currentPwaApt =
    apartments.find((a) => a.id === activeCleaningAptId) ||
    dirtyOrCleaningApartments[0] ||
    apartments[0];

  const handleStartCleaning = () => {
    setCleaningStarted(true);
    setApartments((prev) =>
      prev.map((apt) =>
        apt.id === currentPwaApt.id
          ? {
              ...apt,
              status: 'CLEANING',
              cleaningProgress: 15,
              justCheckedOut: false,
            }
          : apt
      )
    );
    appendLog(
      'Takarító (Elena M.)',
      currentPwaApt.id,
      'Takarítás elindítva (Staff PIN aktiválva)',
      'cleaner'
    );
    triggerToast('Okoszár PIN generálva (9942#). Időmérés elindult!');
  };

  const toggleChecklist = (idx) => {
    const updated = [...checkedTasks];
    updated[idx] = !updated[idx];
    setCheckedTasks(updated);
    const progress = Math.round(
      ((updated.filter(Boolean).length +
        uploadedPhotos.filter(Boolean).length) /
        7) *
        100
    );
    setApartments((prev) =>
      prev.map((apt) =>
        apt.id === currentPwaApt.id
          ? { ...apt, cleaningProgress: progress }
          : apt
      )
    );
  };

  const simulateTakePhoto = (idx) => {
    const updated = [...uploadedPhotos];
    updated[idx] = true;
    setUploadedPhotos(updated);
    const progress = Math.round(
      ((checkedTasks.filter(Boolean).length + updated.filter(Boolean).length) /
        7) *
        100
    );
    setApartments((prev) =>
      prev.map((apt) =>
        apt.id === currentPwaApt.id
          ? { ...apt, cleaningProgress: progress }
          : apt
      )
    );
    triggerToast(
      `${PWA_TEXT[pwaLang].photoLabels[idx]} fotó tömörítve és feltöltve!`
    );
  };

  const handleFinishCleaning = () => {
    const finishedId = currentPwaApt.id;
    setCleaningStarted(false);
    setApartments((prev) =>
      prev.map((apt) =>
        apt.id === finishedId
          ? {
              ...apt,
              status: 'CLEAN',
              cleaningProgress: 100,
              cleaningDurationSec: elapsedSeconds > 0 ? elapsedSeconds : 2460,
              photos: ['Fürdőszoba OK', 'Háló / Ágy OK', 'Konyha OK'],
              justCheckedOut: false,
              note: 'Frissen takarítva és ellenőrizve (3/3 fotó). Vendég Check-inre kész!',
            }
          : apt
      )
    );

    appendLog(
      'Takarító (Elena M.)',
      finishedId,
      'Takarítás kész + 3 fotó auditálva → Státusz: KÉSZ (Zöld)',
      'cleaner'
    );
    triggerToast(PWA_TEXT[pwaLang].completedMsg);

    // Automatically point Guest portal to this newly cleaned apartment for easy testing
    setGuestAptId(finishedId);
    setJustCheckedOutAptIds((prev) => ({ ...prev, [finishedId]: false }));

    const nextDirty = apartments.find(
      (a) =>
        a.id !== finishedId && (a.status === 'DIRTY' || a.status === 'CLEANING')
    );
    if (nextDirty) {
      setActiveCleaningAptId(nextDirty.id);
      setCheckedTasks([false, false, false, false]);
      setUploadedPhotos([false, false, false]);
      setElapsedSeconds(0);
    }
  };

  const handleSubmitIssue = () => {
    if (!issueText.trim()) return;
    const newIssue = {
      id: `ISS-${issues.length + 1}`,
      apt: currentPwaApt.id,
      category: issueType,
      title: issueText,
      assignee:
        issueType === 'Építési garancia'
          ? 'Generálkivitelező Garancia'
          : 'Operatív Karbantartó',
      cost:
        issueType === 'Építési garancia'
          ? '0 RON (Garanciális)'
          : 'Felmérés alatt',
      status: 'Új bejelentés',
    };
    setIssues([newIssue, ...issues]);
    appendLog(
      'Takarító (Elena M.)',
      currentPwaApt.id,
      `Hibajegy rögzítve (${issueType}): ${issueText}`,
      'cleaner'
    );
    setIssueText('');
    setShowIssueDrawer(false);
    triggerToast(PWA_TEXT[pwaLang].issueSent);
  };

  const isCleanerReadyToFinish =
    cleaningStarted &&
    checkedTasks.every(Boolean) &&
    uploadedPhotos.every(Boolean);

  const t = PWA_TEXT[pwaLang];
  const gt = GUEST_TEXT[guestLang];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      {/* --- TOP ROLE SWITCHER HEADER --- */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col lg:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center justify-between w-full lg:w-auto gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-slate-950 shadow-md shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-tight text-sm sm:text-base">
                    PropControl{' '}
                    <span className="text-emerald-400">Enterprise</span>
                  </span>
                  <span className="hidden xl:inline-block text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Cluj-Napoca • Regim Hotelier OS
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Élő körforgás: Vendég Check-in (Kék) → Check-out (Piros) →
                  Takarító kész (Zöld)
                </p>
              </div>
            </div>

            <button
              onClick={handleResetDemo}
              title="Alaphelyzetbe állítás"
              className="lg:hidden px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* 4 Role Toggle Pills + Reset */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="grid grid-cols-2 sm:flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 w-full lg:w-auto gap-1">
              <button
                onClick={() => setRole('owner')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all justify-center ${
                  role === 'owner'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Crown className="w-3.5 h-3.5 shrink-0" />
                <span>1. Nagyfőnök (BI)</span>
              </button>

              <button
                onClick={() => setRole('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all justify-center ${
                  role === 'admin'
                    ? 'bg-sky-500 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                <span>2. Admin (Operatív)</span>
              </button>

              <button
                onClick={() => setRole('cleaner')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all justify-center relative ${
                  role === 'cleaner'
                    ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 shrink-0" />
                <span>3. Takarítónő (Mobil)</span>
                {dirtyOrCleaningApartments.length > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-extrabold rounded-full bg-rose-600 text-white">
                    {dirtyOrCleaningApartments.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setRole('guest')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all justify-center ${
                  role === 'guest'
                    ? 'bg-indigo-400 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 shrink-0" />
                <span>4. Vendég (Mobil)</span>
              </button>
            </div>

            <button
              onClick={handleResetDemo}
              title="Alaphelyzetbe állítás"
              className="hidden lg:flex px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs items-center gap-1.5 border border-slate-700 shrink-0 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toast.msg}</span>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 1: NAGYFŐNÖK (EXECUTIVE BI & DEVELOPER PORTFOLIO ROI)            */}
      {/* ===================================================================== */}
      {role === 'owner' && (
        <main className="max-w-7xl mx-auto w-full px-4 py-6 space-y-6">
          {/* Executive Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-emerald-100 text-emerald-800">
                  Tulajdonosi & Fejlesztői Vezérlőpult
                </span>
                <span className="text-xs text-slate-400">
                  2026. November • Élő P&L
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Residence Park Cluj – Portfólió Megtérülés
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-500 block">
                  Aktív cégek (Multi-SRL)
                </span>
                <span className="font-semibold text-slate-800">
                  2 SRL (65 lakás összesen)
                </span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <span className="text-emerald-700 block">
                  Új átadás alatt (C Épület)
                </span>
                <span className="font-semibold text-emerald-900">
                  +40 lakás (Sablon kész)
                </span>
              </div>
            </div>
          </div>

          {/* 4 Main Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>HAVI BRUTTÓ BEVÉTEL</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  {totalGrossRevenue.toLocaleString()} RON
                </span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                ~{Math.round(totalGrossRevenue / 4.97).toLocaleString()} EUR •
                Minta 6 kiemelt egység
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>VALÓDI NETTÓ PROFIT</span>
                <Crown className="w-4 h-4 text-amber-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-600">
                  {totalNetProfit.toLocaleString()} RON
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {profitMargin}% árrés
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Minden jutalék, rezsi, takarítás és adó levonva
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>ÁTLAGOS FOGLALTSÁG & ADR</span>
                <Building2 className="w-4 h-4 text-sky-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-slate-900">84.6%</span>
                <span className="text-sm font-semibold text-slate-600">
                  ADR: 345 RON/éj
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                RevPAR: 292 RON • Direkt foglalás arány: 28%
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
                <span>GARANCIA VS. VENDÉGKÁR</span>
                <ShieldAlert className="w-4 h-4 text-rose-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  2 garanciális
                </span>
                <span className="text-xs font-semibold text-amber-600">
                  0 RON saját kár
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Alvállalkozókra terhelve • Vendégkár kaucióból fedezve
              </p>
            </div>
          </div>

          {/* Middle Section: Building Comparison & Multi-SRL Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Épület- és Cégcsoport (Multi-SRL) Összehasonlítás
                  </h2>
                  <p className="text-xs text-slate-500">
                    Négyzetméterre vetített havi nettó hozam (RON / m²) és
                    költségszerkezet
                  </p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                  Összesített alapterület: {totalSqm} m²
                </span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900">
                        Residence Park – A Épület
                      </span>
                      <span className="ml-2 text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-medium">
                        Transilvania Stay SRL
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-600">
                        171.5 RON / m² nettó hozam
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: '69%' }}
                    />
                    <div
                      className="bg-amber-400 h-full"
                      style={{ width: '14%' }}
                    />
                    <div
                      className="bg-sky-400 h-full"
                      style={{ width: '10%' }}
                    />
                    <div
                      className="bg-slate-400 h-full"
                      style={{ width: '7%' }}
                    />
                  </div>
                  <div className="flex flex-wrap justify-between text-xs text-slate-500 pt-1">
                    <span>Bruttó: 32.450 RON</span>
                    <span>Költségek: -10.178 RON</span>
                    <span className="font-semibold text-slate-800">
                      Nettó: 22.272 RON
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900">
                        Residence Park – B Épület (Új átadás)
                      </span>
                      <span className="ml-2 text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">
                        Cluj Urban Living SRL
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-emerald-600">
                        166.9 RON / m² nettó hozam
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: '66%' }}
                    />
                    <div
                      className="bg-amber-400 h-full"
                      style={{ width: '14%' }}
                    />
                    <div
                      className="bg-sky-400 h-full"
                      style={{ width: '12%' }}
                    />
                    <div
                      className="bg-slate-400 h-full"
                      style={{ width: '8%' }}
                    />
                  </div>
                  <div className="flex flex-wrap justify-between text-xs text-slate-500 pt-1">
                    <span>Bruttó: 48.700 RON</span>
                    <span>Költségek: -14.645 RON</span>
                    <span className="font-semibold text-slate-800">
                      Nettó: 34.055 RON
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Építési Garancia vs. Üzemeltetési Kár
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automatikus elkülönítés alvállalkozói garanciához
                </p>

                <div className="mt-4 space-y-3">
                  {issues.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          Lakás {item.apt}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            item.category === 'Építési garancia'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-700">
                        {item.title}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>{item.assignee}</span>
                        <span className="font-semibold text-emerald-700">
                          {item.cost}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Átlagos takarítási idő:</span>
                <span className="font-bold text-slate-800">
                  42 perc / apartman
                </span>
              </div>
            </div>
          </div>

          {/* Top / Flop Apartments Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
            <h2 className="font-bold text-slate-900 mb-3">
              Lakásonkénti Nettó Profitabilitás Rangsor (Top & Flop)
            </h2>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase">
                  <th className="py-2.5 px-3">Lakás</th>
                  <th className="py-2.5 px-3">Cég (SRL)</th>
                  <th className="py-2.5 px-3 text-right">Bruttó Bevétel</th>
                  <th className="py-2.5 px-3 text-right">OTA + Adó</th>
                  <th className="py-2.5 px-3 text-right">Takarítás + Rezsi</th>
                  <th className="py-2.5 px-3 text-right">Nettó Profit</th>
                  <th className="py-2.5 px-3 text-right">Hozam / m²</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...apartments]
                  .map((a) => ({
                    ...a,
                    net:
                      a.revenueMonth -
                      (a.otaFee + a.cleaningCost + a.utilities + a.taxes),
                  }))
                  .sort((a, b) => b.net - a.net)
                  .map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {apt.id}{' '}
                        <span className="text-xs font-normal text-slate-500 block">
                          {apt.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-600">
                        {apt.srl}
                      </td>
                      <td className="py-3 px-3 text-right font-medium">
                        {apt.revenueMonth.toLocaleString()} RON
                      </td>
                      <td className="py-3 px-3 text-right text-slate-500">
                        -{(apt.otaFee + apt.taxes).toLocaleString()} RON
                      </td>
                      <td className="py-3 px-3 text-right text-slate-500">
                        -{(apt.cleaningCost + apt.utilities).toLocaleString()}{' '}
                        RON
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-600">
                        {apt.net.toLocaleString()} RON
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-slate-800">
                        {Math.round(apt.net / apt.sqm)} RON/m²
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* ===================================================================== */}
      {/* VIEW 2: ADMINISZTRÁTOR (AIR TRAFFIC CONTROL & LIVE ACTIVITY STREAM)   */}
      {/* ===================================================================== */}
      {role === 'admin' && (
        <main className="max-w-7xl mx-auto w-full px-4 py-6 space-y-6">
          {/* Top Sub-Navigation */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Operatív Vezérlőpult (Air Traffic Control)
              </h1>
              <p className="text-xs text-slate-500">
                Élő lakásstátuszok, vendég Check-in/out napló, okoszár PIN-kódok
                és takarítói fotó-audit
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setAdminTab('matrix')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  adminTab === 'matrix'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Élő Lakás-mátrix & Eseménynapló
              </button>
              <button
                onClick={() => setAdminTab('guests')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  adminTab === 'guests'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                Vendég Check-in & Okoszár
              </button>
              <button
                onClick={() => setAdminTab('finance')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                  adminTab === 'finance'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Receipt className="w-4 h-4" />
                Rezsi Felosztás & e-Factura
              </button>
            </div>
          </div>

          {/* TAB A: LIVE APARTMENT MATRIX + LIVE EVENT STREAM */}
          {adminTab === 'matrix' && (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3 space-y-4">
                {/* Status Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 rounded-xl border border-slate-200">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {[
                      { key: 'all', label: `Összes (${apartments.length})` },
                      {
                        key: 'CLEAN',
                        label: `🟢 Kész (${
                          apartments.filter((a) => a.status === 'CLEAN').length
                        })`,
                      },
                      {
                        key: 'OCCUPIED',
                        label: `🔵 Vendég bent (${
                          apartments.filter((a) => a.status === 'OCCUPIED')
                            .length
                        })`,
                      },
                      {
                        key: 'DIRTY',
                        label: `🔴 Piszkos (${
                          apartments.filter((a) => a.status === 'DIRTY').length
                        })`,
                      },
                      {
                        key: 'CLEANING',
                        label: `🟡 Takarítás (${
                          apartments.filter((a) => a.status === 'CLEANING')
                            .length
                        })`,
                      },
                      {
                        key: 'MAINTENANCE',
                        label: `🟣 Szerviz (${
                          apartments.filter((a) => a.status === 'MAINTENANCE')
                            .length
                        })`,
                      },
                    ].map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setStatusFilter(f.key)}
                        className={`px-2.5 py-1.5 rounded-lg font-medium transition ${
                          statusFilter === f.key
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Élő szinkron aktív</span>
                  </div>
                </div>

                {/* Apartment Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {apartments
                    .filter(
                      (a) => statusFilter === 'all' || a.status === statusFilter
                    )
                    .map((apt) => {
                      const statusConfig = {
                        CLEAN: {
                          border: 'border-emerald-300',
                          badgeBg: 'bg-emerald-100 text-emerald-800',
                          label: '🟢 KÉSZ / TISZTA',
                        },
                        OCCUPIED: {
                          border: 'border-indigo-400',
                          badgeBg: 'bg-indigo-100 text-indigo-800',
                          label: '🔵 VENDÉG BENT',
                        },
                        CLEANING: {
                          border: 'border-amber-300',
                          badgeBg: 'bg-amber-100 text-amber-800',
                          label: '🟡 TAKARÍTÁS ALATT',
                        },
                        DIRTY: {
                          border: 'border-rose-300',
                          badgeBg: 'bg-rose-100 text-rose-800',
                          label: '🔴 PISZKOS / VÁR',
                        },
                        MAINTENANCE: {
                          border: 'border-purple-300',
                          badgeBg: 'bg-purple-100 text-purple-800',
                          label: '🟣 KARBANTARTÁS',
                        },
                      }[apt.status];

                      return (
                        <div
                          key={apt.id}
                          className={`bg-white rounded-2xl border-2 ${statusConfig.border} p-4 shadow-sm flex flex-col justify-between space-y-3 transition-all`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="text-[11px] font-medium text-slate-400 block">
                                  {apt.building.split(' - ')[1]}
                                </span>
                                <h3 className="text-lg font-bold text-slate-900">
                                  Lakás {apt.number}{' '}
                                  <span className="text-xs font-normal text-slate-500">
                                    ({apt.sqm} m²)
                                  </span>
                                </h3>
                              </div>
                              <span
                                className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${statusConfig.badgeBg}`}
                              >
                                {statusConfig.label}
                              </span>
                            </div>

                            <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                              <div className="flex justify-between">
                                <span className="text-slate-500">Vendég:</span>
                                <span className="font-semibold text-slate-800">
                                  {apt.nextGuest}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">
                                  Okoszár PIN:
                                </span>
                                <span className="font-mono font-bold text-slate-900">
                                  <span
                                    className={
                                      apt.pinActive
                                        ? 'text-emerald-600'
                                        : 'text-slate-400'
                                    }
                                  >
                                    {apt.pinCode} (
                                    {apt.pinActive ? 'AKTÍV' : 'ZÁRVA'})
                                  </span>
                                </span>
                              </div>
                              {apt.checkedInAt && apt.status === 'OCCUPIED' && (
                                <div className="flex justify-between">
                                  <span className="text-slate-500">
                                    Check-in idő:
                                  </span>
                                  <span className="font-semibold text-indigo-700">
                                    {apt.checkedInAt}
                                  </span>
                                </div>
                              )}
                            </div>

                            {apt.status === 'CLEANING' && (
                              <div className="mt-2.5 space-y-1">
                                <div className="flex justify-between text-xs font-medium">
                                  <span className="text-amber-700">
                                    Takarítás folyamatban...
                                  </span>
                                  <span>{apt.cleaningProgress}%</span>
                                </div>
                                <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
                                  <div
                                    className="bg-amber-500 h-full transition-all"
                                    style={{
                                      width: `${apt.cleaningProgress}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            )}

                            <p className="mt-2.5 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                              {apt.note}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <span className="text-[11px] text-slate-500">
                              Fotók: {apt.photos.length}/3
                            </span>
                            <button
                              onClick={() => setSelectedApt(apt)}
                              className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Audit & Napló
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Right Column: Live Activity Feed */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-fit">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-sky-600" />
                      <h2 className="font-bold text-sm text-slate-900">
                        Élő Eseménynapló
                      </h2>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      REAL-TIME
                    </span>
                  </div>

                  <div className="mt-3 space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                    {activityLog.map((log) => {
                      const dotColor =
                        log.type === 'guest-in'
                          ? 'bg-indigo-500'
                          : log.type === 'guest-out'
                          ? 'bg-rose-500'
                          : log.type === 'cleaner'
                          ? 'bg-emerald-500'
                          : 'bg-slate-400';

                      return (
                        <div
                          key={log.id}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full ${dotColor}`}
                              />
                              {log.apt} • {log.actor}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {log.time}
                            </span>
                          </div>
                          <p className="text-slate-600 leading-snug">
                            {log.action}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB B: GUEST CHECK-IN & SMART LOCK */}
          {adminTab === 'guests' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Élő Vendégmozgás & Okoszár Automatizáció
                  </h2>
                  <p className="text-xs text-slate-500">
                    Online szállásadói adatlap (Fișă de cazare) és automatikus
                    TTLock/Nuki PIN státusz
                  </p>
                </div>
                <button
                  onClick={() =>
                    triggerToast(
                      'Emlékeztető WhatsApp link kiküldve a függőben lévő vendégeknek!'
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
                >
                  WhatsApp emlékeztető küldése
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase">
                      <th className="py-2.5 px-3">Lakás</th>
                      <th className="py-2.5 px-3">Vendég neve</th>
                      <th className="py-2.5 px-3">Állapot</th>
                      <th className="py-2.5 px-3">Online Adatlap</th>
                      <th className="py-2.5 px-3">Okoszár PIN</th>
                      <th className="py-2.5 px-3">ANAF e-Factura</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {apartments
                      .filter((a) => a.status !== 'MAINTENANCE')
                      .map((apt) => (
                        <tr key={apt.id} className="hover:bg-slate-50">
                          <td className="py-3 px-3 font-bold">{apt.id}</td>
                          <td className="py-3 px-3 font-medium">
                            {apt.nextGuest}{' '}
                            <span className="text-xs text-slate-400 block">
                              {apt.guestCount}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                                apt.status === 'OCCUPIED'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : apt.status === 'CLEAN'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {apt.status === 'OCCUPIED'
                                ? `Bent (${apt.checkedInAt || 'Ma'})`
                                : apt.status === 'CLEAN'
                                ? `Érkezésre kész (${apt.nextCheckIn})`
                                : 'Távozott / Takarítás alatt'}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            {apt.formCompleted ? (
                              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" /> Kitöltve
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                                <Clock className="w-4 h-4" /> Várakozik
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 font-mono text-xs font-semibold">
                            {apt.pinCode}{' '}
                            <span
                              className={
                                apt.pinActive
                                  ? 'text-emerald-600'
                                  : 'text-slate-400'
                              }
                            >
                              ({apt.pinActive ? 'Aktív' : 'Inaktív'})
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                              ANAF SPV OK
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB C: UTILITY COST ALLOCATION & ANAF e-FACTURA */}
          {adminTab === 'finance' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="font-bold text-slate-900">
                  Közös Épület-rezsi Automatikus Felosztása
                </h2>
                <p className="text-xs text-slate-500">
                  Írd be a beérkezett közös gáz/villany számlát, és a rendszer
                  m² alapon szétosztja a lakások P&L-jére:
                </p>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Közös havi energiaszámla összege (RON):
                  </label>
                  <input
                    type="number"
                    value={sharedUtilityBill}
                    onChange={(e) =>
                      setSharedUtilityBill(Number(e.target.value) || 0)
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sky-800">Összesített terület:</span>
                    <span className="font-bold">{totalSqm} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sky-800">Egységár:</span>
                    <span className="font-bold">
                      {(sharedUtilityBill / totalSqm).toFixed(2)} RON / m²
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setApartments((prev) =>
                      prev.map((apt) => ({
                        ...apt,
                        utilities: Math.round(
                          (sharedUtilityBill / totalSqm) * apt.sqm
                        ),
                      }))
                    );
                    triggerToast(
                      'Rezsiszámla m² alapon szétosztva minden lakás P&L-jére!'
                    );
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
                >
                  Költség allokálása a lakásokra
                </button>
              </div>

              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      ANAF e-Factura & Multi-SRL Könyvelési Szinkron
                    </h2>
                    <p className="text-xs text-slate-500">
                      Automatikus XML beküldés és SAGA / WinMentor export
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      triggerToast(
                        'Összes függőben lévő számla sikeresen beküldve az ANAF SPV-be!'
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                  >
                    Tömeges e-Factura beküldés
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="font-bold text-slate-900 block">
                      Transilvania Stay SRL (RO44829102)
                    </span>
                    <span className="text-slate-500 block mt-1">
                      Kiállított számlák: 48 db • ANAF SPV státusz: 100%
                      Validált
                    </span>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                      Utolsó szinkron: 2 perce
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="font-bold text-slate-900 block">
                      Cluj Urban Living SRL (RO48910234)
                    </span>
                    <span className="text-slate-500 block mt-1">
                      Kiállított számlák: 39 db • ANAF SPV státusz: 100%
                      Validált
                    </span>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                      Utolsó szinkron: 2 perce
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal for Photo Audit & Apartment Details */}
          {selectedApt && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      Lakás {selectedApt.id} – Fotó-audit & Napló
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedApt.building}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedApt(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Takarító:</span>
                    <span className="font-semibold">{selectedApt.cleaner}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Mért takarítási idő:</span>
                    <span className="font-semibold">
                      {selectedApt.cleaningDurationSec > 0
                        ? `${Math.round(
                            selectedApt.cleaningDurationSec / 60
                          )} perc`
                        : 'Még nem indult el'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Okoszár PIN-kód:</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {selectedApt.pinCode}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-2">
                    Feltöltött ellenőrző fotók ({selectedApt.photos.length}/3):
                  </span>
                  {selectedApt.photos.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                      {selectedApt.photos.map((p, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center p-2 text-center"
                        >
                          <Camera className="w-6 h-6 text-emerald-600 mb-1" />
                          <span className="text-[11px] font-semibold text-emerald-900">
                            {p}
                          </span>
                          <span className="text-[10px] text-emerald-600">
                            Ellenőrizve
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500">
                      Még nem érkeztek fotók erről a lakásról. Válts a
                      "Takarítónő (Mobil)" nézetre és végezd el a takarítást!
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedApt(null)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                  >
                    Bezárás
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ===================================================================== */}
      {/* VIEW 3: TAKARÍTÓNŐ (ONE-THUMB MOBILE PWA PROTOTYPE)                   */}
      {/* ===================================================================== */}
      {role === 'cleaner' && (
        <main className="flex-1 flex flex-col items-center justify-center py-6 px-4 bg-slate-200/70">
          <div className="mb-3 text-center max-w-md">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              3. Takarítónő Mobil PWA • Valós idejű feladatlista
            </span>
            <p className="text-xs text-slate-600 mt-1.5">
              Ha egy vendég kijelentkezik a <strong>4. Vendég</strong> fülön, a
              lakás automatikusan megjelenik itt!
            </p>
          </div>

          <div className="w-full max-w-[390px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800">
            <div className="bg-slate-50 rounded-[34px] overflow-hidden flex flex-col min-h-[720px] relative">
              {/* Mobile Status Bar & Language Switcher */}
              <div className="bg-slate-900 text-white px-5 pt-3 pb-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                  <span>14:32 • 5G</span>
                  <div className="w-16 h-4 bg-black rounded-full" />
                  <span>94% 🔋</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-base">{t.greeting}</h2>
                    <p className="text-xs text-slate-400">{t.subtitle}</p>
                  </div>

                  <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                    {['HU', 'RO', 'EN'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setPwaLang(lang)}
                        className={`px-2 py-1 rounded-md text-[11px] font-bold transition ${
                          pwaLang === lang
                            ? 'bg-amber-400 text-slate-950'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Dirty / Cleaning Task Selector Pills */}
                {dirtyOrCleaningApartments.length > 0 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {dirtyOrCleaningApartments.map((apt) => (
                      <button
                        key={apt.id}
                        onClick={() => {
                          setActiveCleaningAptId(apt.id);
                          setCleaningStarted(apt.status === 'CLEANING');
                          setCheckedTasks([false, false, false, false]);
                          setUploadedPhotos([false, false, false]);
                          setElapsedSeconds(0);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition flex items-center gap-1.5 ${
                          currentPwaApt.id === apt.id
                            ? 'bg-white text-slate-900 border-white'
                            : 'bg-slate-800/80 text-slate-300 border-slate-700'
                        }`}
                      >
                        <span>{apt.status === 'CLEANING' ? '🟡' : '🔴'}</span>
                        <span>{apt.id}</span>
                        {apt.justCheckedOut && (
                          <span className="px-1.5 py-0.2 text-[9px] rounded bg-rose-500 text-white">
                            ÚJ
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Body */}
              {dirtyOrCleaningApartments.length === 0 ? (
                <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {t.noTasks}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs">
                    {t.noTasksHint}
                  </p>
                  <button
                    onClick={() => setRole('guest')}
                    className="mt-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm"
                  >
                    Ugrás a 4. Vendég nézetre →
                  </button>
                </div>
              ) : (
                <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          currentPwaApt.justCheckedOut
                            ? 'bg-rose-600 text-white animate-pulse'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {currentPwaApt.justCheckedOut
                          ? t.justLeftBadge
                          : `${t.urgentBadge} ${currentPwaApt.nextCheckIn}`}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {currentPwaApt.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mt-1.5">
                      {currentPwaApt.building.split(' - ')[1]} • Lakás{' '}
                      {currentPwaApt.number}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      {currentPwaApt.note}
                    </p>

                    {!cleaningStarted && (
                      <button
                        onClick={handleStartCleaning}
                        className="mt-4 w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        <span>{t.startBtn}</span>
                      </button>
                    )}

                    {cleaningStarted && (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-emerald-800 block font-medium">
                            {t.pinLabel}
                          </span>
                          <span className="text-lg font-mono font-extrabold text-emerald-950">
                            9942#
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-emerald-700 block">
                            Időmérő
                          </span>
                          <span className="text-base font-mono font-bold text-emerald-900">
                            ⏱ {formatTimer(elapsedSeconds)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Checklist */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t.checklistTitle}
                    </h4>
                    {t.tasks.map((taskLabel, idx) => (
                      <button
                        key={idx}
                        disabled={!cleaningStarted}
                        onClick={() => toggleChecklist(idx)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition ${
                          checkedTasks[idx]
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        } ${
                          !cleaningStarted
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
                            checkedTasks[idx]
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'bg-white border-slate-300'
                          }`}
                        >
                          {checkedTasks[idx] && <Check className="w-4 h-4" />}
                        </div>
                        <span className="text-xs font-semibold leading-snug">
                          {taskLabel}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Mandatory Live Camera Photos */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t.photosTitle}
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {t.photoLabels.map((label, idx) => (
                        <button
                          key={idx}
                          disabled={!cleaningStarted}
                          onClick={() => simulateTakePhoto(idx)}
                          className={`p-3 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 transition ${
                            uploadedPhotos[idx]
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                              : 'bg-slate-50 border-slate-300 text-slate-600 hover:border-sky-400'
                          } ${
                            !cleaningStarted
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                        >
                          {uploadedPhotos[idx] ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          ) : (
                            <Camera className="w-6 h-6 text-slate-500" />
                          )}
                          <span className="text-[11px] font-bold text-center">
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Issue / Consumable Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setShowIssueDrawer(true)}
                      className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>{t.reportIssue}</span>
                    </button>
                    <button
                      onClick={() =>
                        triggerToast(
                          'Fogyóeszköz-igény (kávékapszula, mosószer) rögzítve!'
                        )
                      }
                      className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <PackageOpen className="w-4 h-4" />
                      <span>{t.reportStock}</span>
                    </button>
                  </div>

                  {/* Finish Button */}
                  <div className="pt-1 pb-4">
                    <button
                      disabled={!isCleanerReadyToFinish}
                      onClick={handleFinishCleaning}
                      className={`w-full py-4 rounded-2xl font-extrabold text-sm shadow-lg transition flex items-center justify-center gap-2 ${
                        isCleanerReadyToFinish
                          ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/25'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{t.finishBtn}</span>
                    </button>
                    {!isCleanerReadyToFinish && (
                      <p className="text-[11px] text-center text-slate-500 mt-1.5">
                        {t.finishHint}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Issue Reporting Drawer */}
              {showIssueDrawer && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-end p-3 z-20">
                  <div className="bg-white w-full rounded-2xl p-4 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">
                        {t.reportIssue}
                      </h4>
                      <button onClick={() => setShowIssueDrawer(false)}>
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold"
                    >
                      <option value="Építési garancia">
                        Építési garancia (pl. csöpögő csap, repedés)
                      </option>
                      <option value="Vendégkár">
                        Vendégkár (pl. törött tárgy, foltos kanapé)
                      </option>
                    </select>
                    <textarea
                      rows={3}
                      value={issueText}
                      onChange={(e) => setIssueText(e.target.value)}
                      placeholder="Írd le röviden a hibát..."
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                    <button
                      onClick={handleSubmitIssue}
                      className="w-full py-3 rounded-xl bg-rose-600 text-white font-bold text-xs"
                    >
                      Bejelentés küldése az Adminnak
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ===================================================================== */}
      {/* VIEW 4: VENDÉG / KLIENS (SELF CHECK-IN & CHECK-OUT MOBILE PORTAL)     */}
      {/* ===================================================================== */}
      {role === 'guest' && (
        <main className="flex-1 flex flex-col items-center justify-center py-6 px-4 bg-slate-200/70">
          <div className="mb-3 text-center max-w-md">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
              4. Vendég Mobil Portál • App letöltés nélküli Web-link
            </span>
            <p className="text-xs text-slate-600 mt-1.5">
              Teszteld a <strong>Check-in</strong> (PIN feloldás) és{' '}
              <strong>Check-out</strong> (azonnali takarítás indítás)
              folyamatot!
            </p>
          </div>

          {/* Smartphone Frame */}
          <div className="w-full max-w-[390px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800">
            <div className="bg-slate-50 rounded-[34px] overflow-hidden flex flex-col min-h-[720px] relative">
              {/* Top Mobile Header */}
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 text-white px-5 pt-3 pb-4">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                  <span>14:35 • 5G</span>
                  <div className="w-16 h-4 bg-black rounded-full" />
                  <span>98% 🔋</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold block">
                      Residence Park Cluj
                    </span>
                    <h2 className="font-bold text-sm">{gt.portalTitle}</h2>
                  </div>

                  {/* Language Switcher HU / RO / EN */}
                  <div className="flex bg-slate-800/90 p-0.5 rounded-lg border border-slate-700">
                    {['HU', 'RO', 'EN'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setGuestLang(lang)}
                        className={`px-2 py-1 rounded-md text-[11px] font-bold transition ${
                          guestLang === lang
                            ? 'bg-indigo-400 text-slate-950'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apartment Reservation Switcher */}
                <div className="mt-3">
                  <label className="text-[10px] text-slate-400 block mb-1">
                    {gt.selectApt}
                  </label>
                  <select
                    value={guestAptId}
                    onChange={(e) => handleSelectGuestApt(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 text-white text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    {apartments
                      .filter((a) => a.status !== 'MAINTENANCE')
                      .map((apt) => (
                        <option key={apt.id} value={apt.id}>
                          {apt.id} • {apt.nextGuest} (
                          {apt.status === 'CLEAN'
                            ? '🟢 Kész - Check-inre vár'
                            : apt.status === 'OCCUPIED'
                            ? '🔵 Bent tartózkodik'
                            : '🔴 Takarítás alatt'}
                          )
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Guest Body Content */}
              <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                {/* Reservation Summary Card */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        currentGuestApt.status === 'OCCUPIED'
                          ? 'bg-indigo-100 text-indigo-800'
                          : justCheckedOutAptIds[currentGuestApt.id]
                          ? 'bg-slate-200 text-slate-800'
                          : currentGuestApt.status === 'CLEAN'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {currentGuestApt.status === 'OCCUPIED'
                        ? gt.occupiedBadge
                        : justCheckedOutAptIds[currentGuestApt.id]
                        ? gt.checkedOutBadge
                        : currentGuestApt.status === 'CLEAN'
                        ? gt.preCheckInBadge
                        : gt.dirtyWaitBadge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {currentGuestApt.building.split(' - ')[1]} • Lakás{' '}
                      {currentGuestApt.number}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {currentGuestApt.type} • {currentGuestApt.stayDates}
                    </p>
                  </div>
                </div>

                {/* STATE 1: PRE-CHECK-IN (Apartment is CLEAN & awaiting Check-in) */}
                {currentGuestApt.status === 'CLEAN' &&
                  !justCheckedOutAptIds[currentGuestApt.id] && (
                    <>
                      {/* Locked Smart Lock PIN Card */}
                      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">
                            {gt.lockedPinTitle}
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                            {gt.lockedPinSub}
                          </p>
                        </div>
                      </div>

                      {/* Legal Romanian Guest Form */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-800">
                            {gt.formTitle}
                          </h4>
                        </div>

                        <button
                          type="button"
                          onClick={handleSimulateOcr}
                          className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                        >
                          <ScanLine className="w-4 h-4" />
                          <span>{gt.ocrBtn}</span>
                        </button>

                        <div className="space-y-2.5 text-xs">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                              {gt.fullName}
                            </label>
                            <input
                              type="text"
                              value={guestNameInput}
                              onChange={(e) =>
                                setGuestNameInput(e.target.value)
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                              {gt.docNumber}
                            </label>
                            <input
                              type="text"
                              value={guestDocInput}
                              onChange={(e) => setGuestDocInput(e.target.value)}
                              placeholder="Pl. 1890512... vagy útlevélszám"
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                              {gt.address}
                            </label>
                            <input
                              type="text"
                              value={guestAddressInput}
                              onChange={(e) =>
                                setGuestAddressInput(e.target.value)
                              }
                              placeholder="Város, utca, házszám"
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <label className="flex items-start gap-2 pt-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={guestRulesAccepted}
                              onChange={(e) =>
                                setGuestRulesAccepted(e.target.checked)
                              }
                              className="mt-0.5 rounded text-indigo-600"
                            />
                            <span className="text-[11px] text-slate-600 leading-snug">
                              {gt.acceptRules}
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Primary Check-in CTA */}
                      <button
                        onClick={handleGuestCheckIn}
                        className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition"
                      >
                        <LogIn className="w-5 h-5" />
                        <span>{gt.checkInBtn}</span>
                      </button>
                    </>
                  )}

                {/* STATE 2: OCCUPIED / ACTIVE STAY */}
                {currentGuestApt.status === 'OCCUPIED' && (
                  <>
                    {/* Unlocked Smart Lock PIN Card */}
                    <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-4 rounded-2xl shadow-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100">
                          {gt.pinCardTitle}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold">
                          {gt.pinActiveLabel}
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-black/20 px-4 py-3 rounded-xl">
                        <span className="text-3xl font-mono font-black tracking-widest">
                          {currentGuestApt.pinCode}
                        </span>
                        <button
                          onClick={() =>
                            triggerToast(
                              `PIN-kód (${currentGuestApt.pinCode}) vágólapra másolva!`
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-white text-emerald-900 text-xs font-bold flex items-center gap-1 shadow-xs"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{gt.copyBtn}</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setDoorUnlockedPulse(true);
                          triggerToast(gt.doorUnlockedMsg);
                          setTimeout(() => setDoorUnlockedPulse(false), 4000);
                        }}
                        className={`w-full py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition ${
                          doorUnlockedPulse
                            ? 'bg-amber-300 text-slate-950'
                            : 'bg-white text-emerald-950 hover:bg-emerald-50'
                        }`}
                      >
                        <Unlock className="w-4 h-4" />
                        <span>
                          {doorUnlockedPulse
                            ? gt.doorUnlockedMsg
                            : gt.unlockDoorBtn}
                        </span>
                      </button>
                    </div>

                    {/* Practical Apartment Info (Wi-Fi, Parking, Thermostat) */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5 text-xs">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                        {gt.infoTitle}
                      </h4>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Wifi className="w-4 h-4 text-indigo-600 shrink-0" />
                          <div>
                            <span className="text-slate-500 block text-[10px]">
                              {currentGuestApt.wifiSsid}
                            </span>
                            <span className="font-mono font-bold text-slate-900">
                              {currentGuestApt.wifiPass}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            triggerToast('Wi-Fi jelszó vágólapra másolva!')
                          }
                          className="text-[11px] font-bold text-indigo-600 px-2 py-1 rounded hover:bg-indigo-50"
                        >
                          {gt.copyBtn}
                        </button>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                        <Car className="w-4 h-4 text-slate-600 shrink-0" />
                        <div>
                          <span className="text-slate-500 text-[11px]">
                            {gt.parkingLabel}{' '}
                          </span>
                          <span className="font-bold text-slate-900">
                            {currentGuestApt.parkingSpot}
                          </span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                        <Thermometer className="w-4 h-4 text-rose-500 shrink-0" />
                        <div>
                          <span className="text-slate-500 text-[11px]">
                            {gt.thermostatLabel}{' '}
                          </span>
                          <span className="font-bold text-slate-900">
                            {gt.thermostatVal}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Guest Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setShowGuestIssueModal(true)}
                        className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span>{gt.reportBtn}</span>
                      </button>
                      <button
                        onClick={() =>
                          triggerToast(
                            'Late Check-out kérés elküldve (+100 RON)!'
                          )
                        }
                        className="p-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span>{gt.lateCheckoutBtn}</span>
                      </button>
                    </div>

                    {/* Primary Check-out CTA */}
                    <div className="pt-1 pb-3 space-y-1.5">
                      <button
                        onClick={handleGuestCheckOut}
                        className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-extrabold text-sm shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>{gt.checkOutBtn}</span>
                      </button>
                      <p className="text-[11px] text-center text-slate-500 leading-snug">
                        {gt.checkOutSub}
                      </p>
                    </div>
                  </>
                )}

                {/* STATE 3: CHECKED OUT OR WAITING FOR CLEANING */}
                {(currentGuestApt.status === 'DIRTY' ||
                  currentGuestApt.status === 'CLEANING' ||
                  justCheckedOutAptIds[currentGuestApt.id]) && (
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    {justCheckedOutAptIds[currentGuestApt.id] ? (
                      <>
                        <div>
                          <h4 className="font-extrabold text-base text-slate-900">
                            {gt.thankYouTitle}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {gt.thankYouSub}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            triggerToast('ANAF e-Factura PDF számla letöltve!')
                          }
                          className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>{gt.downloadInvoice}</span>
                        </button>

                        <div className="pt-2 border-t border-slate-100 space-y-2">
                          <button
                            onClick={() => setRole('cleaner')}
                            className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-extrabold"
                          >
                            3. Takarítónő nézet megnyitása →
                          </button>

                          {currentGuestApt.status === 'CLEAN' && (
                            <button
                              onClick={handleSimulateNewBookingForApt}
                              className="w-full py-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200"
                            >
                              {gt.newBookingSimBtn}
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h4 className="font-extrabold text-base text-slate-900">
                            {gt.dirtyNoticeTitle}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {gt.dirtyNoticeSub}
                          </p>
                        </div>
                        <button
                          onClick={() => setRole('cleaner')}
                          className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-extrabold"
                        >
                          Ugrás a 3. Takarítónő nézetre →
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Guest Issue / Request Drawer */}
              {showGuestIssueModal && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-end p-3 z-20">
                  <div className="bg-white w-full rounded-2xl p-4 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">
                        {gt.reportBtn}
                      </h4>
                      <button onClick={() => setShowGuestIssueModal(false)}>
                        <X className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={guestRequestText}
                      onChange={(e) => setGuestRequestText(e.target.value)}
                      placeholder="Pl. Extra törölközőt szeretnénk kérni, vagy nem kapcsol be a klíma..."
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                    <button
                      onClick={handleGuestSendRequest}
                      className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                    >
                      Üzenet küldése
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
