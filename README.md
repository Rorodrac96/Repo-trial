# ॥ शुभ विवाह ॥ Royal Maharashtrian Wedding Invitation

A digital wedding invitation web app featuring:
- **Royal Patrika Opening**: Wax seal / Rajmudra unrolling animation
- **Auspicious Sanai & Sitar Harmony**: Synthesized classical Indian wedding soundscape (Raag Bhupali & Tanpura)
- **Marigold (झेंडू) & Mogra Petals**: 60fps canvas animation with gentle breeze physics
- **Light Royal Sandalwood Theme**: Paithani gold zari borders, kumkum red accents, and Devanagari typography
- **Auspicious Ceremonies**: Haldi, Sakharpuda, Sangeet, Seemant Pujan, Shubh Vivah Muhurat, and Royal Pangat
- **Seamless Pangat RSVP Workflow**: Multi-step guest RSVP with pure veg / Jain dining preferences and direct WhatsApp confirmation
- **One-Click WhatsApp Invite Link Generator**: Send personalized invitations to each family member (`?guest=Family+Name`)
- **Organizer Dashboard**: Live headcount, catering pangat distribution, CSV export, and live detail editing

---

## 🚀 How to Host on Vercel (Step-by-Step)

### Step 1: Upload Code to GitHub
1. Create a new repository on [GitHub](https://github.com/new) (e.g. `shubh-vivah-invitation`).
2. In your terminal or VS Code inside this project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Royal Maharashtrian Wedding Invitation"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/shubh-vivah-invitation.git
   git push -u origin main
   ```

### Step 2: Connect and Deploy on Vercel
1. Go to [Vercel](https://vercel.com) and log in (or sign up with your GitHub account).
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub repository (`shubh-vivah-invitation`) and click **"Import"**.
4. Vercel will automatically detect the settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `vite build` (or `npm run build`)
   - **Output Directory**: `dist`
5. Click **"Deploy"**.
6. In ~30 seconds, Vercel will give you a live production URL (e.g., `https://shubh-vivah-invitation.vercel.app`)!

---

## 📲 How to Send Personalized Links to Guests on WhatsApp

1. Open your live Vercel URL.
2. Click the **Gear (⚙) icon** in the top navigation bar or footer to open the **Organizer Portal**.
3. Go to the **"पत्रिका संपादन • Edit"** tab.
4. Set your WhatsApp number in the **"RSVP व्हॉट्सॲप नंबर"** field (e.g., `919822012345`).
5. Type any relative or family's name into the **"पाहुण्यांसाठी वैयक्तिक लिंक व व्हॉट्सॲप आमंत्रण"** input (e.g. `जोशी परिवार` or `श्री. व सौ. कुलकर्णी`).
6. Click **"WhatsApp वर पाठवा"**:
   - It automatically generates a personalized URL (`https://your-domain.vercel.app?guest=जोशी+परिवार`)
   - Pre-fills a respectful invitation message in Marathi
   - Opens WhatsApp so you can send it with a single tap!

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server on http://localhost:3000
npm run dev

# Test production build
npm run build
```
