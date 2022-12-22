const fs = require('fs');
const path = require('path');

const RELATIVE_BUILD_DIR_PATH = '../build';

clearBuildArtifacts();

function clearBuildArtifacts() {
	const buildDirPath = path.resolve(__dirname, RELATIVE_BUILD_DIR_PATH);

	fs.rmSync(buildDirPath, {
		force: true,
		recursive: true
	});
}
