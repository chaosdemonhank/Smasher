const fs = require('fs');
const path = require('path');

const version = process.argv[2];
if (!version) {
  console.error('Please provide a version number');
  process.exit(1);
}

console.log(`Updating version to ${version}...`);

// Helper to update JSON file
const updateJson = (filePath, updateFn) => {
  if (fs.existsSync(filePath)) {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    updateFn(content);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    console.log(`Updated ${path.basename(filePath)}`);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
};

// Update root package.json
updateJson(path.join(__dirname, '../package.json'), (pkg) => {
  pkg.version = version;
});

// Update app-rn/package.json
updateJson(path.join(__dirname, '../app-rn/package.json'), (pkg) => {
  pkg.version = version;
});

// Update app-rn/app.json
updateJson(path.join(__dirname, '../app-rn/app.json'), (config) => {
  if (config.expo) {
    config.expo.version = version;
    
    // Calculate versionCode: 4.3.8 -> 40308
    const [major, minor, patch] = version.split('.').map(Number);
    const versionCode = major * 10000 + minor * 100 + patch;
    
    if (config.expo.android) {
      config.expo.android.versionCode = versionCode;
    }
    if (config.expo.ios) {
      config.expo.ios.buildNumber = version;
    }
  }
});

// Update build.gradle
const gradlePath = path.join(__dirname, '../app-rn/android/app/build.gradle');
if (fs.existsSync(gradlePath)) {
  let gradleContent = fs.readFileSync(gradlePath, 'utf8');

  const [major, minor, patch] = version.split('.').map(Number);
  const versionCode = major * 10000 + minor * 100 + patch;

  // Regex to replace versionCode and versionName
  gradleContent = gradleContent.replace(/versionCode \d+/g, `versionCode ${versionCode}`);
  gradleContent = gradleContent.replace(/versionName ".*?"/g, `versionName "${version}"`);

  fs.writeFileSync(gradlePath, gradleContent);
  console.log(`Updated build.gradle`);
} else {
  console.warn(`File not found: ${gradlePath}`);
}

console.log('Version updated successfully!');
