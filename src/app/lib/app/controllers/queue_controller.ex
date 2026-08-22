defmodule App.QueueController do
  use App, :controller
  require Logger

  def index(conn, _params) do
    # Here you would add the logic to retrieve the current queue.
    # For now, we'll just return an empty list.
    queue = []

    conn
    |> put_status(:ok)
    |> json(%{queue: queue})
  end

  def add(conn, %{"video_id" => video_id}) do
    # Here you would add the logic to add the video to the queue.
    # For now, we'll just log the video ID and return a success response.
    Logger.info("Adding video to queue: #{video_id}")
    conn
    |> put_status(:ok)
    |> json(%{message: "Video added to queue", video_id: video_id})
  end
end
