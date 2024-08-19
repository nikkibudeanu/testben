import { ShadowToken } from "@supernovaio/sdk-exporters";
import { arrayToDictionary } from "../../utils/arrayToDictionary";
import { shadowTokenToJSON } from "./shadowTokenToJson";

export const generateShadowStyleDictionary = (
  tokens: ShadowToken[],
  tokenGroups
) => {
  const mappedTokens = new Map(tokens.map((token) => [token.id, token]));

  const values = tokens.map((token) =>
    shadowTokenToJSON(token, mappedTokens, tokenGroups)
  );

  // Returning the JSON object here instead of writing to a file
  // since we want to append it to the color dictionary

  return arrayToDictionary(values);
};
