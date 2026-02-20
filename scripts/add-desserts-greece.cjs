const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/recipes.json');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);

const greeceDesserts = {
  "East Macedonia and Thrace": {
    dish: "Tahinopita Kavala",
    description: "Kavala's Tahinopita is the beloved spiral sesame pastry of the Aegean coast of northern Greece — a street food so ancient and so deeply embedded in the daily life of Kavala, Xanthi, and the tobacco-trading cities of Thrace that it is simply called 'the roll' by locals who need no other name. It is made from a simple yeast-raised dough spread with a generous layer of tahini (sesame paste) and sugar, rolled tightly into a spiral, and baked until golden. When it comes from the oven and cools, the tahini has set into a dense, sweet, sesame-fragrant filling that spirals through the bun in dark ribbons. The dough puffs and separates the layers; the tahini binds and enriches them. In Kavala, tahinopites are sold warm from bakery windows at 7am, wrapped in parchment paper, to workers heading to the port or the tobacco warehouses. The sesame-honey perfume follows you down the cobblestone streets. It is the taste of a city built on two continents' trade.",
    ingredients: [
      "For the dough: 2 1/4 tsp (7 g) instant yeast, 1 cup (240 ml) warm water, 3 cups (375 g) all-purpose flour, 1 tsp granulated sugar, 1/2 tsp fine sea salt, 2 tbsp olive oil",
      "For the tahini filling: 1/2 cup (120 g) tahini (sesame paste — stir well before using), 1/2 cup (100 g) granulated sugar, 1 tsp ground cinnamon, 1/4 tsp vanilla extract",
      "Sesame seeds for sprinkling the top",
      "1 egg beaten with 1 tbsp water for egg wash (optional)"
    ],
    steps: [
      "Make the dough: Dissolve the yeast and sugar in the warm water; let stand 10 minutes until foamy. Combine the flour and salt in a large bowl. Add the yeast mixture and olive oil. Mix, then knead on a floured surface for 8–10 minutes until smooth and elastic. Cover and rise in a warm place 1–1.5 hours until doubled.",
      "Mix the filling: Stir the tahini well to combine the oil and paste. Mix with the sugar, cinnamon, and vanilla until combined — the filling will be thick and spreadable.",
      "Punch down the risen dough. Divide into 6–8 equal portions. Roll each portion on a floured surface into a thin oval or rectangle, about 8x5 inches (20x13 cm) and as thin as you can without tearing.",
      "Spread each piece of dough with a generous layer of tahini filling, leaving a 1/2-inch (1.3 cm) border on one long side. Roll up tightly from the opposite long side into a log. Coil each log into a spiral (snail shape), tucking the tail end under. Or simply leave as a straight roll for an easier shape.",
      "Place the spirals on a parchment-lined baking sheet. Brush with egg wash if using. Scatter sesame seeds over the tops. Cover and rest 30 minutes until slightly puffed. Meanwhile preheat the oven to 375°F (190°C).",
      "Bake for 20–25 minutes until golden-brown. Cool on a rack for at least 15 minutes before eating — the tahini filling needs time to set slightly. Serve warm or at room temperature."
    ]
  },

  "West Macedonia": {
    dish: "Galatopita me Krokos Kozanis",
    description: "Kozani is the capital of Greek saffron — Krokos Kozanis, the Protected Designation of Origin saffron of the Kozani plain, is the only saffron grown in Greece, produced from the purple Crocus sativus flowers harvested by hand every October in a two-week explosion of purple across the fields. The stigmas are dried and sold as threads of flaming red-orange that smell of honey, hay, and Mediterranean sun. The Galatopita me Krokos — saffron milk pie — is the natural expression of this extraordinary spice: a simple custard of milk, eggs, sugar, and semolina, perfumed with saffron and baked in a filo crust until set and golden. The saffron turns the custard a luminous yellow-gold and fills the kitchen with its singular, haunting perfume. This is food that a mountain town makes from what it has: sheep's milk, eggs, the saffron from its own fields, and the filo that every Macedonian grandmother keeps in the fridge. It is both humble and unforgettable.",
    ingredients: [
      "6–8 sheets (200 g) frozen filo dough, thawed",
      "1/2 cup (115 g) unsalted butter, melted (for brushing filo)",
      "For the saffron custard: 4 cups (960 ml) whole milk, 1/2 cup (85 g) fine semolina, 3/4 cup (150 g) granulated sugar, 4 large eggs, 1/2 tsp Krokos Kozanis saffron threads (or any good-quality saffron), 1 tsp pure vanilla extract, Pinch of fine sea salt",
      "Ground cinnamon for dusting"
    ],
    steps: [
      "Bloom the saffron: Warm 3 tbsp of the milk in a small bowl. Add the saffron threads and let steep for 10–15 minutes — the milk will turn a deep, golden-orange and smell intensely aromatic.",
      "Make the custard: Heat the remaining milk in a saucepan until steaming. Whisk in the semolina in a thin stream. Cook over medium heat, stirring constantly, until thickened — about 5 minutes. Remove from heat. Stir in the sugar and salt until dissolved. Let cool to warm (not hot). Whisk in the eggs one at a time, then the saffron milk and vanilla.",
      "Preheat the oven to 375°F (190°C). Butter a 9x13-inch (23x33 cm) baking pan.",
      "Layer 4–5 sheets of filo in the pan, buttering each one generously. Let the edges overhang the sides. Pour the warm saffron custard over the filo base evenly.",
      "Fold the overhanging filo edges over the filling. Layer the remaining 2–3 sheets of filo over the top, buttering each one. Tuck the edges down the sides. Brush the top generously with the remaining butter. Score the top lightly with a sharp knife into portion-sized squares or diamonds.",
      "Bake for 35–40 minutes until the filo is deep golden and the custard is set — it should not slosh when shaken, but jiggle slightly. Cool to room temperature, then refrigerate at least 1 hour. Dust with cinnamon before serving. Cut along the scored lines."
    ]
  },

  "Thessaly": {
    dish: "Galaktoboureko Thessalias",
    description: "Galaktoboureko — milk pie — is one of Greece's greatest desserts, and Thessaly, the great flat agricultural plain of central Greece, makes it with a particular pride: here the milk is from the sheep and goats grazing on the Pelion peninsula and the Pindus foothills, sweet and full-fat, and the semolina custard (crema) it produces is voluptuously rich. The galaktoboureko consists of two elements brought into perfect accord: the crema — a thick, fragrant, vanilla-and-citrus semolina custard cooked on the stove until very thick — and the filo — sheets of paper-thin pastry buttered lavishly and layered around the custard. The whole is baked until the filo is shatteringly crisp and golden, then immediately drenched with a fragrant citrus-honey syrup that soaks through the filo and pools around the custard. When you cut it and lift a piece, the filo crumbles, the custard trembles, the syrup drips. It is simultaneously hot and cold (in the Greek tradition, the syrup is cold when poured over the hot galaktoboureko, ensuring the filo stays crisp for longer), crisp and yielding, sweet and eggy.",
    ingredients: [
      "For the custard: 4 cups (960 ml) whole milk, 3/4 cup (130 g) fine semolina, 3/4 cup (150 g) granulated sugar, 4 large eggs, 3 tbsp unsalted butter, 1 tsp pure vanilla extract, Zest of 1 lemon",
      "12 sheets filo pastry (about 16 oz / 450 g), thawed if frozen",
      "3/4 cup (170 g) unsalted butter, melted (for brushing filo)",
      "For the syrup: 1 cup (200 g) granulated sugar, 1 cup (240 ml) water, 1 tbsp honey, Zest of 1 lemon (3–4 strips), 1 small cinnamon stick"
    ],
    steps: [
      "Make the syrup first (it must be cold when poured): Combine sugar, water, honey, lemon zest, and cinnamon in a saucepan. Bring to a boil, stir to dissolve sugar, then simmer 5 minutes. Cool completely and refrigerate.",
      "Make the custard: Heat the milk until steaming. In a steady stream, whisk in the semolina. Cook over medium heat, stirring constantly, until very thick — about 6–8 minutes. Remove from heat. Stir in the sugar, butter, vanilla, and lemon zest. Let cool 10 minutes. Whisk in the eggs one at a time until fully incorporated. The custard should be thick, creamy, and uniform.",
      "Preheat the oven to 375°F (190°C). Butter a 9x13-inch (23x33 cm) baking pan generously.",
      "Layer 6 sheets of filo in the pan, brushing each generously with melted butter and letting the edges overhang. Spread the warm custard evenly over the filo. Fold the overhanging edges over the custard. Layer the remaining 6 filo sheets on top, buttering each one. Tuck the top edges down the sides. Brush the top generously with butter. Using a sharp knife, score the top filo layers (not through to the custard) in diamond shapes.",
      "Bake for 40–45 minutes until the top is a beautiful deep golden-brown and the custard is set. Remove from the oven.",
      "Immediately pour the cold syrup evenly over the hot galaktoboureko — the contrast of temperatures ensures the filo crisps up as it absorbs the syrup. Allow to absorb for at least 30 minutes before cutting. Serve at room temperature."
    ]
  },

  "Epirus": {
    dish: "Baklava Ioanninon",
    description: "Ioannina's baklava is not like the baklava of the rest of Greece — and Ioannina will make sure you understand this. The city of Lake Pamvotis, deep in the mountains of Epirus, was for centuries a major center of the Romaniote (Greek) Jewish community and of Sephardic Jews expelled from Spain in 1492. The Jewish tradition of sweet-making — which specifically forbade the mixing of butter with meat at the same meal, encouraging the use of olive oil or nut oils — shaped Ioannina's baklava into something more delicate, more perfumed, and more restrained than its Constantinopolitan cousin. Where Istanbul's baklava is drenched in clarified butter and piled with crushed pistachios, Ioannina's is lighter: filled with a finely ground walnut mixture scented with cinnamon and cloves, and soaked after baking in a syrup perfumed with rose water and a strip of orange peel — not honey, not as thick. The result is gossamer and fragrant, the filo layers as light as ancient manuscript pages.",
    ingredients: [
      "16–18 sheets filo dough",
      "3/4 cup (170 g) unsalted butter, melted (or a mixture of butter and light olive oil)",
      "For the walnut filling: 3 cups (300 g) walnuts, toasted and finely ground (not a paste — they should have texture), 1/4 cup (50 g) granulated sugar, 1 1/2 tsp ground cinnamon, 1/4 tsp ground cloves, 1/4 tsp ground allspice",
      "For the rose water syrup: 1 1/2 cups (300 g) granulated sugar, 1 1/4 cups (300 ml) water, 1 tbsp rose water, Peel of 1/2 orange (in strips), 1 tsp lemon juice"
    ],
    steps: [
      "Make the syrup first (it must be completely cold): Combine the sugar, water, orange peel, and lemon juice in a saucepan. Bring to a boil, stir to dissolve sugar, simmer 5 minutes. Cool completely, then stir in the rose water. Refrigerate. (Pouring cold syrup on hot baklava is the key to crisp layers.)",
      "Make the filling: Combine the finely ground walnuts, sugar, cinnamon, cloves, and allspice. Toss to combine thoroughly.",
      "Preheat the oven to 350°F (175°C). Butter a 9x13-inch (23x33 cm) baking pan.",
      "Layer 8–9 sheets of filo in the pan, brushing each sheet generously with melted butter. Spread half the walnut filling evenly over the filo. Add 2 more sheets of filo, buttering each. Spread the remaining walnut filling. Top with the remaining filo sheets, buttering each one generously — the top should have at least 6–8 layers. Brush the top with the remaining butter.",
      "Using a very sharp knife, cut the baklava into diamond shapes all the way to the bottom of the pan — do not wait until after baking to cut or the filo will shatter. Traditional Ioannina-style cuts are smaller and more elongated than typical baklava.",
      "Bake for 35–40 minutes until deep golden-brown and crisp. Remove from the oven and immediately pour the cold syrup evenly over the entire hot baklava. Let the syrup absorb for at least 2 hours at room temperature before serving — the baklava must rest to absorb the syrup fully. Do not refrigerate."
    ]
  },

  "Ionian Islands": {
    dish: "Mandolato Zakynthinou",
    description: "The Mandolato of Zakynthos — the island the Venetians called Fior di Levante, Flower of the Orient — is the most noble nougat in Greece and one of the great confections of the Mediterranean. It has been made on Zakynthos since the Venetian period, when the island was a crossroads of sugar, almonds, and honey from across the Middle Sea. The mandolato is white: made from egg whites beaten to a gleaming meringue, then cooked with a honey-sugar syrup to a temperature that sets the mass into a firm, brilliant white confection studded with whole roasted almonds and scented with vanilla. It is set in rectangular molds and cut into bars. The texture is unlike any nougat made elsewhere: firm but yielding, with a chewiness that is more satin than rubber, and the roasted almond perfume that runs through every bite. On Zakynthos it is sold in every sweet shop year-round, given as gifts at Christmas and Easter wrapped in parchment tied with red ribbon, and eaten by visitors the moment the ferry arrives.",
    ingredients: [
      "1 1/2 cups (300 g) granulated sugar",
      "1 cup (340 g) thyme or wildflower honey",
      "1/2 cup (120 ml) water",
      "2 tablespoons glucose syrup or corn syrup",
      "3 large egg whites, at room temperature",
      "Pinch of cream of tartar",
      "1 1/2 cups (200 g) whole blanched almonds, toasted until golden",
      "1 tsp pure vanilla extract",
      "Rice paper or edible wafer paper (pain azyme) for lining",
      "Powdered sugar for dusting"
    ],
    steps: [
      "Toast the almonds in a 350°F (175°C) oven for 10–12 minutes until golden. Keep warm — the almonds should be warm when added.",
      "Line a 9x5-inch (23x13 cm) loaf pan with rice paper or wafer paper, extending it up the sides. Lightly oil any exposed surfaces.",
      "Cook the syrup: In a heavy-bottomed saucepan, combine the sugar, honey, water, and glucose. Cook over medium-high heat, without stirring, until the syrup reaches 305°F (152°C) — the hard-crack stage. Use a candy thermometer. This will take about 15–20 minutes.",
      "While the syrup is cooking, beat the egg whites with the cream of tartar in a stand mixer on medium-high speed until stiff, glossy peaks form. Do not overbeat.",
      "When the syrup reaches 305°F (152°C), remove from heat. Immediately turn the mixer on high and pour the hot syrup in a slow, steady stream down the side of the bowl (not directly onto the beaters). Continue beating on high for 8–10 minutes until the mixture is thick, glossy, white, and has cooled to about 160°F (71°C). The mandolato should hold its shape when dropped from a spoon.",
      "Working quickly, fold in the warm toasted almonds and vanilla with a wooden spoon. Pour the mixture into the prepared pan. Smooth the top firmly with a spatula. Place another sheet of rice paper over the top and press down firmly. Cool at room temperature for at least 3–4 hours until completely set. Unmold, dust with powdered sugar, and cut into bars with a sharp knife. Store in an airtight tin between layers of parchment."
    ]
  },

  "Western Greece": {
    dish: "Kataïfi Patraïki",
    description: "Kataïfi is the shredded-wheat pastry of the Greek and Ottoman sweet table — a nest of superfine, angel-hair-thin strands of pastry wrapped around a fragrant walnut and cinnamon filling, baked golden, and drenched in honey-lemon syrup. While kataïfi is made across all of Greece and the Levant, the Patrean version — from Patras, Achaia's port city and carnival capital on the Gulf of Corinth — is known for its particularly generous syrup and its filling enriched with orange zest from the citrus groves of the Peloponnesian coast, with a more complex, orange-forward fragrance than the plainer versions of the north. Patras is Greece's third-largest city and the gateway to Italy and Western Europe — a city of trade, carnival, and an easy cosmopolitan sophistication that shows in its kataïfi: more generous, more aromatic, more joyful than the austere mountain versions. Eaten at any sweet shop in Patras with a small glass of cold water and a cup of Greek coffee.",
    ingredients: [
      "1 lb (450 g) kataïfi pastry (shredded filo/wheat pastry strands — available frozen at Middle Eastern and Greek grocery stores), thawed",
      "1/2 cup (115 g) unsalted butter, melted",
      "For the walnut filling: 2 cups (200 g) walnuts, toasted and coarsely chopped, 1/3 cup (65 g) granulated sugar, 1 tsp ground cinnamon, Zest of 1 orange, 1/4 tsp ground cloves, 1 egg white (lightly beaten, to bind)",
      "For the syrup: 1 1/2 cups (300 g) granulated sugar, 1 cup (240 ml) water, 1/4 cup (85 g) honey, Juice and zest of 1 orange, 1 cinnamon stick"
    ],
    steps: [
      "Make the syrup first (it should be warm-to-room-temperature when poured, not cold): Combine all syrup ingredients in a saucepan. Bring to a boil, stir to dissolve sugar, then simmer 8 minutes. Remove the cinnamon stick. Set aside to cool slightly.",
      "Make the filling: Combine walnuts, sugar, cinnamon, orange zest, and cloves. Stir in just enough egg white to lightly bind the mixture.",
      "Preheat the oven to 375°F (190°C). Butter a 9x13-inch (23x33 cm) baking pan.",
      "Separate the kataïfi strands gently — they should be loose and fluffy, not clumped. Spread the melted butter over the strands and toss gently to coat throughout.",
      "Take a handful of buttered strands (about 1/4 cup). Spread into a small rectangle on the work surface. Place 1 heaping tablespoon of walnut filling along the short edge. Roll up tightly, pressing to compact the filling. Pinch the ends. Place seam-side down in the buttered pan. Repeat with remaining kataïfi and filling, packing the rolls tightly side by side in the pan.",
      "Drizzle any remaining butter over the tops. Bake for 30–35 minutes until golden-brown all over. Pour the warm (not cold, not hot — warm) syrup evenly over the just-baked kataïfi. Let absorb for at least 1 hour at room temperature before serving. Sprinkle with crushed walnuts and a little cinnamon."
    ]
  },

  "Central Greece": {
    dish: "Moustalevria",
    description: "Moustalevria is one of the oldest sweets in the world still made today — a jelly pudding made from grape must (mosto — the pressed, unfermented juice of wine grapes), thickened with flour or starch, poured into molds, and topped with sesame seeds, walnuts, and cinnamon. It appears in the writings of the ancient Greeks and Romans; Cato mentions it; Byzantine recipes describe it. Today it is made across Central Greece in September and October, during the vintage season, when the great wine-grape varieties of Viotia, Phthiotida, and Evrytania are pressed. The kitchen fills with the heady, sweet, almost alcoholic smell of fresh must as it cooks. The moustalevria sets to a deep purple-brown jelly, glossy and quivering, with a flavor that is intensely of the grape — sweet, slightly tannic, with fruit depths that wine cannot have because it hasn't yet fermented. Eaten cold, decorated with a cross-pattern of sesame and walnuts, it is the harvest itself, served on a plate: the beginning of wine, stopped just in time.",
    ingredients: [
      "4 cups (960 ml) fresh grape must (sifted unfermented grape juice — purchase from a winemaker, Greek market, or substitute 4 cups pomegranate juice + 2 tbsp red wine for a similar flavor profile)",
      "3/4 cup (90 g) all-purpose flour (or fine cornstarch for a clearer jelly)",
      "1/4 cup (30 g) fine semolina (optional, for additional body)",
      "Pinch of fine sea salt",
      "For topping: 1/4 cup (35 g) sesame seeds, toasted, 1/2 cup (60 g) walnuts, roughly chopped, Ground cinnamon for dusting"
    ],
    steps: [
      "If using grape must, strain it through a fine sieve to remove any grape skins or seeds. Pour into a wide saucepan.",
      "In a small bowl, whisk the flour (and semolina if using) with 1/2 cup (120 ml) of the cold must until completely smooth with no lumps. Set aside.",
      "Heat the remaining must in the saucepan over medium heat, stirring, until it comes to a simmer. Pour the flour-must slurry into the simmering must in a thin stream, whisking constantly. Add the salt. Cook over medium-low heat, stirring constantly with a wooden spoon, for 8–12 minutes until the mixture thickens to the consistency of a thick polenta — it should coat the spoon heavily and bubble slowly. If it thickens unevenly, whisk vigorously.",
      "Pour the hot moustalevria into individual small bowls or molds, or into a single shallow serving dish to a depth of 1–1.5 inches (3–4 cm). Smooth the surface.",
      "While still warm, sprinkle toasted sesame seeds, chopped walnuts, and a generous dusting of cinnamon over the surface in a decorative pattern — traditionally arranged in crosses or geometric designs.",
      "Cool at room temperature until set (about 1 hour), then refrigerate until cold and firm. Serve cold, in the molds or unmolded onto plates. It keeps refrigerated for 3–4 days."
    ]
  },

  "Peloponnese": {
    dish: "Diples Peloponnesou",
    description: "The Diples — from diploo, 'to fold' — are the ancient fried honey pastry of the Peloponnese, made at every celebration since ancient times: weddings, baptisms, the carnival season of Apokries. The most famous diples come from the Mani peninsula, the wild, stone-tower land at the southernmost tip of mainland Europe, and from Kalamata and the Laconian coast. The technique is theatrical: thin pasta-like dough is rolled as thin as possible, cut into ribbons, and then each ribbon is fried in hot oil while a skilled pair of tongs gathers it into a spiral as it cooks — the oil frying and setting the multiple layers of pastry into a lacy, blistered, irregular rose. Each diple is then immediately drenched in warm thyme honey straight from the hive of the Peloponnesian mountains, dusted with finely ground walnuts and cinnamon. Warm, crackling, honey-drenched, perfumed with the thyme that gives Peloponnesian honey its distinctive resinous character — diples are a dessert that takes skill and confidence to make, and the taste of watching someone make them perfectly is itself a pleasure.",
    ingredients: [
      "For the dough: 3 cups (375 g) all-purpose flour, plus more for dusting, 1 tsp baking powder, Pinch of fine sea salt, 2 large eggs, 1/2 cup (120 ml) fresh orange juice, 2 tsp ouzo or cognac, 1 tsp vanilla extract",
      "Neutral oil or olive oil for deep-frying (at least 4 cups / 960 ml)",
      "For serving: 1 cup (340 g) Peloponnesian thyme honey (or any strong, aromatic honey), warmed until fluid, 1 cup (120 g) walnuts, finely chopped, Ground cinnamon"
    ],
    steps: [
      "Make the dough: Whisk together the flour, baking powder, and salt. Make a well in the center. Beat the eggs with the orange juice, ouzo, and vanilla; pour into the well. Mix, then knead on a floured surface for 8–10 minutes until very smooth, silky, and elastic — like fresh pasta dough. The dough must be very pliable to roll thin. Wrap and rest 30–45 minutes.",
      "Divide the dough into 4 pieces. Working with one piece at a time (keep others covered), roll out as thin as possible on a floured surface — you should be able to see your hand through it. Cut into ribbons about 2 inches (5 cm) wide and 12 inches (30 cm) long.",
      "Heat 3 inches (8 cm) of oil in a wide pot to 350°F (175°C). Have a pair of long tongs and a slotted spoon ready.",
      "Slide one ribbon of dough into the oil. Immediately use the tongs to begin gathering and folding the ribbon over itself as it cooks and puffs — work quickly to create a layered rose or spiral shape. Fry 2–3 minutes total, turning, until the diple is golden and crisp on all sides. Remove with the slotted spoon and drain briefly on paper towels.",
      "While still very hot, transfer the diple to a serving platter and immediately pour warm honey over it — use at least 1–2 tablespoons per diple, so it soaks in and drips around. Sprinkle with finely chopped walnuts and a heavy dusting of cinnamon.",
      "Serve immediately. Diples must be eaten freshly fried and freshly honeyed — they lose their crispness within 20–30 minutes."
    ]
  },

  "Attica": {
    dish: "Loukoumades Athinaioi",
    description: "The Loukoumades may be the oldest dessert recipe still made on earth — fried dough balls drenched in honey were described in ancient Greek texts and served to the winners of the Olympic Games at Olympia, who received them as prizes of honor. Two and a half thousand years later, Athenians still eat them from the same tradition, slightly evolved: small, light, yeast-raised dough dropped from a spoon into deep hot oil where they puff into irregular spheres, golden and hollow, then pulled from the oil and immediately submerged in warm thyme honey, sprinkled with cinnamon and crushed walnuts. The great loukoumades shops of Athens — in the Monastiraki flea market, in the Omonia quarter — have been operating for generations. The best ones use a specific metal spoon with a ring to drop exactly the right size of dough into the exact center of the oil. They float and roll as they fry, puffing golden all over. Eaten standing at the counter, the honey running down your hands, with a plastic cup of cold water, at any hour of the day or night — this is Athens.",
    ingredients: [
      "For the dough: 2 1/4 tsp (7 g) instant yeast, 1 1/4 cups (300 ml) warm water, 1 1/2 cups (190 g) all-purpose flour, 1/2 tsp fine sea salt, 1 tsp granulated sugar, 1 tbsp olive oil",
      "Neutral oil for deep-frying (about 4 cups / 960 ml)",
      "For serving: 1/2 cup (170 g) thyme honey or good Greek wildflower honey, warmed until fluid, 1/2 cup (60 g) walnuts, finely chopped, 1 tsp ground cinnamon",
      "Optional toppings: sesame seeds, crushed pistachios, tahini drizzle"
    ],
    steps: [
      "Make the batter: Dissolve the yeast and sugar in the warm water. Let stand 10 minutes until foamy. Combine the flour and salt in a large bowl. Pour in the yeast mixture and olive oil. Whisk vigorously until a smooth, thick, elastic batter forms — it should be thicker than pancake batter but still quite wet and pourable. Cover the bowl with plastic wrap and rise in a warm place for 1–1.5 hours until the batter is doubled, very bubbly, and smells yeasty and slightly sour.",
      "Heat 3 inches (8 cm) of neutral oil in a wide, deep pot to 350°F (175°C). Set up a bowl of warm water nearby (for dipping the spoon).",
      "Using a small ice cream scoop or two wet spoons, scoop walnut-sized portions of the batter and carefully lower them into the hot oil. Fry in batches of 6–8 without crowding. The loukoumades will puff and roll in the oil — use a slotted spoon to turn them gently and ensure even browning all over, about 3–4 minutes total per batch.",
      "Remove when deep golden-amber all over and drain briefly on paper towels — no more than 30 seconds. Transfer immediately to a wide bowl or platter.",
      "Pour the warm honey over the hot loukoumades generously — they should be glistening and coated. Sprinkle with chopped walnuts and cinnamon. Serve immediately and eat at once, while the honey is still warm and the loukoumades are hot and light."
    ]
  },

  "North Aegean": {
    dish: "Glykó Masticha Chiou",
    description: "The island of Chios is the only place on earth where the Pistacia lentiscus tree produces masticha — the crystalline, resin 'tears' that fall from cuts in the bark and harden in the sun into translucent drops of extraordinary fragrance. Chios has a monopoly on masticha that has been unbroken since the Byzantine Empire, when the Genoese lords of the island controlled its trade to the Ottoman court, to the pharaohs, to medieval European apothecaries. Masticha smells of pine, cedar, vanilla, and the Aegean — clean, resinous, complex. On Chios, it flavors everything: liqueurs, chewing gum, bread, and above all the Glykó Masticha — the mastic spoon sweet. A spoon sweet (glykó tou koutaliou) is the Greek tradition of preserving fruit, vegetables, or aromatics in heavy sugar syrup until they become translucent jewels offered on a spoon to guests with cold water and coffee. The mastic spoon sweet is the most prized: small, amber-colored mastic crystals dissolved in sugar syrup with rose water, thickened to the consistency of soft caramel, and served as a pale, gleaming, uniquely perfumed sweet on the silver spoon.",
    ingredients: [
      "1/2 cup (70 g) Chios masticha tears (buy whole mastic resin from a Greek specialty store — do not substitute)",
      "2 cups (400 g) granulated sugar",
      "1 cup (240 ml) water",
      "1 tbsp fresh lemon juice",
      "1 tbsp rose water",
      "Pinch of fine sea salt",
      "A small bowl of powdered sugar, for coating if desired"
    ],
    steps: [
      "The day before (optional but recommended): Spread the mastic tears on a plate and freeze for 1 hour. Transfer to a food processor or a clean cloth and pound with a mallet. Add a pinch of fine sea salt (which prevents the mastic from clumping) and grind to a coarse powder. Store in a cool place overnight — the grinding and resting allows it to release its full aroma.",
      "Make the syrup: Combine the sugar and water in a heavy saucepan. Heat over medium, stirring, until the sugar dissolves. Add the lemon juice and bring to a boil. Cook without stirring for 5 minutes.",
      "Add the ground mastic to the hot syrup slowly, whisking constantly — the mastic will dissolve unevenly at first. Continue cooking over medium-low heat, stirring, for 10–15 minutes until the mastic is completely dissolved and the syrup has thickened to a translucent, viscous consistency that falls slowly from the spoon. It should be the texture of warm honey.",
      "Remove from heat. Stir in the rose water. The syrup will be pale amber and extraordinarily aromatic. Cool completely.",
      "To serve as a spoon sweet in the Greek tradition: Spoon a generous teaspoon into small dishes. Accompany with cold water and unsweetened Greek coffee. Alternatively, pour into sterilized jars while hot and seal — it keeps for months at room temperature.",
      "The glykó masticha can also be eaten rolled into small balls: let it cool until thick enough to handle, roll small portions in powdered sugar, and arrange in paper cups as confections."
    ]
  },

  "South Aegean": {
    dish: "Melekouni Rhoditiko",
    description: "The Melekouni is the wedding sweet of Rhodes — a sesame-honey-almond bar so ancient that it was offered to the gods of Olympus in the Rhodian tradition of antiquity, mentioned in the writings of Pindar and Apollonius. The name comes from the ancient Greek meli (honey) and kouki (sesame seed). It is essentially a sesame brittle of extraordinary simplicity: whole sesame seeds, toasted until golden, combined with honey cooked to a high temperature and poured over whole toasted almonds, then spread thin and cut into diamonds. But what distinguishes Rhodian melekouni from generic sesame candy is the quality of its ingredients: sesame from the Rhodes plain, honey from the thyme-and-sage-covered hillsides of Rhodes' interior, and the specific technique of cooling the mixture on marble until it achieves the perfect texture — crunchy but not hard, nutty but not greasy. Every Rhodian wedding table carries a tray of melekouni. Every Rhodian knows exactly where the best melekouni in their village comes from. It is the taste of the sun-baked south Aegean and of celebrations stretching back three thousand years.",
    ingredients: [
      "2 cups (280 g) sesame seeds (white, unhulled)",
      "1/2 cup (75 g) whole blanched almonds",
      "3/4 cup (255 g) Greek thyme honey (or any good-quality amber honey)",
      "1/3 cup (65 g) granulated sugar",
      "2 tbsp water",
      "1/2 tsp ground cinnamon",
      "1/4 tsp ground cloves",
      "Zest of 1/2 orange",
      "Olive oil for the marble or parchment"
    ],
    steps: [
      "Toast the sesame seeds in a dry skillet over medium heat, stirring constantly, for 4–6 minutes until golden — watch carefully, they go from golden to burned quickly. Transfer to a bowl. Toast the almonds in the same skillet for 3–4 minutes until golden. Add to the sesame seeds. Stir in the cinnamon, cloves, and orange zest.",
      "Oil a marble slab or a large baking sheet very lightly with olive oil. Have an oiled rolling pin or flat spatula ready.",
      "In a heavy saucepan, combine the honey, sugar, and water. Cook over medium-high heat without stirring until the mixture reaches 300°F (150°C) — the hard-crack stage. Use a candy thermometer. At this temperature a small drop of syrup in cold water will form brittle threads.",
      "Remove from heat immediately. Quickly pour the toasted sesame-almond mixture into the hot syrup. Stir with a wooden spoon very swiftly to combine completely — work fast, the mixture sets quickly.",
      "Pour the mixture immediately onto the oiled marble or baking sheet. Using the oiled rolling pin or spatula, quickly spread it to an even thickness of 1/3 to 1/2 inch (8–12 mm) before it sets. Work quickly with confidence.",
      "Let cool for 5 minutes until set hard but still slightly warm. Cut into diamond shapes with an oiled sharp knife — press firmly and decisively. Let cool completely until brittle. Store in an airtight tin between layers of parchment at room temperature for up to 3 weeks."
    ]
  },

  "Crete": {
    dish: "Xerotigana Kritis",
    description: "The Xerotigana are Crete's most festive sweet — fried spiral pastries of extraordinary beauty, made at baptisms, weddings, and the great Cretan festivals, piled high on large trays and doused in Cretan honey from the thyme-fragrant mountains of the White Mountains (Lefka Ori) and Mount Ida, then scattered with sesame and chopped walnuts. The dough is made simply from flour, ouzo (or raki — Crete's own firewater), eggs, and orange juice, and worked until very elastic. Ribbons of this dough are held by one end and draped into hot olive oil while a pair of tongs spins and gathers the ribbon into a tight spiral or open flower, cooking and setting as it fries. The result is an irregular, lacey, blistered construction of blistered, crisp pastry that is simultaneously beautiful and rough, refined and honest — exactly like Crete. The honey drizzled over them is thick, dark, intensely aromatic. The sesame seeds add crunch. The walnuts add richness. The moment of pouring the honey over the hot xerotigana, watching it run through the spiral layers, is one of those small Cretan kitchen ceremonies that makes the whole Mediterranean feel present.",
    ingredients: [
      "For the dough: 3 cups (375 g) all-purpose flour, 2 large eggs, 1/2 cup (120 ml) fresh orange juice, 2 tbsp ouzo or Cretan tsikoudia/raki (or use white wine), 1 tbsp olive oil, 1/2 tsp fine sea salt, 1/2 tsp baking powder",
      "Extra-virgin olive oil for deep frying (traditional) or neutral oil",
      "For serving: 1/2 cup (170 g) Cretan thyme honey or strong Greek honey, warmed until fluid, 1/4 cup (35 g) sesame seeds, toasted, 1/2 cup (60 g) walnuts, finely chopped, Ground cinnamon"
    ],
    steps: [
      "Make the dough: In a large bowl, combine the flour, baking powder, and salt. Make a well; add the eggs, orange juice, ouzo, and olive oil. Mix from the center outward, then knead on a floured surface for 10–12 minutes until the dough is very smooth, silky, and extremely elastic — it should stretch like pasta dough without tearing. Wrap in plastic and rest 45 minutes.",
      "Heat at least 3 inches (8 cm) of olive oil (or neutral oil) in a wide, deep pot to 350°F (175°C). Have long tongs ready.",
      "Divide the dough into 4 pieces. Working with one piece at a time, roll out to very thin ribbons — about 2 inches (5 cm) wide and as long as possible. You can use a pasta machine on the thinnest setting, or roll by hand.",
      "Hold the ribbon at one end and lower it into the hot oil. Using tongs, immediately begin gathering and rolling the ribbon over itself as it fries, creating a tight coil or flower shape. Work with speed and confidence — the dough sets quickly once it hits the hot oil. Fry 3–4 minutes total until deep golden-brown all over. Remove with tongs or a slotted spoon and drain on paper towels.",
      "Arrange the xerotigana on a large platter or tray. Immediately pour the warm honey generously over all of them — be lavish; each xerotigana should be glistening and drenched.",
      "Scatter sesame seeds, chopped walnuts, and cinnamon over the honeyed xerotigana. Serve immediately while still warm and crackling. Eat with your fingers, accepting the honey that will run down your hands as an unavoidable and entirely acceptable part of the experience."
    ]
  }
};

// Apply desserts to GRC regions
Object.keys(greeceDesserts).forEach(regionName => {
  if (data['GRC'].regions[regionName]) {
    data['GRC'].regions[regionName].dessert = greeceDesserts[regionName];
    console.log('✓ Added dessert for GRC/' + regionName + ': ' + greeceDesserts[regionName].dish);
  } else {
    console.log('✗ Region not found: ' + regionName);
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n✅ Greece desserts written successfully!');
