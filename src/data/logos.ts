import type { ImageMetadata } from "astro";
import bfm from "../assets/logos/95bfm.png";
import harveyNorman from "../assets/logos/harvey-norman.png";
import hawkesBayChamber from "../assets/logos/hawkes-bay-chamber-of-commerce.png";
import nzLaw from "../assets/logos/nz-law.png";
import nzca from "../assets/logos/nzca.png";
import sacredHill from "../assets/logos/sacred-hill.png";
import steelfort from "../assets/logos/steelfort.png";
import theIcehouse from "../assets/logos/the-icehouse.png";
import theRadioNetwork from "../assets/logos/the-radio-network.png";

export interface Logo {
  name: string;
  image: ImageMetadata;
}

/* Source files are trimmed to their artwork so a single max-height reads as
   consistent optical sizing rather than consistent file dimensions. */
export const logos: Logo[] = [
  { name: "The Radio Network", image: theRadioNetwork },
  { name: "95bFM", image: bfm },
  { name: "Harvey Norman", image: harveyNorman },
  { name: "Sacred Hill", image: sacredHill },
  { name: "Steelfort", image: steelfort },
  { name: "NZ LAW", image: nzLaw },
  { name: "Hawke's Bay Chamber of Commerce", image: hawkesBayChamber },
  { name: "The Icehouse", image: theIcehouse },
  { name: "NZCA", image: nzca },
];

/** Stacked lockups need more height than wordmarks to read at the same optical weight. */
export function isStackedLogo(logo: Logo): boolean {
  return logo.image.width / logo.image.height < 2.6;
}
