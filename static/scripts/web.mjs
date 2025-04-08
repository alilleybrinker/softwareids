/**
 * This code adapted from char's "rainbow" project.
 *
 * https://github.com/char/rainbow/blob/47721ad574c61d59921435a2bff41b9fd582540d/src/util/elem.ts
 *
 * It's licensed under the terms of the WTFPL.
 *
 * https://bsky.app/profile/pet.bun.how/post/3l7vv6ddjn426
 */

// A little way to reduce an object down to only defined entries, since
// entries can have a key but an undefined value.
function removeUndefinedValues(x) {
  const entries = Object.entries(x).filter(([_k, v]) => v !== undefined);
  return Object.fromEntries(entries);
}

/**
 * Construct a new HTMLElement
 */
export function elem(tag, attrs = {}, extras = {}, children = []) {
  // Create the new element.
  const element = document.createElement(tag);

  // Assign any defined values from `attrs`.
  Object.assign(element, removeUndefinedValues(attrs));

  // Fill in any provided classes.
  if (extras.classList) {
    extras.classList.forEach((c) => element.classList.add(c));
  }

  // Fill in any assigned data attributes.
  if (extras.dataset) {
    Object.entries(extras.dataset)
      .filter(([_k, v]) => v !== undefined)
      .forEach(([k, v]) => (element.dataset[k] = v));
  }

  // Populate any children.
  const nodes = children.map((e) =>
    typeof e === "string" ? document.createTextNode(e) : e,
  );
  element.append(...nodes);

  return element;
}
