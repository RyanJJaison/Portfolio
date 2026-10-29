// Every picture on the site. Found pictures come from open collections; their full credits live in
// public/media/credits.json and are listed on /credits. Captions say what a picture shows, never that it is Ryan's.
export type Picture = { src: string; w: number; h: number; alt: string; caption: string; position?: string };

const m = (file: string, w: number, h: number, alt: string, caption = alt, position?: string): Picture => ({
  src: `/media/${file}`, w, h, alt, caption, position,
});

export const pictures = {
  ryan: m("ryan-portrait.jpg", 400, 400, "Ryan Joseph Jaison in a navy blazer and white shirt", "Ryan Joseph Jaison"),
  vembanad: m("kerala-backwaters-vembanad-lake-india.jpg", 1600, 1067, "A houseboat crossing Vembanad Lake at dusk", "Vembanad Lake, on Kottayam's western edge"),
  kochiWater: m("kerala-backwaters-in-kochi.jpg", 1600, 1200, "Wide backwater channel in Kochi under a grey sky", "The backwaters in Kochi"),
  fishingNet: m("kochi-chinese-fishing-net-20080215-01a.jpg", 1600, 1068, "A Chinese fishing net raised over still water in Kochi", "A Chinese fishing net, Kochi"),
  christ: m("christ-university-hosur-road-bangalore-4819.jpg", 1600, 1200, "The Hosur Road entrance of Christ University, Bangalore", "Christ University, Hosur Road entrance", "60% 50%"),
  bangaloreNight: m("bangalore-city-at-night-03.jpg", 1600, 1200, "Bangalore's street lights seen from a plane at night", "Bangalore from the air, at night"),
  ledger: m("pittsboro-merchant-business-ledger.jpg", 1066, 1600, "A handwritten merchant's ledger page from 1832", "A merchant's ledger, 1832", "50% 30%"),
  bitcoin: m("physical-bitcoin-2011-casascius-1-bitcoin-coin.jpg", 1553, 1600, "A brass Casascius one-bitcoin coin from 2011", "A physical bitcoin, 2011"),
  tripura: m("sunrise-in-tripura.jpg", 1600, 1200, "Sunrise over misty hills and tea gardens in Tripura", "Sunrise in Tripura, where Kokborok is spoken"),
  kokborokMap: m("kokborok-map.png", 1920, 1496, "Map of Tripura and Bangladesh with the Kokborok-speaking region shaded", "Where Kokborok is spoken", "62% 55%"),
  library: m("graz-university-library-reading-room.jpg", 1600, 1200, "A long university reading room with desk lamps and shelves", "A university reading room"),
  notes: m("mme-augustine-bulteau-mme-jules-ricard-pseud.jpg", 1600, 1038, "Two pages of handwritten notes in a bound notebook", "A notebook of handwritten notes"),
  esp32: m("esp32-on-lolin32-lite-clone-board-cropped.jpg", 1600, 1122, "Close-up of an ESP32 chip on a circuit board", "An ESP32 microcontroller"),
  mpu6050: m("mpu6050-hd.jpg", 1600, 673, "Two MPU6050 motion-sensor dies, decapped", "Inside an MPU6050 motion sensor"),
  watch: m("longines-4-grand-prix-pocket-watch-clockwork.jpg", 1600, 1600, "An open pocket watch showing its clockwork", "A pocket watch, opened"),
  hollerith: m("miss-cowell-with-hollerith-machine-1964.jpg", 1600, 1203, "A woman working at a Hollerith punched-card machine in 1964", "Punched-card tabulating, 1964"),
  lock: m("antique-lock-with-set-of-keys-exhibit.jpg", 1600, 900, "An antique iron padlock with its keys", "An antique lock and its keys"),
  dataCentre: m("balticservers-data-center.jpg", 1600, 1063, "Rows of servers lit blue in a data centre", "Servers in a data centre"),
  konigsberg: m("tabuleiro-representando-as-sete-pontes-de-konigsberg.jpg", 1600, 1067, "A wooden board modelling the seven bridges of Königsberg", "The seven bridges of Königsberg, as a board"),
  dijkstra: m("edsger-dijkstra-1994.jpg", 1600, 1096, "Edsger Dijkstra lecturing at a blackboard in 1994", "Edsger Dijkstra, 1994"),
  paddy: m("sunrise-on-paddy-fields-near-eluru-4.jpg", 1600, 1067, "Sun rising through mist over paddy fields near Eluru", "Paddy fields near Eluru at sunrise"),
  limescale: m("limescale-deposit-cooking-pot.jpg", 1600, 1200, "White limescale deposits inside a steel pot", "Hard-water scale in a cooking pot"),
  punchCard: m("punch-card-1.jpg", 1600, 826, "A stack of printed punch cards", "Punch cards"),
  neurons: m("santiago-ramon-y-cajal-nerve-cells-in.jpg", 1600, 1057, "Ramón y Cajal's ink drawing of nerve cells", "Nerve cells, drawn by Ramón y Cajal around 1900"),
  slideRule: m("2023-suwak-logarytmiczny-2.jpg", 1600, 963, "A brass slide rule on a white ground", "A slide rule"),
  letterBox: m("india-post-letter-box.jpg", 1600, 1200, "A red India Post letter box on a street corner", "An India Post letter box"),
  telephone: m("grey-rotary-dial-telephone.jpg", 1600, 1143, "A grey rotary-dial telephone", "A rotary telephone"),
  canalPoster: m("a-boat-sailing-in-alappuzha-canal-alappuzha-poster.jpg", 960, 540, "A passenger boat on a canal in Alappuzha, Kerala", "A canal boat in Alappuzha, Kerala"),
} satisfies Record<string, Picture>;

export type PictureId = keyof typeof pictures;

export const canalVideo = "/media/a-boat-sailing-in-alappuzha-canal-alappuzha.webm";

/** Two pictures per project: its world as a whole, and a second view. */
export const projectPictures: Record<string, [PictureId, PictureId]> = {
  sentrix: ["ledger", "bitcoin"],
  lahja: ["tripura", "kokborokMap"],
  clarity: ["library", "notes"],
  "fall-detection": ["esp32", "mpu6050"],
  "task-manager": ["watch", "hollerith"],
  "password-manager": ["lock", "dataCentre"],
  dsa: ["konigsberg", "dijkstra"],
};
