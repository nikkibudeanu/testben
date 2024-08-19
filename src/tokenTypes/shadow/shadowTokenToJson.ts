import { ShadowToken, TokenGroup } from "@supernovaio/sdk-exporters";
import { getTokenVariableName } from "../../utils/getTokenVariableName";
import { ColorFormat, CSSHelper } from "@supernovaio/export-helpers";

export const shadowTokenToJSON = (
  token: ShadowToken,
  mappedTokens: Map<string, any>,
  tokenGroups: Array<TokenGroup>
) => {
  const name = getTokenVariableName(token, tokenGroups);

  // @ts-ignore
  const value = CSSHelper.shadowTokenValueToCSS(token.value, mappedTokens, {
    allowReferences: false,
    decimals: 3,
    colorFormat: ColorFormat.hashHex8,
  });

  const styleDictionary = {};
  let currentLevel = styleDictionary;

  const parts = name.split("."); // Split the name by periods for nesting

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      currentLevel[part] = {
        value,
        type: "boxShadow",
        description: token.description,
      };
    } else {
      currentLevel[part] = currentLevel[part] || {};
      currentLevel = currentLevel[part];
    }
  });

  return styleDictionary;
};
