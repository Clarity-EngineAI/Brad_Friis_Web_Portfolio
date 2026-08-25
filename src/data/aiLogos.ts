import type { ImageMetadata } from "astro";
import base44 from "../assets/ai-logos/base44.png";
import capcut from "../assets/ai-logos/capcut.png";
import claude from "../assets/ai-logos/claude.png";
import codex from "../assets/ai-logos/codex.png";
import cursor from "../assets/ai-logos/cursor.svg";
import firebase from "../assets/ai-logos/firebase.png";
import gemini from "../assets/ai-logos/gemini.png";
import github from "../assets/ai-logos/github.png";
import googleAntigravity from "../assets/ai-logos/google-antigravity.png";
import googleCloud from "../assets/ai-logos/google-cloud.png";
import grok from "../assets/ai-logos/grok.png";
import n8n from "../assets/ai-logos/n8n.png";
import obsidian from "../assets/ai-logos/obsidian.webp";
import openai from "../assets/ai-logos/openai.png";
import sanity from "../assets/ai-logos/sanity.png";
import supabase from "../assets/ai-logos/supabase.png";
import vercel from "../assets/ai-logos/vercel.svg";

export interface Logo {
  name: string;
  image: ImageMetadata;
}

export const aiLogos: Logo[] = [
  { name: "Claude", image: claude },
  { name: "OpenAI", image: openai },
  { name: "Codex", image: codex },
  { name: "Gemini", image: gemini },
  { name: "Grok", image: grok },
  { name: "GitHub", image: github },
  { name: "Cursor", image: cursor },
  { name: "Vercel", image: vercel },
  { name: "Supabase", image: supabase },
  { name: "Firebase", image: firebase },
  { name: "Google Cloud", image: googleCloud },
  { name: "Google Antigravity", image: googleAntigravity },
  { name: "n8n", image: n8n },
  { name: "Sanity", image: sanity },
  { name: "Obsidian", image: obsidian },
  { name: "CapCut", image: capcut },
  { name: "Base44", image: base44 },
];
