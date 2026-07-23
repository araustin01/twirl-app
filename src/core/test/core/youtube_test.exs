defmodule Core.YoutubeTest do
  use ExUnit.Case, async: false

  @response Jason.encode!(%{
              "items" => [
                %{
                  "id" => %{"videoId" => "video-1"},
                  "snippet" => %{
                    "title" => "A video",
                    "description" => "Description",
                    "thumbnails" => %{"default" => %{"url" => "https://example.com/thumb.jpg"}}
                  }
                },
                %{"id" => %{"channelId" => "channel-1"}, "snippet" => %{"title" => "A channel"}}
              ]
            })

  setup do
    previous_key = System.get_env("YOUTUBE_API_KEY")
    System.put_env("YOUTUBE_API_KEY", "test-key")

    on_exit(fn ->
      if previous_key do
        System.put_env("YOUTUBE_API_KEY", previous_key)
      else
        System.delete_env("YOUTUBE_API_KEY")
      end
    end)
  end

  test "normalizes videos and ignores non-video items" do
    request_fun = fn query, api_key ->
      assert query == "music"
      assert api_key == "test-key"
      {:ok, @response}
    end

    assert {:ok, [%{id: "video-1", title: "A video"}]} = Core.Youtube.search("music", request_fun)
  end

  test "reports a missing API key" do
    System.delete_env("YOUTUBE_API_KEY")

    assert {:error, :missing_api_key} = Core.Youtube.search("music", fn _, _ -> flunk("request was made") end)
  end

  test "returns upstream errors" do
    assert {:error, :upstream} = Core.Youtube.search("music", fn _, _ -> {:error, :upstream} end)
  end

  test "returns malformed JSON errors" do
    assert {:error, %Jason.DecodeError{}} = Core.Youtube.search("music", fn _, _ -> {:ok, "not json"} end)
  end
end
