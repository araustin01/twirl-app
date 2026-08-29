defmodule App.DiscordController do
  use App, :controller
  require Logger

  @doc """
  Exchanges the OAuth authorization code for an access token directly with Discord.
  """
  def exchange_code(code) do
    # 1. Prepare urlencoded form payload (matching JS new URLSearchParams)
    body = %{
      "client_id" => Application.get_env(:app, :discord_client_id),
      "client_secret" => System.get_env("DISCORD_CLIENT_SECRET"),
      "grant_type" => "authorization_code",
      "code" => code
    }

    # 2. Make the HTTP POST request to Discord
    case Req.post("https://discord.com/api/oauth2/token", form: body) do
      {:ok, %{status: 200, body: token_data}} ->
        # Returns map with "access_token", "expires_in", etc.
        {:ok, token_data}

      {:ok, %{body: error_response}} ->
        {:error, error_response}

      {:error, reason} ->
        {:error, reason}
    end
  end

  def exchange_token(conn, %{"code" => code}) do
    Logger.info("Received authorization code from frontend: #{code}")
    case exchange_code(code) do
      {:ok, token_data} ->
        Logger.info("Successfully exchanged code for access token: #{inspect(token_data)}")
        # Send the tokens back to the frontend
        conn
        |> put_status(:ok)
        |> json(%{
          access_token: token_data["access_token"],
          expires_in: token_data["expires_in"]
        })

      {:error, reason} ->
        Logger.error("Failed to exchange code for access token: #{inspect(reason)}")
        conn
        |> put_status(:bad_request)
        |> json(%{error: "Failed to exchange code", details: reason})
    end
  end
end
