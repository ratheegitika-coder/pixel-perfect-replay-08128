import heritageImg from "@/assets/heritage.jpg";
import foodImg from "@/assets/food.jpg";
import natureImg from "@/assets/nature.jpg";
import heroImg from "@/assets/hero.jpg";

export const INTERESTS = ["History", "Food", "Culture", "Nature", "Heritage"] as const;
export type Interest = (typeof INTERESTS)[number];

export type Place = {
  id: string;
  name: string;
  category: Interest;
  description: string;
  whyVisit: string;
  gemScore: number;
  cost: number; // INR per person
  duration: number; // minutes
  lat: number;
  lng: number;
  history: string;
  significance: string;
  fact: string;
  whyMatters: string;
  notice: string;
};

export type Preferences = {
  location: string;
  interests: Interest[];
  hours: number;
  budget: number;
};

export function imageFor(category: Interest) {
  if (category === "Food") return foodImg;
  if (category === "Nature") return natureImg;
  if (category === "Heritage") return heritageImg;
  return heroImg;
}

export const DEMO_PLACES: Place[] = [
  { id: "agrasen-baoli", name: "Agrasen ki Baoli", category: "Heritage", description: "A 60-metre stepwell tucked between office towers near Connaught Place.", whyVisit: "108 silent steps descending into cool stone — a calm pocket in the busiest district.", gemScore: 78, cost: 0, duration: 45, lat: 28.6262, lng: 77.2247, history: "Believed to be originally built by the legendary King Agrasen and rebuilt in the 14th century by the Agrawal community, it once stored rainwater for the surrounding settlement.", significance: "Stepwells were social spaces — women gathered here, travellers rested, and water was shared across castes.", fact: "The water level drops with each step, so the temperature at the bottom is several degrees cooler than the street.", whyMatters: "It is one of the few surviving stepwells in Delhi and shows how the city managed water long before pipelines.", notice: "Look for the arched niches on three levels and the pigeons nesting in the upper galleries." },
  { id: "mehrauli-park", name: "Mehrauli Archaeological Park", category: "History", description: "200 acres of forest hiding over 100 monuments from a thousand years of history.", whyVisit: "Wander from a Lodi tomb to a Mughal stepwell without seeing another tourist.", gemScore: 86, cost: 0, duration: 120, lat: 28.5195, lng: 77.1857, history: "Mehrauli is the oldest continuously inhabited area of Delhi, with layers from the Tomar Rajputs, the Delhi Sultanate, the Mughals and the British.", significance: "It holds Jamali Kamali mosque, Balban's tomb and Rajon ki Baoli — a full timeline in one walk.", fact: "Balban's tomb contains the first true arch built in India.", whyMatters: "It shows Delhi as seven cities stacked on top of each other, not one.", notice: "Find the painted ceiling inside Jamali Kamali's tomb — the colours are still visible." },
  { id: "paranthe-gali", name: "Paranthe Wali Gali", category: "Food", description: "A narrow Chandni Chowk lane frying stuffed parathas since the 1870s.", whyVisit: "Taste rabri, banana and karela parathas deep-fried in desi ghee by fifth-generation cooks.", gemScore: 64, cost: 250, duration: 45, lat: 28.6564, lng: 77.2303, history: "Families from the same clan set up shops here in the late 19th century; the lane once had over 20 paratha shops.", significance: "Visitors included Nehru and Indira Gandhi — framed photos still hang on the walls.", fact: "The parathas are fried, not griddled, which is unusual in North India.", whyMatters: "It preserves an unbroken family food tradition in the middle of a changing market.", notice: "Watch the side chutneys — banana-tamarind and pumpkin sabzi are refilled constantly." },
  { id: "sunder-nursery", name: "Sunder Nursery", category: "Nature", description: "A restored Mughal garden with lotus ponds, heritage tombs and 300 tree species.", whyVisit: "Quiet lawns, birdlife and 16th-century monuments — ideal for a slow morning.", gemScore: 74, cost: 40, duration: 90, lat: 28.5933, lng: 77.2441, history: "Laid out as a nursery in the early 20th century for New Delhi's trees, it was restored by the Aga Khan Trust in 2018.", significance: "It links Humayun's Tomb and Nizamuddin into one heritage landscape.", fact: "Over 80 bird species have been recorded inside the park.", whyMatters: "It proves conservation and public green space can coexist in a crowded city.", notice: "Look for the blue-tiled Sundarwala Burj and the micro-habitat zone near the lake." },
  { id: "nizamuddin-qawwali", name: "Nizamuddin Thursday Qawwali", category: "Culture", description: "Sufi music sung every Thursday evening at a 14th-century shrine.", whyVisit: "Live qawwali amid rose petals and lamps — a living tradition, not a performance.", gemScore: 82, cost: 0, duration: 60, lat: 28.5912, lng: 77.2423, history: "The dargah of Sufi saint Nizamuddin Auliya has hosted qawwali for over 700 years; his disciple Amir Khusrau is credited with shaping the form.", significance: "It is a meeting point for people of every faith.", fact: "Amir Khusrau, buried here, is also credited with early forms of the sitar and tabla.", whyMatters: "It keeps an oral musical tradition alive in its original setting.", notice: "Cover your head, and notice how the singers build tempo with handclaps." },
  { id: "chunamal-haveli", name: "Chunamal Haveli", category: "Heritage", description: "A 128-room merchant mansion inside Old Delhi, still lived in by the family.", whyVisit: "Rare glimpse inside a working haveli with Belgian glass and carved balconies.", gemScore: 91, cost: 100, duration: 40, lat: 28.6559, lng: 77.2276, history: "Built in 1848 by textile merchant Lala Chunamal, it was among the first homes in Delhi to get an electricity connection.", significance: "It reflects the wealth of Chandni Chowk's 19th-century trading families.", fact: "The family once owned most of the shops on Chandni Chowk's main street.", whyMatters: "Most havelis have crumbled; this one shows what Old Delhi homes looked like at their peak.", notice: "Look up at the cast-iron railings and stained-glass windows facing the courtyard." },
  { id: "kinari-bazaar", name: "Kinari Bazaar", category: "Culture", description: "A glittering lane of wedding trims, tinsel garlands and turbans.", whyVisit: "The colour palette of an Indian wedding, sold by the metre.", gemScore: 70, cost: 150, duration: 40, lat: 28.6553, lng: 77.2316, history: "Craftsmen have sold gota, zari and lace here since the Mughal era.", significance: "Almost every Delhi wedding outfit passes through this lane.", fact: "Some shops still make zari thread by hand using silver-coated copper.", whyMatters: "It sustains artisan crafts that are disappearing elsewhere.", notice: "Watch for the hand-stitched currency garlands for grooms." },
  { id: "hauz-khas-lake", name: "Hauz Khas Deer Park & Lake", category: "Nature", description: "A medieval reservoir with ruins, peacocks and a small deer enclosure.", whyVisit: "Sunset over a 13th-century tank, steps from a madrasa ruin.", gemScore: 58, cost: 0, duration: 60, lat: 28.5535, lng: 77.1946, history: "Alauddin Khilji dug the reservoir around 1295 to supply the city of Siri.", significance: "Firoz Shah Tughlaq later built a madrasa on its banks — one of the largest of its time.", fact: "'Hauz Khas' literally means 'Royal Tank'.", whyMatters: "It shows how medieval Delhi built around water.", notice: "The domed pavilions on the madrasa wall frame the lake perfectly at sunset." },
  { id: "old-famous-jalebi", name: "Old Famous Jalebi Wala", category: "Food", description: "Thick, crunchy jalebis fried in ghee since 1884 at Dariba corner.", whyVisit: "Arguably the most indulgent sweet in Old Delhi, served hot.", gemScore: 60, cost: 80, duration: 20, lat: 28.6566, lng: 77.2318, history: "Founded by Nemchand Jain in 1884, the shop is still run by his descendants.", significance: "A stop on almost every Old Delhi food pilgrimage.", fact: "The jalebis are thicker than usual and can weigh 30–40 grams each.", whyMatters: "It is a living link to Old Delhi's sweet-making heritage.", notice: "Try it with rabri, and watch the spiral being piped by hand." },
  { id: "lodhi-art", name: "Lodhi Art District", category: "Culture", description: "India's first open-air public art district with 50+ murals.", whyVisit: "Walk lanes painted by Indian and international street artists.", gemScore: 72, cost: 0, duration: 60, lat: 28.5862, lng: 77.2235, history: "Started in 2015 by St+art India Foundation in a 1950s government housing colony.", significance: "It turned residential walls into a free gallery for everyone.", fact: "Some murals are painted with air-purifying paint.", whyMatters: "It democratises art in a city where galleries can feel exclusive.", notice: "Find the mural of a woman with folded hands between blocks 10 and 11." },
  { id: "tughlaqabad", name: "Tughlaqabad Fort", category: "History", description: "Ruined walls of a cursed 14th-century fortress city.", whyVisit: "Climb massive battlements with sweeping views and almost no crowds.", gemScore: 88, cost: 25, duration: 90, lat: 28.5131, lng: 77.2604, history: "Built by Ghiyasuddin Tughlaq in 1321 and abandoned within years.", significance: "Legend says Sufi saint Nizamuddin cursed it to be inhabited only by herders.", fact: "The fort's walls stretch over 6 km.", whyMatters: "It shows the ambition — and impermanence — of Delhi's medieval rulers.", notice: "Look across to the tomb of Ghiyasuddin, once surrounded by an artificial lake." },
  { id: "majnu-ka-tilla", name: "Majnu ka Tilla", category: "Food", description: "Delhi's Tibetan colony with momos, laphing and butter tea.", whyVisit: "A tiny Himalayan neighbourhood beside the Yamuna.", gemScore: 76, cost: 200, duration: 60, lat: 28.7005, lng: 77.2277, history: "Settled by Tibetan refugees in the early 1960s.", significance: "It is the heart of Delhi's Tibetan community, with a monastery and prayer flags.", fact: "Laphing, a cold spicy mung-bean noodle, is sold mostly by women vendors here.", whyMatters: "It preserves Tibetan culture in exile.", notice: "Spin the prayer wheels at the monastery clockwise." },
];

export const DEMO_LOCATION = "Delhi";
