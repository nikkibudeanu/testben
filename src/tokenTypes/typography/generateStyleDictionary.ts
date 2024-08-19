import { TypographyToken } from "@supernovaio/sdk-exporters";
import { typographyTokenToJSON } from "./typographyTokenToJSON";
import { arrayToDictionary } from "../../utils/arrayToDictionary";

export const generateTypographyStyleDictionary = (
  tokens: TypographyToken[],
  tokenGroups
) => {
  const values = tokens
    .filter((t) => t.value?.referencedTokenId === null)
    .map((token) => typographyTokenToJSON(token));

  // Returning the JSON object here instead of writing to a file
  // since we want to append it to the color dictionary

  return arrayToDictionary(values);
};
