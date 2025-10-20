import { IMemoryGameCard, MemoryCardParams, MemoryCardType } from "../types";
import { absoluteCDN } from "../utils";

const BASE_PATHS: MemoryCardType<string> = {
     birds: absoluteCDN("images","/pairs/birds/"),
     domesticAnimals: absoluteCDN("images","/pairs/domestic-animals/"),
     wildAnimals: absoluteCDN("images","/pairs/wild-animals/"),
     fruit: absoluteCDN("images","/pairs/fruit/"),
     vegetables: absoluteCDN("images","/pairs/vegetables/"),
     colors: absoluteCDN("images","/pairs/colors/"),
     transportation: absoluteCDN("images","/pairs/transportation/"),
     insects: absoluteCDN("images","/pairs/insects/"),
     forestAnimals: absoluteCDN("images","/pairs/forest-animals/"),
     solarSystem: absoluteCDN("images","/pairs/solar-system/"),
     christmas: absoluteCDN("images","/pairs/christmas/"),
}
const IMAGE_FILES: MemoryCardType<string[]> = {
     birds: ["chicken.webp", "dove.webp", "eagle.webp", "flamingo.webp", "duck.webp","owl.webp", "parrot.webp", "peacock.webp", "penguin.webp", "rooster.webp","sparrow.webp", "stork.webp"],
     domesticAnimals: ["cat.webp", "cow.webp", "dog.webp", "donkey.webp", "goat.webp","horse.webp", "pig.webp", "sheep.webp"],
     wildAnimals: ["cheetah.webp", "elephant.webp", "giraffe.webp", "lion.webp", "monkey.webp","rhino.webp", "tiger.webp", "zebra.webp"],
     fruit: ["apricot.webp", "apple.webp", "bananas.webp", "cherry.webp", "grapes.webp","orange.webp", "pear.webp", "pomegranate.webp", "strawberry.webp", "watermelon.webp"],
     vegetables: ["eggplant.webp", "pepper.webp", "cabbage.webp", "carrot.webp", "corn.webp","cucumber.webp", "potato.webp", "tomato.webp"],
     colors: ["red.webp", "orange.webp", "yellow.webp", "green.webp", "blue.webp","purple.webp", "pink.webp", "brown.webp","black.webp","white.webp"],
     transportation: ["ambulance.webp", "bike.webp", "bus.webp", "car.webp", "fire-engine.webp","plane.webp", "police-car.webp", "ship.webp", "tractor.webp", "train.webp"],
     insects: ["ant.webp", "bee.webp", "bug.webp", "butterfly.webp", "dragonfly.webp","fly.webp", "grasshopper.webp", "ladybug.webp", "mantis.webp", "mosquito.webp"],
     forestAnimals: ["bear.webp", "deer.webp", "fox.webp", "hedgehog.webp", "rabbit.webp","raccoon.webp", "squirrel.webp", "wolf.webp"],
     solarSystem: ["earth.webp", "jupiter.webp", "mars.webp", "mercury.webp", "neptune.webp","pluto.webp", "saturn.webp", "uranus.webp", "venus.webp", "sun.webp"],
     christmas: ["bell.webp", "christmas-tree.webp", "gift.webp", "ornament-1.webp","ornament-2.webp", "reindeer.webp", "santa.webp", "sleigh.webp","snowman.webp", "stocking-1.webp", "stocking-2.webp", "wreath.webp"],
}
const generateCards = (category: MemoryCardParams): IMemoryGameCard[] =>
     IMAGE_FILES[category].map(filename=>({
          img: `${BASE_PATHS[category]}${filename}`,
          matched: false
     }))
export const pairsCards: MemoryCardType<IMemoryGameCard[]> = {
     birds: generateCards("birds" as MemoryCardParams),
     domesticAnimals: generateCards("domesticAnimals" as MemoryCardParams),
     wildAnimals: generateCards("wildAnimals" as MemoryCardParams),
     fruit: generateCards("fruit" as MemoryCardParams),
     vegetables: generateCards("vegetables" as MemoryCardParams),
     colors: generateCards("colors" as MemoryCardParams),
     transportation: generateCards("transportation" as MemoryCardParams),
     insects: generateCards("insects" as MemoryCardParams),
     forestAnimals:generateCards("forestAnimals" as MemoryCardParams),
     solarSystem:generateCards("solarSystem" as MemoryCardParams),
     christmas: generateCards("christmas")
}
export const BACK_FACE_IMAGES = {
     default: absoluteCDN("images","/pairs/back-face.webp"),
     christmas: absoluteCDN("images","/pairs/back-face-christmas.webp")
}