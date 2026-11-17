# Dependency security

Run `npm ci` and `npm audit --audit-level=low` to check the complete dependency
tree, including development tools. Pull requests run that audit and the production
build in GitHub Actions.

`vite-plugin-lqip@0.0.5` requires Sharp 0.33, which bundles vulnerable image
libraries. The scoped override in `package.json` selects Sharp 0.35.5 or newer
for that plugin. Keep the override until the plugin supports a patched Sharp
version itself. Verify changes to it with `npm run build`, which generates the
site's image placeholders and optimizes production images.
