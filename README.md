# Macho Homelands Investment Agency website

A responsive React + Vite website prepared for GitHub and Vercel deployment.

## Pages
- Home
- About Us
- Services
- Properties & enquiries (filterable categories)
- Contact (enquiry form opens WhatsApp with a prefilled message)

## Brand and contact information
- Brand palette: navy blue, red, cyan, white
- Phone: 0706 178 575
- WhatsApp: +254 706 178 575
- Email: machohomelands@yahoo.com
- Location: Kihunguro, JD Plaza, Along Thika Super Highway

## Run locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
npm run preview
```

## Deploy on Vercel
1. Push this folder to a GitHub repository you control.
2. In Vercel, import the repository.
3. Keep the framework preset as **Vite**. Build command: `npm run build`; output directory: `dist`.
4. Deploy.

No server or environment variables are required for this static site.

## Important content notes
- The Framer page could not be reliably fetched in the current session, so this is a fresh rebuild based on the agency's known brand and contact details, not a pixel-perfect export of every original Framer page.
- Property cards are enquiry categories, not confirmed live listings. Replace them with verified properties, photos, prices and availability before publishing as live inventory.
- The logo is currently a text-based MH mark because the original logo asset was not available in the accessible source. Replace it with the official logo asset when available.
- Property imagery is loaded from Unsplash URLs and therefore requires internet access.