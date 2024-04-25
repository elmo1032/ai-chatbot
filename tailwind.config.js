/**
 * @type {import('tailwindcss').Config}
 * This is the Tailwind CSS configuration file. It includes various options for customizing the framework's behavior.
 */

module.exports = {
  /**
   * Determines the mode of the PurgeCSS plugin, which removes unused styles in production.
   * 'jit' enables Just-In-Time mode, which compiles styles on demand.
   */
  mode: 'jit',

  /**
   * An array of glob patterns specifying the files to be purged.
   * In this case, styles from pages and components are removed in production.
   */
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  /**
   * Configures dark mode for the theme. 'class' enables dark mode based on a class added to the body.
   */
  darkMode: 'class',

  /**
   * When set to true, all generated classes will be marked as important, making them apply even with '!important' rules.
   */
  important: true,

  /**
   * An array of glob patterns specifying the files to be included in the content for the purpose of style analysis.
   */
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  /**
   * An array of class names to be safelisted, meaning they will not be purged even if not used.
   */
  safelist: [
    'animate-slide-from-left',
    'animate-slide-to-left',
    'animate-accordion-down',
    'animate-accordion-up',
  ],

  /**
   * The theme section allows for customizing various visual aspects of the framework.
   */
  theme: {
    /**
     * The container option customizes the container element, including centering and padding.
     */
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    /**
     * The extend option allows for extending the default set of utilities.
     */
    extend: {
      /**
       * Customizes the font family for the sans and mono typefaces.
       */
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },

      /**
       * Customizes the colors used in the theme.
       */
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      /**
       * Customizes the border radius values.
       */
      borderRadius: {
        lg: `var(--radius)",
        md: `calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /**
       * Defines custom keyframes for animations.
       */
      keyframes: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-from-left':
          'slide-from-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
        'slide-to-left':
          'slide-to-left 0.25s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
      },

      /**
       * Applies the custom keyframes to animations.
       */
      animation: {
        'slide-from-left': 'slide-from-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
        'slide-to-left': 'slide-to-left 0.25s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
      },
    },
  },
};
