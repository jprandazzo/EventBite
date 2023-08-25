# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri";

Like.destroy_all
Order.destroy_all
Event.destroy_all
User.destroy_all

demo = User.create!({
    email: 'demo@demo.com',
    first_name: 'Drew',
    last_name: 'Scilla',
    password: 'password',
})

u2 = User.create!({
    email: 'thedarklordrises@msn.com',
    first_name: 'Vlad',
    last_name: 'Drakul',
    password: 'password',
})

u3 = User.create!({
    email: 'michael@morbius.com',
    first_name: 'Michael',
    last_name: 'Morbius',
    password: 'password',
})

u4 = User.create!({
    email: 'the@countess.com',
    first_name: 'The',
    last_name: 'Countess',
    password: 'password',
})

u5 = User.create!({
    email: 'dracula@transylvania.ro',
    first_name: 'Count',
    last_name: 'Dracula',
    password: 'password',
})

e1 = Event.create!({
    address: 'Central Park, New York',
    capacity: 500,
    description: "Step into the nostalgic world of William Shakespeare 
    as we bring his timeless masterpieces to life 
    under the open sky. Join us for an unforgettable evening 
    filled with murder, intrigue, and drama as talented actors 
    perform classic plays like Romeo and Juliet, A Midsummer 
    Night's Dream, and Macbeth amidst the lush greenery of our 
    park venue. Relax on your picnic blankets, savor delicious 
    local vendors, and immerse yourself in the forgotten art poetic 
    language (humans have become so simple over the centuries) 
    and captivating performances that have endured 
    through the ages.",
    event_category: 'community_culture',
    event_type: 'concert_performance',
    organizer_name: 'Retro Vampies',
    price: 40,
    timestamp_start: DateTime.parse('10 Oct 2023 19:00'),
    timestamp_end: DateTime.parse('10 Oct 2023 22:00'),
    title: 'Shakespeare in the Park - A Nostalgic Banquet',
    venue_name: 'Central Park West St',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/1.jpeg'), filename: 'shakespeare.jpeg')

e2 = Event.create!({
    address: 'Avant Gardner, Brooklyn',
    capacity: 70,
    description: "Unleash your immortal dance moves and embrace 
    the night at Eternal Disco, the disco rave that beckons 
    creatures of the darkness. Lose yourself (and find many a 
    willing victim) in the hypnotic beats of pulsating 
    disco classics and modern remixes that transcend time. Dance
    and feast beneath a mesmerizing spectacle of strobe lights, 
    transforming the venue into a neon-lit 
    nocturnal hellscape. Wreak havoc as everyone is distracted;
    the lambs have come willingly to this slaughter. Come, let 
    your fangs down, and groove into the dawn of eternity!",
    event_category: 'music',
    event_type: 'party_social_gathering',
    organizer_name: 'Purple Disco Machine',
    price: 100,
    timestamp_start: DateTime.parse('09 Sep 2023 20:00'),
    timestamp_end: DateTime.parse('09 Sep 2023 23:59'),
    title: 'Eternal Disco - Dance Til They Drop',
    venue_name: 'the great hall',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/2.jpeg'), filename: 'disco.jpeg')

e3 = Event.create!({
    address: 'Chelsea Wine Market',
    capacity: 50,
    description: "Discover enchanting ambiance and
     luscious elixirs, where the finest-tasting wines and even 
     finer-tasting patrons await to indulge the 
     immortal senses. Amidst a hauntingly elegant setting, 
     embrace the allure of deep crimson and velvety red wines 
     that speak to the nocturnal heart, the perfect aperitif for
     your main course, if we say so ourselves. Let your taste 
     buds dance as each sip unveils layers of exquisite flavors, 
     carefully curated to pair with the finest meats and satisfy 
     even the most refined palates. Unite with fellow vampires in this exclusive wine tasting 
     event, celebrating the eternal romance between the undead 
     and the captivating elixir of the vine.",
    event_category: 'food_drink',
    event_type: 'type_other',
    organizer_name: 'Purveyors of Rare and Fine "Wines"',
    price: 35,
    timestamp_start: DateTime.parse('31 Aug 2023 17:00'),
    timestamp_end: DateTime.parse('31 Aug 2023 19:00'),
    title: 'Wine Tasting - Enjoy Each Mouthwatering Sip',
    venue_name: 'chelsea wine market',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/3.jpeg'), filename: 'wine.jpeg')

e4 = Event.create!({
    address: 'address',
    capacity: 100,
    description: "Escape the confines of the city and embark 
    on a thrilling camping trip specially crafted for vampires and
    their unwitting prey! Join us at the Eternal Resting Place
    Retreat, where nocturnal wonders await in the heart of the 
    wilderness. Who doesn't love the thrill of a good chase? 
    Under the moonlit sky, bond with fellow immortals around 
    crackling campfires (don't get too close), share stories of 
    centuries past, and indulge in blood-red delicacies (there
    will be many other campers nearby). Explore enchanting 
    forests, hidden caves, and eerie landscapes, relishing the 
    thrill of the eternal night. Embrace the chaos of 
    nature's nocturnal embrace in this unforgettable journey 
    for creatures of the night.",
    event_category: 'travel_outdoor',
    event_type: 'camp_trip_retreat',
    organizer_name: 'Eternal Resting Place Campground',
    price: 80,
    timestamp_start: DateTime.parse('20 Mar 2024 17:00'),
    timestamp_end: DateTime.parse('20 Mar 2024 23:59'),
    title: "Camping Trip - Rotisserie Included",
    venue_name: 'the great hall',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/4.jpeg'), filename: 'camping.jpeg')

e5 = Event.create!({
    address: 'address',
    capacity: 100,
    description: "Welcome to the Night-Bites Culinary Academy, 
    an immersive cooking class designed exclusively for vampires!
    Embrace your nocturnal essence and carnal desires as our 
    master chefs guide you through a tantalizing journey of 
    undead gastronomy - and at the end, the other attendees are 
    also on the menu! Learn to create delectable blood-inspired 
    dishes, indulge in eerie desserts, and conjure bewitching 
    beverages that will entrance your prey. Unveil the secrets of 
    vampire culinary arts in an atmosphere of mystique and 
    camaraderie. Whether you're a fledgling or a seasoned 
    vampire, join us to discover the dark delights that satisfy 
    the immortal palate with the unwilling. Fangs, aprons, and 
    cauldrons ready — let's cook up a night to remember!",
    event_category: 'community_culture',
    event_type: 'convention',
    organizer_name: 'Night-Bites Culinary Academy',
    price: 100,
    timestamp_start: DateTime.parse('10 Oct 2023 17:00'),
    timestamp_end: DateTime.parse('10 Oct 2023 23:00'),
    title: 'Cooking Class - Dine With (on) A Partner',
    venue_name: 'the great hall',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/5.jpeg'), filename: 'dining.jpeg')

e6 = Event.create!({
    address: 'Javits Center, New York',
    capacity: 400,
    description: "Unearth the ultimate fusion of pop culture and 
    vampiric delight at Immortal Con, the comic event designed 
    for creatures of the night. Delve into a world of gothic 
    wonders, where vampires and comic heroes collide. Meet 
    the impostors who appropriate our culture, and make them rue
    the day they mocked us with gaudy capes and outdated widows 
    peaks. Embrace your immortal passions as you explore the 
    dark corners of the convention, blending in mingling with 
    fellow aficionados of the undead realm.",
    event_category: 'community_culture',
    event_type: 'convention',
    organizer_name: 'Immortal Con',
    price: 70,
    timestamp_start: DateTime.parse('15 Jan 2024 15:00'),
    timestamp_end: DateTime.parse('15 Jan 2024 19:00'),
    title: 'Immortal Con - A Pun for the Darkest of Ages',
    venue_name: 'Javits Center',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/6.jpeg'), filename: 'comiccon.jpeg')

e7 = Event.create!({
    address: '1000 5th Ave, New York, NY 10028',
    capacity: 200,
    description: 'Embrace the enigmatic allure of the night at 
    the Met, a mesmerizing event tailored for the connoisseurs of 
    art and culture (and those who enjoy it). Wander through the 
    hallowed halls of the museum as darkness descends, surrounded 
    by breathtaking exhibits that echo tales of immortal mysteries. 
    Lurk in shadowy corridors and indulge in the haunting melodies 
    of live music as you dine on the unsuspecting wanderer. Meet 
    fellow nocturnal enthusiasts, revel in forbidden arts, and 
    let the ambiance transport you to a night of timeless 
    elegance and eternal intrigue.',
    event_category: 'community_culture',
    event_type: 'attraction',
    organizer_name: "Count Orlok Foundation",
    price: 60,
    timestamp_start: DateTime.parse('22 Feb 2024 18:00'),
    timestamp_end: DateTime.parse('22 Feb 2024 23:00'),
    title: 'Nocturnal Museum Soiree, Taste the Elite',
    venue_name: 'Metropolitan Museum of Art',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/7.png'), filename: 'museum.jpeg')

e8 = Event.create!({
    address: 'Bronx Night Market',
    capacity: 2000,
    description: "Step into the world of the undead at the 
    Nocturnal Street Fest, a captivating event for vampires. 
    Wander the streets as night falls, adorned with mystical 
    decorations and flickering lanterns. Delight in the eclectic 
    blend of macabre arts, mesmerizing performances, and 
    hauntingly delicious *treats*. Dance to haunting melodies, 
    discover dark curiosities, and embrace the camaraderie of 
    fellow creatures of the night. Immerse yourself in the 
    allure of this shadowy carnival, where the night comes 
    alive with immortal revelry and enchantment.",
    event_category: 'community_culture',
    event_type: 'festival_fair',
    organizer_name: 'Bronx Night Market',
    price: 0,
    timestamp_start: DateTime.parse('10 Oct 2023 17:00'),
    timestamp_end: DateTime.parse('10 Oct 2023 23:00'),
    title: 'Night Market - An Outdoor Frenzy',
    venue_name: 'the great hall',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/8.jpeg'), filename: 'nightmarket.jpeg')

e9 = Event.create!({
    address: 'The Bitter End',
    capacity: 75,
    description: "Embrace the shadows and join us for Dark Verse 
    Open Mic, an enchanting evening where horrendous singers 
    gather to drive us into maddening rage in their attempts at poetry 
    and spoken word. You may even hear a tune or two you like, as
    immortal wordsmiths share haunting tales of love, loss, and 
    the eternal night. Whether you're a fledgling poet or a 
    seasoned bard, take the stage and mesmerize the audience with 
    your immortal verses - they'll be all the more ripe for the 
    picking. Let the moonlight guide you, and bask in the 
    spine-chilling noir of this nocturnal literary gathering. If
    someone's singing is that bad...your first bite can be the 
    vocal cords.",
    event_category: 'music',
    event_type: 'concert_performance',
    organizer_name: 'The Bitter End',
    price: 20,
    timestamp_start: DateTime.parse('23 Nov 2024 18:00'),
    timestamp_end: DateTime.parse('23 Nov 2024 21:00'),
    title: 'Open Mic Night for Open Mouths',
    venue_name: 'the bitter end',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/9.jpeg'), filename: 'mic.jpeg')

e10 = Event.create!({
    address: 'Industry City, Brooklyn',
    capacity: 3000,
    description: "Summon the undead and join us for ultimate 
    Night of Shadows, a Halloween party designed to enthrall 
    creatures of the night. Beneath the silver moon, venture 
    into a realm of Gothic enchantment and eerie delights. 
    Don your most haunting costumes and feast the night away to 
    spine-chilling tunes. Savor blood-red libations and then 
    indulge in other blood-red delicacies that tickle your fancy. 
    Engage in mysterious games, embrace immortal rituals, 
    and celebrate the thrill of the eternal night. Welcome to a 
    Halloween party where darkness reigns, and vampires revel 
    in the timeless essence of the best holiday.",
    event_category: 'community_culture',
    event_type: 'party_social_gathering',
    organizer_name: 'City of Gods',
    price: 90,
    timestamp_start: DateTime.parse('31 Oct 2023 18:00'),
    timestamp_end: DateTime.parse('31 Oct 2023 23:59'),
    title: 'City of Gods and Devils - The Big One',
    venue_name: 'brooklyn hall',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/10.png'), filename: 'halloween.jpeg')

e11 = Event.create!({
    address: 'Empire City Casino',
    capacity: 300,
    description: "Sink your fangs into the thrill of the night 
    at Eternal Jackpot, the casino event crafted especially 
    for creatures of the dark. Join fellow vampires and those 
    otherwise on their last leg for a night of games of chance, 
    where stakes are high and fortunes are eternal (but theirs
    certainly won't be). Embrace the allure of the nocturnal 
    ambiance as neon lights dance with shadows. Let the roulette 
    wheels spin, cards fly, and dice roll as you chase the 
    jackpot, whatever jackpot you desire, under the cloak of the 
    eternal moon. Bet, bluff, and revel in the eternal rush of a 
    night that never ends!",
    event_category: 'community_culture',
    event_type: 'party_social_gathering',
    organizer_name: 'Gamblers With Bite',
    price: 0,
    timestamp_start: DateTime.parse('10 Oct 2023 17:00'),
    timestamp_end: DateTime.parse('10 Oct 2023 23:00'),
    title: 'Eternal Jackpot - A Casino Night for the Ages',
    venue_name: 'empire city casino',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/11.webp'), filename: 'casino.jpeg')

e12 = Event.create!({
    address: '4 Pennsylvania Plaza, New York, NY 10001',
    capacity: 3000,
    description: "Embrace the ethereal enchantment of Twilight 
    Serenade, a mesmerizing concert experience tailor-made for 
    the nocturnal souls of the undead. Join us as the bewitching 
    voice of Florence Welch and the haunting melodies of the 
    Machine weave a tapestry of darkly poetic ballads and
    powerful anthems. Feel something, while you taste someONE. 
    Immerse yourself in the spellbinding atmosphere of the night, 
    where the music ignites the immortal spirit within. 
    Dance with fellow vampires and let the music carry you 
    on a journey through the mystical realms of your immortal 
    heart as dine on someone else's.",
    event_category: 'music',
    event_type: "concert_performance",
    organizer_name: "Florence and the Machine",
    price: 125,
    timestamp_start: DateTime.parse('15 Apr 2024 20:00'),
    timestamp_end: DateTime.parse('15 Apr 2024 23:00'), 
    title: 'Florence and the Machine - Dance Frenzy',
    venue_name: 'Madison Square Garden',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
    }).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/12.avif'), filename: 'florence.jpeg')

e13 = Event.create!({
    address: 'Prospect Park, Brooklyn',
    capacity: 100,
    description: "Gather under the starry sky for Moonlit 
    Enchantment, an outdoor event exclusively tailored for 
    vampires. Embrace the allure of the night as you bask in the 
    soft glow of the moon and twinkling lights. Engage in 
    nocturnal activities, from midnight strolls through bewitched
    woods to chilling storytelling by the fire. Savor decadent 
    dark delicacies and blood-red...well, blood. Unite with fellow 
    immortals in this unforgettable celebration of eternal 
    camaraderie. Welcome to a realm where the outdoors come 
    alive with nocturnal allure and the eternal magic of the 
    undead.",
    event_category: 'travel_outdoor',
    event_type: 'attraction',
    organizer_name: 'The City of Brooklyn',
    price: 0,
    timestamp_start: DateTime.parse('10 Feb 2023 17:00'),
    timestamp_end: DateTime.parse('10 Feb 2023 23:00'),
    title: 'Fashion Week the Casle Down Slay',
    venue_name: 'the great hall',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
    }).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/13.jpeg'), filename: 'park.jpeg')

e14 = Event.create!({
    address: 'Webster Hall',
    capacity: 500,
    description: "Indulge in the timeless allure of the Eternal 
    Masquerade Ball, a mesmerizing soiree designed for vampires. 
    Embrace the enchantment of the night as you don your most 
    elegant attire and ornate masks to conceal your immortal 
    identity and truest desires. Dance beneath flickering c
    andlelight to haunting melodies, surrounded by fellow 
    nocturnal souls. Revel in the secrecy of the masked affair, 
    where dark romances bloom and identities are disguised, so you
    can give into your hunger. Join us for a night of eternal 
    mystery and decadence.",
    event_category: 'music',
    event_type: 'party_social_gathering',
    organizer_name: 'Andrew Lloyd Webber, probably',
    price: 40,
    timestamp_start: DateTime.parse('10 Oct 2023 20:00'),
    timestamp_end: DateTime.parse('10 Oct 2023 23:59'),
    title: 'Masquerade Ball - Disguises Welcomed',
    venue_name: 'webster hall',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/14.jpeg'), filename: 'masquerade.jpeg')

e15 = Event.create!({
    address: 'Spring Studios, 50 Varick Street',
    capacity: 300,
    description: "Experience the epitome of gothic glamour at 
    Eternal Elegance, a fashion week extravaganza 
    curated for vampires and others with good taste. Enter a 
    world of timeless designs and flavors, as immortal couturiers
    unveil bewitching creations that blend sophistication with a dark 
    mystique. Witness spellbinding runway shows showcasing the latest 
    trends in nocturnal haute couture. Embrace the allure of 
    immortal beauty as models adorned in exquisite ensembles glide under the moonlit 
    spotlight, until you simply can't resist their call any longer. 
    Join fellow fashion-forward vampires and celebrate the 
    eternal artistry that transcends both time and style.",
    event_category: 'fashion_beauty',
    event_type: 'dinner_gala',
    organizer_name: 'FIDM',
    price: 25,
    timestamp_start: DateTime.parse('10 Oct 2023 17:00'),
    timestamp_end: DateTime.parse('10 Oct 2023 23:00'),
    title: 'Sickening (Deathly) Fashion Week',
    venue_name: 'the great hall',
    organizer_id: User.all.map(&:id)[rand(User.count-1)]
}).photo.attach(io: URI.open('https://eventbite-dev.s3.amazonaws.com/15.webp'), filename: 'fashion.jpeg')

20.times do 
    user_id = User.all.map(&:id)[rand(User.count-1)]
    events = Event.where.not(organizer_id: user_id).map(&:id)
    event_id = events[rand(events.length-1)]

    num_tickets = rand(2..20)
    Order.create!({
        event_id: event_id,
        ticketholder_id: user_id,
        num_tickets: num_tickets
    })
end

until Like.count == 30 do
    user_id = User.all.map(&:id)[rand(User.count-1)]
    event_id = Event.where.not(organizer_id: user_id).map(&:id)[rand(Event.count-1)]
    Like.create!({
        liker_id: user_id,
        event_id: event_id
    })
end