export type BlogBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; style: "bullet" | "number"; items: string[] }
  | { kind: "break" }
  | { kind: "image"; key: string; alt: string; caption?: string }
  | { kind: "video"; url: string; caption?: string };

/**
 * A YouTube or Vimeo watch/share URL, turned into its privacy-respecting embed URL.
 *
 * Returns null for a URL that matches neither host's known patterns, so the renderer can
 * skip an unembeddable video rather than pointing an iframe at a page that refuses to embed.
 */
export function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
      }
      const shortMatch = parsed.pathname.match(/^\/(shorts|embed)\/([^/]+)/);
      if (shortMatch) return `https://www.youtube-nocookie.com/embed/${shortMatch[2]}`;
      return null;
    }
    if (host === "vimeo.com") {
      const id = parsed.pathname.match(/^\/(\d+)/)?.[1];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export interface BlogPost {
  slug: string;
  title: string;
  dek: string;
  date: string;
  dateLabel: string;
  category: string;
  /** Optional lead image, shown above the body. */
  image?: { key: string; alt: string; caption?: string };
  body: BlogBlock[];
}

/** FALLBACK ONLY — this is not what publishes.
 *
 *  Live blog content comes from Sanity (`src/lib/sanity.ts`). This array is the build-time
 *  fallback used when Sanity is unreachable, so an outage produces the previous posts rather
 *  than an empty blog page. Editing it will not change the site while Sanity is reachable.
 *
 *  Publication order is newest first; Sanity sorts by date descending explicitly.
 */
export const posts: BlogPost[] = [
  {
    slug: "plastic-bags",
    title: "The plastic bags",
    dek: "Eleven years old, a school fundraiser, and a lawns-based theory of who to knock on.",
    date: "2026-08-15",
    dateLabel: "15 August 2026",
    category: "A story",
    body: [
      { kind: "heading", text: "The Territory" },
      { kind: "paragraph", text: "The school was raising money and the prize for selling the most was a scientific calculator." },
      { kind: "paragraph", text: "I was eleven. I heard the word calculator and something in me went very quiet and very focused, the way it does before you decide a thing is already yours and you are simply waiting for everyone else to find out." },
      { kind: "paragraph", text: "They gave every student a sample pack — sandwich bags and freezer bags — and a form to write the orders on. One sheet of paper. It had columns for the name and the quantity, and the sheet was clearly built on the assumption that you would sell to an aunty, and possibly a grandmother, and then stop." },
      { kind: "paragraph", text: "I looked at the sheet and I understood it was not going to be adequate." },
      { kind: "paragraph", text: "So before I sold a single bag, I got a book." },
      { kind: "break" },
      { kind: "paragraph", text: "We lived six kilometres out of Hastings, on a farm — ten acres of raspberries and thirty thousand chickens. I had a Raleigh ten speed, light blue and silver. The samples went in my school bag with the order book, and after school every day I rode into town and worked the suburbs." },
      { kind: "paragraph", text: "Akina. Frimley. I did not do the whole town. I did the parts that felt safe, and the way I decided what was safe was the lawns. A well mown lawn meant a kind person lived there. That was the entire system. I do not know where I got it from and I ran it for the whole campaign without ever once questioning it, and I still could not tell you today whether it was a good system or whether I simply never tested it against anything." },
      { kind: "paragraph", text: "Knock. Sample pack. Sandwich or freezer. Signature in the book." },
      { kind: "paragraph", text: "Then move on, because there was no second sale to be had at that door — a person buys their bags once — and standing about being liked was not what I was there for." },
      { kind: "paragraph", text: "Nobody was ever unkind to me. Not once. I have gone looking through that whole period for the door that got slammed and there is not one in there. A no meant nothing at all to me. A no was a house that was simply not the house, and the next one was thirty seconds away, and one of them was going to be a yes." },
      { kind: "paragraph", text: "Then the weekends, as well. It ran the whole of term three — two and a half months of it — and by the second week it did not feel like a fundraiser any more, it felt like a job." },
      { kind: "paragraph", text: "And at the end of every day, whenever the light started going and wherever my last house had put me, I got back on the bike and rode the six or seven kilometres home. It depended where I finished. That was the only part of the arrangement I would call work." },
      { kind: "paragraph", text: "I do not think my parents ever fully understood the extent of it." },
      { kind: "paragraph", text: "I think, by that stage, they had learned to just hold on and hope for the best." },
      { kind: "break" },
      { kind: "paragraph", text: "There was an assembly at the end. The whole school in the hall, parents down the back, and I went up in front of all of them and collected the calculator." },
      { kind: "paragraph", text: "Afterwards the principal spoke to my mother, and she told me later what he had said, which was that I had very nearly outsold the entire school combined." },
      { kind: "paragraph", text: "I was not there for that part. It reached me the way most true things reach a child — secondhand, from your mother, in the kitchen, some time after the fact and slightly flattened by the trip across." },
      { kind: "paragraph", text: "I did not have a number of my own. Nobody ever gave me one. I had a book full of signatures and a principal's sentence arriving via my mother, and to this day that is the whole of the evidence." },
      { kind: "break" },
      { kind: "paragraph", text: "The calculator was a Casio." },
      { kind: "paragraph", text: "I want to be honest about the calculator. It was not the Casio I wanted. The Casio I wanted was the one with Space Invaders built into it, which a boy could actually use." },
      { kind: "paragraph", text: "I did not know what a cosine was. I had no reason to square anything." },
      { kind: "paragraph", text: "It sat on my shelf." },
    ],
  },
  {
    slug: "cubs-uniform",
    title: "The Cubs uniform",
    dek: "Seven years old, a beetroot tin, and a lesson about which way the asking runs.",
    date: "2026-08-15",
    dateLabel: "15 August 2026",
    category: "A story",
    body: [
      { kind: "heading", text: "The Tin" },
      { kind: "paragraph", text: "I was seven years old and I needed a Cubs uniform." },
      { kind: "paragraph", text: "Mum said we could not afford it. She said it plainly, the way you tell a child a fact rather than a disappointment, and I accepted the fact and went looking for a solution. I did not think I was doing anything unusual. I thought I was being helpful." },
      { kind: "paragraph", text: "We lived in Manningham, South Australia. It is a street like every other street in that part of the world — one side, then the other side, and nothing in between worth crossing for." },
      { kind: "paragraph", text: "I found a tin in the kitchen. Sliced beetroot. It still had the purple on the inside from what it used to be, and I checked the rim with my thumb to make sure there was nothing sharp on it, because people were going to be putting their fingers in there and it seemed rude to cut them." },
      { kind: "paragraph", text: "Then I went to work." },
      { kind: "paragraph", text: "I started at one end and I went down one side of the street, and then I came back up the other side. I do not remember crossing a road. I do not think I was allowed to." },
      { kind: "paragraph", text: "At every door I said the same thing." },
      { kind: "paragraph", text: "I would like to ask you to please help me get a Cubs uniform, because I want to go to Cubs, and Mum said we cannot afford it." },
      { kind: "paragraph", text: "They were middle class Australian housewives, mostly, answering their own front doors in the middle of an afternoon. I do not remember a single one of them saying no. I do not remember any of their faces either. I remember the sound the coins made going into a tin that used to have beetroot in it, which is a specific sound, and which I liked." },
      { kind: "paragraph", text: "It took one afternoon. By the end of it I had enough." },
      { kind: "paragraph", text: "I was wearing stubbies, a striped t-shirt, and thongs, which is what Australians call jandals." },
      { kind: "break" },
      { kind: "paragraph", text: "I went home and I told them." },
      { kind: "paragraph", text: "That is the part I would change, if I were allowed to change it, and I am not. I did not hide the tin. I did not put it under my bed and produce the money later with a story attached to it. I walked in the door and I told my mother and my father that it was all sorted, that I could go to Cubs now, because we had the money." },
      { kind: "paragraph", text: "I had earned it." },
      { kind: "paragraph", text: "I was very proud." },
      { kind: "paragraph", text: "My mother looked at the tin." },
      { kind: "paragraph", text: "“What on earth have you been doing! You little bugger, you'll return this money to every house!”" },
      { kind: "paragraph", text: "Then she kicked me up the bum, and she put her shoes on, and she walked me back out the front door." },
      { kind: "paragraph", text: "We did the whole street again. Both sides. Every house I had been to, in the same order I had been to them, and at each one I stood on the step and said sorry and gave the money back, and she stood behind me while I did it." },
      { kind: "paragraph", text: "It took considerably longer than the first pass had." },
      { kind: "break" },
      { kind: "paragraph", text: "I got the uniform." },
      { kind: "paragraph", text: "The money was miraculously found, which is the phrase I have always used for it and I have never examined it too closely." },
      { kind: "paragraph", text: "I remember putting it on. I remember pulling the leather bobble up the scarf, tight to my neck, and standing in front of the mirror and being amazed at how clean it was. How important a thing it was to own. Every badge I won after that, my mother sewed onto it herself." },
      { kind: "paragraph", text: "The uniform lasted a year, maybe two, before I grew out of it." },
      { kind: "paragraph", text: "The walk back lasted longer. I have spent thirty years knocking on doors and asking people whether I can help them, and what comes back comes back after. It took a beetroot tin and one furious woman marching me up my own street to teach me which way round it goes." },
      { kind: "paragraph", text: "I still do not own a branded shirt." },
    ],
  },
];
