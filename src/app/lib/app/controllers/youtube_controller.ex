defmodule App.YoutubeController do
  require Logger
  use App, :controller

  def search(conn, %{"q" => query}) when byte_size(query) > 0 do
    case Core.Youtube.search(query) do
      {:ok, videos} ->
        json(conn, %{videos: videos})

      {:error, :missing_api_key} ->
        conn
        |> put_status(:service_unavailable)
        |> json(%{error: "YouTube API key is not configured"})

      {:error, _reason} ->
        conn
        |> put_status(:bad_gateway)
        |> json(%{error: "YouTube search failed"})
    end
  end

  def search(conn, _params) do
    conn |> put_status(:bad_request) |> json(%{error: "A search query is required"})
  end
end
