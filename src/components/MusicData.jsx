// src/data/musicData.js

const categories = [
    {
        title: "Indie",
        description: "I discovered most of these songs by accident, and they quickly became some of my favorites. I like how raw and creative they feel. I keep coming back to these whenever I want to listen to something fresh. The Indie scene defintely has a lot of hidden gems!",
        songs: [
            { src: "./music/corny_af/Arctic Monkeys - No. 1 Party Anthem.opus", title: "No. 1 Party Anthem", artist: "Arctic Monkeys" },
            { src: "./music/corny_af/sombr - back to friends (lyrics).opus", title: "back to friends", artist: "sombr" },
            { src: "./music/corny_af/sombr - undressed (official lyric video).opus", title: "undressed", artist: "sombr" },
            { src: "./music/corny_af/Toploader - Dancing in the Moonlight (Lyrics).opus", title: "Dancing in the Moonlight", artist: "Toploader" },
            { src: "./music/corny_af/Djo - End Of Beginning (Lyrics).opus", title: "End Of Beginning", artist: "Djo" },
            { src: "./music/corny_af/Chezile - Beanie (Lyrics).opus", title: "Beanie", artist: "Chezile" },
            { src: "./music/corny_af/Coyote theory - This Side Of Paradise (Lyrics).opus", title: "This Side Of Paradise", artist: "Coyote Theory" },
        ],
    },
    {
        title: "Classic Rock",
        description: "I grew up in an environment where my grandparents would play the music from their era and it just stuck with me, especially the soundtrack from old James Bond movies that my grandfather used to watch. A lot of these songs, particularly the 80s ones, are what inspired me to start playing electric guitar.",
        songs: [
            { src: "./music/80s/Tomorrow Never Dies.opus", title: "Tomorrow Never Dies", artist: "Sheryl Crow" },
            { src: "./music/80s/Garbage-The World Is Not Enough.opus", title: "The World Is Not Enough", artist: "Garbage" },
            { src: "./music/80s/Tom Petty - Love Is A Long Road (Official Audio).opus", title: "Love Is A Long Road", artist: "Tom Petty" },
            { src: "./music/80s/Blue Oyster Cult - (Don_t Fear) The Reaper (Lyrics).opus", title: "(Don't Fear) The Reaper", artist: "Blue Öyster Cult" },
            { src: "./music/80s/Bon Jovi - Livin_ On A Prayer.opus", title: "Livin' On A Prayer", artist: "Bon Jovi" },
            { src: "./music/80s/Bryan Adams - Run To You.opus", title: "Run To You", artist: "Bryan Adams" },
            { src: "./music/80s/Guns N_ Roses - Paradise City (Lyrics).opus", title: "Paradise City", artist: "Guns N' Roses" },
            { src: "./music/80s/Guns N_ Roses - Welcome To The Jungle (Lyrics).opus", title: "Welcome To The Jungle", artist: "Guns N' Roses" },
            { src: "./music/80s/Master of Puppets (Remastered).opus", title: "Master of Puppets", artist: "Metallica" },
        ],
    },
    {
        title: "Corny af",
        description: "These songs shouldn't even be here. I’m just too lazy to delete them from my database, so… here you go. \n\nYou might still catch a few gems in this mess though.",
        songs: [
            { src: "./music/corny_af/Bill Withers - Just The Two Of Us (Lyrics).opus", title: "Just The Two Of Us", artist: "Bill Withers" },
            { src: "./music/corny_af/Can_t Take My Eyes Off You (Craymer & Ruthie Craft).opus", title: "Can't Take My Eyes Off You", artist: "Craymer & Ruthie Craft" },
            { src: "./music/corny_af/FLY ME TO THE MOON - OLIVIA ONG (LYRICS).opus", title: "Fly Me to the Moon", artist: "Olivia Ong" },
            { src: "./music/corny_af/I Love You So x Until I Found You.opus", title: "I Love You So / Until I Found You", artist: "" },
            { src: "./music/corny_af/Killing Me Softly.opus", title: "Killing Me Softly", artist: "" },
            { src: "./music/corny_af/L-O-V-E.opus", title: "L-O-V-E", artist: "Nat King Cole" },
            { src: "./music/corny_af/Mitski - My Love Mine All Mine (Official Lyric Video).opus", title: "My Love Mine All Mine", artist: "Mitski" },
            { src: "./music/corny_af/Pink Sweat$ - At My Worst (Lyrics).opus", title: "At My Worst", artist: "Pink Sweat$" }, // .opus wins over .mp3
            { src: "./music/corny_af/Way Back Into Love.opus", title: "Way Back Into Love", artist: "" }, // .opus wins
            { src: "./music/corny_af/yung kai - blue (official music video).opus", title: "blue", artist: "yung kai" },
        ],
    },
    /*
    {
        title: "Electro",
        songs: [
            { src: "./music/electro/Daft Punk - Lose Yourself To Dance (Feat. Pharrell Williams).opus", title: "Lose Yourself To Dance", artist: "Daft Punk feat. Pharrell Williams" },
        ],
    },
    */
    {
        title: "Modern Corrido",
        description: "I love the way guitars sound in these songs and have been practicing some of them on my own. I’ve also always been into Mexican culture :)",
        songs: [
            { src: "./music/modern_corridos/Ando Más Que Mal.opus", title: "Ando Más Que Mal", artist: "" },
            { src: "./music/modern_corridos/Baby-Eslabon-Armado.opus", title: "Baby", artist: "Eslabon Armado" },
            { src: "./music/modern_corridos/dannylux - preguntalealaluna (visualizer).opus", title: "preguntalealaluna", artist: "dannylux" },
            { src: "./music/modern_corridos/DannyLux - Un Día Entenderás (letra).opus", title: "Un Día Entenderás", artist: "DannyLux" },
            { src: "./music/modern_corridos/Eslabo Armado, Peso Pluma - Ella Baila Sola.opus", title: "Ella Baila Sola", artist: "Eslabon Armado & Peso Pluma" },
            { src: "./music/modern_corridos/Eslabon Armado - Mi Historia Entre Tus Dedos (Letras_Lyrics).opus", title: "Mi Historia Entre Tus Dedos", artist: "Eslabon Armado" },
            { src: "./music/modern_corridos/Jugaste y Sufrí - Eslabon Armado Ft DannyLux (letra).opus", title: "Jugaste y Sufrí", artist: "Eslabon Armado ft. DannyLux" },
            { src: "./music/modern_corridos/Junior H - 1004 KM (Letra_Lyrics).opus", title: "1004 KM", artist: "Junior H" },
            { src: "./music/modern_corridos/Mario Bautista - Brindo (Video Oficial).opus", title: "Brindo", artist: "Mario Bautista" },
            { src: "./music/modern_corridos/Me Prendes - Eslabon Armado.opus", title: "Me Prendes", artist: "Eslabon Armado" },
            { src: "./music/modern_corridos/Solo Me Dejaste - Grupo Marca Registrada [Audio Oficial].opus", title: "Solo Me Dejaste", artist: "Grupo Marca Registrada" },
            { src: "./music/modern_corridos/Xavi - La Diabla.opus", title: "La Diabla", artist: "Xavi" },
            { src: "./music/modern_corridos/Xavi - La Víctima.opus", title: "La Víctima", artist: "Xavi" },
            { src: "./music/modern_corridos/¿Dime Porque_.opus", title: "¿Dime Porque", artist: "" },
        ],
    },
    /*
    {
        title: "Nerdy Crap",
        songs: [
            { src: "./music/nerdy_music/Weezer - Buddy Holly (2024 Remaster).opus", title: "Buddy Holly", artist: "Weezer" },
            { src: "./music/nerdy_music/Weezer - Island In The Sun.opus", title: "Island In The Sun", artist: "Weezer" },
            { src: "./music/nerdy_music/Weezer - Only In Dreams (Acoustic Cover).opus", title: "Only In Dreams (Acoustic)", artist: "Weezer" },
            { src: "./music/nerdy_music/Weezer - The Good Life.opus", title: "The Good Life", artist: "Weezer" },
        ],
    },
    */
    {
        title: "OPM",
        description: "Kind of an incomplete playlist. I'm too lazy to complete this. Maybe some other time, but for now, here's a catchy song that is really supposed to be more an advertisement than a song, but hey, I like the guitar riff",
        songs: [
            { src: "./music/opm/MAY PALAG ANG LAKAS MO!.opus", title: "MAY PALAG ANG LAKAS MO!", artist: "" },
        ],
    },

];

export default categories;