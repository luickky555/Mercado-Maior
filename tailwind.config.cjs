/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  prefix: "",

  theme: {
    container: {
      center: true,
      padding: "1rem",

      screens: {
        "2xl": "1440px",
      },
    },

    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        carnauba: {
          DEFAULT: "#1E4620",
          light: "#2A612D",
          dark: "#122A13",
        },

        oliva: {
          DEFAULT: "#556B2F",
          light: "#6B873B",
          dark: "#3F4F23",
        },

        terracota: {
          DEFAULT: "#E2725B",
          light: "#E78C78",
          dark: "#D8583E",
        },

        bege: {
          DEFAULT: "#F5F5DC",
          light: "#FAFAED",
          dark: "#EAEACA",
        },

        dourado: {
          DEFAULT: "#F4D03F",
          light: "#F7DF75",
          dark: "#E3BC1C",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      boxShadow: {
        soft: "0 10px 40px -18px rgba(30, 70, 32, 0.28)",
        lift: "0 18px 45px -22px rgba(30, 70, 32, 0.35)",
      },

      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },

        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },

          "50%": {
            transform: "translateY(-8px)",
          },
        },

        "fade-up": {
          from: {
            opacity: "0",
            transform: "translateY(18px)",
          },

          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        "accordion-down":
          "accordion-down 0.2s ease-out",

        "accordion-up":
          "accordion-up 0.2s ease-out",

        float:
          "float 4s ease-in-out infinite",

        "fade-up":
          "fade-up 0.6s ease-out both",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
  ],
};