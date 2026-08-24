<p align="center">
     <img src="https://raw.githubusercontent.com/ArsenGabrielyan/ArsenKids/refs/heads/main/.github/logo-main.png" alt="ArsenKids" width="510" height="120"/>
</p>
<h1 align="center">Contributing ArsenKids</h1>

First off, thanks for considering contributing to this project!  
Your ideas, time, and effort help make it better for everyone. :-)

We welcome all kinds of contributions — code, design, translations, documentation, bug reports, feature ideas, and feedback.  
This guide explains how you can get involved.

---

## 🚀 Ways to Contribute
You don’t need to write code to make a valuable contribution! Here are some great ways:
- **Development** – Fix bugs, add features, or refactor code.
- **Testing & Bug Reports** – Try the app on different devices and report any issues.
- **Translations** – Help make the project available in more languages.
- **Design & UI Feedback** – Suggest layout, accessibility, or UX improvements.
- **Feature Requests** – Share your ideas for improvements by opening a feature request.
- **Community Support** – Answer questions in issues and help others get started.

## ✅ Pull Request Guidelines
When submitting a PR:
1. Create a branch from `main`:
   ```bash
   git checkout -b <type>/<short-description>
   # examples: feature/new-game, fix/typo, i18n/el-greek
   ```
2. Keep commits small and meaningful.
3. Ensure the app builds and passes linting/tests.
4. Update docs (README, CHANGELOG) if you changed behavior or added features.
5. Open the PR and describe what you changed and why...

### PR Checklist
- [ ] My changes work locally (`npm run dev`).
- [ ] I’ve updated documentation/screenshots if needed.
- [ ] I’ve tested on multiple browsers/devices.
- [ ] My commit messages are clear and signed (`git commit -s -m "your message"`).

## 📝 Commit Convention (Optional but Recommended)
We recommend following the [Conventional Commits](https://www.conventionalcommits.org/) format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `refactor:` for code improvements
- `chore:` for maintenance
- `i18n:` for maintaining languages
- `game:` for new games

Example:
```
feat: add bulk idea selection feature
```

## 📦 Development Setup
1. Fork the repository and clone your fork:
      ```bash
      git clone https://github.com/ArsenGabrielyan/ArsenKids.git
      cd ArsenKids
      ```
2. Install dependencies:
      ```bash
      npm install
      ```
3. Run the development server:
      ```bash
      npm run dev
      ```
4. Open `http://localhost:3000` in your browser.

PRs are reviewed with kindness and calmness :-)

## 🧪 Testing
Before submitting a PR:
- Test **light and dark mode**.
- Verify **responsiveness** on desktop, tablet, and mobile.
- Check **translations** after switching languages.
- Ensure the website, games, and other features work correctly.
- Make sure there are **no console errors**.

## 🌍 Translating
> [!NOTE]
> - All translations are stored in the `i18n/` folder.
> - Each language has its own JSON file (e.g. `i18n/hy.json` for Armenian).
> - Keep placeholders like {a}, {b}, {name} intact.
> - If unsure about a term, open a draft PR — maintainers will help!

### Steps
1. Make sure to download the base language file from one of these languages
   - [Armenian][armenian-base-json]
   - [English][english-base-json]
2. Translate the content of all keys with your preferred tool
3. Save your edited JSON file as `[lang-code].json` (Examples: `fr.json`, `el.json`, `fa.json`, etc.)
4. Do the following for testing the translation
   - Add the `[lang-code].json` into `i18n/` folder
   - Add the following object into `src/i18n/config.ts`:
     ```ts
      export const languages = [
         // All Existing Languages +
         {code: "<lang-code> (example: el)", countryCode: "<country-code> (example: gr)", label: "<native-name> (example: Ελληνικά)"}
         // ^ This will be your contribution :-)
      ] as const satisfies readonly ILanguage[];
      ```
5. Once Ready, open the Pull Request, so I'll include them in the app after review

## 💡 Feedback & Feature Requests
We love new ideas! If you have a suggestion:
1. Check [existing issues][issues-url]
2. If it’s new, open a [feature request][new-feature-request-url].
3. Explain the motivation and the desired implementation. (the Feature request template says it all ☺️)

## 🌱 Community Guidelines
We aim to keep this space **welcoming and peaceful**:
- Be respectful and constructive.
- Provide constructive feedback (focus on ideas, not people).
- Keep discussions on-topic and inclusive.
- Remember that behind every contribution is a person.

### Dos and Don'ts
| ✅ Do                           | ❌ Don’t                 |
| ------------------------------- | ------------------------- |
| Follow branch naming convention | Edit README for no reason |
| Test before submitting          | Submit broken builds      |
| Use clear commit messages       | Spam “fix typo” PRs       |
| Respect code owner reviews      | Bypass linting            |

Our [Code of Conduct][code-of-conduct-url] applies to all interactions. By participating, you agree to uphold it.

## 🙌 A Note of Thanks
Contributors are what make this project thrive.
Your time, ideas, and creativity are truly appreciated.

Take a deep breath, enjoy the process — and let’s make something beautiful together ✨

Thanks for making ArsenKids better!

[armenian-base-json]: https://github.com/ArsenGabrielyan/ArsenKids/blob/main/i18n/hy
[english-base-json]: https://github.com/ArsenGabrielyan/ArsenKids/blob/main/i18n/en
[issues-url]: https://github.com/ArsenGabrielyan/ArsenKids/issues
[new-feature-request-url]: https://github.com/ArsenGabrielyan/ArsenKids/issues/new?assignees=&labels=&template=feature_request.md&title=
[code-of-conduct-url]: https://github.com/ArsenGabrielyan/ArsenKids/blob/main/CODE_OF_CONDUCT.md

> GitHub [@ArsenGabrielyan](https://github.com/ArsenGabrielyan)  · 
> [Arsen's Website](https://arsen-2005.vercel.app)