/* eslint-disable security/detect-non-literal-fs-filename */
import { type Dirent } from 'fs';
import { readdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

import { findFarthestFile } from 'pkg-types';
import prettier from 'prettier';

/**
 * This function lists all directories in a given path.
 * @param path The path to the parent directory
 * @returns A list of directory names in the parent directory
 */
export async function listDirectories(path: string): Promise<Dirent[]> {
  return (await readdir(path, { withFileTypes: true })).filter((d) =>
    d.isDirectory(),
  );
}

/**
 * This function lists all files in a given path.
 * @param path The path to the parent directory
 * @returns A list of file names in the parent directory
 */
export async function listFiles(path: string): Promise<Dirent[]> {
  return (await readdir(path, { withFileTypes: true })).filter((d) =>
    d.isFile(),
  );
}

type FormatAndWriteWithPrettierConfig = {
  content: string;
} & (
  | {
      filePath?: undefined;
      outputFilePath: string;
      parser: prettier.BuiltInParserName;
    }
  | {
      filePath: string;
      outputFilePath?: undefined;
      parser?: undefined;
    }
);

/**
 * This function formats the given content with Prettier and writes it to the
 * output file.
 * @param args The arguments for the function.
 * @returns The formatted content.
 */
export async function formatAndWriteWithPrettier(
  args: FormatAndWriteWithPrettierConfig,
) {
  const configFile = await findFarthestFile('prettier.config.js');
  const prettierConfig = await prettier.resolveConfig(configFile);

  if (!prettierConfig) {
    throw new Error('Prettier config not found');
  }

  /**
   * This function generates the Prettier config.
   * @returns The Prettier config.
   */
  function genConfig(): prettier.Config {
    if (args.parser) {
      return {
        ...prettierConfig,
        parser: args.parser,
      };
    }

    return {
      ...prettierConfig,
      filepath: args.filePath,
    };
  }

  const formatted = await prettier.format(args.content, genConfig());

  /**
   * This function generates the output file path.
   * @returns The output file path.
   */
  function genOutputFilePath(): string {
    if (args.outputFilePath) {
      return args.outputFilePath;
    }

    if (args.filePath) {
      return args.filePath;
    }

    throw new Error('outputFilePath or filePath must be provided');
  }

  await writeFile(genOutputFilePath(), formatted);

  return formatted;
}

/**
 * This function is used to resolve the absolute path of a package. It is needed
 * in projects that use Yarn PnP or are set up within a monorepo.
 * @param value The package name.
 * @returns The absolute path of the package.
 */
export function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
/* eslint-enable security/detect-non-literal-fs-filename */
