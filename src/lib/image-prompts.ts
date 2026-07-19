// Ready-to-copy ChatGPT image-generation prompts for the admin portal's
// "Image Prompts" page. Every prompt is composed with the same brand rules
// (MBT yellow #FFDE00 headlines, white supporting text, deep black #151515
// background, product keeps its OWN brand colours) and the same mandatory
// output block (exactly 1920 × 1080, 16:9, 4K quality) — so whichever one
// the owner copies, the result always fits the website's image frames
// (see the 16:9 upload notice in AdminDashboard).
//
// No prompt asks for the station name or a price to be rendered as text on
// the ad itself — that rule is stated once in buildPrompt() and every scene
// below is written to only ever call for offer/announcement text, never a
// price figure or "MBT" lettering.

export function buildPrompt(scene: string): string {
  return `Generate me a professional, eye-catching advertisement image for MBT Poppys Ventersdorp (a 24-hour fuel station & BUZZ Café in Ventersdorp, South Africa) using yellow, white and black as the advert's colour scheme. (Do NOT put "MBT", "MBT Poppys" or any station name anywhere on the ad, and do NOT show any prices - it is just the product ad described below.)

THE AD:
${scene}

BRAND RULES (must follow exactly):
- Background: deep matte black (#151515) with dramatic, high-contrast studio lighting.
- Headline text: huge, bold, vivid MBT yellow (#FFDE00) in an impactful advertising font — perfectly legible.
- Supporting text and small details: clean, crisp white.
- The product itself must keep its OWN real brand colours and packaging so it stays instantly recognisable (e.g. Energade stays in Energade's colours, Coca-Cola stays red) — ONLY the background, headlines and supporting text use the MBT yellow / white / black scheme.
- The composition must capture visual attention instantly: bold, punchy, professional advertising agency quality.
- Replace every [BRACKETED] placeholder below with the real details before generating.
- NO prices, NO price badges, NO station branding, NO extra text beyond what's described above.

OUTPUT REQUIREMENTS (MANDATORY — NON-NEGOTIABLE):
- EXACT SIZE: 1920 × 1080 pixels, 16:9 landscape orientation.
- ULTRA-DETAILED 4K QUALITY rendering: razor-sharp focus, photorealistic lighting, crisp edges.
- Full-bleed image — no watermarks, no borders, no white edges, nothing important cropped off.`;
}

export interface PromptItem {
  title: string;
  scene: string;
}

export interface PromptCategory {
  category: string;
  icon: string;
  items: PromptItem[];
}

// The one-size-fits-all prompt: the owner only fills in the special's details.
export const MASTER_PROMPT = buildPrompt(
  `Design the most eye-catching advert possible for this product or special: [DESCRIBE IT — the product(s), the offer, and any dates]. You choose the strongest professional composition for it (dramatic spotlight, liquid splash, explosion of colour, cinematic close-up — whatever sells it hardest), with the offer text huge and impossible to miss.`
);

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    category: "Universal — Any Special",
    icon: "⭐",
    items: [
      {
        title: "The All-Rounder",
        scene:
          "Feature [PRODUCT / SPECIAL DETAILS] as the glowing hero in the centre of the advert, with the offer '[OFFER TEXT]' in massive headline letters across the top.",
      },
      {
        title: "Explosive Splash",
        scene:
          "Show [PRODUCT] bursting through a dramatic explosion of liquid and energy, droplets frozen mid-air around it, with '[OFFER TEXT]' slicing across the image in giant letters.",
      },
      {
        title: "Cinematic Spotlight",
        scene:
          "A single dramatic spotlight beam cuts through light haze onto [PRODUCT] standing on a glossy black reflective floor, like a movie premiere. '[OFFER TEXT]' glows above it.",
      },
      {
        title: "Neon Glow",
        scene:
          "Frame [PRODUCT] with glowing yellow neon tubes and small electric sparks, retro-futuristic style, with '[OFFER TEXT]' written as a giant neon sign.",
      },
      {
        title: "3D Billboard",
        scene:
          "Render [PRODUCT] as a giant hyper-real 3D object mounted on a black billboard with dramatic under-lighting, '[OFFER TEXT]' in enormous extruded 3D letters.",
      },
      {
        title: "Comic Book Pop",
        scene:
          "Illustrate [PRODUCT] in bold comic-book style with halftone dots and action lines, while '[OFFER TEXT]' runs across the top in comic lettering inside a 'POW!'-style burst.",
      },
      {
        title: "Lightning Strike",
        scene:
          "Storm clouds gather behind [PRODUCT] while bolts of vivid yellow lightning strike down around it, charging it with power. '[OFFER TEXT]' crackles in electrified letters across the scene.",
      },
      {
        title: "Gold Luxury",
        scene:
          "Present [PRODUCT] as a premium luxury item resting on black silk with golden-yellow rim lighting and floating gold particles, '[OFFER TEXT]' in elegant but bold lettering.",
      },
      {
        title: "Speed Blur",
        scene:
          "Motion streaks and light trails race past [PRODUCT] as if it's moving at highway speed, conveying energy and urgency, with '[OFFER TEXT]' leaning in italic speed-styled letters.",
      },
      {
        title: "Retro Petrol Poster",
        scene:
          "A vintage 1960s petrol-station advertising poster look with subtle distressed texture: [PRODUCT] painted in retro illustration style, '[OFFER TEXT]' in classic signwriter lettering.",
      },
    ],
  },
  {
    category: "Energy & Soft Drinks",
    icon: "⚡",
    items: [
      {
        title: "Energy Explosion",
        scene:
          "An ice-cold can of [DRINK NAME] bursts through shattering ice and a splash of its own flavour colours, droplets frozen mid-air, '[OFFER TEXT]' in huge electric letters.",
      },
      {
        title: "Twin Cans Duel",
        scene:
          "Two flavours of [DRINK NAME] face off from opposite sides of the frame with split lighting in each flavour's colour, lightning meeting in the middle, '[OFFER TEXT]' across the centre.",
      },
      {
        title: "Frozen Solid",
        scene:
          "A can of [DRINK NAME] encased inside a cracking, glowing block of ice, freezing mist rolling off it, with '[OFFER TEXT]' in frosted letters above it.",
      },
      {
        title: "Fruit Blast",
        scene:
          "Fresh fruit pieces matching the flavour of [DRINK NAME] explode around the can in juicy slow motion with splashing juice ribbons, '[OFFER TEXT]' bold across the top.",
      },
      {
        title: "Electric Charge",
        scene:
          "A can of [DRINK NAME] crackling with arcs of vivid yellow electricity, sparks flying, standing on a charged metal plate, with '[OFFER TEXT]' in voltage-styled lettering.",
      },
      {
        title: "Game Day Refresh",
        scene:
          "A sports-action scene: [DRINK NAME] slammed down mid-air with sweat droplets and stadium floodlights behind, '[OFFER TEXT]' in athletic block letters.",
      },
      {
        title: "Midnight Fuel-Up",
        scene:
          "A can of [DRINK NAME] glowing under fuel-station canopy lights at night, moths of light drifting by, '[OFFER TEXT]' in glowing signage letters above it.",
      },
      {
        title: "Pyramid Stack",
        scene:
          "Cans of [DRINK NAME] stacked in a perfect pyramid while one hero can floats and rotates above it in a beam of light, '[OFFER TEXT]' arcing over the top.",
      },
      {
        title: "Condensation Macro",
        scene:
          "An extreme macro close-up of an ice-cold [DRINK NAME] covered in perfect condensation droplets, one drop rolling down the logo, '[OFFER TEXT]' in crisp modern type beside it.",
      },
      {
        title: "Zero Gravity",
        scene:
          "Cans of [DRINK NAME] floating weightlessly with ribbons of liquid spiralling between them in zero gravity, '[OFFER TEXT]' floating in bold 3D letters among them.",
      },
    ],
  },
  {
    category: "Fresh Bakery",
    icon: "🥐",
    items: [
      {
        title: "Steam & Golden Crust",
        scene:
          "A fresh [BAKED ITEM] with a perfect golden crust, gentle steam rising into warm light, '[OFFER TEXT]' in warm bold letters beside it.",
      },
      {
        title: "Butter Melt Close-Up",
        scene:
          "A macro shot of butter melting over a warm slice of [BAKED ITEM], glistening in dramatic side light, '[OFFER TEXT]' across the top.",
      },
      {
        title: "Bakery Board Flat Lay",
        scene:
          "A top-down flat lay of [BAKED ITEMS] arranged beautifully on a dark wooden board dusted with flour, '[OFFER TEXT]' hand-lettered style in yellow.",
      },
      {
        title: "Fresh Out The Oven",
        scene:
          "An open oven glowing warm orange as [BAKED ITEM] is pulled out on a tray, sparks of flour in the air, '[OFFER TEXT]' in bold bakery lettering above.",
      },
      {
        title: "Flour Dust Action",
        scene:
          "[BAKED ITEM] tossed mid-air through a dramatic cloud of flour caught in a light beam, frozen in time, '[OFFER TEXT]' cutting through the dust.",
      },
      {
        title: "Pie Tower",
        scene:
          "Golden pies stacked into an impressive tower with the top one cut open showing its steaming filling, '[OFFER TEXT]' in hearty bold letters above.",
      },
      {
        title: "Golden Hour Bread",
        scene:
          "A loaf of [BREAD NAME] on a rustic surface backlit by golden-hour light, dust motes glowing, '[OFFER TEXT]' in warm serif lettering.",
      },
      {
        title: "Chalkboard Special",
        scene:
          "A stylish black chalkboard menu design with [BAKED ITEM] photographed in the corner and '[OFFER TEXT]' written in beautiful yellow and white chalk lettering with small chalk doodles.",
      },
      {
        title: "Padkos Ready",
        scene:
          "A road-trip scene: [BAKED ITEM] wrapped and ready on a car seat with a map and sunglasses, morning light through the window, '[OFFER TEXT]' overhead in travel-poster letters.",
      },
      {
        title: "Cross-Section Hero",
        scene:
          "A perfect cross-section cut of [BAKED ITEM] showing its delicious layers and filling in razor-sharp macro detail, '[OFFER TEXT]' alongside in clean bold type.",
      },
    ],
  },
  {
    category: "Coffee & Hot Drinks",
    icon: "☕",
    items: [
      {
        title: "Steam Swirl",
        scene:
          "A takeaway cup of [COFFEE/DRINK] with elegant steam swirling upward into glowing shapes, '[OFFER TEXT]' formed partly by the steam.",
      },
      {
        title: "Bean Explosion",
        scene:
          "Roasted coffee beans exploding outward in slow motion around a cup of [COFFEE/DRINK], one bean splashing into the crema, '[OFFER TEXT]' in rich bold letters.",
      },
      {
        title: "Morning Commute",
        scene:
          "A steaming cup of [COFFEE/DRINK] on a car roof at the fuel pumps at sunrise, warm light flaring, '[OFFER TEXT]' across the sky in bold letters.",
      },
      {
        title: "Latte Art Close-Up",
        scene:
          "A top-down close-up of perfect latte art in a cup of [COFFEE/DRINK], velvety microfoam detail, '[OFFER TEXT]' circling the cup in clean type.",
      },
      {
        title: "Double Cup Deal",
        scene:
          "Two takeaway cups of [COFFEE/DRINK] clinking together like a toast with a small splash, '[OFFER TEXT]' between them in friendly bold letters.",
      },
      {
        title: "Winter Warmer",
        scene:
          "A cup of [COFFEE/DRINK] glowing warm against a cold, frosty dark background with soft falling snow, hands in gloves reaching for it, '[OFFER TEXT]' in cosy bold letters.",
      },
      {
        title: "Coffee Waterfall",
        scene:
          "A dramatic slow-motion pour: rich coffee cascading like a waterfall into a cup of [COFFEE/DRINK], droplets suspended, '[OFFER TEXT]' behind the pour in giant letters.",
      },
      {
        title: "24-Hour Brew",
        scene:
          "A glowing neon 'OPEN 24 HOURS' sign above a cup of [COFFEE/DRINK] on the counter at night, '[OFFER TEXT]' in neon-tube lettering beside it.",
      },
    ],
  },
  {
    category: "Braai & Outdoor",
    icon: "🔥",
    items: [
      {
        title: "Flame Grill Hero",
        scene:
          "[BRAAI ITEM] sizzling on a grill with dramatic flames leaping up around it, embers rising into the black sky, '[OFFER TEXT]' in fire-licked bold letters.",
      },
      {
        title: "Charcoal Sparks",
        scene:
          "Glowing charcoal briquettes with sparks swirling upward around [BRAAI ITEM], deep contrast, '[OFFER TEXT]' glowing like embers above it.",
      },
      {
        title: "Boerewors Sizzle",
        scene:
          "A perfect boerewors coil sizzling on an open braai grid, oil glistening, smoke curling, '[OFFER TEXT]' in proudly bold letters above.",
      },
      {
        title: "Braai Pack Spread",
        scene:
          "A generous braai pack — [LIST ITEMS] — laid out on butcher paper on dark wood, top-down, '[OFFER TEXT]' across the top in butcher-shop lettering.",
      },
      {
        title: "Weekend Fire",
        scene:
          "Silhouettes of friends around a glowing braai fire under the stars, [BRAAI ITEM] in crisp focus in the foreground, '[OFFER TEXT]' across the night sky.",
      },
      {
        title: "Smoke & Ember Type",
        scene:
          "'[OFFER TEXT]' written in letters made of smoke and glowing embers above [BRAAI ITEM] on the grill, cinematic darkness around it.",
      },
      {
        title: "Marinade Drip",
        scene:
          "A macro shot of rich marinade dripping in slow motion off [BRAAI ITEM] held over the flames, every droplet sharp, '[OFFER TEXT]' beside it in bold type.",
      },
      {
        title: "Wood & Fire Stack",
        scene:
          "A rustic stack of braai wood and firelighters next to [PRODUCT], flames just catching, sparks in the air, '[OFFER TEXT]' in rugged stencil letters.",
      },
      {
        title: "Potjie Night",
        scene:
          "A cast-iron potjie bubbling over coals at night, steam and firelight glowing, [PRODUCT] beside it, '[OFFER TEXT]' in traditional bold lettering.",
      },
      {
        title: "Rugby Day Braai",
        scene:
          "A match-day scene: [BRAAI ITEM] on the grill in the foreground with a TV glow and team flags softly blurred behind, '[OFFER TEXT]' in sports-poster letters.",
      },
    ],
  },
  {
    category: "Travel Snacks & Sweets",
    icon: "🍫",
    items: [
      {
        title: "Road Trip Dashboard",
        scene:
          "A sunlit car dashboard POV on an open road with [SNACK ITEMS] spread on the passenger seat, '[OFFER TEXT]' across the windscreen view in bold road-sign letters.",
      },
      {
        title: "Snack Avalanche",
        scene:
          "An avalanche of [SNACK ITEMS] tumbling toward the camera in dynamic slow motion, crumbs and pieces flying, '[OFFER TEXT]' punching through the middle.",
      },
      {
        title: "Chocolate Melt",
        scene:
          "Silky melted chocolate flowing over a bar of [CHOCOLATE NAME] in extreme macro detail, '[OFFER TEXT]' in indulgent bold letters beside it.",
      },
      {
        title: "Chip Crunch Burst",
        scene:
          "A bag of [CHIPS NAME] bursting open with chips exploding outward mid-air, seasoning dust sparkling in the light, '[OFFER TEXT]' in crunchy bold letters.",
      },
      {
        title: "Sweets Rain",
        scene:
          "Colourful [SWEETS NAME] raining down in slow motion and bouncing off a glossy black surface, '[OFFER TEXT]' in playful chunky letters.",
      },
      {
        title: "Biltong Rustic",
        scene:
          "Premium biltong slices arranged on dark slate with a rustic knife, dramatic side lighting showing the texture, '[OFFER TEXT]' in bold heritage lettering.",
      },
      {
        title: "Padkos Pack",
        scene:
          "The ultimate padkos spread — [LIST ITEMS] — packed neatly into a travel bag with a thermos, top-down on dark canvas, '[OFFER TEXT]' in adventure-poster letters.",
      },
      {
        title: "Candy Neon",
        scene:
          "[SWEETS NAME] glowing under blacklight-style neon with vivid colour pops against the black, '[OFFER TEXT]' in neon-sign lettering above.",
      },
      {
        title: "Snack Tower",
        scene:
          "A gravity-defying tower of [SNACK ITEMS] stacked impossibly high, one item toppling toward the camera, '[OFFER TEXT]' running up the side.",
      },
      {
        title: "Glovebox Stash",
        scene:
          "A car glovebox popping open to reveal a secret stash of [SNACK ITEMS] glowing like treasure, '[OFFER TEXT]' in cheeky bold letters above.",
      },
    ],
  },
  {
    category: "Fuel & Forecourt",
    icon: "⛽",
    items: [
      {
        title: "Pump Hero",
        scene:
          "A gleaming fuel pump under dramatic night lighting with '[FUEL TYPE]' displayed huge and bold on its digital screen, '[OFFER TEXT]' across the top in bold letters.",
      },
      {
        title: "Golden Nozzle",
        scene:
          "A fuel nozzle pouring a stream of glowing golden liquid light, droplets sparkling like gold dust, '[OFFER TEXT]' in premium bold letters beside it.",
      },
      {
        title: "Night Canopy Glow",
        scene:
          "The fuel station forecourt glowing under bright canopy lights against a deep night sky, light reflecting off the polished ground, '[OFFER TEXT]' across the sky in LED-style letters.",
      },
      {
        title: "Tank Full, Smile Full",
        scene:
          "A happy driver's hand replacing the fuel cap with a satisfying click, warm light flare, '[OFFER TEXT]' in friendly bold letters above.",
      },
      {
        title: "Diesel Power",
        scene:
          "A powerful truck at the diesel pump at dusk, headlights cutting through, exhaust warmth in the air, '[OFFER TEXT]' in heavy industrial letters above.",
      },
      {
        title: "Price Drop Alert",
        scene:
          "A giant glowing yellow arrow crashing downward, cracks and impact dust where it lands, '[OFFER TEXT — e.g. FUEL PRICE DROP]' in alert-style bold letters above the impact.",
      },
      {
        title: "Early Bird Fill-Up",
        scene:
          "The forecourt at golden sunrise, first car of the day filling up, long warm shadows, '[OFFER TEXT]' across the sunrise in bold letters.",
      },
      {
        title: "LED Pylon Sign",
        scene:
          "The station's tall LED pylon sign glowing against the night, displaying '[FUEL TYPE]' in bright digits, light rays flaring, '[OFFER TEXT]' beneath in crisp white.",
      },
      {
        title: "Highway Stop",
        scene:
          "Light trails of highway traffic streaking past the glowing station at night, one car pulling in, '[OFFER TEXT]' overhead in travel-sign letters.",
      },
      {
        title: "Fuel Gauge Full",
        scene:
          "A close-up of a car fuel gauge needle sweeping to FULL with a satisfying yellow glow, dashboard lights bokeh behind, '[OFFER TEXT]' in dashboard-display letters.",
      },
    ],
  },
  {
    category: "Combos & Meal Deals",
    icon: "🍔",
    items: [
      {
        title: "Combo Trio Spotlight",
        scene:
          "Three spotlights hit [ITEM 1], [ITEM 2] and [ITEM 3] lined up like stars on stage, '[COMBO NAME]' in huge letters above them.",
      },
      {
        title: "Deal Stack",
        scene:
          "[COMBO ITEMS] stacked into one epic tower with a yellow 'COMBO' banner wrapped around it, '[OFFER TEXT]' at the top in bold letters.",
      },
      {
        title: "Split-Screen Combo",
        scene:
          "The frame split into bold panels, each showing one combo item — [LIST ITEMS] — with yellow dividing lines, '[COMBO NAME]' across all panels.",
      },
      {
        title: "Lunch Break Hero",
        scene:
          "A workday lunch scene: [COMBO ITEMS] arranged on dark slate with a clock showing lunch time, steam rising, '[OFFER TEXT]' in bold lunchtime letters.",
      },
      {
        title: "Driver's Deal",
        scene:
          "POV from the driver's seat: a hand reaching for [COMBO ITEMS] on the passenger seat, road ahead through the windscreen, '[OFFER TEXT]' on the horizon in bold letters.",
      },
      {
        title: "Family Pack",
        scene:
          "A generous family-sized spread of [COMBO ITEMS] laid out for sharing, warm inviting light on the black background, '[OFFER TEXT — e.g. FEEDS THE WHOLE FAMILY]' in welcoming bold letters.",
      },
      {
        title: "Perfect Pair",
        scene:
          "[ITEM 1] and [ITEM 2] presented as the perfect duo with a subtle yellow '+' glowing between them, '[OFFER TEXT]' overhead in bold letters.",
      },
      {
        title: "Grab & Go Bag",
        scene:
          "A branded paper bag tipping toward the camera spilling out [COMBO ITEMS] in crisp detail, motion energy, '[OFFER TEXT]' in quick bold letters above.",
      },
      {
        title: "Value Bomb",
        scene:
          "A cartoon-style bomb with a lit fuse exploding into [COMBO ITEMS] and yellow shockwaves, 'VALUE EXPLOSION' energy, '[OFFER TEXT]' in impact letters above the blast.",
      },
      {
        title: "Mix & Match Grid",
        scene:
          "A sleek grid of [NUMBER] items — [LIST ITEMS] — each in its own glowing tile, 'PICK ANY [X]' in bold letters at the top of the grid.",
      },
    ],
  },
  {
    category: "Seasonal & Holidays",
    icon: "🎉",
    items: [
      {
        title: "Christmas Glow",
        scene:
          "[PRODUCT / SPECIAL] surrounded by warm Christmas lights, subtle golden baubles and soft bokeh on the black background, '[OFFER TEXT]' in festive bold letters above.",
      },
      {
        title: "New Year Fireworks",
        scene:
          "Golden fireworks exploding across the night sky above [PRODUCT / SPECIAL], sparks raining down, '[OFFER TEXT]' in celebratory bold letters.",
      },
      {
        title: "Easter Treat",
        scene:
          "[PRODUCT / SPECIAL] nestled among elegant golden easter eggs and soft feathers on black, '[OFFER TEXT]' in joyful rounded letters above.",
      },
      {
        title: "Winter Frost",
        scene:
          "Frost crystals creeping across the frame around [PRODUCT / SPECIAL], cold blue-white breath mist against the black, '[OFFER TEXT]' in icy bold letters.",
      },
      {
        title: "Summer Scorcher",
        scene:
          "Heat-wave shimmer and a blazing sun flare behind [PRODUCT / SPECIAL], condensation dripping, '[OFFER TEXT]' in hot bold letters above.",
      },
      {
        title: "Spring Fresh",
        scene:
          "Fresh green leaves and soft petals drifting around [PRODUCT / SPECIAL] against the dark background, morning dew detail, '[OFFER TEXT]' in fresh bold letters.",
      },
      {
        title: "Youth Day Energy",
        scene:
          "A vibrant, energetic celebration design around [PRODUCT / SPECIAL] with dynamic yellow paint splashes and movement, '[OFFER TEXT]' in youthful street-style letters.",
      },
      {
        title: "Heritage Day Braai",
        scene:
          "A proudly South African braai celebration: [PRODUCT / SPECIAL] with subtle flag-coloured light accents, flames and stars, '[OFFER TEXT]' in proud bold letters.",
      },
      {
        title: "Valentine's Treat",
        scene:
          "[PRODUCT / SPECIAL] with soft red rose petals scattered on glossy black and warm romantic rim light, '[OFFER TEXT]' in elegant bold letters above.",
      },
      {
        title: "Back To School",
        scene:
          "[PRODUCT / SPECIAL] beside neat school supplies and a morning-rush energy, chalk-dust light rays, '[OFFER TEXT]' in chalkboard letters above.",
      },
      {
        title: "Payday Weekend",
        scene:
          "Golden coins and yellow confetti raining around [PRODUCT / SPECIAL] like a jackpot win, '[OFFER TEXT — e.g. PAYDAY SPECIAL]' in casino-style bold letters.",
      },
      {
        title: "Long Weekend Road Trip",
        scene:
          "An open road stretching to the horizon at dawn with [PRODUCT / SPECIAL] in the foreground, adventure mood, '[OFFER TEXT]' across the sky in road-trip letters.",
      },
    ],
  },
  {
    category: "Announcements & Store News",
    icon: "📣",
    items: [
      {
        title: "Now In Stock",
        scene:
          "[PRODUCT] revealed on a glowing pedestal with 'NOW IN STOCK' in giant letters above it and light rays bursting from behind, '[EXTRA DETAILS]' in white beneath.",
      },
      {
        title: "The Big Reveal",
        scene:
          "Dark theatre curtains sweeping open to reveal [PRODUCT] in a spotlight, dust sparkling in the beam, '[ANNOUNCEMENT TEXT]' in premiere-style letters above.",
      },
      {
        title: "Coming Soon Teaser",
        scene:
          "A mysterious backlit silhouette of [PRODUCT] behind frosted glass with 'COMING SOON' in huge letters, a single yellow glow hinting at it, '[DATE / DETAILS]' in white beneath.",
      },
      {
        title: "Price Drop Siren",
        scene:
          "A spinning yellow alert beacon casting light rays over [PRODUCT] with 'PRICE DROP' in emergency-bold letters, a bold downward yellow arrow slicing through the frame beside it.",
      },
      {
        title: "Last Chance Countdown",
        scene:
          "A dramatic digital countdown timer glowing above [PRODUCT / SPECIAL], sand-timer particles falling, 'LAST CHANCE — [END DATE]' in urgent bold letters.",
      },
      {
        title: "Open 24/7 Neon",
        scene:
          "A stunning neon artwork of 'OPEN 24 HOURS' glowing above the station storefront at night, warm light spilling out the doors, '[EXTRA MESSAGE]' in white neon script beneath.",
      },
      {
        title: "Load-Shedding? We're Open",
        scene:
          "The station glowing bright like a beacon while the surrounding town sits in darkness, a generator hum visualised as soft yellow sound waves, 'LOAD-SHEDDING? WE'RE OPEN' in defiant bold letters and '[DETAILS]' in white.",
      },
      {
        title: "Thank You Ventersdorp",
        scene:
          "A warm, heartfelt design with golden light rays and subtle confetti over the station forecourt, 'THANK YOU VENTERSDORP' in huge grateful letters and '[MESSAGE]' in white script beneath.",
      },
    ],
  },
  {
    category: "Night & 24-Hour",
    icon: "🌙",
    items: [
      {
        title: "Midnight Open",
        scene:
          "The glowing station at exactly midnight under a deep starfield, clock hands striking 12 subtly in the corner, '[OFFER TEXT]' in luminous letters above.",
      },
      {
        title: "Starry Forecourt",
        scene:
          "The Milky Way stretching over the lit forecourt canopy, one car refuelling peacefully, '[OFFER TEXT]' written across the stars.",
      },
      {
        title: "Night Shift Coffee",
        scene:
          "A steaming cup of [COFFEE/DRINK] on the counter at 2AM, neon reflections in the window, rain outside, '[OFFER TEXT]' in noir-style letters.",
      },
      {
        title: "City Lights Speed",
        scene:
          "Long-exposure light trails wrapping around [PRODUCT] like ribbons of night traffic, '[OFFER TEXT]' in streaking light letters above.",
      },
      {
        title: "Moonlit Canopy",
        scene:
          "A full moon hanging above the station canopy, cool blue night tones against the warm yellow station light, [PRODUCT] in the foreground, '[OFFER TEXT]' across the moonlight.",
      },
      {
        title: "Insomniac Snacks",
        scene:
          "A cosy midnight-snack scene: [SNACK ITEMS] glowing in fridge-light against the dark, '[OFFER TEXT — e.g. MIDNIGHT MUNCHIES]' in sleepy-cool letters above.",
      },
      {
        title: "3AM Fuel-Up",
        scene:
          "A lone car at the pumps at 3AM, steam from its exhaust, the attendant's silhouette waving, warm and safe against the dark, '[OFFER TEXT]' in quiet bold letters above.",
      },
      {
        title: "Glow In The Dark",
        scene:
          "[PRODUCT] painted in glowing phosphorescent light against pure darkness, light-painting swirls around it, '[OFFER TEXT]' drawn in light beside it.",
      },
    ],
  },
  {
    category: "Style Remix — Any Product",
    icon: "🎨",
    items: [
      {
        title: "Ultra Macro",
        scene:
          "An extreme macro photograph of [PRODUCT] showing textures invisible to the naked eye, shallow depth of field, '[OFFER TEXT]' in minimal clean type beside it.",
      },
      {
        title: "Isometric Mini Station",
        scene:
          "A cute isometric 3D miniature of the whole fuel station with a giant [PRODUCT] towering over it like a landmark, tiny cars queueing, '[OFFER TEXT]' floating in 3D letters above.",
      },
      {
        title: "Paper Cutout Art",
        scene:
          "[PRODUCT] and the scene built entirely from layered paper cutout art with real depth shadows, '[OFFER TEXT]' cut from yellow paper above it.",
      },
      {
        title: "Graffiti Wall",
        scene:
          "[PRODUCT] painted as stunning photorealistic graffiti on a black brick wall, wet paint drips and spray mist, '[OFFER TEXT]' in wildstyle yellow graffiti beside it.",
      },
      {
        title: "Hologram Display",
        scene:
          "[PRODUCT] projected as a futuristic glowing hologram above a sleek black console, scan lines and data particles, '[OFFER TEXT]' in HUD-style type beside it.",
      },
      {
        title: "Cinematic Rain",
        scene:
          "[PRODUCT] in dramatic rain, every droplet lit by a warm yellow key light, slow-motion splashes bouncing off it, '[OFFER TEXT]' in blockbuster movie-poster letters.",
      },
      {
        title: "Golden Particles",
        scene:
          "[PRODUCT] dissolving at its edges into thousands of floating golden particles that drift upward, '[OFFER TEXT]' formed from gathering particles above it.",
      },
      {
        title: "Duotone Punch",
        scene:
          "A striking duotone composition: [PRODUCT] rendered purely in yellow and white tones on pitch black, ultra-graphic and modern, '[OFFER TEXT]' oversized and cropped stylishly.",
      },
      {
        title: "Levitation Ring",
        scene:
          "[PRODUCT] levitating inside a glowing yellow energy ring, gravity dust falling away beneath it, '[OFFER TEXT]' orbiting the ring in bold letters.",
      },
      {
        title: "Magazine Cover",
        scene:
          "A premium magazine-cover layout starring [PRODUCT] as the cover model, masthead reading 'SPECIALS', cover lines in white with '[OFFER TEXT]' as the main headline.",
      },
    ],
  },
];

export const TOTAL_PROMPTS =
  PROMPT_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0) + 1; // +1 master
