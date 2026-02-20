const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/recipes.json');
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);

const spainDesserts = {
  "Andalucia": {
    dish: "Pestiños Andaluces con Miel",
    description: "Pestiños are the ancient sweet of Andalucía — small, honey-glazed fried pastries perfumed with sesame, anise, and orange that trace their origin to the Moorish al-Andalus of the 9th century. They appear on every Andalusian table during Semana Santa and Christmas, fried in olive oil (never sunflower) until they puff and crisp, then dunked while still hot in warm honey thinned with a splash of orange juice or orange blossom water. The word may derive from the Arabic 'pestis' (pressed), a reference to the folding technique that creates their characteristic rectangular shape. The dough contains wine — traditionally fino sherry or dry white — which evaporates during frying to leave the pastry impossibly light. Every family has its own proportion of anise to sesame; every grandmother insists hers is the one true recipe. Eaten hot, standing over the stove while the honey drips from your fingers and clings to your chin, watching the olive groves through the kitchen window, they are the taste of Andalucía in its most elemental form.",
    ingredients: [
      "For the dough: 2 cups (250 g) all-purpose flour, plus more for dusting",
      "1/3 cup (80 ml) good olive oil (mild, not too peppery)",
      "1/3 cup (80 ml) dry white wine or fino sherry",
      "2 tbsp sesame seeds, toasted",
      "1 tsp anise seeds, lightly crushed",
      "Zest of 1 orange, finely grated",
      "1/2 tsp ground cinnamon",
      "Pinch of fine sea salt",
      "Olive oil for deep-frying (about 2 cups / 480 ml)",
      "For the honey glaze: 1/2 cup (170 g) mild honey (orange blossom or acacia), 2 tbsp fresh orange juice or orange blossom water",
      "Ground cinnamon and sesame seeds for garnish"
    ],
    steps: [
      "Heat the olive oil in a small saucepan over medium heat. Add the sesame seeds and anise seeds; fry gently for 1 minute until fragrant but not brown. Add the orange zest and cinnamon; stir 30 seconds. Remove from heat and let the spiced oil cool slightly — about 5 minutes.",
      "Place the flour and salt in a large bowl. Pour in the warm spiced olive oil and the wine. Mix with a fork, then knead gently in the bowl until a smooth, soft, non-sticky dough forms — about 3 minutes. Do not over-knead. Cover with plastic wrap and rest 30 minutes at room temperature.",
      "Lightly flour your work surface. Roll the dough very thin — about 2mm, like pasta. Cut into rectangles about 3x4 inches (8x10 cm). Fold each rectangle: bring both short ends toward the center, overlapping slightly, and press the center firmly to seal — this creates the characteristic package shape. Press the sealed side against the work surface to flatten slightly.",
      "Heat 2 inches (5 cm) of olive oil in a heavy-bottomed pot to 350°F (175°C). Fry the pestiños in batches, sealed-side down first, for 2–3 minutes per side until golden and crisp. Drain on paper towels. While still hot, transfer to a clean dish.",
      "Warm the honey with the orange juice in a small saucepan until fluid and runny. Pour the warm honey over the hot pestiños, turning to coat all sides. Alternatively, dip each pestiño individually in the warm honey. Scatter sesame seeds and a dusting of cinnamon over the top. Serve immediately while the honey is still warm and glossy."
    ]
  },

  "Aragon": {
    dish: "Frutas de Aragón",
    description: "Frutas de Aragón are the jewels of Aragonese confectionery — whole candied fruits from Aragon's famous orchards (peaches from Calanda, cherries from the Jiloca valley, oranges from the Ebro basin, pears, figs, plums) encased in a thick shell of bitter dark chocolate. They are the most formal, precise, and beautiful sweet of the region, made by the master confectioners of Zaragoza, protected by a Denominación de Origen. The technique is ancient: whole fruits or large pieces are candied slowly over days in progressively stronger sugar syrups until every drop of moisture is replaced by sugar, preserving them indefinitely while giving them a translucent, jewel-like quality. Then they are enrobed in couverture chocolate — at least 60% cacao — which contracts around the fruit as it cools, creating a shell that cracks cleanly and gives way to the intensely sweet, perfumed fruit within. The contrast is perfect: bitter, snapping dark chocolate and concentrated fruit sweetness, a single bite that contains all of Aragon's orchards and the memory of its Moorish candy-makers.",
    ingredients: [
      "For the candied fruit: 1 lb (450 g) firm whole fruits or large pieces — peaches, pears, apricots, cherries, or orange peel; all peeled or prepared as appropriate",
      "3 cups (600 g) granulated sugar for the first syrup",
      "3 cups (720 ml) water",
      "Additional sugar for successive syrups (about 4 more cups / 800 g total over 5 days)",
      "For the chocolate coating: 12 oz (340 g) high-quality dark chocolate (60–70% cacao), finely chopped",
      "1 tsp neutral vegetable oil or cocoa butter"
    ],
    steps: [
      "Day 1 — first syrup: Dissolve 3 cups sugar in 3 cups water in a saucepan, bring to a boil, then cool to 140°F (60°C). Place prepared fruit in a non-reactive container (glass or ceramic). Pour the warm syrup over the fruit. Weigh down with a small plate to keep fruit submerged. Cover and rest 24 hours.",
      "Days 2–5 — building the syrup: Each day, drain the syrup into a saucepan. Add 3/4 cup (150 g) additional sugar per cup of syrup. Bring to a boil, dissolve completely, cool to 140°F (60°C), pour back over the fruit. The syrup grows progressively more concentrated each day. By day 5, the fruit should be firm, translucent-looking, and very sweet. Drain completely and dry the fruit on a rack for 1–2 days until the surface is dry and slightly tacky but not wet.",
      "Temper the chocolate: Melt two-thirds of the chocolate in a double boiler to 115°F (46°C). Remove from heat. Add the remaining third, stirring constantly, until the temperature drops to 88–90°F (31–32°C). The chocolate is tempered when it coats a knife cleanly and begins to set with a slight sheen within 5 minutes at room temperature. Stir in the vegetable oil.",
      "Enrobe the fruit: Using a dipping fork or two forks, dip each piece of candied fruit into the tempered chocolate, letting excess drip off. Place on a parchment-lined tray. If the chocolate starts to thicken, warm briefly over a double boiler and re-temper.",
      "Allow the chocolate to set completely at cool room temperature (65–68°F / 18–20°C) for at least 1 hour — do not refrigerate or the chocolate will bloom. Store in a cool, dry place in an airtight tin between layers of parchment for up to 3 weeks."
    ]
  },

  "Asturias": {
    dish: "Arroz con Leche Asturiano",
    description: "Arroz con leche is made all over Spain, but Asturias has made it its own to the point of obsession and culinary identity. The Asturian version is thicker, creamier, and richer than any other Spanish rice pudding — and it finishes with a technique borrowed from the other side of the Pyrenees: a thin crust of sugar is caramelized on top with a red-hot iron, exactly like a crème brûlée, creating a brittle amber sheet over the cream below. The secret of Asturian arroz con leche is time and fat: the rice must cook slowly in whole milk from Asturian cows (the raza frisona of the mountain valleys, their milk uniquely rich), absorbing the milk over 45 to 60 minutes, stirred constantly with a wooden spoon until the starch thickens the milk into a cream almost the consistency of a thick custard. Lemon zest and cinnamon perfume it. The butter added at the end gives it a silky finish that lingers. Served cold with that crackled cinnamon-sugar top, it is the taste of a rainy Sunday afternoon in Oviedo, the fireplace going, the cider breathing in the glass.",
    ingredients: [
      "1 cup (200 g) short-grain white rice (Arborio or Spanish bomba rice)",
      "4 cups (960 ml) whole milk, plus more if needed",
      "1 cup (240 ml) heavy cream",
      "3/4 cup (150 g) granulated sugar",
      "Peel of 1 lemon (removed in a single spiral with a vegetable peeler)",
      "1 cinnamon stick",
      "2 tbsp unsalted butter",
      "Pinch of fine sea salt",
      "4–6 tbsp granulated sugar for caramelizing the top",
      "Ground cinnamon for dusting"
    ],
    steps: [
      "Rinse the rice under cold water and drain. Combine the rice, milk, cream, lemon peel, cinnamon stick, and salt in a heavy-bottomed saucepan (ideally a wide, low pot for even cooking). Bring to a gentle boil over medium heat, stirring frequently.",
      "Reduce heat to low. Cook, stirring continuously and gently with a wooden spoon, for 40–50 minutes. The milk will gradually absorb into the rice; if at any point it looks too thick before the rice is tender, add a splash of warm milk. The rice should be fully tender and the mixture very thick — it should fall slowly from the spoon and hold its shape briefly when poured. This long cooking cannot be rushed.",
      "Remove the lemon peel and cinnamon stick. Stir in the sugar and cook 5 more minutes, stirring, until the sugar dissolves and the mixture thickens further. Remove from heat and stir in the butter until melted and glossy.",
      "Pour into individual shallow ceramic ramekins or one large dish to a depth of about 1 inch (2.5 cm). Smooth the surface. Let cool to room temperature, then refrigerate at least 2 hours or overnight.",
      "To serve: Dust the surface of each dish with a thin, even layer of ground cinnamon. Sprinkle 1–1.5 tsp of granulated sugar evenly over the cinnamon. Caramelize with a kitchen blowtorch, moving in small circles until the entire surface is an even amber caramel and crackling. Wait 2 minutes for the sugar to harden into a brittle shell. Serve immediately — the contrast between cold, creamy rice and hot caramel crust is the entire point."
    ]
  },

  "Baleares": {
    dish: "Ensaimada Mallorquina",
    description: "The Ensaimada is Mallorca's edible emblem, recognized across Spain and beyond by its extraordinary form: a large spiral coil of airy, featherweight brioche-like dough, brushed with lard (saïm in Catalan — hence the name), coiled into a snail shape, and baked to a pale gold. It is then buried under an avalanche of powdered sugar so generous it creates a white snowfield on the bakery counter. The dough is made with eggs, sugar, flour, and water — no butter, which would interfere with the lard's unique effect. The lard creates lamination without crunch — soft, yielding, layered gossamer sheets that uncoil as you pull it apart. Mallorca's ensaimadas come plain (llisa) or filled: cabello de ángel (strands of candied spaghetti squash), custard cream, sobrasada sausage for the savory-sweet, or dark chocolate. They are flown in sealed cardboard hat-boxes from Palma airport as gifts for the mainland — the first thing every Mallorquín carries home after a trip away.",
    ingredients: [
      "For the starter: 1 tsp instant yeast, 3 tbsp warm water, 3 tbsp (25 g) all-purpose flour, 1 tsp sugar",
      "For the dough: 3 cups (375 g) all-purpose flour, 1/2 cup (100 g) granulated sugar, 2 large eggs plus 1 egg yolk, 1/3 cup (80 ml) warm water, 1/4 tsp fine sea salt",
      "1/2 cup (115 g) high-quality lard (manteca de cerdo), softened to a creamy consistency — do not substitute butter",
      "Powdered sugar for an extremely generous final dusting"
    ],
    steps: [
      "Make the starter: Combine the yeast, warm water, flour, and sugar. Mix until smooth. Cover and let rest 20 minutes until bubbly.",
      "In a stand mixer with a dough hook, combine the flour, sugar, and salt. Add the eggs, egg yolk, warm water, and the starter. Mix on low 3 minutes, then medium-high for 8–10 minutes until the dough is smooth, elastic, and slightly tacky but not sticky. It should pull cleanly from the bowl sides. Wrap and refrigerate 30 minutes.",
      "On a lightly floured surface, roll the dough as thin as possible — ideally less than 2mm, almost translucent, like a large sheet of pasta. Spread the softened lard over the entire surface of the dough in a thin, even layer, reaching the edges. Roll the dough up tightly into a long sausage, stretching it gently as you roll to make it as long and thin as possible.",
      "Coil the rope into a loose snail-spiral on a parchment-lined baking sheet, leaving space for expansion. The center should be raised slightly higher. Cover loosely and let rise at room temperature for 8–12 hours (traditionally overnight) until the coil has puffed dramatically and looks airy and voluminous.",
      "Preheat the oven to 375°F (190°C). Bake for 18–22 minutes until pale golden — it should not be dark. The interior stays very soft. Cool completely on a rack. Then dust enormously with powdered sugar — use at least 1/4 cup (30 g) per medium ensaimada, sifted over the entire surface until it creates a thick white layer. Serve the same day, ideally within hours of baking."
    ]
  },

  "Canarias": {
    dish: "Bienmesabe Canario",
    description: "Bienmesabe — 'it tastes good to me' — is the most loved dessert sauce in the Canary Islands, a thick, fragrant, honey-almond cream that is simultaneously ancient and simple. The name appears first in 16th-century Canarian records, though a version was already known in Arab-influenced Sicilian and Andalusian cooking under the name 'biancomangiero.' The Canarian version is pure and austere: raw almonds ground to a paste, mixed with local miel de palma (palm honey — the dark, rum-scented syrup extracted from Canarian date palms) or orange blossom honey, egg yolks, lemon zest, and a generous pour of ron miel — the sweet honey rum of the Canaries, dark gold and aromatic. The mixture is cooked gently until it thickens to a texture like warm pastry cream — voluptuous, glossy, clinging to the spoon. It is served warm or at room temperature over vanilla ice cream, on fresh fruit, spooned over almond cake, or eaten directly from the bowl with a spoon, which is the most honest way.",
    ingredients: [
      "2 cups (200 g) raw blanched almonds",
      "1 cup (340 g) local dark honey (miel de palma if available, or dark buckwheat honey)",
      "4 large egg yolks",
      "Zest of 1 lemon, finely grated",
      "1/2 tsp ground cinnamon",
      "2 tbsp ron miel canario (Canarian honey rum) or dark rum",
      "1/2 cup (120 ml) water",
      "Pinch of fine sea salt",
      "Toasted almond flakes and a dusting of cinnamon for serving"
    ],
    steps: [
      "Toast the almonds in a dry skillet over medium heat for 4–5 minutes, tossing often, until golden and fragrant. Cool completely. Transfer to a food processor and grind to a fine powder — then continue processing until a smooth almond paste begins to form, about 3–4 minutes total. The paste should be fine and slightly oily.",
      "In a medium heavy-bottomed saucepan, combine the honey and water. Heat over medium-low heat, stirring, until the honey dissolves and the mixture is warm.",
      "In a bowl, whisk the egg yolks until smooth. Slowly pour about half the warm honey mixture into the yolks, whisking constantly (this tempers the eggs). Pour the tempered yolk mixture back into the saucepan with the remaining honey.",
      "Add the ground almond paste, lemon zest, cinnamon, and salt. Cook over medium-low heat, stirring constantly with a wooden spoon, for 8–12 minutes until the mixture thickens to the consistency of a thick custard sauce — it should coat the back of the spoon heavily and leave a clear line when you drag your finger across it.",
      "Remove from heat and stir in the ron miel. Taste — it should be intensely almond-sweet, warm with honey, and lightly spiced. Cool slightly. Serve warm over vanilla ice cream with toasted almond flakes and a dusting of cinnamon, or store covered in the refrigerator for up to 5 days (it thickens further when cold)."
    ]
  },

  "Cantabria": {
    dish: "Quesada Pasiega",
    description: "The Quesada Pasiega is the definitive sweet of the Pasiegos — the mountain people of the Valles Pasiegos in Cantabria, famous for their extraordinary dairy cattle and the quality of their milk, butter, and fresh cheese. This is a custard tart of great simplicity and great depth: fresh requesón (or ricotta) from the mountain creameries, mixed with eggs, sugar, butter, flour, and lemon zest, poured into a mold and baked slowly until set. It looks unassuming — a pale, flat, quivering tart. But the texture is startling: it sits between a baked cheesecake and a flan, with a crumb-free base and a cream that is simultaneously dense and trembling, rich with butter and cheese, fragrant with lemon. The quesada needs no base, no crust — it is the filling itself that is the point. Every October, Selaya in Cantabria holds a Feria de la Quesada Pasiega, and the competition for the best recipe is as serious as any in Spain.",
    ingredients: [
      "2 cups (500 g) fresh requesón or whole-milk ricotta, at room temperature",
      "1 cup (200 g) granulated sugar",
      "4 large eggs",
      "1/2 cup (115 g) unsalted butter, melted and slightly cooled",
      "1/2 cup (60 g) all-purpose flour",
      "Zest of 2 lemons, finely grated",
      "1 tsp pure vanilla extract",
      "Pinch of fine sea salt",
      "Ground cinnamon for the top",
      "Butter for the baking dish"
    ],
    steps: [
      "Preheat the oven to 350°F (175°C). Butter a 9-inch (23 cm) square baking dish or a 10-inch (25 cm) round ceramic dish generously.",
      "If using ricotta, press it through a fine sieve to remove excess moisture and make it very smooth. In a large bowl, beat the requesón or sieved ricotta with the sugar until completely smooth and creamy — use a whisk or electric beater.",
      "Beat in the eggs one at a time, mixing well after each addition. Beat in the melted butter, then the flour, lemon zest, vanilla, and salt. Mix until everything is perfectly smooth and combined — there should be no lumps.",
      "Pour the batter into the prepared dish. Dust the surface generously with ground cinnamon.",
      "Bake for 40–50 minutes until the top is golden-amber and the center is set — it should tremble only very slightly in the center when shaken. A skewer inserted in the middle should come out clean or with very few moist crumbs.",
      "Cool completely in the dish on a rack — do not serve hot, as the texture sets as it cools. The quesada is best served at room temperature or slightly chilled. Cut into squares or wedges. Dust with more cinnamon if desired."
    ]
  },

  "Castilla-La Mancha": {
    dish: "Mazapán de Toledo",
    description: "Toledo has been making mazapán since the 12th century, and the Convent of San Clemente — whose nuns still make and sell it through a wooden wheel in the convent wall, without ever showing their faces — may be the oldest continuously operating sweet shop in the world. Toledo's mazapán is simply two ingredients: almonds and sugar. That is all. The city's almonds, grown in the dry dehesa landscapes of Castilla-La Mancha under a brutal sun that concentrates their oil and perfume, are ground with an equal weight of fine sugar and a few drops of water to form a paste of extraordinary richness. The ratio is sacred: one part almond, one part sugar, exactly. The paste is kneaded and shaped — traditionally into figures: little figures of saints, swans, fruits, crowns — then briefly toasted under a grill to create a barely-there browned surface. The interior remains white, moist, soft, and yielding. Toledo mazapán tastes of almond and nothing else — intensely, purely, transcendently almond.",
    ingredients: [
      "2 cups (200 g) blanched almonds (the best quality you can find — Marcona almonds from La Mancha are ideal)",
      "1 cup (200 g) granulated sugar",
      "1/4 cup (60 ml) water",
      "1 tsp orange blossom water (optional but traditional)",
      "1 egg yolk beaten with 1 tsp water for glazing",
      "Powdered sugar for dusting your hands while shaping"
    ],
    steps: [
      "Blanch the almonds if not already blanched: cover with boiling water for 1 minute, drain, slip off the skins, and spread on a tray to dry completely. If using pre-blanched almonds, ensure they are very dry.",
      "Make the sugar syrup: Combine the granulated sugar and water in a small saucepan. Heat over medium heat, stirring until the sugar dissolves, then cook without stirring to the soft-ball stage — 240°F (115°C) on a thermometer.",
      "While the syrup cooks, grind the almonds in a food processor to a very fine powder. Run the machine 3–4 minutes until the mixture begins to cake and looks like very fine, slightly oily crumbs.",
      "Pour the hot sugar syrup over the ground almonds in the food processor (or in a heavy-duty stand mixer). Add the orange blossom water. Mix/pulse until the mixture comes together into a cohesive paste that pulls away from the sides. The paste will be warm. Tip onto a clean work surface and knead briefly until smooth. If too sticky, knead in a little powdered sugar. Wrap in plastic wrap and rest at room temperature 1 hour.",
      "Preheat the broiler to high. Shape the marzipan into traditional Toledan figures — fruits, small animals, crowns, or simply ovals and cylinders — about 1 inch (2.5 cm) in size. Place on a parchment-lined baking sheet. Brush very lightly with egg yolk glaze.",
      "Broil 2–4 minutes until just lightly golden on the surface — watch carefully, they burn quickly. Cool on the tray. Store in an airtight tin, separated by parchment, at room temperature for up to 2 weeks."
    ]
  },

  "Castilla-Leon": {
    dish: "Yemas de Santa Teresa de Ávila",
    description: "The Yemas de Santa Teresa are among the most poetic sweets in all of Spain: small, golden-yellow balls of pure egg yolk and sugar, encased in a thin shell of crystallized sugar, said to have been first made by the Carmelite nuns of Ávila in the 16th century as a sweet offering at the feast of their patron Saint Teresa. The nuns were practical: the convents of Ávila used enormous quantities of egg whites to clarify their wines and to varnish paintings, leaving mountains of unused yolks. Sweet recipes for excess yolks — the tradition of convent sweets (dulces conventuales) — spread across Spain from convent to convent. The Yemas are the finest expression of this tradition: just egg yolks, cooked with sugar syrup to a thick, trembling paste, rolled while still warm into balls, and rolled in fine granulated sugar or encased in fondant. They taste of pure egg and pure sugar — rich, compact, and golden as the walls of Ávila.",
    ingredients: [
      "12 large egg yolks",
      "1 1/2 cups (300 g) granulated sugar",
      "1/2 cup (120 ml) water",
      "Zest of 1/2 lemon, finely grated (optional)",
      "1/2 tsp pure vanilla extract (optional)",
      "Granulated sugar for rolling (about 1/4 cup / 50 g)",
      "Powdered sugar for dusting hands"
    ],
    steps: [
      "Pass the egg yolks through a fine sieve into a large heatproof bowl. This removes the chalaza and any egg-white threads, ensuring perfect smoothness.",
      "In a small saucepan, combine the sugar and water. Cook over medium heat, stirring until the sugar dissolves, then cook without stirring to the thread stage — 230°F (110°C) on a candy thermometer. Remove from heat.",
      "Pour the hot sugar syrup in a thin stream over the sieved egg yolks, whisking constantly and vigorously to prevent scrambling. The mixture will be fluid and yellow. Transfer to a double boiler (a bowl set over barely simmering water — the bowl should not touch the water).",
      "Cook in the double boiler, stirring constantly with a wooden spoon or spatula, for 15–25 minutes. The mixture will gradually thicken from a liquid to a thick paste that pulls away from the sides of the bowl and holds its shape when scooped. Do not rush this step with too much heat. Stir in lemon zest and vanilla if using.",
      "Remove from heat and cool the paste to room temperature — it will firm up further. Once cool enough to handle, dust your hands with powdered sugar and roll tablespoon-sized portions into smooth balls. Roll each ball in granulated sugar to coat completely.",
      "Place in small paper cups (like those used for bonbons) if available, or on a parchment-lined tray. Allow to set at room temperature for 1–2 hours — a thin crystallized crust will form. Store in a single layer in an airtight tin at cool room temperature for up to 1 week."
    ]
  },

  "Cataluña": {
    dish: "Crema Catalana",
    description: "Let the French have their crème brûlée — Catalonia will tell you, without raising its voice, that it did this first. Crema Catalana appears in the Llibre de Sent Soví, the oldest Catalan cookbook, in 1324 — centuries before the French version was documented. The differences are real and matter: Crema Catalana is made with milk, not cream, and thickened with cornstarch and egg yolks — giving it a looser, more silky body than its richer French cousin. It is perfumed exclusively with cinnamon and citrus zest (lemon and orange), simmered in the hot milk until it turns fragrant, then strained out. The caramel crust is made traditionally with a hierro — a flat iron disk on a long handle, heated red-hot over fire or stove and pressed against the sugar to caramelize it in an instant, without the blowtorch. Every March 19 (Sant Josep, Father's Day in Catalonia) it appears on every Catalan table. It is the dessert of a people who know exactly who they are.",
    ingredients: [
      "2 1/2 cups (600 ml) whole milk",
      "1 cinnamon stick",
      "Zest of 1 lemon (peel in wide strips with a vegetable peeler)",
      "Zest of 1/2 orange (peel in strips)",
      "6 large egg yolks",
      "3/4 cup (150 g) granulated sugar",
      "2 1/2 tbsp cornstarch (Maïzena)",
      "Pinch of fine sea salt",
      "4–6 tsp granulated sugar (for the caramel top — 1 tsp per ramekin)"
    ],
    steps: [
      "Combine the milk, cinnamon stick, lemon zest, and orange zest in a saucepan. Heat over medium-low heat until steaming and just about to simmer. Remove from heat and infuse for 20–30 minutes. Strain out the aromatics.",
      "In a large bowl, whisk the egg yolks with the sugar until pale and creamy. Whisk in the cornstarch and salt until smooth — the mixture should be thick and free of lumps.",
      "Reheat the infused milk to steaming. Pour very slowly into the egg yolk mixture, a thin stream at first, whisking constantly. This tempering step is essential to prevent scrambling.",
      "Return the entire mixture to the saucepan over medium-low heat. Cook, stirring constantly with a flexible spatula, reaching all corners of the pan, until the cream thickens and begins to bubble — about 8–12 minutes. It should be the consistency of a medium-thick pastry cream. Do not walk away.",
      "Pour immediately through a fine sieve into 4–6 shallow terracotta or ceramic dishes (the traditional wide, shallow shape is important for the maximum caramel surface area). Smooth the surface. Cool to room temperature then refrigerate uncovered at least 3 hours.",
      "To serve: Sprinkle exactly 1 tsp granulated sugar evenly over each cream. Caramelize immediately with a blowtorch or traditional heated iron, working in small circles until the entire surface is amber and bubbling. Let set 1–2 minutes. The crust should shatter at the tap of a spoon. Serve immediately."
    ]
  },

  "Ceuta": {
    dish: "Ka'ab El Ghzal de Ceuta",
    description: "In Ceuta — that remarkable Spanish city on the northern tip of Africa where Andalusian baroque churches stand alongside mosques, and Spanish and Moroccan cultures have coexisted for centuries — the sweet table belongs to the tradition of the Rif Berbers, the Moroccan Andalusians, and the Sephardic Jews who all called this crossroads home. Ka'ab el Ghzal, 'gazelle horns' in Arabic, are the most refined pastry of this tradition: crescent-shaped pastries of very thin, pliable dough filled with a fragrant almond paste perfumed with orange blossom water, cinnamon, and mastic gum, twisted at both ends into the elegant horns of a gazelle, then baked pale gold and cooled. Some versions are glazed with icing sugar; the Ceuta tradition keeps them plain, brushed with orange blossom water for fragrance, then rolled in icing sugar to create a snow-white exterior. They are eaten at Eid, at weddings, at baptisms — at any gathering where sweetness and beauty are required to mark a moment.",
    ingredients: [
      "For the almond filling: 2 cups (200 g) blanched almond flour or ground almonds, 1 cup (120 g) powdered sugar, 2 tbsp orange blossom water, 1/2 tsp ground cinnamon, 1/4 tsp ground mastic (or 1/4 tsp vanilla extract), 1 tbsp unsalted butter, softened",
      "For the pastry: 2 cups (250 g) all-purpose flour, 1/4 cup (60 ml) warm water, 2 tbsp orange blossom water, 2 tbsp unsalted butter, melted, pinch of salt",
      "1 egg white, lightly beaten, for sealing",
      "Orange blossom water for brushing",
      "Powdered sugar for coating"
    ],
    steps: [
      "Make the almond filling: Combine the ground almonds, powdered sugar, orange blossom water, cinnamon, and mastic in a bowl. Add the softened butter and mix with your hands until a smooth, cohesive paste forms. If too dry, add a few drops more orange blossom water. Roll into small logs about 2 1/2 inches (6 cm) long and 1/2 inch (1.5 cm) in diameter. There should be 20–24 logs. Refrigerate until needed.",
      "Make the pastry: Combine the flour and salt. Add the melted butter, orange blossom water, and warm water. Mix to form a dough; knead 5 minutes until smooth and elastic. Wrap and rest 30 minutes.",
      "Preheat the oven to 350°F (175°C). Roll the pastry very thin — 1mm — on a lightly floured surface. Cut into rectangles about 4x3 inches (10x8 cm).",
      "Place an almond log along the long edge of a pastry rectangle. Roll up the pastry tightly around the filling, pinching and sealing the long edge with egg white. Twist each end gently to seal, then curve the roll into a crescent shape (like a gazelle's horn) by bending it slightly over your thumb. Pinch and thin the pointed ends.",
      "Place on a parchment-lined baking sheet and bake for 15–18 minutes — they should be very pale gold, not brown. Overbaking destroys their delicacy.",
      "While still warm, brush with orange blossom water. Once cooled, roll generously in powdered sugar. Store in a single layer in an airtight tin at room temperature for up to 2 weeks."
    ]
  },

  "Extremadura": {
    dish: "Perrunillas Extremeñas",
    description: "Perrunillas are the great humble cookie of Extremadura — a crumbly, dry, sweet cookie made with lard, anise, and lemon zest that has been baked in the wood-fired ovens of the region since at least the 17th century. The name (roughly 'little dog-things') is endearingly unpretentious for a cookie that has survived centuries of fashion unchanged. Lard is the essential ingredient — not butter, not oil, only manteca de cerdo from the Ibérico pig, which gives the perrunilla its unique texture: tender, crumbling immediately on the tongue, and with a richness no plant fat can replicate. Anise seed provides its signature perfume; lemon zest cuts the richness. Some versions add a drop of aguardiente or dry sherry. They are rolled, cut into rounds or ovals, and baked until pale cream-gold — they should not brown. Eaten in Extremadura at any hour, dunked in sweet wine or coffee, stacked in a tin on the kitchen table for any visitor who arrives. Pure, honest, and extraordinary.",
    ingredients: [
      "2 1/2 cups (315 g) all-purpose flour, sifted",
      "3/4 cup (150 g) granulated sugar",
      "1/2 cup (115 g) high-quality lard (manteca de cerdo ibérico), at room temperature",
      "2 large eggs",
      "1 tsp anise seeds, lightly crushed in a mortar",
      "Zest of 1 lemon, finely grated",
      "1 tsp baking powder",
      "Pinch of fine sea salt",
      "1 tbsp dry anise liqueur (anís seco) or dry sherry (optional)",
      "1 egg yolk beaten with 1 tbsp water for glaze",
      "Granulated sugar for sprinkling the tops"
    ],
    steps: [
      "In a large bowl, beat the lard with the sugar until pale and fluffy, about 3 minutes. Beat in the eggs one at a time. Add the lemon zest, crushed anise seeds, and anise liqueur if using.",
      "Sift the flour, baking powder, and salt together. Add to the lard mixture and mix with a spatula or your hands until a cohesive, soft dough forms. It will be slightly crumbly — this is correct. If it's too dry, add 1–2 tbsp cold water. Flatten into a disk, wrap in plastic, and refrigerate 30 minutes.",
      "Preheat the oven to 350°F (175°C). Line baking sheets with parchment paper.",
      "Roll the dough on a lightly floured surface to about 3/8 inch (1 cm) thickness. Cut into rounds or ovals using a 2.5-inch (6 cm) cookie cutter. Gently reroll scraps and cut more cookies.",
      "Place on the prepared baking sheets. Brush lightly with the egg yolk glaze. Sprinkle a pinch of granulated sugar over each cookie.",
      "Bake for 14–18 minutes until the cookies are pale gold — barely colored at the edges. Do not let them brown; perrunillas should be light. They will be soft when warm but firm up as they cool. Cool completely on a rack before transferring — they are fragile when warm. Store in an airtight tin at room temperature for up to 2 weeks; they improve over the first few days."
    ]
  },

  "Galicia": {
    dish: "Tarta de Santiago",
    description: "The Tarta de Santiago is one of the great cakes of the world — simple, ancient, and deeply meaningful. It is made from just ground almonds, eggs, and sugar, with no flour, no butter, no dairy. The result is a moist, dense, gloriously rich almond cake with a slightly crunchy top, intensely fragrant, naturally gluten-free, and unmistakably itself. What makes it the Tarta de Santiago is the dusting of its top with powdered sugar stenciled through the Cross of Saint James — the cross of the Order of Santiago, the pilgrimage symbol that has drawn pilgrims to the tomb of the apostle in Santiago de Compostela since the 9th century. The cross is left in bright white on the surface, surrounded by the golden-brown cake visible beyond its edges. Pilgrims reaching Santiago after weeks of walking the Camino are greeted with a slice on the Cathedral steps. The history of this cake is the history of medieval Europe — faith, trade, the movement of almonds from the Moorish south, and the great hunger of people who had walked very far.",
    ingredients: [
      "2 1/4 cups (225 g) ground blanched almonds (almond flour — finely ground)",
      "1 cup (200 g) granulated sugar",
      "4 large eggs, at room temperature",
      "Zest of 1 lemon, finely grated",
      "Zest of 1/2 orange, finely grated",
      "1/2 tsp ground cinnamon",
      "1/4 tsp pure almond extract (optional, for deeper flavor)",
      "Butter and flour for the pan",
      "Powdered sugar and a Cross of Santiago stencil (or cut one from paper) for the top"
    ],
    steps: [
      "Preheat the oven to 350°F (175°C). Butter and flour a 9-inch (23 cm) round springform pan, then line the bottom with parchment paper.",
      "In a large bowl, beat the eggs and sugar with an electric mixer on high speed for 4–5 minutes until very pale, thick, and tripled in volume. The mixture should fall in wide, slow ribbons from the beater.",
      "Gently fold in the ground almonds, lemon zest, orange zest, cinnamon, and almond extract (if using) with a large spatula. Use wide, careful folding motions from the bottom of the bowl to preserve the volume in the eggs. The batter will deflate somewhat; this is normal.",
      "Pour into the prepared pan and smooth the top gently. Bake for 30–35 minutes until the cake is golden-brown on top, pulls away slightly from the sides, and a skewer inserted in the center comes out clean. The center may still have a very slight spring — that is perfect.",
      "Cool completely in the pan on a rack — at least 1 hour. Unmold. Place the Cross of Santiago stencil (cutout) in the center of the cake and dust the entire surface generously with powdered sugar. Carefully lift the stencil away to reveal the white cross on the golden cake. Serve at room temperature. It keeps 3–4 days well-wrapped."
    ]
  },

  "La Rioja": {
    dish: "Peras al Vino Tinto de La Rioja",
    description: "There is no dessert in Spain more elegant in its honesty than this: whole pears, peeled but stem intact, simmered slowly in Rioja red wine with sugar, cinnamon, cloves, and orange peel until they turn the deep, trembling purple-crimson of a winter sunset over the Ebro valley. The pears drink the wine and the wine becomes the pears — sweet, spiced, tannin-rounded — and as the poaching liquid reduces to a syrup, it lacquers the fruit in a glossy, deeply colored glaze. They are served at room temperature or slightly cool, standing upright, drenched in their own reduced syrup, sometimes alongside a spoon of sheep's milk ice cream or fresh cream from Rioja's dairy farms. This dish is served in every good restaurant in Logroño at the end of a long lunch that began with the day's pimientos asados and continued through a Rioja Reserva. It asks nothing of you but the patience to let the wine and the fruit do their work.",
    ingredients: [
      "4–6 firm, slightly underripe pears (Bosc or Anjou work beautifully — they hold their shape when poached)",
      "1 bottle (750 ml) Rioja Crianza or Rioja Reserva red wine",
      "3/4 cup (150 g) granulated sugar",
      "1 cinnamon stick",
      "4 whole cloves",
      "Peel of 1 orange (in wide strips)",
      "Peel of 1/2 lemon (in strips)",
      "1 bay leaf (optional)",
      "1 vanilla bean, split (optional)",
      "Heavy cream, crème fraîche, or sheep's milk ice cream for serving"
    ],
    steps: [
      "Peel the pears carefully, leaving the stems intact. Using a melon baller or small spoon, scoop out the core from the bottom of each pear, making a neat cavity.",
      "In a saucepan just large enough to hold the pears upright (they should fit snugly), combine the red wine, sugar, cinnamon, cloves, orange peel, lemon peel, bay leaf, and vanilla bean if using. Stir to begin dissolving the sugar. Bring to a gentle simmer.",
      "Add the pears to the simmering wine mixture — they should be mostly submerged. If not, add a splash more wine or water. Press a piece of parchment paper over the surface, then cover the pan with a lid.",
      "Simmer gently over medium-low heat for 25–40 minutes, depending on the ripeness and size of the pears, turning them every 10 minutes. They are done when a skewer pierces them with no resistance — perfectly tender throughout. The pears will have absorbed a deep red-purple color.",
      "Remove the pears carefully with a slotted spoon and set aside. Bring the poaching liquid to a boil and reduce over high heat for 10–15 minutes until it has reduced to a thin syrup that coats the back of a spoon. Strain out the spices.",
      "Serve the pears at room temperature or slightly cool, standing upright in deep bowls. Spoon the reduced Rioja syrup over and around them generously. Accompany with a spoonful of cream or sheep's milk ice cream."
    ]
  },

  "Madrid": {
    dish: "Churros con Chocolate Espeso Madrileño",
    description: "There are churros and there is Madrid's chocolate. The churro — a loop or stick of choux-adjacent fried dough, crisp outside, soft inside, coated in fine sugar — is loved across Spain and Latin America. But the Madrileño version is distinguished by what accompanies it: a cup of chocolate espeso, so thick a spoon stands upright in it, made from high-cacao dark chocolate and cornstarch, that is more a velvet sauce than a drink. The correct technique is to dip the churro all the way into the chocolate, swirl it once, and eat immediately — the contrast of fried dough and thick, bittersweet, near-black chocolate is one of the great pleasures of human civilization. Chocolaterías in Madrid — San Ginés, the oldest, has operated since 1894 — serve this combination at 3am to clubbers and at 7am to people going to work, bridging the gap between night and day. It is the food of Madrid as it truly is: nocturnal, unsentimental, and magnificent.",
    ingredients: [
      "For the churros dough: 1 cup (240 ml) water, 1 cup (125 g) all-purpose flour, 1 tbsp granulated sugar, 1/2 tsp fine sea salt, 1 tbsp olive oil or neutral oil",
      "Neutral oil for deep frying (about 2 cups / 480 ml)",
      "Fine sugar mixed with a pinch of cinnamon for coating",
      "For the chocolate espeso: 2 cups (480 ml) whole milk, 3 1/2 oz (100 g) high-quality dark chocolate (70% cacao), finely chopped, 2 tbsp granulated sugar, 2 tbsp cornstarch, pinch of fine sea salt, 1/4 tsp ground cinnamon"
    ],
    steps: [
      "Make the chocolate espeso: In a small bowl, whisk together the cornstarch and 1/4 cup (60 ml) of the cold milk until completely smooth with no lumps. Heat the remaining milk with the sugar and cinnamon in a saucepan over medium heat. When steaming, add the chopped chocolate and stir until melted. Pour the cornstarch mixture into the hot chocolate in a thin stream, whisking constantly. Cook over medium heat, whisking constantly, 3–5 minutes until the chocolate thickens dramatically to a consistency thick enough to coat a spoon heavily. Keep warm over the lowest heat, stirring occasionally.",
      "Make the churro dough: Bring the water, sugar, salt, and oil to a rolling boil in a saucepan. Remove from heat. Add the flour all at once and stir vigorously with a wooden spoon until a smooth, cohesive dough forms that pulls away from the sides of the pan. Let cool 5 minutes.",
      "Transfer the dough to a piping bag fitted with a large star tip (1/2 inch / 12 mm). Heat 2 inches of oil in a heavy pot to 360°F (182°C). Pipe 6-inch (15 cm) lengths of dough into the hot oil, cutting with scissors or a knife. Fry in batches, turning, 3–4 minutes until deep golden and crisp all over.",
      "Drain on paper towels for 30 seconds, then immediately roll in the cinnamon-sugar mixture. Serve immediately alongside cups of the thick hot chocolate for dipping."
    ]
  },

  "Melilla": {
    dish: "Sfenj de Melilla con Miel de Azahar",
    description: "Melilla's sfenj are the Spanish enclave's window into the Moroccan and Berber soul of North Africa — golden, airy, irregular rings of yeasted fried dough, crisp on the outside, almost hollow and chewy within, eaten hot from the oil-drenched paper bags of street vendors in the medina. Sfenj are not donuts — the dough is wetter, stickier, and more elastic, made simply from flour, water, yeast, and salt, with nothing to sweeten it before frying. The sweetness comes after: they are served with a generous drizzle of miel de azahar (orange blossom honey from Andalucía's orange groves, pale gold and intensely floral) and eaten immediately, before they lose their crispness and warmth. In Melilla, sfenj are the breakfast of the medina quarter — eaten at the squat benches of the souk at dawn, washed down with mint tea or black coffee, the smell of orange blossoms and hot oil announcing the start of another day between two continents.",
    ingredients: [
      "2 cups (250 g) all-purpose flour",
      "1 tsp instant yeast",
      "1/2 tsp fine sea salt",
      "3/4 cup (180 ml) warm water (approximately — add gradually)",
      "Neutral oil for deep-frying (canola, sunflower, or light olive oil)",
      "Orange blossom honey for serving",
      "Cinnamon sugar for optional dusting (1/4 cup granulated sugar + 1/2 tsp cinnamon)"
    ],
    steps: [
      "In a large bowl, combine the flour, yeast, and salt. Add the warm water gradually while mixing with your fingers or a dough hook — the dough should be very wet, sticky, and elastic, much wetter than bread dough. Knead (or beat with a dough hook on medium-high) for 8–10 minutes until the dough is smooth and stretchy, forming long elastic threads when pulled. Cover and rise in a warm place for 1 to 1.5 hours until doubled and very puffy with bubbles on the surface.",
      "Heat 3 inches (8 cm) of oil in a wide, heavy pot to 350°F (175°C). The oil must be deep enough for the sfenj to float freely.",
      "To shape: Oil your hands generously — the dough is very sticky. Pull off a golf-ball-sized piece of dough. Using both oiled hands, flatten the ball between your palms and poke a hole through the center with your thumb, stretching the hole to about 1.5 inches (4 cm). The ring will be irregular and imperfect — this is authentic.",
      "Slide the ring immediately into the hot oil. Fry 2–3 at a time for 3–4 minutes, turning once, until golden-amber on both sides. The sfenj should puff dramatically as they fry. Drain briefly on paper towels.",
      "Serve immediately while hot: drizzle generously with orange blossom honey, or dip in honey and eat hot. Optionally roll in cinnamon sugar instead of or alongside the honey. Sfenj must be eaten fresh — within minutes of frying — while the exterior is still crackling."
    ]
  },

  "Murcia": {
    dish: "Paparajotes Murcianos",
    description: "The Paparajote is Murcia's most singular, irreplaceable, beloved, and completely unique dessert — and one of the great eccentric sweets of the world. They are batter-fried lemon tree leaves. Let that settle. Fresh, smooth lemon tree leaves (Citrus limon) are dipped in a sweetened, cinnamon-scented batter of flour, eggs, and lemon zest and fried in olive oil until the batter puffs golden and crisp around the leaf. They are served hot, dusted in powdered sugar and cinnamon — and you eat the batter only, stripping it from the leaf with your teeth, discarding the leaf itself (which is not edible). The leaf is merely the carrier, the mold, the soul — its perfume permeates every molecule of batter, giving it a citrus fragrance unlike anything that can be achieved with lemon juice or zest alone. The paparajote is Murcia's invention and Murcia's to keep. No other region makes them. They appear at the great spring festival of the Bando de la Huerta, eaten in the streets by thousands of people in traditional huertano costume.",
    ingredients: [
      "20–25 fresh lemon tree leaves, each about 3 inches (8 cm) long (washed and dried thoroughly)",
      "1 cup (125 g) all-purpose flour",
      "1 tsp baking powder",
      "2 tbsp granulated sugar",
      "Pinch of fine sea salt",
      "Zest of 1 lemon, finely grated",
      "1/2 tsp ground cinnamon",
      "2 large eggs",
      "1/2 cup (120 ml) cold sparkling water or regular cold water",
      "Olive oil for frying",
      "Powdered sugar and ground cinnamon mixed for serving"
    ],
    steps: [
      "Ensure the lemon leaves are completely clean and bone dry — any moisture will cause dangerous oil splatter. Pat dry with towels and let air-dry for 30 minutes if needed.",
      "Make the batter: Whisk together the flour, baking powder, granulated sugar, salt, lemon zest, and cinnamon in a large bowl. Make a well in the center. Add the eggs and cold sparkling water and whisk from the center out until a smooth, somewhat thick batter forms — about the consistency of a pancake batter.",
      "Heat 2 inches (5 cm) of olive oil in a wide skillet or pot to 350°F (175°C). Prepare a large plate lined with paper towels.",
      "Working with one leaf at a time, hold it by its stem and dip it into the batter, turning to coat both sides and the edges generously. Let any excess drip off.",
      "Lower the coated leaf into the hot oil, releasing it away from you. Fry for 2–3 minutes, turning once, until the batter is golden-brown and puffed on both sides. Remove with a slotted spoon and drain on paper towels.",
      "Serve immediately — they must be eaten hot. Dust generously with the powdered sugar and cinnamon mixture. Warn your guests: eat only the batter — tear it away from the leaf and discard the leaf. The fragrance of lemon tree that lingers in the batter is the entire point."
    ]
  },

  "Navarra": {
    dish: "Cuajada con Miel de Navarra",
    description: "Cuajada is the oldest dairy dessert in the Basque and Navarrese tradition — a preparation of such antiquity that the wooden kaikua (a vessel carved from a single piece of wood in which it was traditionally made) has been found in Neolithic sites in the Pyrenean foothills. The technique is elemental: fresh sheep's milk is warmed, then curdled with a drop of animal rennet — the same enzyme that makes cheese, but used here only briefly so the milk sets into a trembling, snow-white, barely-firm custard. It is sweet, milky, faintly tart, with the unmistakable lanolin richness of sheep's milk from Navarra's Latxa breed, the same sheep that give Roncal and Idiazabal their cheeses. Served in small clay or wooden vessels, topped with a generous pour of miel de romero — rosemary honey from the sun-baked mountains of Navarra, golden-amber and intensely aromatic — and a scatter of crushed walnuts, the cuajada is prehistoric simplicity brought to the table: a dessert that tastes of mountains, grass, and unhurried time.",
    ingredients: [
      "4 cups (960 ml) full-fat sheep's milk (or whole cow's milk if sheep's milk is unavailable — the flavor is different but the technique works)",
      "1/2 tsp liquid animal rennet (available from cheesemaking suppliers) or 1/4 tsp powdered rennet",
      "2 tbsp cold water (to dilute the rennet)",
      "Pinch of fine sea salt (optional)",
      "4–6 tbsp Navarrese honey (rosemary, thyme, or lavender honey, the darker and more aromatic the better)",
      "1/2 cup (60 g) walnuts, lightly toasted and roughly chopped"
    ],
    steps: [
      "Dilute the rennet in the 2 tbsp cold water and stir to dissolve. Have 4–6 small clay bowls, individual ramekins, or small glasses ready and warmed by rinsing with hot water and drying.",
      "Heat the sheep's milk in a saucepan over medium-low heat to exactly 100–104°F (38–40°C) — use a thermometer. This is blood temperature, the same as a lamb's stomach. At this temperature the rennet will work perfectly. Above 110°F (43°C) it is destroyed; below 95°F (35°C) it works very slowly.",
      "Remove the pan from heat. Stir in the diluted rennet quickly and thoroughly for 30 seconds. Add the salt if using.",
      "Pour immediately and quickly into the prepared bowls — work fast, as the rennet begins acting immediately. Do not stir once poured. Place the bowls in a warm spot (a turned-off oven with the light on, or near a warm stove) and do not disturb for 30–40 minutes until the cuajada is set — it should tremble as a whole unit when shaken, not slosh like liquid.",
      "Once set, cover each bowl with plastic wrap and refrigerate 2–4 hours or overnight — the texture becomes cleaner and firmer with chilling. Serve cold, in their individual vessels, topped with 1 tbsp of honey per bowl and a generous scatter of toasted walnuts."
    ]
  },

  "Pais Vasco": {
    dish: "Goxua Vasco",
    description: "Goxua (sweet in Euskera, the Basque language) is Vitoria-Gasteiz's claim to dessert greatness — a layered creation of such structural beauty and flavor harmony that it has become beloved across all of the Basque Country. From bottom to top: a layer of crisp, soaked sponge cake; a thick, cool dome of freshly whipped cream; a generous pour of rich egg custard (crema pastelera); and on top, a mirror of amber caramel, still crackling from the blowtorch. Every element is present for a reason. The cake soaks up whatever liquid it's brushed with — Basque cider, or rum — making it tender and alcoholic at the base. The cream is the cool cloud. The custard is the warmth. The caramel is the drama. Eaten with a spoon that cuts through all four layers at once, it is one of the most satisfying desserts in Spain — proof that the Basque kitchen, famous for its avant-garde alta cocina, never forgot how to make something that simply, fundamentally, deeply makes people happy.",
    ingredients: [
      "For the sponge base: 4 ladyfinger cookies per serving (or a layer of thinly sliced génoise/sponge cake), soaked in 2 tbsp apple cider or rum mixed with 1 tbsp sugar",
      "For the whipped cream: 1 1/2 cups (360 ml) heavy cream, very cold, 2 tbsp powdered sugar, 1/2 tsp vanilla extract",
      "For the pastry cream: 2 cups (480 ml) whole milk, 4 egg yolks, 1/2 cup (100 g) granulated sugar, 3 tbsp cornstarch, 1 tbsp unsalted butter, 1 tsp vanilla extract",
      "4–6 tsp granulated sugar for the caramel top"
    ],
    steps: [
      "Make the pastry cream: Heat the milk until steaming. Whisk egg yolks with sugar and cornstarch in a bowl until smooth. Slowly pour the hot milk into the yolk mixture, whisking. Return to the saucepan and cook over medium heat, stirring constantly, until very thick and bubbling. Cook 1 minute more. Remove from heat; stir in butter and vanilla. Press plastic wrap directly on the surface and refrigerate until cold.",
      "Whip the cream: Beat the cold cream with powdered sugar and vanilla to firm (not stiff) peaks. Refrigerate until assembly.",
      "Make the cider soak: Mix apple cider or rum with sugar, stir to dissolve.",
      "Assemble (in individual serving glasses or large wine glasses): Lay 2–3 ladyfingers in the bottom, brush or pour the cider soak over them — they should be moistened but not soggy. Pipe or spoon a generous dome of whipped cream over the cake layer (it should be the tallest, most visually prominent layer). Spoon a generous layer of cold pastry cream over the whipped cream.",
      "Refrigerate assembled goxuas for at least 2 hours or up to 24 hours. Just before serving, sprinkle 1 tsp granulated sugar evenly over the pastry cream top of each goxua. Caramelize with a blowtorch until amber and crackling. Serve immediately — the contrast between the cold layers and the hot caramel is essential."
    ]
  },

  "Valencia": {
    dish: "Arnadí Valenciano",
    description: "The Arnadí is Valencia's most ancient dessert, with roots stretching back to the Moorish kingdoms of al-Andalus — its name is derived from the Arabic 'alrnadi' (offering). It is made during the Easter season in Valencia and the Valencian interior, and it remains almost unknown outside the region, which makes encountering it feel like a discovery. It begins with sweet calabaza de invierno (winter squash or pumpkin) from the Valencian huerta, baked or boiled until very soft, then drained, squeezed absolutely dry, and combined with ground almonds, sugar, egg yolks, and cinnamon into a dense, fragrant paste. This paste is shaped into tall cones or pyramids on individual almond leaves — by hand, building each shape slowly — then studded with almonds and candied pine nuts pressed into the surface, and baked until golden and fragrant. The Arnadí is a prayer made edible: shaped like a mountain or a flame, offering sweetness and fragrance to mark the return of spring.",
    ingredients: [
      "2 lbs (900 g) butternut squash or sweet pumpkin, peeled, seeded, and cubed",
      "1 1/2 cups (150 g) ground blanched almonds",
      "1 cup (200 g) granulated sugar",
      "4 egg yolks",
      "1 tsp ground cinnamon",
      "1/4 tsp ground cloves",
      "Zest of 1/2 lemon, finely grated",
      "1/4 tsp fine sea salt",
      "For decoration: 1/4 cup (35 g) whole blanched almonds, 2 tbsp pine nuts",
      "Powdered sugar for dusting after baking"
    ],
    steps: [
      "Roast the squash: Preheat oven to 400°F (200°C). Place squash pieces on a baking sheet and roast for 30–40 minutes until very tender. Let cool.",
      "Drain the squash: This step is absolutely critical. Place the cooked squash in a clean cloth or cheesecloth and squeeze as hard as you can to remove every drop of moisture. The squash must be completely dry. Measure: you need 2 cups (about 450 g) of very dry, mashed squash pulp. If still moist, spread on a clean cloth and let air-dry for 30 minutes more.",
      "In a large bowl, combine the dry squash purée, ground almonds, sugar, egg yolks, cinnamon, cloves, lemon zest, and salt. Mix thoroughly until a stiff, cohesive paste forms. Taste and adjust sugar if needed. Refrigerate for 1 hour to firm up.",
      "Preheat the oven to 375°F (190°C). Line a baking sheet with parchment. Using wet or lightly oiled hands, divide the paste into 8–10 portions. Shape each into a tall, pointed cone or pyramid about 3 inches (8 cm) high. Press whole almonds in a spiral around the cone, and nestle a pine nut between each almond.",
      "Bake for 20–25 minutes until golden amber on the surface. Cool on the tray. Dust lightly with powdered sugar just before serving. Serve at room temperature — the arnadí keeps well for 2 days at room temperature."
    ]
  }
};

// Apply desserts to ESP regions
Object.keys(spainDesserts).forEach(regionName => {
  if (data['ESP'].regions[regionName]) {
    data['ESP'].regions[regionName].dessert = spainDesserts[regionName];
    console.log('✓ Added dessert for ESP/' + regionName + ': ' + spainDesserts[regionName].dish);
  } else {
    console.log('✗ Region not found: ' + regionName);
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n✅ Spain desserts written successfully!');
