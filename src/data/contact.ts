/* The master resume writes the mobile as "+64 022 854 9696". A country code and a
   trunk zero cannot both appear, so the site uses the corrected form. */
export const contact = {
  email: "contact@bradfriis.com",
  phone: "+64 22 854 9696",
  phoneHref: "tel:+64228549696",
  location: "Auckland, New Zealand",
  linkedin: "https://www.linkedin.com/in/bradfriis",
} as const;

/* Cal.com booking. `link` is the only field to change: it is the path after cal.com/.

   It points at the PROFILE page, not a single event, because there are two event types
   and one button cannot open both:
     brad-friis/15min  — Quick scope
     brad-friis/30min  — Deeper dive
   The profile page lists both and lets the visitor choose. Which one they pick is itself
   information worth having. To send everyone to one event instead, put the full
   "brad-friis/15min" form here.

   Left empty renders nothing and loads no third-party script — see BookingButton. That
   guard stays in place: a live button opening an empty calendar reads worse than no
   button at all.

   `label` is the button text. `note` is the line under it; keep it short — it sits in a
   sidebar column on the CV. */
export const booking = {
  link: "brad-friis",
  label: "Book a meeting",
  note: "Pick a time that suits you.",
  durationHint: "15 minutes to scope, or 30 to go deeper.",
} as const;

export const bookingEnabled = booking.link.length > 0;
