export function getTags() {
  //Change this
  let db = window.gigaArcade.gamesSync();

  let tags = {};

  tags["genres"] = [
    "Action",
    "Adventure",
    "Action-Adventure",
    "Platform",
    "Puzzle",
    "Role-Playing",
    "Simulation",
    "Strategy",
    "Sports",
    "Sandbox",
    "Singleplayer",
    "Coop",
    "Others",
  ];

  tags["operative_system"] = [
    "Windows",
    "IOS",
    "MacOS",
    "Android",
    "Linux",
    "Other",
  ];

  tags["UC"] = [
    "CGRA",
    "LCOM",
    "DJCO",
    "JDMM",
    "DDJD",
    "LAIG",
    "SGI",
    "Others",
  ];

  tags["Playability"] = ["Playable", "QR Code"];

  tags["year"] = [];

  tags["authors"] = new Set();

  db.forEach((item) => {
    item.authors.forEach((author) => {
      tags["authors"].add(author.name);
    });
  });

  tags["authors"] = [...tags["authors"]];
  return tags;

}
