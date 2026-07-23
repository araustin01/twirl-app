defmodule App.YoutubeControllerTest do
  use App.ConnCase

  test "rejects a missing query", %{conn: conn} do
    conn = get(conn, "/api/youtube/search")

    assert json_response(conn, 400) == %{"error" => "A search query is required"}
  end

  test "reports missing YouTube credentials", %{conn: conn} do
    System.delete_env("YOUTUBE_API_KEY")
    conn = get(conn, "/api/youtube/search?q=music")

    assert json_response(conn, 503) == %{"error" => "YouTube API key is not configured"}
  end
end
