/**
 * Theme definitions for the dev-only theme picker (src/components/ThemePicker.astro).
 *
 * Every theme sets the same token contract. `blush` mirrors the values in
 * global.css `:root` — it is what ships. The others are candidates.
 *
 * Contrast is not optional: the site's accent does double duty as link text AND
 * as a filled button background, so each accent has to clear 4.5:1 both against
 * --color-bg and under white text. Ratios below were measured, not eyeballed.
 */

export interface ThemeTokens {
  /** page canvas */
  bg: string;
  /** headings + body copy */
  ink: string;
  /** secondary text */
  muted: string;
  /** links, buttons — needs 4.5:1 vs bg *and* under white */
  accent: string;
  /** text sitting on top of --color-tint */
  'accent-deep': string;
  /** borders, underlines, hover tints */
  tint: string;
  /** full-bleed alternating section band */
  wash: string;
  /** secondary wash, decorative */
  'wash-alt': string;
  /** raised surfaces behind screenshots — usually near-white */
  surface: string;
}

export interface Theme {
  id: string;
  label: string;
  /** one-line note shown in the picker */
  note: string;
  tokens: ThemeTokens;
}

export const themes: Theme[] = [
  {
    id: 'blush',
    label: 'Blush',
    note: 'Current — warm off-white, rose accent',
    tokens: {
      bg: '#fffcfa',
      ink: '#241d20', // 16.17:1 AAA
      muted: '#6e5a5e', // 6.25:1 AA
      accent: '#a84e59', // 5.27:1 AA · white-on 5.39:1 AA
      'accent-deep': '#96404c', // 4.75:1 AA on tint
      tint: '#facfcf',
      wash: '#fceae8',
      'wash-alt': '#fdf3e3',
      surface: '#ffffff',
    },
  },
  {
    id: 'harbor',
    label: 'Harbor',
    note: 'Pastel blue + butter cream',
    tokens: {
      bg: '#fffdf5', // cream white canvas
      ink: '#22303c', // 13.25:1 AAA
      muted: '#5a6b7d', // 5.38:1 AA · 5.00:1 AA on wash
      accent: '#2b6ca3', // 5.46:1 AA · white-on 5.56:1 AA
      'accent-deep': '#1f5480', // 5.55:1 AA on tint
      tint: '#bcdcf0', // pastel blue — borders, underlines
      wash: '#fdf4dd', // butter band — ink 12.31:1 AAA, muted 5.00:1 AA
      'wash-alt': '#e8f2fa', // pale blue — ink 11.90:1 AAA
      surface: '#ffffff',
    },
  },
];

export const defaultTheme = themes[0]!.id;

/** Emit each theme as a `:root[data-theme="id"]` block. */
export function themeCss(): string {
  return themes
    .map((theme) => {
      const decls = Object.entries(theme.tokens)
        .map(([key, value]) => `    --color-${key}: ${value};`)
        .join('\n');
      return `  :root[data-theme='${theme.id}'] {\n${decls}\n  }`;
    })
    .join('\n');
}
