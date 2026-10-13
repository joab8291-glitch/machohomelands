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
## Admin panel setup (required before login works)

The public site includes an **ADM · Admin panel** link at the bottom. The panel provides a login, logo upload, and add/edit/delete controls for property listings. Listing changes are saved as commits to this repository and then picked up by the connected Vercel deployment.

In Vercel → Project → Settings → Environment Variables, set the following for **Production and Preview** (at minimum Production):

- `ADMIN_USERNAME` — the admin username you supplied
- `ADMIN_PASSWORD` — the admin password you supplied
- `ADMIN_SESSION_SECRET` — a newly generated random secret, at least 32 characters; do not reuse the password
- `GITHUB_TOKEN` — a fine-grained GitHub token scoped only to this repository, with **Contents: Read and write** permission
- `GITHUB_REPO` — `machohomelands`
- `GITHUB_BRANCH` — `main`

After saving environment variables, redeploy the Vercel project so serverless functions receive them. Never put the password or GitHub token in frontend code or commit them to this repository.

The admin API uses an HttpOnly, Secure, SameSite=Strict session cookie with an eight-hour expiry. Uploaded logos are restricted to PNG/JPG/WEBP and 3 MB. Listings are validated before being written to GitHub. This repository must be connected to Vercel for automatic deployments; if it is not, the code can be present in GitHub while the live website remains unchanged.

**Operational note:** GitHub writes trigger a deployment when the repository is connected to Vercel. The API confirms that a change was saved to GitHub; allow the deployment to finish before expecting the live website to reflect a logo or code change.
