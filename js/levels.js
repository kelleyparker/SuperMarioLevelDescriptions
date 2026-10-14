/*
 * Level data for the site.
 *
 * This is the only file you need to touch to fix or improve a level's
 * description — the page is generated from it. See README.md → "Editing levels"
 * for what each field means.
 *
 * type:       overworld | underground | underwater | athletic | castle | bonus
 * tags:       extra labels shown on the card (night, warp, secret, boss, ...)
 * difficulty: 1 (easy) – 5 (hard), a rough guide for first-time players
 */
const LEVEL_TYPES = {
  overworld:   { label: "Overworld",   hint: "Classic above-ground run to the flagpole." },
  underground: { label: "Underground", hint: "Dark brick caverns — watch the ceiling for secrets." },
  underwater:  { label: "Underwater",  hint: "Tap A (jump) repeatedly to swim. You can't stomp enemies here." },
  athletic:    { label: "Athletic",    hint: "Platforming over bottomless pits: treetops, lifts and bridges." },
  castle:      { label: "Castle",      hint: "Fire Bars, lava and Bowser at the end. No flagpole." },
  bonus:       { label: "Bonus",       hint: "Hidden coin areas reached through pipes or vines." },
};

const TAGS = {
  night:  "Takes place at night.",
  warp:   "Contains a Warp Zone that skips you ahead to later worlds.",
  secret: "Hides a notable secret (vine, coin room, hidden 1-Up).",
  boss:   "Ends with a Bowser fight.",
  maze:   "Take the wrong path and the level loops back on itself.",
};

const WORLDS = [
  {
    number: 1,
    theme: "Learn the basics",
    color: "#049cd8",
    levels: [
      {
        id: "1-1", name: "The First Steps", type: "overworld", tags: ["secret"], difficulty: 1,
        desc: "The most famous level in gaming. Goombas, a Koopa Troopa, ? blocks and pipes teach you everything you need, one idea at a time.",
        enemies: ["Goomba", "Koopa Troopa"],
        tip: "The very first ? block you can reach gives a Super Mushroom. Hold B to run and jump farther.",
        secret: "One of the tall pipes can be entered by pressing Down — it leads to an underground coin room. An invisible block past the pipes holds a 1-Up Mushroom.",
      },
      {
        id: "1-2", name: "Into the Underground", type: "underground", tags: ["warp", "secret"], difficulty: 1,
        desc: "Your first trip below ground: low brick ceilings, Piranha Plants in pipes and moving lifts near the exit.",
        enemies: ["Goomba", "Koopa Troopa", "Piranha Plant"],
        tip: "Piranha Plants won't come out of a pipe while you're standing right next to or on top of it.",
        secret: "Near the end, ride a lift up onto the ceiling instead of taking the exit pipe and run right. You'll find a Warp Zone to Worlds 2, 3 and 4.",
      },
      {
        id: "1-3", name: "Treetop Hop", type: "athletic", tags: [], difficulty: 2,
        desc: "Jump across tall treetop platforms and moving lifts above a bottomless drop.",
        enemies: ["Goomba", "Koopa Troopa", "Koopa Paratroopa"],
        tip: "Watch where a lift is heading before you jump on it. Red Koopas turn around at ledges instead of walking off, so they're easy to time.",
      },
      {
        id: "1-4", name: "First Castle", type: "castle", tags: ["boss"], difficulty: 2,
        desc: "Rotating Fire Bars guard the halls. At the end, \"Bowser\" blocks the bridge, but this one is a disguised Goomba.",
        enemies: ["Fire Bar", "Bowser (fake)"],
        tip: "Run under Bowser when he jumps and touch the axe behind him to drop the bridge. Five fireballs also work.",
      },
    ],
  },
  {
    number: 2,
    theme: "First swim",
    color: "#e8a000",
    levels: [
      {
        id: "2-1", name: "Rising Challenge", type: "overworld", tags: ["secret"], difficulty: 2,
        desc: "A longer overworld with more Koopas, bigger staircases and trickier gaps than World 1.",
        enemies: ["Goomba", "Koopa Troopa", "Koopa Paratroopa"],
        tip: "Stomp a Koopa, then kick its shell into a line of enemies for a big score chain.",
        secret: "A brick block hides a vine that climbs to a coin-filled area above the clouds.",
      },
      {
        id: "2-2", name: "Coral Sea", type: "underwater", tags: [], difficulty: 2,
        desc: "The first underwater level. Bloopers drift toward you while Cheep Cheeps swim across the screen.",
        enemies: ["Blooper", "Cheep Cheep"],
        tip: "Tap A to rise and let go to sink. Stay low — Bloopers home in from above and you can't stomp them.",
      },
      {
        id: "2-3", name: "Cheep Cheep Bridge", type: "athletic", tags: [], difficulty: 2,
        desc: "A long bridge over the sea while red Cheep Cheeps leap up from below in big arcs.",
        enemies: ["Cheep Cheep (flying)"],
        tip: "Keep moving. Flying Cheep Cheeps can be stomped, but it's usually safer to outrun them.",
      },
      {
        id: "2-4", name: "Lava Castle", type: "castle", tags: ["boss"], difficulty: 3,
        desc: "Podoboos (lava bubbles) leap from the pits and Fire Bars spin in tighter spaces. The fake Bowser here is really a Koopa Troopa.",
        enemies: ["Fire Bar", "Podoboo", "Bowser (fake)"],
        tip: "Wait for a Podoboo to fall back into the lava before jumping over its pit.",
      },
    ],
  },
  {
    number: 3,
    theme: "Night falls",
    color: "#7b8cff",
    levels: [
      {
        id: "3-1", name: "Hammer Time", type: "overworld", tags: ["night", "secret"], difficulty: 2,
        desc: "A night-time overworld where Hammer Bros show up for the first time, throwing hammers in high arcs.",
        enemies: ["Hammer Bro", "Goomba", "Koopa Troopa", "Koopa Paratroopa"],
        tip: "Hammer Bros jump between levels. Run underneath them, or bump the block they're standing on to defeat them.",
        secret: "The staircase near the end hosts the famous \"infinite 1-Up\" trick: bounce repeatedly on a Koopa shell against a step. There's also a vine to a coin area.",
      },
      {
        id: "3-2", name: "Night Patrol", type: "overworld", tags: ["night"], difficulty: 2,
        desc: "A flat night run packed with groups of Goombas and Koopa Troopas.",
        enemies: ["Goomba", "Koopa Troopa"],
        tip: "Crowds like these are perfect for kicked shells. One shell can clear a whole row.",
      },
      {
        id: "3-3", name: "Pulley Lifts", type: "athletic", tags: ["night"], difficulty: 3,
        desc: "Treetop platforms at night, with balance lifts that drop when you stand on one side.",
        enemies: ["Koopa Paratroopa", "Goomba"],
        tip: "Don't linger on a balance lift. The side you stand on sinks and the other one rises.",
      },
      {
        id: "3-4", name: "Fire Bar Fortress", type: "castle", tags: ["boss"], difficulty: 3,
        desc: "More Fire Bars and Podoboos. The fake Bowser is a Buzzy Beetle in disguise.",
        enemies: ["Fire Bar", "Podoboo", "Bowser (fake)"],
        tip: "Fire Bars rotate at a steady pace, so watch one full turn before you commit.",
      },
    ],
  },
  {
    number: 4,
    theme: "Lakitu & the first maze",
    color: "#43b047",
    levels: [
      {
        id: "4-1", name: "Lakitu's Sky", type: "overworld", tags: [], difficulty: 3,
        desc: "Lakitu debuts, floating on a cloud and dropping spiky Spiny eggs on you the whole way.",
        enemies: ["Lakitu", "Spiny"],
        tip: "Don't stomp Spinies, they're covered in spikes. Keep running, or stomp Lakitu himself from a high step.",
      },
      {
        id: "4-2", name: "Twin Warp Zones", type: "underground", tags: ["warp", "secret"], difficulty: 3,
        desc: "An underground level with two separate Warp Zones. Buzzy Beetles, which fireballs can't hurt, appear here.",
        enemies: ["Buzzy Beetle", "Goomba", "Koopa Troopa", "Piranha Plant"],
        tip: "Stomp Buzzy Beetles and kick their shells, since your fireballs bounce right off them.",
        secret: "A hidden vine climbs to a Warp Zone for Worlds 6, 7 and 8. Running along the ceiling at the end leads to a pipe for World 5.",
      },
      {
        id: "4-3", name: "Mushroom Heights", type: "athletic", tags: [], difficulty: 3,
        desc: "Tall mushroom platforms connected by pulley lifts over a long drop.",
        enemies: ["Koopa Paratroopa"],
        tip: "Pulley lifts sink under your weight, and if pushed too far the rope snaps. Hop off quickly.",
      },
      {
        id: "4-4", name: "Looping Maze", type: "castle", tags: ["boss", "maze"], difficulty: 3,
        desc: "The first maze castle. Pick the wrong route and the corridor repeats forever. The fake Bowser is a Spiny.",
        enemies: ["Fire Bar", "Podoboo", "Bowser (fake)"],
        tip: "If the scenery starts repeating, you took the wrong path. Go back and try the other route (upper vs. lower).",
      },
    ],
  },
  {
    number: 5,
    theme: "The difficulty climbs",
    color: "#c77dff",
    levels: [
      {
        id: "5-1", name: "Cannon Fields", type: "overworld", tags: [], difficulty: 3,
        desc: "Bullet Bill cannons and bouncing Koopa Paratroopas make this overworld much busier than before.",
        enemies: ["Bullet Bill", "Koopa Paratroopa", "Goomba"],
        tip: "Bullet Bills can be stomped. Cannons won't fire while you're standing right next to them.",
      },
      {
        id: "5-2", name: "Hammer Hill", type: "overworld", tags: ["secret"], difficulty: 3,
        desc: "Hammer Bros guard the high ground, and springboards launch you over tall walls.",
        enemies: ["Hammer Bro", "Koopa Troopa", "Goomba"],
        tip: "Hold A while bouncing off a springboard for an extra-high launch.",
        secret: "Look for an enterable pipe. It leads to a hidden side area.",
      },
      {
        id: "5-3", name: "Treetops Revisited", type: "athletic", tags: [], difficulty: 3,
        desc: "A remix of 1-3 with Bullet Bills flying in from off-screen.",
        enemies: ["Bullet Bill", "Koopa Paratroopa", "Goomba"],
        tip: "If you beat 1-3, you know this layout. Just watch the sides for Bullet Bills.",
      },
      {
        id: "5-4", name: "Long Fire Bars", type: "castle", tags: ["boss"], difficulty: 4,
        desc: "Extra-long Fire Bars sweep huge areas of the castle. The fake Bowser is a Lakitu.",
        enemies: ["Fire Bar", "Podoboo", "Bowser (fake)"],
        tip: "Long Fire Bars move slowly at the tip, so cross near the outer edge of their sweep.",
      },
    ],
  },
  {
    number: 6,
    theme: "Lakitu returns",
    color: "#90e0ef",
    levels: [
      {
        id: "6-1", name: "Spiny Showers", type: "overworld", tags: [], difficulty: 3,
        desc: "Lakitu returns with constant Spiny drops over a long stretch of ground.",
        enemies: ["Lakitu", "Spiny"],
        tip: "Keeping a Fire Flower helps a lot here, since fireballs take out Spinies in one hit.",
      },
      {
        id: "6-2", name: "Pipe Paradise", type: "overworld", tags: ["secret"], difficulty: 3,
        desc: "Full of pipes, and many of them can be entered to reach coin rooms and side areas.",
        enemies: ["Piranha Plant", "Goomba", "Koopa Troopa"],
        tip: "When a pipe has no Piranha Plant, try pressing Down on it.",
        secret: "Several pipes lead to coin rooms, and a vine climbs to a coin area in the sky.",
      },
      {
        id: "6-3", name: "Gray Treetops", type: "athletic", tags: [], difficulty: 4,
        desc: "A pale gray treetop level with Bullet Bills and pulley lifts over a long drop.",
        enemies: ["Bullet Bill"],
        tip: "Bullet Bills fly in a straight line, so a well-timed short hop is enough to clear them.",
      },
      {
        id: "6-4", name: "Return of the Fire Bars", type: "castle", tags: ["boss"], difficulty: 4,
        desc: "A tougher take on the early castles with denser Fire Bars. The fake Bowser is a Blooper.",
        enemies: ["Fire Bar", "Podoboo", "Bowser (fake)"],
        tip: "Bowser starts throwing hammers in the later castles. Go under him as soon as he jumps.",
      },
    ],
  },
  {
    number: 7,
    theme: "Familiar, but meaner",
    color: "#69b96a",
    levels: [
      {
        id: "7-1", name: "Cannon Crossfire", type: "overworld", tags: [], difficulty: 4,
        desc: "Bullet Bill cannons and Hammer Bros together in one level.",
        enemies: ["Bullet Bill", "Hammer Bro", "Koopa Paratroopa"],
        tip: "Deal with one threat at a time. Wait for a Bullet Bill to pass before you approach the Hammer Bros.",
      },
      {
        id: "7-2", name: "Blooper Waters", type: "underwater", tags: [], difficulty: 3,
        desc: "A returning underwater layout, now crowded with even more Bloopers.",
        enemies: ["Blooper", "Cheep Cheep"],
        tip: "Same advice as 2-2: stay near the bottom and keep swimming right.",
      },
      {
        id: "7-3", name: "Bridge of Peril", type: "athletic", tags: [], difficulty: 4,
        desc: "Another long bridge with flying Cheep Cheeps, plus Koopa Paratroopas in the way.",
        enemies: ["Cheep Cheep (flying)", "Koopa Paratroopa", "Koopa Troopa"],
        tip: "Don't stop moving. The Cheep Cheeps keep coming as long as you're on the bridge.",
      },
      {
        id: "7-4", name: "Labyrinth Castle", type: "castle", tags: ["boss", "maze"], difficulty: 4,
        desc: "A harder maze castle where every section must be cleared by the correct route. The fake Bowser is a Hammer Bro.",
        enemies: ["Fire Bar", "Podoboo", "Bowser (fake)"],
        tip: "When a section repeats, go back and try a different height (top, middle or bottom path).",
      },
    ],
  },
  {
    number: 8,
    theme: "The final gauntlet",
    color: "#e52521",
    levels: [
      {
        id: "8-1", name: "The Long Run", type: "overworld", tags: [], difficulty: 4,
        desc: "A very long level full of wide gaps, with a tight timer.",
        enemies: ["Koopa Paratroopa", "Goomba", "Buzzy Beetle", "Piranha Plant"],
        tip: "Keep holding B to run. You don't have time to stop and explore.",
      },
      {
        id: "8-2", name: "Everything at Once", type: "overworld", tags: [], difficulty: 5,
        desc: "Lakitu, Bullet Bills and Hammer Bros all at once, over long jumps.",
        enemies: ["Lakitu", "Spiny", "Bullet Bill", "Hammer Bro"],
        tip: "Running jumps are a must. Deal with Lakitu early if you get the chance.",
      },
      {
        id: "8-3", name: "Hammer Bro Walls", type: "overworld", tags: [], difficulty: 5,
        desc: "Castle walls line the route while pairs of Hammer Bros and Bullet Bills block the way.",
        enemies: ["Hammer Bro", "Bullet Bill"],
        tip: "Approach Hammer Bros when their hammers are mid-air, then dash underneath.",
      },
      {
        id: "8-4", name: "Bowser's Castle", type: "castle", tags: ["boss", "maze", "secret"], difficulty: 5,
        desc: "The final castle. Pick the right pipes to progress, swim past an underwater stretch, and face the real Bowser.",
        enemies: ["Fire Bar", "Podoboo", "Hammer Bro", "Bowser"],
        tip: "If you end up back at an earlier spot, you took the wrong pipe. Try the next one along.",
        secret: "Beat this level to rescue Princess Toadstool and unlock a harder second quest.",
      },
    ],
  },
];

const BONUS_AREAS = [
  {
    id: "Coin Room", name: "Underground Coin Rooms", type: "bonus", tags: ["secret"], difficulty: 1,
    desc: "Small rooms full of coins, reached by pressing Down on certain pipes. A pipe takes you back out further along the level.",
    enemies: [],
    tip: "Collecting 100 coins earns an extra life.",
  },
  {
    id: "Coin Heaven", name: "Vine to the Clouds", type: "bonus", tags: ["secret"], difficulty: 1,
    desc: "Some brick blocks hide a beanstalk vine. Climb it to reach a cloud path lined with coins.",
    enemies: [],
    tip: "Hit bricks in suspicious spots (e.g. alone in mid-air) and look for a vine to grow out.",
  },
];

// Lets a Node script (e.g. a validator) require this file. Ignored in the browser.
if (typeof module !== "undefined") module.exports = { LEVEL_TYPES, TAGS, WORLDS, BONUS_AREAS };
