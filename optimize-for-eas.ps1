# PowerShell script to optimize FiddyscriptMobile for EAS build
Write-Host "Optimizing project for EAS build..." -ForegroundColor Green

# Create optimized directory
$optimizedDir = "FiddyscriptMobile-Optimized"
if (Test-Path $optimizedDir) {
    Remove-Item -Recurse -Force $optimizedDir
}
New-Item -ItemType Directory -Name $optimizedDir

# Copy essential files only
Write-Host "Copying essential files..." -ForegroundColor Yellow
Copy-Item "src" -Destination "$optimizedDir/src" -Recurse
Copy-Item "assets" -Destination "$optimizedDir/assets" -Recurse
Copy-Item "package.json" -Destination "$optimizedDir/"
Copy-Item "app.json" -Destination "$optimizedDir/"
Copy-Item "eas.json" -Destination "$optimizedDir/"
Copy-Item "metro.config.js" -Destination "$optimizedDir/"
Copy-Item "tsconfig.json" -Destination "$optimizedDir/"
Copy-Item "App.tsx" -Destination "$optimizedDir/"
Copy-Item "index.ts" -Destination "$optimizedDir/"
Copy-Item ".easignore" -Destination "$optimizedDir/"

# Create optimized .easignore
$optimizedEasIgnore = @"
# Exclude everything except what we need
node_modules/
.expo/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
dist/
build/
*.tsbuildinfo
__tests__/
*.test.js
*.test.ts
*.test.jsx
*.test.tsx
*.spec.js
*.spec.ts
*.spec.jsx
*.spec.tsx
README.md
*.md
docs/
*.backup
*.bak
*.tmp
assets/videos/
assets/audio/
*.mp4
*.avi
*.mov
*.wmv
*.flv
*.webm
assets/images/large/
*.psd
*.ai
*.sketch
.env.local
.env.development
.env.test
package-lock.json
yarn.lock
pnpm-lock.yaml
.git/
.gitignore
*.tmp
*.temp
.cache/
.metro/
.react-native/
android/
ios/
node_modules/.cache/
"@

Set-Content -Path "$optimizedDir/.easignore" -Value $optimizedEasIgnore

Write-Host "Optimized project created in: $optimizedDir" -ForegroundColor Green
Write-Host "Archive size should be significantly smaller now." -ForegroundColor Green
Write-Host "Run: cd $optimizedDir && npm install && npx eas build --platform android --profile production" -ForegroundColor Cyan
