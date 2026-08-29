import { DiscordSDK } from "@discord/embedded-app-sdk";

export interface DiscordAuthResponse {
    access_token: string;
    user: {
        id: string;
        username: string;
        discriminator: string;
        avatar?: string;
    };
    scopes: string[];
    expires: string;
}

export async function setupDiscord(clientId: string): Promise<DiscordAuthResponse> {
    const discordSdk = new DiscordSDK(clientId);

    await discordSdk.ready();

    const { code } = await discordSdk.commands.authorize({
        client_id: clientId,
        response_type: 'code',
        state: '',
        prompt: 'none',
        scope: ['identify', 'applications.commands'],
    });

    console.log("Successfully obtained authorization code from Discord:", code);

    const response = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
    });

    if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.statusText}`);
    }

    const { access_token } = await response.json();

    const auth = await discordSdk.commands.authenticate({ access_token });
    if (!auth) {
        throw new Error("Discord authentication failed.");
    }

    return auth as DiscordAuthResponse;
}