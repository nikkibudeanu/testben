import { CSSHelper, ColorFormat } from "@supernovaio/export-helpers";
import { ColorToken, Token, TokenGroup } from "@supernovaio/sdk-exporters";
import { getTokenVariableName } from "../../utils/getTokenVariableName";

export function colorTokenToJSON(
  token: ColorToken,
  mappedTokens: Map<string, Token>,
  tokenGroups: Array<TokenGroup>
): {} {
  // First creating the name of the token, using helper function which turns any token name / path into a valid variable name
  const name = getTokenVariableName(token, tokenGroups);

  // @ts-ignore
  const value = CSSHelper.colorTokenValueToCSS(token.value, mappedTokens, {
    allowReferences: true,
    decimals: 3,
    colorFormat: ColorFormat.smartHashHex,
    tokenToVariableRef: (t) => {
      // @ts-ignore
      return `{core.${getTokenVariableName(t, tokenGroups)}}`;
    },
  });

  const styleDictionary = {};
  let currentLevel = styleDictionary;

  const parts = name.split("."); // Split the name by periods for nesting

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      currentLevel[part] = {
        value,
        type: "color",
        description: token.description,
      };
    } else {
      currentLevel[part] = currentLevel[part] || {};
      currentLevel = currentLevel[part];
    }
  });

  return styleDictionary;
}
