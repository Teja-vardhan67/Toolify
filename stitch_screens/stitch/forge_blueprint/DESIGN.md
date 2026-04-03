# Design System Specification: Industrial Futurist

## 1. Overview & Creative North Star: The Kinetic Blueprint
This design system is anchored in the "Kinetic Blueprint" philosophy. We are moving away from the "soft and friendly" web toward a high-fidelity, hardware-inspired aesthetic. It is grounded in the functional honesty of a machine shop and the precision of aerospace engineering. 

The system rejects traditional depth (shadows) in favor of **Tactile Utility**. By utilizing a rigid bento-grid architecture and high-contrast linework, we create a digital interface that feels like a physical piece of premium equipment. Think less "software app" and more "industrial control module."

### The Signature Look
- **Intentional Asymmetry:** Break the grid with oversized monospaced data points overlapping container boundaries.
- **Hardware Authenticity:** Use 1px borders as structural beams, not just dividers.
- **Data as Ornament:** Typography is not just for reading; it is a graphical element.

---

## 2. Colors & Tonal Logic
Our palette is derived from raw materials: slate, oxidized metal, and safety-critical signals.

| Role | Token | Hex | Application |
| :--- | :--- | :--- | :--- |
| **Surface** | `surface` | `#111317` | The primary matte slate base. |
| **Action** | `primary` | `#FFB4A4` | International Safety Orange (Interaction/Brand). |
| **Action Container** | `primary_container` | `#FF5733` | Deep saturated orange for high-priority hits. |
| **Typography (High)** | `on_surface` | `#E2E2E8` | Paper White for maximum legibility. |
| **Typography (Low)** | `secondary` | `#B9C8DE` | Industrial Silver for meta-data and labels. |
| **Success** | `on_tertiary_fixed` | `#111C2D` | Deep Forest Green indicators. |
| **Error** | `error` | `#FFB4AB` | Rust Red for critical alerts. |

### The "Technical Line" Rule
Unlike traditional modern systems that use background shifts to define sections, this system **mandates** the use of the `outline_variant` (#5B403A) or `outline` (#AB8982) for 1px solid borders. Every module is a "part" in a larger assembly.
- **Nesting Hierarchy:** Use `surface_container_low` for the main background and `surface_container_highest` for interactive cards. 
- **The Glow Effect:** To provide a premium feel without shadows, use a 1px "Inner Glow" on primary buttons using `primary_fixed` at 20% opacity.

---

## 3. Typography: The Engineering Font Stack
Typography must feel "set" into the interface, like etched serial numbers on a chassis.

- **Headings (Space Grotesk):** Bold, wide, and authoritative. Use `display-lg` for hero moments, treating the text as a structural element.
- **Data & Mono (JetBrains Mono):** Use for all numbers, status codes, and technical labels. This conveys precision and "live" data.
- **Body (Inter):** High-legibility sans-serif for long-form content.

**Editorial Style:** Use `label-sm` in all-caps with 0.1rem letter spacing for category headers to mimic industrial plate engraving.

---

## 4. Elevation & Structural Depth
We do not use soft shadows. Depth is achieved through **Structural Layering**.

- **Zero-Radius Hardness:** All containers use a `0px` border radius. Soft corners are prohibited; we value the "machined" edge.
- **The Blueprint Layer:** Use a subtle CSS grid background or a 100px dot-matrix pattern on `surface_container_lowest` to reinforce the "technical drawing" feel.
- **Interaction "Lift":** Instead of a shadow, an active state is indicated by a color inversion or a 1px border weight increase to 2px, mimicking a physical button being pressed.
- **Ghost Borders:** For secondary information, use `outline_variant` at 40% opacity. It should look like a faint guide line in a CAD drawing.

---

## 5. Components

### Buttons (Tactile Triggers)
- **Primary:** Background `primary_container`, Text `on_primary`. 1px solid border of `primary_fixed`. No radius.
- **Secondary:** Background `transparent`, 1px border `outline`. Text `on_surface`.
- **States:** On `:hover`, shift background to `primary` and text to `on_primary_fixed`. The transition should be instant (0ms or 50ms) to feel mechanical.

### The Bento Cards
- Every card must have a 1px border `outline_variant`.
- **Internal Spacing:** Use the `4` (0.9rem) or `6` (1.3rem) spacing tokens for internal padding to maintain a dense, "tool-heavy" look.
- **Header Accents:** A small 4px x 4px square of `primary` in the top-left corner of a card signifies an "active" module.

### Input Fields (Technical Entry)
- **Default:** `surface_container_high` background with a bottom-only border of `outline`.
- **Focus:** 1px solid border of `primary` surrounding the entire input. Text cursor should be the `primary` color.

### Status Indicators (Chips)
- No rounded ends. Rectangular only. 
- Use `tertiary_container` for background with `on_tertiary_fixed_variant` text for a muted, utilitarian look.

---

## 6. Do's and Don'ts

### Do
- **Do** align all elements to the 0.2rem (`1`) increments. Precision is paramount.
- **Do** use Monospaced fonts for any value that changes (clocks, prices, counters).
- **Do** treat "International Safety Orange" as a high-voltage element—use it sparingly to draw the eye to exactly one primary action per view.
- **Do** use vertical and horizontal lines to create "crosshair" effects in the corners of the viewport.

### Don't
- **Don't** use border-radius. Ever. 
- **Don't** use blur or drop shadows. If you need to separate a layer, use a high-contrast border or a complete background color shift to `surface_bright`.
- **Don't** use centered typography for technical data. Keep it left-aligned or right-aligned to suggest a spreadsheet or ledger.
- **Don't** use "soft" transitions. Use "Step" timing functions in CSS for animations to mimic a mechanical flip-clock or a hardware switch.

---

## 7. Signature Component: The "Data-Tape"
To lean into the high-end hardware aesthetic, implement a "Data-Tape" at the top or bottom of the screen. This is a thin (24px) strip of `surface_container_lowest` containing scrolling monospaced text in `secondary` (#94A3B8), displaying system logs or real-time metrics. It reinforces the "Always-on" nature of a professional tool.