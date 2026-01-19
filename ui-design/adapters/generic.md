# Generic Adapter

Rules for generating tool-agnostic prompts that work with any AI design tool.

<adapter_info>
Service: Any AI UI generator
Output: Universal prompts that work across tools
Strength: Flexibility, future-proofing
</adapter_info>

<prompt_structure>

Generic prompts use clear, descriptive language without tool-specific terminology:

```
[Screen Description]

This is a [screen type] for [app type/purpose].

LAYOUT
[Overall structure and positioning]

ELEMENTS (top to bottom)
1. [Element description with visual details]
2. [Element description with visual details]
3. [Element description with visual details]

STYLE
- Colors: [color descriptions with hex codes]
- Typography: [font and size notes]
- Spacing: [spacing descriptions]
- Effects: [shadows, borders, etc.]

INTERACTION (if applicable)
- [Interaction descriptions]
```

</prompt_structure>

<transformation_rules>

## Screen Spec → Generic Prompt

1. **Describe, don't prescribe:**
   - Say what it looks like, not how to build it
   - Use visual language, not technical terms
   - Assume no specific component library

2. **Be explicit about everything:**
   - Don't assume defaults
   - Specify colors as hex codes
   - Describe spacing in pixels or relative terms
   - Mention all visual attributes

3. **Structure clearly:**
   - Use numbered lists for elements
   - Group related information
   - Include all sections even if simple

4. **Include context:**
   - What kind of app this is for
   - The purpose of the screen
   - User goal on this screen

</transformation_rules>

<element_descriptions>

Describe UI elements in universal terms:

| Component Type | Generic Description |
|----------------|---------------------|
| Button (primary) | "A prominent button with filled background in [color], white text reading '[label]'" |
| Button (secondary) | "A subtle button with border outline, no fill, [color] text reading '[label]'" |
| Text input | "A text entry field with '[label]' label above, placeholder text '[placeholder]'" |
| Password input | "A password entry field with dots/bullets hiding the input" |
| Checkbox | "A small square checkbox with '[label]' text beside it" |
| Radio buttons | "A set of circular radio buttons with options: [options]" |
| Dropdown/Select | "A dropdown selector showing '[default]' with arrow indicator" |
| Card | "A contained section with [background], [shadow] shadow, [radius] rounded corners" |
| Avatar | "A circular user image, [size] in diameter" |
| Icon | "A [name] icon, [size], [color]" |
| Navigation bar | "A horizontal bar at the top with [content]" |
| Sidebar | "A vertical panel on the left side with [content]" |
| Modal | "A centered overlay box on dimmed background containing [content]" |
| Toast/Alert | "A small notification box in [position] showing [message]" |

</element_descriptions>

<color_descriptions>

Describe colors clearly:

| Token | Generic Description |
|-------|---------------------|
| Primary | "The main brand color (#HEXVAL), a [descriptive] [color family]" |
| Secondary | "A supporting color (#HEXVAL), [descriptive]" |
| Background | "Background is [color] (#HEXVAL)" |
| Text | "Main text in [color] (#HEXVAL), muted text in [color] (#HEXVAL)" |
| Border | "Borders use a [light/subtle] [color] (#HEXVAL)" |

Example: "The main brand color is a vibrant blue (#2563EB), with text in near-black (#0F172A) and muted elements in slate gray (#64748B)."

</color_descriptions>

<spacing_descriptions>

Describe spacing in understandable terms:

| Spacing | Generic Description |
|---------|---------------------|
| Tight (8px) | "tight spacing" or "compact" |
| Normal (16px) | "comfortable spacing" or "standard" |
| Relaxed (24px) | "generous spacing" or "spacious" |
| Large (32px+) | "very spacious" or "ample breathing room" |

Include pixel values for precision: "comfortable spacing (16px between elements)"

</spacing_descriptions>

<example_transformation>

**Input: Screen Spec**
```markdown
# SCR-01: Login

Route: /login
Layout: centered-card (max-width: 400px)

## Components
1. Logo — centered, 48px height
2. Heading — "Welcome back", typography.h2
3. InputField — label: "Email", type: email
4. InputField — label: "Password", type: password
5. Button — label: "Sign In", variant: primary, fullWidth
6. Link — "Forgot password?", centered
7. Divider — text: "or"
8. Button — label: "Continue with Google", variant: secondary, icon: google
```

**Output: Generic Prompt**
```
LOGIN SCREEN

This is a login screen for a web application. The user's goal is to sign in to their account.

LAYOUT
A single card centered on the page, maximum width 400 pixels. The background behind the card is a very light gray (#F8FAFC). The card itself is white with a subtle shadow and rounded corners (6px radius).

ELEMENTS (top to bottom, inside the card)

1. LOGO AREA
   A placeholder for a company logo, 48 pixels tall, horizontally centered.

2. HEADING
   Large text reading "Welcome back" - 24px size, semibold weight, centered, dark gray color (#0F172A).

3. EMAIL INPUT
   A text entry field for email address.
   - Label above: "Email"
   - Placeholder text: "you@example.com"
   - Full width of the card content area
   - Light border (#E2E8F0), rounded corners

4. PASSWORD INPUT
   A password entry field (input hidden with dots).
   - Label above: "Password"
   - Full width
   - Same styling as email input

5. SIGN IN BUTTON
   A prominent button spanning the full width.
   - Blue background (#2563EB)
   - White text: "Sign In"
   - Rounded corners, comfortable padding

6. FORGOT PASSWORD LINK
   Small, muted text link centered below the button.
   - Text: "Forgot password?"
   - Color: slate gray (#64748B)

7. DIVIDER
   A horizontal line with the word "or" in the center.
   - Line color: light gray (#E2E8F0)
   - "or" text in small, muted style

8. GOOGLE SIGN IN BUTTON
   A secondary button spanning full width.
   - White/light background with border
   - Google icon on the left side
   - Text: "Continue with Google"

STYLE
- Colors: Primary blue #2563EB, text #0F172A, muted text #64748B, borders #E2E8F0, background #F8FAFC
- Typography: Modern sans-serif font (like Inter), base size 16px
- Spacing: 16px between form elements, 24px padding inside card
- Card shadow: subtle (0 4px 6px rgba(0,0,0,0.1))
- Corners: 6px radius on card and inputs, slightly more on buttons

INTERACTION
- Clicking "Sign In" validates form and submits
- "Forgot password?" opens password recovery flow
- "Continue with Google" initiates OAuth flow
```

</example_transformation>

<best_practices>

**Do:**
- Use plain English descriptions
- Include all visual details
- Provide hex codes for colors
- Describe layout relationships
- Include interaction hints

**Don't:**
- Use component library names
- Assume technical knowledge
- Skip "obvious" details
- Use shorthand or abbreviations
- Reference external systems

</best_practices>
