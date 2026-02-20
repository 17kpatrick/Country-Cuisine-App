const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/recipes.json');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);

const italyDesserts = {
  "Piemonte": {
    dish: "Bunet Piemontese",
    description: "The Bunet is Piedmont's most beloved chocolate dessert — a molded flan-custard that is both ancient and wholly of its place. The name in Piedmontese dialect means 'hat' (as in bonnet), a reference to the rounded dome of the copper mold in which it was traditionally unmolded. It is the color of dark earth: a rich chocolate-espresso-caramel custard held together by eggs and enriched with crushed amaretti di Saronno (the bitter almond cookies from the Piedmontese tradition), whose almond bitterness and crunch are the dessert's defining character. The custard is ringed by a dark bittersweet caramel, made in the traditional Italian way — darker than French caramel, with a hint of molten toffee and not a whisper of sweetness at the edge of bitterness. The bunet trembles on the plate, the caramel running in rivulets around the base. It is served at every family Sunday lunch in Piedmont, from the Monferrato wine hills to the Turin suburbs, and it is what truffles and Barolo smell like translated into dessert.",
    ingredients: [
      "For the caramel: 1/2 cup (100 g) granulated sugar, 2 tbsp water",
      "For the custard: 2 cups (480 ml) whole milk, 1/2 cup (120 ml) heavy cream, 4 large eggs, 2 egg yolks, 3/4 cup (150 g) granulated sugar, 3 oz (85 g) dark chocolate (60–70% cacao), melted and slightly cooled, 1/4 cup (25 g) unsweetened cocoa powder, 1 shot (30 ml) freshly brewed espresso, 1 tbsp dark rum, 1/2 tsp pure vanilla extract, 10–12 amaretti secchi (crisp amaretti biscuits), roughly crushed",
      "Pinch of fine sea salt"
    ],
    steps: [
      "Make the caramel: Cook the sugar and water in a small saucepan over medium heat without stirring until a deep amber caramel forms — darker than you think is right, almost the color of dark mahogany. Pour immediately into a 6-cup (1.5-liter) charlotte mold or Bundt mold, swirling quickly to coat the bottom and partway up the sides. Let cool and harden.",
      "Preheat the oven to 325°F (165°C). Prepare a large roasting pan for a water bath.",
      "Heat the milk and cream together until just steaming. In a large bowl, whisk the eggs, egg yolks, and sugar until smooth. Whisk in the melted chocolate, cocoa powder, espresso, rum, vanilla, and salt. Gradually pour the hot milk-cream into the egg mixture, whisking constantly.",
      "Scatter the crushed amaretti over the hardened caramel in the mold. Strain the chocolate custard through a fine sieve directly over the amaretti (the straining is important for a smooth texture).",
      "Place the mold in the roasting pan. Add enough hot water to come halfway up the sides of the mold. Bake for 50–65 minutes until the custard is set at the edges but still jiggles like gelatin in the center — it will firm up when chilled.",
      "Remove from the water bath and cool completely to room temperature, then refrigerate overnight. To unmold: run a thin knife around the edges, place a deep-rimmed plate over the mold, and invert confidently. The caramel will run freely. Serve chilled."
    ]
  },

  "Valle d'Aosta": {
    dish: "Tegole Valdostane",
    description: "The Tegole — 'roof tiles' in the Valle d'Aosta dialect — are among the most delicate and beautiful cookies in all of Italy. Tissue-thin, translucent at the edges, golden-amber with toasted hazelnuts and almonds visible through the wafer-like batter, they are baked flat and then immediately draped over a rolling pin while still hot, setting as they cool into the gentle curve of a terracotta roof tile. The batter is minimal: ground hazelnuts from the Colle di Joux, ground almonds, egg whites, sugar, and just enough flour to hold everything together — no butter, no fat beyond the nuts' natural oil. The result is a cookie of extraordinary fragility and extraordinary flavor: hazelnut-toasty, slightly sweet, with a crunch that dissolves immediately into a lingering roasted-nut perfume. In the Valle d'Aosta they are served with strong coffee or a small glass of génépy (the alpine herb liqueur), as a delicate conclusion to a mountain meal that began with fonduta and continued with chamois stew. They are sold wrapped in tissue paper in the mountain towns of the valley.",
    ingredients: [
      "1/2 cup (50 g) blanched hazelnuts",
      "1/2 cup (50 g) blanched almonds",
      "3/4 cup (90 g) powdered sugar, sifted",
      "3 egg whites (room temperature)",
      "2 tbsp all-purpose flour",
      "1/2 tsp pure vanilla extract",
      "Pinch of fine sea salt"
    ],
    steps: [
      "Toast the hazelnuts and almonds separately in a dry skillet or in a 350°F (175°C) oven until golden and fragrant, about 8–10 minutes. Cool completely. Rub the hazelnuts in a towel to remove as much skin as possible. In a food processor, grind the hazelnuts and almonds together to a fine powder — not a paste; stop before the oil releases.",
      "Preheat the oven to 375°F (190°C). Line baking sheets with parchment paper. Prepare a rolling pin for shaping (rest it on two bowls to keep it elevated).",
      "In a bowl, whisk the egg whites until very lightly foamy — not beaten, just broken up. Stir in the powdered sugar until smooth. Add the ground nut mixture, flour, vanilla, and salt. Stir to a smooth, thin batter.",
      "Drop teaspoons of batter onto the prepared baking sheets, spacing them at least 3 inches (8 cm) apart. Spread each dollop into a very thin round of about 2.5 inches (6 cm) in diameter using the back of the spoon or an offset spatula. The batter should be very thin — almost translucent.",
      "Bake for 6–8 minutes until the cookies are golden-amber all over — they should be evenly colored, not pale in the center. Watch carefully after 5 minutes; they go from perfect to burned quickly.",
      "Remove from the oven. Working immediately and very quickly (you have 15–20 seconds per cookie before they harden), lift each cookie from the parchment with a thin spatula and drape it over the rolling pin. Press gently to curve. They will harden into tile shapes in 30 seconds. Cool completely. Store in a single layer in an airtight tin. They are extremely fragile — handle with care."
    ]
  },

  "Lombardia": {
    dish: "Sbrisolona Mantovana",
    description: "The Sbrisolona (from sbrisar, 'to crumble' in the Mantuan dialect) is a cake that defies its own category — it is simultaneously too dry for a cake, too thick for a cookie, and too coarse for a tart. It is itself, entirely. Made in Mantua since at least the 17th century, when Gonzaga court documents record it as a 'torta di farina gialla' made with cornmeal and lard, it has the texture of a giant crumbly shortbread: coarse, granular, shattering when you try to slice it — which is why, traditionally, it is never sliced. A sbrisolona is broken: you press your thumbs into it at the table, and the rough shards fly. Each shard is dense with roughly ground almonds and hazelnuts, sweetened with sugar, rich with the rendered sweetness of lard (or butter in modern versions), perfumed with vanilla and lemon, and studded with whole almonds pressed into the top. Eaten in Mantua with a small glass of Lambrusco or passito, it is rustic aristocracy — the noble Gonzaga court and the peasant kitchen, reconciled in crumble.",
    ingredients: [
      "1 cup (125 g) all-purpose flour",
      "3/4 cup (90 g) fine yellow cornmeal (polenta flour or finely ground cornmeal)",
      "3/4 cup (75 g) whole blanched almonds, roughly chopped (not ground)",
      "1/2 cup (50 g) ground almonds or almond flour",
      "3/4 cup (150 g) granulated sugar",
      "2/3 cup (150 g) cold unsalted butter, cubed (or use half butter, half lard for tradition)",
      "2 egg yolks",
      "Zest of 1 lemon, finely grated",
      "1 tsp pure vanilla extract",
      "Pinch of fine sea salt",
      "Additional whole blanched almonds for pressing into the top (about 20)",
      "Powdered sugar for dusting"
    ],
    steps: [
      "Preheat the oven to 350°F (175°C). Butter a 10-inch (25 cm) round cake pan or tart pan with a removable bottom.",
      "In a large bowl, combine the flour, cornmeal, chopped almonds, ground almonds, sugar, lemon zest, vanilla, and salt. Add the cold cubed butter. Working quickly with your fingertips, rub the butter into the dry ingredients until the mixture resembles very coarse crumbs — larger than typical shortbread crumbs, with some pieces the size of peas. Do not overwork; the mixture should be crumbly and not cohesive.",
      "Add the egg yolks and toss with a fork just until the mixture forms large, moist crumbs. Do not press into a dough — it should fall apart when squeezed, not hold together smoothly.",
      "Pour the crumble mixture into the prepared pan. Using your fingertips, very gently press it down to an even thickness — do not compact it firmly. The surface should remain rough and uneven. Press the whole almonds into the surface in a pattern.",
      "Bake for 35–40 minutes until the sbrisolona is a deep golden-amber color all over. It will look and smell toasted. Cool completely in the pan — it is far too fragile to move when warm.",
      "Do not slice. Present whole at the table and break with your thumbs or a blunt knife handle, shattering it into irregular shards. Dust with powdered sugar. Serve with a small glass of passito wine or grappa."
    ]
  },

  "Trentino-Alto Adige": {
    dish: "Strudel di Mele Tirolese",
    description: "In Trentino-Alto Adige — where Italian and Austrian cultures have coexisted for centuries in the valleys of the Dolomites — the strudel is not a foreign import but a native child. This is the apple strudel of the Tyrol, and it differs from its Viennese cousin in its earthiness: the pastry is a simple, stretchable dough pulled thin by hand until a newspaper can be read through it (the traditional test), filled with peeled apples sliced thin, pine nuts, raisins soaked in grappa, breadcrumbs toasted golden in butter, cinnamon, lemon zest, and a sprinkle of sugar. No filo — the hand-stretched dough is thicker, more elastic, a little rustic. It is rolled into a log that tapers at both ends and baked until the pastry is golden and blistered. The kitchen fills with the smell of cinnamon, apple, and browned butter. Served warm, dusted with powdered sugar, in the rifugi (mountain huts) of the Dolomites after a day of hiking, with a glass of the local Müller-Thurgau or a cup of strong coffee, the Tiroler Apfelstrudel is mountain warmth made edible.",
    ingredients: [
      "For the strudel dough: 1 1/2 cups (190 g) all-purpose flour, 1/2 tsp fine sea salt, 1/2 cup (120 ml) warm water, 2 tbsp neutral oil, 1 tsp white wine vinegar (helps elasticity)",
      "For the apple filling: 2.5 lbs (1.1 kg) firm tart apples (Granny Smith or local Renette), peeled, cored, thinly sliced, 1/2 cup (80 g) golden raisins soaked in 2 tbsp grappa or rum for 30 minutes, 1/3 cup (40 g) pine nuts, 3/4 cup (150 g) granulated sugar, 1 tsp ground cinnamon, Zest of 1 lemon, 3 tbsp breadcrumbs toasted golden in 2 tbsp butter",
      "5 tbsp (70 g) unsalted butter, melted",
      "Powdered sugar for serving"
    ],
    steps: [
      "Make the dough: Combine the flour and salt in a bowl. Add the warm water, oil, and vinegar. Mix and knead on a clean surface for 10 minutes until the dough is very smooth, warm, and elastic — it should stretch without tearing when pulled gently. Shape into a ball, brush with a little oil, wrap in plastic, and rest at room temperature for 30 minutes (no less — the rest is essential for stretching).",
      "Prepare the filling: Combine the sliced apples, drained raisins, pine nuts, sugar, cinnamon, and lemon zest in a bowl. Toss gently.",
      "Preheat the oven to 375°F (190°C). Cover a large table or work surface with a clean tablecloth and flour it lightly. Roll the dough to a rough rectangle, then — working with the backs of your hands (not fingertips, which tear) — stretch the dough from the center outward, moving around the dough, until it is large enough to see faint light through it (about 24x18 inches / 60x45 cm). Some small tears are acceptable.",
      "Brush the stretched dough all over with some of the melted butter. Scatter the toasted breadcrumbs over two-thirds of the dough (leaving a 2-inch / 5 cm border on all edges). Spread the apple filling evenly over the breadcrumbs. Fold the edges in, then roll the strudel using the tablecloth to help, into a tight log. Seal the ends by pressing and folding.",
      "Transfer to a parchment-lined baking sheet. Brush generously with melted butter. Bake for 35–45 minutes, brushing with butter twice more during baking, until deep golden and crisp. Cool slightly. Dust generously with powdered sugar and serve warm in slices."
    ]
  },

  "Veneto": {
    dish: "Tiramisù Originale di Treviso",
    description: "The tiramisù was invented in Treviso in the 1960s at the restaurant Le Beccherie, by pastry chef Loli Linguanotto and the Campeol family, and the world has been debating the recipe ever since. The original has no cream — only zabaglione-enriched mascarpone, whipped egg whites for lightness, and Savoiardi (lady fingers) soaked in strong espresso and marsala. Everything that comes later — whipped cream, alcohol variations, chocolate shavings — is an elaboration on the perfect original. The name means 'pick me up' (tirami sù) — a reference to the espresso and the egg-and-sugar lift. The tiramisù is an assembly of contrasts: cold and warm, bitter (coffee, cocoa) and sweet (mascarpone, sugar), soft (the cream) and yielding (the soaked biscuit). When made correctly, with the best mascarpone from Lodi, the best Savoiardi from Chioggia, freshly pulled espresso, and good Marsala, it is the single most satisfying dessert in Italy — and Italy does not make this claim lightly.",
    ingredients: [
      "6 large eggs, separated, at room temperature",
      "3/4 cup (150 g) granulated sugar, divided",
      "1 lb (450 g) high-quality mascarpone cheese, at room temperature",
      "1/4 cup (60 ml) dry Marsala wine (or 2 tbsp rum/dark rum as alternative)",
      "Pinch of fine sea salt",
      "24–28 Savoiardi (Italian ladyfinger biscuits — use the crisp dry ones, not soft)",
      "1 1/2 cups (360 ml) freshly brewed espresso or very strong coffee, cooled to room temperature",
      "2 tbsp Marsala or rum (to add to the coffee for soaking)",
      "Unsweetened cocoa powder for dusting — the good Dutch-process kind"
    ],
    steps: [
      "Beat the egg yolks with half the sugar (6 tbsp / 75 g) in a large bowl until very pale, thick, and creamy — at least 5 minutes. This creates a light zabaglione base. Beat in the Marsala. Add the mascarpone and mix gently with a spatula until just smooth and uniform — do not over-beat or the mascarpone will become grainy.",
      "In a completely clean, grease-free bowl, beat the egg whites with the salt on medium speed until foamy. Gradually add the remaining half of the sugar and beat to firm, glossy peaks — they should hold their shape without drooping.",
      "Fold the beaten egg whites into the mascarpone mixture in three additions, using a large rubber spatula and gentle, sweeping motions from the bottom up. Fold until just combined — a few white streaks are fine. The mixture should be light and voluminous.",
      "Combine the cooled espresso with the Marsala in a wide, shallow bowl. Working quickly, dip each Savoiardi — one at a time — briefly into the espresso mixture: 1 second per side for very crisp biscuits. They should absorb liquid but not become fully soaked or they will turn to mush.",
      "Arrange a single layer of dipped Savoiardi in the bottom of a 9x13-inch (23x33 cm) rectangular dish (or individual glasses). Spread half the mascarpone cream over the biscuits in an even layer. Add another layer of soaked biscuits, then the remaining cream. Smooth the top. Dust heavily with sifted cocoa powder.",
      "Refrigerate at least 4 hours and ideally overnight — the flavors meld and the texture sets to something perfect. Dust with more cocoa powder just before serving. Cut into generous squares."
    ]
  },

  "Friuli-Venezia Giulia": {
    dish: "Gubana Friulana",
    description: "The Gubana is the great festive sweet of the Natisone Valley in the Italian Friuli — a spiral pastry of extraordinary complexity and ancient heritage, brought to the table at Easter and Christmas and at any celebration that deserves something magnificent. The dough is an enriched yeasted pastry, tender and golden; the filling is a dense, fragrant mixture of walnuts, hazelnuts, pine nuts, raisins soaked in grappa, candied citron, dark chocolate, honey, cinnamon, cloves, and nutmeg — a filling so rich and aromatic it fills the kitchen with the smell of a 16th-century Venetian spice merchant's shop. The filled dough is rolled into a log, then coiled into a tight snail-spiral, and baked until golden-brown. Sliced, it reveals a swirling, jeweled cross-section of dark filling and pale dough. The tradition of serving gubana with a small glass of grappa — poured over a slice of it, or sipped alongside — is absolute and not negotiable in the Natisone Valley. Pope John Paul II ate it on his 1992 visit to the region.",
    ingredients: [
      "For the dough: 2 1/4 tsp (7 g) instant yeast, 1/3 cup (80 ml) warm milk, 2 1/4 cups (280 g) all-purpose flour, 1/3 cup (65 g) granulated sugar, 2 eggs, 1/4 cup (55 g) unsalted butter, softened, 1/2 tsp vanilla, 1/4 tsp salt",
      "For the filling: 1 cup (100 g) walnuts, toasted and roughly chopped, 1/2 cup (50 g) hazelnuts, toasted and roughly chopped, 1/4 cup (35 g) pine nuts, 1/2 cup (80 g) raisins soaked in 3 tbsp grappa for 1 hour, 2 tbsp candied citron or orange peel, finely chopped, 1 oz (30 g) dark chocolate, finely grated or chopped, 2 tbsp honey, 1/2 tsp ground cinnamon, 1/4 tsp ground cloves, 1/4 tsp freshly grated nutmeg, Zest of 1/2 lemon, 1 egg white (to bind the filling)",
      "1 egg yolk beaten with 1 tbsp cream for glaze"
    ],
    steps: [
      "Make the dough: Dissolve the yeast in the warm milk with a pinch of sugar; let stand 10 minutes. In a stand mixer, combine flour, sugar, and salt. Add the eggs, yeast mixture, and vanilla. Knead 5 minutes, then add the softened butter piece by piece, beating well after each addition. Knead 8 more minutes until smooth and elastic. Cover and rise at room temperature for 1.5–2 hours until doubled.",
      "Make the filling: Combine the walnuts, hazelnuts, pine nuts, drained raisins (save the grappa), candied peel, grated chocolate, honey, cinnamon, cloves, nutmeg, and lemon zest in a bowl. Add the egg white and mix to bind. The filling should be dense and fragrant. Taste and add a few drops of saved grappa if desired.",
      "On a lightly floured surface, roll the dough into a large rectangle, about 14x10 inches (35x25 cm) and 4mm thick. Spread the filling evenly over the surface, leaving a 1-inch (2.5 cm) border on the long sides. Roll up tightly from a long side, stretching the roll gently as you go to create tension.",
      "Coil the roll into a tight spiral on a parchment-lined baking sheet, tucking the end under. Cover and rise 45 minutes until visibly puffed. Preheat the oven to 350°F (175°C).",
      "Brush the gubana with the egg yolk glaze. Bake for 35–40 minutes until deep golden-brown. If the top browns too fast, tent with foil for the last 10 minutes. Cool on a rack. Serve at room temperature, sliced in thick spirals, with a small pour of grappa alongside or over the slice."
    ]
  },

  "Liguria": {
    dish: "Canestrelli di Torriglia",
    description: "The Canestrelli of Torriglia are the most refined and delicate cookies of Liguria — paper-thin, butter-white, dusted until invisible beneath a blizzard of powdered sugar, they crumble at the first breath and dissolve on the tongue into a long note of butter, vanilla, and lemon. They are made in the mountain village of Torriglia in the Ligurian Apennines above Genoa, and the recipe is guarded with the pride of a small town that knows it has something extraordinary. The secret lies in what's not there: no eggs. The dough is just flour, butter, sugar, lemon zest, and vanilla — and because it contains no structural protein from eggs, it bakes into a textured, impossibly short cookie that exists on the threshold between solid and air. The characteristic shape is a round with a hole in the center (like a small ring) made with a special canestrello cutter with a fluted edge. In Genoa they are sold in wooden boxes at pasticcerie throughout the year, but especially at Christmas, stacked high and covered in powdered sugar that clouds the air when you open the box.",
    ingredients: [
      "2 cups (250 g) all-purpose flour",
      "1/2 cup (60 g) cornstarch (Maïzena)",
      "3/4 cup (90 g) powdered sugar, sifted (plus more for dusting — a lot more)",
      "3/4 cup (170 g) cold unsalted butter, cubed",
      "Zest of 1 lemon, finely grated",
      "1 tsp pure vanilla extract",
      "Pinch of fine sea salt"
    ],
    steps: [
      "In a large bowl, combine the flour, cornstarch, powdered sugar, lemon zest, and salt. Add the cold cubed butter and rub into the flour mixture quickly with your fingertips until the mixture resembles fine, slightly damp breadcrumbs — smaller pieces than shortbread crumble. Add the vanilla extract. Gently press and squeeze the mixture until it just comes together into a cohesive dough, working as little as possible — it will be quite crumbly.",
      "Flatten the dough gently into a disk, wrap in plastic, and refrigerate for 1 hour. Do not skip the chilling — it is what keeps the cookies white and prevents spreading.",
      "Preheat the oven to 325°F (165°C). Line baking sheets with parchment paper.",
      "On a lightly floured surface (or between two sheets of parchment), roll the dough very gently to 5mm (just under 1/4 inch) thickness. The dough is fragile — work quickly and handle as little as possible. Cut with a fluted round cutter and use a small round cutter or the barrel of a piping tip to cut the central hole. Reroll scraps once, chilling again if the dough becomes too soft.",
      "Place the canestrelli on the prepared baking sheets with a spatula, being gentle. Bake for 14–16 minutes. They should remain completely white — if they begin to color even slightly at the edges, reduce the oven temperature. They should not brown.",
      "Cool completely on the baking sheets (they are too fragile to move when warm). Once cool, sift powdered sugar over them until they are completely white and invisible — the powdered sugar is an essential part of the canestrello, not a decoration. Store in an airtight tin for up to 2 weeks."
    ]
  },

  "Emilia-Romagna": {
    dish: "Torta di Riso Bolognese",
    description: "The Torta di Riso Bolognese is Bologna's ancient custard-rice tart and one of the most completely satisfying desserts in all of Italy — humble in appearance, extraordinary in effect. Short-grain rice is simmered in whole milk until it swells and the milk thickens to a cream, then combined with eggs, sugar, almonds, lemon zest, and a generous pour of Sassolino or anise liqueur, and baked in a shortcrust pastry shell until the filling sets to a trembling, golden custard studded with swollen, creamy rice grains. Its origins are documented in Bolognese cookbooks from the 14th century — it was the Easter dessert of the noble families of the Emilian plain, made when the egg stores were full after Lent's privations. Each bite gives you the yielding pastry, then the rice-custard: sweet, milky, lemon-scented, with the whisper of anise. It is served cold or at room temperature and improves overnight as the flavors meld. In Bologna it is eaten at the end of Sunday lunch, in thick slices, with nothing alongside.",
    ingredients: [
      "For the pastry: 1 1/2 cups (190 g) all-purpose flour, 1/2 cup (115 g) cold unsalted butter cubed, 1/4 cup (50 g) sugar, 1 egg yolk, 2–3 tbsp cold water, pinch of salt",
      "For the filling: 1/2 cup (100 g) short-grain rice (Arborio), 2 cups (480 ml) whole milk, 1 cup (240 ml) heavy cream, 1/2 cup (100 g) granulated sugar, 4 large eggs plus 2 yolks, Zest of 1 large lemon, 1/2 cup (50 g) blanched almonds, roughly chopped and toasted, 3 tbsp Sassolino or Sambuca (anise liqueur) or dry Marsala, 1/2 tsp pure vanilla extract, Pinch of fine sea salt",
      "Powdered sugar for serving"
    ],
    steps: [
      "Make the pastry: Rub the cold butter into the flour, sugar, and salt until it resembles coarse breadcrumbs. Add the egg yolk and just enough cold water to bring the dough together. Flatten into a disk, wrap, and refrigerate 30 minutes. Preheat the oven to 375°F (190°C). Roll the pastry and line a 10-inch (25 cm) tart pan with a removable bottom. Blind-bake with parchment and weights for 15 minutes, then remove weights and bake 5 minutes more. Reduce oven to 325°F (165°C).",
      "Cook the rice filling: Combine the rice, milk, and cream in a saucepan. Cook over medium-low heat, stirring occasionally, until the rice is just tender and has absorbed most of the liquid — about 18–22 minutes. The mixture should be very thick and creamy. Remove from heat and stir in the sugar until dissolved. Let cool for 10 minutes.",
      "In a large bowl, beat the eggs and yolks until smooth. Slowly stir in the warm rice mixture. Add the lemon zest, toasted almonds, anise liqueur, vanilla, and salt. Stir to combine thoroughly.",
      "Pour the filling into the blind-baked pastry shell. Bake at 325°F (165°C) for 40–50 minutes until the filling is set at the edges and barely jiggles in the center — a gentle tremble. The top should be a pale golden color.",
      "Cool completely in the pan on a rack, then refrigerate at least 2 hours. The torta unmolds cleanly when fully chilled. Dust with powdered sugar before serving. Cut in generous slices — this is not a delicate dessert."
    ]
  },

  "Toscana": {
    dish: "Cantucci con Vin Santo",
    description: "The Cantucci — also called biscotti di Prato — are Tuscany's great contribution to the world of biscuits: twice-baked almond cookies, bone-dry, rock-hard, honey-golden, each slice showing a cross-section of whole almonds at every angle. They were created in Prato in the 14th century, and the recipe has not changed in essential ways since. The twice-baking (biscottare — to bake twice, which is where the word 'biscotti' comes from) removes all moisture, giving them a hardness that could crack a tooth — but this is the point. They are not meant to be eaten alone. They are meant for Vin Santo, Tuscany's amber dessert wine made from semi-dried grapes — sweet, oxidative, nutty, honeyed — into which the cantucci are dunked and held for two full seconds, then eaten as the wine-softened cookie releases its almond richness in a rush. The ritual of vin santo e cantucci at the end of a Tuscan meal — after the bistecca, the pici, the pecorino — is one of the great slow pleasures of Italian eating.",
    ingredients: [
      "2 cups (250 g) all-purpose flour",
      "1 cup (200 g) granulated sugar",
      "1/2 tsp baking powder",
      "Pinch of fine sea salt",
      "2 large eggs plus 1 egg yolk",
      "1 tsp pure vanilla extract",
      "Zest of 1 orange, finely grated",
      "1 1/2 cups (150 g) whole unblanched almonds (skin on — traditional)",
      "1 egg white beaten with 1 tsp water, for glazing",
      "Vin Santo for serving"
    ],
    steps: [
      "Preheat the oven to 350°F (175°C). Line a baking sheet with parchment paper.",
      "In a large bowl, whisk together the flour, sugar, baking powder, and salt. Make a well in the center. Add the eggs, egg yolk, vanilla, and orange zest. Mix from the center outward until a rough dough forms. It will be quite stiff and dry-looking. Add the whole almonds and knead them in — the dough will be very stiff. If absolutely necessary, add 1 tsp of water to bring it together, but resist this if you can.",
      "Divide the dough into two equal portions. On a lightly floured surface, shape each into a log about 12 inches (30 cm) long and 1.5 inches (4 cm) wide. The logs will be rough-surfaced — this is correct. Place on the prepared baking sheet, spaced apart. Brush the tops with the egg white glaze.",
      "Bake for 25–30 minutes until the logs are light golden-brown and feel firm when pressed gently on top. Remove from the oven and cool on the sheet for 15 minutes — they must firm up before the second baking.",
      "Reduce oven temperature to 300°F (150°C). Using a sharp serrated knife, cut each log diagonally into slices 1/2 inch (1.3 cm) thick — use a firm, decisive sawing motion. Lay the slices flat on the baking sheet.",
      "Bake for a further 20–25 minutes, turning once halfway through, until completely dry and very light golden on both sides. They should feel completely hard. Cool completely. They will harden further as they cool. Store in an airtight tin for up to 1 month. Serve with Vin Santo, dipping each cantucci for at least 2 seconds before eating."
    ]
  },

  "Umbria": {
    dish: "Torciglione di Perugia",
    description: "The Torciglione is one of the most theatrical and least-known desserts in Italy — an almond serpent from Perugia, coiled in an S-curve with a red cherry eye, scales pressed from a fork into its almond-paste body, baked golden and glistening. It is a Carnival sweet, made throughout Umbria in the weeks before Lent — and the serpent shape is deliberately provocative: it references both the ancient Etruscan serpent cult (Umbria sits on the heartland of the old Etruscan civilization) and the Christian symbolism of temptation. Perhaps the baker is saying that even the serpent can be beautiful and sweet. The paste is pure almond — ground almonds, sugar, egg whites, and a splash of anise liqueur — shaped entirely by hand into the snake form, the scales impressed with the tines of a fork, the tongue a split almond sliver, the eye a candied cherry glowing red. It is dense, moist, intensely almond-sweet with the fragrance of anise, and it keeps for two weeks wrapped in cloth. Every pasticceria in Perugia and every nonna's kitchen makes one for Carnival.",
    ingredients: [
      "2 1/2 cups (250 g) blanched almond flour or very finely ground blanched almonds",
      "1 cup (200 g) granulated sugar",
      "2 egg whites",
      "2 tbsp anise liqueur (Mistra or Sambuca) or 1 tsp anise extract",
      "Zest of 1/2 lemon",
      "1/4 tsp almond extract (optional, for depth)",
      "Powdered sugar as needed for consistency",
      "For decoration: 1 glacé cherry (for the eye), 2 sliced almonds (for the tongue/head), 1 egg yolk beaten for glaze"
    ],
    steps: [
      "In a large bowl, combine the ground almonds and granulated sugar. Add the egg whites, anise liqueur, lemon zest, and almond extract. Mix with your hands until a firm, smooth paste forms. If the mixture is too sticky, knead in a tablespoon of powdered sugar. The paste should hold its shape when molded and not be tacky. Wrap and refrigerate 30 minutes.",
      "Preheat the oven to 325°F (165°C). Line a baking sheet with parchment paper.",
      "On a surface dusted with powdered sugar, roll the paste with your hands into a long, even cylinder about 18 inches (45 cm) long and 1.5 inches (4 cm) in diameter, tapering slightly at one end (the tail). Shape one end into a wider, flatter head.",
      "Coil the snake onto the prepared baking sheet in an S-shape, lifting the head end slightly. Using a fork, press scales all along the body by lightly pressing and dragging the tines. Shape the head area: press in the glacé cherry for the eye, and press two sliced almond slivers into the mouth area for the tongue.",
      "Brush the entire snake gently but thoroughly with the beaten egg yolk glaze.",
      "Bake for 20–25 minutes until golden-amber. The torciglione should be firm outside but still slightly soft inside. Cool completely on the baking sheet — do not move while warm. Serve at room temperature, displayed whole for the table and then broken into pieces. Keeps 10–14 days wrapped in parchment at room temperature."
    ]
  },

  "Marche": {
    dish: "Frustingo delle Marche",
    description: "The Frustingo (also spelled Pristinaccio or Pistinaccio in different Marchigian valleys) is one of the most ancient cakes in Italy — a dense, dark fruit cake from the Marche that was already documented in the 14th century and has been made at Christmas ever since. It is made with dried figs from Fabriano's fig orchards, boiled soft and mashed with cocoa or chocolate, grape must (mosto cotto or sapa — the dark, sweet, reduced juice of pressed grapes, a condiment of antiquity), walnuts, almonds, pine nuts, raisins, orange zest, anise seeds, cinnamon, and cloves. Olive oil binds it, not butter. The result is a dense, glistening, intensely flavored slab — black as midnight, fragrant as a spice cabinet, sweet from the figs and mosto, complex from the nuts and spice. It is not decorative — it is serious and ancient. Eaten in thin slices at Christmas with a glass of passito Piceno. Each family in Ascoli Piceno, Macerata, and Ancona has its own version, jealously guarded.",
    ingredients: [
      "1 lb (450 g) dried figs, stems removed, roughly chopped",
      "1 cup (240 ml) water",
      "1/3 cup (80 ml) mosto cotto or sapa (or substitute: 3 tbsp dark honey + 2 tbsp pomegranate molasses)",
      "3/4 cup (90 g) walnuts, toasted and roughly chopped",
      "1/2 cup (50 g) blanched almonds, toasted and roughly chopped",
      "1/4 cup (35 g) pine nuts",
      "1/2 cup (80 g) raisins, soaked in warm water 15 minutes and drained",
      "2 tbsp unsweetened cocoa powder",
      "1 oz (30 g) dark chocolate, finely grated",
      "Zest of 1 orange",
      "1 tsp anise seeds",
      "1 tsp ground cinnamon",
      "1/4 tsp ground cloves",
      "1/4 cup (60 ml) extra-virgin olive oil",
      "1/2 cup (60 g) breadcrumbs",
      "Powdered sugar and a few whole almonds for the top"
    ],
    steps: [
      "Cook the figs: Place the chopped dried figs in a saucepan with the water. Cook over medium heat, stirring, for 15–20 minutes until the figs are very soft and have broken down to a thick paste, most of the water absorbed. Remove from heat and let cool slightly.",
      "Preheat the oven to 350°F (175°C). Oil a 9-inch (23 cm) round cake pan or line with parchment.",
      "In a large bowl, combine the fig paste with the mosto cotto, walnuts, almonds, pine nuts, raisins, cocoa powder, grated chocolate, orange zest, anise seeds, cinnamon, cloves, olive oil, and breadcrumbs. Mix thoroughly with your hands or a wooden spoon until completely combined — the mixture will be very stiff, dense, and fragrant. Taste and adjust sweetness or spice.",
      "Press the mixture firmly into the prepared pan, smoothing the top with wet hands. Press whole almonds in a decorative pattern into the surface.",
      "Bake for 30–40 minutes until the top is dry and beginning to crack slightly, and the edges pull slightly from the pan. It will not rise. Cool completely in the pan — the frustingo firms up significantly as it cools.",
      "Unmold carefully. Dust with powdered sugar. Serve in thin slices — it is rich and a small slice goes a long way. Keeps wrapped at room temperature for up to 2 weeks; it improves over the first 3–4 days."
    ]
  },

  "Lazio": {
    dish: "Maritozzi con la Panna",
    description: "The Maritozzo is Rome's great sweet bun and one of the oldest street foods in the city — documented since the Middle Ages, when sweetened buns stuffed with raisins, pine nuts, and candied peel were sold from carts near the churches of the Forum on the first Friday of Lent. The modern Maritozzo con la Panna is simpler and more perfect: a soft, slightly sweet, golden brioche-adjacent bun, split down the middle and generously, almost violently, filled with unsweetened fresh whipped cream that piles high above the bun like a snowdrift. The bun is brushed with sugar syrup to give it a gloss and gentle sweetness; the cream inside is pure and cold; the contrast between warm bun and cold cream is everything. Romans eat maritozzi at breakfast, in pasticcerie that have been making them the same way since the 1950s, standing at the bar with an espresso, getting cream on their jacket with no particular concern. It is one of the great breakfasts of the world.",
    ingredients: [
      "For the maritozzi dough: 2 1/4 tsp (7 g) instant yeast, 1/3 cup (80 ml) warm milk, 3 cups (375 g) all-purpose flour, 1/3 cup (65 g) granulated sugar, 2 large eggs, 6 tbsp (85 g) unsalted butter, softened, 1 tsp orange zest, 1 tsp vanilla extract, 1/2 tsp fine sea salt, 1/3 cup (50 g) raisins, 2 tbsp pine nuts (optional, for the traditional version)",
      "For the sugar glaze: 3 tbsp water + 2 tbsp sugar, simmered together until sugar dissolves",
      "For the filling: 2 cups (480 ml) heavy whipping cream, very cold, 2 tbsp powdered sugar, 1 tsp vanilla extract"
    ],
    steps: [
      "Make the dough: Dissolve the yeast in the warm milk with a pinch of sugar; let sit 10 minutes. In a stand mixer with the dough hook, combine the flour, sugar, and salt. Add the eggs, yeast mixture, orange zest, and vanilla. Mix on low 2 minutes, then medium for 5 minutes until the dough becomes smooth. Add the softened butter, one tablespoon at a time, mixing well after each. Add the raisins and pine nuts. Knead 8 more minutes until the dough is smooth, glossy, and elastic. Cover and rise at room temperature 1.5–2 hours until doubled.",
      "Shape the maritozzi: Divide the dough into 8–10 equal pieces (each about 70–80 g). Roll each into a smooth oval shape about 4 inches (10 cm) long. Place on parchment-lined baking sheets, spacing apart. Cover and rise 45–60 minutes until puffed and pillowy.",
      "Preheat the oven to 375°F (190°C). Bake for 14–16 minutes until golden brown. Remove from the oven. Immediately brush with the warm sugar glaze — use it all, coating each bun generously. Transfer to a rack and cool completely.",
      "Whip the cold cream with the powdered sugar and vanilla to firm peaks.",
      "To assemble: Using a serrated knife, cut each bun almost in half lengthwise, keeping one long side intact (do not cut all the way through — leave a hinge). Open gently. Pipe or spoon the whipped cream in a generous, towering dome into the bun — it should overflow well above the top of the bun. Smooth the outside if desired, or leave it rustic. Eat immediately — within minutes of filling."
    ]
  },

  "Abruzzo": {
    dish: "Parrozzo Abruzzese",
    description: "The Parrozzo is Abruzzo's greatest confection — a dome-shaped cake that was created in 1920 by Luigi D'Amico, confectioner of Pescara, inspired by the pane rozzo (rough bread) of Abruzzo's mountain shepherds, covered in dark chocolate to evoke the charred crust of the bread baked in ash. He sent the first one to Gabriele d'Annunzio, Pescara's most famous poet, who ate it on Christmas morning 1920 and wrote a sonnet of praise in Abruzzese dialect that D'Amico printed on every box thereafter. The original Parrozzo is still made under license by one confectionery family in Pescara. The cake itself: a dome of coarse semolina and ground almonds enriched with egg yolks and butter, lemon-scented, entirely yellow-gold inside like the polenta of the mountains. The outside is completely coated in a thick shell of bittersweet dark chocolate ganache. The first bite breaks through the hard chocolate to the moist, almond-scented, yellow interior. It is the most lyrical cake in Italy.",
    ingredients: [
      "For the cake: 1 cup (100 g) blanched almond flour (ground almonds), 1/2 cup (85 g) fine semolina (semola rimacinata), 3/4 cup (150 g) granulated sugar, 6 large eggs, separated, 1/4 cup (55 g) unsalted butter, melted, Zest of 1 lemon, 1 tsp pure vanilla extract, Pinch of fine sea salt",
      "For the chocolate coating: 10 oz (280 g) high-quality dark chocolate (65–70% cacao), finely chopped, 1/2 cup (120 ml) heavy cream, 1 tbsp unsalted butter"
    ],
    steps: [
      "Preheat the oven to 350°F (175°C). Butter and flour a 7-inch (18 cm) dome mold (or a Bundt pan with only the center tube portion, or a very rounded bowl). Alternatively, use a 9-inch (23 cm) round cake pan — the dome shape is traditional but the flavor is the same.",
      "Beat the egg yolks with 1/2 cup (100 g) of the sugar until very pale, thick, and creamy — at least 4 minutes. Beat in the melted butter, lemon zest, and vanilla.",
      "Combine the almond flour and semolina; fold into the yolk mixture until combined.",
      "In a clean bowl, beat the egg whites with the salt to soft peaks. Gradually add the remaining 1/4 cup (50 g) sugar and beat to firm, glossy peaks. Fold the whites into the almond batter in three additions, gently and deliberately preserving the volume.",
      "Pour into the prepared mold and smooth the top. Bake for 30–35 minutes until golden and a skewer comes out clean. Cool in the mold 20 minutes, then unmold and cool completely on a rack.",
      "Make the chocolate coating: Heat the cream until simmering. Pour over the chopped chocolate in a bowl. Let sit 2 minutes, then stir from the center until completely smooth. Add the butter and stir until incorporated. Cool to room temperature until the ganache is thick enough to coat — about 30–40 minutes. Place the cooled cake on a rack over a tray. Pour the ganache over, coating completely. Let set at room temperature for 1 hour. Do not refrigerate — the chocolate should remain glossy and at room temperature."
    ]
  },

  "Molise": {
    dish: "Mostaccioli Molisani al Miele e Fico",
    description: "The Mostaccioli are among the oldest Christmas sweets still made in Italy — documented in Roman literature (Cato mentions a precursor in De Agri Cultura, 160 BC) and continuous in Italian tradition ever since. Molise's version is rustic, honest, and extraordinary: small diamond-shaped cookies made with toasted flour, locally harvested honey, dried figs from the Molisan valleys, walnuts, crushed almonds, cocoa, wine must, cinnamon, cloves, and black pepper. They are spiced like a medieval apothecary's pantry — because they originated there, in the tradition of the 'speziaro' (spice merchant) who sold these same cookies to pilgrims and travelers. The dough is pressed into molds or cut into diamond shapes and baked until dark and hard, then allowed to ripen for days in a tin — like a fruitcake, they improve with rest, the spices deepening, the honey becoming more complex. They are eaten in Molise at Christmas, dunked in wine or nibbled with coffee, and given as gifts wrapped in parchment tied with string.",
    ingredients: [
      "2 cups (250 g) all-purpose flour, toasted in a dry pan until pale golden",
      "1/2 cup (170 g) dark honey (chestnut or wildflower)",
      "1/3 cup (80 ml) red or white wine (or grape must)",
      "6 dried figs, stems removed and finely chopped",
      "1/2 cup (60 g) walnuts, toasted and finely chopped",
      "1/4 cup (30 g) blanched almonds, toasted and roughly chopped",
      "2 tbsp unsweetened cocoa powder",
      "1 tsp ground cinnamon",
      "1/4 tsp ground cloves",
      "1/4 tsp freshly ground black pepper",
      "Zest of 1 orange",
      "1/2 tsp baking soda",
      "2 tbsp extra-virgin olive oil",
      "Powdered sugar for dusting (optional)"
    ],
    steps: [
      "Warm the honey and wine together in a small saucepan over low heat until the honey is completely fluid and combined with the wine. Remove from heat and let cool slightly.",
      "In a large bowl, combine the toasted flour, cocoa powder, cinnamon, cloves, pepper, baking soda, orange zest, figs, walnuts, and almonds. Stir to mix. Add the warm honey-wine mixture and the olive oil. Mix with a wooden spoon, then knead briefly with your hands until a stiff, dark, cohesive dough forms. It will be dense and sticky. Wrap and rest for 30 minutes.",
      "Preheat the oven to 350°F (175°C). Line baking sheets with parchment paper.",
      "On a lightly floured surface, roll the dough to about 1/2 inch (1.3 cm) thickness. Cut into diamond shapes about 2 inches (5 cm) long using a sharp knife or pastry cutter. Or press into traditional carved wooden molds dusted with flour.",
      "Place the mostaccioli on the prepared baking sheets and bake for 12–15 minutes. They should be firm and set but not hard as rocks — they will harden further as they cool and age.",
      "Cool on a rack. They are better after 2–3 days in an airtight tin, when the spices deepen and the texture becomes ideal. They keep for 3–4 weeks. Optionally dust with powdered sugar before serving."
    ]
  },

  "Campania": {
    dish: "Sfogliatelle Ricce Napoletane",
    description: "The Sfogliatella is Naples' greatest pastry achievement and one of the most technically demanding confections in the world. Invented in the 17th century by the nuns of the Santa Rosa convent on the Amalfi Coast and reinvented in Naples by pastry maestro Pasquale Pintauro in 1818, the sfogliatella riccia (curly) is a shell of pastry that contains multitudes: dozens of water-thin, crisp, separate layers of pastry — each one individually lacquered with lard — fanned out and formed into a ridged cone shape that mimics a ribbed seashell. Inside is a filling of ricotta, semolina cooked in milk, sugar, egg, candied orange peel, cinnamon, and a drop of vanilla — cooked to a dense, aromatic custard-cream. The sfogliatella must be eaten very fresh, very warm, just out of the oven, when the layers are still shatteringly crisp and the filling is still warm. Cold sfogliatelle are a tragedy. In Naples they are eaten at 7am with an espresso, purchased from the oldest pasticcerie in the city — places where the trays come out of the oven every hour and the line forms before the shop opens.",
    ingredients: [
      "For the pastry dough (this makes the laminated shell): 3 cups (375 g) semolina flour (or all-purpose flour), 3/4 cup (180 ml) warm water, 1/2 tsp fine sea salt, 1 tsp honey",
      "For laminating: 3/4 cup (170 g) high-quality lard (or solid shortening — lard gives the authentic crunch), softened to spreading consistency",
      "For the ricotta filling: 1 cup (250 g) whole-milk ricotta, very well-drained overnight, 1/2 cup (85 g) fine semolina, 1 cup (240 ml) whole milk, 1/2 cup (100 g) granulated sugar, 1 egg, Zest of 1 orange, 1/2 tsp ground cinnamon, 1 tsp vanilla extract, 2 tbsp candied orange peel, finely chopped"
    ],
    steps: [
      "Make the filling first (it must be cold): In a saucepan, bring the milk to a simmer. Whisk in the semolina in a thin stream. Cook, stirring constantly, until very thick. Remove from heat, add the sugar, stir to dissolve. Cool to lukewarm. Beat the ricotta smooth. Combine ricotta, semolina mixture, egg, orange zest, cinnamon, vanilla, and candied peel. Mix thoroughly. Press plastic wrap on the surface and refrigerate until completely cold (at least 2 hours).",
      "Make and laminate the dough: Combine the flour, water, salt, and honey to a stiff, smooth dough. Knead 10 minutes until very elastic. Wrap and rest 30 minutes. On a clean surface, roll or stretch the dough as thin as possible into a long rectangle — paper-thin. Spread the softened lard over the entire surface in a thin, even layer. Roll the dough up very tightly into a log from a long side. Wrap in plastic and refrigerate 1 hour.",
      "Preheat the oven to 400°F (200°C). Slice the chilled log into 1/2-inch (1.3 cm) rounds. Working with one round at a time (keep others refrigerated), press the center with your thumb and expand the circle with rotating pressure from your fingers, stretching and rotating to create a cone shape — the layers fan out into a shell. Press the layers together slightly at the tip.",
      "Fill each cone with 1 heaping tablespoon of the cold ricotta filling. Press the open end closed, pinching the layers together firmly but leaving the ridged exterior visible.",
      "Place on a parchment-lined baking sheet. Brush with a thin coat of lard. Bake 20–25 minutes until deep golden-brown and crisp — the layers should visibly separate and the entire pastry should look like a ridged fan shell. Dust with powdered sugar immediately upon removing from the oven. Eat within 30 minutes of baking."
    ]
  },

  "Puglia": {
    dish: "Pasticciotto Leccese",
    description: "The Pasticciotto is Lecce's extraordinary gift to Italian pastry — and Lecce protects it with the same provincial pride with which the city protects its baroque architecture. It was created in 1745 by Nicola Ascalone, the confectioner of Galatina, who made a small oval pastry of frolla (Leccese shortcrust) filled with crema pasteliera, baked until golden. The Pasticciotto leccese's crust is its own distinct tradition: made with lard (not butter), strutto di maiale, which gives it a crumbly, melt-on-the-tongue texture unlike any other pastry shell in Italy — simultaneously more delicate and more substantial. The filling is pastry cream: egg yolks, sugar, flour, and milk, cooked until thick and fragrant with vanilla and lemon. The combination is perfect: cool, eggy cream inside a warm, crumbling, lard-enriched shell. In Lecce, Pasticciotto is the only acceptable breakfast — eaten standing at the bar at 7:30am with a caffè leccese (espresso poured over almond milk and ice), the entire Salento peninsula waking up around it.",
    ingredients: [
      "For the Leccese frolla (pastry): 2 1/2 cups (315 g) all-purpose flour, 3/4 cup (170 g) good lard (strutto), at room temperature, 3/4 cup (90 g) powdered sugar, 2 egg yolks, 2 tbsp cold water, Zest of 1 lemon, Pinch of fine sea salt, 1/2 tsp baking powder",
      "For the pastry cream filling: 2 cups (480 ml) whole milk, 5 large egg yolks, 2/3 cup (130 g) granulated sugar, 1/3 cup (40 g) all-purpose flour (or cornstarch), 1 tsp pure vanilla extract, Zest of 1/2 lemon",
      "1 egg yolk beaten with 1 tbsp milk for glazing"
    ],
    steps: [
      "Make the pastry cream: Heat the milk until just steaming. Whisk the yolks with the sugar until pale; whisk in the flour and lemon zest. Slowly pour the hot milk into the yolk mixture, whisking. Return to the saucepan over medium heat, whisking constantly, until the cream thickens and just bubbles. Cook 1 minute more, add vanilla. Press plastic wrap on the surface and refrigerate until completely cold.",
      "Make the frolla: Beat the lard with the powdered sugar until smooth and creamy. Beat in the egg yolks, lemon zest, and water. Add the flour, baking powder, and salt. Mix until a cohesive dough forms — do not overwork. Wrap and refrigerate 30 minutes.",
      "Preheat the oven to 375°F (190°C). Butter 8–10 oval pasticciotto molds (about 3.5x2.5 inches / 9x6 cm) or a muffin tin.",
      "Divide the dough into two portions. Roll the first portion to 3–4mm thickness. Cut ovals slightly larger than the molds and press into each mold, pressing up the sides. Fill each with 2 generous tablespoons of cold pastry cream, mounding it slightly above the pastry rim.",
      "Roll the second portion and cut oval tops to fit. Press the edges firmly to seal, trimming excess. Brush the tops with the egg glaze.",
      "Bake for 20–25 minutes until the tops are a deep, even amber-gold. Cool in the molds 5 minutes, then unmold carefully onto a rack. The Pasticciotto is traditionally eaten warm, within 1–2 hours of baking, but can be refrigerated and gently warmed."
    ]
  },

  "Basilicata": {
    dish: "Strazzate di Matera",
    description: "The Strazzate are the ancient diamond-shaped walnut and chocolate cookies of Matera — the sassi city of Basilicata, one of the oldest continuously inhabited places in the world, where humans have carved homes into the tufa limestone for 9,000 years. The Strazzate (from stracciare — 'to tear') are believed to originate in the medieval spice trade that brought cocoa and cinnamon to the deep South through the great fairs of Matera. They are small, hard, diamond-shaped cookies made with walnut flour, cocoa or grated chocolate, honey, cinnamon, cloves, citrus zest, and enough egg and flour to hold them together. They are neither soft nor yielding: they are meant to be kept for weeks, hardening over time as the spices deepen, meant to be nibbled slowly, dunked in wine or sweet liqueur, found in ceramic jars on the windowsills of Matera's ancient cave-houses. They taste of the deep South: intense, spiced, dark, and honest.",
    ingredients: [
      "2 cups (200 g) walnuts, toasted",
      "1 cup (125 g) all-purpose flour",
      "1/2 cup (50 g) unsweetened cocoa powder",
      "3/4 cup (150 g) granulated sugar",
      "1/4 cup (85 g) dark honey",
      "2 eggs",
      "1 tsp ground cinnamon",
      "1/4 tsp ground cloves",
      "Zest of 1 orange",
      "Zest of 1/2 lemon",
      "1 oz (30 g) dark chocolate, finely grated",
      "1/2 tsp baking powder",
      "Pinch of fine sea salt",
      "1 tbsp red wine or Aglianico wine (optional)"
    ],
    steps: [
      "Toast the walnuts in a dry skillet or 350°F (175°C) oven for 8–10 minutes until fragrant. Cool completely. In a food processor, pulse the walnuts to a coarse, sandy texture — not a paste; you want texture and small visible pieces.",
      "In a large bowl, combine the flour, cocoa, sugar, cinnamon, cloves, baking powder, salt, orange and lemon zest, and grated chocolate. Add the ground walnuts and stir to combine.",
      "Add the eggs, honey, and wine if using. Mix with your hands until a stiff, slightly sticky dough forms. If too dry, add 1–2 tbsp water. The dough should just hold together when pressed.",
      "Preheat the oven to 350°F (175°C). Line baking sheets with parchment. On a floured surface, roll the dough to about 1/2 inch (1.3 cm) thickness. Using a sharp knife or pastry cutter, cut into diamond shapes about 2 inches (5 cm) long.",
      "Place on the prepared baking sheets. Bake for 15–18 minutes until set and firm but not quite hard — they will harden further as they cool.",
      "Cool completely on a rack. Store in an airtight tin for up to 3 weeks — they improve with at least 2–3 days of resting. Serve with Aglianico passito or a small glass of fernet."
    ]
  },

  "Calabria": {
    dish: "Pitta 'Mpigliata Calabrese",
    description: "The Pitta 'Mpigliata is Calabria's most extraordinary, most labor-intensive, and most ancient Christmas confection — a pinwheel or crown of yeasted pastry filled with a dense mixture of figs, walnuts, raisins, honey, cloves, cinnamon, and dark chocolate, drizzled in honey and crowned with colored sugar. The name means 'entangled pastry' in Calabrian dialect, and the visual is immediately clear: small circles of pasta frolla or yeasted dough are filled with the nut-fig-honey mixture and folded up into little open-topped pockets, arranged in a crown or flower formation, then baked golden and immediately drenched in warm honey. The effect is architectural and baroque, like the churches of the Cosenza and Reggio Calabria province. It originates from San Giovanni in Fiore, a town in the Sila massif, and it is said to have been made there since the 14th century, each family passing the recipe from grandmother to granddaughter in a direct line. Calabria will not let it go.",
    ingredients: [
      "For the pastry: 2 1/2 cups (315 g) all-purpose flour, 1/3 cup (65 g) granulated sugar, 1/2 cup (115 g) unsalted butter, softened, 1 egg, 1/4 cup (60 ml) white wine, Zest of 1 orange, 1/2 tsp baking powder, Pinch of salt",
      "For the filling: 1 cup (150 g) dried figs, stems removed, very finely chopped, 3/4 cup (75 g) walnuts, toasted and finely chopped, 1/4 cup (35 g) raisins, 2 tbsp dark honey, 1 oz (30 g) dark chocolate, grated, 1/2 tsp ground cinnamon, 1/4 tsp ground cloves, Zest of 1/2 orange, 2 tbsp orange marmalade",
      "For finishing: 1/2 cup (170 g) honey for drizzling, colored nonpareils or sesame seeds for decoration"
    ],
    steps: [
      "Make the filling: Combine all filling ingredients in a bowl and mix thoroughly. The mixture should be very dense and fragrant, holding together when pressed. Taste and adjust spices. Set aside.",
      "Make the pastry: Beat the butter and sugar until smooth. Beat in the egg, white wine, and orange zest. Add the flour, baking powder, and salt; mix to a smooth dough. Wrap and refrigerate 30 minutes.",
      "Preheat the oven to 350°F (175°C). On a floured surface, roll the pastry to 3mm thickness. Cut into circles about 4 inches (10 cm) in diameter.",
      "Place 1 heaping tablespoon of filling in the center of each circle. Fold the edges up and pinch into a small, open-topped cup with pleated sides — like a little crown or flower. The filling should be visible on top.",
      "Arrange the pittas close together in a ring on a parchment-lined baking sheet, touching each other so they bake into a connected crown (or bake separately for individual pittas). Bake for 25–30 minutes until the pastry is golden.",
      "Immediately upon removing from the oven, warm the honey and drizzle it generously over the entire tray of pittas so that the honey soaks into the filling and coating. Scatter colored nonpareils or sesame seeds over the top while the honey is still warm. Cool completely before serving. They keep well for 1–2 weeks."
    ]
  },

  "Sicilia": {
    dish: "Cannoli Siciliani",
    description: "The Sicilian cannolo is the pinnacle of the island's extraordinary pastry tradition — a tradition shaped by Arab conquerors (who brought sugar cane, citrus, almonds, pistachios, and rose water), Norman kings, Spanish viceroys, and the great noble families who supported the pastry convents of Palermo and Catania. The cannolo is simply: a tube of fried, blistered pastry shell filled with sweetened ricotta cream. But the execution is everything. The shell (cialda) must be fried in lard — not oil — until it blisters and puffs in patches of amber and gold, crackles audibly when bitten, and shatters into fragments that scatter. The filling is real Sicilian ricotta — made from sheep's milk whey, drained for 24 hours, then beaten with sugar until satiny — scented with cinnamon and a whisper of vanilla, mixed with candied orange peel and dark chocolate chips. The filling is piped at the last possible moment — a cannolo that sits filled for more than 30 minutes is already past its best. The ends are dipped in chopped pistachios. On first bite it shatters. The filling is cold and sweet. The pistachio gives crunch. There is no dessert finer.",
    ingredients: [
      "For the cannolo shells: 2 cups (250 g) all-purpose flour, 2 tbsp granulated sugar, 1/2 tsp fine sea salt, 1/2 tsp ground cinnamon, 1 egg, 2 tbsp lard or unsalted butter, softened, 1/3 cup (80 ml) Marsala wine (dry), 1 egg white for sealing, Lard or oil for deep-frying (lard preferred for the authentic shell)",
      "For the ricotta filling: 2 cups (500 g) whole-milk ricotta (sheep's milk if available), drained overnight in a sieve in the refrigerator until very dry, 1 cup (120 g) powdered sugar, sifted, 1/2 tsp ground cinnamon, 1 tsp pure vanilla extract, 3 oz (85 g) dark chocolate chips or chopped chocolate (at least 60% cacao), 2 tbsp candied orange peel, finely chopped",
      "For finishing: 1/2 cup (60 g) shelled pistachios, finely chopped, Powdered sugar, Maraschino cherries or orange peel for the ends (optional)"
    ],
    steps: [
      "Make the shell dough: In a bowl, combine the flour, sugar, salt, and cinnamon. Make a well; add the egg, lard, and Marsala. Mix and knead 8–10 minutes to a firm, smooth, somewhat elastic dough — it should feel like stiff pasta dough. Wrap and rest 30 minutes.",
      "Roll the dough on a lightly floured surface to paper-thin thickness (1–2mm). Cut into 4-inch (10 cm) circles or squares. Wrap each piece around a metal cannolo tube, sealing the overlapping edge with a dab of egg white and pressing firmly.",
      "Heat lard (or oil) in a deep pot to 360°F (182°C). Fry the shell-wrapped tubes, 2–3 at a time, for 2–3 minutes until golden-brown and blistered. Remove with tongs and drain on paper towels. While warm, slide the cannolo tubes out carefully. Cool completely.",
      "Make the filling: Beat the drained ricotta with a spatula until very smooth. Add the sifted powdered sugar, cinnamon, and vanilla; mix thoroughly. Fold in the chocolate chips and candied orange peel. Refrigerate until needed.",
      "Fill immediately before serving: Transfer the ricotta cream to a piping bag fitted with a large round or star tip. Pipe the filling into both ends of each shell, meeting in the middle. Dip each end in the chopped pistachios. Dust with powdered sugar. Serve within 20 minutes — the shells must still be crackingly crisp."
    ]
  },

  "Sardegna": {
    dish: "Seadas (Sebadas) Sarde con Miele Amaro",
    description: "The Seadas — also called Sebadas — are Sardinia's most iconic and most uniquely Sardinian dessert: deep-fried pastry pockets filled with fresh pecorino cheese and lemon zest, drizzled with Sardinia's extraordinary miele amaro di corbezzolo — the dark, intensely bitter honey made from the white flowers of the strawberry tree (Arbutus unedo), found almost nowhere else on earth. The contrast is shocking and perfect: the savory, slightly sour, melting warm cheese; the shatteringly crisp pastry; and the bittersweet, dark, almost medicinal honey. The filling is made from fresh pecorino sardo (the young, soft version) or a mixture of fresh cheese and semolina, mixed with lemon zest and a pinch of saffron in the traditional recipe. The pastry is pasta violada — a semolina-and-lard dough specific to Sardinia, thinner than pie crust, more rustic than filo. The Seadas originates from the shepherding culture of the Barbagia mountains, where they were made for the great feasts of the shepherds' calendar: the return of the flocks, the slaughter, the harvest. They are ancient, generous, and irreplaceable.",
    ingredients: [
      "For the pasta violada (pastry): 2 cups (250 g) fine semolina (or all-purpose flour or half and half), 1/4 cup (55 g) lard or unsalted butter, 1/2 tsp fine sea salt, 1/2 cup (120 ml) warm water (approximately)",
      "For the cheese filling: 1 lb (450 g) fresh young pecorino sardo (or mild fresh pecorino, or a mixture of 3/4 fresh pecorino + 1/4 fresh ricotta), grated or crumbled, Zest of 2 lemons, finely grated, Pinch of saffron threads dissolved in 1 tsp warm water (optional but traditional), 1 tbsp fine semolina if the cheese is very wet",
      "Lard or neutral oil for deep-frying",
      "Sardinian miele amaro di corbezzolo (strawberry tree honey) for serving — or the darkest, most bitter wildflower honey available"
    ],
    steps: [
      "Make the pastry: Combine the semolina and salt. Rub in the lard with your fingers until the mixture resembles coarse sand. Add warm water gradually, kneading, until a firm but pliable dough forms — similar to pasta dough. Knead 5 minutes until smooth. Wrap and rest 30 minutes.",
      "Make the filling: If the cheese is very wet, spread it on a clean cloth and press gently to remove moisture. In a bowl, combine the grated cheese, lemon zest, saffron water if using, and semolina if needed. Mix thoroughly. The filling should hold together — not runny.",
      "Roll the pasta dough on a lightly floured surface to 2–3mm thickness. Cut into rounds of 4–5 inches (10–12 cm) in diameter.",
      "Place a generous tablespoon of cheese filling in the center of half the rounds. Top with another round and press the edges firmly together, sealing with your fingers or a fork — a perfect, tight seal is essential to prevent the filling from leaking during frying. Trim the edges with a fluted pastry cutter for a neat finish.",
      "Heat 3 inches (8 cm) of lard or oil to 360°F (182°C). Fry the seadas, 2 at a time, for 3–4 minutes per side until deep golden-brown and crispy. Drain briefly on paper towels.",
      "Serve immediately — they must be eaten hot, when the cheese is still melted and the pastry is crackling. Drizzle generously with the warm honey over each seada. The bitterness of the corbezzolo honey against the sweet-savory fried cheese is the essential experience — do not substitute with mild honey if you can help it."
    ]
  }
};

// Apply desserts to ITA regions
Object.keys(italyDesserts).forEach(regionName => {
  if (data['ITA'].regions[regionName]) {
    data['ITA'].regions[regionName].dessert = italyDesserts[regionName];
    console.log('✓ Added dessert for ITA/' + regionName + ': ' + italyDesserts[regionName].dish);
  } else {
    console.log('✗ Region not found: ' + regionName);
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n✅ Italy desserts written successfully!');
