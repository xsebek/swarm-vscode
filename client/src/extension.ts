import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	const serverModule = ".cabal/bin/swarm";

	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.pipe },
		debug: { module: serverModule, transport: TransportKind.pipe}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for swarm files
		documentSelector: [{ scheme: 'file', language: 'swarm' }]
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerSwarm',
		'Language Server Swarm',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
