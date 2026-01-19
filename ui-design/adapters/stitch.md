# Stitch Adapter

Rules for generating Google Stitch-optimized prompts from UI specifications.

<adapter_info>
Service: Google Stitch
URL: https://stitch.withgoogle.com/
Output: UI designs, Figma export, HTML/CSS/Flutter code
Strength: Full-page layouts, complete screens
</adapter_info>

<prompt_structure>

Stitch prompts should follow this structure:

```
[Screen type] for a [app type].

Layout: [layout description with positioning]

Components from [direction]:
- [Component 1 with details]
- [Component 2 with details]
- [Component 3 with details]

Color palette: [colors with hex values]
Typography: [font family]
Spacing: [spacing notes]

[Additional style notes]
```

</prompt_structure>

<transformation_rules>

## Screen Spec → Stitch Prompt

1. **Start with context:**
   - Screen type (login, dashboard, settings, etc.)
   - App type (SaaS, e-commerce, social, etc.)

2. **Describe layout:**
   - Overall structure (centered card, sidebar layout, full-width)
   - Max widths, alignment
   - Background treatment

3. **List components:**
   - Use "from top to bottom" or "from left to right"
   - Describe each component with visual details
   - Include placeholder content

4. **Include design tokens:**
   - Convert token references to actual values
   - Primary color as hex
   - Font family name
   - Spacing in pixels

5. **Add style notes:**
   - Shadow/elevation
   - Border radius
   - Responsive hints

</transformation_rules>

<token_mapping>

When converting design tokens for Stitch:

| Token Reference | Stitch Language |
|-----------------|-----------------|
| color.primary.default | "primary [color] #HEXVAL" |
| typography.fontFamily.sans | "[Font name] font family" |
| spacing.4 | "16px spacing" or "comfortable spacing" |
| border.radius.md | "medium rounded corners" |
| shadow.md | "subtle shadow" or "soft shadow" |

</token_mapping>

<component_descriptions>

Describe components in Stitch-friendly language:

| Component | Stitch Description |
|-----------|-------------------|
| Button (primary) | "Primary [color] button '[label]' full width" |
| Button (secondary) | "Outlined button '[label]'" |
| InputField | "[Type] input with label above" |
| Card | "Card with [shadow] shadow, [padding] padding" |
| Navbar | "Top navigation bar with logo and links" |
| Sidebar | "Left sidebar with navigation links" |
| Modal | "Centered modal overlay with [content]" |
| Avatar | "User avatar, [size] circular" |
| Badge | "Small badge with [text]" |

</component_descriptions>

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

**Output: Stitch Prompt**
```
Login screen for a SaaS application.

Layout: Centered card on light gray background (#F8FAFC), max width 400px, medium shadow, 24px padding, rounded corners.

Components from top to bottom:
- Logo placeholder (48px height, centered)
- Heading "Welcome back" (24px, semibold, centered)
- Email input field with "Email" label above
- Password input field with "Password" label above
- Primary blue (#2563EB) button "Sign In" full width
- "Forgot password?" link centered, small text, muted color
- Horizontal divider line with "or" text in center
- Outlined secondary button "Continue with Google" full width with Google icon on left

Color palette: Primary blue #2563EB, text dark gray #0F172A, muted text #64748B, background #F8FAFC
Typography: Inter font family
Spacing: 16px between form elements, 24px card padding
Style: Clean and minimal, subtle shadow on card
```

</example_transformation>

<best_practices>

**Do:**
- Be specific about colors (use hex codes)
- Mention positioning explicitly (centered, left-aligned, etc.)
- Describe spacing in relative terms (comfortable, tight, spacious)
- Include placeholder content for text
- Specify button widths (full width vs. auto)

**Don't:**
- Use technical component names (say "input field" not "InputField")
- Reference token names directly in prompts
- Assume Stitch knows your design system
- Skip describing obvious elements (describe everything)

</best_practices>

<export_notes>

After generating in Stitch:
- **Figma export:** Best for further refinement and team collaboration
- **HTML/CSS:** Good for quick prototypes
- **Flutter:** For mobile-first implementations

Recommend Figma export for most workflows.

</export_notes>
