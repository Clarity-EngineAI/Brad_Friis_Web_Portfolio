import type { ImageMetadata } from "astro";
import elimChristianCollege from "../assets/letter-logos/elim-christian-college.png";
import rototunaHighSchools from "../assets/letter-logos/rototuna-high-schools.png";
import theIndustrySchool from "../assets/letter-logos/the-industry-school.png";
import hillcrestHighSchool from "../assets/week-logos/hillcrest-high-school.jpeg";
import hamiltonGirlsHighSchool from "../assets/week-logos/hamilton-girls-high-school.png";
import ionaCollege from "../assets/week-logos/iona-college.png";
import educationNz from "../assets/week-logos/education-nz.webp";
import mckenzieInstitute from "../assets/week-logos/mckenzie-institute.png";
import sydneyGrammarSchool from "../assets/week-logos/sydney-grammar-school.png";
import burnsideHighSchool from "../assets/week-logos/burnside-high-school.png";
import sanctaMariaCollege from "../assets/week-logos/sancta-maria-college.png";
import stMarysDiocesanSchool from "../assets/week-logos/st-marys-diocesan-school.jpeg";

/* Camberwell Grammar is dropped for now: the source file has a solid dark
   (navy) background, and .logo-strip's mix-blend-mode:multiply treatment
   (built for transparent/white-ground logos) renders it as an opaque dark
   block instead of blending into the strip. Re-add once a transparent-
   background version is available. */

export interface WeekLogo {
  name: string;
  image: ImageMetadata;
}

/* Source files are trimmed to their artwork so a single max-height reads as
   consistent optical sizing rather than consistent file dimensions. Reuses
   the same three logos as the letters pages where a reference letter and
   this row cover the same school. */
export const weekLogos: WeekLogo[] = [
  { name: "The Industry School", image: theIndustrySchool },
  { name: "Rototuna High Schools", image: rototunaHighSchools },
  { name: "Elim Christian College", image: elimChristianCollege },
  { name: "Hillcrest High School", image: hillcrestHighSchool },
  { name: "Hamilton Girls' High School", image: hamiltonGirlsHighSchool },
  { name: "Iona College", image: ionaCollege },
  { name: "Education New Zealand", image: educationNz },
  { name: "The McKenzie Institute", image: mckenzieInstitute },
  { name: "Sydney Grammar School", image: sydneyGrammarSchool },
  { name: "Burnside High School", image: burnsideHighSchool },
  { name: "Sancta Maria College", image: sanctaMariaCollege },
  { name: "St Mary's Diocesan School", image: stMarysDiocesanSchool },
];

/** Stacked lockups need more height than wordmarks to read at the same optical weight. */
export function isStackedWeekLogo(logo: WeekLogo): boolean {
  return logo.image.width / logo.image.height < 2.6;
}
