defmodule Core.Youtube do
  require Logger
  @youtube_search_url "https://www.googleapis.com/youtube/v3/search"

  def search(query, request_fun \\ &request/2) do
    with {:ok, api_key} <- api_key(),
         {:ok, body} <- request_fun.(query, api_key),
         {:ok, decoded} <- Jason.decode(body) do
      {:ok, decoded |> Map.get("items", []) |> Enum.flat_map(&video/1)}
    end
  end

  defp api_key do
    case System.get_env("YOUTUBE_API_KEY") do
      nil -> {:error, :missing_api_key}
      "" -> {:error, :missing_api_key}
      key -> {:ok, key}
    end
  end

  defp request(query, api_key) do
    params = URI.encode_query(%{part: "snippet", q: query <> " music video", type: "video", maxResults: 10, key: api_key})

    :httpc.request(:get, {String.to_charlist(@youtube_search_url <> "?" <> params), []}, [], [])
    |> case do
      {:ok, {{_, 200, _}, _headers, body}} -> {:ok, List.to_string(body)}
      _ -> {:error, :upstream}
    end
  end

  defp video(%{"id" => %{"videoId" => id}, "snippet" => snippet}) do
    [
      %{
        id: id,
        title: snippet["title"],
        description: snippet["description"],
        thumbnail: get_in(snippet, ["thumbnails", "default", "url"])
      }
    ]
  end

  defp video(_item), do: []
end
