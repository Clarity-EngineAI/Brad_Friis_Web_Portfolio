import type { ImageMetadata } from "astro";
import adplusScan from "../assets/letters/adplus-advertising.jpg";
import berghScan1 from "../assets/letters/andrew-bergh-1.png";
import berghScan2 from "../assets/letters/andrew-bergh-2.png";
import canwestScan from "../assets/letters/canwest-media.jpg";
import powerschoolScan from "../assets/letters/powerschool.png";
import hawkesBayScan from "../assets/letters/hawkes-bay-tourism.jpg";
import industrySchoolScan1 from "../assets/letters/the-industry-school-1.png";
import industrySchoolScan2 from "../assets/letters/the-industry-school-2.png";
import rototunaScan from "../assets/letters/rototuna-high-schools.png";
import adplusLogo from "../assets/letter-logos/adplus-tracta.jpg";
import elimLogo from "../assets/letter-logos/elim-christian-college.png";
import hawkesBayLogo from "../assets/letter-logos/hawkes-bay-tourism.png";
import mediaworksLogo from "../assets/letter-logos/mediaworks.png";
import rototunaLogo from "../assets/letter-logos/rototuna-high-schools.png";
import industrySchoolLogo from "../assets/letter-logos/the-industry-school.png";
import powerschoolLogo from "../assets/letter-logos/powerschool.png";

export type LetterBlock =
  | { kind: "aside"; text: string }
  | { kind: "heading"; level: 3 | 4; text: string }
  | { kind: "lines"; lines: string[] }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: { lead?: string; text: string }[] };

export interface Letter {
  slug: string;
  referee: string;
  role: string;
  organisation: string;
  documentType: string;
  date: string;
  dateLabel: string;
  context: string;
  pullQuote: string;
  body: LetterBlock[];
  /** Page images of the original document, in order. Only redacted derivatives belong here. */
  scans?: { image: ImageMetadata; alt: string }[];
  /** The organisation's mark, shown under the About-this-document card. Omitted where no
      usable logo exists, or where showing one would identify a gag-covered employer. */
  logo?: { image: ImageMetadata; alt: string };
}

/** Publication order is newest first, set by `Brad Friis Resumes/References/README.md`. */
export const letters: Letter[] = [
  {
    // The only entry that is an email rather than a solicited letter, hence the documentType.
    // It is also the only reference written by the vendor rather than a customer, which is why
    // it carries the channel-partner work the customer letters cannot speak to.
    slug: "powerschool",
    referee: "Gavin Jeffries",
    role: "Senior Account Director, Asia",
    organisation: "PowerSchool",
    documentType: "Email",
    date: "2025-05-30",
    dateLabel: "30 May 2025",
    context:
      "Gavin ran PowerSchool's Asia account team and wrote after Brad told him he was considering a move away from the partnership. The reply is unsolicited: Brad had asked for nothing.",
    pullQuote:
      "Your deep PowerSchool expertise and strong connections across our team, long-standing relationships with Schoology customers in New Zealand and Australia, and the trust you've built have all added significant value to our presence in the Oceania market.",
    body: [
      { kind: "lines", lines: ["Subject: Partnership Considerations and Next Steps", "30 May 2025"] },
      { kind: "paragraph", text: "Dear Brad," },
      { kind: "paragraph", text: "It was a pleasure speaking with you yesterday." },
      {
        kind: "paragraph",
        text: "While I'm naturally disappointed to hear that you may be exploring a career shift away from PowerSchool, I'm equally excited about what the future may hold for you.",
      },
      {
        kind: "paragraph",
        text: "Brad, you've been instrumental in managing the partnership with us. Your deep PowerSchool expertise and strong connections across our team, long-standing relationships with Schoology customers in New Zealand and Australia, and the trust you've built have all added significant value to our presence in the Oceania market.",
      },
      {
        kind: "paragraph",
        text: "That said, we'll continue to respect and support whatever direction you choose, and respond accordingly. Please do keep us updated as your plans evolve.",
      },
      { kind: "paragraph", text: "Wishing you clarity as you take the next step forward." },
      {
        kind: "lines",
        lines: ["Warm regards,", "Gavin Jeffries", "Senior Account Director - Asia", "PowerSchool Group LLC."],
      },
    ],
    scans: [
      {
        image: powerschoolScan,
        alt: "The email on PowerSchool letterhead, ending with Gavin Jeffries' signature block. The two email addresses and the phone number are blanked out.",
      },
    ],
    logo: { image: powerschoolLogo, alt: "PowerSchool" },
  },
  {
    slug: "andrew-bergh",
    referee: "Andrew Bergh",
    role: "High School Principal",
    organisation: "International school, Hong Kong",
    documentType: "Reference letter",
    date: "2025-06-16",
    dateLabel: "16 June 2025",
    context:
      "Nine years working with Brad on Schoology, first as a teacher and senior leader at a multi-campus New Zealand school, later as a principal in Hong Kong.",
    pullQuote:
      "One of Brad's most remarkable qualities is his ability to support teachers, particularly those resistant to change.",
    body: [
      { kind: "lines", lines: ["16 June 2025"] },
      { kind: "paragraph", text: "To Whom It May Concern," },
      {
        kind: "paragraph",
        text: "I am writing to provide my highest recommendation for Brad Friis, an exceptional educational technologist with whom I have had the privilege of working closely over the past nine years. During this time, I have known Brad in my capacity as both a classroom teacher and senior leader in a multi-campus New Zealand school, and more recently as the high school principal of an international school in Hong Kong.",
      },
      {
        kind: "paragraph",
        text: "My professional relationship with Brad began in 2016 when I embarked on an online Master's program focused on learning management systems (LMSs). After identifying Schoology as a leading LMS, I reached out to Brad, who generously offered full access to resources and support in exchange for research insights. His generosity, strategic thinking, and commitment to education were evident from the very beginning. I am now a doctoral candidate studying technology-enhanced feedback, a journey that has been inspired by my ongoing collaboration with Brad.",
      },
      {
        kind: "paragraph",
        text: "As the sole representative of Schoology in New Zealand, Brad has earned the nickname \u201cMister Schoology\u201d among staff at the school I worked at. His unparalleled expertise in the product, combined with a thorough understanding of New Zealand's educational landscape, has made him an invaluable resource for schools. Over the years, Brad has led numerous hands-on and remote workshops for teachers and has always been willing to assist with both strategic planning and technical fixes. But more importantly, Brad also connected us with other educators and technical experts when needed, further enriching our professional networks and broadening the impact of Schoology within the education sector.",
      },
      {
        kind: "paragraph",
        text: "More specifically, under Brad's guidance, my previous school successfully adopted Schoology across multiple campuses, transforming it into a cornerstone of our teaching and learning ecosystem. His innovative approach included the development of a mastery system based on the \u201cfive Es\u201d framework, which greatly enhanced our ability to assess and support students. Beyond the classroom, Schoology became the backbone of our co-curricular programs, supporting everything from sports teams and the Duke of Edinburgh Programme to music and student-led conferences. Brad also played a pivotal role in integrating parents into the platform, transforming them into active, informed partners in their children's education.",
      },
      {
        kind: "paragraph",
        text: "Thanks to Brad's long-term planning and foresight, our school was exceptionally well-prepared for the challenges of COVID-19. While many schools struggled, we transitioned seamlessly to online learning, maintaining consistent teaching and learning standards through the use of linked sections. Brad's proactive approach laid the groundwork for this success, enabling us to move to asynchronous classes supported by weekly synchronous Zoom sessions overnight. Post-pandemic, the blended learning model has continued to thrive, yielding impressive results, including a 95% pass rate in the 2024 school year, despite many students requiring learning support.",
      },
      {
        kind: "paragraph",
        text: "Brad's support has been a constant through significant sector changes, including the disruptions of COVID-19, curriculum rewrites, and policy shifts. His steadfast belief in the value of Schoology, when implemented thoughtfully, has been a guiding force for our school. He consistently brought a student-centered mindset to our strategic conversations, contributing invaluable insight and humility to complex, system-level discussions. One of Brad's most remarkable qualities is his ability to support teachers, particularly those resistant to change. This because he recognises the challenges of technology adoption and works tirelessly to make transitions manageable and aligned with staff needs. His empathetic and proactive approach ensures that even the most hesitant team members became confident users of Schoology.",
      },
      {
        kind: "paragraph",
        text: "It is difficult to overstate the impact Brad has had on my previous school and the broader community of Schoology schools in New Zealand. His expertise, generosity, and commitment to fostering agency, equity and reducing teacher workload have been transformative. I wholeheartedly recommend Brad as an outstanding educational technologist and leader, capable of driving meaningful change and innovation in any educational setting.",
      },
      { kind: "lines", lines: ["Sincerely,"] },
      { kind: "lines", lines: ["Andrew Bergh", "High School Principal", "[contact details withheld]"] },
    ],
    logo: {
      image: elimLogo,
      alt: "Elim Christian College.",
    },
    scans: [
      {
        image: berghScan1,
        alt: "Page one of the original two-page reference letter, on Christian Alliance International School letterhead, dated 16 June 2025.",
      },
      {
        image: berghScan2,
        alt: "Page two of the letter, ending with the signature block. The contact details beneath it are blanked out.",
      },
    ],
  },
  {
    slug: "rototuna-high-schools",
    referee: "Pranesh Lad",
    role: "IT System Engineer",
    organisation: "Rototuna High Schools",
    documentType: "Unsolicited note",
    date: "2025-05-26",
    dateLabel: "26 May 2025",
    context: "Sent unprompted. The only unsolicited document in the archive.",
    pullQuote:
      "Thanks to your dedication, our team and students can use Schoology much more effectively, and we truly value the excellent service you provide.",
    body: [
      { kind: "aside", text: "[Email — subject: A Big Thank You from Rototuna High Schools]" },
      {
        kind: "lines",
        lines: [
          "From: Pranesh Lad [email withheld]",
          "To: Brad Friis [email withheld]",
          "Date: Monday, May 26, 2025, 11:56 AM",
        ],
      },
      { kind: "paragraph", text: "Hi Brad," },
      {
        kind: "paragraph",
        text: "I wanted to send a personal note from Rototuna High Schools to express our sincere gratitude for all your fantastic support with our Schoology queries.",
      },
      {
        kind: "paragraph",
        text: "Your help has been absolutely invaluable to us. We really appreciate your quick responses and how your deep knowledge has been key to solving every issue we've thrown your way. You're great at explaining things clearly, and we always appreciate your patience and the proactive tips you offer.",
      },
      {
        kind: "paragraph",
        text: "Working with you is always a pleasure - your professionalism and positive attitude make everything so much smoother.",
      },
      {
        kind: "paragraph",
        text: "Thanks to your dedication, our team and students can use Schoology much more effectively, and we truly value the excellent service you provide.",
      },
      { kind: "paragraph", text: "You're a real star, Brad :)" },
      { kind: "lines", lines: ["Kind regards,"] },
      { kind: "lines", lines: ["Pranesh Lad", "IT System Engineer", "[contact details withheld]"] },
    ],
    logo: {
      image: rototunaLogo,
      alt: "Rototuna High Schools \u2014 Te Kura Nui o Rototuna.",
    },
    scans: [
      {
        image: rototunaScan,
        alt: "The original unsolicited email from Rototuna High Schools, dated 26 May 2025. Sender and recipient addresses and the internal ticket link are blanked out.",
      },
    ],
  },
  {
    slug: "the-industry-school",
    referee: "Adrian Pilgrim",
    role: "Teaching and Learning Manager, Professional Services",
    organisation: "The Industry School",
    documentType: "Reference",
    date: "2025-01-01",
    dateLabel: "2025",
    context: "Written after a single Schoology strategy was agreed across five campuses, Years 10–12.",
    pullQuote:
      "At a time when we were seriously considering moving away from Schoology, Brad helped us see the platform in a new light.",
    body: [
      { kind: "paragraph", text: "To whom it may concern," },
      { kind: "paragraph", text: "Working with Brad has been a game-changer for our organisation." },
      {
        kind: "paragraph",
        text: "We are a large school spread across five campuses, each with its own context and workflows. Historically, communication between campuses has been a challenge, and many core tasks were being repeated, often two or three times across sites. Brad took the time to first consult with our leadership team to define the top-level strategic goals of our organisation. From there, he engaged directly with each campus to understand their unique needs, challenges, and constraints. He then developed a unified Schoology strategy that tied everything together, improving consistency, reducing duplicated effort, and strengthening the connection between campuses. The impact has been significant, both in terms of efficiency and the sense of cohesion across our sites. For this alone, we are incredibly grateful.",
      },
      {
        kind: "paragraph",
        text: "His commitment to going above and beyond is evident in everything he does. Brad is consistently responsive, often replying immediately to support requests, and works proactively to ensure we\u2019re making the most of what we have. He regularly brings ideas to the table not because he\u2019s asked to, but because he genuinely wants to see our organisation thrive.",
      },
      {
        kind: "paragraph",
        text: "At a time when we were seriously considering moving away from Schoology, Brad helped us see the platform in a new light. He helped us unlock its full potential by tailoring it to our goals and creating custom strategies and workarounds that fit how we actually operate. This clarity and customisation shifted our thinking, giving us the confidence not only to stay with Schoology, but to invest in getting the very best from it.",
      },
      {
        kind: "paragraph",
        text: "Brad also worked across all layers of our organisation, from IT staff, school leaders, curriculum designers, administrators to the teachers, with an ability to adapt his style and approach to suit the audience. He got everyone aligned and working collaboratively in ways we hadn\u2019t seen before.",
      },
      {
        kind: "paragraph",
        text: "More than anything, Brad is trusted and deeply respected by our staff. They love working with him, not just because the support is effective, but because it\u2019s delivered with warmth, patience, and a great sense of humour. His sessions are valuable, empowering, and genuinely enjoyable.",
      },
      {
        kind: "paragraph",
        text: "We would not hesitate in recommending Brad to any educational organisation that needs a trusted expert in digital learning - someone who not only understands the tools, but knows how to bring people together and deliver lasting change.",
      },
      {
        kind: "lines",
        lines: ["Adrian Pilgrim", "Teaching and Learning Manager | Professional Services"],
      },
    ],
    logo: {
      image: industrySchoolLogo,
      alt: "The Industry School.",
    },
    scans: [
      {
        image: industrySchoolScan1,
        alt: "Page one of the original two-page reference on The Industry School letterhead.",
      },
      {
        image: industrySchoolScan2,
        alt: "Page two of the reference, ending with Adrian Pilgrim's name and title.",
      },
    ],
  },
  {
    slug: "canwest-media",
    referee: "Philip Lemon",
    role: "Sales Manager",
    organisation: "CanWest Media, Radioworks",
    documentType: "Reference letter",
    date: "2006-02-11",
    dateLabel: "11 February 2006",
    context:
      "Philip managed Brad at CanWest Media and wrote after both had left, on the letterhead of The Radio Network, where he had since moved. The letter is about CanWest, not The Radio Network.",
    pullQuote:
      "Several of Brad's past clients have mentioned his ability a number of years on from his departure.",
    body: [
      { kind: "aside", text: "[The Radio Network letterhead \u2014 \u201cradionetwork\u201d wordmark]" },
      { kind: "lines", lines: ["February 11th 2006"] },
      { kind: "paragraph", text: "To Whom It May Concern," },
      {
        kind: "paragraph",
        text: "Brad Friis was employed by CanWest Media Ltd. for a period of 2.5 years as a senior account manager. A solid client base was handed over with the position and Brad quickly learned how to successfully fulfill each of his client's individual needs.",
      },
      {
        kind: "paragraph",
        text: "Brad demonstrated exceptional abilities in all aspects of his role. His friendly and approachable manner made him a positive influence within his sales team and he was well liked. Brad quickly became known for thinking outside of the square and for creating new and untapped opportunities for his clients. Several of Brad's past clients have mentioned his ability a number of years on from his departure.",
      },
      {
        kind: "paragraph",
        text: "Monthly KPI targets were always achieved and Brad's dedication to his role resulted in consistent growth of his client base and overall billing for each quarter. He has a tenacious attitude toward his work and was often the leading member of his team. I found a highly commendable aspect of Brads approach to his role was the innate ability to discover new methods of attracting and securing new business in what can be a very difficult industry to work in. Brad has considerable ability in developing an idea to proposal and then to presentation to a client with a more often than not winning result.",
      },
      {
        kind: "paragraph",
        text: "Brad's resignation was of his own choosing and I would consider Brad a great asset to any business development and account management role. Without reservation I would like to recommend him for any position he might consider in what I expect will be a very bright and rewarding future.",
      },
      {
        kind: "paragraph",
        text: "Should you require any further information please don't hesitate to contact me on the details listed below.",
      },
      { kind: "lines", lines: ["Yours sincerely,"] },
      { kind: "aside", text: "[signature]" },
      {
        kind: "lines",
        lines: ["Philip Lemon", "The Radio Network", "e: [email withheld]", "c: [mobile withheld]"],
      },
      {
        kind: "aside",
        text: "[Footer: station logos \u2014 Newstalk ZB, Classic Hits, ZM, Radio Sport, Radio Hauraki, Flava, Viva, Coast]",
      },
    ],
    logo: {
      image: mediaworksLogo,
      alt: "MediaWorks, the company RadioWorks now trades as.",
    },
    scans: [
      {
        image: canwestScan,
        alt: "The original reference letter on The Radio Network letterhead, dated 11 February 2006. Philip Lemon's email and mobile beneath the signature are covered by a grey block.",
      },
    ],
  },
  {
    slug: "adplus-advertising",
    referee: "Andy Walker",
    role: "Managing Director",
    organisation: "Adplus Advertising (now Tracta)",
    documentType: "Reference letter",
    date: "2003-03-24",
    dateLabel: "24 March 2003",
    context:
      "Andy was Brad's managing director at Adplus, and wrote this after fifteen months there. The company now trades as Tracta.",
    pullQuote:
      "He was always pleasant but somehow managed to obtain an extraordinarily high strike rate from which many clients were converted.",
    body: [
      {
        kind: "aside",
        text: "[Adplus Advertising letterhead \u2014 logo, address, PO box, phone, fax, email: withheld]",
      },
      { kind: "lines", lines: ["24 March 2003"] },
      { kind: "paragraph", text: "To Whom It May Concern" },
      {
        kind: "paragraph",
        text: "Brad Friis has worked for Adplus for 15 months. During that time his duties included promoting the services of our company to prospective Advertising and Web based clients in a professional manner (his role with Adplus was obviously quite defined as are all roles within our organisation).",
      },
      {
        kind: "paragraph",
        text: "I say a 'professional manner' because finding people with Brad's skill is not an easy thing. He was always pleasant but somehow managed to obtain an extraordinarily high strike rate from which many clients were converted. Often he did so with little or no material backup what so ever. People with Brad's skill do not come along every day.",
      },
      {
        kind: "paragraph",
        text: "Brad was always very quick to learn and came to us with the attitude of wanting to grow and develop his skill base. He came highly recommended and achieved far [sic] during the period he was with us than I had imagined would be the case. Often too I found Brad putting in hours over and above that expected in order to improve his results.",
      },
      {
        kind: "paragraph",
        text: "Brad leaves us of his own accord and I take this opportunity to wish him all the very best for the future.",
      },
      { kind: "aside", text: "[signature]" },
      { kind: "lines", lines: ["AR Walker", "Managing Director"] },
      { kind: "aside", text: "[Footer, set in a display face: \u201cBe Healed From Boring Advertising\u201d]" },
    ],
    logo: {
      image: adplusLogo,
      alt: "Tracta, the agency that Adplus Advertising now trades as.",
    },
    scans: [
      {
        image: adplusScan,
        alt: "Scan of the original one-page reference letter on Adplus Advertising letterhead, dated March 2003 and signed in ink above the managing director's name.",
      },
    ],
  },
  {
    slug: "hawkes-bay-tourism",
    referee: "Hamish Lowry",
    role: "General Manager",
    organisation: "Hawke's Bay Tourism",
    documentType: "Reference letter",
    date: "2003-02-12",
    dateLabel: "12 February 2003",
    context:
      "Written by the client rather than the employer, after two years working together while Brad was at Adplus. The oldest published document.",
    pullQuote:
      "It is my observation that Brad has assisted with a significant improvement in tourism industry buy-in to the core marketing activities of Hawke's Bay Tourism during this time.",
    body: [
      {
        kind: "aside",
        text: "[Hawke's Bay Tourism letterhead \u2014 logo, address, telephone, facsimile, email, website: withheld]",
      },
      { kind: "lines", lines: ["12 February, 2003"] },
      { kind: "paragraph", text: "TO WHOM IT MAY CONCERN" },
      {
        kind: "paragraph",
        text: "I have had pleasure in working with Brad Friis in his capacity as Business Development Manager of Adplus Ltd during the past two years. During this time a highly successful business partnership has formed between Hawke's Bay Tourism and this major regional advertising company.",
      },
      {
        kind: "paragraph",
        text: "It is my observation that Brad has assisted with a significant improvement in tourism industry buy-in to the core marketing activities of Hawke's Bay Tourism during this time. This transformation was the result of a deliberate strategy to improve the profile of Hawke's Bay Tourism with the local industry and to increase participation in our key marketing opportunities; namely the Hawke's Bay Visitor Guide and the regional website www.hawkesbaynz.com.",
      },
      {
        kind: "paragraph",
        text: "Brad ensured that service excellence was paramount and clearly recognised its vital importance in the highly competitive marketplace of today.",
      },
      {
        kind: "paragraph",
        text: "I am happy to recommend Brad to future employers. My observations are that he is an individual with integrity; plus the drive and dedication to reach and exceed sales targets.",
      },
      {
        kind: "paragraph",
        text: "Please do not hesitate to contact me if you require any further comment.",
      },
      { kind: "lines", lines: ["Yours sincerely"] },
      { kind: "aside", text: "[signature]" },
      { kind: "lines", lines: ["Hamish Lowry", "General Manager", "[email withheld]"] },
    ],
    logo: {
      image: hawkesBayLogo,
      alt: "Hawke's Bay Tourism.",
    },
    scans: [
      {
        image: hawkesBayScan,
        alt: "Scan of the original one-page reference letter on Hawke's Bay Tourism letterhead, dated 12 February 2003 and signed in blue ink by the general manager. His email beneath the signature is covered by a grey block.",
      },
    ],
  },
];

export function getLetter(slug: string): Letter | undefined {
  return letters.find((letter) => letter.slug === slug);
}
