export type MonthData = {
  id: string;
  month: string;
  year: string;
  title: string;
  location: string;
  description: string;
  cover: string;
  stats: { photos: number; videos: number };
  gallery: Array<{ src: string; caption: string }>;
};

export const YEAR_DATA: MonthData[] = [
  {
    id: 'january',
    month: 'January',
    year: '2025',
    title: 'Fresh starts',
    location: 'Home',
    description: 'We had decided this was the year of saying yes to joy and trying to intentionally find and create joy however we could. January was filled with cozy days at home, Thor reading many books or setting up figures, walks to the park, and the highlight by far was a trip to Disneyland! Thor truly was living his best life! To properly balance all of that fun, we wrapped up the month with Andrew getting his hernia surgery - one that was supposed to happen at the end of 2024 that we ended our 2024 newsletter with, but it was rescheduled due to him catching a bug. Unintentionally, this was the beginning of a very geriatric year for him, of course he would end up having a rare hernia called a "little old lady hernia"',
    cover: 'https://picsum.photos/seed/jan-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/jan-1/900/1200', caption: 'Snowy backyard adventures.' },
      { src: 'https://picsum.photos/seed/jan-2/900/1200', caption: 'The annual puzzle marathon.' },
      { src: 'https://picsum.photos/seed/jan-3/900/1200', caption: 'Quiet library afternoons.' },
      { src: 'https://picsum.photos/seed/jan-4/900/1200', caption: 'Fireside story time.' },
    ]
  },
  {
    id: 'february',
    month: 'February',
    year: '2025',
    title: 'Warm hearts',
    location: 'Home',
    description: 'While Andrew recouped in February, we enjoyed more cozy days at home, exploring the Bosque, and trips to the zoo and museum. Andrew and I spent our angel girl\'s due date at Chimayo and found a lot of peace in comfort in that and the beautiful skies she\'ll paint for us from time to time',
    cover: 'https://picsum.photos/seed/feb-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/feb-1/900/1200', caption: 'Glittery valentines on display.' },
      { src: 'https://picsum.photos/seed/feb-2/900/1200', caption: 'Snowball mission in the park.' },
      { src: 'https://picsum.photos/seed/feb-3/900/1200', caption: 'Homemade heart-shaped pizzas.' },
      { src: 'https://picsum.photos/seed/feb-4/900/1200', caption: 'Movie night cocoa station.' },
    ]
  },
  {
    id: 'march',
    month: 'March',
    year: '2025',
    title: 'First blooms',
    location: 'Local trails',
    description: 'March had us back on track and saying yes to celebrating more joy! Per usual, you can catch us at a park or reading Little Golden Books, and this month Andrew and I were able to celebrate our 5th anniversary on the Big Island. It truly was a trip of a lifetime, with no shortage of nature showing off. We had countless wildlife and nature encounters throughout our trip including many whales, dolphins, turtles, swimming at sunset with manta rays and most of all - had the luck of being in Hawaii Volcanoes National Park during an eruption! We loved the time exploring the Big Island and were so thankful that Thor was in the best care with Lola and Papa back home!',
    cover: 'https://picsum.photos/seed/mar-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/mar-1/900/1200', caption: 'Windy trail smiles.' },
      { src: 'https://picsum.photos/seed/mar-2/900/1200', caption: 'Planting seedlings together.' },
      { src: 'https://picsum.photos/seed/mar-3/900/1200', caption: 'Picnic blanket + sunshine.' },
      { src: 'https://picsum.photos/seed/mar-4/900/1200', caption: 'Rainy day fort building.' },
    ]
  },
  {
    id: 'april',
    month: 'April',
    year: '2025',
    title: 'Play outside',
    location: 'Soccer fields',
    description: 'As Spring came into full bloom, we again enjoyed lots of time outside and loved spending Easter in Colorado! We had a blast celebrating together and watching the cousins (Thor & Ella) spend so much time together. Also, to Mama\'s dismay, Andrew began cultivating a love of Pokemon in Thor\u2026',
    cover: 'https://picsum.photos/seed/apr-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/apr-1/900/1200', caption: 'Sideline cheers.' },
      { src: 'https://picsum.photos/seed/apr-2/900/1200', caption: 'Colorful egg hunt.' },
      { src: 'https://picsum.photos/seed/apr-3/900/1200', caption: 'Umbrella runway.' },
      { src: 'https://picsum.photos/seed/apr-4/900/1200', caption: 'Kitchen cupcake test run.' },
    ]
  },
  {
    id: 'may',
    month: 'May',
    year: '2025',
    title: 'Golden evenings',
    location: 'School & backyard',
    description: 'Sense a common theme here?! Enjoyed the beautiful weather and blooms outside! Thor enjoyed acquiring Mama\'s sticker collection, hanging out with our neighbor\'s puppy, and a visit from the L\'s (more cousins!)',
    cover: 'https://picsum.photos/seed/may-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/may-1/900/1200', caption: 'Stage lights and proud smiles.' },
      { src: 'https://picsum.photos/seed/may-2/900/1200', caption: 'Bike trail breakthroughs.' },
      { src: 'https://picsum.photos/seed/may-3/900/1200', caption: 'Campfire marshmallow magic.' },
      { src: 'https://picsum.photos/seed/may-4/900/1200', caption: 'Garden blooms on deck.' },
    ]
  },
  {
    id: 'june',
    month: 'June',
    year: '2025',
    title: 'Summer energy',
    location: 'Pool & road trips',
    description: 'June was truly a month to remember - it started off by enjoying a great air show on base before we headed out to Alaska! It was so special to celebrate my brother Luke\'s wedding in Barrow, spend time with their beautiful family, and get to see and experience all Barrow and Nalukatuk has to offer! In addition to enjoying Barrow, we also spent time in Anchorage, Whittier, Homer and Seward during our time in Alaska. It was a beautiful and memorable trip, with another highlight being an extraordinary boat cruise through Kenai Fjords National Park. More unbelievable encounters with wildlife such as whales, eagles, and an unforgettable experience to witness an Orca pod hunting a sea lion - like we were National Geographic photographers or living the show Planet Earth for a minute!',
    cover: 'https://picsum.photos/seed/jun-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/jun-1/900/1200', caption: 'Poolside cannonballs.' },
      { src: 'https://picsum.photos/seed/jun-2/900/1200', caption: 'Popsicle rainbow.' },
      { src: 'https://picsum.photos/seed/jun-3/900/1200', caption: 'Road trip playlists.' },
      { src: 'https://picsum.photos/seed/jun-4/900/1200', caption: 'Backyard sprinkler parties.' },
    ]
  },
  {
    id: 'july',
    month: 'July',
    year: '2025',
    title: 'Big sky days',
    location: 'Lake house',
    description: 'Ok so 2025 sounds amazing so far - a trip to Disney, Hawaii, Alaska, a baby on the way and sure a hernia surgery but sounds mostly great! July really threw us a curveball as I was just entering my second trimester, enjoying reading a book while Thor played with his trucks, Andrew called me from his iWatch on his run and I knew this could not be good. In a total freak accident and another chapter of Andrew\'s geriatric year, he tripped while out running and broke his hip. Of course in the moment, that was the furthest thing on our mind. With the help of some gracious neighbors and a Good Samaritan, Andrew hobbled off of the trail he had been on and we got him to the ER. Much to our surprise, we found out he broke his hip, and nearly all the way through. While waiting in the ER we decided to open our results and found out we were expecting a girl! Grateful for good news on a tough day. Thankful for a successful surgery and for Papa, Lola, and Papa Ken helping carry the load as we navigated this new norm! In total, Andrew would be in the hospital for a week, using a walker without any load bearing on his left side for 6 weeks, followed by slowly learning how to walk again using the walker until he graduated to a cane and eventually walking on his own. If you ever want to be tired, try being pregnant, working, raising a toddler, and a husband who broke his hip! Forever grateful for the support of our friends and family that really showed up for us!',
    cover: 'https://picsum.photos/seed/jul-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/jul-1/900/1200', caption: 'Sparklers after dusk.' },
      { src: 'https://picsum.photos/seed/jul-2/900/1200', caption: 'Lake dock leaps.' },
      { src: 'https://picsum.photos/seed/jul-3/900/1200', caption: 'Sunset paddle session.' },
      { src: 'https://picsum.photos/seed/jul-4/900/1200', caption: 'Berry picking haul.' },
    ]
  },
  {
    id: 'august',
    month: 'August',
    year: '2025',
    title: 'Road miles',
    location: 'Mountain trip',
    description: 'Another month of just surviving, not necessarily thriving. However, the silver lining was a lot of Thor and Mama time on walks, at the park, and enjoying museums together while Dada sadly stayed home to rest still. Our first outing as a family again was to the library - a short walk inside, chairs available, and entertaining to a toddler lol! We had another fun trip to watch the airplanes at the airport and eat dinner, in the season of getting creative for family time and activities. Seriously, still only surviving because we have the best people caring for us with meals and such - Skadoosh!',
    cover: 'https://picsum.photos/seed/aug-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/aug-1/900/1200', caption: 'Summit selfie.' },
      { src: 'https://picsum.photos/seed/aug-2/900/1200', caption: 'Trail snacks break.' },
      { src: 'https://picsum.photos/seed/aug-3/900/1200', caption: 'Vintage roadside stop.' },
      { src: 'https://picsum.photos/seed/aug-4/900/1200', caption: 'Cabin board games.' },
    ]
  },
  {
    id: 'september',
    month: 'September',
    year: '2025',
    title: 'New routines',
    location: 'School & neighborhood',
    description: 'If you would believe it, we were back in the ER, and they hate to see us coming. Imagine a pregnant lady waddling in with a guy using a walker who has a broken hip, and their toddler whose face is gushing blood - you\'d think this was a joke, but unfortunately it was our reality! Thor braved through the gnarliest black eye ever after getting hit with a chair at daycare and then wiping out and crashing into a cabinet. We vowed to health issues - please! On a brighter note, we had a blast celebrating two weddings this month, and Andrew tried out dancing with a walker! Again, the dance floor hates to see us coming, the pregnant lady and guy on a walker\u2026Thankfully Andrew did graduate to a cane this month, which meant he could finally join a zoo trip again! Our happy place has always been and will always be outside in any form. And we started reshuffling our house around, preparing for Baby Girl\'s arrival, which meant Thor graduated to an awesome big bed!',
    cover: 'https://picsum.photos/seed/sep-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/sep-1/900/1200', caption: 'First-day outfits.' },
      { src: 'https://picsum.photos/seed/sep-2/900/1200', caption: 'Homework nook refresh.' },
      { src: 'https://picsum.photos/seed/sep-3/900/1200', caption: 'Evening neighborhood stroll.' },
      { src: 'https://picsum.photos/seed/sep-4/900/1200', caption: 'Apple orchard visit.' },
    ]
  },
  {
    id: 'october',
    month: 'October',
    year: '2025',
    title: 'Autumn glow',
    location: 'Pumpkin patch',
    description: 'We had a blast celebrating the Balloon Fiesta (shout out Breaking Wind) first with the Bobola+ crew and then with Papa and Lola. Always a highlight of our Fall and truly when Albuquerque shows off her best! We enjoyed more family time with the Chavez crew with our "mini" reunion. We wrapped up the month with a fun birthday celebration for Thor - he was all about Dinos! Stomp Chomp Roar, we partied like a Dinosaur and then dressed up as Jurassic Park for Halloween including a home made Triceratops costume. Can\'t believe our dude is 3! We finished up the month with more fall things - enjoying the pumpkin patch and Andrew\'s last days of the cane!',
    cover: 'https://picsum.photos/seed/oct-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/oct-1/900/1200', caption: 'Pumpkin patch portrait.' },
      { src: 'https://picsum.photos/seed/oct-2/900/1200', caption: 'Jack-o\'-lantern lineup.' },
      { src: 'https://picsum.photos/seed/oct-3/900/1200', caption: 'Leaf piles takeoff.' },
      { src: 'https://picsum.photos/seed/oct-4/900/1200', caption: 'Costume test run.' },
    ]
  },
  {
    id: 'november',
    month: 'November',
    year: '2025',
    title: 'Gather + savor',
    location: 'Home',
    description: 'November kicked off by celebrating Dia de los Muertos and getting into the home stretch before baby. We were busy getting the house in order, doing maternity pictures, and savoring the final sweet moments with just Thor. Papa and Lola joined us for Thanksgiving (helped us with more house projects omg) and we kicked off the holidays by going to the zoo lights!',
    cover: 'https://picsum.photos/seed/nov-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/nov-1/900/1200', caption: 'Pie baking lineup.' },
      { src: 'https://picsum.photos/seed/nov-2/900/1200', caption: 'Table setting ritual.' },
      { src: 'https://picsum.photos/seed/nov-3/900/1200', caption: 'Gratitude notes.' },
      { src: 'https://picsum.photos/seed/nov-4/900/1200', caption: 'Friendsgiving laughter.' },
    ]
  },
  {
    id: 'december',
    month: 'December',
    year: '2025',
    title: 'Lights on',
    location: 'Home',
    description: 'In the final flurry of the year, we enjoyed the gearing up for the holidays, celebrating Andrew\'s birthday and of course anxiously awaiting baby sister. More zoo lights, a very sweet baby sprinkle, time outside, a few last house projects and celebrating Christmas were all much needed distractions in our final days before baby. And suddenly, just like that, Raya joined our family just as it was meant to be!',
    cover: 'https://picsum.photos/seed/dec-1/900/1200',
    stats: { photos: 4, videos: 0 },
    gallery: [
      { src: 'https://picsum.photos/seed/dec-1/900/1200', caption: 'Ornament memories.' },
      { src: 'https://picsum.photos/seed/dec-2/900/1200', caption: 'Snowy night drive.' },
      { src: 'https://picsum.photos/seed/dec-3/900/1200', caption: 'Cookie decorating.' },
      { src: 'https://picsum.photos/seed/dec-4/900/1200', caption: 'Fireplace glow.' },
    ]
  },
];
