defmodule App.YoutubeControllerTest do
  use App.ConnCase

  test "rejects a missing query", %{conn: conn} do
    conn = get(conn, "/api/youtube/search")

    assert json_response(conn, 400) == %{"error" => "A search query is required"}
  end

  test "reports missing YouTube credentials", %{conn: conn} do
    previous_key = System.get_env("YOUTUBE_API_KEY")
    System.delete_env("YOUTUBE_API_KEY")

    on_exit(fn ->
      if previous_key, do: System.put_env("YOUTUBE_API_KEY", previous_key), else: System.delete_env("YOUTUBE_API_KEY")
    end)

    conn = get(conn, "/api/youtube/search?q=music")

    assert json_response(conn, 503) == %{"error" => "YouTube API key is not configured"}
  end
end
