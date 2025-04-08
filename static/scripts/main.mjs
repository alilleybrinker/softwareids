import { elem } from "./web.mjs";

export async function main() {
  let host = window.location.origin;

  const data = await fetchJson(`${host}/data/software_ids.json`);
  if (data === null) return;

  let elem = document.getElementById("software-id-list");
  elem.appendChild(buildSoftwareIdList(data));
}

function buildSoftwareIdList(data) {
  shuffle(data.formats);

  return elem(
    "div",
    {},
    c("md:columns-2 md:gap-8"),
    data.formats.map((spec) => buildSoftwareIdEntry(spec)),
  );
}

function buildSoftwareIdEntry(spec) {
  return elem(
    "div",
    {},
    c(
      "md:break-inside-avoid border border-slate-300 p-8 rounded-2xl bg-white shadow-md shadow-slate-200 mb-8",
    ),
    [
      elem("h2", {}, c("text-xl mb-2 font-bold"), [
        elem("a", { href: spec.definition_url }, c("hover:text-blue-500"), [
          `${spec.name} ↗`,
        ]),
      ]),
      elem("ul", {}, c("list-none ps-0 mb-4 text-sm text-slate-600"), [
        elem("li", {}, {}, [`Derivation: ${derivationName(spec.derivation)}`]),
        elem("li", {}, {}, [aliasesString(spec.aliases)]),
      ]),
      elem("p", {}, {}, [`${spec.description}`]),
    ],
  );
}

function c(classes) {
  return { classList: Array.from(classes.split(" ")) };
}

function aliasesString(aliases) {
  switch (aliases.length) {
    case 0:
      return `Aliases: (None)`;
    case 1:
      return `Alias: ${aliases[0]}`;
    default:
      return `Aliases: ${aliases.join(", ")}`;
  }
}

/*
 * Adapted from https://stackoverflow.com/a/2450976
 */
function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

function derivationName(derivation) {
  switch (derivation) {
    case "defined":
      return "Defined";
    case "inherent":
      return "Inherent";
    default:
      return "Unknown";
  }
}

async function fetchJson(url) {
  try {
    const response = await fetch(`${url}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
