# Prompt: turn the composite week into an interactive calendar mockup

Paste everything below into a new Perplexity Computer session inside the **Brad Friis personal website copy** project.

---

## Task

I am developing a section of my personal portfolio website that communicates the breadth and depth of a ten-year senior operating role in education technology.

Turn the source material in this prompt into:

1. A concise, implementation-ready data structure for the calendar entries.
2. A polished rewrite of every entry in a natural portfolio voice.
3. A category and colour system.
4. A complete set of interaction states.
5. A responsive, accessible HTML/CSS/JavaScript mockup that I can inspect in action.

Do not stop at a recommendation or code sample. Build the mockup, test it at desktop and mobile widths, and deploy a private preview so I can interact with it.

## Context and legal constraints

The section represents a **composite illustrative week**, not a literal historical week. It combines recurring types of work to show the operating range the role required.

I cannot name my former employer or show, quote, closely recreate, or imply access to any actual work produced during that employment. This includes presentations, proposals, agreements, training resources, reports, customer documents, internal systems and screenshots.

The mockup must therefore:

- Say clearly that this is an illustrative composite, not the record of a particular week.
- Use no real dates.
- Name no employer, customer or confidential project.
- Show no employer or customer logos.
- Contain no real document excerpts or simulated screenshots of actual work.
- Avoid confidential commercial values, contract terms and customer-identifying details.
- Describe categories of responsibility rather than the substance of a specific engagement.
- Refer to PowerSchool and Schoology only if genuinely necessary. The calendar should not need either name.
- Make no new factual claims and invent no figures.

The purpose is to show the scope and interconnected nature of the role without exposing confidential material.

## Voice

Rewrite the entries in a polished version of my own voice. Before drafting, read the current project copy and voice material, especially:

- `COPY/homepage-2026-08-18-draft.md`
- `design/09-blog-voice.md`
- Any newer positioning or homepage copy files that supersede them

The entries are portfolio interface copy, not blog posts. Use the homepage register as the closer reference.

The voice should be:

- First person where ownership needs to be clear.
- Direct, concrete and commercially literate.
- Calm rather than self-congratulatory.
- Specific about the action, decision or system involved.
- Comfortable showing that I worked strategically and hands-on.
- Written in New Zealand English: modelling, organisation, programme, licence as a noun and no serial comma unless needed for clarity.
- Human in rhythm. Allow sentence length to vary naturally.
- Concise enough for an interface, but not reduced to generic résumé fragments.

Avoid:

- Corporate capability language and consultant fog.
- Strings of abstract nouns.
- Inflated claims about leadership or impact.
- Repeating “I was responsible for” in every entry.
- Repeating the same sentence construction across entries.
- Describing me with adjectives when the work can make the point.
- AI-style throat-clearing, symmetrical phrasing and forced summaries.
- “Passionate”, “results-driven”, “proven track record”, “journey”, “synergy”, “transformative”, “game-changing”, “leveraged”, “unlock”, “supercharge”, “at scale” and “I’m not just X, I’m Y”.
- Em dashes.
- Exclamation marks.

Every expanded note should explain what was happening and what I did. It should not append a generic sentence telling the reader what this “demonstrates”.

## Editorial objective

The calendar must communicate more than busyness. A full diary of small tasks would make me look reactive or overloaded. The entries need to reveal that I operated across:

- Strategy
- System and service design
- Hands-on production
- Delivery and facilitation
- Commercial and financial judgement
- Relationship and partner management
- People leadership
- Governance and reporting

Each visible calendar card should be quickly scannable. Its expanded content should reveal the broader objective, my ownership and the connections to other parts of the operation.

Use 18–20 entries. Keep all important areas represented, but combine or remove entries if two cards make substantially the same point.

## Required entry data structure

Create one maintainable JavaScript array or JSON-compatible object. Do not duplicate content between the desktop and mobile interfaces.

Use a structure close to this, changing fields only when there is a clear implementation reason:

```js
{
  id: "stable-kebab-case-id",
  day: "monday",
  dayOrder: 1,
  slot: "morning",
  slotOrder: 1,
  displayTime: "Morning",
  duration: "60 min", // optional; omit if the interface works better without durations
  title: "Short calendar title",
  summary: "One concise sentence visible on the card or in the hover preview.",
  detail: "Two or three short sentences for the persistent expanded state.",
  primaryCategory: "commercial",
  relatedCategories: ["finance", "implementation"],
  modes: ["strategy", "hands-on"],
  featured: false,
  connections: ["other-entry-id"]
}
```

Requirements:

- Use stable IDs.
- Keep the source order explicit instead of depending on array order.
- Use controlled vocabulary for categories, modes, days and slots.
- Do not put CSS classes or raw colour values inside each entry.
- Put category metadata in a separate configuration object.
- Use `connections` sparingly and only where a relationship is useful in the interface.
- Include TypeScript-style interfaces or JSDoc typedefs alongside the data, even if the mockup uses plain JavaScript.
- Make the final data easy to move into Astro, React or another component system later.

## Category system and colours

Create 7–8 primary categories. Use one primary category per entry and allow related categories to appear as neutral text tags.

Start with this taxonomy, consolidating only if the final calendar becomes visually noisy:

1. Commercial and sales
2. Implementation and technical delivery
3. Customer enablement and training
4. Marketing and community
5. Support and service design
6. Finance, contracts and renewals
7. Leadership and governance
8. Partnerships and public sector

Define category metadata separately:

```js
const categories = {
  commercial: {
    label: "Commercial and sales",
    shortLabel: "Commercial",
    color: "...",
    tint: "...",
    darkColor: "...",
    darkTint: "..."
  }
};
```

Colour requirements:

- Use a restrained, professional palette suited to a senior personal portfolio.
- The complete calendar should not look like a rainbow productivity app.
- Colour should help identify the primary category, not decorate the whole card.
- Prefer a coloured edge, small category marker and restrained tint over fully saturated card backgrounds.
- Provide light and dark theme tokens.
- Meet WCAG AA contrast.
- Never rely on colour alone. Every entry must display a category label or equivalent textual cue.
- Selected, focused and related states must remain distinguishable for colour-blind users.
- Do not use gradients.

You may refine these suggested families:

- Commercial: burnt orange
- Implementation: blue
- Enablement: teal
- Marketing: plum
- Support: ochre
- Finance and renewals: green
- Leadership: slate
- Partnerships and public sector: rose or brick

Check the palette in context and adjust it if the categories compete with one another.

## Calendar structure

The desktop experience should read as a designed “representative week”, not as a clone of Google Calendar or Outlook.

Desktop:

- Five working-day columns.
- Use broad periods such as Morning, Midday and Afternoon rather than pretending these are exact historical timestamps.
- Give the entries enough white space to remain readable.
- Avoid a minute-by-minute grid.
- Include a concise legend or category filter.
- Make the first view communicate range before the user interacts.
- Use typography, rules, spacing and controlled colour as the main visual language.
- Do not add decorative stock imagery or literal office illustrations.

Mobile:

- Do not compress five columns onto a phone.
- Recompose the same data as a vertical agenda grouped by day.
- Expand details inline or in an accessible bottom sheet. Do not depend on a narrow modal.
- Preserve category filtering and the relationship between entries.
- Make the day and current section easy to identify while scrolling.
- Ensure no information is available only through hover.

## Interaction states

Design and implement all of the following:

### Default

- Calendar card shows period, title, primary category and a concise summary where space permits.
- The week should be legible without interaction.

### Hover-capable pointer

- Hover reveals a short preview, not the entire detail.
- The hovered card gains clear elevation or border emphasis without jumping in size.
- Directly connected entries may receive a subtle related state.
- Hover must never be the only route to information.

### Keyboard focus

- Every entry is reachable in a logical tab order.
- `:focus-visible` is obvious and not merely a colour shift.
- Enter or Space opens the persistent detail.
- Escape closes it and returns focus to the originating card.

### Selected or open

- Click or keyboard activation opens a persistent detail panel.
- On desktop, use an anchored popover only if it cannot be clipped and remains accessible. A side detail panel or expanding region is acceptable and may be more robust.
- On mobile, use inline expansion or an accessible bottom sheet.
- The selected card remains visibly selected.
- The detail state includes title, polished detail copy, primary category, related categories and operating modes.
- Closing behaviour must be clear.

### Related

- If an entry has explicit connections, selecting it subtly identifies those entries.
- Related styling must not overpower the selected state.
- Explain the relationship with text or an accessible label, not colour alone.

### Filtered

- Users can filter by primary category.
- Non-matching entries should either be hidden cleanly or visibly de-emphasised. Choose one behaviour and explain it.
- Include a clear “All” state.
- Announce result-count changes to screen readers.

### Touch

- No essential hover interaction.
- First tap opens the detail rather than simulating hover.
- Touch targets should be at least 44 by 44 CSS pixels.

### Reduced motion

- Respect `prefers-reduced-motion`.
- Motion should clarify state changes and remain brief.
- No scroll-jacking, parallax or decorative motion.

### Loading, empty and error

- Since the prototype uses local data, a loading experience is not necessary.
- Include an intentional empty-filter state.
- Add a simple visible fallback message if the JavaScript fails; the core entry titles should still exist in the HTML or be recoverable through a `<noscript>` block.

## Source entries

These are working notes, not approved copy. Rewrite them rather than lightly editing them.

### Monday: commercial direction

1. **Weekly operating priorities**
   - Review priorities across pipeline, delivery, support, renewals and partner commitments.
   - Assess activity across the complete operation, identify immediate risks and opportunities and coordinate the week’s priorities.
   - Modes: strategy, leadership, coordination.

2. **Prospecting and lead-generation review**
   - Review prospects, outreach activity and next commercial actions.
   - Evaluate the pipeline, identify priority opportunities and plan the outreach, follow-up and supporting assets required to progress them.
   - Modes: strategy, analysis, delivery.

3. **Sales sequence development**
   - Develop phone scripts and automated email sequences.
   - Design the messaging, timing and follow-up logic, connecting the sequence to presentations, demonstrations and proposals.
   - Modes: system design, writing, hands-on production.

4. **Platform demonstration**
   - Prepare and deliver a demonstration for a prospective customer.
   - Adapt the demonstration to the prospect’s operating environment while accounting for implementation, onboarding, support and commercial implications.
   - Modes: preparation, delivery, commercial judgement.

### Tuesday: implementation and adoption

5. **New-customer implementation plan**
   - Translate customer requirements into a technical implementation sequence.
   - Define stages, responsibilities, dependencies and risks, coordinating technical delivery with onboarding, leadership communication and support.
   - Modes: strategy, systems design, project coordination.

6. **Customer leadership onboarding**
   - Guide customer leaders through adoption priorities and implementation decisions.
   - Help leadership understand the organisational decisions required for adoption and adapt the session to their context.
   - Modes: advisory, facilitation, delivery.

7. **Training programme development**
   - Design a learning pathway for leadership, staff, students, parents and support teams.
   - Decide which parts belong in workshops, webinars, video, self-paced learning or supporting resources.
   - Modes: learning design, planning, production.

8. **Training resource production**
   - Produce materials for a workshop and subsequent self-directed learning.
   - Create the practical material required to turn the training strategy into a usable experience.
   - Modes: content design, visual communication, hands-on production.

### Wednesday: customer experience and market development

9. **Support escalation and resolution**
   - Investigate an issue affecting a customer’s use of the platform.
   - Coordinate the immediate response while considering communication, technical resolution, documentation and prevention.
   - Modes: problem-solving, communication, technical coordination.

10. **Support-system improvement**
    - Update support guidance and response standards based on recurring needs.
    - Convert patterns in customer enquiries into clearer materials, processes and service expectations.
    - Modes: systems design, documentation, continuous improvement.

11. **Customer communications asset**
    - Create a concise resource introducing a new capability or workflow.
    - Translate technical or product information into clear, audience-appropriate communication using product knowledge, visual design and instructional thinking.
    - Modes: communication design, production, product translation.

12. **Professional community engagement**
    - Support a nationwide network of roughly 650 teachers and school leaders.
    - Plan engagement that balances resource sharing, peer connection, customer value, product adoption and long-term relationships.
    - Keep “roughly 650” hedged unless a newer verified source changes it.
    - Modes: community strategy, communication, facilitation.

### Thursday: commercial systems and growth

13. **Financial projection and proposal review**
    - Model the commercial implications of a prospective agreement.
    - Connect the analysis to proposal structure, licensing, implementation requirements and longer-term customer value.
    - Modes: financial modelling, commercial strategy, decision support.

14. **Proposal and EULA development**
    - Prepare commercial documentation for a prospective customer.
    - Shape the proposal, responsibilities, commercial structure and end-user licensing requirements, checking that commitments can be supported through delivery, billing and renewal.
    - Modes: commercial writing, negotiation preparation, risk management.

15. **Annual renewal planning**
    - Review customer status and plan the next stage of the renewal cycle.
    - Consider adoption, support history, relationships, billing and future requirements before setting the renewal approach.
    - Modes: analysis, relationship strategy, commercial management.

16. **Billing and referral systems**
    - Review invoicing, payment and referral-programme activity.
    - Manage the systems supporting billing and reciprocal referral relationships, connecting administration with customer communication, partner management and growth.
    - Modes: operational design, administration, relationship management.

### Friday: partnerships, leadership and governance

17. **International reseller meeting**
    - Coordinate priorities with the international platform partner.
    - Liaise across commercial, technical, marketing, support, renewal and leadership stakeholders.
    - Modes: partnership management, negotiation, coordination.

18. **Government-funded facilitation**
    - Deliver strategic guidance and professional learning for a school as an accredited government facilitator.
    - Help school leaders connect technology decisions with teaching, learning and organisational priorities.
    - Modes: facilitation, advisory, professional learning.

19. **Integration workflow review**
    - Refine an integration tool intended to reduce school database administration.
    - Contribute technical support and design thinking, connecting user needs, data processes, implementation and support.
    - The source claim is that the integration saved schools a minimum of eight days of database work each. Do not publish that figure in this mockup unless it is verified against the project claims register.
    - Modes: workflow design, technical support, user advocacy.

20. **Board reporting and team review**
    - Consolidate performance, risks, priorities and resourcing for leadership.
    - Connect commercial activity, customer delivery, financial performance, operational risks and partnership priorities. Review work across internal staff and external contractors.
    - Modes: governance, reporting, people management.

## Editorial checks before implementation

After rewriting the entries:

1. Check that no two titles are interchangeable.
2. Check that the expanded notes do not all use the same grammatical pattern.
3. Remove any sentence that merely says the work was strategic, interconnected or valuable without showing how.
4. Check that sales, implementation, enablement, marketing, support, finance, renewals, government facilitation, staff management, board reporting and the reseller relationship all remain visible.
5. Check that hands-on production does not obscure senior ownership.
6. Check that senior ownership does not erase hands-on production.
7. Check every number and hedge. Do not strengthen “roughly” or “around”.
8. Check that no entry can be mistaken for a literal account of a named customer or week.
9. Keep visible summaries short enough to scan in a five-column layout.
10. Read the full week aloud and remove anything that sounds generated, inflated or excessively polished.

## Mockup requirements

Build a self-contained prototype in a sensible project subdirectory. Use semantic HTML, modern CSS and vanilla JavaScript unless the existing project stack makes Astro significantly more practical.

The prototype must include:

- A short section introduction and the composite-week disclaimer.
- Desktop five-day calendar.
- Mobile vertical agenda using the same data.
- Category legend and filtering.
- All interaction states defined above.
- Persistent entry detail.
- Keyboard operation.
- Screen-reader labels and announcements.
- Light and dark themes, following system preference.
- Responsive behaviour at approximately 1440 px, 1024 px, 768 px and 375 px.
- `prefers-reduced-motion` support.
- A brief implementation note below or alongside the prototype describing the chosen data model and interaction approach.

Do not make the prototype look like a SaaS dashboard. It belongs on a distinctive senior portfolio website. Use an editorial information-design approach: strong typography, quiet rules, controlled colour, generous spacing and deliberate asymmetry where useful.

Do not add:

- Stock imagery.
- Decorative illustrations.
- Fake company names or fake customer data.
- Productivity statistics.
- Percentage-complete treatments.
- Glassmorphism.
- Gradients.
- 3D effects.
- Excessive rounded cards.
- Gratuitous animation.

## Required outputs

Deliver:

1. The final polished entry data in its own `.js`, `.json` or `.ts` file.
2. The category configuration and design tokens.
3. The working prototype files.
4. A short Markdown implementation note covering:
   - Data schema
   - Category logic
   - Interaction model
   - Desktop-to-mobile transformation
   - Accessibility decisions
   - Any editorial decisions to combine or remove source entries
5. A deployed private preview I can open and interact with.

Before presenting the work:

- Test every entry with mouse, keyboard and touch-sized controls.
- Test filtering and the empty-filter state.
- Test opening and closing details.
- Test at desktop and 375 px mobile widths.
- Check for clipping, overflow, unreadably small type and colour-contrast failures.
- Confirm that the employer is not named and no confidential work has been reproduced or implied.

When you respond, give me the preview first, then summarise the editorial and implementation choices. Do not paste all of the code into the chat if the files and preview are already attached.

