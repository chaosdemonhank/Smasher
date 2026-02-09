# Setup EXPO_TOKEN for GitHub Actions

## Required Steps:

1. **Get your Expo token:**
   ```bash
   npx expo token
   ```
   Or visit: https://expo.dev/accounts/[your-username]/settings/access-tokens

2. **Add EXPO_TOKEN to GitHub secrets:**
   - Go to: https://github.com/chaosdemonhank/Smasher/settings/secrets/actions
   - Click "New repository secret"
   - Name: `EXPO_TOKEN`
   - Value: [Paste your Expo token here]
   - Click "Add secret"

3. **Retry the release:**
   Once the secret is added, push a new commit to trigger the release again:
   ```bash
   git commit --allow-empty -m "feat: trigger release with Expo token configured"
   git push origin main
   ```

## Alternative: Use Local Build

If you prefer not to use Expo services, we can configure the workflow to build APK locally using Gradle instead of EAS.

## Current Status:
- Version was bumped to 1.0.0 (semantic release reset version)
- Workflow failed at APK build step due to missing EXPO_TOKEN
- Need to add the secret and retry
