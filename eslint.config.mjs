import pluginJs from "@eslint/js";
import next from "eslint-config-next";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		languageOptions: { globals: globals.browser },
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	next.configs.flat["recommended"],
	next.configs.flat["core-web-vitals"],
];
