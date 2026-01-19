# Figma Adapter

Rules for exporting design tokens and specifications for Figma.

<adapter_info>
Service: Figma
URL: https://figma.com/
Output: Design tokens as Figma Variables, setup instructions
Strength: Full design tool, collaboration, handoff
</adapter_info>

<export_formats>

## 1. Figma Variables (Native - November 2026+)

Figma now supports native W3C Design Token import. Export format:

```json
{
  "colors": {
    "primary-default": {
      "$value": "#2563EB",
      "$type": "color"
    }
  }
}
```

Flatten nested structure for Figma import:
- `color.primary.default` → `colors/primary-default`
- Use `/` as separator in collection names

## 2. Figma Tokens Plugin Format

For Figma Tokens plugin (before native support):

```json
{
  "global": {
    "colors": {
      "primary": {
        "value": "#2563EB",
        "type": "color"
      }
    }
  }
}
```

## 3. Style Dictionary Format

For Style Dictionary workflow:

```json
{
  "color": {
    "primary": {
      "value": "#2563EB"
    }
  }
}
```

</export_formats>

<transformation_rules>

## Design Tokens → Figma Variables

1. **Flatten hierarchy:**
   - Convert nested JSON to flat variable names
   - Use consistent separator (/ or -)

2. **Map types:**
   | W3C Type | Figma Type |
   |----------|------------|
   | color | COLOR |
   | dimension | NUMBER (convert to px) |
   | fontFamily | STRING |
   | fontWeight | NUMBER |
   | shadow | EFFECT (manual) |

3. **Create collections:**
   - Colors → Color collection
   - Typography → Typography collection
   - Spacing → Spacing collection
   - Effects → Effects collection

4. **Handle modes:**
   - If dark mode tokens exist, create as separate mode
   - Default mode = light

</transformation_rules>

<variable_structure>

Recommended Figma Variable structure:

```
📁 Colors
  ├── Primary/Default      #2563EB
  ├── Primary/Hover        #1D4ED8
  ├── Primary/Foreground   #FFFFFF
  ├── Secondary/Default    #64748B
  ├── Background/Default   #FFFFFF
  ├── Background/Subtle    #F8FAFC
  ├── Text/Default         #0F172A
  ├── Text/Muted           #64748B
  └── Border/Default       #E2E8F0

📁 Spacing
  ├── 1    4px
  ├── 2    8px
  ├── 3    12px
  ├── 4    16px
  ├── 6    24px
  ├── 8    32px
  └── 12   48px

📁 Typography
  ├── Font/Sans            Inter
  ├── Font/Mono            JetBrains Mono
  ├── Size/xs              12px
  ├── Size/sm              14px
  ├── Size/base            16px
  ├── Size/lg              18px
  └── Weight/Medium        500

📁 Radius
  ├── sm     2px
  ├── md     6px
  ├── lg     8px
  └── full   9999px
```

</variable_structure>

<figma_setup_instructions>

Generate setup instructions alongside tokens:

```markdown
# Figma Setup Instructions

## 1. Import Design Tokens

### Option A: Native Import (Figma 2026+)
1. Open your Figma file
2. Go to Local Variables panel
3. Click dropdown → Import from file
4. Select `figma-tokens.json`
5. Review and confirm import

### Option B: Figma Tokens Plugin
1. Install "Figma Tokens" plugin
2. Open plugin panel
3. Import JSON from file
4. Sync to local styles

## 2. Create Components

Set up base components matching specifications:

### Button Component
- Create component with variants:
  - Variant: primary, secondary, ghost, destructive
  - Size: sm, md, lg
  - State: default, hover, disabled
- Apply color variables to fills
- Apply spacing variables to padding

### Input Component
- Create with states: default, focus, error, disabled
- Include label text layer
- Apply typography variables

[Continue for each component in COMPONENTS.md]

## 3. Create Frames for Screens

For each screen in UI-SPEC.md:

1. Create frame at 1440x900 (desktop)
2. Name frame: "SCR-XX - [Name]"
3. Add to Screens page
4. Build using component instances

## 4. Set Up Auto Layout

Use spacing variables in auto layout:
- Item spacing: Use spacing/4 (16px) as default
- Padding: Use spacing/6 (24px) for cards
- Section gaps: Use spacing/8 (32px)

## 5. Create Color Modes (Optional)

If dark mode needed:
1. Add "Dark" mode to Colors collection
2. Assign dark values to each variable
3. Test by switching modes on frames
```

</figma_setup_instructions>

<screen_frames>

For screen specifications, also generate Figma frame setup:

```markdown
## Screen Frames

| Frame Name | Size | Notes |
|------------|------|-------|
| SCR-01 - Login | 400x600 | Centered card, gray bg |
| SCR-02 - Signup | 400x700 | Similar to login |
| SCR-03 - Dashboard | 1440x900 | Sidebar layout |
| SCR-04 - Settings | 1440x900 | Tabs layout |

### Mobile Variants
| Frame Name | Size |
|------------|------|
| SCR-01 - Login (Mobile) | 375x812 |
| SCR-03 - Dashboard (Mobile) | 375x812 |
```

</screen_frames>

<export_file_structure>

Generate multiple files for Figma export:

```
ui-exports/
├── figma-tokens.json        # Main token file
├── figma-tokens-plugin.json # Plugin format (if different)
├── figma-setup.md           # Setup instructions
└── figma-frames.md          # Frame specifications
```

</export_file_structure>
