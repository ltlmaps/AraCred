#!/usr/bin/env node

const fs = require('fs');
const userName = require('os').userInfo().username;

const {INFURA_KEY, PRIVATE_KEY} = process.env;
const fileContent = (network) => {
	return JSON.stringify(
		{
			rpc: `https://${network}.infura.io/v3/${INFURA_KEY}`,
			keys: [`${PRIVATE_KEY}`],
		},
		null,
		2,
	);
};

const saveFile = () => {
	try {
		const dir = `/home/${userName}/.aragon`;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
			console.log('created `~/.aragon` file');
		}
		fs.writeFile(
			`/home/${userName}/.aragon/rinkeby_key.json`,
			fileContent('rinkeby'),
			(err) => {
				if (err) {
					console.log('Error writing files', err);
				} else {
					console.log('Successfully setup Rinkeby signer');
				}
			},
		);
		fs.writeFile(
			`/home/${userName}/.aragon/rinkeby_key.json`,
			fileContent('mainnet'),
			(err) => {
				if (err) {
					console.log('Error writing files', err);
				} else {
					console.log('Successfully setup Mainnet signer');
				}
			},
		);
	} catch (err) {
		console.error(err);
		process.exit(-1);
	}
};

saveFile();
module.export = {fileContent, saveFile};
