defmodule App.PageControllerTest do
  use App.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    response = html_response(conn, 200)
    assert String.trim(response) != ""
  end
end
