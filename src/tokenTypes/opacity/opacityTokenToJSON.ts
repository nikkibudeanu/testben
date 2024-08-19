import { OpacityToken, TokenGroup } from "@supernovaio/sdk-exporters";
import { getTokenVariableName } from "../../utils/getTokenVariableName";

export const opacityTokenToJSON = (
  token: OpacityToken,
  tokenGroups: Array<TokenGroup>
) => {
  const name = getTokenVariableName(token, tokenGroups);

  const styleDictionary = {};
  let currentLevel = styleDictionary;

  const parts = name.split("."); // Split the name by periods for nesting

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      currentLevel[part] = {
        value: token.value.measure,
        type: "opacity",
        description: token.description,
      };
    } else {
      currentLevel[part] = currentLevel[part] || {};
      currentLevel = currentLevel[part];
    }
  });

  return styleDictionary;
};
