"use strict";

const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "FSD relative path checker",
      recommended: false,
      url: null,
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      customErr1: "Within one module, imports must be relative",
    },
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        // example app/entities/Artilce
        const importTo = node.source.value;

        // example /projects/ulbi-project/src/index.tsx
        const fromFilename = context.getFilename();

        if (shouldBeRelative(fromFilename, importTo)) {
          context.report({node, messageId: "customErr1"});
        }
      }
    };
  },
};

const layers = {
  "entities": "entities",
  "features": "features",
  "shared": "shared",
  "pages": "pages",
  "widgets": "widgets",
}

function isPathRelative(path) {
  return path === "." || path.startsWith("./") || path.startsWith("../");
}

function shouldBeRelative(from, to) {
  if (isPathRelative(to)) {
    return false;
  }

  const toArray = to.split("/");
  const toLayer = toArray[0];
  const toSlice = toArray[1];

  if(!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  const normalizedPath = path.toNamespacedPath(from);
  
  const srcFrom = normalizedPath.split("src");
  if (srcFrom.length <= 1) {
    return false;
  }
  const projectFrom = srcFrom[1];
  const fromArray = projectFrom.split("/");
  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if(!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  return fromSlice === toSlice && toLayer === fromLayer;
}
