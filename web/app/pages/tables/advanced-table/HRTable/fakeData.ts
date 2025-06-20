interface Status {
  key: "full-time" | "part-time" | "intern" | "contractor" | "freelance";
  title: "Full Time" | "Part Time" | "Intern" | "Contractor" | "Freelance";
}

export interface User {
  user_id: number;
  name: string;
  avatar?: string;
  position: string;
  department: string;
  email: string;
  level: string;
  status: Status;
  office: string;
  stack: string[];
  info: { phone?: string; twitter?: string };
}

export const usersList: User[] = [
  {
    user_id: 1,
    name: "Brent MacCallum",
    position: "Software project manager",
    department: "Operating Systems",
    email: "bmaccallum0@bigcartel.com",
    level: "Principal Engineer",
    status: { key: "full-time", title: "Full Time" },
    office: "4 Nova Junction",
    stack: [
      "express",
      "vuetify",
      "laravel jetstream",
      "tailwind ui",
      "foundation",
    ],
    info: {
      phone: "427-739-8100",
      twitter: "bmaccallum0",
    },
  },
  {
    user_id: 2,
    name: "Zacherie Hambly",
    avatar: "/web/images/avatar/avatar-9.jpg",
    position: "Cyber security engineer",
    department: "Database Administration",
    email: "zhambly1@a8.net",
    level: "SWE 1",
    status: { key: "part-time", title: "Part Time" },
    office: "595 Bobwhite Court",
    stack: ["sqlite", "next", "mongodb", "bootstrap studio", "ember"],
    info: { phone: "619-216-8672" },
  },
  {
    user_id: 3,
    name: "Tabbitha Benedito",
    avatar: "/web/images/avatar/avatar-14.jpg",
    position: "Video game designer",
    department: "Probability and Statistics for Computer Science",
    email: "tbenedito2@skype.com",
    level: "SWE 1",
    status: { key: "intern", title: "Intern" },
    office: "83 Holmberg Street",
    stack: ["postgresql", "bootstrap studio"],
    info: {
      phone: "510-452-9619",
      twitter: "tbenedito2",
    },
  },
  {
    user_id: 4,
    name: "Hadlee Hanmer",
    position: "Mobile developer",
    department: "Blockchain",
    email: "hhanmer3@tripadvisor.com",
    level: "Staff SWE",

    status: { key: "full-time", title: "Full Time" },
    office: "529 Everett Drive",
    stack: ["flask", "bootstrapvue", "mysql"],
    info: {
      phone: "417-540-1770",

      twitter: "hhanmer3",
    },
  },
  {
    user_id: 5,
    name: "Gayleen Kurt",
    avatar: "/web/images/avatar/avatar-5.jpg",
    position: "Web developer",
    department: "Web Development",
    email: "gkurt4@google.pl",
    level: "Senior SWE",

    status: { key: "contractor", title: "Contractor" },
    office: "54721 Springs Point",
    stack: ["alpine js", "nuxt", "bulma"],
    info: { phone: "434-831-0680" },
  },
  {
    user_id: 6,
    name: "Nevin Coolson",
    position: "Embedded systems engineer",
    department: "Blockchain",
    email: "ncoolson5@arizona.edu",
    level: "Senior SWE",

    status: { key: "part-time", title: "Part Time" },
    office: "923 Monument Crossing",
    stack: ["react native", "tailwind ui", "bootstrapvue", "sqlite"],
    info: {
      phone: "148-544-9729",

      twitter: "ncoolson5",
    },
  },
  {
    user_id: 7,
    name: "Ammamaria Tongs",
    position: "Applications engineer",
    department: "Embedded Systems",
    email: "atongs6@studiopress.com",
    level: "Distinguished Engineer.",

    status: { key: "part-time", title: "Part Time" },
    office: "87478 Farragut Pass",
    stack: ["django", "gatsby", "nuxt", "alpine js"],
    info: {
      phone: "681-483-2145",

      twitter: "atongs6",
    },
  },
  {
    user_id: 8,
    name: "Clementius Skoate",
    avatar: "/web/images/avatar/avatar-15.jpg",
    position: "Software project manager",
    department: "Cloud Computing",
    email: "cskoate7@blinklist.com",
    level: "Staff SWE",

    status: { key: "contractor", title: "Contractor" },
    office: "62 Harbort Court",
    stack: ["materialize", "django", "semantic ui", "bootstrap studio"],
    info: { phone: "502-147-7633" },
  },
  {
    user_id: 9,
    name: "Alameda Krysztofiak",
    avatar: "/web/images/avatar/avatar-5.jpg",
    position: "DevOps engineer",
    department: "System Hardware",
    email: "akrysztofiak8@tripod.com",
    level: "SWE 1",

    status: { key: "intern", title: "Intern" },
    office: "1 Duke Plaza",
    stack: ["spring boot", "firebase", "express", "rails"],
    info: { phone: "600-535-6428" },
  },
  {
    user_id: 10,
    name: "Nesta Aylwin",
    avatar: "/web/images/avatar/avatar-1.jpg",
    position: "Data scientist",
    department: "Software Application",
    email: "naylwin9@irs.gov",
    level: "Senior SWE",

    status: { key: "full-time", title: "Full Time" },
    office: "4 Merry Drive",
    stack: ["sqlite", "gatsby", "angular", "spring boot"],
    info: {
      phone: "310-139-0629",

      twitter: "naylwin9",
    },
  },
  {
    user_id: 11,
    name: "Mickey Dunstone",
    avatar: "/web/images/avatar/avatar-12.jpg",
    position: "Blockchain engineer",
    department: "Web Development",
    email: "mdunstonea@tmall.com",
    level: "SWE 2",

    status: { key: "intern", title: "Intern" },
    office: "60470 John Wall Crossing",
    stack: ["materialize", "rails"],
    info: {
      phone: "373-608-1976",

      twitter: "mdunstonea",
    },
  },
  {
    user_id: 12,
    name: "Cornall Santarelli",
    avatar: "/web/images/avatar/avatar-16.jpg",
    position: "Blockchain engineer",
    department: "Software Application",
    email: "csantarellib@bloglines.com",
    level: "SWE 2",

    status: { key: "full-time", title: "Full Time" },
    office: "99640 Hanover Road",
    stack: ["react native", "flask", "ant design"],
    info: {
      phone: "577-220-0836",

      twitter: "csantarellib",
    },
  },
  {
    user_id: 13,
    name: "Dixie Pursehouse",
    avatar: "/web/images/avatar/avatar-7.jpg",
    position: "Computer programmer",
    department: "Database Administration",
    email: "dpursehousec@yahoo.co.jp",
    level: "Principal Engineer",

    status: { key: "full-time", title: "Full Time" },
    office: "0 La Follette Avenue",
    stack: ["ember", "next", "sqlite", "graphql", "mysql"],
    info: { phone: "463-838-0586" },
  },
  {
    user_id: 14,
    name: "Camel Edmunds",
    avatar: "/web/images/avatar/avatar-4.jpg",
    position: "Machine learning engineer",
    department: "Probability and Statistics for Computer Science",
    email: "cedmundsd@acquirethisname.com",
    level: "SWE 1",

    status: { key: "intern", title: "Intern" },
    office: "51465 Badeau Avenue",
    stack: ["mongodb", "nuxt", "materialize", "alpine js"],
    info: {
      phone: "872-691-8067",

      twitter: "cedmundsd",
    },
  },
  {
    user_id: 15,
    name: "Sylvia Du Pre",
    position: "Computer programmer",
    department: "Data Science",
    email: "sdue@networkadvertising.org",
    level: "Principal Engineer",

    status: { key: "full-time", title: "Full Time" },
    office: "693 Sachs Court",
    stack: ["nuxt", "foundation"],
    info: { phone: "579-510-5441" },
  },
  {
    user_id: 16,
    name: "Benjy Rignall",
    position: "Embedded systems engineer",
    department: "Mobile Development",
    email: "brignallf@simplemachines.org",
    level: "Senior SWE",

    status: { key: "contractor", title: "Contractor" },
    office: "932 Cody Way",
    stack: ["bootstrap studio", "ember"],
    info: {
      phone: "745-292-1894",

      twitter: "brignallf",
    },
  },
  {
    user_id: 17,
    name: "Fremont Paterson",
    position: "Javascript engineer",
    department: "Blockchain",
    email: "fpatersong@amazon.com",
    level: "Staff SWE",

    status: { key: "contractor", title: "Contractor" },
    office: "7603 Oriole Avenue",
    stack: ["bulma", "flask", "express", "rails", "ember"],
    info: {
      phone: "557-271-3897",

      twitter: "fpatersong",
    },
  },
  {
    user_id: 18,
    name: "Budd Laver",
    avatar: "/web/images/avatar/avatar-9.jpg",
    position: "Software project manager",
    department: "Embedded Systems",
    email: "blaverh@si.edu",
    level: "SWE 3",

    status: { key: "intern", title: "Intern" },
    office: "42 Burning Wood Way",
    stack: ["bootstrap studio", "mongodb", "express", "spring boot", "gatsby"],
    info: {
      phone: "511-584-8747",

      twitter: "blaverh",
    },
  },
  {
    user_id: 19,
    name: "Philomena Oppie",
    position: "Cyber security engineer",
    department: "Software Application",
    email: "poppiei@geocities.jp",
    level: "SWE 1",

    status: { key: "intern", title: "Intern" },
    office: "524 Hollow Ridge Lane",
    stack: ["vuetify", "laravel jetstream", "postgresql"],
    info: {
      phone: "160-489-6775",

      twitter: "poppiei",
    },
  },
  {
    user_id: 20,
    name: "Rafaelia Gallety",
    avatar: "/web/images/avatar/avatar-3.jpg",
    position: "Video game designer",
    department: "Operating Systems",
    email: "rgalletyj@spotify.com",
    level: "SWE 1",

    status: { key: "part-time", title: "Part Time" },
    office: "6 Kipling Junction",
    stack: ["bootstrap studio", "ember", "vuetify"],
    info: {
      phone: "453-748-5882",

      twitter: "rgalletyj",
    },
  },
  {
    user_id: 21,
    name: "Bernardo Wort",
    avatar: "/web/images/avatar/avatar-4.jpg",
    position: "Computer programmer",
    department: "Software Architecture",
    email: "bwortk@sourceforge.net",
    level: "SWE 1",

    status: { key: "freelance", title: "Freelance" },
    office: "62 Banding Parkway",
    stack: ["bootstrap studio", "bootstrapvue", "nuxt", "mongodb", "alpine js"],
    info: {
      phone: "107-648-2688",

      twitter: "bwortk",
    },
  },
  {
    user_id: 22,
    name: "Elisha Levensky",
    avatar: "/web/images/avatar/avatar-10.jpg",
    position: "Cyber security engineer",
    department: "Machine Learning",
    email: "elevenskyl@altervista.org",
    level: "Principal Engineer",

    status: { key: "contractor", title: "Contractor" },
    office: "07 Melby Park",
    stack: ["bootstrap studio", "rails", "semantic ui", "gatsby"],
    info: {
      phone: "433-121-3811",

      twitter: "elevenskyl",
    },
  },
  {
    user_id: 23,
    name: "Gregoor Pagett",
    avatar: "/web/images/avatar/avatar-16.jpg",
    position: "Software architect",
    department: "Software Application",
    email: "gpagettm@studiopress.com",
    level: "Staff SWE",

    status: { key: "full-time", title: "Full Time" },
    office: "2 Brown Parkway",
    stack: ["alpine js", "graphql"],
    info: { phone: "462-171-6356" },
  },
  {
    user_id: 24,
    name: "Denver Spelsbury",
    avatar: "/web/images/avatar/avatar-20.jpg",
    position: "Cyber security engineer",
    department: "Software Architecture",
    email: "dspelsburyn@ox.ac.uk",
    level: "SWE 2",

    status: { key: "intern", title: "Intern" },
    office: "9 Stuart Lane",
    stack: ["gatsby", "bulma", "svelte", "vue", "foundation"],
    info: { phone: "146-609-1574" },
  },
  {
    user_id: 25,
    name: "Pennie Osgar",
    avatar: "/web/images/avatar/avatar-15.jpg",
    position: "Web developer",
    department: "DevOps",
    email: "posgaro@furl.net",
    level: "Senior SWE",

    status: { key: "full-time", title: "Full Time" },
    office: "1359 Nancy Parkway",
    stack: ["nuxt", "firebase", "react native", "spring boot", "postgresql"],
    info: { phone: "813-329-3675" },
  },
  {
    user_id: 26,
    name: "Giuditta Fruchter",
    avatar: "/web/images/avatar/avatar-3.jpg",
    position: "Cyber security engineer",
    department: "Data Engineering",
    email: "gfruchterp@indiegogo.com",
    level: "SWE 2",

    status: { key: "freelance", title: "Freelance" },
    office: "10457 Raven Court",
    stack: ["materialize", "graphql", "gatsby"],
    info: { phone: "271-618-1557" },
  },
  {
    user_id: 27,
    name: "Hector Czapla",
    position: "Applications engineer",
    department: "DevOps",
    email: "hczaplaq@youku.com",
    level: "SWE 2",

    status: { key: "intern", title: "Intern" },
    office: "883 Grayhawk Hill",
    stack: ["mongodb", "vue", "gatsby", "django", "spring boot"],
    info: {
      phone: "551-751-1490",

      twitter: "hczaplaq",
    },
  },
  {
    user_id: 28,
    name: "Vyky Clemensen",
    avatar: "/web/images/avatar/avatar-5.jpg",
    position: "SQA engineer",
    department: "Embedded Systems",
    email: "vclemensenr@dell.com",
    level: "SWE 1",

    status: { key: "freelance", title: "Freelance" },
    office: "8 Garrison Crossing",
    stack: ["sqlite", "svelte"],
    info: {
      phone: "280-336-8471",

      twitter: "vclemensenr",
    },
  },
  {
    user_id: 29,
    name: "Franz Sibray",
    position: "Software test engineer",
    department: "Blockchain",
    email: "fsibrays@microsoft.com",
    level: "SWE 2",

    status: { key: "part-time", title: "Part Time" },
    office: "3220 Schmedeman Avenue",
    stack: ["vue", "angular", "ember"],
    info: {
      phone: "442-512-3408",

      twitter: "fsibrays",
    },
  },
  {
    user_id: 30,
    name: "Gregoire Eisikowitz",
    avatar: "/web/images/avatar/avatar-17.jpg",
    position: "Data scientist",
    department: "DevOps",
    email: "geisikowitzt@geocities.com",
    level: "Senior SWE",

    status: { key: "contractor", title: "Contractor" },
    office: "7444 Toban Way",
    stack: ["alpine js", "firebase"],
    info: {
      phone: "400-899-4368",

      twitter: "geisikowitzt",
    },
  },
  {
    user_id: 31,
    name: "Venita Fidell",
    avatar: "/web/images/avatar/avatar-15.jpg",
    position: "Data scientist",
    department: "Web Development",
    email: "vfidellu@de.vu",
    level: "Senior SWE",

    status: { key: "freelance", title: "Freelance" },
    office: "2660 Knutson Drive",
    stack: ["foundation", "mongodb", "flask", "postgresql"],
    info: { phone: "412-832-9447" },
  },
  {
    user_id: 32,
    name: "Jabez Brendeke",
    avatar: "/web/images/avatar/avatar-14.jpg",
    position: "Database administrator",
    department: "Software Application",
    email: "jbrendekev@time.com",
    level: "SWE 1",

    status: { key: "freelance", title: "Freelance" },
    office: "58349 Vera Alley",
    stack: ["rails", "express", "firebase"],
    info: {
      phone: "166-552-5726",

      twitter: "jbrendekev",
    },
  },
  {
    user_id: 33,
    name: "Jacenta Tschersich",
    position: "DevOps engineer",
    department: "Software Application",
    email: "jtschersichw@dailymail.co.uk",
    level: "Principal Engineer",

    status: { key: "intern", title: "Intern" },
    office: "7 Washington Lane",
    stack: ["materialize", "ant design", "ember", "vue", "bootstrapvue"],
    info: {
      phone: "127-921-2227",

      twitter: "jtschersichw",
    },
  },
  {
    user_id: 34,
    name: "Odilia Chaplyn",
    position: "Cloud engineer",
    department: "Operating Systems",
    email: "ochaplynx@nifty.com",
    level: "Staff SWE",

    status: { key: "contractor", title: "Contractor" },
    office: "39 Barby Plaza",
    stack: ["django", "vue"],
    info: { phone: "526-561-1452" },
  },
  {
    user_id: 35,
    name: "Isidro Skepper",
    avatar: "/web/images/avatar/avatar-16.jpg",
    position: "Web developer",
    department: "Cloud Computing",
    email: "iskeppery@mit.edu",
    level: "SWE 3",

    status: { key: "freelance", title: "Freelance" },
    office: "0 Bluestem Circle",
    stack: ["bulma", "mysql"],
    info: {
      phone: "506-299-5953",

      twitter: "iskeppery",
    },
  },
  {
    user_id: 36,
    name: "Theo Curdell",
    avatar: "/web/images/avatar/avatar-7.jpg",
    position: "Embedded systems engineer",
    department: "System Hardware",
    email: "tcurdellz@github.com",
    level: "Principal Engineer",

    status: { key: "freelance", title: "Freelance" },
    office: "01739 Kropf Way",
    stack: ["postgresql", "bootstrapvue", "ember", "angular"],
    info: { phone: "633-725-4283" },
  },
  {
    user_id: 37,
    name: "Karlens Ward",
    position: "SQA engineer",
    department: "DevOps",
    email: "kward10@china.com.cn",
    level: "Principal Engineer",

    status: { key: "freelance", title: "Freelance" },
    office: "19 Mcguire Junction",
    stack: ["angular", "next", "vue", "rails"],
    info: {
      phone: "108-939-6615",

      twitter: "kward10",
    },
  },
  {
    user_id: 38,
    name: "Freddi Debell",
    position: "Machine learning engineer",
    department: "Probability and Statistics for Computer Science",
    email: "fdebell11@about.com",
    level: "Senior SWE",

    status: { key: "full-time", title: "Full Time" },
    office: "92420 Alpine Street",
    stack: ["react native", "alpine js", "express", "ember"],
    info: {
      phone: "355-968-5066",

      twitter: "fdebell11",
    },
  },
  {
    user_id: 39,
    name: "Roscoe Blindt",
    avatar: "/web/images/avatar/avatar-8.jpg",
    position: "Software test engineer",
    department: "Software Application",
    email: "rblindt12@apache.org",
    level: "Distinguished Engineer.",

    status: { key: "part-time", title: "Part Time" },
    office: "893 Norway Maple Way",
    stack: ["laravel jetstream", "mysql"],
    info: {
      phone: "157-628-8334",

      twitter: "rblindt12",
    },
  },
  {
    user_id: 40,
    name: "Jaquith Byrne",
    avatar: "/web/images/avatar/avatar-15.jpg",
    position: "Javascript engineer",
    department: "DevOps",
    email: "jbyrne13@theguardian.com",
    level: "SWE 3",

    status: { key: "full-time", title: "Full Time" },
    office: "7146 Hudson Crossing",
    stack: ["express", "rails", "bulma", "materialize"],
    info: { phone: "803-853-6353" },
  },
  {
    user_id: 41,
    name: "Bartie Checo",
    avatar: "/web/images/avatar/avatar-19.jpg",
    position: "SQA engineer",
    department: "Software Architecture",
    email: "bcheco14@example.com",
    level: "Principal Engineer",

    status: { key: "contractor", title: "Contractor" },
    office: "66488 Arkansas Place",
    stack: ["bootstrapvue", "mongodb"],
    info: {
      phone: "563-860-6631",

      twitter: "bcheco14",
    },
  },
  {
    user_id: 42,
    name: "Othelia Szwandt",
    avatar: "/web/images/avatar/avatar-6.jpg",
    position: "Embedded systems engineer",
    department: "Blockchain",
    email: "oszwandt15@devhub.com",
    level: "Staff SWE",

    status: { key: "intern", title: "Intern" },
    office: "6 Shoshone Avenue",
    stack: ["spring boot", "react native"],
    info: {
      phone: "944-878-6550",

      twitter: "oszwandt15",
    },
  },
  {
    user_id: 43,
    name: "Shaine Goodey",
    avatar: "/web/images/avatar/avatar-10.jpg",
    position: "Software project manager",
    department: "Blockchain",
    email: "sgoodey16@sogou.com",
    level: "Staff SWE",

    status: { key: "freelance", title: "Freelance" },
    office: "2 Graceland Way",
    stack: ["vue", "flask", "semantic ui", "bootstrapvue", "tailwind ui"],
    info: { phone: "858-907-9554" },
  },
  {
    user_id: 44,
    name: "Kurtis Muggeridge",
    avatar: "/web/images/avatar/avatar-6.jpg",
    position: "Full stack engineer",
    department: "DevOps",
    email: "kmuggeridge17@istockphoto.com",
    level: "Distinguished Engineer.",

    status: { key: "full-time", title: "Full Time" },
    office: "96096 Eagle Crest Trail",
    stack: ["laravel jetstream", "svelte", "vuetify"],
    info: {
      phone: "703-632-2678",

      twitter: "kmuggeridge17",
    },
  },
  {
    user_id: 45,
    name: "Erinna Guildford",
    avatar: "/web/images/avatar/avatar-8.jpg",
    position: "Software test engineer",
    department: "System Hardware",
    email: "eguildford18@independent.co.uk",
    level: "SWE 1",

    status: { key: "contractor", title: "Contractor" },
    office: "387 Arkansas Junction",
    stack: ["sqlite", "flask", "rails", "express", "mysql"],
    info: {
      phone: "855-850-8734",

      twitter: "eguildford18",
    },
  },
  {
    user_id: 46,
    name: "Oliviero Satch",
    position: "Mobile developer",
    department: "Operating Systems",
    email: "osatch19@nyu.edu",
    level: "SWE 2",

    status: { key: "freelance", title: "Freelance" },
    office: "3651 Rieder Center",
    stack: ["tailwind ui", "bulma"],
    info: {
      phone: "405-327-9756",

      twitter: "osatch19",
    },
  },
  {
    user_id: 47,
    name: "Ediva Heamus",
    avatar: "/web/images/avatar/avatar-9.jpg",
    position: "Software test engineer",
    department: "Mobile Development",
    email: "eheamus1a@1und1.de",
    level: "Staff SWE",

    status: { key: "contractor", title: "Contractor" },
    office: "37768 Pine View Pass",
    stack: ["spring boot", "express", "flask", "postgresql"],
    info: {
      phone: "866-570-4694",

      twitter: "eheamus1a",
    },
  },
  {
    user_id: 48,
    name: "Shane Press",
    avatar: "/web/images/avatar/avatar-18.jpg",
    position: "Embedded systems engineer",
    department: "Cloud Computing",
    email: "spress1b@jiathis.com",
    level: "SWE 2",

    status: { key: "intern", title: "Intern" },
    office: "24721 Bartillon Terrace",
    stack: ["bootstrapvue", "firebase", "django", "next", "alpine js"],
    info: { phone: "700-304-0116" },
  },
  {
    user_id: 49,
    name: "Mandie Pearne",
    position: "Cyber security engineer",
    department: "Database Administration",
    email: "mpearne1c@vinaora.com",
    level: "Staff SWE",

    status: { key: "freelance", title: "Freelance" },
    office: "2294 Fisk Plaza",
    stack: ["vue", "bootstrap studio", "ember", "bulma"],
    info: { phone: "645-206-8609" },
  },
  {
    user_id: 50,
    name: "Dynah Huish",
    avatar: "/web/images/avatar/avatar-16.jpg",
    position: "Mobile developer",
    department: "Software Architecture",
    email: "dhuish1d@dot.gov",
    level: "Senior SWE",

    status: { key: "freelance", title: "Freelance" },
    office: "155 Mallard Center",
    stack: ["express", "spring boot"],
    info: { phone: "352-318-6631" },
  },
  {
    user_id: 51,
    name: "Kacie Sproul",
    avatar: "/web/images/avatar/avatar-11.jpg",
    position: "Cloud engineer",
    department: "Web Development",
    email: "ksproul1e@ucsd.edu",
    level: "SWE 2",

    status: { key: "intern", title: "Intern" },
    office: "861 Donald Road",
    stack: ["rails", "vuetify", "next", "graphql"],
    info: {
      phone: "257-513-1138",

      twitter: "ksproul1e",
    },
  },
  {
    user_id: 52,
    name: "Bambie Adkin",
    avatar: "/web/images/avatar/avatar-13.jpg",
    position: "SQA engineer",
    department: "Web Development",
    email: "badkin1f@usa.gov",
    level: "Distinguished Engineer.",

    status: { key: "freelance", title: "Freelance" },
    office: "21162 Graceland Plaza",
    stack: ["next", "svelte"],
    info: { phone: "363-752-7384" },
  },
  {
    user_id: 53,
    name: "Marchall Lacroix",
    avatar: "/web/images/avatar/avatar-17.jpg",
    position: "SQA engineer",
    department: "Cloud Computing",
    email: "mlacroix1g@slideshare.net",
    level: "Distinguished Engineer.",

    status: { key: "contractor", title: "Contractor" },
    office: "3 Loomis Lane",
    stack: ["vuetify", "spring boot", "alpine js"],
    info: { phone: "118-519-8998" },
  },
  {
    user_id: 54,
    name: "Chase Ruggles",
    avatar: "/web/images/avatar/avatar-14.jpg",
    position: "DevOps engineer",
    department: "Software Architecture",
    email: "cruggles1h@arstechnica.com",
    level: "Principal Engineer",

    status: { key: "intern", title: "Intern" },
    office: "412 Waubesa Avenue",
    stack: ["react native", "express", "tailwind ui", "spring boot", "rails"],
    info: {
      phone: "427-145-0618",

      twitter: "cruggles1h",
    },
  },
  {
    user_id: 55,
    name: "Jeremias McNaughton",
    avatar: "/web/images/avatar/avatar-16.jpg",
    position: "Database administrator",
    department: "Artificial Intelligence",
    email: "jmcnaughton1i@sciencedaily.com",
    level: "SWE 3",

    status: { key: "part-time", title: "Part Time" },
    office: "96 Forster Lane",
    stack: ["flask", "rails", "vue", "django"],
    info: {
      phone: "718-757-7039",

      twitter: "jmcnaughton1i",
    },
  },
  {
    user_id: 56,
    name: "Bethina Pinnigar",
    avatar: "/web/images/avatar/avatar-6.jpg",
    position: "Data engineer",
    department: "Database Administration",
    email: "bpinnigar1j@walmart.com",
    level: "SWE 2",

    status: { key: "freelance", title: "Freelance" },
    office: "62366 Daystar Court",
    stack: ["alpine js", "vuetify", "nuxt", "rails"],
    info: {
      phone: "121-397-6946",

      twitter: "bpinnigar1j",
    },
  },
  {
    user_id: 57,
    name: "Katey Orchart",
    avatar: "/web/images/avatar/avatar-10.jpg",
    position: "Machine learning engineer",
    department: "Embedded Systems",
    email: "korchart1k@artisteer.com",
    level: "Senior SWE",

    status: { key: "freelance", title: "Freelance" },
    office: "40735 Bay Parkway",
    stack: ["bulma", "firebase"],
    info: { phone: "984-748-1725" },
  },
  {
    user_id: 58,
    name: "Trixie Stokes",
    avatar: "/web/images/avatar/avatar-20.jpg",
    position: "Web developer",
    department: "Embedded Systems",
    email: "tstokes1l@marketwatch.com",
    level: "Principal Engineer",

    status: { key: "part-time", title: "Part Time" },
    office: "3 Warbler Center",
    stack: ["flask", "mysql", "mongodb"],
    info: { phone: "273-549-1787" },
  },
  {
    user_id: 59,
    name: "Shirleen Buckell",
    position: "Software test engineer",
    department: "Cloud Computing",
    email: "sbuckell1m@deviantart.com",
    level: "Principal Engineer",

    status: { key: "full-time", title: "Full Time" },
    office: "1 Bowman Road",
    stack: ["ember", "laravel jetstream", "rails", "next", "nuxt"],
    info: { phone: "995-820-6459" },
  },
  {
    user_id: 60,
    name: "Melony Gregh",
    avatar: "/web/images/avatar/avatar-7.jpg",
    position: "Computer programmer",
    department: "Embedded Systems",
    email: "mgregh1n@barnesandnoble.com",
    level: "Staff SWE",

    status: { key: "freelance", title: "Freelance" },
    office: "195 Mesta Street",
    stack: ["nuxt", "react native", "graphql", "postgresql"],
    info: { phone: "742-796-0303" },
  },
  {
    user_id: 61,
    name: "Aeriell Ruselin",
    avatar: "/web/images/avatar/avatar-14.jpg",
    position: "Mobile developer",
    department: "Embedded Systems",
    email: "aruselin1o@blogs.com",
    level: "Distinguished Engineer.",

    status: { key: "freelance", title: "Freelance" },
    office: "5 Sage Street",
    stack: ["nuxt", "spring boot", "postgresql", "bootstrapvue", "mysql"],
    info: {
      phone: "795-688-0342",

      twitter: "aruselin1o",
    },
  },
  {
    user_id: 62,
    name: "Bridie Millan",
    avatar: "/web/images/avatar/avatar-19.jpg",
    position: "Database administrator",
    department: "Embedded Systems",
    email: "bmillan1p@deliciousdays.com",
    level: "Senior SWE",

    status: { key: "intern", title: "Intern" },
    office: "39 Thackeray Terrace",
    stack: ["tailwind ui", "sqlite", "bootstrapvue"],
    info: {
      phone: "656-143-7576",

      twitter: "bmillan1p",
    },
  },
  {
    user_id: 63,
    name: "Brenda Plait",
    avatar: "/web/images/avatar/avatar-12.jpg",
    position: "Full stack engineer",
    department: "Data Engineering",
    email: "bplait1q@theglobeandmail.com",
    level: "Senior SWE",

    status: { key: "part-time", title: "Part Time" },
    office: "4 Northport Parkway",
    stack: ["firebase", "spring boot", "semantic ui"],
    info: {
      phone: "558-382-8341",

      twitter: "bplait1q",
    },
  },
  {
    user_id: 64,
    name: "Penelopa Upstell",
    avatar: "/web/images/avatar/avatar-3.jpg",
    position: "DevOps engineer",
    department: "Machine Learning",
    email: "pupstell1r@pen.io",
    level: "SWE 2",

    status: { key: "part-time", title: "Part Time" },
    office: "375 Saint Paul Terrace",
    stack: ["bootstrap studio", "express", "nuxt", "semantic ui"],
    info: {
      phone: "884-675-5391",

      twitter: "pupstell1r",
    },
  },
  {
    user_id: 65,
    name: "Cathleen Krugmann",
    avatar: "/web/images/avatar/avatar-19.jpg",
    position: "Embedded systems engineer",
    department: "Web Development",
    email: "ckrugmann1s@photobucket.com",
    level: "SWE 2",

    status: { key: "contractor", title: "Contractor" },
    office: "7 Eggendart Drive",
    stack: ["ant design", "ember", "next", "semantic ui", "laravel jetstream"],
    info: {
      phone: "967-568-5268",

      twitter: "ckrugmann1s",
    },
  },
  {
    user_id: 66,
    name: "Aron Sporle",
    avatar: "/web/images/avatar/avatar-9.jpg",
    position: "Software project manager",
    department: "Probability and Statistics for Computer Science",
    email: "asporle1t@fema.gov",
    level: "SWE 2",

    status: { key: "part-time", title: "Part Time" },
    office: "08 Delladonna Road",
    stack: ["tailwind ui", "next", "vuetify", "postgresql"],
    info: {
      phone: "283-424-4986",

      twitter: "asporle1t",
    },
  },
  {
    user_id: 67,
    name: "Juline Blacksland",
    avatar: "/web/images/avatar/avatar-20.jpg",
    position: "Data scientist",
    department: "Embedded Systems",
    email: "jblacksland1u@parallels.com",
    level: "SWE 1",

    status: { key: "intern", title: "Intern" },
    office: "072 Kropf Street",
    stack: ["gatsby", "tailwind ui", "ant design"],
    info: { phone: "234-680-8401" },
  },
  {
    user_id: 68,
    name: "Felix Llywarch",
    position: "Software architect",
    department: "Blockchain",
    email: "fllywarch1v@trellian.com",
    level: "Principal Engineer",

    status: { key: "part-time", title: "Part Time" },
    office: "9 Corscot Park",
    stack: ["materialize", "tailwind ui", "next", "ant design", "graphql"],
    info: { phone: "219-145-4960" },
  },
  {
    user_id: 69,
    name: "Munroe Kleewein",
    avatar: "/web/images/avatar/avatar-4.jpg",
    position: "Software project manager",
    department: "Probability and Statistics for Computer Science",
    email: "mkleewein1w@seattletimes.com",
    level: "SWE 1",

    status: { key: "contractor", title: "Contractor" },
    office: "88 Novick Point",
    stack: ["laravel jetstream", "nuxt", "angular", "ant design", "next"],
    info: {
      phone: "806-452-7176",

      twitter: "mkleewein1w",
    },
  },
  {
    user_id: 70,
    name: "Ciro Casserly",
    position: "Computer programmer",
    department: "Cloud Computing",
    email: "ccasserly1x@theatlantic.com",
    level: "SWE 1",

    status: { key: "freelance", title: "Freelance" },
    office: "7 Sherman Point",
    stack: ["ember", "next"],
    info: {
      phone: "405-529-7439",

      twitter: "ccasserly1x",
    },
  },
  {
    user_id: 71,
    name: "Dannie Hirtz",
    avatar: "/web/images/avatar/avatar-12.jpg",
    position: "Software architect",
    department: "Operating Systems",
    email: "dhirtz1y@vkontakte.ru",
    level: "SWE 2",

    status: { key: "part-time", title: "Part Time" },
    office: "95571 Ronald Regan Junction",
    stack: ["angular", "mongodb"],
    info: {
      phone: "412-559-0329",

      twitter: "dhirtz1y",
    },
  },
  {
    user_id: 72,
    name: "Blair Serman",
    avatar: "/web/images/avatar/avatar-18.jpg",
    position: "Applications engineer",
    department: "Software Application",
    email: "bserman1z@ca.gov",
    level: "Principal Engineer",

    status: { key: "freelance", title: "Freelance" },
    office: "627 Welch Lane",
    stack: ["rails", "bulma", "vue", "gatsby"],
    info: {
      phone: "824-200-0091",

      twitter: "bserman1z",
    },
  },
  {
    user_id: 73,
    name: "Jonas Kerrod",
    position: "Software test engineer",
    department: "Software Architecture",
    email: "jkerrod20@posterous.com",
    level: "SWE 2",

    status: { key: "intern", title: "Intern" },
    office: "45796 Veith Way",
    stack: ["firebase", "vuetify", "materialize", "bulma"],
    info: {
      phone: "854-398-8378",

      twitter: "jkerrod20",
    },
  },
  {
    user_id: 74,
    name: "Donaugh Melin",
    position: "Database administrator",
    department: "Embedded Systems",
    email: "dmelin21@merriam-webster.com",
    level: "SWE 1",

    status: { key: "intern", title: "Intern" },
    office: "144 Esch Circle",
    stack: ["react native", "ember"],
    info: {
      phone: "769-449-3246",

      twitter: "dmelin21",
    },
  },
  {
    user_id: 75,
    name: "Con MacDonnell",
    avatar: "/web/images/avatar/avatar-6.jpg",
    position: "SQA engineer",
    department: "Blockchain",
    email: "cmacdonnell22@psu.edu",
    level: "SWE 3",

    status: { key: "freelance", title: "Freelance" },
    office: "34 Glendale Hill",
    stack: ["bulma", "materialize", "tailwind ui"],
    info: {
      phone: "117-351-6717",

      twitter: "cmacdonnell22",
    },
  },
  {
    user_id: 76,
    name: "Ron Lingley",
    avatar: "/web/images/avatar/avatar-16.jpg",
    position: "SQA engineer",
    department: "Mobile Development",
    email: "rlingley23@surveymonkey.com",
    level: "Senior SWE",

    status: { key: "intern", title: "Intern" },
    office: "7424 Manitowish Road",
    stack: ["tailwind ui", "bulma"],
    info: { phone: "449-409-7218" },
  },
  {
    user_id: 77,
    name: "Doti Celloni",
    position: "Javascript engineer",
    department: "Software Architecture",
    email: "dcelloni24@princeton.edu",
    level: "Senior SWE",

    status: { key: "part-time", title: "Part Time" },
    office: "167 Sunnyside Way",
    stack: ["next", "materialize", "react native", "flask", "vuetify"],
    info: { phone: "458-496-7108" },
  },
  {
    user_id: 78,
    name: "Almira Dockrey",
    position: "Cyber security engineer",
    department: "Database Administration",
    email: "adockrey25@dailymotion.com",
    level: "Staff SWE",

    status: { key: "intern", title: "Intern" },
    office: "099 Melrose Park",
    stack: ["graphql", "tailwind ui", "rails"],
    info: {
      phone: "574-232-0196",

      twitter: "adockrey25",
    },
  },
  {
    user_id: 79,
    name: "Darlene Linnemann",
    avatar: "/web/images/avatar/avatar-6.jpg",
    position: "Data engineer",
    department: "System Hardware",
    email: "dlinnemann26@illinois.edu",
    level: "SWE 2",

    status: { key: "part-time", title: "Part Time" },
    office: "99 Veith Drive",
    stack: ["ember", "mysql"],
    info: {
      phone: "114-447-8899",

      twitter: "dlinnemann26",
    },
  },
  {
    user_id: 80,
    name: "Gerda Antonsen",
    avatar: "/web/images/avatar/avatar-8.jpg",
    position: "Mobile developer",
    department: "Probability and Statistics for Computer Science",
    email: "gantonsen27@google.it",
    level: "SWE 1",

    status: { key: "freelance", title: "Freelance" },
    office: "5865 Harbort Junction",
    stack: ["semantic ui", "ant design"],
    info: { phone: "337-980-5894" },
  },
  {
    user_id: 81,
    name: "Gypsy Gammett",
    avatar: "/web/images/avatar/avatar-3.jpg",
    position: "Database administrator",
    department: "Web Development",
    email: "ggammett28@list-manage.com",
    level: "SWE 2",

    status: { key: "freelance", title: "Freelance" },
    office: "8 Loftsgordon Way",
    stack: ["firebase", "semantic ui"],
    info: {
      phone: "171-780-2757",

      twitter: "ggammett28",
    },
  },
  {
    user_id: 82,
    name: "Linea Grindell",
    avatar: "/web/images/avatar/avatar-20.jpg",
    position: "Machine learning engineer",
    department: "Software Application",
    email: "lgrindell29@jigsy.com",
    level: "SWE 1",

    status: { key: "full-time", title: "Full Time" },
    office: "85689 Stoughton Road",
    stack: ["firebase", "sqlite", "materialize", "postgresql"],
    info: { phone: "180-607-2054" },
  },
  {
    user_id: 83,
    name: "Melania Stigell",
    avatar: "/web/images/avatar/avatar-1.jpg",
    position: "Database administrator",
    department: "Embedded Systems",
    email: "mstigell2a@amazonaws.com",
    level: "Principal Engineer",

    status: { key: "part-time", title: "Part Time" },
    office: "8 Pennsylvania Drive",
    stack: [
      "materialize",
      "tailwind ui",
      "bulma",
      "bootstrap studio",
      "gatsby",
    ],
    info: {
      phone: "260-729-2506",

      twitter: "mstigell2a",
    },
  },
  {
    user_id: 84,
    name: "Barbaraanne Bracken",
    position: "Data scientist",
    department: "Software Application",
    email: "bbracken2b@ow.ly",
    level: "SWE 3",

    status: { key: "part-time", title: "Part Time" },
    office: "05 Sunnyside Street",
    stack: ["foundation", "django", "mongodb", "bootstrap studio"],
    info: {
      phone: "586-165-5290",

      twitter: "bbracken2b",
    },
  },
  {
    user_id: 85,
    name: "Tiphany Kiffe",
    avatar: "/web/images/avatar/avatar-16.jpg",
    position: "SQA engineer",
    department: "Cloud Computing",
    email: "tkiffe2c@people.com.cn",
    level: "SWE 3",

    status: { key: "freelance", title: "Freelance" },
    office: "00 Fulton Park",
    stack: ["foundation", "firebase", "django", "nuxt", "graphql"],
    info: {
      phone: "203-437-3023",

      twitter: "tkiffe2c",
    },
  },
  {
    user_id: 86,
    name: "Alana Grinyer",
    avatar: "/web/images/avatar/avatar-16.jpg",
    position: "Web developer",
    department: "Embedded Systems",
    email: "agrinyer2d@typepad.com",
    level: "Staff SWE",

    status: { key: "freelance", title: "Freelance" },
    office: "03 North Drive",
    stack: ["express", "bootstrapvue", "ant design", "sqlite", "alpine js"],
    info: { phone: "631-901-5110" },
  },
  {
    user_id: 87,
    name: "Brodie Aylett",
    avatar: "/web/images/avatar/avatar-17.jpg",
    position: "Embedded systems engineer",
    department: "Artificial Intelligence",
    email: "baylett2e@sphinn.com",
    level: "Senior SWE",

    status: { key: "intern", title: "Intern" },
    office: "0055 Pennsylvania Place",
    stack: ["semantic ui", "bootstrapvue", "ant design", "foundation"],
    info: { phone: "238-512-8672" },
  },
  {
    user_id: 88,
    name: "Ilise Wartonby",
    avatar: "/web/images/avatar/avatar-7.jpg",
    position: "Machine learning engineer",
    department: "DevOps",
    email: "iwartonby2f@marriott.com",
    level: "Senior SWE",

    status: { key: "part-time", title: "Part Time" },
    office: "513 Derek Junction",
    stack: ["mongodb", "semantic ui", "flask"],
    info: { phone: "961-326-9847" },
  },
  {
    user_id: 89,
    name: "Erin Morando",
    position: "Javascript engineer",
    department: "Cloud Computing",
    email: "emorando2g@house.gov",
    level: "Principal Engineer",

    status: { key: "freelance", title: "Freelance" },
    office: "7012 Quincy Park",
    stack: ["django", "flask"],
    info: { phone: "786-902-0013" },
  },
  {
    user_id: 90,
    name: "Anthia Coda",
    avatar: "/web/images/avatar/avatar-15.jpg",
    position: "Embedded systems engineer",
    department: "Web Development",
    email: "acoda2h@umich.edu",
    level: "SWE 1",

    status: { key: "freelance", title: "Freelance" },
    office: "854 Oakridge Pass",
    stack: ["svelte", "bootstrapvue", "semantic ui", "django"],
    info: {
      phone: "469-294-4705",

      twitter: "acoda2h",
    },
  },
  {
    user_id: 91,
    name: "Mellisent Chance",
    avatar: "/web/images/avatar/avatar-17.jpg",
    position: "Data engineer",
    department: "Embedded Systems",
    email: "mchance2i@nyu.edu",
    level: "SWE 2",

    status: { key: "intern", title: "Intern" },
    office: "29 Lotheville Parkway",
    stack: ["gatsby", "firebase", "alpine js", "mysql", "rails"],
    info: { phone: "777-940-8829" },
  },
  {
    user_id: 92,
    name: "Doreen Rochester",
    position: "Computer programmer",
    department: "Probability and Statistics for Computer Science",
    email: "drochester2j@uol.com.br",
    level: "Principal Engineer",

    status: { key: "full-time", title: "Full Time" },
    office: "08570 Warrior Drive",
    stack: ["ant design", "django", "express", "semantic ui", "vue"],
    info: { phone: "427-452-0895" },
  },
  {
    user_id: 93,
    name: "Prisca Otteridge",
    avatar: "/web/images/avatar/avatar-2.jpg",
    position: "Database administrator",
    department: "Web Development",
    email: "potteridge2k@ucoz.com",
    level: "Staff SWE",

    status: { key: "part-time", title: "Part Time" },
    office: "73 Summerview Court",
    stack: ["bulma", "alpine js", "bootstrap studio", "nuxt", "vuetify"],
    info: {
      phone: "134-150-4040",

      twitter: "potteridge2k",
    },
  },
  {
    user_id: 94,
    name: "Ardeen Covolini",
    avatar: "/web/images/avatar/avatar-14.jpg",
    position: "Applications engineer",
    department: "DevOps",
    email: "acovolini2l@seesaa.net",
    level: "Principal Engineer",

    status: { key: "full-time", title: "Full Time" },
    office: "57 Sutherland Center",
    stack: ["graphql", "foundation", "react native", "spring boot"],
    info: { phone: "375-237-6338" },
  },
  {
    user_id: 95,
    name: "Brigitte Algy",
    avatar: "/web/images/avatar/avatar-1.jpg",
    position: "Cloud engineer",
    department: "Software Application",
    email: "balgy2m@si.edu",
    level: "Senior SWE",

    status: { key: "part-time", title: "Part Time" },
    office: "7 Grasskamp Circle",
    stack: ["gatsby", "angular", "graphql", "next", "rails"],
    info: { phone: "217-618-4316" },
  },
  {
    user_id: 96,
    name: "Vilhelmina Shynn",
    avatar: "/web/images/avatar/avatar-14.jpg",
    position: "Software project manager",
    department: "Web Development",
    email: "vshynn2n@craigslist.org",
    level: "SWE 1",

    status: { key: "contractor", title: "Contractor" },
    office: "3 Shopko Court",
    stack: ["rails", "graphql"],
    info: {
      phone: "229-678-3780",

      twitter: "vshynn2n",
    },
  },
  {
    user_id: 97,
    name: "Reynard Benini",
    avatar: "/web/images/avatar/avatar-9.jpg",
    position: "Data engineer",
    department: "Operating Systems",
    email: "rbenini2o@adobe.com",
    level: "Principal Engineer",

    status: { key: "part-time", title: "Part Time" },
    office: "8 Dorton Road",
    stack: ["graphql", "react native", "materialize", "mysql"],
    info: {
      phone: "500-525-7586",

      twitter: "rbenini2o",
    },
  },
  {
    user_id: 98,
    name: "Geri Mebes",
    avatar: "/web/images/avatar/avatar-4.jpg",
    position: "Machine learning engineer",
    department: "Embedded Systems",
    email: "gmebes2p@a8.net",
    level: "SWE 1",
    status: { key: "freelance", title: "Freelance" },
    office: "7 Forest Run Point",
    stack: ["firebase", "express", "sqlite", "bootstrapvue", "flask"],
    info: { phone: "987-278-2443" },
  },
  {
    user_id: 99,
    name: "Paulie McCloughlin",
    avatar: "/web/images/avatar/avatar-3.jpg",
    position: "Javascript engineer",
    department: "Web Development",
    email: "pmccloughlin2q@imgur.com",
    level: "SWE 2",

    status: { key: "contractor", title: "Contractor" },
    office: "195 Kipling Hill",
    stack: ["express", "bootstrap studio", "react native"],
    info: { phone: "664-446-2368" },
  },
  {
    user_id: 100,
    name: "Kathi Mariault",
    avatar: "/web/images/avatar/avatar-7.jpg",
    position: "Cloud engineer",
    department: "DevOps",
    email: "kmariault2r@edublogs.org",
    level: "Staff SWE",

    status: { key: "full-time", title: "Full Time" },
    office: "35 Upham Alley",
    stack: ["angular", "vue"],
    info: {
      phone: "486-478-2460",
      twitter: "kmariault2r",
    },
  },
];
