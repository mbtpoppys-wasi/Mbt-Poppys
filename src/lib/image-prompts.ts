// Ready-to-copy ChatGPT image-generation prompts for the admin portal's
// "Image Prompts" page. Every prompt is composed with the same brand rules
// (MBT yellow #FFDE00 headlines, white supporting text, deep black #151515
// background, product keeps its OWN brand colours) and the same mandatory
// output block (exactly 1920 × 1080, 16:9, 4K quality) — so whichever one
// the owner copies, the result always fits the website's image frames
// (see the 16:9 upload notice in AdminDashboard).

export function buildPrompt(scene: string): string {
  return `Generate me a professional, eye-catching advertisement image for MBT Poppys Ventersdorp (a 24-hour fuel station & BUZZ Café in Ventersdorp, South Africa) using yellow, white and black as the advert's colour scheme.

THE AD:
${scene}

BRAND RULES (must follow exactly):
- Background: deep matte black (#151515) with dramatic, high-contrast studio lighting.
- Headline text: huge, bold, vivid MBT yellow (#FFDE00) in an impactful advertising font — perfectly legible.
- Supporting text and small details: clean, crisp white.
- The product itself must keep its OWN real brand colours and packaging so it stays instantly recognisable (e.g. Energade stays in Energade's colours, Coca-Cola stays red) — ONLY the background, headlines and supporting text use the MBT yellow / white / black scheme.
- The composition must capture visual attention instantly: bold, punchy, professional advertising agency quality.
- Replace every [BRACKETED] placeholder below with the real deal details before generating.

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
  `Design the most eye-catching advert possible for this special: [DESCRIBE YOUR SPECIAL — the product(s), the offer, the price, and any dates]. You choose the strongest professional composition for it (dramatic spotlight, liquid splash, explosion of colour, cinematic close-up — whatever sells it hardest), with the offer text huge and impossible to miss and the price displayed inside a bold MBT-yellow starburst badge.`
);

export const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    category: "Universal — Any Special",
    icon: "⭐",
    items: [
      {
        title: "The All-Rounder",
        scene:
          "Feature [PRODUCT / SPECIAL DETAILS] as the glowing hero in the centre of the advert, with the offer '[OFFER TEXT]' in massive headline letters across the top and the price '[PRICE]' inside a bold yellow starburst badge in the corner.",
      },
      {
        title: "Explosive Splash",
        scene:
          "Show [PRODUCT] bursting through a dramatic explosion of liquid and energy, droplets frozen mid-air around it, with '[OFFER TEXT]' slicing across the image in giant letters and '[PRICE]' stamped in a yellow badge.",
      },
      {
        title: "Cinematic Spotlight",
        scene:
          "A single dramatic spotlight beam cuts through light haze onto [PRODUCT] standing on a glossy black reflective floor, like a movie premiere. '[OFFER TEXT]' glows above it and '[PRICE]' sits beneath in a yellow ribbon.",
      },
      {
        title: "Neon Glow",
        scene:
          "Frame [PRODUCT] with glowing yellow neon tubes and small electric sparks, retro-futuristic style, with '[OFFER TEXT]' written as a giant neon sign and '[PRICE]' flickering in a neon price tag.",
      },
      {
        title: "3D Billboard",
        scene:
          "Render [PRODUCT] as a giant hyper-real 3D object mounted on a black billboard with dramatic under-lighting, '[OFFER TEXT]' in enormous extruded 3D letters and '[PRICE]' punched out in a yellow circle.",
      },
      {
        title: "Comic Book Pop",
        scene:
          "Illustrate [PRODUCT] in bold comic-book style with halftone dots, action lines and a 'POW!'-style burst that contains '[PRICE]', while '[OFFER TEXT]' runs across the top in comic lettering.",
      },
      {
        title: "Lightning Strike",
        scene:
          "Storm clouds gather behind [PRODUCT] while bolts of vivid yellow lightning strike down around it, charging it with power. '[OFFER TEXT]' crackles in electrified letters with '[PRICE]' in a glowing badge.",
      },
      {
        title: "Gold Luxury",
        scene:
          "Present [PRODUCT] as a premium luxury item resting on black silk with golden-yellow rim lighting and floating gold particles, '[OFFER TEXT]' in elegant but bold lettering and '[PRICE]' on a golden seal.",
      },
      {
        title: "Speed Blur",
        scene:
          "Motion streaks and light trails race past [PRODUCT] as if it's moving at highway speed, conveying energy and urgency, with '[OFFER TEXT]' leaning in italic speed-styled letters and '[PRICE]' in a racing-style number board.",
      },
      {
        title: "Retro Petrol Poster",
        scene:
          "A vintage 1960s petrol-station advertising poster look with subtle distressed texture: [PRODUCT] painted in retro illustration style, '[OFFER TEXT]' in classic signwriter lettering and '[PRICE]' in an old-school price roundel.",
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
          "An ice-cold can of [DRINK NAME] bursts through shattering ice and a splash of its own flavour colours, droplets frozen mid-air, '[OFFER TEXT]' in huge electric letters and '[PRICE]' in a yellow starburst.",
      },
      {
        title: "Twin Cans Duel",
        scene:
          "Two flavours of [DRINK NAME] face off from opposite sides of the frame with split lighting in each flavour's colour, lightning meeting in the middle, '[OFFER TEXT]' across the centre and '[PRICE]' below.",
      },
      {
        title: "Frozen Solid",
        scene:
          "A can of [DRINK NAME] encased inside a cracking, glowing block of ice, freezing mist rolling off it, with '[OFFER TEXT]' in frosted letters and '[PRICE]' stamped on an ice tag.",
      },
      {
        title: "Fruit Blast",
        scene:
          "Fresh fruit pieces matching the flavour of [DRINK NAME] explode around the can in juicy slow motion with splashing juice ribbons, '[OFFER TEXT]' bold across the top, '[PRICE]' in a juicy yellow splash badge.",
      },
      {
        title: "Electric Charge",
        scene:
          "A can of [DRINK NAME] crackling with arcs of vivid yellow electricity, sparks flying, standing on a charged metal plate, with '[OFFER TEXT]' in voltage-styled lettering and '[PRICE]' inside a warning-sign badge.",
      },
      {
        title: "Game Day Refresh",
        scene:
          "A sports-action scene: [DRINK NAME] slammed down mid-air with sweat droplets and stadium floodlights behind, '[OFFER TEXT]' in athletic block letters and '[PRICE]' on a scoreboard-style panel.",
      },
      {
        title: "Midnight Fuel-Up",
        scene:
          "A can of [DRINK NAME] glowing under fuel-station canopy lights at night, moths of light drifting by, '[OFFER TEXT]' in glowing signage letters and '[PRICE]' on an LED price board.",
      },
      {
        title: "Pyramid Stack",
        scene:
          "Cans of [DRINK NAME] stacked in a perfect pyramid while one hero can floats and rotates above it in a beam of light, '[OFFER TEXT]' arcing over the top and '[PRICE]' at the pyramid's base.",
      },
      {
        title: "Condensation Macro",
        scene:
          "An extreme macro close-up of an ice-cold [DRINK NAME] covered in perfect condensation droplets, one drop rolling down the logo, '[OFFER TEXT]' in crisp modern type beside it and '[PRICE]' in a minimal yellow chip.",
      },
      {
        title: "Zero Gravity",
        scene:
          "Cans of [DRINK NAME] floating weightlessly with ribbons of liquid spiralling between them in zero gravity, '[OFFER TEXT]' floating in bold 3D letters and '[PRICE]' orbiting inside a yellow ring.",
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
          "A fresh [BAKED ITEM] with a perfect golden crust, gentle steam rising into warm light, '[OFFER TEXT]' in warm bold letters and '[PRICE]' inside a yellow baker's stamp.",
      },
      {
        title: "Butter Melt Close-Up",
        scene:
          "A macro shot of butter melting over a warm slice of [BAKED ITEM], glistening in dramatic side light, '[OFFER TEXT]' across the top and '[PRICE]' in a soft yellow badge.",
      },
      {
        title: "Bakery Board Flat Lay",
        scene:
          "A top-down flat lay of [BAKED ITEMS] arranged beautifully on a dark wooden board dusted with flour, '[OFFER TEXT]' hand-lettered style in yellow and '[PRICE]' on a small chalk tag.",
      },
      {
        title: "Fresh Out The Oven",
        scene:
          "An open oven glowing warm orange as [BAKED ITEM] is pulled out on a tray, sparks of flour in the air, '[OFFER TEXT]' in bold bakery lettering and '[PRICE]' branded onto a yellow oven mitt tag.",
      },
      {
        title: "Flour Dust Action",
        scene:
          "[BAKED ITEM] tossed mid-air through a dramatic cloud of flour caught in a light beam, frozen in time, '[OFFER TEXT]' cutting through the dust and '[PRICE]' in a punchy yellow burst.",
      },
      {
        title: "Pie Tower",
        scene:
          "Golden pies stacked into an impressive tower with the top one cut open showing its steaming filling, '[OFFER TEXT]' in hearty bold letters and '[PRICE]' on a yellow flag pinned to the top pie.",
      },
      {
        title: "Golden Hour Bread",
        scene:
          "A loaf of [BREAD NAME] on a rustic surface backlit by golden-hour light, dust motes glowing, '[OFFER TEXT]' in warm serif lettering and '[PRICE]' inside a wheat-wreathed yellow badge.",
      },
      {
        title: "Chalkboard Special",
        scene:
          "A stylish black chalkboard menu design with [BAKED ITEM] photographed in the corner and '[OFFER TEXT]' plus '[PRICE]' written in beautiful yellow and white chalk lettering with small chalk doodles.",
      },
      {
        title: "Padkos Ready",
        scene:
          "A road-trip scene: [BAKED ITEM] wrapped and ready on a car seat with a map and sunglasses, morning light through the window, '[OFFER TEXT]' overhead in travel-poster letters and '[PRICE]' on a yellow luggage tag.",
      },
      {
        title: "Cross-Section Hero",
        scene:
          "A perfect cross-section cut of [BAKED ITEM] showing its delicious layers and filling in razor-sharp macro detail, '[OFFER TEXT]' alongside in clean bold type and '[PRICE]' in a minimal yellow circle.",
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
          "A takeaway cup of [COFFEE/DRINK] with elegant steam swirling upward into glowing shapes, '[OFFER TEXT]' formed partly by the steam and '[PRICE]' on a yellow coffee sleeve.",
      },
      {
        title: "Bean Explosion",
        scene:
          "Roasted coffee beans exploding outward in slow motion around a cup of [COFFEE/DRINK], one bean splashing into the crema, '[OFFER TEXT]' in rich bold letters and '[PRICE]' in a yellow bean-shaped badge.",
      },
      {
        title: "Morning Commute",
        scene:
          "A steaming cup of [COFFEE/DRINK] on a car roof at the fuel pumps at sunrise, warm light flaring, '[OFFER TEXT]' across the sky in bold letters and '[PRICE]' on the pump's price display.",
      },
      {
        title: "Latte Art Close-Up",
        scene:
          "A top-down close-up of perfect latte art in a cup of [COFFEE/DRINK], velvety microfoam detail, '[OFFER TEXT]' circling the cup in clean type and '[PRICE]' in a small yellow saucer badge.",
      },
      {
        title: "Double Cup Deal",
        scene:
          "Two takeaway cups of [COFFEE/DRINK] clinking together like a toast with a small splash, '[OFFER TEXT]' between them in friendly bold letters and '[PRICE]' in a yellow 2-for badge.",
      },
      {
        title: "Winter Warmer",
        scene:
          "A cup of [COFFEE/DRINK] glowing warm against a cold, frosty dark background with soft falling snow, hands in gloves reaching for it, '[OFFER TEXT]' in cosy bold letters and '[PRICE]' in a knitted-texture yellow patch.",
      },
      {
        title: "Coffee Waterfall",
        scene:
          "A dramatic slow-motion pour: rich coffee cascading like a waterfall into a cup of [COFFEE/DRINK], droplets suspended, '[OFFER TEXT]' behind the pour in giant letters and '[PRICE]' in a yellow drop-shaped badge.",
      },
      {
        title: "24-Hour Brew",
        scene:
          "A glowing neon 'OPEN 24 HOURS' sign above a cup of [COFFEE/DRINK] on the counter at night, '[OFFER TEXT]' in neon-tube lettering and '[PRICE]' blinking on a small neon price sign.",
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
          "[BRAAI ITEM] sizzling on a grill with dramatic flames leaping up around it, embers rising into the black sky, '[OFFER TEXT]' in fire-licked bold letters and '[PRICE]' branded like a hot iron stamp in yellow.",
      },
      {
        title: "Charcoal Sparks",
        scene:
          "Glowing charcoal briquettes with sparks swirling upward around [BRAAI ITEM], deep contrast, '[OFFER TEXT]' glowing like embers and '[PRICE]' on a yellow metal tag.",
      },
      {
        title: "Boerewors Sizzle",
        scene:
          "A perfect boerewors coil sizzling on an open braai grid, oil glistening, smoke curling, '[OFFER TEXT]' in proudly bold letters and '[PRICE]' inside a yellow braai-tong badge.",
      },
      {
        title: "Braai Pack Spread",
        scene:
          "A generous braai pack — [LIST ITEMS] — laid out on butcher paper on dark wood, top-down, '[OFFER TEXT]' across the top in butcher-shop lettering and '[PRICE]' on a yellow price sticker.",
      },
      {
        title: "Weekend Fire",
        scene:
          "Silhouettes of friends around a glowing braai fire under the stars, [BRAAI ITEM] in crisp focus in the foreground, '[OFFER TEXT]' across the night sky and '[PRICE]' in a warm yellow badge.",
      },
      {
        title: "Smoke & Ember Type",
        scene:
          "'[OFFER TEXT]' written in letters made of smoke and glowing embers above [BRAAI ITEM] on the grill, cinematic darkness around it, '[PRICE]' in a spark-edged yellow roundel.",
      },
      {
        title: "Marinade Drip",
        scene:
          "A macro shot of rich marinade dripping in slow motion off [BRAAI ITEM] held over the flames, every droplet sharp, '[OFFER TEXT]' beside it in bold type and '[PRICE]' in a glossy yellow drip badge.",
      },
      {
        title: "Wood & Fire Stack",
        scene:
          "A rustic stack of braai wood and firelighters next to [PRODUCT], flames just catching, sparks in the air, '[OFFER TEXT]' in rugged stencil letters and '[PRICE]' burned into a yellow wood tag.",
      },
      {
        title: "Potjie Night",
        scene:
          "A cast-iron potjie bubbling over coals at night, steam and firelight glowing, [PRODUCT] beside it, '[OFFER TEXT]' in traditional bold lettering and '[PRICE]' on a yellow enamel tag.",
      },
      {
        title: "Rugby Day Braai",
        scene:
          "A match-day scene: [BRAAI ITEM] on the grill in the foreground with a TV glow and team flags softly blurred behind, '[OFFER TEXT]' in sports-poster letters and '[PRICE]' on a yellow scoreboard chip.",
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
          "A sunlit car dashboard POV on an open road with [SNACK ITEMS] spread on the passenger seat, '[OFFER TEXT]' across the windscreen view in bold road-sign letters and '[PRICE]' on a yellow road-sign badge.",
      },
      {
        title: "Snack Avalanche",
        scene:
          "An avalanche of [SNACK ITEMS] tumbling toward the camera in dynamic slow motion, crumbs and pieces flying, '[OFFER TEXT]' punching through the middle and '[PRICE]' in a yellow burst.",
      },
      {
        title: "Chocolate Melt",
        scene:
          "Silky melted chocolate flowing over a bar of [CHOCOLATE NAME] in extreme macro detail, '[OFFER TEXT]' in indulgent bold letters and '[PRICE]' in a golden-yellow foil badge.",
      },
      {
        title: "Chip Crunch Burst",
        scene:
          "A bag of [CHIPS NAME] bursting open with chips exploding outward mid-air, seasoning dust sparkling in the light, '[OFFER TEXT]' in crunchy bold letters and '[PRICE]' in a yellow crinkle-cut badge.",
      },
      {
        title: "Sweets Rain",
        scene:
          "Colourful [SWEETS NAME] raining down in slow motion and bouncing off a glossy black surface, '[OFFER TEXT]' in playful chunky letters and '[PRICE]' inside a candy-styled yellow swirl badge.",
      },
      {
        title: "Biltong Rustic",
        scene:
          "Premium biltong slices arranged on dark slate with a rustic knife, dramatic side lighting showing the texture, '[OFFER TEXT]' in bold heritage lettering and '[PRICE]' on a yellow butcher's tag.",
      },
      {
        title: "Padkos Pack",
        scene:
          "The ultimate padkos spread — [LIST ITEMS] — packed neatly into a travel bag with a thermos, top-down on dark canvas, '[OFFER TEXT]' in adventure-poster letters and '[PRICE]' on a yellow luggage sticker.",
      },
      {
        title: "Candy Neon",
        scene:
          "[SWEETS NAME] glowing under blacklight-style neon with vivid colour pops against the black, '[OFFER TEXT]' in neon-sign lettering and '[PRICE]' in an electric yellow price tag.",
      },
      {
        title: "Snack Tower",
        scene:
          "A gravity-defying tower of [SNACK ITEMS] stacked impossibly high, one item toppling toward the camera, '[OFFER TEXT]' running up the side and '[PRICE]' balanced on top in a yellow crown badge.",
      },
      {
        title: "Glovebox Stash",
        scene:
          "A car glovebox popping open to reveal a secret stash of [SNACK ITEMS] glowing like treasure, '[OFFER TEXT]' in cheeky bold letters and '[PRICE]' on a yellow treasure tag.",
      },
    ],
  },
  {
    category: "Fuel & Forecourt",
    icon: "⛽",
    items: [
      {
        title: "Pump Price Hero",
        scene:
          "A gleaming fuel pump under dramatic night lighting with '[FUEL TYPE]' and the price '[PRICE] per litre' displayed huge on its digital screen, '[OFFER TEXT]' across the top in bold letters.",
      },
      {
        title: "Golden Nozzle",
        scene:
          "A fuel nozzle pouring a stream of glowing golden liquid light, droplets sparkling like gold dust, '[OFFER TEXT]' in premium bold letters and '[PRICE] p/l' inside a yellow droplet badge.",
      },
      {
        title: "Night Canopy Glow",
        scene:
          "The fuel station forecourt glowing under bright canopy lights against a deep night sky, light reflecting off the polished ground, '[OFFER TEXT]' across the sky in LED-style letters and '[PRICE]' on the pylon sign.",
      },
      {
        title: "Tank Full, Smile Full",
        scene:
          "A happy driver's hand replacing the fuel cap with a satisfying click, warm light flare, '[OFFER TEXT]' in friendly bold letters and '[PRICE] p/l' in a yellow fuel-cap badge.",
      },
      {
        title: "Diesel Power",
        scene:
          "A powerful truck at the diesel pump at dusk, headlights cutting through, exhaust warmth in the air, '[OFFER TEXT]' in heavy industrial letters and '[DIESEL PRICE] p/l' on a rugged yellow plate.",
      },
      {
        title: "Price Drop Alert",
        scene:
          "A giant glowing yellow arrow crashing downward next to the numbers '[NEW PRICE]', cracks and impact dust where it lands, '[OFFER TEXT — e.g. FUEL PRICE DROP]' in alert-style bold letters.",
      },
      {
        title: "Early Bird Fill-Up",
        scene:
          "The forecourt at golden sunrise, first car of the day filling up, long warm shadows, '[OFFER TEXT]' across the sunrise in bold letters and '[PRICE]' in a rising-sun yellow badge.",
      },
      {
        title: "LED Pylon Sign",
        scene:
          "The station's tall LED pylon price sign glowing against the night, displaying '[FUEL TYPE] — [PRICE]' in bright digits, light rays flaring, '[OFFER TEXT]' beneath in crisp white.",
      },
      {
        title: "Highway Stop",
        scene:
          "Light trails of highway traffic streaking past the glowing station at night, one car pulling in, '[OFFER TEXT]' overhead in travel-sign letters and '[PRICE]' on a yellow route marker badge.",
      },
      {
        title: "Fuel Gauge Full",
        scene:
          "A close-up of a car fuel gauge needle sweeping to FULL with a satisfying yellow glow, dashboard lights bokeh behind, '[OFFER TEXT]' in dashboard-display letters and '[PRICE] p/l' in a yellow gauge badge.",
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
          "Three spotlights hit [ITEM 1], [ITEM 2] and [ITEM 3] lined up like stars on stage, '[COMBO NAME]' in huge letters above and 'ALL FOR [PRICE]' in a giant yellow starburst.",
      },
      {
        title: "Deal Stack",
        scene:
          "[COMBO ITEMS] stacked into one epic tower with a yellow 'COMBO' banner wrapped around it, '[OFFER TEXT]' at the top and '[PRICE]' at the base in a heavy yellow price block.",
      },
      {
        title: "Split-Screen Combo",
        scene:
          "The frame split into bold panels, each showing one combo item — [LIST ITEMS] — with yellow dividing lines, '[COMBO NAME]' across all panels and '[PRICE]' in a centre yellow circle.",
      },
      {
        title: "Lunch Break Hero",
        scene:
          "A workday lunch scene: [COMBO ITEMS] arranged on dark slate with a clock showing lunch time, steam rising, '[OFFER TEXT]' in bold lunchtime letters and '[PRICE]' on a yellow clock badge.",
      },
      {
        title: "Driver's Deal",
        scene:
          "POV from the driver's seat: a hand reaching for [COMBO ITEMS] on the passenger seat, road ahead through the windscreen, '[OFFER TEXT]' on the horizon in bold letters and '[PRICE]' on a yellow air-freshener tag.",
      },
      {
        title: "Family Pack",
        scene:
          "A generous family-sized spread of [COMBO ITEMS] laid out for sharing, warm inviting light on the black background, '[OFFER TEXT]' in welcoming bold letters and 'FEEDS [X] — [PRICE]' in a yellow banner.",
      },
      {
        title: "Perfect Pair",
        scene:
          "[ITEM 1] and [ITEM 2] presented as the perfect duo with a subtle yellow '+' glowing between them and '=' pointing to '[PRICE]' in a bright yellow equals-badge, '[OFFER TEXT]' overhead.",
      },
      {
        title: "Grab & Go Bag",
        scene:
          "A branded paper bag tipping toward the camera spilling out [COMBO ITEMS] in crisp detail, motion energy, '[OFFER TEXT]' in quick bold letters and '[PRICE]' on a yellow receipt sticker.",
      },
      {
        title: "Value Bomb",
        scene:
          "A cartoon-style bomb with a lit fuse exploding into [COMBO ITEMS] and yellow shockwaves, 'VALUE EXPLOSION' energy, '[OFFER TEXT]' in impact letters and '[PRICE]' at the blast centre.",
      },
      {
        title: "Mix & Match Grid",
        scene:
          "A sleek grid of [NUMBER] items — [LIST ITEMS] — each in its own glowing tile, 'PICK ANY [X]' in bold letters at the top and 'FOR [PRICE]' in a large yellow tile at the end of the grid.",
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
          "[PRODUCT / SPECIAL] surrounded by warm Christmas lights, subtle golden baubles and soft bokeh on the black background, '[OFFER TEXT]' in festive bold letters and '[PRICE]' in a yellow gift-tag badge.",
      },
      {
        title: "New Year Fireworks",
        scene:
          "Golden fireworks exploding across the night sky above [PRODUCT / SPECIAL], sparks raining down, '[OFFER TEXT]' in celebratory bold letters and '[PRICE]' in a yellow countdown badge.",
      },
      {
        title: "Easter Treat",
        scene:
          "[PRODUCT / SPECIAL] nestled among elegant golden easter eggs and soft feathers on black, '[OFFER TEXT]' in joyful rounded letters and '[PRICE]' inside a yellow egg-shaped badge.",
      },
      {
        title: "Winter Frost",
        scene:
          "Frost crystals creeping across the frame around [PRODUCT / SPECIAL], cold blue-white breath mist against the black, '[OFFER TEXT]' in icy bold letters and '[PRICE]' in a frosted yellow badge.",
      },
      {
        title: "Summer Scorcher",
        scene:
          "Heat-wave shimmer and a blazing sun flare behind [PRODUCT / SPECIAL], condensation dripping, '[OFFER TEXT]' in hot bold letters and '[PRICE]' in a sun-shaped yellow badge.",
      },
      {
        title: "Spring Fresh",
        scene:
          "Fresh green leaves and soft petals drifting around [PRODUCT / SPECIAL] against the dark background, morning dew detail, '[OFFER TEXT]' in fresh bold letters and '[PRICE]' in a leaf-tagged yellow badge.",
      },
      {
        title: "Youth Day Energy",
        scene:
          "A vibrant, energetic celebration design around [PRODUCT / SPECIAL] with dynamic yellow paint splashes and movement, '[OFFER TEXT]' in youthful street-style letters and '[PRICE]' in a spray-paint yellow badge.",
      },
      {
        title: "Heritage Day Braai",
        scene:
          "A proudly South African braai celebration: [PRODUCT / SPECIAL] with subtle flag-coloured light accents, flames and stars, '[OFFER TEXT]' in proud bold letters and '[PRICE]' in a yellow shield badge.",
      },
      {
        title: "Valentine's Treat",
        scene:
          "[PRODUCT / SPECIAL] with soft red rose petals scattered on glossy black and warm romantic rim light, '[OFFER TEXT]' in elegant bold letters and '[PRICE]' inside a yellow heart-tag badge.",
      },
      {
        title: "Back To School",
        scene:
          "[PRODUCT / SPECIAL] beside neat school supplies and a morning-rush energy, chalk-dust light rays, '[OFFER TEXT]' in chalkboard letters and '[PRICE]' on a yellow ruler badge.",
      },
      {
        title: "Payday Weekend",
        scene:
          "Golden coins and yellow confetti raining around [PRODUCT / SPECIAL] like a jackpot win, '[OFFER TEXT — e.g. PAYDAY SPECIAL]' in casino-style bold letters and '[PRICE]' in a jackpot yellow badge.",
      },
      {
        title: "Long Weekend Road Trip",
        scene:
          "An open road stretching to the horizon at dawn with [PRODUCT / SPECIAL] in the foreground, adventure mood, '[OFFER TEXT]' across the sky in road-trip letters and '[PRICE]' on a yellow mile-marker badge.",
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
          "[PRODUCT] revealed on a glowing pedestal with 'NOW IN STOCK' in giant letters above it and light rays bursting from behind, '[EXTRA DETAILS]' in white beneath and the price '[PRICE]' in a yellow badge.",
      },
      {
        title: "The Big Reveal",
        scene:
          "Dark theatre curtains sweeping open to reveal [PRODUCT] in a spotlight, dust sparkling in the beam, '[ANNOUNCEMENT TEXT]' in premiere-style letters and '[PRICE]' on a yellow ticket stub.",
      },
      {
        title: "Coming Soon Teaser",
        scene:
          "A mysterious backlit silhouette of [PRODUCT] behind frosted glass with 'COMING SOON' in huge letters, a single yellow glow hinting at it, '[DATE / DETAILS]' in white beneath.",
      },
      {
        title: "Price Drop Siren",
        scene:
          "A spinning yellow alert beacon casting light rays over [PRODUCT] with 'PRICE DROP' in emergency-bold letters, the old price crossed out and '[NEW PRICE]' huge in yellow.",
      },
      {
        title: "Last Chance Countdown",
        scene:
          "A dramatic digital countdown timer glowing above [PRODUCT / SPECIAL], sand-timer particles falling, 'LAST CHANCE — [END DATE]' in urgent bold letters and '[PRICE]' in a flashing-style yellow badge.",
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
          "The glowing station at exactly midnight under a deep starfield, clock hands striking 12 subtly in the corner, '[OFFER TEXT]' in luminous letters and '[PRICE]' in a moon-yellow badge.",
      },
      {
        title: "Starry Forecourt",
        scene:
          "The Milky Way stretching over the lit forecourt canopy, one car refuelling peacefully, '[OFFER TEXT]' written across the stars and '[PRICE]' in a constellation-styled yellow badge.",
      },
      {
        title: "Night Shift Coffee",
        scene:
          "A steaming cup of [COFFEE/DRINK] on the counter at 2AM, neon reflections in the window, rain outside, '[OFFER TEXT]' in noir-style letters and '[PRICE]' in a yellow diner badge.",
      },
      {
        title: "City Lights Speed",
        scene:
          "Long-exposure light trails wrapping around [PRODUCT] like ribbons of night traffic, '[OFFER TEXT]' in streaking light letters and '[PRICE]' in a glowing yellow orb.",
      },
      {
        title: "Moonlit Canopy",
        scene:
          "A full moon hanging above the station canopy, cool blue night tones against the warm yellow station light, [PRODUCT] in the foreground, '[OFFER TEXT]' across the moonlight and '[PRICE]' in a yellow crescent badge.",
      },
      {
        title: "Insomniac Snacks",
        scene:
          "A cosy midnight-snack scene: [SNACK ITEMS] glowing in fridge-light against the dark, '[OFFER TEXT — e.g. MIDNIGHT MUNCHIES]' in sleepy-cool letters and '[PRICE]' on a yellow fridge magnet.",
      },
      {
        title: "3AM Fuel-Up",
        scene:
          "A lone car at the pumps at 3AM, steam from its exhaust, the attendant's silhouette waving, warm and safe against the dark, '[OFFER TEXT]' in quiet bold letters and '[PRICE]' on the pump display.",
      },
      {
        title: "Glow In The Dark",
        scene:
          "[PRODUCT] painted in glowing phosphorescent light against pure darkness, light-painting swirls around it, '[OFFER TEXT]' drawn in light and '[PRICE]' in a radiant yellow ring.",
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
          "An extreme macro photograph of [PRODUCT] showing textures invisible to the naked eye, shallow depth of field, '[OFFER TEXT]' in minimal clean type and '[PRICE]' in a small sharp yellow chip.",
      },
      {
        title: "Isometric Mini Station",
        scene:
          "A cute isometric 3D miniature of the whole fuel station with a giant [PRODUCT] towering over it like a landmark, tiny cars queueing, '[OFFER TEXT]' floating in 3D letters and '[PRICE]' on a tiny yellow billboard.",
      },
      {
        title: "Paper Cutout Art",
        scene:
          "[PRODUCT] and the scene built entirely from layered paper cutout art with real depth shadows, '[OFFER TEXT]' cut from yellow paper and '[PRICE]' on a folded paper tag.",
      },
      {
        title: "Graffiti Wall",
        scene:
          "[PRODUCT] painted as stunning photorealistic graffiti on a black brick wall, wet paint drips and spray mist, '[OFFER TEXT]' in wildstyle yellow graffiti and '[PRICE]' in a stencil badge.",
      },
      {
        title: "Hologram Display",
        scene:
          "[PRODUCT] projected as a futuristic glowing hologram above a sleek black console, scan lines and data particles, '[OFFER TEXT]' in HUD-style type and '[PRICE]' in a holographic yellow panel.",
      },
      {
        title: "Cinematic Rain",
        scene:
          "[PRODUCT] in dramatic rain, every droplet lit by a warm yellow key light, slow-motion splashes bouncing off it, '[OFFER TEXT]' in blockbuster movie-poster letters and '[PRICE]' in a rain-streaked yellow badge.",
      },
      {
        title: "Golden Particles",
        scene:
          "[PRODUCT] dissolving at its edges into thousands of floating golden particles that drift upward, '[OFFER TEXT]' formed from gathering particles and '[PRICE]' in a shimmering yellow badge.",
      },
      {
        title: "Duotone Punch",
        scene:
          "A striking duotone composition: [PRODUCT] rendered purely in yellow and white tones on pitch black, ultra-graphic and modern, '[OFFER TEXT]' oversized and cropped stylishly and '[PRICE]' in a solid yellow block.",
      },
      {
        title: "Levitation Ring",
        scene:
          "[PRODUCT] levitating inside a glowing yellow energy ring, gravity dust falling away beneath it, '[OFFER TEXT]' orbiting the ring in bold letters and '[PRICE]' at the ring's centre.",
      },
      {
        title: "Magazine Cover",
        scene:
          "A premium magazine-cover layout starring [PRODUCT] as the cover model, masthead reading 'MBT SPECIALS', cover lines in white with '[OFFER TEXT]' as the main headline and '[PRICE]' in a corner yellow flash.",
      },
    ],
  },
];

export const TOTAL_PROMPTS =
  PROMPT_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0) + 1; // +1 master
