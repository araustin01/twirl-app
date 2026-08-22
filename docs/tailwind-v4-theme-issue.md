# Tailwind v4 Theme Integration Issue

## Problem

After updating the main stylesheet to use CSS variables and removing the `@theme inline` block (due to a false positive linter warning), shadcn UI components and other elements using Tailwind theme classes (e.g., `bg-background`, `text-muted-foreground`) appeared transparent or unstyled.

## Root Cause

- **Tailwind v4** does not use `tailwind.config.js` for theme extension. Instead, it relies on the `@theme inline` block in your CSS to register theme tokens.
- Removing `@theme inline` meant Tailwind did not generate utility classes for your theme tokens, so classes like `bg-background` did not resolve to your CSS variables.
- The linter warning about `@theme` was a false positive; it is valid syntax in Tailwind v4.

## Solution

- Restore the `@theme inline` block in your main CSS file, mapping all theme tokens (e.g., `--color-background`, `--color-foreground`, etc.) to your CSS variables.
- Remove any `tailwind.config.js` files, as they are ignored by Tailwind v4.
- Rebuild assets (e.g., restart `mix phx.server`).

## Result

shadcn UI components and all Tailwind theme classes now correctly resolve to the intended CSS variables, and the UI renders as expected.

## References

- [Tailwind CSS v4 documentation](https://tailwindcss.com/docs/theme#using-css-variables)
