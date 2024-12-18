import {
  type CategoryType,
  type ServicesType,
  type ExtraServicesType,
  type StaffType,
} from "./types";

type CategoryData = CategoryType[];
type ServiceData = ServicesType[];
type ExtraServiceData = ExtraServicesType[];
type StaffData = StaffType[];

export const staff: StaffData = [
  {
    name: "Sofia Björk",
    role: "Frisör, Naturläkare",
    id: 1,
    image: "/staff-sofia.jpg",
    schedule: {
      "2024-12-08": ["09:00", "10:30", "12:00", "13:00", "15:00"],
      "2024-12-09": ["09:00", "10:30", "12:00", "13:00", "15:00"],
      "2024-12-10": ["09:00", "10:30", "12:00", "13:00", "15:00"],
      "2024-12-11": ["09:00", "10:30", "13:00", "15:00"],
      "2024-12-12": ["09:00", "10:30", "12:00", "13:00", "15:00"],
      "2024-12-13": ["09:00", "10:30", "12:00", "13:00", "15:00"],
      "2024-12-14": ["09:00", "10:30", "12:00", "13:00", "15:00"],
    },
  },
  {
    name: "Lisa Höfling",
    role: "Frisör, Naturläkare",
    id: 2,
    image: "/staff-lisa.jpg",
    schedule: {
      "2024-12-08": ["09:00", "10:30", "12:00", "13:00", "15:00"],
      "2024-12-09": ["09:00", "10:30", "12:00", "13:00", "15:00"],
      "2024-12-10": ["09:00", "10:30", "12:00", "13:00", "15:00"],
      "2024-12-11": ["09:00", "10:30", "13:00", "15:00"],
      "2024-12-12": ["09:00", "10:30", "12:00", "13:00", "15:00"],
      "2024-12-13": ["09:00", "10:30", "12:00", "13:00", "15:00"],
      "2024-12-14": ["09:00", "10:30", "12:00", "13:00", "15:00"],
    },
  },
];

export const categories: CategoryData = [
  {
    title: "Sofia Björk - Näringsterapeut",
    image: "/klippning.jpg",
    description: "Dessa behandlingar är helt fantastiska för dig.",
    id: 1,
    personal: [1],
  },
  {
    title: "Färgningar",
    image: "/klippning.jpg",
    description: "Dessa behandlingar är helt fantastiska för dig.",
    id: 2,
    personal: [1, 2],
  },
  {
    title: "Klippningar",
    image: "/klippning.jpg",
    description: "Dessa behandlingar är helt fantastiska för dig.",
    id: 3,
    personal: [1, 2],
  },
  {
    title: "Flerfärg/slingor",
    image: "/klippning.jpg",
    description: "Dessa behandlingar är helt fantastiska för dig.",
    id: 4,
    personal: [1, 2],
  },
  {
    title: "Spa paket & brynplock",
    image: "/klippning.jpg",
    description: "Dessa behandlingar är helt fantastiska för dig.",
    id: 5,
    personal: [1, 2],
  },
  {
    title: "Aromaterpai",
    image: "/klippning.jpg",
    description: "Dessa behandlingar är helt fantastiska för dig.",
    id: 6,
    personal: [1],
  },
  {
    title: "Kampanj",
    image: "/klippning.jpg",
    description: "Dessa behandlingar är helt fantastiska för dig.",
    id: 7,
    personal: [1],
  },
];

export const services: ServiceData = [
  {
    id: 1,
    services: [
      {
        title: "Hälsoanalys - via zoom",
        description:
          "Har du problem med hälsan? Kanske har du eksem, smärta i kroppen, ont i magen, födoämnesallergi, problem att sova, stress, utbrändhet eller ångest. Om du upplever obalanser där kroppen inte fungerar optimalt, då är en hälsoanalys rätt behandling för dig. Du får ett formulär utskickat, där du kommer behöva svara på allt gällande din hälsa. Vi går igenom det tillsammans, och jag kommer ställa ytterligare frågor. Därefter går vi tillsammans igenom en plan kring livsstilsförändringar, kostomläggning, och eventuella ört & näringspreparat du kommer att behöva för att kroppen ska kunna återfå balans och optimal hälsa.",
        id: 101,
        duration: 90,
        price: 1295,
      },
      {
        title: "Örtfärgnings konsultation - via zoom",
        description:
          "Örtfärg för hemmabruk Med 10år i branschen som ekofrisörer, hjälper vi dig att blanda en ny ekologisk hårfärg som vi postar hem till dig. Du gör jobbet själv, och vi guidar dig rätt. Vi postar örterna hem till dig, så du själv kan blanda och applicera pulvret i ditt hår. Instruktioner medföljer hur du steg för steg kommer få din nya hårfärg. Färgning av örter, fungerar endast om du vill ha en mörkare färg eller annan nyans av det mörkhetsläget du redan har, det går alltså inte att ljusa upp håret. Färgresultatet du får blir unikt för dör dig och påverkas av din befintliga hårfärg. Läs gärna mer om örtfärger här. Ansvaret vid hemmafärgning ligger alltid hos slutkund. I priset ingår ett 15min zoom möte utan extra kostnad, du berättar vad du vill ha för färg och vi hjälper dig hur du ska göra. Vi guidar dig även med hjälp av produkter, avgiftning, detox eller andra frågor kring ekologisk hårvård.",
        id: 102,
        duration: 60,
        price: 895,
      },
      {
        title: "Special blandad aromaolja för hemmabruk - via zoom",
        description:
          "Specialblandad olja för hemmabruk För mig bör man ha oerhörd respekt för våra eteriska oljor, då de verkligen inte bara är att välja en. När du tex injicera, dricker, eller smörjer dom i fel mängd kan det ge stora skador och ha negativ inverkan på kroppen med fel växt och fel mängder. Så att ta hjälp av kunnig personal eller någon som arbetar med eteriska oljor är klokt. Jag kombinerar min kunskap som kost och näringsterapeut och det jag lärt mig inom den medicinska aromaterapin, för att kunna ge dig bästa möjliga behandling. Jag väljer en eller flera eteriska oljor som passar dig och de problem du önskar jobba med. Som du sedan kan smörjer på olika delar av kroppen för att hjälpa/lugna/stötta kroppen inifrån. Om du köper en individuellt blandad olja ingår en gratis zoom konsultation på 15 min, porto tillkommer. Ex på vad för problem du kan använda oljorna till; Sömnproblem, stress, ångest, olika hårbottenproblem, stress, ångest, huvudvärk, feber, förkylning, värk, eksem mm. Notera att vissa problem kommer inifrån och kan behöva mer än en olja, den här tjänsten går utmärkt att lägga till/kombinera när du har en hälsokonsultation med mig, antingen på plats på salongen eller online. Många väljer även att köpa olja i kombination med en bokad Aroma massage på salongen. 30ml 195:- 50ml 235:- 100ml 255:- 10ml parfymblandning 295:-",
        id: 103,
        duration: 15,
        price: 650,
      },
      {
        title: "Levande blodanalys första gångsbesök",
        description:
          "Vi kollar på ditt blod i mikroskop för att se din hälsostatus.",
        id: 104,
        duration: 90,
        price: 1295,
      },
      {
        title: "Återbesök Levande blodanalys",
        description:
          "Levande blodanalys i mikroskop, inklusive hälso samtal och genomgång kring kost och näring samt livsstilsförändringar. Frågeformulär ifylls innan möte och medtags vid behandlingstillfälle.",
        id: 105,
        duration: 75,
        price: 995,
      },
      {
        title: "Aromamassage 60min + 15min konsultation",
        description:
          "En underbar avslappnande helkroppsmassage som fokuserar på total avslappning i kropp och sinne. Man använder sig utav olika eteriska oljor som penetrerar sig in i kroppen genom huden. Din livskraft ”prana” får en chans att återaktiveras. Hjälper till att dämpa både kortisol och sympatiskt stresspåslag som bildas genom en stressad livsstil. En underbar behandling för dig som har mycket i huvudet och känner dig stressad eller överväldigad, eller till och med vart utbränd. Såklart också jättebra för alla, i förebyggande syfte eller för att underhålla och ta hand om din hälsa. Under en 15 min Konsultation går vi igenom ev obalanser och hur du kan få en så stöttande behandling som möjligt för just dig.",
        id: 106,
        duration: 90,
        price: 1295,
      },
      {
        title: "Aromamassage 75min + 15min konsultation",
        description:
          "Har du problem med hälsan? Kanske har du eksem, smärta i kroppen, ont i magen, födoämnesallergi, problem att sova, stress, utbrändhet eller ångest. Om du upplever obalanser där kroppen inte fungerar optimalt, då är en hälsoanalys rätt behandling för dig. Du får ett formulär utskickat, där du kommer behöva svara på allt gällande din hälsa. Vi går igenom det tillsammans, och jag kommer ställa ytterligare frågor. Därefter går vi tillsammans igenom en plan kring livsstilsförändringar, kostomläggning, och eventuella ört & näringspreparat du kommer att behöva för att kroppen ska kunna återfå balans och optimal hälsa.",
        id: 107,
        duration: 105,
        price: 1395,
      },
      {
        title: "Aromamassage 90min + 15min konsultation",
        description:
          "En underbar avslappnande helkroppsmassage som fokuserar på total avslappning i kropp och sinne. Man använder sig utav olika eteriska oljor som penetrerar sig in i kroppen genom huden. Din livskraft ”prana” får en chans att återaktiveras. Hjälper till att dämpa både kortisol och sympatiskt stresspåslag som bildas genom en stressad livsstil. En underbar behandling för dig som har mycket i huvudet och känner dig stressad eller överväldigad, eller till och med vart utbränd. Såklart också jättebra för alla, i förebyggande syfte eller för att underhålla och ta hand om din hälsa. Under en 15 min Konsultation går vi igenom ev obalanser och hur du kan få en så stöttande behandling som möjligt för just dig.",
        id: 108,
        duration: 120,
        price: 1595,
      },
      {
        title: "Indisk huvud massage med veg olja",
        description:
          "Detta är en av våra mest eftertraktade behandlingar. Bokar du 60min indisk huvudmassage kan du förvänta dig en underbar upplevelse för både kropp och själ. Du kommer få en speciell olja i hela håret, och en ljuvlig massage för, axlar, armar, skuldror, nacke, öron, huvud och ansikte. Den indiska huvudmassagen härstammar från Indien och Ayruvedan, det kallas även för ”champi”. Massagen arbetar med olika Marma punkter, som används för att aktivera flödet för prana, eller för att stimulera en specifika organ eller dosha obalanser. Det finns extremt många hälsofördelar med denna huvudmassagen, några få av alla fördelar är: Stimulerar parasympatiska nervsystemet vilket reducerar stress, påverkar sömnen positivt, reducerar ångest och oro, släpper på psykisk och fysisk spänning, ökar känslor av lugn och välbefinnande. Eftersom blodcirkulationen ökar genom nacken och över hela huvud påverkas alla typer av hårbottenproblematik och tunna hår positivt. All näring som strömmar runt om hårrötterna får nu mer kraft och hjälper slaggprodukter att avlägsnas. Tilläggstjänsterna är en kortare torr huvudmassage utan olja.",
        id: 109,
        duration: 60,
        price: 995,
      },
      {
        title: "Hälso coachning 30min",
        description:
          "Endast samtal hälocohning, via telefon eller på plats, skriv i kommentarsfältet om du önskar via telefon istället för på salongen.",
        id: 110,
        duration: 30,
        price: 595,
      },
    ],
  },
  {
    id: 2,
    services: [
      {
        title: "Örtfärgning och klippning (kort)",
        description:
          "Örtfärgning och klippning, hårlängd kortklippt runt öron.",
        id: 201,
        duration: 135,
        price: 2300,
      },
      {
        title: "Örtfärgning och klippning (mellanlångt)",
        description: "Örtfärgning och klippning, hårlängder ovanför käklinjen.",
        id: 202,
        duration: 150,
        price: 2400,
      },
      {
        title: "Örtfärgning och klippning (axellångt)",
        description: "Örtärgning och klippning, hårlängder ner till axlarna.",
        id: 203,
        duration: 165,
        price: 2500,
      },
      {
        title: "Örtfärgning och klippning (långt)",
        description:
          "Örtfärgning och klippning, hårlängder som sträcker sig under skulderbladen.",
        id: 205,
        duration: 180,
        price: 2600,
      },
      {
        title: "Örtfärgning (kort)",
        description: "Örtfärgning, hårlängd kortklippt runt öron.",
        id: 206,
        duration: 105,
        price: 2200,
      },
      {
        title: "Örtfärgning (mellanlångt)",
        description: "Örtfärgning, hårlängder ovanför käklinjen.",
        id: 207,
        duration: 120,
        price: 2300,
      },
      {
        title: "Örtfärgning (axellångt)",
        description:
          "Örtfärgning, hårlängder ner till skulderbladen. Tvätt och fön inkluderat.",
        id: 208,
        duration: 150,
        price: 2400,
      },
      {
        title: "Örtfärgning (långt)",
        description:
          "Örtfärgning, hårlängder som sträcker sig under skulderbladen.",
        id: 209,
        duration: 165,
        price: 2500,
      },
    ],
  },
];

export const extraServices: ExtraServiceData = [
  {
    id: 2,
    services: [
      { title: "Brynplock +15min", id: 2001, duration: 15, price: 250 },
      { title: "Huvudmassage +15min", id: 2002, duration: 15, price: 250 },
    ],
  },
];
