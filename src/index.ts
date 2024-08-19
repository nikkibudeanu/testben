import {
  Supernova,
  PulsarContext,
  RemoteVersionIdentifier,
  AnyOutputFile,
  TokenType,
  ColorToken,
  TypographyToken,
  ShadowToken,
  OpacityToken,
} from "@supernovaio/sdk-exporters";
import { generateColorStyleDictionary } from "./tokenTypes/color/generateStyleDictionary";
import { generateTypographyStyleDictionary } from "./tokenTypes/typography/generateStyleDictionary";
import { generateShadowStyleDictionary } from "./tokenTypes/shadow/generateStyleDictionary";
import { generateOpacityStyleDictionary } from "./tokenTypes/opacity/generateStyleDictionary";

/**
 * Export entrypoint.
 * When running `export` through extensions or pipelines, this function will be called.
 * Context contains information about the design system and version that is currently being exported.
 */
Pulsar.export(
  async (
    sdk: Supernova,
    context: PulsarContext
  ): Promise<Array<AnyOutputFile>> => {
    // Fetch data from design system that is currently being exported (context)
    const remoteVersionIdentifier: RemoteVersionIdentifier = {
      designSystemId: context.dsId,
      versionId: context.versionId,
    };

    // Fetch the necessary data
    const themes = await sdk.tokens.getTokenThemes(remoteVersionIdentifier);

    const darkTheme = themes.find((theme) => theme.codeName === "dark");

    const lightTokens = await sdk.tokens.getTokens(remoteVersionIdentifier, {
      brandId: context.brandId || "",
    });

    const darkTokens = darkTheme
      ? await sdk.tokens.computeTokensByApplyingThemes(lightTokens, [darkTheme])
      : [];

    let tokenGroups = await sdk.tokens.getTokenGroups(remoteVersionIdentifier, {
      brandId: context.brandId || "",
    });

    const colorTokens = lightTokens.filter(
      (t) => t.tokenType === TokenType.color
    ) as ColorToken[];

    const darkColorTokens = darkTokens.filter(
      (t) => t.tokenType === TokenType.color
    ) as ColorToken[];

    const typographyTokens = lightTokens.filter(
      (t) => t.tokenType === TokenType.typography
    ) as TypographyToken[];

    const aviaryTypographyObject = generateTypographyStyleDictionary(
      typographyTokens,
      tokenGroups
    );

    const boxShadowTokens = lightTokens.filter(
      (t) => t.tokenType === TokenType.shadow
    ) as ShadowToken[];

    const darkBoxShadowTokens = darkTokens.filter(
      (t) => t.tokenType === TokenType.shadow
    ) as ShadowToken[];

    const opacityTokens = lightTokens.filter(
      (t) => t.tokenType === TokenType.opacity
    ) as OpacityToken[];

    const darkOpacityTokens = darkTokens.filter(
      (t) => t.tokenType === TokenType.opacity
    ) as OpacityToken[];

    const shadowsObject = generateShadowStyleDictionary(
      boxShadowTokens,
      tokenGroups
    );

    const darkShadowsObject = generateShadowStyleDictionary(
      darkBoxShadowTokens,
      tokenGroups
    );

    const opacityObject = generateOpacityStyleDictionary(
      opacityTokens,
      tokenGroups
    );

    const darkOpacityObject = generateOpacityStyleDictionary(
      darkOpacityTokens,
      tokenGroups
    );

    // Create output file and return it
    return [
      ...generateColorStyleDictionary(
        colorTokens,
        tokenGroups,
        "light",
        aviaryTypographyObject,
        opacityObject,
        shadowsObject
      ),
      ...generateColorStyleDictionary(
        darkColorTokens,
        tokenGroups,
        "dark",
        aviaryTypographyObject,
        darkOpacityObject,
        darkShadowsObject
      ),
    ];
  }
);

/** Exporter configuration. Adheres to the `ExporterConfiguration` interface and its content comes from the resolved default configuration + user overrides of various configuration keys */
export const exportConfiguration = Pulsar.exportConfig();
