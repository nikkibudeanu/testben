import { FileHelper } from "@supernovaio/export-helpers";
import { ColorToken } from "@supernovaio/sdk-exporters";
import { arrayToDictionary } from "../../utils/arrayToDictionary";
import { colorTokenToJSON } from "./colorTokenToJSON";

export const generateColorStyleDictionary = (
  tokens: ColorToken[],
  tokenGroups,
  name,
  aviaryTypographyObject,
  opacityObject,
  shadowsObject
) => {
  const mappedTokens = new Map(tokens.map((token) => [token.id, token]));

  const coreColors = tokens
    .filter((t) => t.propertyValues.tokenSet === "token-set-core")
    .map((token) => colorTokenToJSON(token, mappedTokens, tokenGroups));

  const semanticColors = tokens
    .filter((t) => t.propertyValues.tokenSet === "token-set-semantic")
    .map((token) => colorTokenToJSON(token, mappedTokens, tokenGroups));

  // Create light JSON file content
  let coreContent = JSON.stringify(
    { core: arrayToDictionary(coreColors) },
    null,
    2
  );

  let semanticContent = JSON.stringify(
    {
      ...arrayToDictionary(semanticColors),
      aviaryTypography: aviaryTypographyObject,
      opacity: opacityObject,
      boxShadows: shadowsObject,
    },
    null,
    2
  );

  // Create output file and return it
  return [
    FileHelper.createTextFile({
      relativePath: `/themes/${name}`,
      fileName: `core.json`,
      content: coreContent,
    }),
    FileHelper.createTextFile({
      relativePath: `/themes/${name}`,
      fileName: `semantic.json`,
      content: semanticContent,
    }),
  ];
};
