import { defineStore, acceptHMRUpdate } from 'pinia'

export interface DummyDoc {
    id: number;
    content: string;
    type: string;
    type_text: string;
    date: any;
}

export interface DummySource {
  key: string;
  list: Array<{
    id: number;
    title: string;
    url: string;
  }>
}

export interface DummyUpdateLaw {
  id: number;
  status: Array<string>;
  content: string;
  promulgation_date: Date;
  effective_date: Date;
  note: string;
  url: string;
}

export interface DummyLawRegister {
  id: number;
  law_type: string;
  explanation: string;
  registration_number: string;
  number_enactments: string;
}

export const dummyDocumentStore = defineStore({
  id: 'cart',
  state: () => ({
    rawItems: [] as DummyDoc[],
  }),
  getters: {
    items: (state): Array<DummyDoc> => {
        return [
          {
            id: 1,
            content:
              "គេហទំព័រនេះបានបញ្ចូលលិខិតបទដ្ឋានគតិយុត្តថ្មីបន្ថែម។ សូមចុច <a class='text-blue-500 cursor-pointer' href='/update-laws?query=1'>ទីនេះ</a>",
            type_text: "បច្ចុប្បន្នភាពលិខិតបទដ្ឋាន",
            type: 'bg-blue-600',
            date: new Date().getTime()/1000,
          },
          {
            id: 2,
            content:`
              គេហទំព័រនេះ កំពុងស្ថិតក្រោមស្ថានភាពកំពុងជួសជុល ថែទាំពីម៉ោង3:00រសៀល ថ្ងៃទី26 ខែមីនា ឆ្នាំ2024 ដល់ម៉ោង3:00រសៀល ថ្ងៃទី២៩ ខែមីនា ឆ្នាំ2024 ។
              `,
            type_text: "សំខាន់",
            type: 'bg-red-600',
            date: new Date().getTime() / 1000,
          },
          {
            id: 3,
            content:
              "សំគាល់  គេហទំព័រនេះបានធ្វើបច្ចុប្បន្នភាពនូវមុខងារមួយចំនួន។ សូមចុច <a class='text-blue-500 cursor-pointer' href='/update-laws?query=1'>ទីនេះ</a>",
            type_text: "សំគាល់",
            type: 'bg-gray-600',
            date: new Date().getTime() / 1000,
          }
        ];
    },
    sources: (): Array<DummySource> => {
      return [
        {
          key: "ព័ត៌មានអំពីលិខិតបទដ្ឋានគតិយុត្ត",
          list: [
            {
              id: 1,
              title: "លិខិតបទដ្ឋានគតិយុត្តដែលទើបបានធ្វើបច្ចុប្បន្នភាព",
              url: "/update-laws",
            },
            {
              id: 2,
              title: "តារាងបញ្ជីលិខិតបទដ្ឋានគតិយុត្តសរុបក្នុងគេហទំព័រ",
              url: "/laws-register",
            },
            // {
            //   id: 3,
            //   title: "List of newly enacted and unenforced laws and regulations",
            //   url: "#",
            // },
            // {
            //   id: 4,
            //   title: "List of abolished laws and regulations",
            //   url: "#",
            // },
            // {
            //   id: 5,
            //   title: "List of abbreviated legal names",
            //   url: "#",
            // }
          ]
        },
        {
          key: "អំពីគេហទំព័រនេះ",
          list: [
            {
              id: 6,
              title: `
                គេហទំព័រនេះចងក្រងទិន្នន័យផ្លូវការ ក្នុងគោលបំណងផ្តល់ភាពងាយស្រួលសម្រាប់ការស្រាវជ្រាវ គ្រប់គ្រងដោយក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់។ ទិន្នន័យទាំងអស់ រួមមាន គោលនយោបាយ ព្រះរាជក្រឹត្យ ក្រម ច្បាប់ អនុក្រឹត្យ ប្រកាស / ប្រកាសរួម សារាចរ / សារាចរណែនាំ សេចក្តីណែនាំ / សេចក្តីណែនាំរួម សេចក្តីសម្រេច បទបញ្ជា លិខិត សេចក្តីកំណត់ សេចក្តីប្រកាសព័ត៌មាន តាំងពីឆ្នាំ១៩៨៥ រហូតដល់ឆ្នាំ២០២៣។ ទិន្នន័យទាំងនេះ គឺជាច្បាប់ចម្លងទាំងស្រុងតាមច្បាប់ដើម ដោយ បណ្ឌិត ហាប់ ផល្ធី និងទទួលបានការឧបត្ថម្ភពី ធនាគារ វឌ្ឍនៈអាស៊ី ចំកាត់ (ABA)។ សូមផ្ទៀងផ្ទាត់ជាមួយរាជកិច្ចសម្រាប់ឯកសារផ្លូវការ។ ករណីមានកំហុសអក្ខរាវិរុទ្ធ សូមទំនាក់ទំនងមកកាន់តេលេក្រាម លេខទូរសព្ទ (097 526 90 72)
              `,
              url: "#",
            }
          ]
        },
        // {
        //   key: "Acquisition of legal data",
        //   list: [
        //     {
        //       id: 6,
        //       title: "XML bulk download",
        //       url: "#",
        //     },
        //     {
        //       id: 7,
        //       title: "Law API",
        //       url: "#",
        //     }
        //   ]
        // },
        // {
        //   key: "See other legal information",
        //   list: [
        //     {
        //       id: 8,
        //       title: "Bill submitted to the Diet",
        //       url: "#",
        //     },
        //     {
        //       id: 9,
        //       title: "Foreign language translation database of laws and regulations",
        //       url: "#",
        //     },
        //     {
        //       id: 10,
        //       title: "Japanese law index",
        //       url: "#",
        //     }
        //   ]
        // }
      ];
    },
    update_laws: (): Array<DummyUpdateLaw> => {
      return [
        {
          id: 1,
          status: ["Cabinet order"],
          content: "Cabinet Order on Administrative Expenses Granted to Municipalities Based on the National Pension Law (Cabinet Order No. 122 of 1960)",
          promulgation_date: new Date("1960-05-13"),
          effective_date: new Date("2020-03-13"),
          note: "revised by Cabinet Order No. 51 of 2020",
          url: "#",
        },
        {
          id: 2,
          status: ["Cabinet order"],
          content: "Cabinet Order Concerning Administrative Expenses Granted to Municipalities Based on the Act on the Payment of Special Disability Benefits to Persons with Specific Disabilities (Cabinet Order No. 149 of 2005)",
          promulgation_date: new Date("2005-04-01"),
          effective_date: new Date("2020-03-13"),
          note: "revised by Cabinet Order No. 51 of 2020",
          url: "#",
        },
        {
          id: 3,
          status: ["Ministerial ordinance", "Not yet implemented"],
          content: "Regulations for Enforcement of the Consumer Cooperative Law (Ministry of Finance, Justice Agency, Ministry of Health and Welfare, Ministry of Agriculture and Forestry Ordinance No. 1 of 1948)",
          promulgation_date: new Date("1945-09-30"),
          effective_date: new Date("2020-04-01"),
          note: "revised by Ministry of Health, Labor and Welfare Ordinance No. 39 of 2020",
          url: "#",
        },
        {
          id: 4,
          status: ["Ministerial ordinance"],
          content: "Ministerial Ordinance on Calculation of Administrative Expenses Subsidy for National Pension (Ministry of Health and Welfare Ordinance No. 6 of 1972)",
          promulgation_date: new Date("1960-03-13"),
          effective_date: new Date("2020-03-13"),
          note: "revised by Ministry of Health, Labor and Welfare Ordinance No. 42 of 2020",
          url: "#",
        }
      ];
    },
    laws_registers: (): Array<DummyLawRegister> => {
      return [
        {
          id: 1,
          law_type: '១',
          explanation: 'អនុក្រឹត្យស្តីពីការគ្រប់គ្រងប្រើប្រាស់ដីធ្លីកសិកម្ម ( Sub-decree on the Management of the Use of Agricultural Land)',
          registration_number: 'លេខ០៦អនក្រ, ០៦ ឧសភា ១៩៨៥ (No.06ANK, May 06, 1985)',
          number_enactments: ''
        },
        {
          id: 2,
          law_type: '២',
          explanation: 'សេចក្តីណែនាំស្តីពីការគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ (Instruction on the Management of State Property)',
          registration_number: 'សេចក្តីណែនាំ២២៤៦ឧសក/មក/បស, ២៤ សីហា ១៩៨៧ (No.2246OSK/ MK/BS, August 24, 1987)',
          number_enactments: ''
        },
        {
          id: 3,
          law_type: '៣',
          explanation: `សេចក្តីសម្រេចចិត្តស្តីពីគោលនយោបាយចំពោះកសិកររបស់បក្សប្រជាជនបដិវត្តកម្ពុជានៅមហាសន្និបាតកម្មាភិបាលទូទាំងប្រទេសលើកទី II (Decision on Policy for Farmers of Cambodian Revolutionary People’s Party at the Second General Assembly for Nationwide Comrade)`,
          registration_number: 'ខែមេសា ឆ្នាំ១៩៨៩ (April 1989)',
          number_enactments: ''
        },
        {
          id: 4,
          law_type: '៤',
          explanation: `សេចក្តីសម្រេចចិត្តស្តីពីគោលនយោបាយគ្រប់គ្រង និងប្រើប្រាស់ដីធ្លីរបស់បក្សប្រជាជនបដិវត្តកម្ពុជានៅមហាសន្និបាតកម្មាភិបាលទូទាំងប្រទេសលើកទី II (Decision on Policy for Land Management and Use of  Cambodian Revolutionary People’s Party at the Second General Assembly for Nationwide Comrade )`,
          registration_number: 'ខែមេសា ឆ្នាំ១៩៨៩ (April 1989)',
          number_enactments: ''
        },
        {
          id: 5,
          law_type: '៥',
          explanation: `សេចក្តីប្រកាសស្តីពីគោលនយោបាយប្រកបរបរផលិតកម្ម អាជីវកម្ម កសិកម្ម តាមរបៀបវេរប្រវាស់ដៃរបស់បក្សប្រជាជនបដិវត្តកម្ពុជានៅមហាសន្និបាតកម្មាភិបាលទូទាំងប្រទេសលើកទី II Proclamation on Policy for Production, Exploitation, Agriculture via Share Turn of Cambodian Revolutionary People’s Party at the Second General Assembly for Nationwide Comrade)`,
          registration_number: 'ខែមេសា ឆ្នាំ១៩៨៩ (April 1989)',
          number_enactments: ''
        },
        {
          id: 6,
          law_type: '៦',
          explanation: `អនុក្រឹត្យស្តីពីការផ្តល់កម្មសិទ្ធិលើផ្ទះជូនដល់ពលរដ្ឋកម្ពុជា (Sub-decree on Granting House Ownership to the Cambodian Citizens)`,
          registration_number: 'លេខ២៥អនក្រ, ២២ មេសា ១៩៨៩ (No.25ANK, April 22, 1989)',
          number_enactments: ''
        },
        {
          id: 7,
          law_type: '៧',
          explanation: `សេចក្តីណែនាំអនុវត្តគោលនយោបាយគ្រប់គ្រង និងប្រើប្រាស់ដីធ្លីរបស់ក្រុមប្រឹក្សារដ្ឋមន្ត្រី (Instruction on the Implementation of Land Use and Management Policy of Council of Ministers)`,
          registration_number: 'លេខ០៣សណន, ០៣ មិថុនា ១៩៨៩ (No.03SNN, June 03, 1989)',
          number_enactments: ''
        },
        {
          id: 8,
          law_type: '៨',
          explanation: `សារាចររបស់គណៈកម្មាធិការប្រជាជនរដ្ឋធានីភ្នំពេញស្តីពីការអនុវត្តអនុក្រឹត្យស្តីពីការផ្តល់កម្មសិទ្ធិលើផ្ទះជូនពលរដ្ឋកម្ពុជានៅរដ្ឋធានីភ្នំពេញ (Circular of Phnom Penh People’s Committee on the Implementation of Sub-decree on Granting House Ownership to Cambodian Citizens Living in Phnom Penh)`,
          registration_number: 'លេខ០៥សរច, ០៥ មិថុនា ១៩៨៩ (Circular No.05SRC, June 05, 1989)',
          number_enactments: ''
        },
        {
          id: 9,
          law_type: '៩',
          explanation: `ប្រកាសរបស់ក្រសួងកសិកម្មស្តីពីការប្រើប្រាស់ឯកសារពាក់ព័ន្ធនឹងដីធ្លី (Proclamation of Ministry of Agriculture on the Use of Land-Related Documents)`,
          registration_number: 'លេខ២៧៤៦ប្រក/កសក, ០២ សីហា ១៩៨៩ (No.2746PK/KSK, August 02, 1989)',
          number_enactments: ''
        },
        {
          id: 10,
          law_type: '១០',
          explanation: `ប្រកាសរួមរបស់ក្រសួងកសិកម្ម និងក្រសួងហិរញ្ញវត្ថុស្តីពីការកំណត់ប្រាក់ចំណូលពីការចេញឯកសារពាក់ព័ន្ធនឹងដីធ្លី (Joint Proclamation of Ministry of Agriculture and Ministry of Finance on the Determination of Revenue from Documents Relating to Land) `,
          registration_number: 'លេខ០០៦០ប្រក/កសក-០០១កហវ, ០៧ សីហា ១៩៨៩ (No.0060PK/KSK-001KHV, August 02, 1989) ',
          number_enactments: ''
        },
        {
          id: 11,
          law_type: '១១',
          explanation: `លិខិតរបស់ក្រសួងកសិកម្មស្តីពីការប្រើប្រាស់ឯកសារពាក់ព័ន្ធនឹងដីធ្លី, លេខ៣៨៥៦ កសក/ម/រប (Letter of Ministry of Agriculture on the Use of Documents Relating to Land)`,
          registration_number: 'លេខ៣៨៥៦ កសក/ម/រប, ៣០ តុលា ១៩៨៩ (No.3856KSK/M/RB, October 30, 1989) ',
          number_enactments: ''
        },
        {
          id: 12,
          law_type: '១២',
          explanation: `ប្រកាសរបស់ក្រសួងកសិកម្មស្តីពីការតែងតាំង និងសកម្មភាពនាយកដ្ឋានសុរិយោដី, លេខ១១១ប្រក/កសក (Proclamation of Ministry of Agriculture on the Appointment and Activity of the Department of Cadastre)`,
          registration_number: 'លេខ១១១ប្រក/កសក, ៣១ តុលា ១៩៨៩  (No.111PK/KSK, October 31, 1989)',
          number_enactments: ''
        },
        {
          id: 13,
          law_type: '១៣',
          explanation: `លិខិតរបស់ខុទ្ទកាល័យក្រុមប្រឹក្សារដ្ឋមន្ត្រីស្តីពីករណីសំណើសុំអនុញ្ញាតពន្យារពេល ទទួលពាក្យស្នើសុំកាន់កាប់ដីធ្លី​ (Letter of the Office of the Council of Ministers on the Request to Delay the Acceptance of Land Applications) `,
          registration_number: 'លេខ៩៤សជណ/កស, ១៧ មករា ១៩៩០ (No.94SCN/KS, January 17, 1990)',
          number_enactments: ''
        },
        {
          id: 14,
          law_type: '១៤',
          explanation: `សារាចររបស់ក្រុមប្រឹក្សារដ្ឋមន្ត្រីស្តីពីការគ្រប់គ្រងគេហដ្ឋាន ដីធ្លីដែលជួលឱ្យអង្គការអន្តរជាតិ ក្រុមហ៊ុន ឬជនបរទេស(Circular of Council of Ministers on the Management of Residences and Land Leased to International Organizations, or Foreign Companies or Foreigners)`,
          registration_number: 'លេខ០១សរ, ១៨ មករា ១៩៩០ (No.01SR, January 18, 1990) ',
          number_enactments: ''
        },
        {
          id: 15,
          law_type: '១៥',
          explanation: `លិខិតរបស់ក្រសួងកសិកម្មស្តីពីការពន្យារពេលទទួលពាក្យស្នើសុំកាន់កាប់ដីធ្លី (Letter of Ministry of Agriculture on the Delay of Acceptance of Land Applications)`,
          registration_number: 'លេខ៤៨៥កសក/ម/រប, ២៩ មករា ១៩៩០ (No.485KSK/M/RB, January 29, 1990)',
          number_enactments: ''
        },
        {
          id: 16,
          law_type: '១៦',
          explanation: `សារាចរណែនាំរបស់ក្រសួងកសិកម្មស្តីពីគោលនយោបាយគ្រប់គ្រង និងប្រើប្រាស់ដីធ្លី (Instructive Circula of Ministry of Agriculture on the Policy of Land Administration and Use)`,
          registration_number: 'លេខ១៣១កសក/សរណន, ១០ មេសា ១៩៩០ (No.131 KSK/SRNN, April 10, 1990)',
          number_enactments: ''
        },
        {
          id: 17,
          law_type: '១៧',
          explanation: `សេចក្តីជូនដំណឹងរបស់ក្រសួងកសិកម្មស្តីពីការទទួលពាក្យស្នើសុំកាន់កាប់ដីធ្លី និងវិធានការអនុវត្តបន្ត (Notification of Ministry of Agriculture on the Acceptance of Land Applications and Subsequent Measures)`,
          registration_number: 'លេខ៣៤៥១កសក/សជណ, ២១ កក្កដា ១៩៩០ (No.3451KSK/SCN, July 21, 1990)',
          number_enactments: ''
        },
        {
          id: 18,
          law_type: '១៨',
          explanation: `ប្រកាសរួមរបស់ក្រសួងកសិកម្ម និងក្រសួងហិរញ្ញវត្ថុស្តីពីការកំណត់ប្រាក់ចំណូលពីការចេញឯកសារពាក់ព័ន្ធនឹងដីធ្លី (Joint Proclamation of Ministry of Agriculture and Ministry of Finance on the Determination of Revenue from Documents Relating to Land) `,
          registration_number: 'លេខ៣៥៤ប្រក/កសក-០១២កហវ, ១៨ តុលា ១៩៩០ (No.354PK/KSK-012KHV, October 18, 1990) ',
          number_enactments: ''
        },
        {
          id: 19,
          law_type: '១៩',
          explanation: `សេចក្តីណែនាំរួមរបស់ក្រសួងកសិកម្ម និងក្រសួងហិរញ្ញវត្ថុបន្ថែមលើការអនុវត្តប្រកាសរួមលេខ០០៦០ប្រក/កសក-០០១កហវ និងលេខ៣៥៤ប្រក/កសក-០១២កហវ ((Joint Instruction of Ministry of Agriculture and Ministry of Finance in Addition to the Implementation of Joint Circular No. 0060PK/KSK-001KHV and No.354 PK/KSK-012KHV)`,
          registration_number: 'លេខ៣៥៥កសក/សណន-០០៧កហវ, ១៨ តុលា ១៩៩០ (No.355KSK/SNN-007KHV, October 18, 1990) ',
          number_enactments: ''
        },
        {
          id: 20,
          law_type: '២០',
          explanation: `សេចក្តីណែនាំរបស់ក្រុមប្រឹក្សារដ្ឋមន្ត្រីស្តីពីការកែសម្រួលសេចក្តីណែនាំលេខ០៣សណន ចុះថ្ងៃទី០៣ ខែមិថុនា ឆ្នាំ១៩៨៩ របស់ក្រុមប្រឹក្សារដ្ឋមន្ត្រី (Instruction of Council of Ministers on the Amendment of Instruction No.03SNN dated June 03, 1989 of the Council of Ministers)`,
          registration_number: 'លេខ០៣សណន, ០៨ ធ្នូ ១៩៩០ (No.03SNN, December 08, 1990)',
          number_enactments: ''
        },
        {
          id: 21,
          law_type: '២១',
          explanation: `សារាចររបស់គណៈកម្មាធិការប្រជាជនរដ្ឋធានីភ្នំពេញស្តីពីការផ្តល់កម្មសិទ្ធិ និងលក់ផ្ទះសំបែងជូនពលរដ្ឋក្នុងរដ្ឋធានីភ្នំពេញ (Circular of Phnom Penh People’s Committee on Ownership Grants and Sale of House to People Living in Phnom Penh)`,
          registration_number: 'លេខ០២សរ, ០៧ កុម្ភៈ ១៩៩១ (No.02SR, February 07, 1991) ',
          number_enactments: ''
        },
        {
          id: 22,
          law_type: '២២',
          explanation: `ច្បាប់ស្តីពីការបង្កើតពន្ធប្រថាប់ត្រា (Law on the Establishment of the Stamp Duties)`,
          registration_number: 'លេខ២១ក្រ, ១៥ កុម្ភៈ ១៩៩១ (No.21K, February 15, 1991) ',
          number_enactments: ''
        },
        {
          id: 23,
          law_type: '២៣',
          explanation: `លិខិតរបស់ខុទ្ទកាល័យមជ្ឈិមបក្សប្រជាជនបដិវត្តកម្ពុជាស្តីពីករណីលុបវិភាគទាន ស្នេហាជាតិដោយឱ្យបង្កើតពន្ធដីជំនួសវិញ (Letter of Central Cabinet of Cambodian People Revolutionary’s Party of on Abolishing Patriotic Contribution by Creating Land Taxation Instead)`,
          registration_number: 'លេខ០៥៧ដ/ខបប, ២៣ កុម្ភៈ ១៩៩១ (No.057D /KhBB, February 23, 1991)',
          number_enactments: ''
        },
        {
          id: 24,
          law_type: '២៤',
          explanation: `សេចក្តីណែនាំរបស់នាយកដ្ឋានសុរិយោដីស្តីពីការចេញប័ណ្ណសម្គាល់សិទ្ធិកាន់កាប់ប្រើប្រាស់ដីធ្លី និងការកសាងឯកសារពាក់ព័ន្ធ (Instruction of Department of Cadastre on the Issuance of Titles of Land Possession and Establishment of Related Documents)`,
          registration_number: 'លេខ១១៦សដ/សណន, ១១ មេសា ១៩៩១ (No.116SD/SNN, April 11, 1991) ',
          number_enactments: ''
        },
        {
          id: 25,
          law_type: '២៥',
          explanation: `អនុក្រឹត្យស្តីពីការប្រមូលពន្ធប្រថាប់ត្រា (Sub-decree on the Collection of the Stamp duties)`,
          registration_number: 'លេខ២០អនក្រ, ២១ កញ្ញា ១៩៩១ (No.20ANK, September 21, 1991)',
          number_enactments: ''
        },
        {
          id: 26,
          law_type: '២៦',
          explanation: `សេចក្តីជូនដំណឹងរបស់ក្រុមប្រឹក្សារដ្ឋមន្ត្រី (Notification from the Council of Ministers)`,
          registration_number: 'លេខ១៥៤សជណ, ២៦ តុលា ១៩៩១ (No.154SCN, October 26, 1991)',
          number_enactments: ''
        },
        {
          id: 27,
          law_type: '២៧',
          explanation: `ប្រកាសស្តីពីការណែនាំអនុវត្តអនុក្រឹត្យស្តីពីការប្រមូលពន្ធប្រថាប់ត្រា (Proclamation on the Implementation Instruction of Sub-decree on the Collection of the Stamp Duties)`,
          registration_number: 'លេខ០០៧ប្រក/កហវ, ០២ មករា ១៩៩២ (No.007PK/KHV, January 02, 1992)',
          number_enactments: ''
        },
        {
          id: 28,
          law_type: '២៨',
          explanation: `លិខិតរបស់ក្រសួងកសិកម្មស្តីពីសំណើសុំកាត់បន្ថយបែបបទខ្លះនៃការចុះបញ្ជិកាជំហាន I សុរិយោដី (Letter of Ministry of Agriculture on the Request to Reduce Some Forms of Registration Step 1 Cadastre)`,
          registration_number: 'លេខ៥០៤កសក, ០៨ កុម្ភៈ ១៩៩២ (No.504KSK, February 08, 1992) ',
          number_enactments: ''
        },
        {
          id: 29,
          law_type: '២៩',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីស្តីពីសេចក្តីណែនាំរបៀបរបបចុះលេខាចារឹក (Letter of the Department of Cadastre on the Registration Method)`,
          registration_number: 'លេខ០៨៣សដ, ១៧ មីនា ១៩៩២ (No.083SD, March 17, 1992) ',
          number_enactments: ''
        },
        {
          id: 30,
          law_type: '៣០',
          explanation: `សេចក្តីណែនាំរបស់នាយកដ្ឋានសុរិយោដីស្តីពីការកំណត់ប្រភេទទ្រព្យក្នុងការកសាង ឯកសារផ្សេងៗពាក់ព័ន្ធនឹងអចលនវត្ថុ (Instruction of the Department of Cadastre on the Determination of Property Types for Establishing Documents Relating to Immovable Property)`,
          registration_number: 'លេខ០៨៤សដ/សណន, ១៧ មីនា ១៩៩២ (No.084SD/SNN, March 17, 1992)',
          number_enactments: ''
        },
        {
          id: 31,
          law_type: '៣១',
          explanation: `សារទូរលេខរបស់ក្រសួងកសិកម្មស្តីពីការជំរុញការងារអង្កេតវាស់វែង និងផ្តល់ប័ណ្ណសម្គាល់សិទ្ធិកាន់កាប់ដីធ្លី (Telegram of Ministry of Agriculture on the Push of Survey and the Grant of Land Possession Titles)`,
          registration_number: 'លេខ១១៣១កសក/ម/សរ, ២៦ មីនា ១៩៩២ (No.1131KSK/M/SR, March 26 1992) ',
          number_enactments: ''
        },
        {
          id: 32,
          law_type: '៣២',
          explanation: `ប្រកាសរបស់ក្រសួងកសិកម្មស្តីពីការអនុញ្ញាតឱ្យជំនាញសុរិយោដីប្រើប្រាស់លិខិតសញ្ញា ពាក់ព័ន្ធនឹងការផ្ទេរអចលនវត្ថុ (Proclamation of Ministry of Agriculture on the Authorization to Use Conventional Act Relating to the Transfer of Property)`,
          registration_number: 'លេខ២៩៦ប្រក/កសក/មរស, ០៩ មិថុនា ១៩៩២ (No.296PK/KSK/ MRS, June 09, 1992)',
          number_enactments: ''
        },
        {
          id: 33,
          law_type: '៣៣',
          explanation: `សេចក្តីណែនាំរបស់ក្រសួងកសិកម្មស្តីពីចលនានៃលិខិតសញ្ញាក្នុងការផ្ទេរអចលនវត្ថុ (Instruction of Ministry of Agriculture on Movement of Conventional Act in Regard to Immovable Transfer)`,
          registration_number: 'លេខ១៧០សដ/សណន, ០៧ កក្កដា ១៩៩២ (No170SD/SNN, July 07, 1992) ',
          number_enactments: ''
        },
        {
          id: 34,
          law_type: '៣៤',
          explanation: `ច្បាប់ភូមិបាល (Land Law)`,
          registration_number: 'លេខ១០០ក្រ, ១៣ តុលា ១៩៩២ (No.100K, October 13, 1992) ',
          number_enactments: ''
        },
        {
          id: 35,
          law_type: '៣៥',
          explanation: `សារាចរណែនាំរបស់ក្រុមប្រឹក្សារដ្ឋមន្ត្រីស្តីពីវិធានការចំពោះសកម្មភាពរំលោភយកដីសាធារណៈ (Instructive Circular of Council Ministers on the Measure toward the Public Land Grabbing Activities)`,
          registration_number: 'លេខ០៣សរណន, ១៤ ធ្នូ ១៩៩២ (No.03SRNN, December 14, 1992)',
          number_enactments: ''
        },
        {
          id: 36,
          law_type: '៣៦',
          explanation: `សេចក្តីសម្រេចស្តីពីការកំណត់សមត្ថកិច្ចលើបច្ចេកទេសវាស់វែង  (Decision on the Determination of the Competence of Survey Technique)`,
          registration_number: 'លេខ០០៤សសរ/ កសក, ០៦ មករា ១៩៩៣ (No.004SSR/KSK, January 06, 1993)',
          number_enactments: ''
        },
        {
          id: 37,
          law_type: '៣៧',
          explanation: `ច្បាប់ស្តីពីការបែងចែកទ្រព្យសម្បត្តិ (Law on the Division of Property)`,
          registration_number: 'លេខ០៩ក្រ, ០៨ កុម្ភៈ ១៩៩៣ (No.09 K, February 08, 1993) ',
          number_enactments: ''
        },
        {
          id: 38,
          law_type: '៣៨',
          explanation: `សារាចររបស់រដ្ឋាភិបាលជាតិបណ្តោះអាសន្នកម្ពុជាស្តីពីកម្មសិទ្ធិស្របច្បាប់របស់ប្រជា-ពលរដ្ឋបច្ចុប្បន្ន និងកម្មសិទ្ធិសាធារណៈ (Circular of Provisional Government of Cambodia on the Current Legal Public and Private Ownership)`,
          registration_number: 'លេខ០១សរ, ០៣ កក្កដា ១៩៩៣ (No.01SR, July 03, 1993) ',
          number_enactments: ''
        },
        {
          id: 39,
          law_type: '៣៩',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីអំពីសភាពការណ៍ស្តីពីបញ្ហាដីធ្លី (Letter of the Department of Cadastre about the Situation on Land Issues)`,
          registration_number: 'លេខ១៦៦សដ, ១៦ សីហា ១៩៩៣ (No.166SD, August 16, 1993) ',
          number_enactments: ''
        },
        {
          id: 40,
          law_type: '៤០',
          explanation: `ព្រះរាជក្រឹត្យស្តីពីការបង្កើតតំបន់ការពារធម្មជាតិ (Royal Decree on the Creation of Natural Protected Areas)`,
          registration_number: '០១ វិច្ឆិកា ១៩៩៣ (dated November 01, 1993) ',
          number_enactments: ''
        },
        {
          id: 41,
          law_type: '៤១',
          explanation: `លិខិតរបស់ក្រសួងយុត្តិធម៌ស្តីពីការដោះស្រាយវិវាទរដ្ឋបាល (Letter of Ministry of Justice on Administrative Dispute Resolutions)`,
          registration_number: 'លេខ២៤៧សច/តុលាការ/៩៤, ០១ កុម្ភៈ ១៩៩៤ (No.247SC/Court/94, February 01, 1994) ',
          number_enactments: ''
        },
        {
          id: 42,
          law_type: '៤២',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីអំពីការណែនាំស្តីពីការបញ្ជាក់បន្ទុកពាក់ព័ន្ធនឹងការបញ្ចាំចលនវត្ថុ និងការធ្វើលេខាចារឹក (Letter of the Department of Cadastre about Instruction on Certification of Encumbrance Relating to Antichresis and Registration)`,
          registration_number: 'លេខ១៦២សដ/សណន, ០២ សីហា ១៩៩៤ (No.162SK/SNN, August 02, 1994)',
          number_enactments: ''
        },
        {
          id: 43,
          law_type: '៤៣',
          explanation: `ច្បាប់ស្តីពីការរៀបចំទឹកដី នគរូបនីយកម្ម និងសំណង់ (Law on Land Management, Urban Planning and Construction)`,
          registration_number: 'លេខ០៤/នស/៩៤, ១០ សីហា ១៩៩៤ No.04/NS/94, August 10, 1994)',
          number_enactments: ''
        },
        {
          id: 44,
          law_type: '៤៤',
          explanation: `លិខិតរបស់ទីស្តីការគណៈរដ្ឋមន្ត្រីស្តីពីករណីសុំពិនិត្យ និងកែសម្រួលឯកសារពាក់ព័ន្ធនឹងដីធ្លី (Letter of the Council of Ministers on the Request of the Examination and Revision of the Documents Relating to Land)`,
          registration_number: 'លេខ១៦២៣សជណ/កស, ០៧ កញ្ញា ១៩៩៤ (No.1623SCN/KS, September 07, 1994) ',
          number_enactments: ''
        },
        {
          id: 45,
          law_type: '៤៥',
          explanation: `បែបបទនៃការបំពេញប័ណ្ណសម្គាល់សិទ្ធិកាន់កាប់អចលនវត្ថុ “ប័ណ្ណថ្មី” របស់នាយកដ្ឋាន សុរិយោដី (The Form for Filling Titles of Immovable Property “New Titles” of the Department of Cadastre)`,
          registration_number: '០៧ កញ្ញា ១៩៩៤ (September 07, 1994) ',
          number_enactments: ''
        },
        {
          id: 46,
          law_type: '៤៦',
          explanation: `អនុក្រឹត្យស្តីពីការផ្តល់សិទ្ធិចុះហត្ថលេខាលើប្លង់ដីកម្មសិទ្ធិ ការផ្ទេរកម្មសិទ្ធិ និងអាជ្ញា-ប័ណ្ណសាងសង់អគារក្នុងរាជធានីភ្នំពេញ (Sub-decree on the Delegation of the Authority to Sign on Land Ownership, Transfer of Land Ownership, and Building Construction in Phnom Penh)`,
          registration_number: 'លេខ៥៧អនក្រ, ២៩ កញ្ញា ១៩៩៤ (No.57ANK, September 29, 1994)',
          number_enactments: ''
        },
        {
          id: 47,
          law_type: '៤៧',
          explanation: `អនុក្រឹត្យស្តីពីការផ្ទេរនាយកដ្ឋានសុរិយោដីនៃក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ  ស្ថិតនៅក្រោមការគ្រប់គ្រងរបស់ទីស្តីការគណៈរដ្ឋមន្ត្រី (Sub-decree on the Transfer of the Department of Cadastre of the Ministry of Agriculture, Forestry and Fisheries to be under the Supervision of the Office of the Council of Ministers)`,
          registration_number: 'លេខ៥៨អនក្រ, ០៣ តុលា ១៩៩៤ (No.58ANK, October 03, 1994)',
          number_enactments: ''
        },
        {
          id: 48,
          law_type: '៤៨',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីអំពីសេចក្តីណែនាំស្តីពីការអនុវត្តតាមស្មារតីអង្គប្រជុំបូកសរុបការងារសុរិយោដីទូទាំងប្រទេស (Letter of the Department of Cadastre about the Instruction on the Implementation of the Spirit of the Meeting Concluding Nationwide Cadastral Work)`,
          registration_number: 'លេខ០០៤សដ, ១២ មករា ១៩៩៥  (No.004, January 12, 1995) ',
          number_enactments: ''
        },
        {
          id: 49,
          law_type: '៤៩',
          explanation: `សារាចររបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុស្តីពីការធ្វើកម្មសិទ្ធិលើទ្រព្យសម្បត្តិរដ្ឋ (ដីធ្លី និងអគារ) (Circular of Ministry of Economy and Finance on the Identification of Ownership over State Property (Land and Buildings)`,
          registration_number: 'លេខ០០៣សរ/សហវ/ទរ, ១៤ មករា ១៩៩៥ (), No.003SR/SHV/TR, January 14, 1995) ',
          number_enactments: ''
        },
        {
          id: 50,
          law_type: '៥០',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីអំពីការផ្តល់របាយការណ៍ស្តីពីការជម្រះបញ្ជីឯកសារចាស់ (Letter of the Department of Cadastre about the Submission of the Report on the Satisfaction of Old Documents)`,
          registration_number: 'លេខ០៣២សដ, ២១ កុម្ភៈ ១៩៩៥ (No.032SD, February 21, 1995) ',
          number_enactments: ''
        },
        {
          id: 51,
          law_type: '៥១',
          explanation: `សេចក្តីជូនដំណឹងរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុស្តីពីបទប្បញ្ញត្តិទាំងឡាយស្តីពីពន្ធ និងអាករដែលប្រមូលដោយអង្គការពន្ធ (Notification of Ministry of Economy and Finance on the Provisions on Taxes and Imposts Collected by Taxation Units)`,
          registration_number: 'លេខ០០៥សជណ/សហវ/ពដ, ២៥ កុម្ភៈ ១៩៩៥ No.005 SCN/SHV/BD, February 25, 1995)',
          number_enactments: ''
        },
        {
          id: 52,
          law_type: '៥២',
          explanation: `សារាចរអន្តរក្រសួងរបស់ក្រសួងមហាផ្ទៃ និងក្រសួងយុត្តិធម៌ស្តីពីសមត្ថកិច្ច និងទំនាក់ទំនងការងាររវាងអភិបាលខេត្ត-ក្រុង ជាមួយប្រធានតុលាការ និងព្រះរាជអាជ្ញាអមតុលា-ការខេត្ត-ក្រុង (Joint Circular of Ministry of Interior and Ministry of Justice on Competency and Work Relations between Provincial/Municipal Governors with Court Chiefs and Provincial/ Municipal Prosecutors)`,
          registration_number: 'លេខ២០៤សរ/៩៥, ០២ មីនា ១៩៩៥ (No.204SR/95, March 02, 1995) ',
          number_enactments: ''
        },
        {
          id: 53,
          law_type: '៥៣',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីអំពីការកំណត់អក្សរសម្គាល់លេខប័ណ្ណសម្គាល់សិទ្ធិកាន់កាប់អចលនវត្ថុតាមបណ្តាខេត្ត-ក្រុង (Letter of the Department of Cadastre on the Determination of Letters Identifying the Number of a Title of Immovable Property in Provinces-Municipalities)`,
          registration_number: 'លេខ០៥៣សដ, ១១ មេសា ១៩៩៥ (No.053SD, April 11, 1995) ',
          number_enactments: ''
        },
        {
          id: 54,
          law_type: '៥៤',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីអំពីករណីយឺតយ៉ាវក្នុងការផ្តល់របាយការណ៍ស្តីពីការជម្រះបញ្ជីឯកសារចាស់ (Letter of the Department of Cadastre about the Slowness in Submitting the Report on the Satisfaction of Old Documents)`,
          registration_number: 'លេខ០៥៧សដ, ២៤ មេសា ១៩៩៥ (No.057SD, April 24, 1995)',
          number_enactments: ''
        },
        {
          id: 55,
          law_type: '៥៥',
          explanation: `លិខិតរបស់សម្តេចនាយករដ្ឋមន្ត្រីទី១ផ្ញើជូនសម្តេចនាយករដ្ឋមន្ត្រីទី២ស្នើឱ្យការសុំកាន់កាប់ដីធ្លីឆ្លងកាត់ទីស្តីការគណៈរដ្ឋមន្ត្រី (Letter of the First Prime Minister to the Second Prime Minister Requested that the Applications of Land Possession should be Passed to the Office of Council of Ministers)`,
          registration_number: 'លេខ៩១៨ខុទ្ទ/៩៥, ១៦ មិថុនា ១៩៩៥ (No.918KhT/94, June 16, 1995) ',
          number_enactments: ''
        },
        {
          id: 56,
          law_type: '៥៦',
          explanation: `លិខិតរបស់សម្តេចនាយករដ្ឋមន្ត្រីទី២ ផ្ញើតបសម្តេចនាយករដ្ឋមន្ត្រីទី១ អំពីការយល់ព្រមលិខិតលេខ៩១៨ខុទ្ទ/៩៥ ចុះថ្ងៃទី១៦ ខែមិថុនា ឆ្នាំ១៩៩៥ (Letter of the Second Prime Minister to the First Prime Minister on Agreeing with Letter No.918KhT dated June 16, 1995)`,
          registration_number: 'លេខ៩៧ខ២/៩៥, ២២ មិថុនា ១៩៩៥ (No.97Kh/2-95, June 22, 1995) ',
          number_enactments: ''
        },
        {
          id: 57,
          law_type: '៥៧',
          explanation: `អនុក្រឹត្យស្តីពីការប្រកាសទ្រព្យសម្បត្តិរដ្ឋ (Sub-decree on the Declaration of State Property)`,
          registration_number: 'លេខ៥៣អនក្រ/បក, ២៧ មិថុនា ១៩៩៥ (No.53ANK/BK, June 27, 1995)',
          number_enactments: ''
        },
        {
          id: 58,
          law_type: '៥៨',
          explanation: `លិខិតរបស់គណៈរដ្ឋមន្ត្រីស្តីពីករណីបញ្ហាទំនាស់កម្មសិទ្ធិដីធ្លីរវាងអាជ្ញាធរ និងប្រជារាស្ត្រ(Letter of the Council of Ministers on the Land Conflict Issues between Authorities and People)`,
          registration_number: 'លេខ១០៥២សជណ/សរ, ០៥ កក្កដា ១៩៩៥ (No.1052SCN/SR, July 05, 1995) ',
          number_enactments: ''
        },
        {
          id: 59,
          law_type: '៥៩',
          explanation: `អនុក្រឹត្យស្តីពីការបង្កើតគណៈកម្មការវាយតម្លៃដីធ្លីមិនបានប្រើប្រាស់ (Sub-decree on the Establishment of Unused Land Evaluation Committee)`,
          registration_number: 'លេខ៥៨អនក្រ, ២៥ កក្កដា ១៩៩៥ (No.58ANK, July 25, 1995) ',
          number_enactments: ''
        },
        {
          id: 60,
          law_type: '៦០',
          explanation: `លិខិតរបស់ក្រសួងយុត្តិធម៌អំពីការអនុវត្តអនុក្រឹត្យលេខ២៥អនក្រ ចុះថ្ងៃទី២២ ខែមេសា ឆ្នាំ១៩៨៩ ស្តីពីការផ្តល់កម្មសិទ្ធិលើផ្ទះជូនពលរដ្ឋកម្ពុជា (Letter of Ministry of Justice about the Implementation of Sub-decree No.25ANK dated April 22, 1989 on Granting House Ownership to the Cambodian Citizens)`,
          registration_number: 'លេខ៧៣៣សរច/រវ/៩៥, ២៥ កក្កដា ១៩៩៥ (No.733SRC/RV/95, July 25, 1995) ',
          number_enactments: ''
        },
        {
          id: 61,
          law_type: '៦១',
          explanation: `លិខិតរបស់ក្រសួងបរិស្ថានស្តីពីបញ្ហាកម្មសិទ្ធិដីធ្លីក្នុងតំបន់ការពារធម្មជាតិ (Letter of Ministry of Environment on Land Ownership Issues in Natural Protected Areas)`,
          registration_number: 'លេខ១៧១៩បស្ថ, ១៤ កញ្ញា ១៩៩៥ (No.1719BSt, September 14, 1995)',
          number_enactments: ''
        },
        {
          id: 62,
          law_type: '៦២',
          explanation: `លិខិតរបស់ប្រធាននាយកដ្ឋានសុរិយោដីស្តីពីការកាន់កាប់សៀវភៅចុះបញ្ជីអចលនវត្ថុ​(Letter of the Department of Cadastre on the Management of Immovable Register)`,
          registration_number: 'លេខ១៧៨សដ, ២២ វិច្ឆិកា ១៩៩៥ (No.178SD, November 22, 1995)',
          number_enactments: ''
        },
        {
          id: 63,
          law_type: '៦៣',
          explanation: `សារាចរស្តីពីការរៀបចំធ្វើគម្រោងប្លង់គោលនៅតាមខេត្ត-ក្រុង ទូទាំងព្រះរាជាណាចក្រកម្ពុជា(Circular on the Preparation of Master Plan in the Provinces and Municipalities Throughout the Kingdom of Cambodia)`,
          registration_number: 'លេខ០២សរ, ១៥ មករា ១៩៩៦(Circular No.02SR, January 15, 1996)',
          number_enactments: ''
        },
        {
          id: 64,
          law_type: '៦៤',
          explanation: `លិខិតរបស់ប្រធាននាយកដ្ឋានសុរិយោដី ផ្ញើជូនគ្រប់ការិយាល័យសុរិយោដីខេត្ត-ក្រុងស្តីពីការគ្រប់គ្រងឯកសារសុរិយោដី(Letter of Chief of the Department of Cadastre to all Provincial-municipal Cadastral Offices on the Management of Cadastral Documents)`,
          registration_number: 'លេខ០៥០សដ, ២១ មីនា ១៩៩៦ (No.050SD, March 21, 1996)',
          number_enactments: ''
        },
        {
          id: 65,
          law_type: '៦៥',
          explanation: `ប្រកាសរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុស្តីពីការប្រមូលពន្ធលើដីធ្លីមិនបានប្រើប្រាស់(Proclamation of the Ministry of Economy and Finance on the Collection of Tax on Unused Land)`,
          registration_number: 'លេខ២២៤ប្រក/សហវ/ពដ, ០៥ កក្កដា ១៩៩៦(No.224/PK/SHV/ BD, July 05, 1996)',
          number_enactments: ''
        },
        {
          id: 66,
          law_type: '៦៦',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីស្តីពីការទទួលខុសត្រូវលើលិខិតសញ្ញាផ្ទេរសិទ្ធិរបស់ប្រធានការិយាល័យសុរិយោដីខេត្តក្រុង និងប្រធានការិយាល័យភូមិបាលស្រុកខណ្ឌ(Letter of the Department of Cadastre on the Accountability of the Chief of Provincial-Municipal Cadastral Office and the Chief of District Land Bureau  toward Conventional Act in Regard to Ownership Transfer)`,
          registration_number: 'លេខ១២៧សដ, ៣១ កក្កដា ១៩៩៦ (No.127SD, July 31, 1996) ',
          number_enactments: ''
        },
        {
          id: 67,
          law_type: '៦៧',
          explanation: `លិខិតរបស់ក្រសួងសាធារណការ និងដឹកជញ្ជូនស្តីពីការសុំកំណត់ដីបម្រុងផ្លូវគ្រប់ប្រភេទទូទាំងព្រះរាជាណាចក្រកម្ពុជា (Letter of Ministry of Public Affairs and Transportation on the Request to Determine the Reserved Land for all Types of Roads Throughout the Kingdom of Cambodia)`,
          registration_number: ' លេខ២០២១សក/៤, ០៧ សីហា ១៩៩៦ (No.2021SK/4, August 07, 1996) ',
          number_enactments: ''
        },
        {
          id: 68,
          law_type: '៦៨',
          explanation: `លិខិតរបស់ក្រសួងបរិស្ថានស្តីពីករណីកំណត់ដីបម្រុងឧទ្យានជាតិ ដីបម្រុងផ្លូវគ្រប់ប្រភេទដីបម្រុងរុក្ខានេសាទទូទាំងព្រះរាជាណាចក្រកម្ពុជា (Letter of Ministry of Environment on the Determination of Reserved Land for National Parks, Reserved Land for All Types of Roads, Reserved Land for Forestry-Fishery Throughout the Kingdom of Cambodia)`,
          registration_number: 'លេខ១៤៩៤បស្ថ, ១២ កញ្ញា ១៩៩៦ (No.1494BSt, September 12, 1996)',
          number_enactments: ''
        },
        {
          id: 69,
          law_type: '៦៩',
          explanation: `ច្បាប់ស្តីពីកិច្ចការពារបរិស្ថាន និងការគ្រប់គ្រងធនធានធម្មជាតិ (Law on the Environmental Protection and Natural Resource Management)`,
          registration_number: 'នស/រកម/១២៩៦/៣៦, ២៤ ធ្នូ ១៩៩៦ (NS/RKM/1296/36, December 24, 1996)',
          number_enactments: ''
        },
        {
          id: 70,
          law_type: '៧០',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីស្តីពីការទទួលខុសត្រូវក្នុងការពិនិត្យឯកសារសុរិយោដី (Letter of the Department of Cadastre on the Accountability toward the Examination of Cadastral Documents)`,
          registration_number: 'លេខ១៤៦សដ, ១៣ ឧសភា ១៩៩៧ (No.146SD, May 13, 1997) ',
          number_enactments: '១៩៩៧'
        },
        {
          id: 71,
          law_type: '៧១',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីស្តីពីករណីបដិសេធប័ណ្ណសម្គាល់សិទ្ធិកាន់កាប់ប្រើប្រាស់ដីធ្លី ឬប័ណ្ណសម្គាល់សិទ្ធិកាន់កាប់អចលនវត្ថុ (Letter of the Department of Cadastre on the Refusal of Titles of Land Possession or Titles of Immovable Property)`,
          registration_number: ' លេខ១៥៧សដ, ១២ មិថុនា ១៩៩៧ (No.157SD, June 12, 1997)',
          number_enactments: ''
        },
        {
          id: 72,
          law_type: '៧២',
          explanation: `លិខិតរបស់នាយកដ្ឋានសុរិយោដីស្តីពីការបាត់បង់ និងខូចខាតឯកសារជំនាញ និងសម្ភារៈប្រើប្រាស់ផ្សេងៗ (Letter of the Department of Cadastre on the Loss and Damage of Technical Documents and Other Materials)`,
          registration_number: 'លេខ១៩២សដ, ១៩ សីហា ១៩៩៧ (No.192SD, August 19, 1997)',
          number_enactments: ''
        },
        {
          id: 73,
          law_type: '៧៣',
          explanation: `អនុក្រឹត្យស្តីពីការរៀបចំ និងការប្រព្រឹត្តទៅនៃគណៈកម្មាធិការជាតិរៀបចំទឹកដី នគរូបនីយកម្ម និងសំណង់ (Sub-decree on the Organization and Functioning of the National Commission for Land Management, Urban Planning, and Construction)`,
          registration_number: 'លេខ៨៧អនក្រ/បក, ១៨ ធ្នូ ១៩៩៧ (No.87ANK/BK, December 18, 1997)',
          number_enactments: ''
        },
        {
          id: 74,
          law_type: '៧៤',
          explanation: `អនុក្រឹត្យស្តីពីលិខិតអនុញ្ញាតសាងសង់ (Sub-decree on Construction Permits)`,
          registration_number: 'លេខ៨៦អនក្រ/បក, ១៩ ធ្នូ ១៩៩៧ (No.86ANK/BK, December 19, 1997)',
          number_enactments: ''
        },
        {
          id: 75,
          law_type: '៧៥',
          explanation: `លេខ៨៦អនក្រ/បក, ១៩ ធ្នូ ១៩៩៧ (No.86ANK/BK, December 19, 1997)`,
          registration_number: 'លេខ៣០បប, ២៥ ធ្នូ ១៩៩៧ (No.30BB, December 25, 1997)',
          number_enactments: ''
        },
        {
          id: 76,
          law_type: '៧៦',
          explanation: `សេចក្តីណែនាំបន្ថែមរបស់នាយកដ្ឋានសុរិយោដីអំពីកិច្ចការជំនាញ (Additional Instruction of the Department of Cadastre on Technical Affairs)`,
          registration_number: 'លេខ២៥៩សដ, ៣០ ធ្នូ ១៩៩៧ (No.259SD, December 30, 1997)',
          number_enactments: ''
        },
        {
          id: 77,
          law_type: '៧៧',
          explanation: `សេចក្តីសម្រេចរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុស្តីពីការប្រមូលពន្ធលើដីធ្លីមិនបានប្រើប្រាស់ (Decision of the Ministry of Economy and Finance on the Collection of Unused Land Taxes)`,
          registration_number: 'លេខ០០៤សសរ/សហវ/ពដ, ២៤ សីហា ១៩៩៨ (No.004SSR/SHV/BD, August 24, 1998)',
          number_enactments: '១៩៩៨'
        },
        {
          id: 78,
          law_type: '៧៨',
          explanation: `ព្រះរាជក្រឹត្យស្តីពីការកំណត់ និងគ្រប់គ្រងព្រៃតំបន់ដីជម្រាល (Royal Decree of Determination and Management of Forest in Land Slope Areas)`,
          registration_number: 'លេខ នស/រកត/០១៩៩/០៧, ១១ មករា ១៩៩៩ (NS/RKT/0199/07, January 11, 1999) ',
          number_enactments: '១៩៩៩'
        },
        {
          id: 79,
          law_type: '៧៩',
          explanation: `សេចក្តីប្រកាសរបស់រាជរដ្ឋាភិបាលកម្ពុជាស្តីពីវិធានការគ្រប់គ្រង និងលុបបំបាត់ភាពអានាធិបតេយ្យក្នុងវិស័យព្រៃឈើ (Proclamation of the Royal Government of Cambodia on the Management and Elimination of Anarchy in Forest Sector)`,
          registration_number: 'លេខ០១ប្រក, ២៥ មករា ១៩៩៩ (No.01PK, January 25, 1999)',
          number_enactments: ''
        },
        {
          id: 80,
          law_type: '៨០',
          explanation: 'សេចក្តីសម្រេចរបស់រាជរដ្ឋាភិបាលកម្ពុជាស្តីពីការបង្កើតគណៈកម្មការដោះស្រាយបាតុភាពបញ្ហាដីធ្លី នៅតាមបណ្តាខេត្ត-ក្រុងទូទាំងប្រទេស (Decision of the Royal Government of Cambodia on the Establishment of Land Dispute Resolution Commissions in Provinces/ Municipalities Throughout the Country)',
          registration_number: 'លេខ៤៧សសរ, ១០ មិថុនា ១៩៩៩ (No.47SSR, June 10, 1999)',
          number_enactments: ''
        },
        {
          id: 81,
          law_type: '៨១',
          explanation: 'ច្បាប់ស្តីពីការបង្កើតក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ (Law on the Establishment of the Ministry of Land Management, Urban Planning and Construction)',
          registration_number: 'នស/រកម/០៦៩៩/០៩, ២៣ មិថុនា ១៩៩៩ (NS/RKM /0699/09, June 23, 1999)',
          number_enactments: ''
        },
        {
          id: 82,
          law_type: '៨២',
          explanation: 'អនុក្រឹត្យស្តីពីការរៀបចំ និងការប្រព្រឹត្តទៅនៃក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ (Sub-decree on the Organization and Functioning of the Ministry of Land Management, Urban Planning and Construction)',
          registration_number: 'លេខ៦២អនក្រ/បក, ២០ កក្កដា ១៩៩៩ (No.62ANK/BK, July 20, 1999)',
          number_enactments: ''
        },
        {
          id: 83,
          law_type: '៨៣',
          explanation: 'ប្រកាសរបស់ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ស្តីពីតួនាទី ភារកិច្ច និងរចនាសម្ព័ន្ធរបស់មន្ទីររៀបចំដែនដី នគរូបនីយកម្ម សំណង់ និងសុរិយោដីខេត្ត-ក្រុង និងតួនាទី ភារកិច្ចរបស់បណ្តាការិយាល័យក្រោមឱវាទ (Proclamation of the Ministry of Land Management, Urban Planning and Construction on the Function, Duty and Structure of Provincial/Municipal Office of Land Management, Urban Planning, Construction and Cadastre; and Function, Duty of Subordinate Offices)',
          registration_number: 'លេខ៧៦ប្រក, ០២ កញ្ញា ១៩៩៩ (No.76PK, September 02, 1999)',
          number_enactments: ''
        },
        {
          id: 84,
          law_type: '៨៤',
          explanation: 'សេចក្តីប្រកាសរបស់រាជរដ្ឋាភិបាលកម្ពុជាស្តីពីវិធានការលុបបំបាត់ភាពអានាធិបតេយ្យក្នុងបញ្ហាទន្ទ្រានកាន់កាប់ដីធ្លី (Proclamation of the Royal Government of Cambodia on the Measure of Elimination of Anarchy in Land Grabbing Issues)',
          registration_number: 'លេខ០៦ប្រក, ២៧ កញ្ញា ១៩៩៩ (No.06PK, September 27, 1999)',
          number_enactments: ''
        },
        {
          id: 85,
          law_type: '៨៥',
          explanation: 'សារាចរណែនាំរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុស្តីពីការអនុវត្តពន្ធលើដីធ្លីមិនបានប្រើប្រាស់ (Instructive Circular of the Ministry of Economy and Finance on the Tax Implementation on Unused Land)',
          registration_number: 'លេខ០១៧សរន/សហវ/ពដ, ០១ ធ្នូ ១៩៩៩ (No.017SRN/SHV/BD, December 01, 1999)',
          number_enactments: ''
        },
        {
          id: 86,
          law_type: '៨៦',
          explanation: 'អនុក្រឹត្យស្តីពីការគ្រប់គ្រងព្រៃសម្បទាន (Sub-decree on Forest Concessions Management)',
          registration_number: 'លេខ០៥អនក្រ/បក, ០៧ កុម្ភៈ ២០០០ (No.05ANK/BK, February 07, 2000)',
          number_enactments: '២០០០'
        },
        {
          id: 87,
          law_type: '៨៧',
          explanation: 'សេចក្តីសម្រេចរបស់ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ស្តីពីការបង្កើត ក្រុមជំនួយការផ្ទាល់ប្រធានគណៈកម្មការដោះស្រាយបាតុភាពបញ្ហាដីធ្លីនៅតាមបណ្តាខេត្តក្រុងទូទាំងប្រទេស (Decision of the Ministry of Land Management, Urban Planning and Construction on the Establishment of Personal Assistant Group to the Chairman of Land Dispute Settlement Committee)',
          registration_number: 'លេខ២២ដនសគ,ដីធ្លី, ០៧ មីនា ២០០០ (No.22DNSK/Land, March 07, 2000)',
          number_enactments: ''
        },
        {
          id: 88,
          law_type: '៨៨',
          explanation: 'អនុក្រឹត្យស្តីពីនីតិវិធីនៃការកសាងប្លង់សុរិយោដី និងសៀវភៅគោលបញ្ជីដីធ្លី (Sub-decree on the Procedure of Establishing Cadastral Index Maps and Land Registers)',
          registration_number: 'លេខ១១អនក្រ/បក, ២២ មីនា ២០០០ (No.11 ANK/BK, March 22, 2000)',
          number_enactments: ''
        },
        {
          id: 89,
          law_type: '៨៩',
          explanation: 'លិខិតរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុដែលមានកម្មវត្ថុស្តីពីការអនុវត្តគោលការណ៍ដីចំណីផ្លូវជាតិ ផ្លូវខេត្ត ផ្លូវឃុំ ផ្លូវរថភ្លើងនៅទូទាំងព្រះរាជាណាចក្រកម្ពុជា (Letter of the Ministry of Economy and Finance on the Subject of the Implementation of Principles of Reserved Land for National, Provincial, Communal Roads; Railways throughout the Kingdom of Cambodia)',
          registration_number: 'លេខ៩៦១សហវ, ០៦ មេសា ២០០០ (No.961SHV, April 06, 2000)',
          number_enactments: ''
        },
        {
          id: 90,
          law_type: '៩០',
          explanation: 'សេចក្តីណែនាំរបស់ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ស្តីពីការអនុវត្តលក្ខណការណ៍រដ្ឋបាលលើការងារសុរិយោដីនៃមន្ទីរដនសសខេត្ត-ក្រុង (Instruction of the Ministry of Land Management, Urban Planning and Construction on the Implementation of the Administrative Principle of Cadastral Work at the Provincial Department of Land Management, Urban Planning, Construction and Cadastre)',
          registration_number: 'លេខ៤២៧ ដនស/រប, ០៨ មេសា ២០០០ (No.427DNS/RB, April 08, 2000)',
          number_enactments: ''
        },
        {
          id: 91,
          law_type: '៩១',
          explanation: 'លិខិតរបស់ទីស្តីការគណៈរដ្ឋមន្ត្រីស្តីពីការកំណត់ថ្លៃឈ្នួលដីសម្បទាន (Letter of Council of Ministers about the Determination of Land Concession Fee)',
          registration_number: 'លេខ៨០៣សជណ, ៣១ ឧសភា ២០០០ (No.803SCN, May 31, 2000) ',
          number_enactments: ''
        },
        {
          id: 92,
          law_type: '៩២',
          explanation: 'សារាចរណែនាំអនុវត្តនីតិវិធីនៃការកសាងប្លង់សុរិយោដី និងសៀវភៅគោលបញ្ជីដីធ្លី (ការចុះបញ្ជីមានលក្ខណៈជាប្រព័ន្ធ) របស់ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ (Instructive Circular Relating to the Implementation of the Procedure of Establishing Cadastral Index Map and Land Register (Systematic Registration) of the Ministry of Land Management, Urban Planning and Construction)',
          registration_number: 'លេខ០០៣ដនស/សដ, ២០ កក្កដា ២០០០ (No.003DNS/SD, July 20, 2000)',
          number_enactments: ''
        },
        {
          id: 93,
          law_type: '៩៣',
          explanation: 'អនុក្រឹត្យស្តីពីការបង្កើតក្រុមប្រឹក្សាគោលនយោបាយដីធ្លី (Sub-decree on the Establishment of the Council of Land Policy)',
          registration_number: 'លេខ៨៨អនក្រ/បក, ០១ ធ្នូ ២០០០ (No.88ANK/BK, December 01, 2000)',
          number_enactments: ''
        },
        {
          id: 94,
          law_type: '៩៤',
          explanation: 'អនុក្រឹត្យស្តីពីការរៀបចំ និងការប្រព្រឹត្តទៅរបស់អគ្គលេខាធិការដ្ឋាននៃក្រុមប្រឹក្សា គោលនយោបាយដីធ្លី (Sub-decree on the Organization and Functioning of Secretariat General of the Council of Land Policy)',
          registration_number: 'លេខ៩៦អនក្រ/បក, ១៣ ធ្នូ ២០០០ (No.96ANK/ BK, December 13, 2000)',
          number_enactments: ''
        },
        {
          id: 95,
          law_type: '៩៥',
          explanation: 'ច្បាប់ភូមិបាល (Land Law)',
          registration_number: 'នស/រកម/០៨០១/១៤, ៣០ សីហា ២០០១ (NS/RKM/ 0801/14, August 30, 2001)',
          number_enactments: '២០០១'
        },
        {
          id: 96,
          law_type: '៩៦',
          explanation: 'សេចក្តីជូនដំណឹងរបស់រាជរដ្ឋាភិបាលកម្ពុជាស្តីពីការបញ្ចប់ការចូលកាន់កាប់ភោគៈលើអចលនវត្ថុ (Notification of the Royal Government of Cambodia on the Cessation of Acquisitive Possession on Immovable Property)',
          registration_number: 'លេខ៤៣សជណ/កបច, ០៦ កញ្ញា ២០០១ (No.43SCN/KBC, September 06, 2001)',
          number_enactments: ''
        },
        {
          id: 97,
          law_type: '៩៧',
          explanation: 'សេចក្តីសម្រេចរបស់ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទស្តីពីការបង្កើតគណៈកម្មការកំណត់ដីភូមិ និងដីកសិកម្មដែលប្រជាពលរដ្ឋកំពុងធ្វើអាជីវកម្មក្នុងដែនព្រៃសម្បទាន (Decision of the Ministry of Agriculture, Forestry and Fisheries on Creating the Committee to Determine Residential and Agricultural Land within Forest Concession)',
          registration_number: 'លេខ៤៣៨សសរ/កសក, ១៨ តុលា ២០០១ (No.438SSR/KSK, October 18, 2001)',
          number_enactments: ''
        },
        {
          id: 98,
          law_type: '៩៨',
          explanation: 'សេចក្តីប្រកាសរបស់ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទស្តីពីការផ្អាកសកម្មភាព អាជីវកម្មព្រៃគុបសម្រាប់ក្រុមហ៊ុនព្រៃសម្បទាន (Proclamation of the Ministry of Agriculture, Forestry and Fisheries on the Suspension of Forest Exploitation Activities for Forest Concession Companies)',
          registration_number: 'លេខ៥៧២១កសក, ១៣ ធ្នូ ២០០១ (No.5721KSK, December 13, 2001)',
          number_enactments: ''
        },
        {
          id: 99,
          law_type: '៩៩',
          explanation: 'ប្រកាសអន្តរក្រសួងរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ និងក្រសួងរៀបចំដែនដី នគរូប នីយកម្ម និងសំណង់ស្តីពីការកំណត់ចំណូលពីសោហ៊ុយសេវាសុរិយោដី (Inter-ministerial Proclamation of the Ministry of Economy and Finance and the Ministry of Land Management, Urban Planning and Construction on the Determination of the Revenue from the Cadastral Service Fee)',
          registration_number: 'លេខ៣៧៧សហវ, ២៨ ឧសភា ២០០២ (No.377SHV, May 28, 2002)',
          number_enactments: '២០០២'
        },
        {
          id: 100,
          law_type: '១០០',
          explanation: 'អនុក្រឹត្យស្តីពីនីតិវិធីនៃការកសាងប្លង់សុរិយោដី និងសៀវភៅគោលបញ្ជីដីធ្លី (Sub-decree on the Procedure of Establishing Cadastral Index Maps and Land Registers)',
          registration_number: 'លេខ៤៦អនក្រ/បក, ៣១ ឧសភា ២០០២ (No.46ANK/BK, May 31, 2002)',
          number_enactments: ''
        },
        {
          id: 101,
          law_type: '១០១',
          explanation: 'អនុក្រឹត្យស្តីពីការរៀបចំ និងការប្រព្រឹត្តទៅនៃគណៈកម្មការសុរិយោដី (Sub-decree on the Organization and Functioning of the Cadastral Commission)',
          registration_number: 'លេខ៤៧អនក្រ/បក, ៣១ ឧសភា ២០០២ (No.47ANK/BK, May 31, 2002)',
          number_enactments: ''
        },
        {
          id: 102,
          law_type: '១០២',
          explanation: 'អនុក្រឹត្យស្តីពីការចុះបញ្ជីដីធ្លីមានលក្ខណៈដាច់ដោយដុំ (Sub-decree on Sporadic Registration)',
          registration_number: 'លេខ៤៨អនក្រ/បក, ៣១ ឧសភា ២០០២ (No.48ANK/BK, May 31, 2002)',
          number_enactments: ''
        },
        {
          id: 103,
          law_type: '១០៣',
          explanation: 'លិខិតរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុស្តីពីសំណើកែលំអនីតិវិធីនៃការគ្រប់គ្រង និងប្រើប្រាស់ថវិការដ្ឋ ចំណូលពុំមែនសារពើភ័ណ្ឌ និងការគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋនៅមន្ទីររៀបចំដែនដី នគរូបនីយកម្ម សំណង់ និងសុរិយោដីខេត្ត-ក្រុង (Letter of the Ministry of Economy and Finance about the Request to Improve the Procedure of the Management and Use of State Budget, Income other than Inventory and the Management of State Property at the Provincial Department of Land Management, Urban Planning, Construction and Cadastre)',
          registration_number: 'លេខ៣៣៤០សហវ/អ, ១១ កក្កដា ២០០២ (No.3340SHV/A, July 11, 2002)',
          number_enactments: ''
        },
        {
          id: 104,
          law_type: '១០៤',
          explanation: 'លិខិតរបស់ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ស្តីពីការកែលំអនីតិវិធីនៃការគ្រប់គ្រង និងប្រើប្រាស់ថវិកាចំណូលពុំមែនសារពើពន្ធ និងការគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ នៅមន្ទីររៀបចំដែនដី នគរូបនីយកម្ម សំណង់ និងសុរិយោដីខេត្ត-ក្រុង (Letter of the Ministry of Land Management, Urban Planning and Construction about the Improvement of the Management and Use of Budget and Income other than Inventory and the Management of State Property at the Provincial Department, Urban Planning, Construction and Cadastre)',
          registration_number: 'លេខ៥៨៤ដនស/ ផសហ, ២៤ កក្កដា ២០០២ (No.584DNS/PSH, July 24, 2002)',
          number_enactments: ''
        },
        {
          id: 105,
          law_type: '១០៥',
          explanation: 'សារាចរណែនាំអនុវត្តនីតិវិធីនៃការកសាងប្លង់សុរិយោដី និងសៀវភៅគោលបញ្ជីដីធ្លី (ការចុះបញ្ជីដីធ្លីមានលក្ខណៈជាប្រព័ន្ធ) របស់ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ (Instructive Circular Relating to the Implementation of the Procedure of Establishing Cadastral Index Map and Land Register (Systematic Land Registration) of the Ministry of Land Management, Urban Planning and Construction)',
          registration_number: 'លេខ០០១ដនស/សដ, ១៩ សីហា ២០០២ (No.001DNS/SD, August 19, 2002)',
          number_enactments: ''
        },
        {
          id: 106,
          law_type: '១០៦',
          explanation: 'ប្រកាសរបស់ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ស្តីពីគោលការណ៍ណែនាំ និងនីតិវិធីរបស់គណៈកម្មការសុរិយោដី (Proclamation of the Ministry of Land Management, Urban Planning and Construction on the Guideline and Procedure of the Cadastral Commission)',
          registration_number: 'លេខ១១២ដនស/ប្រក, ២១ សីហា ២០០២ (No.112DNS/PK, August 21, 2002)',
          number_enactments: ''
        },
        {
          id: 107,
          law_type: '១០៧',
          explanation: 'ច្បាប់ស្តីពីព្រៃឈើ (The Forestry Law)',
          registration_number: 'នស/រកម/០៨០២/០១៦, ៣១ សីហា ២០០២ (NS/RKM/0802/016, August 31, 2002)',
          number_enactments: ''
        },
        {
          id: 108,
          law_type: '១០៨',
          explanation: 'អនុក្រឹត្យស្តីពីសម្បទានដីសង្គមកិច្ច (Sub-decree on the Social Land Concession)',
          registration_number: 'លេខ១៩អនក្រ/បក, ១៩ មីនា ២០០៣ (No.19ANK/BK, March 19, 2003)',
          number_enactments: '២០០៣'
        },
        {
          id: 109,
          law_type: '១០៩',
          explanation: 'ប្រកាសរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុស្តីពីការបំពេញបន្ថែមការណែនាំអនុវត្តប្រមូលពន្ធប្រថាប់ត្រា (Proclamation of the Ministry of Economy and Finance on the Supplementation of Implementation Instruction of the Stamp Duty Collection)',
          registration_number: 'លេខ៦០៦សហវ/ពដ, ២៧ សីហា ២០០៣ (No.606SHV/PD, August 27, 2003)',
          number_enactments: ''
        },
        {
          id: 110,
          law_type: '១១០',
          explanation: 'ប្រកាសរបស់ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ស្តីពីគោលការណ៍ណែនាំអនុវត្តអនុក្រឹត្យស្តីពីសម្បទានដីសង្គមកិច្ច (Proclamation of the Ministry of Land Management, Urban Planning and Construction on the Instructive Principle of Implementing the Sub-decree on Social Land Concessions)',
          registration_number: 'លេខ២០០ដនស/ប្រក, ១៩ វិច្ឆិកា ២០០៣ (No.200DNS/ PK, November 19, 2003)',
          number_enactments: ''
        },
        {
          id: 111,
          law_type: '១១១',
          explanation: 'ប្រកាសអន្តរក្រសួងរបស់ក្រសួងយុត្តិធម៌ និងរបស់ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ស្តីពីការកំណត់ភារកិច្ចរបស់តុលាការ និងគណៈកម្មការសុរិយោដីពាក់ព័ន្ធនឹងរឿងវិវាទដីធ្លី (Inter-ministerial Proclamation of the Ministry of Justice and the Ministry of Land Management, Urban Planning and Construction on the Determination of Competence of the Court and Cadastral Commission Regarding Land Disputes)',
          registration_number: 'លេខ០២ប្រកន/០៣, ២៦ វិច្ឆិកា ២០០៣ (No.02PKN/03, November 26, 2003)',
          number_enactments: ''
        },
        {
          id: 112,
          law_type: '១១២',
          explanation: 'លិខិតរបស់ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុស្តីពីករណីសំណើសុំអនុញ្ញាតជាគោលការណ៍លើតម្លៃសេវាចុះបញ្ជីដីធ្លីមានលក្ខណៈជាប្រព័ន្ធសម្រាប់គម្រោង LMAP នៃក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និងសំណង់ )',
          registration_number: 'លេខ០៥៩សហវ/ទរ, ១២ មករា ២០០៤ (No.059SHV/TR, January 12, 2004)',
          number_enactments: '២០០៤'
        }
      ];
    }
  },
  actions: {
    addItem(name: string) {
      
    },

    removeItem(name: string) {
      
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(dummyDocumentStore, import.meta.hot))
}
