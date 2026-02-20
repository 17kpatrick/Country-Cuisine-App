const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/recipes.json');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);

const franceDesserts = {
  "Auvergne-Rhône-Alpes": {
    dish: "Gâteau de Savoie",
    description: "The Gâteau de Savoie is one of France's oldest cakes, born in the 14th century in the Savoyard court of Amadeus VI — a cake so light it was said to float on air. Made without butter, its extraordinary lift comes entirely from six eggs beaten with sugar to the ribbon stage, then gently folded with potato starch and flour. The batter goes into a tall, fluted mold that creates those elegant, cathedral-like ridges. The result is impossibly airy — a pale gold sponge with an almost weightless crumb that dissolves on the tongue. Traditionally dusted with nothing more than a snowfall of powdered sugar, it is served with fresh fruit, jam, or crème anglaise in the valleys of the Alps. Every grandmother in Savoie has her own version — some add lemon zest, some a spoon of vanilla — but the soul is always the same: egg, patience, and the long gentle hands of the mountain.",
    ingredients: [
      "6 large eggs, separated, at room temperature",
      "1 1/4 cups (250 g) granulated sugar, divided",
      "1 tsp finely grated lemon zest",
      "1 tsp pure vanilla extract",
      "1/2 cup (60 g) all-purpose flour, sifted",
      "1/2 cup (60 g) potato starch (fécule de pommes de terre), sifted",
      "Pinch of fine sea salt",
      "Powdered sugar for dusting",
      "Butter and flour for the mold"
    ],
    steps: [
      "Preheat the oven to 325°F (165°C). Butter a 10-inch (25 cm) tall fluted Bundt or Kugelhopf mold generously, then dust with flour, shaking out the excess. Set aside.",
      "In a large bowl, beat the egg yolks with 1 cup (200 g) of the sugar until the mixture is very pale, thick, and falls in a wide ribbon from the whisk — at least 5 minutes by hand or 3 minutes with an electric mixer. Beat in the lemon zest and vanilla extract.",
      "In a completely clean, dry bowl, beat the egg whites with the salt on medium speed until foamy. Gradually add the remaining 1/4 cup (50 g) of sugar and beat to firm, glossy peaks — they should hold their shape without drooping.",
      "Sift the flour and potato starch together over the yolk mixture and fold gently with a large rubber spatula, using wide, sweeping motions from the bottom of the bowl. Before the flour is fully incorporated, add about one-third of the whites and fold in to lighten the batter.",
      "Add the remaining whites in two additions, folding with extreme gentleness to preserve every bit of air. The batter should be smooth, pale, and voluminous. Do not overmix — a few white streaks are better than a deflated batter.",
      "Pour gently into the prepared mold and smooth the top. Bake for 35–40 minutes until the cake is golden, springs back when lightly touched, and a skewer inserted in the center comes out clean.",
      "Cool in the mold on a rack for 15 minutes — no longer, or it will steam and become soggy. Invert onto the rack and cool completely. Dust very generously with powdered sugar just before serving. Serve with fresh mountain berries, jam, or a light crème anglaise."
    ]
  },

  "Bourgogne-Franche-Comté": {
    dish: "Pain d'Épices de Dijon",
    description: "Dijon's pain d'épices is not merely spiced bread — it is the edible history of a city. Since the 14th century, when the Dukes of Burgundy first received it as tribute from the spice-trade-rich Hanseatic League, it has been a Dijon obsession. True pain d'épices de Dijon uses rye flour — nutty, earthy, slightly sour — and a deep, long-aged honey (acacia or multi-floral from Burgundy's lavender and clover fields). The spice blend is ancient and complex: anise, cinnamon, ginger, cloves, nutmeg, and sometimes a whisper of cardamom or star anise. The batter rests in the mold for 24 hours before baking, a step most home cooks skip and everyone regrets. The result is a dense, dark loaf that slices cleanly, smells like winter and wine country, and keeps for two weeks wrapped in cloth. Eaten in Burgundy in thin slices spread with salted butter, layered with foie gras, or simply on its own with a glass of Burgundy's own Crème de Cassis.",
    ingredients: [
      "1 3/4 cups (220 g) rye flour",
      "1/2 cup (60 g) all-purpose flour",
      "1 cup (340 g) strong-flavored honey (buckwheat or chestnut), warmed",
      "3/4 cup (180 ml) whole milk, warmed",
      "1 tsp baking soda",
      "1 tsp baking powder",
      "1 tsp ground anise seed",
      "1 tsp ground cinnamon",
      "1/2 tsp ground ginger",
      "1/4 tsp ground cloves",
      "1/4 tsp freshly grated nutmeg",
      "1/4 tsp ground cardamom",
      "2 large eggs",
      "1/4 cup (50 g) packed brown sugar",
      "1 tsp orange zest (optional)",
      "1 tbsp unsalted butter, melted (for the pan)",
      "2 tbsp sliced almonds for the top (optional)"
    ],
    steps: [
      "The day before baking (resting is essential): Warm the honey gently in a saucepan until fluid. In a large bowl, whisk together both flours, baking soda, baking powder, and all the spices. Add the warm honey, warm milk, eggs, brown sugar, and orange zest if using. Mix until completely smooth. The batter will be thick and fragrant. Cover the bowl tightly with plastic wrap and leave at room temperature for 24 hours. This rest period allows the spices to bloom and the rye to hydrate fully, deepening flavor dramatically.",
      "The next day, preheat the oven to 325°F (165°C). Butter a 9x5-inch (23x13 cm) loaf pan and line it with parchment paper. Stir the batter once more — it will have thickened and darkened. Pour into the prepared pan and smooth the top. Scatter sliced almonds over the surface if using.",
      "Bake for 50–60 minutes until a skewer inserted in the center comes out clean and the top is a deep, burnished mahogany. The loaf will not rise dramatically — this is as it should be.",
      "Cool in the pan for 20 minutes, then unmold onto a rack. Wrap in parchment and then in a clean cloth. Let rest for at least 24 hours before cutting — the flavor and texture improve enormously. Pain d'épices keeps at room temperature for up to 2 weeks."
    ]
  },

  "Bretagne": {
    dish: "Kouign-Amann",
    description: "Kouign-Amann (kween AH-mahn — 'butter cake' in Breton) was born in 1860 in Douarnenez, created by baker Yves-René Scordia who, facing a shortage of ingredients, folded butter and sugar into bread dough and sent it to the oven. The result was accidental genius: a shatteringly caramelized, flaky, salty-sweet pastry that Brittany has never stopped making. The magic is in the conflict — bread dough fighting against layers of cold salted Breton butter (beurre de baratte demi-sel, nothing less), the sugar caramelizing on the bottom of the pan into lacquer, the dough puffing into crisp, laminated layers. The top is golden and crackles like ice; the edges are dark and bitter-sweet like toffee; the inside is soft, buttery, and yielding. Kouign-Amann is best eaten the same day, still slightly warm, in rough-torn pieces — it cannot and should not be elegant. It is Brittany on a plate: salty, honest, excessive, and unforgettable.",
    ingredients: [
      "For the dough: 2 1/4 tsp (7 g) active dry yeast, 3/4 cup (180 ml) warm water, 2 cups (250 g) bread flour, 1/2 tsp fine sea salt",
      "For the lamination: 3/4 cup (1 1/2 sticks / 170 g) cold salted Breton butter (or unsalted butter + 1/2 tsp fleur de sel), cut into thin slabs",
      "3/4 cup (150 g) granulated sugar, divided",
      "1/2 tsp fleur de sel or coarse sea salt for the top",
      "1 tbsp unsalted butter, melted, for the pan"
    ],
    steps: [
      "Make the dough: Dissolve the yeast in the warm water and let stand 5 minutes until foamy. Combine the bread flour and salt in a large bowl, add the yeast mixture, and mix to a shaggy dough. Knead on a floured surface 5–8 minutes until smooth and supple. Shape into a ball, place in a lightly oiled bowl, cover with plastic, and rise in a warm spot 1 hour until doubled.",
      "Prepare the butter: Lay the butter slabs between two sheets of parchment and beat with a rolling pin until pliable but still cold — it should bend without cracking. The butter must be workable but not soft. Refrigerate if needed.",
      "On a lightly floured surface, roll the dough into a 12-inch (30 cm) square. Lay the butter slab in the center. Scatter 1/4 cup (50 g) of the sugar over the butter. Fold the dough over the butter like an envelope, pinching all edges. Rotate 90 degrees, then roll out to a long rectangle (about 8x16 inches / 20x40 cm). Sprinkle another 1/4 cup (50 g) sugar over the dough, fold in thirds (like a letter), wrap in plastic, and refrigerate 20 minutes.",
      "Preheat the oven to 400°F (200°C). Butter a 9-inch (23 cm) round cake pan generously. Remove the dough from the fridge. Roll it out into a 10-inch (25 cm) round. Scatter the remaining 1/4 cup (50 g) sugar over the surface and press in gently. Fit the dough into the pan, folding any overhang inward. Sprinkle the top with fleur de sel. Let rest uncovered 20 minutes.",
      "Bake for 30–35 minutes until deeply golden and caramelized — the sugar will bubble and caramelize black at the edges, which is correct. The moment it comes out of the oven, run a knife around the edge and invert it onto a rack or plate immediately. Any delay and the caramel will cement to the pan. If some caramel sticks, scrape it free with a spoon and press it back. Eat the same day while still faintly warm, torn into rough pieces."
    ]
  },

  "Grand Est": {
    dish: "Kouglof Alsacien",
    description: "The Kouglof (or Kugelhopf) is the soul of Alsatian baking — a tall, turban-shaped yeasted cake with a hollow center, baked in its distinctive glazed terracotta mold, perfumed with kirsch, studded with plump raisins, and crowned with whole almonds pressed into the ridges. Its origins blur into legend — some say Marie Antoinette had one every morning; others trace it to the Three Kings of Bethlehem stopping in Ribeauvillé. What is certain is that every Alsatian household has a kouglof mold, passed down through generations, permanently stained a warm amber from decades of butter. The dough is enriched with eggs, butter, and milk, then slowly fermented — tradition demands it rise in the mold overnight in a cool cellar. The result is a crumb that is simultaneously airy and tight, soft and springy, deeply buttery. It keeps for days, improving in flavor, and is eaten at breakfast with café au lait, or in the afternoon with a glass of Alsatian Gewurztraminer.",
    ingredients: [
      "For the dough: 3 1/2 cups (450 g) all-purpose flour, 1 packet (7 g) instant yeast, 1/3 cup (65 g) granulated sugar, 1 tsp fine sea salt, 3/4 cup (180 ml) warm whole milk, 3 large eggs at room temperature, 3/4 cup (170 g) unsalted butter, softened and cubed",
      "3/4 cup (120 g) golden raisins",
      "3 tbsp kirsch (cherry brandy) or dark rum",
      "Zest of 1 lemon",
      "1/2 tsp pure vanilla extract",
      "20–25 whole blanched almonds",
      "Butter for the mold",
      "Powdered sugar for dusting"
    ],
    steps: [
      "The night before: Soak the raisins in the kirsch or rum for at least 2 hours or overnight. In a large bowl or stand mixer, combine the flour, yeast, sugar, and salt. Add the warm milk and eggs, then mix on low to bring together. Increase speed and beat 5 minutes until elastic and smooth.",
      "Add the butter piece by piece, beating after each addition until fully absorbed before adding the next — this takes patience and about 10 minutes. The dough will be very soft and sticky, pulling away from the bowl. Beat in the lemon zest, vanilla, and the soaked raisins (drained). Cover with plastic wrap and rise at room temperature 1 hour until puffed, then refrigerate overnight.",
      "The next day, butter the kouglof mold (or a large Bundt pan) very generously. Press one whole almond into each ridge at the bottom of the mold.",
      "Remove the dough from the fridge. On a lightly floured surface, shape it gently into a smooth ball. With a floured finger, poke a hole through the center. Place the ring of dough into the mold, pressing it gently to fill the ridges. Cover loosely and let rise at room temperature 2–3 hours until the dough crowns just above the mold's rim.",
      "Preheat oven to 375°F (190°C). Bake for 35–40 minutes until a deep golden brown and a skewer comes out clean. The crust should be burnished. Cool in the mold 15 minutes, then carefully invert onto a rack. Cool completely. Dust very generously with powdered sugar. Serve in thick slices with salted butter and café au lait."
    ]
  },

  "Hauts-de-France": {
    dish: "Gâteau Battu Picard",
    description: "The Gâteau Battu is Picardy's secret treasure — one of the most striking and least-known cakes in all of France. Its name means 'beaten cake,' a reference to the vigorous, almost violent mixing that gives it its extraordinary texture. It bakes in a tall, fluted cylindrical mold (traditionally a moule à gâteau battu, like a deep brioche mold) and rises to an improbable height — nearly 8 inches of soft, golden, eggy cake. Inside it is pillowy, tender, and intensely buttery, with the character of a very rich brioche crossed with a pound cake: bouncy but yielding, fragrant with vanilla and lemon. The high egg-yolk content (sometimes 10 yolks for a single cake) gives it a gorgeous saffron-yellow crumb. It is synonymous with Sunday in Picardy — sliced thick, eaten with coffee or cider, given as gifts at market. Like all great regional cakes, it is both humble and extraordinary, asking for nothing but time and good butter.",
    ingredients: [
      "2 1/4 tsp (7 g) active dry yeast",
      "1/4 cup (60 ml) warm water",
      "3 1/2 cups (450 g) all-purpose flour",
      "8 large egg yolks",
      "1 cup (200 g) granulated sugar",
      "1/2 tsp fine sea salt",
      "1/2 tsp pure vanilla extract",
      "1 tsp finely grated lemon zest",
      "1 cup (225 g) unsalted butter, softened to a creamy consistency",
      "1/4 cup (60 ml) warm whole milk",
      "Butter for the mold",
      "1 egg yolk beaten with 1 tbsp cream for glaze"
    ],
    steps: [
      "Dissolve the yeast in the warm water with a pinch of the sugar. Let stand 10 minutes until foamy. In a large bowl, combine the flour, sugar, and salt. Make a well in the center; add the egg yolks, yeast mixture, warm milk, vanilla, and lemon zest.",
      "Beat vigorously with a wooden spoon or dough hook on medium speed for 10 minutes — the dough will be very soft, almost batter-like. This beating is critical and non-negotiable. Add the softened butter in small pieces, beating thoroughly after each addition. Beat a further 10 minutes until the dough is smooth, silky, and pulls slightly from the bowl. It will be much softer than traditional bread dough.",
      "Cover and rise in a warm place 1 1/2 hours until nearly doubled. Knock back gently and then fill a well-buttered tall cylindrical mold (or two small brioche molds) to about halfway — the rise is impressive. Cover and rise again 1 hour, or until the dough reaches the top of the mold.",
      "Preheat the oven to 350°F (175°C). Brush the top gently with the egg yolk glaze. Bake for 35–40 minutes until a deep golden brown and a skewer comes out clean. The cake will have climbed impressively and look like a golden crown.",
      "Cool in the mold for 20 minutes before unmolding. The crust is slightly crisp; the interior is tender and yellow. Serve in thick slices at room temperature. It keeps well for 3 days wrapped in cloth."
    ]
  },

  "Île-de-France": {
    dish: "Paris-Brest",
    description: "The Paris-Brest was created in 1910 by pastry chef Louis Durand of Maisons-Laffitte, commissioned by cyclist Pierre Giffard to celebrate the Paris–Brest–Paris bicycle race — and its ring shape is a deliberate tribute to a bicycle wheel. It is one of the great architectural achievements of French pâtisserie: a ring of choux pastry, split and filled with praline mousseline cream — a praline-spiked pastry cream folded with mountains of soft butter, making a cream that is simultaneously light, rich, nutty, and fragrant. The top half is crowned with sliced almonds baked golden-brown, then dusted with powdered sugar. Every bite gives you the shattering crack of choux, the cool cloud of mousseline, the haunting perfume of hazelnut praline. It is best eaten the day it is assembled, when the choux still has its crispness. In Paris, it is eaten at any hour — afternoon tea, birthday, after dinner at brasserie. It is what Parisians dream of when they dream of pastry.",
    ingredients: [
      "For the choux pastry: 1/2 cup (120 ml) water, 1/2 cup (120 ml) whole milk, 1/2 cup (1 stick / 115 g) unsalted butter, 1 tsp sugar, 1/2 tsp salt, 1 cup (125 g) all-purpose flour, 4 large eggs",
      "1/4 cup (30 g) sliced almonds, for topping",
      "1 egg beaten with 1 tbsp water, for egg wash",
      "For the praline mousseline cream: 1/2 cup (75 g) whole hazelnuts or almonds (or mixed), 1/2 cup (100 g) granulated sugar, 2 tbsp water, 1 1/4 cups (300 ml) whole milk, 3 egg yolks, 1/4 cup (50 g) sugar, 3 tbsp (25 g) cornstarch, 1 cup (225 g) unsalted butter, softened",
      "Powdered sugar for dusting"
    ],
    steps: [
      "Make the praline: Toast the hazelnuts on a baking sheet at 350°F (175°C) for 10–12 minutes, then rub in a towel to remove loose skins. Cook the sugar and water in a saucepan over medium heat without stirring until a deep amber caramel. Pour over the nuts on a parchment-lined tray. Cool completely until hard. Break into pieces and blend in a food processor for 3–5 minutes until a smooth, liquid praline paste forms. Set aside.",
      "Make the pastry cream: Heat the milk to a simmer. Whisk the yolks with the sugar and cornstarch in a bowl until pale. Slowly pour the hot milk into the yolk mixture, whisking constantly. Return to the saucepan and cook over medium heat, whisking constantly, until very thick and bubbling. Cook 2 more minutes. Transfer to a clean bowl, press plastic wrap on the surface, and refrigerate until completely cold.",
      "Make the choux: Preheat oven to 400°F (200°C). Bring the water, milk, butter, sugar, and salt to a rolling boil. Add the flour all at once and stir vigorously with a wooden spoon over medium heat until the dough pulls into a ball and a film forms on the pan's bottom, about 2 minutes. Transfer to a bowl. Beat in the eggs one at a time — the dough should be smooth and pipeable, falling in a thick V from a spoon.",
      "Draw a 9-inch (23 cm) circle on a parchment-lined baking sheet. Pipe the choux in a ring along the circle using a 3/4-inch (2 cm) round tip — pipe a second ring just inside the first, then a third on top of the seam between them. Brush with egg wash, scatter almonds over the top. Bake 30–35 min until puffed, golden, and hollow-sounding when tapped. Split horizontally with a serrated knife while warm. Cool completely.",
      "Finish the mousseline: Beat the cold pastry cream until smooth. Beat the softened butter in a separate bowl until fluffy. Add the praline paste to the pastry cream and mix. Beat the pastry cream mixture into the butter gradually, beating well until light and creamy. Pipe generously into the bottom half of the choux ring using a star tip. Replace the top, dust with powdered sugar, and refrigerate 30 minutes before serving."
    ]
  },

  "Normandie": {
    dish: "Teurgoule Normande",
    description: "The Teurgoule is perhaps the most patient dessert in France. Its name in Norman dialect means 'twist the mouth' — a reference to the way it made mouths pucker with spice in the days before sugar was common. Today it is a deeply soothing, profoundly Norman thing: short-grain rice, whole milk, sugar, cinnamon, and nutmeg, combined in an earthenware pot and placed in a low oven for three to four hours. The result is not rice pudding as the world knows it — it is a slow transformation into something transcendent. The top forms a deep brown, almost lacquered crust of caramelized milk sugars and spice. Beneath it, the rice has absorbed the cream and swollen into a dense, voluptuous mass — each grain plump and suspended in a trembling, vanilla-cream matrix. Every farm in Calvados had its own earthenware teurgoule dish, scratched from years of use. It was placed in the communal bread oven as the day's bread baked, left to cook as the oven slowly cooled. It is Sunday food. It is grandmothers and cider. It is Normandy from its soul.",
    ingredients: [
      "1/2 cup (100 g) short-grain rice (use pudding rice or Arborio — do not wash it)",
      "1/2 cup (100 g) granulated sugar",
      "1 tsp ground cinnamon",
      "1/4 tsp freshly grated nutmeg",
      "Pinch of fine sea salt",
      "4 1/4 cups (1 liter) whole milk (use the best full-fat milk you can find)",
      "1/2 cup (120 ml) heavy cream",
      "1 tsp pure vanilla extract or 1 vanilla pod, split"
    ],
    steps: [
      "Preheat the oven to 300°F (150°C). This is a very low temperature — essential for the long, slow cooking that creates the crust and the texture.",
      "In a deep earthenware or ceramic oven dish (a 2-quart / 2-liter capacity, low and wide), combine the rice, sugar, cinnamon, nutmeg, and salt. Stir to mix. Pour in the milk, cream, and vanilla extract (or scrape in the vanilla seeds and add the pod). Stir gently to combine everything.",
      "Place in the oven uncovered and do not touch, stir, or open the oven for the first hour. Over 3 to 4 hours, the rice will absorb the milk, the surface will turn progressively darker — from cream to gold to brown to deep mahogany. This deep-brown crust is the goal. The low oven allows the milk sugars to caramelize slowly without burning.",
      "The teurgoule is done when the crust is a deep, glossy brown and the rice beneath is thick and creamy. A skewer inserted in the center should meet some resistance — it should be set, not liquid. Total baking time is 3 to 4 hours. If the crust is darkening too fast, lay a piece of foil loosely over the top for the last 30 minutes.",
      "Remove from the oven and cool to room temperature before serving — ideally serve it just slightly warm. The teurgoule is traditionally eaten as-is, from the baking dish, in generous spoonfuls. Serve with thick Normandy crème fraîche and, if you have it, local apple calvados for the adults."
    ]
  },

  "Nouvelle-Aquitaine": {
    dish: "Cannelés de Bordeaux",
    description: "The cannelé is Bordeaux's great mystery — a small, thimble-sized cylinder of batter baked in a fluted copper mold until it achieves one of the most extraordinary paradoxes in pastry: a shell so dark it's nearly black, thick and caramelized to a lacquered crust, encasing an interior that is soft, custardy, and trembling — perfumed with rum, vanilla, and the faint sweetness of Bordeaux wine country. Its origin is contested: some say it was created in the 17th century by the Ursuline nuns of Bordeaux using flour donated from wine producers (who used egg whites to clarify their wine, leaving mountains of unused yolks). The batter is deliberately simple — milk, eggs, flour, butter, vanilla, and dark rum — but it requires patience: 24 to 48 hours of rest in the refrigerator so the gluten relaxes and the flavors deepen. The copper molds are the secret to the crust; brushed with beeswax, they conduct heat in a way that no silicone or aluminum can replicate. In Bordeaux they are eaten at 10am with a glass of cold Sauternes, still warm, the crust just set.",
    ingredients: [
      "2 cups (480 ml) whole milk",
      "3 1/2 tbsp (50 g) unsalted butter",
      "1 vanilla bean, split and scraped",
      "1 cup (200 g) granulated sugar",
      "1 cup (125 g) all-purpose flour",
      "Pinch of fine sea salt",
      "2 large eggs",
      "2 egg yolks",
      "1/4 cup (60 ml) dark rum (Mount Gay or any quality dark rum)",
      "Beeswax (or a mix of equal parts unsalted butter and coconut oil) for brushing molds"
    ],
    steps: [
      "Heat the milk and butter with the vanilla bean and its seeds over medium heat until just below a boil. Remove from heat and let the vanilla infuse for 10 minutes. Remove the bean.",
      "In a large bowl, whisk together the flour, sugar, and salt. Make a well in the center. Add the eggs and yolks to the well and begin whisking from the center outward, gradually incorporating the flour. Pour the warm vanilla milk in a slow, steady stream, whisking constantly. Whisk until completely smooth — the batter will be quite liquid, like a crêpe batter. Stir in the rum.",
      "Transfer to a jug or pitcher with a lid, or cover the bowl with plastic wrap. Refrigerate for at least 24 hours and ideally 48 hours. This rest is non-negotiable. Do not skip it.",
      "When ready to bake, preheat the oven to 475°F (245°C) — as hot as your oven goes, at least 450°F (230°C). Melt the beeswax (or butter-coconut oil mixture) and brush every crevice of the copper molds generously. If using silicone molds, brush with melted butter.",
      "Stir the cold batter well — it will have separated; whisk it back together. Fill the molds to within 1/4 inch (5 mm) of the top. Place on a baking sheet and bake for 15 minutes at high heat, then reduce to 400°F (200°C) and bake for a further 40–50 minutes. The cannelés are done when they are very dark — a deep mahogany-black exterior. When you unmold them, the shell should ring with a hollow sound when tapped.",
      "Unmold immediately onto a rack. They must be eaten the same day, ideally within 2 hours of baking, when the exterior is crackingly crisp and the interior still tender and custardy."
    ]
  },

  "Occitanie": {
    dish: "Crème Catalane au Zeste d'Orange",
    description: "Crème Catalane is the ancient ancestor of crème brûlée, and Roussillon (the French side of Catalonia, now part of Occitanie) will tell you so plainly and with pride. Where French crème brûlée uses cream and is modern in comparison, the crème catalane uses only milk — thickened with a touch of cornstarch, which gives it a slightly firmer, more voluptuous body. Its signature perfume comes from cinnamon and citrus zest — lemon and bitter orange — boiled into the hot milk, infusing the cream with the scent of the Mediterranean coast where orange trees line the boulevards of Perpignan. The caramel top is made with a hot iron in Catalan tradition — not a blowtorch — pressing a red-hot disk of metal against the sugar to create a caramel even, amber, and slightly thicker than its French cousin. It trembles when shaken. It speaks of the coast, the garrigue, the warm Tramontane wind of the Roussillon plain, and the long afternoon light of Catalonia.",
    ingredients: [
      "2 1/2 cups (600 ml) whole milk",
      "Zest of 1 large lemon (peel it in wide strips with a vegetable peeler)",
      "Zest of 1/2 orange (peel in strips)",
      "1 cinnamon stick",
      "6 large egg yolks",
      "3/4 cup (150 g) granulated sugar",
      "2 tbsp cornstarch (Maïzena)",
      "Pinch of fine sea salt",
      "4–6 tbsp granulated or superfine sugar, for caramelizing the tops"
    ],
    steps: [
      "Combine the milk, lemon zest strips, orange zest strips, and cinnamon stick in a saucepan. Heat slowly over medium-low heat until the milk is steaming and barely simmering — do not boil. Remove from heat and let the aromatics infuse 20 minutes, then remove the zest strips and cinnamon.",
      "In a bowl, whisk the egg yolks with the sugar until pale and slightly thickened. Whisk in the cornstarch and salt. Pour the warm infused milk slowly into the egg mixture, whisking constantly to prevent curdling.",
      "Return the mixture to the saucepan and cook over medium heat, stirring constantly with a wooden spoon or silicone spatula. The cream will gradually thicken — after about 6–8 minutes it will suddenly thicken noticeably, coating the spoon heavily. Do not let it boil vigorously, but a few slow bubbles are fine. It should be the consistency of a thick pudding.",
      "Pour immediately through a fine sieve into shallow clay or ceramic ramekins (traditional Catalan dishes are wider and shallower than French ramekins). Let cool 10 minutes, then refrigerate at least 3 hours or overnight, uncovered.",
      "To serve: Sprinkle 1–1 1/2 tsp granulated sugar evenly over each crème. Caramelize with a kitchen blowtorch, moving in small circles until the entire surface is amber and bubbling. Let stand 2 minutes for the caramel to harden into a crackling shell. Tap with a spoon — it should shatter. Serve immediately."
    ]
  },

  "Pays de la Loire": {
    dish: "Gâteau Nantais au Rhum",
    description: "The Gâteau Nantais is the great cake of Nantes — a city built on the triangle trade, where sugar and rum from the Caribbean colonies of Martinique and Guadeloupe were landed at the quays of the Loire since the 17th century. The cake is its edible legacy: a dense, moist almond cake soaked with a rum glaze that seeps into every pore and glazed again on top, glistening like lacquer. The crumb is fine and tight from ground almonds — not a flour-heavy thing, but a true almandine, with the nutty fragrance of almonds cut by rum's warm sweetness. After the soak and the glaze, it is utterly itself: the Loire Valley in a slice, where the salt of the Atlantic and the sweetness of the South American sugar met and made something new. Eaten at room temperature, in thick squares, it keeps beautifully for a week, the rum deepening with each day.",
    ingredients: [
      "For the cake: 3/4 cup (170 g) unsalted butter, softened, 1 cup (200 g) granulated sugar, 3 large eggs, 1 1/2 cups (150 g) ground blanched almonds (almond flour), 3/4 cup (90 g) all-purpose flour, 1/4 tsp fine sea salt, 3 tbsp dark rum",
      "For the rum soak: 3 tbsp dark rum, 2 tbsp water, 2 tbsp granulated sugar",
      "For the rum glaze: 1 cup (120 g) powdered sugar, sifted, 2–3 tbsp dark rum, 1 tsp warm water"
    ],
    steps: [
      "Preheat the oven to 350°F (175°C). Butter and flour a 9-inch (23 cm) round cake pan or line it with parchment paper.",
      "Beat the softened butter and sugar with a mixer until very pale and fluffy, about 4 minutes. Add the eggs one at a time, beating well after each addition. Don't worry if it looks slightly curdled after the last egg — the flour will bring it together.",
      "Add the ground almonds, flour, and salt. Mix on low speed until just combined. Stir in the rum. Pour the batter into the prepared pan and smooth the top.",
      "Bake for 30–35 minutes until golden and a skewer comes out clean. The cake should not be dark on top — it should remain pale gold. While it bakes, make the rum soak: combine the rum, water, and sugar in a small saucepan and stir over medium heat just until the sugar dissolves. Remove from heat.",
      "As soon as the cake comes out of the oven, poke it all over with a skewer and brush the rum soak over the hot surface — use all of it. Let the cake cool completely in the pan on a rack.",
      "Make the glaze: Whisk the powdered sugar with enough rum and water to make a thick but pourable glaze — it should coat the back of a spoon. Unmold the cooled cake, set on a rack over a tray, and pour the glaze over the top, letting it drip down the sides. Let set at room temperature for 30 minutes. Serve in slices at room temperature."
    ]
  },

  "Provence-Alpes-Côte d'Azur": {
    dish: "Calissons d'Aix-en-Provence",
    description: "The Calisson is one of the oldest French confections still made exactly as it was in 1473, when it is said to have been presented at the wedding of King René I of Anjou to Jeanne de Laval in the city of Aix. The court confectioner ground Provence's famously sweet Entrecasteaux melons with Corsican candied citron and bitter orange peel, mixed them into almond paste made from the region's Ai variety almonds, spread the mixture on a wafer base, and glazed the top with royal icing in a snow-white sheet. Calissons are small and leaf-shaped — like the pointed oval of a Byzantine mandorla. They are simultaneously crunchy (the wafer), chewy and intensely almond-sweet (the paste), and delicately floral from the orange and melon. They are eaten at any hour in Aix, sold in wooden boxes tied with ribbon, and are presented to visiting dignitaries. Every September the Cathedral of Saint-Sauveur holds a Blessing of the Calissons, the oldest food festival in France.",
    ingredients: [
      "For the almond-fruit paste: 2 cups (200 g) ground blanched almonds or almond flour (very finely ground), 1 cup (160 g) candied melon (or candied pear), finely chopped, 2 tbsp candied orange peel, finely chopped, 1 tbsp candied citron peel (or lemon zest), finely chopped, 1 tbsp orange blossom water, 1 to 1 1/2 cups (120–180 g) powdered sugar, sifted",
      "For the royal icing: 1 egg white, 1 cup (120 g) powdered sugar, sifted, 1 tsp lemon juice",
      "Edible wafer paper (pain azyme / rice paper), to line the base"
    ],
    steps: [
      "Prepare the candied fruits: Pulse the candied melon, orange peel, and citron in a food processor until a smooth, uniform paste forms. This may take 2–3 minutes of processing — the paste should be cohesive and very finely blended.",
      "Combine the fruit paste with the ground almonds, orange blossom water, and 1 cup (120 g) powdered sugar. Mix until thoroughly combined. The paste should be firm enough to hold a shape but still pliable — add more powdered sugar if too soft or sticky. Wrap and chill 30 minutes.",
      "Line a clean surface with wafer paper (or a sheet of parchment). Roll the almond paste to a 3/8-inch (1 cm) thickness. Cut into calisson shapes using a calisson cutter (oval/marquise shape) or a small oval cookie cutter. Press each piece down gently so the wafer paper adheres. Place on a parchment-lined baking sheet.",
      "Make the royal icing: Whisk the egg white until slightly foamy. Add the powdered sugar gradually, whisking, until very smooth and thick — it should hold a ribbon and be opaque white. Add lemon juice. Spread or pipe a thin, even layer of icing over the top of each calisson. Smooth with an offset spatula.",
      "Let the calissons dry at room temperature for at least 2 hours, or preferably overnight, until the icing is completely set and matte. Trim the excess wafer paper from the base of each calisson with scissors. Store in an airtight box between layers of parchment at room temperature for up to 3 weeks."
    ]
  },

  "Guadeloupe": {
    dish: "Blanc-Manger Coco Gwadloupéyen",
    description: "Blanc-manger coco is the jewel of Antillean desserts — a silky, perfumed coconut milk panna cotta that has been chilled and shaken from its mold onto every table in Guadeloupe for generations. It wobbles magnificently. Its flavor is pure and tropical: the richness of freshly extracted coconut cream, sweetened with cane sugar, perfumed with lime zest and a whisper of vanilla, set just firm enough to unmold cleanly but trembling at every touch. In Guadeloupe it is made the night before a Sunday gathering and served at the end of a long meal of accras and colombo, when the heat of the day is finally softening. Some families spike theirs with a small glass of white rum from the distilleries of Marie-Galante; others add a pinch of cinnamon or a drop of almond extract. The mold can be any shape — a bundt ring, individual ramekins, a fish mold — but what matters is the moment of unmolding, when it slides out glistening and the room holds its breath.",
    ingredients: [
      "2 cans (13.5 oz / 400 ml each) full-fat coconut milk, shaken well",
      "1 cup (240 ml) heavy cream",
      "1/2 cup (100 g) granulated sugar (white or cane sugar)",
      "3 tsp unflavored powdered gelatin (or 3 sheets leaf gelatin)",
      "Zest of 2 limes, finely grated",
      "1 tsp pure vanilla extract",
      "1 tbsp white Guadeloupean rum or coconut rum (optional)",
      "Pinch of freshly grated nutmeg",
      "Pinch of fine sea salt",
      "For serving: fresh mango slices, passion fruit pulp, or toasted coconut flakes"
    ],
    steps: [
      "Bloom the gelatin: Sprinkle the powdered gelatin over 3 tbsp cold water in a small bowl and let sit 5 minutes until swollen and spongy. (If using leaf gelatin, soak sheets in cold water for 5 minutes, then squeeze out excess water.)",
      "Combine the coconut milk, heavy cream, and sugar in a medium saucepan over medium heat. Stir until the sugar dissolves and the mixture is just steaming — do not boil. Remove from heat.",
      "Add the bloomed gelatin to the hot coconut mixture and stir until completely dissolved. Stir in the lime zest, vanilla extract, rum if using, nutmeg, and salt. Taste — it should be fragrant, tropical, and perfectly sweet.",
      "Pour through a fine sieve into a lightly oiled 4-cup (1 liter) decorative mold, Bundt mold, or 6 individual ramekins. Cool to room temperature, then cover with plastic wrap and refrigerate at least 4 hours and ideally overnight.",
      "To unmold: Dip the mold briefly in warm (not hot) water for 10 seconds. Run a thin knife carefully around the edge. Place a serving plate over the mold and invert with one confident motion. Tap and lift the mold away. Serve surrounded by fresh mango slices, a spoon of passion fruit pulp, or a scatter of toasted coconut."
    ]
  },

  "Martinique": {
    dish: "Tourment d'Amour",
    description: "The Tourment d'Amour — 'torment of love' — is the soul pastry of Les Saintes, the small archipelago of eight tiny islands off the southern tip of Guadeloupe, fished by descendants of Breton sailors who arrived in the 17th century and never left. The legend is that island women baked these coconut-filled tartlets for the fishermen as they left on long voyages — a sweet torment, a love held in a pastry. The shell is a pale, buttery shortcrust; the filling is a dense, fragrant coconut cream made with fresh grated coconut, raw cane sugar, vanilla, and cinnamon, sometimes dotted with raisins soaked in rum. When baked, the filling sets to a chewy, caramelized coconut custard — almost like a dense coconut macaroon encased in pastry. They are sold hot from makeshift stands at the dock in Les Saintes by women who still make them from their grandmothers' recipes. The smell of coconut and warm pastry meets you as the ferry arrives.",
    ingredients: [
      "For the shortcrust: 1 1/2 cups (190 g) all-purpose flour, 1/2 cup (115 g) cold unsalted butter, cubed, 1/4 cup (50 g) sugar, 1 egg yolk, 2–3 tbsp cold water, pinch of salt",
      "For the coconut filling: 2 cups (200 g) freshly grated or desiccated coconut (unsweetened), 3/4 cup (150 g) raw cane sugar or light brown sugar, 2 eggs, 1/4 cup (60 ml) coconut milk, 1 tsp pure vanilla extract, 1/2 tsp ground cinnamon, pinch of freshly grated nutmeg, 2 tbsp dark rum, 2 tbsp raisins soaked in rum (optional)",
      "Powdered sugar for dusting (optional)"
    ],
    steps: [
      "Make the shortcrust: In a large bowl, rub the cold butter into the flour and salt with your fingertips until the mixture resembles breadcrumbs. Stir in the sugar. Add the egg yolk and enough cold water to bring the dough together — do not overwork it. Flatten into a disk, wrap, and refrigerate 30 minutes.",
      "Make the coconut filling: If using desiccated coconut, spread on a baking tray and toast at 325°F (165°C) for 5–7 minutes until lightly golden — this adds flavor. In a bowl, combine the coconut, sugar, eggs, coconut milk, vanilla, cinnamon, nutmeg, rum, and soaked raisins if using. Mix well until combined. The filling will be thick and fragrant.",
      "Preheat the oven to 375°F (190°C). Roll the chilled pastry to 3mm thickness and cut rounds to line 8–10 fluted tartlet tins (3–3.5 inch / 8–9 cm). Press the pastry in well. Fill each tartlet generously with the coconut filling — heap it slightly above the pastry rim; it will settle as it bakes.",
      "Bake for 22–28 minutes until the pastry is golden and the coconut filling is set, caramelized on top, and pulling slightly from the edges. The filling should be a deep golden brown.",
      "Cool in the tins for 10 minutes, then unmold and cool on a rack. Dust with powdered sugar if desired. Eat slightly warm — the coconut filling is at its best when still faintly warm, chewy at the edges and custardy in the center."
    ]
  },

  "Guyane": {
    dish: "Gâteau de Manioc Créole",
    description: "In French Guiana, cassava — manioc — is not just a root vegetable; it is civilizational. The indigenous Amerindian peoples of the Amazon basin, particularly the Kali'na, Teko, and Wayampi, have cultivated and transformed bitter cassava into flour, bread, and fermented drinks for millennia. The Gâteau de Manioc Créole emerged from the fusion of these Amerindian traditions with Creole cooking: freshly grated sweet cassava is combined with coconut milk, eggs, cane sugar, vanilla, and a good pour of white rum from the local rum shops of Cayenne. The result is a dense, moist, pale-gold cake with a slightly elastic crumb from the cassava starch — it is gluten-free naturally, and unlike anything made with wheat flour. The flavor is subtly earthy, deeply tropical, and perfumed with vanilla and coconut. It is made for family gatherings, sold at the Marché de Cayenne, and given as gifts.",
    ingredients: [
      "2 lbs (900 g) fresh sweet cassava (yuca), peeled — if fresh unavailable, use 3 cups / 400 g frozen grated cassava, thawed",
      "1 cup (240 ml) full-fat coconut milk",
      "3/4 cup (150 g) granulated cane sugar",
      "3 large eggs",
      "1/2 cup (115 g) unsalted butter, melted and cooled",
      "2 tbsp white rum",
      "1 tsp pure vanilla extract",
      "1/2 tsp ground cinnamon",
      "Pinch of fine sea salt",
      "Butter and flour for the pan",
      "Shredded coconut or powdered sugar for the top (optional)"
    ],
    steps: [
      "Peel the cassava and grate it finely on a box grater or in a food processor. Press the grated cassava firmly in a clean cloth or cheesecloth, twisting and squeezing to remove as much liquid as possible. The cassava should be as dry as you can get it. You should have about 3 cups of pressed cassava. (If using frozen grated cassava, thaw and squeeze dry.)",
      "Preheat the oven to 350°F (175°C). Butter and flour a 9-inch (23 cm) round cake pan or baking dish.",
      "In a large bowl, whisk together the eggs and sugar until slightly pale. Stir in the melted butter, coconut milk, rum, vanilla, cinnamon, and salt. Add the pressed grated cassava and mix thoroughly until completely combined — the batter will be thick and slightly stringy from the cassava.",
      "Pour into the prepared pan and smooth the top. Scatter a thin layer of shredded coconut over the surface if desired.",
      "Bake for 45–55 minutes until the top is golden, the edges are pulling away from the pan, and a skewer inserted in the center comes out clean. The cake will be firm to the touch. Cool in the pan for 20 minutes before unmolding. Serve at room temperature in thick slices."
    ]
  },

  "La Réunion": {
    dish: "Gâteau Banane Vanille Réunionnais",
    description: "Réunion is one of the only places on earth where vanilla grows wild — the island is home to the Bourbon vanilla variety, the world's most prized, and it perfumes everything from the morning coffee to the evening dessert. The Gâteau Banane Réunionnais is what happens when overripe plantains (the fat, starchy, very sweet bananes figue or bananes créoles that grow everywhere on the island) meet a generous pour of Réunion's own rhum arrangé (rum infused with spices, vanilla, and tropical fruits) and the island's signature Bourbon vanilla. The result is a dense, incredibly moist, deeply fragrant cake — the banana making it luxuriously soft and sweet, the vanilla layered in long, perfumed notes, the rum a warm backbone. It is eaten after Sunday lunch in the family home, the shuttered cool of the veranda, the smell of vanilla and rum in the air, the view of the Piton de la Fournaise volcano in the distance.",
    ingredients: [
      "4 very ripe bananas (about 1 1/2 cups / 340 g mashed) — the riper and blacker the better",
      "1/2 cup (115 g) unsalted butter, melted",
      "3/4 cup (150 g) granulated sugar",
      "2 large eggs",
      "1 tsp pure Bourbon vanilla extract (or scrape 1 whole Bourbon vanilla bean)",
      "1/4 cup (60 ml) rhum agricole or dark rum",
      "1 1/2 cups (190 g) all-purpose flour",
      "1 tsp baking powder",
      "1/2 tsp baking soda",
      "1/2 tsp ground cinnamon",
      "Pinch of freshly grated nutmeg",
      "Pinch of fine sea salt",
      "3 tbsp desiccated coconut (optional, for the top)"
    ],
    steps: [
      "Preheat the oven to 350°F (175°C). Butter and flour a 9x5-inch (23x13 cm) loaf pan or a 9-inch (23 cm) round cake pan.",
      "Mash the bananas thoroughly with a fork in a large bowl until smooth — a few small lumps are fine. Whisk in the melted butter, sugar, eggs, vanilla, and rum until well combined.",
      "Whisk together the flour, baking powder, baking soda, cinnamon, nutmeg, and salt in a separate bowl. Add the dry ingredients to the banana mixture and fold gently with a spatula until just combined — do not overmix.",
      "Pour into the prepared pan. Scatter the desiccated coconut over the top if using.",
      "Bake for 50–60 minutes (loaf) or 40–45 minutes (round) until a skewer inserted in the center comes out clean and the top is a deep golden brown. If the top browns too quickly, tent loosely with foil after 30 minutes.",
      "Cool in the pan on a rack for 15 minutes, then unmold. Serve at room temperature — the flavor is best 4–6 hours after baking when the rum and vanilla have fully bloomed. Keeps beautifully for 3 days wrapped at room temperature."
    ]
  },

  "Mayotte": {
    dish: "Mkatra Foutra",
    description: "Mkatra Foutra is the traditional Mahorais rice cake — one of the oldest and most sacred sweets of the Comoros archipelago, shared between Mayotte and its neighboring Comoran islands. The name means 'bread cooked on a griddle' in Comorian, and it is precisely that: a yeasted rice-flour cake cooked slowly in a covered skillet or over low coals, fragrant with coconut milk and a whisper of cardamom. Its texture is unique — somewhere between a dense pancake and a steamed bun, with a slightly chewy, springy crumb from the rice flour. In Mayotte it is made for Eid al-Fitr and for the Friday gathering after Jumaa prayer, brought warm to the mosque wrapped in banana leaves. The best version uses freshly extracted coconut milk from Mayotte's fat island coconuts. It is a communal food — made in large batches, shared across a woven mat, eaten with sweet tea or mango jam. It carries the smell of the Indian Ocean, the warmth of coconut and cardamom, and the quiet celebration of togetherness.",
    ingredients: [
      "2 cups (250 g) rice flour",
      "2 tsp instant yeast",
      "1/2 cup (100 g) granulated sugar",
      "1 can (13.5 oz / 400 ml) full-fat coconut milk, shaken",
      "1/4 cup (60 ml) warm water",
      "2 large eggs",
      "1 tsp ground cardamom",
      "Pinch of fine sea salt",
      "2 tbsp sesame seeds (optional, for the top)",
      "Neutral oil or coconut oil for cooking"
    ],
    steps: [
      "In a large bowl, combine the rice flour, yeast, sugar, cardamom, and salt. Make a well in the center. Add the coconut milk, warm water, and eggs to the well.",
      "Whisk from the center outward until you have a smooth, thick batter — similar to a very thick pancake batter. It will be slightly grainy from the rice flour. Cover with a clean cloth and let rise in a warm place for 1 to 1.5 hours, until the batter is puffed and bubbly on top.",
      "Heat a 10-inch (25 cm) heavy skillet (cast iron or nonstick) over medium-low heat. Brush with a thin layer of coconut oil.",
      "Stir the batter gently. Pour about 3/4 cup of batter into the skillet and spread to a round about 8 inches (20 cm) in diameter. Scatter a few sesame seeds over the top if using. Cover the pan tightly with a lid.",
      "Cook over low heat for 10–15 minutes until the top is completely set, the edges are cooked through, and the bottom is golden-brown with a faint crisp crust. Do not flip — the steam from the lid cooks the top. Slide carefully onto a plate.",
      "Repeat with remaining batter, oiling the pan lightly between cakes. Serve warm, cut in wedges, with strong sweet Comorian tea, fresh mango, or a spoon of local honey."
    ]
  }
};

// Apply desserts to FRA regions
Object.keys(franceDesserts).forEach(regionName => {
  if (data['FRA'].regions[regionName]) {
    data['FRA'].regions[regionName].dessert = franceDesserts[regionName];
    console.log('✓ Added dessert for FRA/' + regionName + ': ' + franceDesserts[regionName].dish);
  } else {
    console.log('✗ Region not found: ' + regionName);
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n✅ France desserts written successfully!');
